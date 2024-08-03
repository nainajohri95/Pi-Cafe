import csv
import os
import logging

def write_to_csv(data, filename, fieldnames, folder_path):
    """
    Writes data to a CSV file.
    Parameters:
    data (list of dict): Data to write.
    filename (str): CSV file name.
    fieldnames (list of str): Header field names.
    folder_path (str): Directory to save the file.
    Logs success or errors during the operation.
    """
    try:
        os.makedirs(folder_path, exist_ok=True)
        file_path = os.path.join(folder_path, filename)
        with open(file_path, 'w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            writer.writeheader()
            for row in data:
                writer.writerow(row)
        logging.info(f"{filename} generated with {len(data)} records in {folder_path}.")
    except Exception as e:
        logging.error(f"Error writing to {filename}: {e}")
