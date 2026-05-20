import urllib.request
import json
import urllib.error

def test_sql(sql_str):
    req = urllib.request.Request(
        'http://localhost:8000/api/format/sql', 
        data=json.dumps({"content": sql_str}).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            print(f"SQL: {sql_str[:30]}... -> Valid: {data['is_valid']}")
            if not data['is_valid']:
                print(f"Error: {data['error']}")
            else:
                print(f"Formatted:\n{data['formatted']}")
    except Exception as e:
        print("ERROR:", e)

print("--- Testing Valid MS SQL ---")
test_sql("select id, name from users where status = 'active';")

print("\n--- Testing Invalid MS SQL ---")
test_sql("select id, name from users where;")
