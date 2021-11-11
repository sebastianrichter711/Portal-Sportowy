from datetime import datetime, timedelta
yesterday_time = datetime.now() - timedelta(hours = 24)
print(yesterday_time.strftime('%Y-%m-%d %H:%M:%S'))
    
    
    