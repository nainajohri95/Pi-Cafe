import pytest
from datetime import datetime
from utils.data_generators import (
    generate_stores, generate_employees, generate_customers, generate_categories,
    generate_items, generate_orders, generate_order_items, generate_customer_feedback,
    generate_locations
)
from config.settings import NUM_STORES, NUM_REGIONS, START_DATE, END_DATE

def test_generate_stores():
    stores = generate_stores()
    assert len(stores) == NUM_STORES
    for store in stores:
        assert 'store_id' in store
        assert 'region_id' in store
        assert store['region_id'] <= NUM_REGIONS

def test_generate_employees():
    store_id = 1
    employees = generate_employees(store_id)
    assert len(employees) > 0
    for emp in employees:
        assert 'employee_id' in emp
        assert emp['store_id'] == store_id

def test_generate_customers():
    customers, customer_ids = generate_customers()
    assert len(customers) > 0
    assert len(customers) == len(set(customer_ids))
    for customer in customers:
        assert 'customer_id' in customer

def test_generate_categories():
    categories = generate_categories()
    assert len(categories) > 0
    for category in categories:
        assert 'category_id' in category

def test_generate_items():
    categories = generate_categories()
    stores = generate_stores()
    items = generate_items(categories, stores)
    assert len(items) > 0
    for item in items:
        assert 'item_id' in item

def test_generate_orders():
    customers, customer_ids = generate_customers()
    stores = generate_stores()
    orders = generate_orders(customers, stores, START_DATE, END_DATE)
    assert len(orders) > 0
    for order in orders:
        assert 'order_id' in order

def test_generate_order_items():
    customers, customer_ids = generate_customers()
    stores = generate_stores()
    orders = generate_orders(customers, stores, START_DATE, END_DATE)
    items = generate_items(generate_categories(), stores)
    order_items = generate_order_items(orders, items)
    assert len(order_items) > 0
    for order_item in order_items:
        assert 'Order_id' in order_item
        assert 'item_id' in order_item

def test_generate_customer_feedback():
    customers, customer_ids = generate_customers()
    stores = generate_stores()
    orders = generate_orders(customers, stores, START_DATE, END_DATE)
    feedback = generate_customer_feedback(orders)
    assert len(feedback) >= 0
    for fb in feedback:
        assert 'Order_id' in fb

def test_generate_locations():
    locations = generate_locations()
    assert len(locations) == NUM_REGIONS
    for location in locations:
        assert 'region_id' in location

