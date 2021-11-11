import http.client

conn = http.client.HTTPSConnection("football-data1.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "football-data1.p.rapidapi.com",
    'x-rapidapi-key': "292d8d620amshb9318095f51b4e6p1c93cfjsn8f17f6c06dfc"
    }

conn.request("GET", "/tournament/info?tournamentId=9", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))