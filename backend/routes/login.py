from flask import Blueprint, request, jsonify
from sqlalchemy import text
from werkzeug.security import check_password_hash
from db import db

login_blueprint = Blueprint('auth', __name__)

@login_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    userName = data.get('userName')
    password = data.get('password')

    if not userName or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    query = text("SELECT user_password FROM users WHERE user_name = :userName")
    result = db.session.execute(query, {'userName': userName}).fetchone()

    if result and check_password_hash(result[0], password):
        # return a success message
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401
