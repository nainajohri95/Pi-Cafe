"""
This module initiates the historical data transfer process and logs any errors that occur.
"""

import logging
from log_historical_data_transfer import log_historical_data_transfer

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def main():
    """
    Main function to start the data transfer process.
    """
    try:
        log_historical_data_transfer()
    except Exception as e:
        logging.error("Error during data transfer: %s", str(e))

if __name__ == "__main__":
    main()
