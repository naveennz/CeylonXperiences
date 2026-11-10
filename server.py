"""CeylonXperiences operations server. Python 3.10+, no third-party dependencies."""
import argparse, base64, getpass, hashlib, hmac, json, mimetypes, os, secrets, sqlite3, time
from datetime import date, timedelta, datetime
from zoneinfo import ZoneInfo
def today():return datetime.now(ZoneInfo("Asia/Colombo")).date()
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from http.cookies import SimpleCookie
from pathlib import Path
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parent
DB=Path(os.environ.get('CXP_DATABASE', str(ROOT/'private'/'operations.sqlite3')))
SECURE=os.environ.get('CXP_SECURE_COOKIE','0')=='1'

def connect():
 DB.parent.mkdir(parents=True,exist_ok=True)
 c=sqlite3.connect(DB,timeout=15);c.row_factory=sqlite3.Row;c.execute('PRAGMA foreign_keys=ON');return c

def schema():
 with connect() as c:
  c.executescript('''CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,password TEXT NOT NULL,role TEXT NOT NULL,host TEXT,name TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id TEXT REFERENCES users(id),expires INTEGER,csrf TEXT);
CREATE TABLE IF NOT EXISTS records(kind TEXT,id TEXT,data TEXT,PRIMARY KEY(kind,id));
CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY,time TEXT,actor TEXT,action TEXT,entity TEXT);
CREATE TABLE IF NOT EXISTS attempts(key TEXT PRIMARY KEY,count INTEGER,until INTEGER);''')

def password(p,salt=None):
 salt=salt or secrets.token_hex(16)
 return salt+':'+hashlib.pbkdf2_hmac('sha256',p.encode(),bytes.fromhex(salt),600000).hex()
def valid_password(p,stored):return hmac.compare_digest(password(p,stored.split(':')[0]),stored)
def rows(c,kind):return [json.loads(r[0]) for r in c.execute('SELECT data FROM records WHERE kind=? ORDER BY id',(kind,))]
def put(c,kind,obj):c.execute('INSERT OR REPLACE INTO records VALUES(?,?,?)',(kind,obj['id'],json.dumps(obj)))
def get(c,kind,id):
 r=c.execute('SELECT data FROM records WHERE kind=? AND id=?',(kind,id)).fetchone()
 if not r:raise ValueError('Record not found')
 return json.loads(r[0])
def log(c,u,action,entity):c.execute('INSERT INTO audit(time,actor,action,entity) VALUES(?,?,?,?)',(time.strftime('%Y-%m-%d %H:%M:%S',time.gmtime()),u['email'],action,entity))
def money(v):
 n=int(v)
 if n<0 or n>100000000:raise ValueError('Invalid amount')
 return n
def text(d,k,maximum=500):
 v=str(d.get(k,'')).strip()
 if not v or len(v)>maximum:raise ValueError('Provide a valid '+k)
 return v
def email(d):
 e=text(d,'email',180).lower()
 if '@' not in e or '.' not in e.rsplit('@',1)[1]:raise ValueError('Provide a valid email address')
 return e
def iso(d,k):return date.fromisoformat(text(d,k,10)).isoformat()
def own(u,r):
 if u['role']!='admin' and r.get('host')!=u['host']:raise PermissionError('This record belongs to another business')
def uid(prefix):return prefix+'-'+secrets.token_hex(4).upper()
def totals(bookings):
 paid=[b for b in bookings if b['payment']=='paid']; refunded=sum(b.get('refunded',0) for b in bookings)
 gross=sum(b['amount'] for b in paid); commission=sum(round((b['amount']-b.get('refunded',0))*b['commission']/100) for b in paid)
 return {'gross':gross,'refunded':refunded,'net':gross-refunded,'commission':commission,'hostNet':gross-refunded-commission,'bookings':len(bookings)}

