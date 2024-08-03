import logging
import os
from utils.data_generators import (
    generate_stores, generate_employees, generate_customers, generate_categories,
    generate_items, generate_orders, generate_order_items, generate_customer_feedback,
    generate_locations
)
from utils.file_operations import write_to_csv
from config.settings import START_DATE, END_DATE

"""
This script generates dummy data for various entities such as stores, employees, 
customers, categories, items, orders, order items, customer feedback, and locations. 
It then writes this data to CSV files in the specified folder.

Functions:
- generate_stores(): Generates a list of stores.
- generate_employees(store_id): Generates a list of employees for a given store.
- generate_customers(): Generates a list of customers and their IDs.
- generate_categories(): Generates a list of categories.
- generate_items(categories, stores): Generates a list of items based on categories and stores.
- generate_orders(customers, stores, start_date, end_date): Generates a list of orders.
- generate_order_items(orders, items): Generates a list of order items.
- generate_customer_feedback(orders): Generates customer feedback for orders.
- generate_locations(): Generates a list of locations.
- write_to_csv(data, filename, fieldnames, folder_path): Writes data to a CSV file.

Constants:
- START_DATE: The start date for generating orders.
- END_DATE: The end date for generating orders.

Logging:
- Logs the start of the data generation process.
- Logs any errors encountered during file writing.
"""

logging.info("Starting data generation process.")
stores = generate_stores()
employees = [emp for store in stores for emp in generate_employees(store['store_id'])]
customers, customer_ids = generate_customers()
categories = generate_categories()
items = generate_items(categories, stores)
orders = generate_orders(customers, stores, START_DATE, END_DATE)
order_items = generate_order_items(orders, items)
feedback = generate_customer_feedback(orders)
locations = generate_locations()


folder_path = os.path.join(os.getcwd(), 'dummy_data')


data_files = {
    'stores.csv': (stores, ['store_id', 'region_id', 'name', 'manager_id', 'Fixed_cost', 'Maintenance_cost', 'making_cost_modifier','State','City','Opening-date','Record-end-date','Record-current-status','Record-updated-by','Record-updated-at','Record-end-date']),
    'employees.csv': (employees, ['employee_id', 'store_id', 'name', 'password', 'salary', 'position','Joining-date','Record-end-date','Record-current-status','Record-updated-by','Record-updated-at','Record-end-date']),
    'customers.csv': (customers, ['customer_id', 'name', 'email', 'customer_joining_date','Record-end-date','Record-current-status']),
    'categories.csv': (categories, ['category_id', 'name','Launch-date','Record-current-status','Record-updated-by','Record-updated-at','Record-end-date']),
    'items.csv': (items, ['item_id', 'category_id', 'name', 'selling_cost', 'making_cost', 'launch_date','Record-current-status','Record-updated-by','Record-updated-at','Record-end-date']),
    'orders.csv': (orders, ['order_id', 'customer_id', 'store_id', 'date', 'order_mode', 'price','Record-current-status','Record-updated-by','Record-updated-at']),
    'order_items.csv': (order_items, ['Order_id', 'item_id', 'quantity']),
    'feedback.csv': (feedback, ['Order_id', 'food_rating', 'customer_exp_rating', 'ambiance_rating']),
    'locations.csv': (locations, ['region_id', 'name', 'regional_manager_name','Record-updated-by','Record-updated-at'])
}

try:
    for filename, (data, fieldnames) in data_files.items():
        write_to_csv(data, filename, fieldnames, folder_path)

except Exception as e:
    logging.error(f"An error occurred in execution of writing files: {e}")
