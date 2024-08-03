"""
This module provides functionality for generating unique job IDs.
"""

import uuid

def generate_job_id():
    """
    Generate a unique job ID.

    Returns:
    str: A unique job ID.
    """
    return str(uuid.uuid4())
