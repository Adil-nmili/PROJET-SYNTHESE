# from nba_api.stats.endpoints import playercareerstats

# # Nikola Jokić
# career = playercareerstats.PlayerCareerStats(player_id='203999') 

# # pandas data frames (optional: pip install pandas)
# career.get_data_frames()[0]

# # json
# career.get_json()

# # dictionary
# data = career.get_dict()
# print(data)
from nba_api.live.nba.endpoints import scoreboard

# Today's Score Board
games = scoreboard.ScoreBoard()

# json
games.get_json()

# dictionary
print(games.get_dict())