def seed(c,admin_email,business_email,ap,bp):
 c.execute('INSERT INTO users VALUES(?,?,?,?,?,?)',('U-ADMIN',admin_email,password(ap),'admin',None,'Operations administrator'))
 c.execute('INSERT INTO users VALUES(?,?,?,?,?,?)',('U-HOST',business_email,password(bp),'business','H-001','Colombo Kitchen Studio'))
 hosts=[{'id':'H-001','name':'Colombo Kitchen Studio','owner':'Sample host A','email':business_email,'phone':'+94 00 000 0000','location':'Colombo','status':'active','commission':20,'verified':True}, {'id':'H-002','name':'Southern Clay Workshop','owner':'Sample host B','email':'clay@example.com','phone':'+94 00 000 0000','location':'Galle','status':'pending','commission':20,'verified':False}]
 for h in hosts:put(c,'hosts',h)
 for l in [{'id':'L-001','host':'H-001','title':'Sri Lankan home cooking workshop','location':'Colombo','category':'Cooking','duration':'3 hours','price':6500,'capacity':6,'status':'live','description':'Sample listing: a hands-on cooking session with lunch and ingredients included.','policy':'Cancel at least 48 hours before the session for a full refund.'},{'id':'L-002','host':'H-002','title':'Introduction to wheel pottery','location':'Galle','category':'Crafts','duration':'2 hours','price':4800,'capacity':8,'status':'pending','description':'Sample listing: guided pottery workshop including clay and tools.','policy':'Cancel at least 48 hours before the session for a full refund.'}]:put(c,'listings',l)
 sample_today=today()
 for i,(offset,status,paid,guests) in enumerate([(-8,'completed','paid',2),(-4,'completed','paid',4),(1,'confirmed','paid',2),(3,'confirmed','unpaid',3),(5,'requested','unpaid',2),(-2,'cancelled','paid',2)],1):
  put(c,'bookings',{'id':f'B-{i:04}','host':'H-001','listing':'L-001','title':'Sri Lankan home cooking workshop','guest':f'Sample guest {i}','email':f'guest{i}@example.com','date':str(sample_today+timedelta(days=offset)),'slot':'10:00','guests':guests,'amount':6500*guests,'commission':20,'status':status,'payment':paid,'refunded':0,'note':'Illustrative record. No actual charge.','payout':None})
 put(c,'refunds',{'id':'R-0001','host':'H-001','booking':'B-0006','amount':13000,'reason':'Sample cancellation request','status':'pending','reference':''})
 put(c,'tickets',{'id':'T-0001','host':'H-001','subject':'Update the meeting-point instructions','message':'Please confirm how to update the arrival instructions for our guests. Sample support request.','priority':'normal','status':'open','reply':''})

def setup(sample_data=False):
 schema()
 with connect() as c:
  if c.execute('SELECT count(*) FROM users').fetchone()[0]:raise SystemExit('Accounts already exist. Setup will not overwrite data.')
  ae=input('Administrator email: ').strip().lower();be=input('Business account email: ').strip().lower()
  if '@' not in ae or '@' not in be or ae==be:raise SystemExit('Use two different valid email addresses.')
  ap=getpass.getpass('Create admin password (12+ characters): ');bp=getpass.getpass('Create business password: ')
  if min(len(ap),len(bp))<4:raise SystemExit('Passwords must be at least 4 characters.')
  seed(c,ae,be,ap,bp)
  if not sample_data:
   c.execute('DELETE FROM records')
   put(c,'hosts',{'id':'H-001','name':'Your business','owner':'Business owner','email':be,'phone':'','location':'','status':'pending','commission':20,'verified':False})
   c.execute('UPDATE users SET name=? WHERE id=?',('Business account','U-HOST'))
 print('Accounts created. Run python server.py, then open http://localhost:8000/admin.html')

