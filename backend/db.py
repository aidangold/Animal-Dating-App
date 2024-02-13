import os
from dotenv import load_dotenv

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

def configure_app(app):
   load_dotenv()
   connection_string = os.getenv('NEON_POSTGRES_CONNECTION_STRING')
   app.config["SQLALCHEMY_DATABASE_URI"] = connection_string

app = Flask(__name__)
configure_app(app)
db = SQLAlchemy(app)