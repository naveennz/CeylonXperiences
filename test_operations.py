"""Integration tests against an isolated SQLite database. Run: python test_operations.py"""
import http.client, json, tempfile, threading, unittest
from pathlib import Path
from datetime import timedelta
import server

class OperationsTest(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.tmp=tempfile.TemporaryDirectory(ignore_cleanup_errors=True);server.DB=Path(cls.tmp.name)/'test.sqlite3';server.schema()
  with server.connect() as c:server.seed(c,'admin@example.com','business@example.com','Administrator-123!','Business-Test-123!')
  cls.http=server.ThreadingHTTPServer(('127.0.0.1',0),server.Handler);cls.port=cls.http.server_address[1]
  cls.thread=threading.Thread(target=cls.http.serve_forever,daemon=True);cls.thread.start()
 @classmethod
 def tearDownClass(cls):cls.http.shutdown();cls.http.server_close();cls.tmp.cleanup()
 def request(self,path,data=None,session=None,csrf=True,origin=None):
  conn=http.client.HTTPConnection('127.0.0.1',self.port);headers={'Content-Type':'application/json'}
  if session:
   headers['Cookie']=session['cookie']
   if csrf:headers['X-CSRF-Token']=session['csrf']
  if origin:headers['Origin']=origin
  conn.request('POST' if data is not None else 'GET',path,json.dumps(data) if data is not None else None,headers);r=conn.getresponse();raw=r.read();status=r.status;cookie=r.getheader('Set-Cookie');conn.close()
  try:body=json.loads(raw)
  except:body=raw.decode()
  return status,body,cookie
 def login(self,email,pw):
  st,b,cookie=self.request('/api/login',{'email':email,'password':pw});self.assertEqual(st,200,b)
  s={'cookie':cookie.split(';')[0],'csrf':''};st,b,_=self.request('/api/me',session=s);s['csrf']=b['csrf'];return s
 def test_workflows_and_guards(self):
  self.assertEqual(self.request('/api/state')[0],401)
  admin=self.login('admin@example.com','Administrator-123!');biz=self.login('business@example.com','Business-Test-123!')
  a=self.request('/api/state',session=admin)[1];b=self.request('/api/state',session=biz)[1]
  self.assertEqual(len(a['hosts']),2);self.assertEqual(len(b['hosts']),1);self.assertEqual(b['hosts'][0]['id'],'H-001');self.assertEqual(b['audit'],[])
  def act(payload,s=biz):return self.request('/api/action',payload,s)[:2]
  self.assertEqual(act({'op':'host-review','id':'H-002','status':'active','reason':'review'})[0],403)
  self.assertEqual(act({'op':'listing-save','id':'L-002'})[0],403)
  self.assertEqual(self.request('/api/action',{'op':'profile'},biz,csrf=False)[0],403)
  self.assertEqual(self.request('/api/action',{'op':'profile'},biz,origin='https://evil.example')[0],403)
  self.assertEqual(self.request('/private/operations.sqlite3')[0],404);self.assertEqual(self.request('/server.py')[0],404)
  self.assertEqual(act({'op':'booking-status','id':'B-0003','status':'completed','reason':'too early'})[0],400)
  future=str(server.today()+timedelta(days=20))
  booking={'op':'booking-create','listing':'L-001','guest':'Integration guest','email':'test@example.com','date':future,'slot':'10:00','guests':5}
  st,out=act(booking);self.assertEqual(st,200,out);bid=out['id']
  self.assertEqual(act(dict(booking,guests=2))[0],400)
  self.assertEqual(act({'op':'block','listing':'L-001','date':future,'slot':'10:00','reason':'closed'})[0],400)
  self.assertEqual(act({'op':'payment-record','id':bid,'reference':'TEST-RECEIPT-1'})[0],200)
  self.assertEqual(act({'op':'payment-record','id':bid,'reference':'TEST-RECEIPT-1'})[0],400)
  self.assertEqual(act({'op':'refund-request','booking':bid,'amount':999999,'reason':'too much'})[0],400)
  st,out=act({'op':'refund-request','booking':bid,'amount':6500,'reason':'one guest cancelled'});self.assertEqual(st,200,out);rid=out['id']
  self.assertEqual(act({'op':'refund-request','booking':bid,'amount':6500,'reason':'duplicate'})[0],400)
  self.assertEqual(act({'op':'refund-review','id':rid,'status':'approved','reason':'checked'},admin)[0],200)
  self.assertEqual(act({'op':'refund-review','id':rid,'status':'processed','reason':'returned','reference':'REF-1'},admin)[0],200)
  self.assertEqual(act({'op':'refund-review','id':rid,'status':'processed','reason':'repeat','reference':'REF-1'},admin)[0],400)
  st,out=act({'op':'payout','host':'H-001','expectedAmount':1,'reference':'BANK-1'},admin);self.assertEqual(st,400)
  # Seed completed bookings: 39,000 gross less 20% = 31,200 payable.
  st,out=act({'op':'payout','host':'H-001','expectedAmount':31200,'reference':'BANK-1'},admin);self.assertEqual(st,200,out)
  self.assertEqual(act({'op':'payout','host':'H-001','expectedAmount':31200,'reference':'BANK-1'},admin)[0],400)
  self.assertEqual(act({'op':'refund-request','booking':'B-0001','amount':100,'reason':'settled'})[0],400)
  st,out=act({'op':'block','listing':'L-001','date':future,'slot':'14:00','reason':'maintenance'});self.assertEqual(st,200,out)
  self.assertEqual(act(dict(booking,slot='14:00',guests=1))[0],400)
  self.assertEqual(act({'op':'unblock','id':out['id']})[0],200)
  st,out=act({'op':'profile','name':'Kitchen <script>sample</script>','owner':'Host','phone':'000','location':'Colombo'});self.assertEqual(st,200,out)
  self.assertEqual(self.request('/api/state',session=biz)[1]['hosts'][0]['name'],'Kitchen <script>sample</script>')
  with server.connect() as c:self.assertGreater(c.execute('SELECT COUNT(*) FROM audit').fetchone()[0],5)
  self.assertEqual(self.request('/api/logout',{},biz)[0],200);self.assertEqual(self.request('/api/state',session=biz)[0],401)
 def test_login_rate_limit(self):
  for _ in range(5):self.assertEqual(self.request('/api/login',{'email':'no-account@example.com','password':'wrong'})[0],401)
  self.assertEqual(self.request('/api/login',{'email':'no-account@example.com','password':'wrong'})[0],429)
 def test_z_become_host_and_gigs(self):
  st,b,cookie=self.request('/api/register-host',{'name':'Mirissa Ocean Expeditions','owner':'Captain Silva','email':'whale@mirissa.lk','password':'0000','location':'Mirissa'});self.assertEqual(st,200,b)
  s=self.login('whale@mirissa.lk','0000');self.assertEqual(self.request('/api/me',session=s)[1]['name'],'Mirissa Ocean Expeditions')
  gids=[]
  for i in range(1,7):
   st,out,_=self.request('/api/action',{'op':'listing-save','title':f'I will host expedition #{i}','category':'Nature','location':'Mirissa','duration':'3 hours','price':6000,'capacity':8,'description':'Whale watching experience','policy':'Cancel 48h prior'},session=s)
   self.assertEqual(st,200,out);gids.append(out['id'])
  st,out,_=self.request('/api/action',{'op':'listing-save','title':'I will host gig #7','category':'Nature','location':'Mirissa','duration':'3 hours','price':6000,'capacity':8,'description':'7th gig','policy':'Cancel 48h prior'},session=s)
  self.assertEqual(st,400);self.assertIn('Maximum 6 gigs',str(out))
  st,out,_=self.request('/api/action',{'op':'listing-delete','id':gids[0]},session=s);self.assertEqual(st,200)
  st,out,_=self.request('/api/action',{'op':'listing-save','title':'I will host replacement gig','category':'Nature','location':'Mirissa','duration':'3 hours','price':7500,'capacity':6,'description':'New gig','policy':'Cancel 48h prior'},session=s)
  self.assertEqual(st,200)

if __name__=='__main__':unittest.main(verbosity=2)
