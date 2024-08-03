
CREATE TABLE dim_customer (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    customer_joining_report DATE,
    record_updated_by VARCHAR(50),
    record_updated_at TIMESTAMP,
    record_current_status VARCHAR(20),
    record_end_date DATE
);


CREATE TABLE dim_time (
    item_id INT PRIMARY KEY,
    hour INT,
    min INT,
    sec INT
);


CREATE TABLE dim_category (
    category_id INT PRIMARY KEY,
    name VARCHAR(100),
    record_start_date DATE,
    record_end_date DATE,
    record_current_status VARCHAR(20),
    record_updated_by VARCHAR(50),
    record_updated_at TIMESTAMP
);


CREATE TABLE dim_store (
    store_id INT PRIMARY KEY,
    region VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    fixed_cost DECIMAL(10, 2),
    operational_hours VARCHAR(50),
    record_start_date DATE,
    record_end_date DATE,
    record_current_status VARCHAR(20),
    record_updated_by VARCHAR(50),
    record_updated_at TIMESTAMP
);


CREATE TABLE dim_item (
    item_id INT PRIMARY KEY,
    name VARCHAR(100),
    selling_cost DECIMAL(10, 2),
    making_cost DECIMAL(10, 2),
    launch_date DATE,
    record_end_date DATE,
    record_current_status VARCHAR(20),
    record_updated_by VARCHAR(50),
    record_updated_at TIMESTAMP
);


CREATE TABLE dim_date (
    date_id INT PRIMARY KEY,
    year INT,
    quarter INT,
    month INT,
    day INT
);

CREATE TABLE dim_order_mode (
    order_mode_id INT PRIMARY KEY,
    order_type VARCHAR(100),
    record_start_date DATE,
    record_end_date DATE,
    record_current_status VARCHAR(20),
    record_updated_by VARCHAR(50),
    record_updated_at TIMESTAMP
);