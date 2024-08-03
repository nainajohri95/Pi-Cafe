import logging
import pandas as pd
from src.python_backend.src.dwh.database import session
from src.python_backend.src.utils.models import Order

def fetch_new_data(model_class, date_column, last_date):
    try:
        data = session.query(model_class).filter(getattr(model_class, date_column) > last_date).all()
        logging.info(f"Successfully fetched new data for {model_class.__tablename__}. Rows fetched: {len(data)}.")
        return data
    except Exception as e:
        logging.error(f"Error fetching data from table {model_class.__tablename__}.", exc_info=True)
        raise


def fetch_order_related_data(model_class, last_date):
    try:
        data = session.query(model_class).join(Order, model_class.Order_id == Order.order_id).filter(
            Order.date > last_date).all()
        logging.info(f"Successfully fetched new data for {model_class.__tablename__}. Rows fetched: {len(data)}.")
        return data
    except Exception as e:
        logging.error(f"Error fetching data from table {model_class.__tablename__}.", exc_info=True)
        raise


def to_dataframe(data):
    try:
        df = pd.DataFrame([item.__dict__ for item in data])
        datetime_columns = [col for col in df.columns if df[col].dtype == 'datetime64[ns]']
        for col in datetime_columns:
            df[col] = df[col].astype('datetime64[ns]').dt.strftime('%Y-%m-%d %H:%M:%S')

        df.drop(['_sa_instance_state'], axis=1, inplace=True)
        logging.info("Successfully converted data to DataFrame.")
        return df
    except Exception as e:
        logging.error("Error converting data to DataFrame.", exc_info=True)
        raise
