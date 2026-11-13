#!/usr/bin/env python3
"""Regenerate integrity metadata after intentional edits."""
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parents[1]
files={p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(root.rglob('*')) if p.is_file() and p.name!='checksums.json' and '__pycache__' not in p.parts and '.git' not in p.parts}
(root/'checksums.json').write_text(json.dumps(files,ensure_ascii=False,indent=2)+'\n')
print(f'Updated {len(files)} checksums.')
