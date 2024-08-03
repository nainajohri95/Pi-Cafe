import pandas as pd
import logging
from s3_operations.s3_client import upload_to_s3
from config.aws_config import BUCKET_NAME
from config import HISTORICAL_DATA_PATH


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
data_path = HISTORICAL_DATA_PATH

def read_csv_data(file_path, parse_dates=None):
    return pd.read_csv(file_path, parse_dates=parse_dates)

def process_customers():
    customers_df = read_csv_data("customers.csv", parse_dates=["customer_joining_date"])
    
    for year in customers_df["customer_joining_date"].dt.year.unique():
        for month in range(1, 4):
            customers_month = customers_df[(customers_df["customer_joining_date"].dt.year == year) & (customers_df["customer_joining_date"].dt.month == month)]
            
            if not customers_month.empty:
                object_name = f"customers_{year}_{month:02}.csv"
                upload_to_s3(customers_month, BUCKET_NAME, f'{data_path}/customers/customers_{year}/{object_name}')
    
    logging.info("Customers segregated and uploaded to S3 successfully.")
