import logging
import boto3
from datetime import datetime, timedelta, timezone

from aws_s3 import list_recent_files, list_all_files
from snowflake_db import connect_to_snowflake, copy_data_to_snowflake_table


logging.basicConfig(filename='pipelines_audit.log', level=logging.INFO, format='%(asctime)s %(message)s')

snowflake_account = '####'
snowflake_user = '####'
snowflake_password = '####'
snowflake_warehouse = '####'
snowflake_database = '####'
snowflake_schema = '####'
snowflake_role = '####'
raw_schema = '####'

s3_bucket = 'picafe-team2-bucket'
s3_prefix = 'pi_cafe_raw_data_pq/incremental'

table_category = [
    'customers', 'customer_feedback', 'order_items', 'orders'
]

aws_access_key_id = '####'
aws_secret_access_key = '####'


def main():
    s3_client = boto3.client('s3')

    try:
        conn = connect_to_snowflake(snowflake_account, snowflake_user, snowflake_password,
                                    snowflake_warehouse, snowflake_database, snowflake_schema, snowflake_role)
        cursor = conn.cursor()
    except Exception as e:
        logging.error(f'Error connecting to Snowflake: {str(e)}', exc_info=True)
        return

    try:
        last_sync_time = datetime.now(timezone.utc) - timedelta(minutes=30)
        logging.info(f"Last sync time calculated as: {last_sync_time}")

        for table in table_category:
            s3_prefix_path = f'{s3_prefix}/{table}/'
            logging.info(f"Processing table: {table}, prefix: {s3_prefix_path}")
            try:
                files = list_recent_files(s3_client, s3_bucket, s3_prefix_path, last_sync_time)
                if not files:
                    logging.warning(f"No recent files found for table {table}. Listing all files in {s3_prefix_path} for debugging.")
                    all_files = list_all_files(s3_client, s3_bucket, s3_prefix_path)
                    logging.info(f"All files in {s3_prefix_path}: {all_files}")
                logging.info(f"Found {len(files)} files for table {table}")
                for file in files:
                    if file.endswith('.parquet'):
                        s3_path = f's3://{s3_bucket}/{file}'
                        copy_data_to_snowflake_table(cursor, table, s3_path, snowflake_database, raw_schema,
                                                     aws_access_key_id, aws_secret_access_key, )
                        logging.info(f"Copied file {file} to table {table}")
            except Exception as e:
                logging.error(f'Error processing table {table}: {str(e)}', exc_info=True)
    except Exception as e:
        logging.error(f'Error in main pipeline execution: {str(e)}', exc_info=True)
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    main()





