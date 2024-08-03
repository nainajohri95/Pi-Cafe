import pytest
from unittest.mock import patch, Mock
from datetime import datetime, timedelta
import boto3
from botocore.stub import Stubber

# Import the functions to be tested
from config import get_secret
from count_records_before import record_count_before
from count_records_after import count_records_snowflake
from insert_audit import insert_audit_log


# Test for config.py
def test_get_secret(monkeypatch):
    secret_name = "picafe_secrets_team2"
    secret_string = '{"datasource_url": "postgresql://username:password@host:5432/dbname", "datasource_username": "username", "datasource_pass": "password", "jpa_schema": "schema"}'
    secret_response = {
        "SecretString": secret_string
    }

    client = boto3.client('secretsmanager', region_name='ap-south-1')
    with Stubber(client) as stubber:
        stubber.add_response('get_secret_value', secret_response, {'SecretId': secret_name})

        monkeypatch.setattr(boto3, 'client', lambda *args, **kwargs: client)

        secret = get_secret(secret_name)
        assert secret['datasource_url'] == "postgresql://username:password@host:5432/dbname"
        assert secret['datasource_username'] == "username"
        assert secret['datasource_pass'] == "password"
        assert secret['jpa_schema'] == "schema"


# Test for count_records_before.py
@patch('psycopg2.connect')
def test_record_count_before(mock_connect):
    start_time = datetime.now() - timedelta(days=10)
    end_time = datetime.now()

    mock_conn = Mock()
    mock_cursor = Mock()
    mock_connect.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor
    mock_cursor.fetchone.return_value = [10]

    result = record_count_before(start_time, end_time)

    assert result == 90  # 9 tables * 10 records each


# Test for count_records_after.py
@patch('snowflake.connector.connect')
def test_count_records_snowflake(mock_connect):
    start_time = datetime.now() - timedelta(days=7)
    end_time = datetime.now()

    mock_conn = Mock()
    mock_cursor = Mock()
    mock_connect.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor
    mock_cursor.fetchone.return_value = [10]

    result = count_records_snowflake(start_time, end_time)

    assert result == 90  # 9 tables * 10 records each


# Test for insert_audit.py
@patch('snowflake.connector.connect')
def test_insert_audit_log(mock_connect):
    mock_conn = Mock()
    mock_cursor = Mock()
    mock_connect.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor

    insert_audit_log(
        event_type='insert',
        record_count_before=100,
        record_count_after=100,
        duration=5.0,
        job_start_time='2023-01-01 00:00:00',
        job_end_time='2023-01-01 00:05:00',
        status='success',
        error_message='',
        pipeline_name='historical',
        source_system='ec2_postgres',
        target_system='snowflake',
        job_id='1234',
        alert_triggered=False,
        retry_status=False
    )

    assert mock_cursor.execute.called
    assert mock_conn.commit.called
