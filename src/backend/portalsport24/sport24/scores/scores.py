from sportsreference.fb.schedule import Schedule

purdue_schedule = Schedule('Chelsea FC')
for game in purdue_schedule:
    print(game.date)