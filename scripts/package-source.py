"""Create a portable full-source ZIP; generated output and account data stay local."""
from pathlib import Path
import subprocess, zipfile
root=Path(__file__).resolve().parent.parent
paths=subprocess.check_output(['git','ls-files','-z'],cwd=root).decode().split('\0')
output=root/'dist'/'OVERDRIVE_ALL_SOURCE.zip'
output.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
 for name in paths:
  if not name or name.startswith(('dist/','.git/','.openai/','node_modules/','artifacts/','playwright-report/')): continue
  path=root/name
  if path.is_file(): archive.write(path,'OVERDRIVE_SOURCE/'+name)
with zipfile.ZipFile(output) as archive:
 assert archive.testzip() is None
 names=set(archive.namelist())
 for name in ['src/game.js','src/titan/models.js','build.mjs','package-lock.json','SOURCE_README_JA.md']:
  assert 'OVERDRIVE_SOURCE/'+name in names, name
print(f'{output}: {output.stat().st_size} bytes; {len(names)} source files')
