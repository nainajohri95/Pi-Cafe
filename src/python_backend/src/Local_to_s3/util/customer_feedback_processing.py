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

def process_customer_feedback(files):
    orders_df = read_csv_data("orders.csv", parse_dates=["date"])
    customer_feedback_df = read_csv_data("feedback.csv")
    
    for year in orders_df["date"].dt.year.unique():
        for month in range(1, 3):
            orders_month_file = f"orders_{year}_{month:02}.csv"
            orders_month = read_csv_data(StringIO(files[orders_month_file]), parse_dates=["date"])
            
            if not orders_month.empty:
                order_ids_month = orders_month["order_id"]
                customer_feedback_month = customer_feedback_df[customer_feedback_df["Order_id"].isin(order_ids_month)]
                
                object_name = f"customer_feedback_{year}_{month:02}.csv"
                upload_to_s3(customer_feedback_month, BUCKET_NAME, f'{data_path}/customer_feedback/customer_feedback_{year}/{object_name}')
    
    logging.info("Customer feedback segregated and uploaded to S3 successfully.")
