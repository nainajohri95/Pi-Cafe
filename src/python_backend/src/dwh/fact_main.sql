CREATE TABLE transaction_fact_order (
    order_id INT PRIMARY KEY,
    time_id INT,
    date_id INT,
    store_id INT,
    customer_id INT,
    item_id INT,
    category_id INT,
    order_mode_id INT,
    order_price DECIMAL(10, 2),
    customer_exp_eating INT,
    food_rating INT,
    ambiance_rating INT,
    record_updated_by VARCHAR(50),
    record_updated_at TIMESTAMP,
    record_current_status VARCHAR(20),
    FOREIGN KEY (time_id) REFERENCES dim_time(item_id),
    FOREIGN KEY (date_id) REFERENCES dim_date(date_id),
    FOREIGN KEY (store_id) REFERENCES dim_store(store_id),
    FOREIGN KEY (customer_id) REFERENCES dim_customer(customer_id),
    FOREIGN KEY (item_id) REFERENCES dim_item(item_id),
    FOREIGN KEY (category_id) REFERENCES dim_category(category_id),
    FOREIGN KEY (order_mode_id) REFERENCES dim_order_mode(order_mode_id)
);

CREATE TABLE fact_store (
    store_id INT,
    date_id INT,
    order_mode_id INT,
    total_customer INT,
    count_new_customer INT,
    total_sale INT,
    total_price DECIMAL(10, 2),
    total_expenses DECIMAL(10, 2),
    profit DECIMAL(10, 2),
    record_updated_by VARCHAR(50),
    record_updated_at TIMESTAMP,
    record_current_status VARCHAR(20),
    PRIMARY KEY (store_id, date_id, order_mode_id),
    FOREIGN KEY (store_id) REFERENCES dim_store(store_id),
    FOREIGN KEY (date_id) REFERENCES dim_date(date_id),
    FOREIGN KEY (order_mode_id) REFERENCES dim_order_mode(order_mode_id)
);

CREATE TABLE fact_ratings (
    order_id INT,
    date_id INT,
    count_customer_exp_rating INT,
    count_food_rating INT,
    count_ambiance_rating INT,
    record_updated_by VARCHAR(50),
    record_updated_at TIMESTAMP,
    record_current_status VARCHAR(20),
    PRIMARY KEY (order_id, date_id),
    FOREIGN KEY (order_id) REFERENCES dim_store(store_id),
    FOREIGN KEY (date_id) REFERENCES dim_date(date_id)
);

CREATE TABLE fact_item (
    store_id INT,
    date_id INT,
    item_id INT,
    category_id INT,
    quantity_id INT,
    COGS DECIMAL(10, 2),
    record_updated_by VARCHAR(50),
    record_updated_at TIMESTAMP,
    record_current_status VARCHAR(20),
    PRIMARY KEY (store_id, date_id, item_id, category_id),
    FOREIGN KEY (store_id) REFERENCES dim_store(store_id),
    FOREIGN KEY (date_id) REFERENCES dim_date(date_id),
    FOREIGN KEY (item_id) REFERENCES dim_item(item_id),
    FOREIGN KEY (category_id) REFERENCES dim_category(category_id)
);