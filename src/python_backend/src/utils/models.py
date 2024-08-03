# models.py

from sqlalchemy import Column, BigInteger, String, Float, Date, TIMESTAMP
from sqlalchemy.orm import declarative_base
from src.python_backend.src.dwh.database import engine

Base = declarative_base()

class Employee(Base):
    __tablename__ = 'employees'
    __table_args__ = {'schema': 'private'}
    employee_id = Column(BigInteger, primary_key=True)
    store_id = Column(BigInteger)
    name = Column(String)
    password = Column(String)
    salary = Column(Float)
    position = Column(String)
    Joining_date = Column(Date)
    Record_end_date = Column(Date)
    Record_current_status = Column(String)
    Record_updated_by = Column(String)
    Record_updated_at = Column(TIMESTAMP)


class Item(Base):
    __tablename__ = 'items'
    __table_args__ = {'schema': 'private'}
    item_id = Column(BigInteger, primary_key=True)
    category_id = Column(BigInteger)
    name = Column(String)
    selling_cost = Column(Float)
    making_cost = Column(Float)
    launch_date = Column(Date)
    Record_current_status = Column(String)
    Record_updated_by = Column(String)
    Record_updated_at = Column(TIMESTAMP)
    Record_end_date = Column(Date)


class Location(Base):
    __tablename__ = 'locations'
    __table_args__ = {'schema': 'private'}
    region_id = Column(BigInteger, primary_key=True)
    name = Column(String)
    regional_manager_name = Column(String)
    Record_updated_by = Column(String)
    Record_updated_at = Column(TIMESTAMP)


class Category(Base):
    __tablename__ = 'categories'
    __table_args__ = {'schema': 'private'}
    category_id = Column(BigInteger, primary_key=True)
    name = Column(String)
    Launch_date = Column(Date)
    Record_current_status = Column(String)
    Record_updated_by = Column(String)
    Record_updated_at = Column(TIMESTAMP)
    Record_end_date = Column(Date)


class Order(Base):
    __tablename__ = 'orders'
    __table_args__ = {'schema': 'private'}
    order_id = Column(BigInteger, primary_key=True)
    customer_id = Column(BigInteger)
    store_id = Column(BigInteger)
    date = Column(TIMESTAMP)  # Changed to TIMESTAMP
    order_mode = Column(String)
    price = Column(BigInteger)
    Record_current_status = Column(String)
    Record_updated_by = Column(String)
    Record_updated_at = Column(TIMESTAMP)


class OrderItem(Base):
    __tablename__ = 'order_items'
    __table_args__ = {'schema': 'private'}
    orderitem_id = Column(BigInteger, primary_key=True)
    Order_id = Column(BigInteger)
    item_id = Column(BigInteger)
    quantity = Column(BigInteger)


class Feedback(Base):
    __tablename__ = 'customer_feedback'
    __table_args__ = {'schema': 'private'}
    feedback_id = Column(BigInteger, primary_key=True)
    Order_id = Column(BigInteger)
    food_rating = Column(BigInteger)
    customer_exp_rating = Column(BigInteger)
    ambiance_rating = Column(BigInteger)


class Customer(Base):
    __tablename__ = 'customers'
    __table_args__ = {'schema': 'private'}
    customer_id = Column(BigInteger, primary_key=True)
    name = Column(String)
    email = Column(String)
    customer_joining_date = Column(Date)
    Record_end_date = Column(Date)
    Record_current_status = Column(String)


class Store(Base):
    __tablename__ = 'stores'
    __table_args__ = {'schema': 'private'}
    store_id = Column(BigInteger, primary_key=True)
    region_id = Column(BigInteger)
    name = Column(String)
    manager_id = Column(BigInteger)
    Fixed_cost = Column(Float)
    Maintenance_cost = Column(Float)
    making_cost_modifier = Column(Float)
    State = Column(String)
    City = Column(String)
    Opening_date = Column(Date)
    Record_end_date = Column(Date)
    Record_current_status = Column(String)
    Record_updated_by = Column(String)
    Record_updated_at = Column(TIMESTAMP)


# Create all tables
Base.metadata.create_all(engine)

# Define a mapping of table names to model classes
table_to_model = {
    'employees': Employee,
    'items': Item,
    'locations': Location,
    'categories': Category,
    'orders': Order,
    'order_items': OrderItem,
    'customer_feedback': Feedback,
    'customers': Customer,
    'stores': Store
}
