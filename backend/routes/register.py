from werkzeug.security import generate_password_hash
from flask import Blueprint, jsonify, request
from sqlalchemy import text
from db import db

register_blueprint = Blueprint('register', __name__)

# the endpoint for user registration
@register_blueprint.route('/signup', methods=['POST'])
def register():
    try:
        # parses the JSON data sent in the request body
        data = request.get_json()
        # extracts individual fields from the JSON data
        userName = data.get('userName')
        password = data.get('password')
        userEmail = data.get('userEmail')
        userFirstName = data.get('userFirstName')
        userLastName = data.get('userLastName')
        userPhoneNo = data.get('userPhoneNo', '') # defaults to an empty string if not provided
        contactAddress = data.get('contactAddress', '') # defaults to an empty string if not provided
        userRole = data.get('userRole', 'user')  # default to user role

        # check if a user with the provided userName already exists in the database
        userName_query = text("SELECT user_name FROM users WHERE user_name = :userName")

        # executes the search query
        if db.session.execute(userName_query, {'userName': userName}).fetchone():
            return jsonify({'error': 'Username already exists'}), 409
        
        # check if a user with the provided userEmail already exists in the database
        userEmail_query = text("SELECT user_email FROM users WHERE user_email = :userEmail")

        # executes the search query
        if db.session.execute(userEmail_query, {'userEmail': userEmail}).fetchone():
            return jsonify({'error': 'Useremail already exists'}), 409

        # generates a hash for the provided password
        hashed_password = generate_password_hash(password)

        # insert the new user's data into the database
        insert_query = text("""
        INSERT INTO users (user_name, user_password, user_email, user_first_name, user_last_name, user_phone_no, contact_address, user_role) 
        VALUES (:userName, :userPassword, :userEmail, :userFirstName, :userLastName, :userPhoneNo, :contactAddress, :userRole)
        """)

        # executes the insert query
        db.session.execute(insert_query, {
            'userName': userName, 'userPassword': hashed_password, 'userEmail': userEmail,
            'userFirstName': userFirstName, 'userLastName': userLastName, 'userPhoneNo': userPhoneNo,
            'contactAddress': contactAddress, 'userRole': userRole
        })
        db.session.commit() # commits the transaction to make the changes persistent in the database
        return jsonify({'message': 'User registered successfully'}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500