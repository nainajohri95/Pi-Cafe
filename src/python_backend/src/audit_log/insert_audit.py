"""
This module handles Snowflake connections and audit logging operations.
"""

import logging
import snowflake.connector
from typing import Dict, Optional
import yaml

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def load_config(file_path: str = 'local_config.yaml') -> Dict:
    """
    Load configuration from a YAML file.

    Parameters:
    file_path (str): The path to the configuration file.

    Returns:
    dict: The configuration dictionary.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            config = yaml.safe_load(file)
            snowflake_config = config.get('snowflake', {})
            logging.info("Loaded Snowflake configuration")
            return snowflake_config
    except (IOError, yaml.YAMLError) as e:
        logging.error("Failed to load configuration file: %s", str(e))
        return {}

def get_snowflake_connection(sf_config: Dict) -> Optional[snowflake.connector.SnowflakeConnection]:
    """
    Establish a connection to Snowflake.

    Parameters:
    sf_config (dict): The Snowflake configuration.

    Returns:
    snowflake.connector.SnowflakeConnection: The Snowflake connection object.
    """
    try:
        conn = snowflake.connector.connect(
            user=sf_config['user'],
            password=sf_config['password'],
            account=sf_config['account'],
            database=sf_config['database'],
            schema=sf_config['schema'],
            warehouse=sf_config['warehouse'],
            role=sf_config['role']
        )
        logging.info("Successfully connected to Snowflake.")
        return conn
    except snowflake.connector.Error as e:
        logging.error(f"Error connecting to Snowflake: {e}")
        return None

def ensure_audit_log_table_exists(cursor):
    """
        Ensure the audit log table exists in Snowflake.

        Parameters:
        cursor (snowflake.connector.SnowflakeCursor): Snowflake cursor object.
        """
    create_table_query = """
    CREATE TABLE IF NOT EXISTS AUDIT_LOG (
        event_type STRING,
        record_count_before NUMBER,
        record_count_after NUMBER,
        duration NUMBER,
        job_start_time TIMESTAMP,
        job_end_time TIMESTAMP,
        status STRING,
        error_message STRING,
        pipeline_name STRING,
        source_system STRING,
        target_system STRING,
        job_id STRING,
        alert_triggered STRING,
        retry_status STRING
    )
    """
    try:
        cursor.execute(create_table_query)
        logging.info("Audit log table checked/created successfully")
    except snowflake.connector.Error as e:
        logging.error(f"Error creating audit log table: {e}")
        raise

def insert_audit_log(event_type, record_count_before, record_count_after, duration, job_start_time, job_end_time, status, error_message, pipeline_name, source_system, target_system, job_id, alert_triggered, retry_status):
    sf_config = load_config()
    if not sf_config:
        return

    conn = None
    try:
        conn = get_snowflake_connection(sf_config)
        if not conn:
            return

        query = """
            INSERT INTO AUDIT_LOG (
                event_type, record_count_before, record_count_after, duration, job_start_time, job_end_time, status,
                error_message, pipeline_name, source_system, target_system, job_id, alert_triggered, retry_status
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor = conn.cursor()
        cursor.execute(query, (
            event_type, record_count_before, record_count_after, duration, job_start_time, job_end_time, status,
            error_message, pipeline_name, source_system, target_system, job_id, alert_triggered, retry_status
        ))
        conn.commit()
        logging.info("Audit log inserted successfully.")
    except Exception as e:
        logging.error(f"Error inserting audit log: {e}")
    finally:
        if conn:
            conn.close()
        logging.info("Snowflake connection closed.")

