import pyarrow as pa
import pyarrow.parquet as pq
import logging
import pandas as pd
from src.python_backend.src.config.configure import create_s3_client


def upload_to_s3(df, table_name, date_col=None):
    """
    This function is called in main of postgres to sql, and it converts dataframe in parquet 
    and uploads it in s3 bucket, after making connection.
    """

    s3_bucket_name = 'picafe-team2-bucket'

    try:
        s3_client = create_s3_client()

        if date_col:
            df[date_col] = pd.to_datetime(df[date_col])
            grouped = df.groupby([df[date_col].dt.year, df[date_col].dt.month])
            df[date_col] = df[date_col].astype('datetime64[ns]').dt.strftime('%Y-%m-%d %H:%M:%S')
            for (year, month), group in grouped:
                table = pa.Table.from_pandas(group)
                s3_path = f"pi_cafe_raw_data_pq/historical/{table_name}/year={year}/month={month}/{table_name}.parquet"
                parquet_buffer = pa.BufferOutputStream()
                pq.write_table(table, parquet_buffer)
                parquet_data = parquet_buffer.getvalue().to_pybytes()
                s3_client.put_object(
                    Bucket=s3_bucket_name,
                    Key=s3_path,
                    Body=parquet_data
                )
                logging.info(f"Data successfully uploaded to S3 bucket '{s3_bucket_name}' with path '{s3_path}'")
        else:
            table = pa.Table.from_pandas(df)
            s3_path = f"pi_cafe_raw_data_pq/historical/{table_name}/year=2023/{table_name}.parquet"
            parquet_buffer = pa.BufferOutputStream()
            pq.write_table(table, parquet_buffer)
            parquet_data = parquet_buffer.getvalue().to_pybytes()
            s3_client.put_object(
                Bucket=s3_bucket_name,
                Key=s3_path,
                Body=parquet_data
            )
            logging.info(f"Data successfully uploaded to S3 bucket '{s3_bucket_name}' with path '{s3_path}'")
    except Exception as e:
        logging.error(f"Error uploading data to S3 for table {table_name}.", exc_info=True)
        raise
