import pandas as pd
import logging
from io import StringIO
from s3_operations.s3_client import upload_to_s3
from config.aws_config import BUCKET_NAME
from config import HISTORICAL_DATA_PATH


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
data_path = HISTORICAL_DATA_PATH

def read_csv_data(file_path, parse_dates=None):
    return pd.read_csv(file_path, parse_dates=parse_dates)

def process_order_items(files):
    orders_df = read_csv_data("orders.csv", parse_dates=["date"])
    order_items_df = read_csv_data("order_items.csv")
    
    for year in orders_df["date"].dt.year.unique():
        for month in range(1, 4):
            orders_month_file = f"orders_{year}_{month:02}.csv"
            orders_month = read_csv_data(StringIO(files[orders_month_file]), parse_dates=["date"])
            
            if not orders_month.empty:
                last_order_id = orders_month["order_id"].iloc[-1]
                order_items_month = order_items_df[order_items_df["Order_id"] <= last_order_id]
                
                object_name = f"order_items_{year}_{month:02}.csv"
                upload_to_s3(order_items_month, BUCKET_NAME, f'{data_path}/order_items/order_items_{year}/{object_name}')
    
    logging.info("Order items segregated and uploaded to S3 successfully.")
