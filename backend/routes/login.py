from flask import Blueprint, request, jsonify
from sqlalchemy import text
from werkzeug.security import check_password_hash
from db import db

login_blueprint = Blueprint('auth', __name__)

# this endpoint allows users to log in by submitting their credentials
@login_blueprint.route('/login', methods=['POST'])
def login():
    # parses the JSON data sent in the request body
    data = request.get_json()
    userName = data.get('userName')
    password = data.get('password')

    # checks if both username and password are provided in the request
    if not userName or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # retrieve the hashed password from the database for the given username
    # the query uses named parameters to prevent SQL injection
    query = text("SELECT user_password FROM users WHERE user_name = :userName")
    # executes the query and fetches the first result, if any
    result = db.session.execute(query, {'userName': userName}).fetchone()

    # checks if a result was found and if the provided password matches the hashed password stored in the database
    # the 'check_password_hash' function is used for secure password verification
    if result and check_password_hash(result[0], password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401
