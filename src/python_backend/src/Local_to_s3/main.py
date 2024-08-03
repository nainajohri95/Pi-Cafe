import logging
from s3_operations.s3_client import get_order_files
from config.aws_config import BUCKET_NAME
from util.orders_processing import process_orders
from util.customers_processing import process_customers
from util.order_items_processing import process_order_items
from util.customer_feedback_processing import process_customer_feedback
import pandas as pd
from config import HISTORICAL_DATA_PATH,MASTER_DATA_PATH


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def read_csv_data(file_path, parse_dates=None):
    return pd.read_csv(file_path, parse_dates=parse_dates)

def upload_master(file_path, object_name):
    from s3_operations.s3_client import upload_to_s3
    df = read_csv_data(file_path)
    upload_to_s3(df, BUCKET_NAME, object_name)
    logging.info(f"File {file_path} uploaded to S3 as {object_name}")

def main():
    process_orders()
    process_customers()
    files = get_order_files(BUCKET_NAME, f'{HISTORICAL_DATA_PATH}/orders/orders_2023/')
    process_order_items(files)
    process_customer_feedback(files)
    upload_master("locations.csv", f"{MASTER_DATA_PATH}/locations.csv")
    upload_master("items.csv", f"{MASTER_DATA_PATH}/items.csv")
    upload_master("categories.csv", f"{MASTER_DATA_PATH}/categories.csv")
    upload_master("stores.csv", f"{MASTER_DATA_PATH}/stores.csv")
    upload_master("employees.csv", f"{MASTER_DATA_PATH}/employees.csv")

if __name__ == "__main__":
    main()
