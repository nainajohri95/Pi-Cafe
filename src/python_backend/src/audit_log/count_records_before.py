"""
This module contains functions to count records in PostgreSQL before a data transfer process.
"""
import logging
import psycopg2
from config import db_params

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def record_count_before(start_time, end_time):
    """
    Count records in PostgreSQL tables within a specified time range.

    Parameters:
    start_time (datetime): The start of the time range.
    end_time (datetime): The end of the time range.

    Returns:
    int: The total record count.
    """
    postgres_config = {
        'dbname': db_params['dbname'],
        'user': db_params['user'],
        'password': db_params['password'],
        'host': db_params['host'],
        'port': db_params['port']
    }

    table_queries = {
        'orders': "SELECT COUNT(*) FROM private.orders WHERE date BETWEEN %s AND %s",
        'location': 'SELECT COUNT(*) FROM private.locations WHERE "Record_updated_at" BETWEEN %s AND %s',
        'store': 'SELECT COUNT(*) FROM private.stores WHERE "Record_updated_at" BETWEEN %s AND %s',
        'customer': 'SELECT COUNT(*) FROM private.customers WHERE "customer_joining_date" BETWEEN %s AND %s',
        'employee': 'SELECT COUNT(*) FROM private.employees WHERE "Record_updated_at" BETWEEN %s AND %s',
        'category': 'SELECT COUNT(*) FROM private.categories WHERE "Record_updated_at" BETWEEN %s AND %s',
        'item': 'SELECT COUNT(*) FROM private.items WHERE "Record_updated_at" BETWEEN %s AND %s',
        'customer_feedback': '''
            SELECT COUNT(DISTINCT cf."Order_id")
            FROM private.customer_feedback cf
            JOIN private.orders o ON cf."Order_id" = o."order_id"
            WHERE o.date BETWEEN %s AND %s
        ''',
        'order_items': '''
            SELECT COUNT(DISTINCT oi."Order_id")
            FROM private.order_items oi
            JOIN private.orders o ON oi."Order_id" = o."order_id"
            WHERE o.date BETWEEN %s AND %s
        '''
    }

    conn = None
    cursor = None
    total_record_count = 0

    try:
        conn = psycopg2.connect(**postgres_config)
        if conn.status == psycopg2.extensions.STATUS_READY:
            logging.info("Successfully connected to PostgreSQL.")
        else:
            logging.warning("Connection to PostgreSQL established, but status is not ready.")

        cursor = conn.cursor()

        # Construct and execute the query to fetch counts from multiple tables
        for table, query in table_queries.items():
            logging.info("Counting records in table: %s", table)
            cursor.execute(query, (start_time, end_time))
            count = cursor.fetchone()[0]
            total_record_count += count
            logging.info("Count for table %s: %d", table, count)
        logging.info("Total record count: %d", total_record_count)
        return total_record_count

    except psycopg2.Error as e:
        logging.error("Error connecting to PostgreSQL or counting records: %s", str(e))
        return 0

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logging.info("PostgreSQL connection closed.")
