import boto3
from io import StringIO

from config.aws_config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

# Initialize S3 client
s3_client = boto3.client(
    's3', 
    aws_access_key_id=AWS_ACCESS_KEY_ID, 
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

def get_order_files(bucket_name: str, prefix: str):
    response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
    file_contents = {}

    if 'Contents' in response:
        for obj in response['Contents']:
            file_key = obj['Key']

            # Read the file contents directly from S3
            response = s3_client.get_object(Bucket=bucket_name, Key=file_key)
            file_content = response['Body'].read().decode('utf-8')

            # Store the file content in the dictionary with the file name as the key
            file_contents[file_key.split('/')[-1]] = file_content

    return file_contents

def upload_to_s3(df, bucket_name, object_name):
    csv_buffer = StringIO()
    df.to_csv(csv_buffer, index=False)
    s3_client.put_object(Bucket=bucket_name, Key=object_name, Body=csv_buffer.getvalue())
