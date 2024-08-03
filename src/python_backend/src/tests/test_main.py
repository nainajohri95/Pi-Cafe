import unittest
from unittest.mock import patch, MagicMock
from sqlalchemy import create_engine, Column, Integer, String, Float, Date, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import logging
from io import StringIO

# Import the functions you need to test
from utils.data_loader import load_data_from_s3
from config.configure import create_s3_client

# Define your SQLAlchemy Base and models here
Base = declarative_base()

class Store(Base):
    __tablename__ = 'stores'
    store_id = Column(Integer, primary_key=True)
    region_id = Column(Integer)
    name = Column(String)
    manager_id = Column(Integer)
    Fixed_cost = Column(Float)
    Maintenance_cost = Column(Float)
    making_cost_modifier = Column(Float)
    State = Column(String)
    City = Column(String)
    Opening_date = Column(Date)
    Record_end_date = Column(Date)
    Record_current_status = Column(String)
    Record_updated_by = Column(String)
    Record_updated_at = Column(DateTime)

class TestMain(unittest.TestCase):
    def setUp(self):
        # Create an in-memory SQLite database
        self.engine = create_engine('sqlite:///:memory:')
        Base.metadata.create_all(self.engine)  # Create tables
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()

    @patch('config.configure.boto3.client')  # Correct patch path
    def test_create_s3_client(self, mock_boto_client):
        s3_client = MagicMock()
        mock_boto_client.return_value = s3_client
        mock_secrets = {
            "aws_access_key_id": "fake_access_key_id",
            "aws_secret_access_key": "fake_secret_access_key",
            "aws_region_name": "us-west-2"
        }
        client = create_s3_client(mock_secrets)  # Call the actual function with mock secrets
        self.assertIsInstance(client, MagicMock)



    def test_store_model(self):
        new_store = Store(store_id=1, name="Test Store")
        self.session.add(new_store)
        self.session.commit()
        store = self.session.query(Store).filter_by(store_id=1).one()
        self.assertEqual(store.name, "Test Store")


if __name__ == '__main__':
    unittest.main()
