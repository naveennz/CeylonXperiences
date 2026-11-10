"""Create a consistent backup using SQLite's backup API, even while serving."""
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from server import DB
if not DB.exists():raise SystemExit('No database found. Complete setup first.')
out=DB.parent/'backups'/('operations-'+datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')+'.sqlite3')
out.parent.mkdir(parents=True,exist_ok=True)
with sqlite3.connect(DB) as src,sqlite3.connect(out) as dst:src.backup(dst)
print('Backup created:',out)
