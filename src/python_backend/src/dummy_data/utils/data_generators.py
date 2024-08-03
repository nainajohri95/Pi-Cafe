import random
import logging
from datetime import datetime, timedelta
from faker import Faker

from config.settings import (
    NUM_STORES, NUM_CUSTOMERS, NUM_ITEMS, NUM_CATEGORIES, NUM_REGIONS,
    START_DATE, END_DATE
)
from constants.values import CATEGORIES, FOOD_ITEMS, WEIGHTS

fake = Faker('en_IN')

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', datefmt='%Y-%m-%d %H:%M:%S')


"""
    Generate a list of store dictionaries with fake data.

    Returns:
        list: A list of dictionaries, each representing a store.
"""

def generate_stores():
    
    logging.info("Generating stores...")
    stores = []
    for i in range(NUM_STORES):
        try:
            store_employees = generate_employees(i + 1)
            total_salary = sum(emp['salary'] for emp in store_employees)
            fixed_cost = total_salary + random.randint(500, 1500)

            stores.append({
                'store_id': i + 1,
                'region_id': random.randint(1, NUM_REGIONS),
                'name': f"Store_{i + 1}",
                'manager_id': next(emp['employee_id'] for emp in store_employees if emp['position'] == 'Manager'),
                'Fixed_cost': fixed_cost,
                'Maintenance_cost': random.randint(500, 1500),
                'making_cost_modifier': random.uniform(0.8, 1.2),
                'State': fake.state(),
                'City': fake.city(),
                'Opening-date': START_DATE.strftime('%Y-%m-%d'),
                'Record-current-status': 'Active',
                'Record-updated-by': 'System',
                'Record-updated-at':datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'Record-end-date':'2074-12-31'
            })

        except Exception as e:
            logging.error(f"Error generating store {i + 1}: {e}")


    logging.info(f"Generated {len(stores)} stores.")
    return stores


"""
    Generate a list of employee dictionaries for a given store ID.

    Args:
        store_id (int): The ID of the store for which to generate employees.

    Returns:
        list: A list of dictionaries, each representing an employee.
"""    

def generate_employees(store_id):
    employees = []
    try:
        emp_id = 1
        num_employees = random.randint(5, 10)
        manager_created = False
        transaction_data_entry_count = 0
        
        for _ in range(num_employees):
            salary_range = {
                'Manager': (25000, 40000),
                'Chef': (15000, 25000),
                'Cashier': (10000, 15000),
                'Waiter': (8000, 12000)
            }

            position = random.choice(['Waiter', 'Chef', 'Cashier'])
            if not manager_created:
                position = 'Manager'
                manager_created = True
            elif position == 'Cashier' and transaction_data_entry_count < 2:
                position = 'Cashier'
                transaction_data_entry_count += 1
            else:
                position = random.choice(['Waiter', 'Chef'])

            salary = random.randint(*salary_range[position])
            employees.append({
                'employee_id': emp_id,
                'store_id': store_id,
                'name': fake.name(),
                'password': fake.password(),
                'salary': salary,
                'position': position,
                'Joining-date': START_DATE.strftime('%Y-%m-%d'),
                'Record-current-status': 'Active',
                'Record-updated-by': 'System',
                'Record-updated-at':datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'Record-end-date':'2074-12-31'
            })
            emp_id += 1
    except Exception as e:
        logging.error(f"Error generating employees for store ")
    

    return employees

"""
    Generate a list of customer dictionaries with fake data.

    Returns:
        list: A list of dictionaries, each representing a customer.
"""

