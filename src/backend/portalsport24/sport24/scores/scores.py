import thesportsdb
api = thesportsdb.Api(key="1")
players = api.Search().Players(team="Arsenal")
for player in players:
    print(player.strPlayer)