def action(c,u,d):
 op=text(d,'op',40);id=d.get('id');role=u['role']
 if op in ('host-review','listing-review','payout','refund-review','ticket-reply','create-host') and role!='admin':raise PermissionError('Administrator access required')
 if op=='create-host':
  e=email(d);pw=text(d,'password',200)
  if len(pw)<4:raise ValueError('Password must have at least 4 characters')
  id=uid('H');h={'id':id,'name':text(d,'name',100),'owner':text(d,'owner',100),'email':e,'phone':text(d,'phone',40),'location':text(d,'location',100),'status':'active','verified':True,'commission':20}
  c.execute('INSERT INTO users VALUES(?,?,?,?,?,?)',(uid('U'),e,password(pw),'business',id,h['name']));put(c,'hosts',h)
 elif op=='host-review':
  r=get(c,'hosts',id);st=text(d,'status',30)
  if st not in ('active','suspended','rejected'):raise ValueError('Invalid status')
  r['reviewNote']=text(d,'reason');r['status']=st;r['verified']=st=='active'
  commission=int(d.get('commission',r['commission']))
  if not 0<=commission<=50:raise ValueError('Commission must be between 0 and 50 percent')
  r['commission']=commission;put(c,'hosts',r)
 elif op=='listing-review':
  r=get(c,'listings',id);st=text(d,'status',30)
  if st not in ('live','rejected','paused'):raise ValueError('Invalid status')
  if st=='live' and get(c,'hosts',r['host'])['status']!='active':raise ValueError('Approve the business first')
  r.update(status=st,reviewNote=text(d,'reason'));put(c,'listings',r)
 elif op=='listing-save':
  r=get(c,'listings',id) if id else {'id':uid('L'),'host':u['host']}
  if not r['host']:raise ValueError('Use a business account to create a listing')
  own(u,r)
  existing_gigs=[l for l in rows(c,'listings') if l.get('host')==u['host']]
  if not id and len(existing_gigs)>=6:raise ValueError('Maximum 6 gigs allowed per business profile.')
  cap=int(d.get('capacity',0));price=money(d.get('price',0))
  if not 1<=cap<=100 or price<1:raise ValueError('Capacity must be 1–100 and price positive')
  for k in ('title','location','category','duration','description','policy','imageUrl','tagline','inclusions'):
   if k in d:r[k]=text(d,k,4000 if k in ('description','policy','inclusions','imageUrl') else 200)
  host_rec=get(c,'hosts',r['host'])
  desired_st=text(d,'status',20) if 'status' in d else ('live' if host_rec.get('status')=='active' else 'pending')
  if desired_st not in ('live','paused','pending'):desired_st='live' if host_rec.get('status')=='active' else 'pending'
  r.update(price=price,capacity=cap,status=desired_st);id=r['id'];put(c,'listings',r)
 elif op=='listing-delete':
  r=get(c,'listings',id);own(u,r)
  has_active=any(b['listing']==id and b['status'] in ('requested','confirmed') for b in rows(c,'bookings'))
  if has_active:raise ValueError('Cannot delete a gig with active or upcoming bookings')
  c.execute('DELETE FROM records WHERE kind=? AND id=?',('listings',id))
 elif op=='booking-create':
  l=get(c,'listings',text(d,'listing',60));own(u,l)
  if l['status']!='live' or get(c,'hosts',l['host'])['status']!='active':raise ValueError('Listing must be live and business active')
  dt=iso(d,'date');slot=text(d,'slot',5);guests=int(d.get('guests',0))
  if dt<str(today()) or slot not in ('10:00','14:00'):raise ValueError('Choose a future date and supported time')
  if not 1<=guests<=l['capacity']:raise ValueError('Guest count exceeds capacity')
  for b in rows(c,'blocks'):
   if b['listing']==l['id'] and b['date']==dt and b['slot']==slot:raise ValueError('This slot is blocked')
  used=sum(b['guests'] for b in rows(c,'bookings') if b['listing']==l['id'] and b['date']==dt and b['slot']==slot and b['status'] not in ('cancelled','declined'))
  if used+guests>l['capacity']:raise ValueError('Not enough places remain for this slot')
  id=uid('B');put(c,'bookings',{'id':id,'host':l['host'],'listing':l['id'],'title':l['title'],'guest':text(d,'guest',120),'email':email(d),'date':dt,'slot':slot,'guests':guests,'amount':l['price']*guests,'commission':get(c,'hosts',l['host'])['commission'],'status':'confirmed','payment':'unpaid','refunded':0,'payout':None,'note':str(d.get('note',''))[:1000]})
 elif op=='booking-status':
  r=get(c,'bookings',id);own(u,r);st=text(d,'status',30)
  allowed={'requested':['confirmed','declined'],'confirmed':['completed','cancelled'],'completed':[],'cancelled':[],'declined':[]}
  if st not in allowed[r['status']]:raise ValueError('Invalid booking transition')
  if st=='completed' and r['date']>str(today()):raise ValueError('A future session cannot be completed')
  r['status']=st;r['note']=text(d,'reason',1000);put(c,'bookings',r)
 elif op=='payment-record':
  r=get(c,'bookings',id);own(u,r)
  if r['payment']=='paid' or r['status'] in ('cancelled','declined'):raise ValueError('Payment cannot be recorded for this booking')
  r['payment']='paid';r['paymentRef']=text(d,'reference',120);put(c,'bookings',r)
 elif op=='refund-request':
  b=get(c,'bookings',text(d,'booking',60));own(u,b);amount=money(d.get('amount',0))
  if b['payment']!='paid' or amount<1 or amount>b['amount']-b.get('refunded',0):raise ValueError('Refund must be within the unrefunded paid amount')
  if b.get('payout'):raise ValueError('Already settled. Contact finance for an adjustment before refunding.')
  if any(r['booking']==b['id'] and r['status'] in ('pending','approved') for r in rows(c,'refunds')):raise ValueError('An active refund request already exists')
  id=uid('R');put(c,'refunds',{'id':id,'host':b['host'],'booking':b['id'],'amount':amount,'reason':text(d,'reason',1000),'status':'pending','reference':''})
 elif op=='refund-review':
  r=get(c,'refunds',id);st=text(d,'status',30);b=get(c,'bookings',r['booking'])
  if st not in {'pending':['approved','rejected'],'approved':['processed','rejected']}.get(r['status'],[]):raise ValueError('Invalid refund transition')
  r['reviewNote']=text(d,'reason',1000)
  if st=='processed':
   if b.get('payout') or r['amount']>b['amount']-b.get('refunded',0):raise ValueError('Booking balance changed; review settlement first')
   r['reference']=text(d,'reference',120);b['refunded']+=r['amount'];put(c,'bookings',b)
  r['status']=st;put(c,'refunds',r)
 elif op=='payout':
  host=text(d,'host',60);get(c,'hosts',host);ref=text(d,'reference',120)
  pending={r['booking'] for r in rows(c,'refunds') if r['status'] in ('pending','approved')}
  bs=[b for b in rows(c,'bookings') if b['host']==host and b['status']=='completed' and b['payment']=='paid' and not b.get('payout') and b['id'] not in pending]
  amount=totals(bs)['hostNet']
  if not bs or amount<=0:raise ValueError('No eligible completed, paid bookings to settle')
  if money(d.get('expectedAmount',-1))!=amount:raise ValueError('Settlement amount changed. Refresh and review before recording.')
  if any(p['reference']==ref for p in rows(c,'payouts')):raise ValueError('This transfer reference was already recorded')
  id=uid('P');put(c,'payouts',{'id':id,'host':host,'amount':amount,'bookings':[b['id'] for b in bs],'date':str(today()),'reference':ref,'status':'recorded'})
  for b in bs:b['payout']=id;put(c,'bookings',b)
 elif op=='block':
  l=get(c,'listings',text(d,'listing',60));own(u,l);dt=iso(d,'date');slot=text(d,'slot',5)
  if dt<str(today()) or slot not in ('10:00','14:00'):raise ValueError('Choose a future date and supported time')
  if any(b['listing']==l['id'] and b['date']==dt and b['slot']==slot and b['status'] not in ('cancelled','declined') for b in rows(c,'bookings')):raise ValueError('This slot already has bookings. Resolve them before blocking.')
  if any(b['listing']==l['id'] and b['date']==dt and b['slot']==slot for b in rows(c,'blocks')):raise ValueError('Slot is already blocked')
  id=uid('A');put(c,'blocks',{'id':id,'host':l['host'],'listing':l['id'],'date':dt,'slot':slot,'reason':text(d,'reason')})
 elif op=='unblock':
  r=get(c,'blocks',id);own(u,r);c.execute('DELETE FROM records WHERE kind=? AND id=?',('blocks',id))
 elif op=='password-change':
  current=text(d,'currentPassword',200);new=text(d,'newPassword',200)
  if not valid_password(current,u['password']):raise ValueError('Current password is incorrect')
  if len(new)<4:raise ValueError('New password must have at least 4 characters')
  c.execute('UPDATE users SET password=? WHERE id=?',(password(new),u['id']))
  c.execute('DELETE FROM sessions WHERE user_id=?',(u['id'],));id=u['id']
 elif op=='profile':
  id=u['host'] if role=='business' else id;r=get(c,'hosts',id)
  for k in ('name','owner','phone','location'):r[k]=text(d,k,120)
  put(c,'hosts',r)
 elif op=='ticket-create':
  if not u['host']:raise ValueError('Use a business account to create a support request')
  id=uid('T');put(c,'tickets',{'id':id,'host':u['host'],'subject':text(d,'subject',150),'message':text(d,'message',3000),'priority':d.get('priority','normal') if d.get('priority') in ('normal','urgent') else 'normal','status':'open','reply':''})
 elif op=='ticket-reply':
  r=get(c,'tickets',id);r.update(reply=text(d,'reply',3000),status='resolved');put(c,'tickets',r)
 else:raise ValueError('Unknown operation')
 log(c,u,op,str(id or ''));return {'ok':True,'id':id}