def generate_customers():
    customers = []
    customer_ids = set()
    num_unique_customers = 0
    current_date = START_DATE
    logging.info("Generating customers...")
    try:
        for _ in range(10):
            operator = random.choice(['98', '70', '89'])
            phone_number = '91' + operator + str(random.randint(10000000, 99999999))
            while phone_number in customer_ids:
                operator = random.choice(['98', '70', '89'])
                phone_number = '91' + operator + str(random.randint(10000000, 99999999))
            email = fake.user_name() + '@gmail.com'
            customers.append({
                'customer_id': phone_number,
                'name': fake.name(),
                'email': email,
                'customer_joining_date': current_date.strftime('%Y-%m-%d'),
                'Record-end-date':'2074-12-31',
                'Record-current-status': 'Active'

            })
            customer_ids.add(phone_number)
            num_unique_customers += 1

        while current_date <= END_DATE:
            new_customers_today = random.choices([0, 3, 4, 5, 6, 7, 8], weights=[20, 20, 15, 15, 10, 10, 10])[0]
            for _ in range(new_customers_today):
                operator = random.choice(['98', '70', '89'])
                phone_number = '91' + operator + str(random.randint(10000000, 99999999))
                while phone_number in customer_ids:
                    operator = random.choice(['98', '70', '89'])
                    phone_number = '91' + operator + str(random.randint(10000000, 99999999))
                email = fake.user_name() + '@gmail.com'
                customers.append({
                    'customer_id': phone_number,
                    'name': fake.name(),
                    'email': email,
                    'customer_joining_date': current_date.strftime('%Y-%m-%d'),
                    'Record-end-date':'2074-12-31',
                    'Record-current-status': 'Active'
                })
                customer_ids.add(phone_number)
                num_unique_customers += 1
            if random.choice([True, False, False]):
                current_date += timedelta(days=1)
            else:
                current_date += timedelta(days=random.randint(2, 5))

    except Exception as e:
        logging.error(f"Error generating employees for store ")
    
    logging.info(f"Generated {len(customers)} customers.")
    return customers, list(customer_ids)

"""
    Generate a list of category dictionaries with fake data.

    Returns:
        list: A list of dictionaries, each representing a category.
"""

def generate_categories():
    categories = []
    logging.info("Generating categories")
    try:
        for i in range(NUM_CATEGORIES):
            categories.append({
                'category_id': i + 1,
                'name': random.choice(['Beverage', 'Pastry', 'Sandwich', 'Salad', 'Dessert']),
                'Launch-date': START_DATE.strftime('%Y-%m-%d'),
                'Record-current-status': 'Active',
                'Record-updated-by': 'System',
                'Record-updated-at':datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'Record-end-date':'2074-12-31'
            })

    except Exception as e:
        logging.error(f"Error generating employees for store ")

    logging.info(f"Generated {len(categories)} categories.")
    
    return categories


"""
    Generate a list of item dictionaries with fake data.

    Args:
        categories (list): A list of category dictionaries.
        stores (list): A list of store dictionaries.

    Returns:
        list: A list of dictionaries, each representing an item.
"""

def generate_items(categories, stores):
    items = []
    launch_date = datetime(2023, 1, 1)

    try:
        logging.info("generating static  items")
        for i, name in enumerate(FOOD_ITEMS[:35], start=1):
            category_id = random.choice(categories)['category_id']
            store = random.choice(stores)
            making_cost = round(random.randint(80, 200) * store['making_cost_modifier'])
            selling_cost = random.randint(making_cost + 20, 450)
            items.append({
                'item_id': i,
                'category_id': category_id,
                'name': name,
                'selling_cost': selling_cost,
                'making_cost': making_cost,
                'launch_date': launch_date.strftime('%Y-%m-%d'),
                'Record-current-status': 'Active',
                'Record-updated-by': 'System',
                'Record-updated-at':datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'Record-end-date':'2074-12-31'
            })
    except Exception as e:
        logging.error(f"Error generating initial items")


    try:
        for i, name in enumerate(FOOD_ITEMS[35:50], start=36):
            category_id = random.choice(categories)['category_id']
            store = random.choice(stores)
            making_cost = round(random.randint(80, 200) * store['making_cost_modifier'])
            selling_cost = random.randint(making_cost + 20, 450)
            new_launch_date = launch_date + timedelta(days=random.randint(1, 60))
            items.append({
                'item_id': i,
                'category_id': category_id,
                'name': name,
                'selling_cost': selling_cost,
                'making_cost': making_cost,
                'launch_date': new_launch_date.strftime('%Y-%m-%d'),
                'Record-current-status': 'Active',
                'Record-updated-by': 'System',
                'Record-updated-at':datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'Record-end-date':'2074-12-31'
            })
    except Exception as e:
        logging.error(f"Error generating extended items ")

    logging.info(f"Generated {len(items)} items.")

    return items

