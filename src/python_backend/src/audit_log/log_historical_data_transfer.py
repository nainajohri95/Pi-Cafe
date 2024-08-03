"""Module for handling historical data transfer and logging."""

import logging
from datetime import datetime, timedelta

import pytz
import yaml

from count_records_before import record_count_before
from count_records_after import count_records_snowflake
from insert_audit import insert_audit_log
from generate_job_id import generate_job_id

PIPELINE_NAME = 'historical'
SOURCE_SYSTEM = 'ec2_postgres'
TARGET_SYSTEM = 'snowflake'
EVENT_TYPE = 'insert'

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def load_config(file_path='local_config.yaml'):
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
            logging.info("Configuration loaded successfully")
            return config
    except Exception as e:
        logging.error("Failed to load configuration file: %s", str(e))
        return {}

def log_historical_data_transfer():
    """
    Perform data transfer and log the process in the audit log.
    """
    config_local = load_config()
    if 'snowflake' not in config_local:
        logging.error("Snowflake configuration missing in the YAML file.")
        return

    ist = pytz.timezone('Asia/Kolkata')

    end_time = datetime.now()
    start_time = end_time - timedelta(minutes=30)

    record_count_before_value = record_count_before(start_time, end_time)

    job_start_time = datetime.now()
    job_id = generate_job_id()

    try:
        record_count_after_value = count_records_snowflake(start_time, end_time)

        job_end_time = datetime.now()
        duration = (job_end_time - job_start_time).total_seconds()
        if record_count_before_value != record_count_after_value:
            status = 'fail'
            error_message = 'Record count mismatch'
            alert_triggered = True
            retry_status = True
        else:
            status = 'success'
            error_message = 'record count match'
            alert_triggered = False
            retry_status = False

        insert_audit_log(
            EVENT_TYPE, record_count_before_value, record_count_after_value, duration, job_start_time, job_end_time,
            status, error_message, PIPELINE_NAME, SOURCE_SYSTEM, TARGET_SYSTEM, job_id, alert_triggered, retry_status
        )

    except Exception as e:
        job_end_time = datetime.now(ist)
        duration = (job_end_time - job_start_time).total_seconds()
        logging.error("Error during data transfer: %s", str(e))
        status = 'fail'
        error_message = 'Cannot transfer data'
        alert_triggered = True
        retry_status = True
        record_count_after_value = 0


        insert_audit_log(
            EVENT_TYPE, record_count_before_value, record_count_after_value, duration, job_start_time, job_end_time,
            status, error_message, PIPELINE_NAME, SOURCE_SYSTEM, TARGET_SYSTEM, job_id, alert_triggered, retry_status
        )
