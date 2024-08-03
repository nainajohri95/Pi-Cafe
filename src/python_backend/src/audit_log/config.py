import json
import boto3
"""
This module contains functions to retrieve secrets from AWS Secrets Manager.
"""
def get_secret(secret_name):
    """
       Retrieve secret from AWS Secrets Manager.

       Parameters:
       secret_name (str): The name of the secret to retrieve.
       region_name (str): The AWS region where the secret is stored.

       Returns:
       dict: The secret as a dictionary.
       """
    client = boto3.client('secretsmanager', region_name='ap-south-1')
    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        secret = json.loads(get_secret_value_response['SecretString'])
        return secret
    except Exception as e:
        raise e

secret_name = 'picafe_secrets_team2'
config = get_secret(secret_name)

datasource_url = config['datasource_url']
PG_HOST = datasource_url.split('/')[2].split(':')[0]
PG_PORT = datasource_url.split(':')[2].split('/')[0]
PG_USER = config['datasource_username']
PG_PASSWORD = config['datasource_pass']
PG_DBNAME = datasource_url.split('/')[-1]
SCHEMA_NAME = config['jpa_schema']

postgres_table_names = [
    'private.orders',
    'private.categories',
    'private.customers',
    'private.customer_feedback',
    'private.employees',
    'private.items',
    'private.locations',
    'private.order_items',
    'private.stores'
]

db_params = {
    'dbname': PG_DBNAME,
    'user': PG_USER,
    'password': PG_PASSWORD,
    'host': PG_HOST,
    'port': PG_PORT,
    'tables': postgres_table_names
}

s3_params = {
    'bucket_name': 'picafe-team2-bucket'
}
