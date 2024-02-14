import os
import boto3
from botocore.exceptions import ClientError
import logging

def upload_to_s3(file_name, bucket):
  s3_client = boto3.client('s3')
  s3_object_name = file_name 

  try:
    s3_client.upload_file(file_name, bucket, s3_object_name)
  except Exception as e:
    logging.error(e)
    return False
  
  # remove file locally after succesful upload
  os.remove(s3_object_name)
  return True