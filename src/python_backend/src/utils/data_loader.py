# s3_loader.py

import logging
import os
import boto3
import pandas as pd
from dwh.database import engine
from utils.models import table_to_model
from config.configure import aws_access_key_id, aws_secret_access_key, aws_region_name

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def load_data_from_s3(s3_bucket, s3_prefix):
    s3_client = boto3.client('s3',
                             aws_access_key_id=aws_access_key_id,
                             aws_secret_access_key=aws_secret_access_key,
                             region_name='ap-south-1')
    paginator = s3_client.get_paginator('list_objects_v2')

    for page in paginator.paginate(Bucket=s3_bucket, Prefix=s3_prefix):
        for obj in page.get('Contents', []):
            file_path = obj['Key']

            if file_path.endswith('.csv'):
                logging.info(f"Processing CSV file: {file_path}")

                # Extract the directory name that contains the table name
                if 'historical' in file_path:
                    dir_name = os.path.basename(os.path.dirname(file_path))
                    table_name = '_'.join(dir_name.split('_')[:-1]).strip()
                else:
                    table_name = os.path.splitext(os.path.basename(file_path))[0].strip()

                model_class = table_to_model.get(table_name.lower())

                if model_class is None:
                    logging.info(f"Model class not found for table: {table_name}")
                    continue

                try:
                    response = s3_client.get_object(Bucket=s3_bucket, Key=file_path)
                    df = pd.read_csv(response['Body'])

                    # Remove columns not present in the database schema
                    columns_in_db = {col.name for col in model_class.__table__.columns}
                    df = df[[col for col in df.columns if col in columns_in_db]]

                    df.to_sql(model_class.__tablename__, engine, schema='private', if_exists='append', index=False)
                    logging.info(f"Data loaded successfully from {file_path} to {model_class.__tablename__}")
                except Exception as e:
                    logging.error(f'Error loading data from {file_path}: {e}')
