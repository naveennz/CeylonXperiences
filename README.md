# CeylonXperiences — Operations workspace

A working local admin and business application with a Python server and a shared SQLite database. The portals use server-side authentication and permissions; records are not kept in browser localStorage. No third-party Python packages are required.

## Start on Windows, macOS or Linux

1. Install Python 3.10 or newer if needed.
2. Extract the ZIP into a folder. Open a terminal in that folder.
3. For a demo with the sample records, run `python server.py --setup --sample-data`. For a clean workspace, run `python server.py --setup` (use `python3` if that is your Python command).
4. Enter two different email addresses: one for the admin and one for the sample business. Create a separate password for each, at least 12 characters long. Password input is intentionally hidden.
5. Run `python server.py`.
6. Open these addresses in your browser:
   - Admin: http://localhost:8000/admin.html
   - Business: http://localhost:8000/business.html
   - Customer website: http://localhost:8000/

Do not open the portal HTML files directly. They require the server. Keep the terminal running; Ctrl+C stops it. Use separate browser profiles or a private window to sign into admin and business simultaneously. On the same browser profile, both pages share one session.

## What is included

**Admin**: dashboard with calculated balances, reservation management, create business accounts, business verification/suspension, listing publication review, refund approval/processing records, manual bank payout records, support replies, CSV exports, audit trail and password change.

**Business**: only the signed-in business's bookings, listings, availability, earnings, refund requests, support and profile. Create and edit experiences; submit them for approval; add manual reservations; confirm/decline requests; complete or cancel confirmed bookings; record cash/bank payments; block or reopen available sessions; request refunds; view settlement references; export filtered data; change password.

**Backend**: SQLite persistence; per-request tenant checks; PBKDF2 password hashes; expiring HttpOnly sessions; CSRF tokens; login attempt throttling; transactional capacity checks; server-derived prices; limits on refunds; payout holds for unresolved refunds; prevention of repeat settlement; audit records. Only five public site assets are served; database files and source code are not publicly served.

## Sample data and operating rules

Setup with `--sample-data` creates illustrative records, not real transactions:

- 2 businesses: Colombo Kitchen Studio (active) and Southern Clay Workshop (pending).
- 2 experiences: a live cooking workshop and a pending pottery listing.
- 6 sample reservations spanning completed, confirmed, requested and cancelled states.
- 1 pending refund and 1 support request.
- The first business has the account created during setup. Admin can create additional business accounts. The second sample business has no login account.

Amounts use whole Sri Lankan rupees. Sample commission is 20%, captured on each booking. Admin can set 0–50% during business review; the new rate applies to new bookings only. This is an illustrative commercial arrangement, not a recommended fee. Session dates use Asia/Colombo; audit timestamps are UTC. Available time choices are currently 10:00 and 14:00.

Net collections = payments recorded as received minus refunds recorded as processed.
Commission is calculated per booking on its remaining collected amount and rounded to whole rupees.
Business earnings = net collections minus commission. This includes future bookings and is not all immediately payable.
Payouts include only completed, paid, unsettled bookings without pending/approved refunds. A stored quote must still match the payable amount when saved. Once a booking has been settled, refund requests are blocked until finance handles a settlement adjustment outside this version.

Changes to a live listing send it back to pending review and stop new manual reservations until reapproved. Existing bookings retain their original price and commission. Marking a booking cancelled does not automatically refund it. Recording a refund does not automatically change the reservation status. Perform both actions when appropriate.

## Money, customer bookings and launch scope

This version records externally received payments, completed refunds and bank transfers. It DOES NOT charge cards, send refunds, transfer funds, send emails or verify external transaction references. Enter references only after verifying the external transaction.

The customer website is included with its prior redesign, but its sign-in and checkout remain a separate browser demo. Public customer bookings and the previous localStorage submissions do not automatically appear in these new portals. Real customer checkout requires a server-backed booking API and payment integration before public launch.

Do not mix sample financial records with actual accounts. Plain `--setup` creates accounts and one pending business with an empty ledger; complete its profile and have the admin approve it, then create and approve listings. To move from a sample workspace to a clean workspace, stop the server, back up the database, set a separate CXP_DATABASE path, and run plain `--setup`.

This is a working operations foundation, not a deployed enterprise service. Before public use, complete HTTPS deployment behind a production server/proxy, security review, administrator MFA, email verification and account recovery, production account provisioning, verified host documentation/file uploads, payment webhooks and reconciliation, settlement adjustment workflows, delivery notifications, tax/invoice requirements, monitoring and tested recovery. The Python standard-library server defaults to localhost for evaluation; it is not intended as the public internet edge.

## Configuration

- `CXP_DATABASE`: absolute path to the SQLite database. Defaults to `private/operations.sqlite3` beside server.py.
- `CXP_SECURE_COOKIE=1`: enable only behind HTTPS.
- `CXP_ORIGIN`: exact external origin when deployed behind a proxy, for example `https://operations.example.com`.
- `python server.py --port 8001`: use another port.
- The server binds to 127.0.0.1 by default. Do not expose it directly to the internet.

Never distribute the `private` folder, which holds account and operational data.

## Backups and verification

Run `python backup.py` to make a consistent SQLite backup in `private/backups`. Keep a protected copy on another device. To restore: stop the server, preserve the current database, and replace it with a known backup. Restart and verify records.

Run `python test_operations.py` for isolated integration tests. Tests cover authentication, tenant restrictions, CSRF and origin checks, private-file protection, future-completion rejection, overselling prevention, booking/block conflicts, duplicate payments, refund limits, duplicate refunds, payout quote validation, repeat settlements, audit persistence, logout and login throttling. Tests create a temporary database and do not touch your operations database.

JavaScript syntax has also been checked. Browser visual validation was unavailable in the build environment; review layouts and flows locally before deployment.