class Handler(BaseHTTPRequestHandler):
 def log_message(self,*args):pass
 def reply(self,status,obj,cookie=None):
  raw=json.dumps(obj).encode();self.send_response(status);self.send_header('Content-Type','application/json');self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.send_header('Content-Length',str(len(raw)))
  if cookie:self.send_header('Set-Cookie',cookie)
  self.end_headers();self.wfile.write(raw)
 def session(self,c):
  cookie=SimpleCookie();cookie.load(self.headers.get('Cookie',''));token=cookie['cxp_session'].value if 'cxp_session' in cookie else ''
  return c.execute('SELECT users.*,sessions.csrf FROM sessions JOIN users ON users.id=sessions.user_id WHERE token=? AND expires>?',(hashlib.sha256(token.encode()).hexdigest(),int(time.time()))).fetchone()
 def do_GET(self):
  path=urlsplit(self.path).path
  if path.startswith('/api/'):
   with connect() as c:
    u=self.session(c)
    if not u:return self.reply(401,{'error':'Sign in to continue'})
    if path=='/api/me':return self.reply(200,{'email':u['email'],'name':u['name'],'role':u['role'],'host':u['host'],'csrf':u['csrf']})
    if path=='/api/state':
     data={}
     for kind in ('hosts','listings','bookings','refunds','payouts','blocks','tickets'):
      records=rows(c,kind);data[kind]=records if u['role']=='admin' else [r for r in records if (r['id'] if kind=='hosts' else r.get('host'))==u['host']]
     data['totals']=totals(data['bookings']);data['audit']=[dict(r) for r in c.execute('SELECT * FROM audit ORDER BY id DESC LIMIT 100')] if u['role']=='admin' else [];return self.reply(200,data)
    return self.reply(404,{'error':'Not found'})
  # Explicit allowlist prevents database, source and backup downloads.
  file=ROOT/('index.html' if path=='/' else path.lstrip('/'))
  allowed={'index.html','admin.html','business.html','css/style.css','js/app.js'}
  if path.lstrip('/') not in allowed and path!='/':self.send_error(404);return
  if not file.is_file():self.send_error(404);return
  raw=file.read_bytes();self.send_response(200);self.send_header('Content-Type',mimetypes.guess_type(str(file))[0] or 'application/octet-stream');self.send_header('X-Content-Type-Options','nosniff');self.send_header('X-Frame-Options','DENY');self.send_header('Referrer-Policy','same-origin');self.send_header('Content-Length',str(len(raw)));self.end_headers();self.wfile.write(raw)
 def do_POST(self):
  try:
   origin=self.headers.get('Origin');expected=os.environ.get('CXP_ORIGIN','http://'+self.headers.get('Host',''))
   if origin and origin!=expected:raise PermissionError('Origin not allowed')
   length=int(self.headers.get('Content-Length',0))
   if length>32768:raise ValueError('Request too large')
   d=json.loads(self.rfile.read(length));path=urlsplit(self.path).path
   if not isinstance(d,dict):raise ValueError('Invalid request')
   with connect() as c:
    c.execute('BEGIN IMMEDIATE')
    if path=='/api/login':
     e=email(d);key=self.client_address[0]+':'+e;a=c.execute('SELECT * FROM attempts WHERE key=?',(key,)).fetchone();now=int(time.time())
     if a and a['until']>now and a['count']>=5:return self.reply(429,{'error':'Too many attempts. Try again in 15 minutes.'})
     u=c.execute('SELECT * FROM users WHERE email=?',(e,)).fetchone()
     if not u or not valid_password(str(d.get('password','')),u['password']):
      n=a['count']+1 if a and a['until']>now else 1;c.execute('INSERT OR REPLACE INTO attempts VALUES(?,?,?)',(key,n,now+900));c.commit();return self.reply(401,{'error':'Email or password is incorrect'})
     c.execute('DELETE FROM attempts WHERE key=?',(key,));token=secrets.token_urlsafe(32);csrf=secrets.token_urlsafe(24);c.execute('DELETE FROM sessions WHERE expires<?',(now,));c.execute('INSERT INTO sessions VALUES(?,?,?,?)',(hashlib.sha256(token.encode()).hexdigest(),u['id'],now+28800,csrf));c.commit();return self.reply(200,{'ok':True,'role':u['role']},'cxp_session='+token+'; HttpOnly; SameSite=Lax; Path=/; Max-Age=28800'+('; Secure' if SECURE else ''))
    if path=='/api/register-host':
     name=text(d,'name',100);owner=text(d,'owner',100) if d.get('owner') else name
     e=email(d);pw=text(d,'password',200)
     if len(pw)<4:raise ValueError('Password must have at least 4 characters')
     existing=c.execute('SELECT id FROM users WHERE email=?',(e,)).fetchone()
     if existing:raise ValueError('An account with this email already exists. Please log in.')
     hid=uid('H')
     h={'id':hid,'name':name,'owner':owner,'email':e,'phone':str(d.get('phone','')).strip(),'location':str(d.get('location','Sri Lanka')).strip(),'status':'active','verified':True,'commission':20}
     uid_str=uid('U')
     c.execute('INSERT INTO users VALUES(?,?,?,?,?,?)',(uid_str,e,password(pw),'business',hid,name))
     put(c,'hosts',h)
     log(c,{'email':e},'register-host',hid)
     token=secrets.token_urlsafe(32);csrf=secrets.token_urlsafe(24);now=int(time.time())
     c.execute('INSERT INTO sessions VALUES(?,?,?,?)',(hashlib.sha256(token.encode()).hexdigest(),uid_str,now+28800,csrf))
     c.commit()
     return self.reply(200,{'ok':True,'role':'business','name':name,'host':hid},'cxp_session='+token+'; HttpOnly; SameSite=Lax; Path=/; Max-Age=28800'+('; Secure' if SECURE else ''))
    u=self.session(c)
    if not u:return self.reply(401,{'error':'Sign in to continue'})
    if not hmac.compare_digest(self.headers.get('X-CSRF-Token',''),u['csrf']):raise PermissionError('Session verification failed; refresh and retry')
    if path=='/api/logout':
     c.execute('DELETE FROM sessions WHERE user_id=?',(u['id'],));c.commit();return self.reply(200,{'ok':True},'cxp_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0')
    if path!='/api/action':return self.reply(404,{'error':'Not found'})
    result=action(c,u,d);c.commit();return self.reply(200,result)
  except PermissionError as e:self.reply(403,{'error':str(e)})
  except (ValueError,KeyError,TypeError,sqlite3.IntegrityError) as e:self.reply(400,{'error':'Email already exists' if isinstance(e,sqlite3.IntegrityError) else str(e)})
  except Exception:self.reply(500,{'error':'Operation failed. No changes were committed.'})

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--setup',action='store_true');p.add_argument('--sample-data',action='store_true');p.add_argument('--port',type=int,default=8000);p.add_argument('--host',default='127.0.0.1');args=p.parse_args();schema()
 if args.setup:setup(args.sample_data)
 else:
  with connect() as c:
   if not c.execute('SELECT 1 FROM users').fetchone():raise SystemExit('Run python server.py --setup first.')
  print(f'Open http://localhost:{args.port}/admin.html or /business.html');ThreadingHTTPServer((args.host,args.port),Handler).serve_forever()
