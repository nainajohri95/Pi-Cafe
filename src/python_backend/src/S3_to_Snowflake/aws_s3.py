import boto3

def list_recent_files(s3_client, bucket, prefix, last_sync_time):
    paginator = s3_client.get_paginator('list_objects_v2')
    pages = paginator.paginate(Bucket=bucket, Prefix=prefix)
    files = []
    for page in pages:
        if 'Contents' in page:
            for obj in page['Contents']:
                last_modified = obj['LastModified']
                if last_modified > last_sync_time:
                    files.append(obj['Key'])
    return files

def list_all_files(s3_client, bucket, prefix):
    paginator = s3_client.get_paginator('list_objects_v2')
    pages = paginator.paginate(Bucket=bucket, Prefix=prefix)
    files = []
    for page in pages:
        if 'Contents' in page:
            for obj in page['Contents']:
                files.append(obj['Key'])
    return files

def fetch_data_from_s3(s3_client, bucket, file_key):
    import pandas as pd
    response = s3_client.get_object(Bucket=bucket, Key=file_key)
    data = pd.read_parquet(response['Body'])
    return data.to_dict(orient='records')
