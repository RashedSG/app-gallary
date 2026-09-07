#!/usr/bin/env python3
"""معرض الألعاب — بايثون.
python3 main.py        نافذة pygame
python3 main.py --web  موقع المتصفح
"""
import sys


def run_web():
    from app import Handler
    from http.server import ThreadingHTTPServer
    import os
    port = int(os.environ.get("PORT", "5055"))
    httpd = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"الموقع → http://127.0.0.1:{port}")
    httpd.serve_forever()


if __name__ == "__main__":
    if "--web" in sys.argv or "web" in sys.argv:
        run_web()
    else:
        from gallery import App
        App().run()
