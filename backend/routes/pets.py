from flask import Blueprint, jsonify, request
from sqlalchemy import text
from db import db

pets_blueprint = Blueprint('pets', __name__)