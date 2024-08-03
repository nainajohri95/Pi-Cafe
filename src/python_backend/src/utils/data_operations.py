import pandas as pd
import logging

def fetch_all_data(session, model_class):
    """
    This function fetches all data from the postgre using models 
     """
    try:
        data = session.query(model_class).all()
        logging.info(f"Successfully fetched all data for {model_class.__tablename__}.")
        return data
    except Exception as e:
        logging.error(f"Error fetching data from table {model_class.__tablename__}.", exc_info=True)
        raise

def to_dataframe(data):
    """
    This function is called in main of postgres to sql and it converts the data fetched from
    postgres to dataframe
    """
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
