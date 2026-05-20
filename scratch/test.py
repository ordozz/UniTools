import urllib.request
import json

# 1. Shorten URL
req = urllib.request.Request(
    'http://localhost:8000/api/shorten', 
    data=json.dumps({"url": "https://google.com"}).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print("SHORTEN RESPONSE:", data)
        short_url = data['short_url']
except Exception as e:
    print("SHORTEN ERROR:", e)
    import sys
    sys.exit(1)

# 2. Fetch the short URL (NO redirect following)
class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirectHandler)
req2 = urllib.request.Request(f"http://localhost:8000{short_url}")
try:
    response2 = opener.open(req2)
    print("REDIRECT RESPONSE CODE:", response2.getcode())
    print("REDIRECT RESPONSE BODY:", response2.read().decode())
except urllib.error.HTTPError as e:
    print("REDIRECT ERROR CODE:", e.code)
    print("REDIRECT ERROR HEADERS:", e.headers)
    print("REDIRECT ERROR BODY:", e.read().decode())
except Exception as e:
    print("REDIRECT EXCEPTION:", e)
