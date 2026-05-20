import urllib.request
import json
try:
    with urllib.request.urlopen("http://localhost:8000/api/s/V57K51") as response:
        print("RESPONSE:", response.read().decode())
except urllib.error.HTTPError as e:
    print("ERROR CODE:", e.code)
    print("ERROR BODY:", e.read().decode())
