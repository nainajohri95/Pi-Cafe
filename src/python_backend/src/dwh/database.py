# database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote_plus
from src.python_backend.src.config.configure import db_username, db_password, db_host, db_port, db_name

# Encode the password for the URL
db_password_encoded = quote_plus(db_password.encode('utf-8'))

# SQLAlchemy engine and session
engine = create_engine(f"postgresql://{db_username}:{db_password_encoded}@{db_host}:{db_port}/{db_name}")
Session = sessionmaker(bind=engine)
session = Session()
