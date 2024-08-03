from src.python_backend.src.dwh.database import session
from utils.models import Base, Employee, Item, Location, Category, Order, OrderItem, Feedback, Customer, Store
from utils.data_operations import fetch_all_data, to_dataframe
from utils.s3_operations import upload_to_s3
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def main():
    try:
        
        # Fetch orders data to create a mapping of order_id to date
        orders_data = fetch_all_data(session, Order)
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
            table_data = fetch_all_data(session, model)
            if table_data:
                df_table = to_dataframe(table_data)
                if date_col and model.__tablename__ in ['order_items', 'customer_feedback']:
                    df_table['order_date'] = df_table[date_col].map(order_id_to_date)
                    date_col = 'order_date'
                upload_to_s3(df_table, model.__tablename__, date_col)
        logging.info("Data transfer completed successfully for all tables.")
    except Exception as e:
        logging.error("Data transfer process encountered an error.", exc_info=True)
    finally:
        session.close()
        logging.info("PostgreSQL session closed.")

if __name__ == "__main__":
    main()
