from datetime import datetime
import logging
import os
from src.python_backend.src.utils.models import Order, Employee, Item, OrderItem, Store, Category, Location, Feedback, \
    Customer
from src.python_backend.src.dwh.database import session
from src.python_backend.src.utils.s3_utils_inc import upload_to_s3
from src.python_backend.src.utils.data_fetcher_psql import fetch_new_data,to_dataframe,fetch_order_related_data


logging.basicConfig(
    filename='psql_to_s3.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


def load_new_data():
    try:
        last_date_path = 'last_date_time.txt'
        if os.path.exists(last_date_path):
            with open(last_date_path, 'r') as file:
                last_date_str = file.read().strip()
                last_date = datetime.fromisoformat(last_date_str)
        else:
            last_date = datetime(2024, 2, 29)

        orders_data = fetch_new_data(Order, 'date', last_date)
        orders_df = to_dataframe(orders_data)
        order_id_to_date = orders_df.set_index('order_id')['date'].to_dict()

        table_models_with_date = [
            (OrderItem, 'Order_id'),
            (Feedback, 'Order_id'),
            (Item, None),
            (Customer, 'customer_joining_date'),
            (Store, None),
            (Employee, None),
            (Location, None),
            (Category, None),
            (Order, 'date')
        ]

        for model, date_col in table_models_with_date:
            if model.__tablename__ in ['order_items', 'customer_feedback']:
                table_data = fetch_order_related_data(model, last_date)
            else:
                table_data = fetch_new_data(model, date_col if date_col else 'Record_updated_at', last_date)

            if table_data:
                df_table = to_dataframe(table_data)
                print(df_table.dtypes)
                if date_col and model.__tablename__ in ['order_items', 'customer_feedback']:
                    df_table['order_date'] = df_table[date_col].map(order_id_to_date)
                    date_col = 'order_date'
                upload_to_s3(df_table, model.__tablename__, date_col)
        logging.info("New data transfer completed successfully for all tables.")

        new_last_date = datetime.utcnow()
        with open(last_date_path, 'w') as file:
            file.write(new_last_date.isoformat())
    except Exception as e:
        logging.error("New data transfer process encountered an error.", exc_info=True)
    finally:
        session.close()
        logging.info("PostgreSQL session closed.")


if __name__ == "__main__":
    load_new_data()
