import snowflake.connector
import logging
import json

def connect_to_snowflake(snowflake_account, snowflake_user, snowflake_password,
                         snowflake_warehouse, snowflake_database, snowflake_schema,
                         snowflake_role):
    return snowflake.connector.connect(
        user=snowflake_user,
        password=snowflake_password,
        account=snowflake_account,
        warehouse=snowflake_warehouse,
        database=snowflake_database,
        schema=snowflake_schema,
        role=snowflake_role
    )

def copy_data_to_snowflake_table(cursor, table, s3_path, database, schema, aws_access_key_id, aws_secret_access_key):
    try:
        logging.info(f"Copying data from {s3_path} to Snowflake table {table}")


        # Define the Snowflake file format for PARQUET
        copy_query = f"""
        COPY INTO {database}.{schema}.{table}
        FROM '{s3_path}'
        FILE_FORMAT = (TYPE = 'PARQUET' )
        CREDENTIALS = (AWS_KEY_ID='{aws_access_key_id}' AWS_SECRET_KEY='{aws_secret_access_key}')
        MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE
        ON_ERROR = 'CONTINUE'
        FORCE = TRUE
        """


        logging.info(f"Executing query: {copy_query}")
        cursor.execute(copy_query)
        logging.info(f"Data copied successfully from {s3_path} to Snowflake table {table}")
    except Exception as e:
        logging.error(f"Error copying data from {s3_path} to Snowflake table {table}: {str(e)}", exc_info=True)
