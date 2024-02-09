from werkzeug.security import generate_password_hash
from flask import Blueprint, jsonify, request
from sqlalchemy import text
from db import db

register_blueprint = Blueprint('register', __name__)

@register_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    userName = data.get('userName')
    password = data.get('password')
    userEmail = data.get('userEmail')
    userFirstName = data.get('userFirstName')
    userLastName = data.get('userLastName')
    userPhoneNo = data.get('userPhoneNo', '')
    contactAddress = data.get('contactAddress', '')
    userRole = data.get('userRole', 'user')  # default to user role

    query = text("SELECT user_name FROM users WHERE user_name = :userName")
    if db.session.execute(query, {'userName': userName}).fetchone():
        return jsonify({'error': 'Username already exists'}), 409

    hashed_password = generate_password_hash(password)
    insert_query = text("""
    INSERT INTO users (user_name, user_password, user_email, user_first_name, user_last_name, user_phone_no, contact_address, user_role) 
    VALUES (:userName, :userPassword, :userEmail, :userFirstName, :userLastName, :userPhoneNo, :contactAddress, :userRole)
    """)

    db.session.execute(insert_query, {
        'userName': userName, 'userPassword': hashed_password, 'userEmail': userEmail,
        'userFirstName': userFirstName, 'userLastName': userLastName, 'userPhoneNo': userPhoneNo,
        'contactAddress': contactAddress, 'userRole': userRole
    })
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201
