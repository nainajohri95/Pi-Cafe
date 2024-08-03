# main.py

from utils.models import Base
from dwh.database import engine
from utils.data_loader import load_data_from_s3

# Create all tables
Base.metadata.create_all(engine)

# Call the function to load data for each table
load_data_from_s3('picafe-team2-bucket', 'Pi_Cafe_raw_data_2/historical')
load_data_from_s3('picafe-team2-bucket', 'Pi_Cafe_raw_data_2/master')
