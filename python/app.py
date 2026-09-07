#!/usr/bin/env python3
"""معرض الألعاب 2D — خادم بايثون."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent.parent


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        print(self.address_string(), "-", fmt % args)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5055"))
    httpd = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"معرض الألعاب 2D → http://127.0.0.1:{port}")
    httpd.serve_forever()
