"""
This module contains functions to count records in Snowflake after a data transfer process.
"""
import logging
import yaml
import snowflake.connector

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
"""
This module contains functions to count records in Snowflake after a data transfer process.
"""
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
            snowflake_config = config.get('snowflake', {})
            logging.info("Loaded Snowflake configuration")
            return snowflake_config
    except Exception as e:
        logging.error(f"Failed to load configuration file: {e}")
        return {}

def get_snowflake_connection(sf_config):
    """
    Establish a connection to Snowflake.

    Parameters:
    sf_config (dict): The Snowflake configuration.

    Returns:
    snowflake.connector.SnowflakeConnection: The Snowflake connection object.
    """
    required_keys = ['user', 'password', 'account', 'database', 'schema', 'warehouse', 'role']
    for key in required_keys:
        if key not in sf_config:
            logging.error(f"Missing required configuration key: {key}")
            return None
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

def table_exists(conn, schema, table):
    """
    Check if a table exists in Snowflake.

    Parameters:
    conn (snowflake.connector.SnowflakeConnection): The Snowflake connection object.
    schema (str): The schema name.
    table (str): The table name.

    Returns:
    bool: True if the table exists, False otherwise.
    """
    query = f"SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '{schema}' AND table_name = '{table}'"
    try:
        cursor = conn.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        return result[0] > 0
    except snowflake.connector.Error as e:
        logging.error(f"Error checking existence of table '{schema}.{table}': {e}")
        return False

def count_records_snowflake(start_time, end_time):
    """
    Count records in Snowflake tables within a specified time range.

    Parameters:
    start_time (datetime): The start of the time range.
    end_time (datetime): The end of the time range.

    Returns:
    int: The total record count.
    """
    sf_config = load_config()
    if not sf_config:
        return 0
    conn = None
    try:
        conn = get_snowflake_connection(sf_config)
        if not conn:
            return 0
        record_counts = []
        table_date_columns = {
            'ORDERS': 'DATE',
            'LOCATIONS': 'RECORD_UPDATED_AT',
            'STORES': 'RECORD_UPDATED_AT',
            'CUSTOMERS': 'CUSTOMER_JOINING_DATE',
            'EMPLOYEES': 'RECORD_UPDATED_AT',
            'CATEGORIES': 'RECORD_UPDATED_AT',
            'ITEMS': 'RECORD_UPDATED_AT',
            'CUSTOMER_FEEDBACK': 'DATE',
            'ORDER_ITEMS': 'DATE'
        }
        for table, date_column in table_date_columns.items():
            if table_exists(conn, sf_config['schema'], table):
                cursor = conn.cursor()
                try:
                    if table in ['CUSTOMER_FEEDBACK', 'ORDER_ITEMS']:
                        query = f"""
                            SELECT COUNT(DISTINCT t.ORDER_ID)
                            FROM {sf_config['schema']}.{table} t
                            JOIN {sf_config['schema']}.ORDERS o ON t.ORDER_ID = o.ORDER_ID
                            WHERE o.{date_column} BETWEEN %s AND %s
                        """
                    else:
                        query = f"SELECT COUNT(*) FROM {sf_config['schema']}.{table} WHERE {date_column} BETWEEN %s AND %s"
                    cursor.execute(query, (start_time, end_time))
                    count = cursor.fetchone()[0]
                    record_counts.append(count)
                    logging.info("Count for table %s: %d", table, count)
                finally:
                    cursor.close()
            else:
                logging.warning(f"Table '{table}' does not exist in schema '{sf_config['schema']}'")
        total_record_count = sum(record_counts)
        logging.info(f"Total record count: {total_record_count}")
        return total_record_count
    except Exception as e:
        logging.error(f"Error counting records in Snowflake: {e}")
        return 0
    finally:
        if conn:
            conn.close()
        logging.info("Snowflake connection closed.")