"""
    Generate a list of order dictionaries with fake data.

    Args:
        customers (list): A list of customer dictionaries.
        stores (list): A list of store dictionaries.
        start_date (datetime): The start date for order generation.
        end_date (datetime): The end date for order generation.

    Returns:
        list: A list of dictionaries, each representing an order.
"""

def generate_orders(customers, stores, start_date, end_date):
    orders = []
    order_id = 1
    current_date = start_date
    customer_ids_by_date = {}
    customer_order_modes = {}
    logging.info("generating Orders")
    try:
        while len(orders) < 39000:
            for customer in customers:
                customer_id = customer['customer_id']
                if customer_id not in customer_order_modes:
                    customer_order_modes[customer_id] = ['Dine_in', 'Take_away', 'Delivery']

                store = random.choice(stores)
                order_mode = random.choice(customer_order_modes[customer_id])

                orders.append({
                    'order_id': order_id,
                    'customer_id': customer_id,
                    'store_id': store['store_id'],
                    'date': current_date.strftime('%Y-%m-%d'),
                    'order_mode': order_mode,
                    'price': 0,
                    'Record-current-status': 'Active',
                    'Record-updated-by': 'System',
                    'Record-updated-at':datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                })

                customer_order_modes[customer_id].remove(order_mode)
                if not customer_order_modes[customer_id]:
                    customer_order_modes[customer_id] = ['Dine_in', 'Take_away', 'Delivery']

                order_id += 1

            current_date += timedelta(days=1)
            if current_date > END_DATE:
                break
    except Exception as e:
         logging.error(f"error in generating the orders ")
    
    logging.info(f"generated {len(orders)} orders")

    return orders

"""
    Generate a list of order-item dictionaries with fake data.

    Args:
        orders (list): A list of order dictionaries.
        items (list): A list of item dictionaries.

    Returns:
        list: A list of dictionaries, each representing an order-item relationship.
"""

def generate_order_items(orders, items):
    order_items = []
    logging.info("generating order items")
    try:
        for order in orders:
            num_items_in_order = random.randint(1, 5)
            selected_items = random.sample(items, num_items_in_order)
            total_price = 0
            for item in selected_items:
                quantity = random.randint(1, 3)
                item_price = item['selling_cost'] * quantity
                total_price += item_price
                order_items.append({
                    'Order_id': order['order_id'],
                    'item_id': item['item_id'],
                    'quantity': quantity
                })
            order['price'] = total_price
    except Exception as e:
        logging.error(f"error in generating the orders ")
    
    logging.info(f"generated {len(order_items)} rows in order itmes ")

    return order_items

"""
    Generate a list of customer feedback dictionaries with fake data.

    Args:
        orders (list): A list of order dictionaries.

    Returns:
        list: A list of dictionaries, each representing customer feedback.
"""

def generate_customer_feedback(orders):
    feedback = []
    logging.info("generating customer feedback")
    try:
        for order in orders:
            if random.choice([True, False, False]):
                feedback.append({
                    'Order_id': order['order_id'],
                    'food_rating': random.choices(range(1, 6), weights=WEIGHTS)[0],
                    'customer_exp_rating': random.choices(range(1, 6), weights=WEIGHTS)[0],
                    'ambiance_rating': random.choices(range(1, 6), weights=WEIGHTS)[0]
                })
    except Exception as e:
        logging.error(f"error in generating the customer feedback ")
    
    logging.info(f"generated {len(feedback)} feedbacks")

    return feedback

"""
    Generate a list of location dictionaries with fake data.

    Returns:
        list: A list of dictionaries, each representing a location.
"""

def generate_locations():
    locations = []
    logging.info("generating locations")
    try:
        for i in range(NUM_REGIONS):
            locations.append({
                'region_id': i + 1,
                'name': fake.city(),
                'regional_manager_name': fake.name(),
                'Record-updated-by': 'System',
                'Record-updated-at':datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            })
    except Exception as e:
        logging.error(f"error in generating the orders ")

    logging.info(f"generated {len(locations)} locations")

    return locations
