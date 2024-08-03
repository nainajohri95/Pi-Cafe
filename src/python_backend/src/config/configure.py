import json
import boto3
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def get_secret(secret_name="picafe_secrets_team2", region_name="ap-south-1"):
    """Retrieve secret from AWS Secrets Manager."""
    try:
        client = boto3.client('secretsmanager', region_name=region_name)
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        secret = get_secret_value_response['SecretString']
        logging.info(f"Raw secret from Secrets Manager: {secret}")  # Log the raw secret
        return json.loads(secret)
    except Exception as e:
        logging.error(f"Error retrieving secrets from Secrets Manager: {e}")
        raise


def create_s3_client():
    """Create and return an S3 client."""
    secrets=get_secret()
    aws_access_key_id = secrets.get('aws_access_key_id')
    aws_secret_access_key = secrets.get('aws_secret_access_key')
    aws_region_name = secrets.get('aws_region_name')
    logging.info(aws_access_key_id)
    return boto3.client(
        's3',
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name=aws_region_name
    )


# Fetch secrets
secrets = get_secret()



db_username = secrets.get('datasource_username')
db_password = secrets.get('datasource_pass')
db_url = secrets.get('datasource_url')

# Log the db_url to inspect its structure
logging.info(f"Database URL: {db_url}")

# Adjust the parsing logic based on the structure of db_url
try:
    # Split the URL by the '//' to separate the protocol from the rest
    rest = db_url.split('//')[1]

    # Split by '/' to separate the host:port from the database name
    host_port, db_name = rest.split('/')

    # Split the host and port
    db_host, db_port = host_port.split(':')
    db_port = int(db_port)
except (IndexError, ValueError) as e:
    logging.error(f"Error parsing the database URL: {e}")
    db_host = None
    db_port = None
    db_name = None