import pandas as pd
import logging
from s3_operations.s3_client import upload_to_s3
from config.aws_config import BUCKET_NAME
from config import HISTORICAL_DATA_PATH


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
data_path = HISTORICAL_DATA_PATH

def read_csv_data(file_path, parse_dates=None):
    return pd.read_csv(file_path, parse_dates=parse_dates)

def process_orders():
    orders_df = read_csv_data("orders.csv", parse_dates=["date"])
    
    for year in orders_df["date"].dt.year.unique():
        for month in range(1, 4):
            orders_month = orders_df[(orders_df["date"].dt.year == year) & (orders_df["date"].dt.month == month)]
            
            if not orders_month.empty:
                object_name = f"orders_{year}_{month:02}.csv"
                upload_to_s3(orders_month, BUCKET_NAME, f'{data_path}/orders/orders_{year}/{object_name}')
    
    logging.info("Orders segregated and uploaded to S3 successfully.")
