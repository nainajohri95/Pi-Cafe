from S3_to_Snowflake.aws_s3 import list_recent_files
from S3_to_Snowflake.main import main
# from aws_s3 import list_recent_files

import sys
sys.path.append('python_backend/src/S3_to_Snowflake/aws_s3.py')



print(sys.path)
def pipeline():
    main()

if __name__=="__main__":
    # pass
    pipeline()