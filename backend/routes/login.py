from flask import Blueprint, request, jsonify, url_for, session
from sqlalchemy import text
from werkzeug.security import check_password_hash, generate_password_hash
from db import db
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask_mail import Message
from flask import current_app, render_template
from mail import mail

auth_blueprint = Blueprint('auth', __name__)

# this endpoint allows users to log in by submitting their credentials
@auth_blueprint.route('/login', methods=['POST'])
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
        # user is authenticated, set user identifier in session
        session['user_name'] = userName
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@auth_blueprint.route('/logout', methods=['GET', 'POST'])
def logout():
    # remove user information from session
    session.pop('user_name', None)
    return jsonify({'message': 'You have been logged out'}), 200

@auth_blueprint.route('/forgot-password', methods=['POST'])
def request_password_reset():
    # initialize the serializer with the secret key for generating secure tokens
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    userEmail = request.json.get('userEmail')
    query = text("SELECT user_name FROM users WHERE user_email = :userEmail")
    # executes the query and fetches the first result, if any
    user = db.session.execute(query, {'userEmail': userEmail}).fetchone()

    if user:
        # generate a secure token for the password reset
        token = serializer.dumps(userEmail, salt='password-reset-salt')
        # create the reset link with the token as a parameter
        reset_link = f"https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/reset-password/{token}"
        # set up the email message with the reset link
        msg = Message("Password Reset Request", sender="467catdogadoption@gmail.com", recipients=[userEmail])
        msg.body = f"Your password reset link is: {reset_link}\nPlease note that this link will expire in 10 minutes."
        mail.send(msg)
        return jsonify({'message': 'Password reset link sent'}), 200
    # return an error if no user was found with the provided email
    return jsonify({'error': 'Email not found'}), 404

@auth_blueprint.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    # initialize the serializer with the secret key
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    try:
        # attempt to load the email from the token within the expiration time
        userEmail = serializer.loads(token, salt='password-reset-salt', max_age=600)
    except SignatureExpired:
        # return an error if the token has expired
        return jsonify({'error': 'Token has expired'}), 400
    except Exception as e:
        print(e)
        # return an error if the token is invalid or expired
        return jsonify({'error': 'Invalid or expired token'}), 400
    new_password = request.json.get('newpassword')
    # hash the new password for storage
    hashed_password = generate_password_hash(new_password)

    # update the user's password in the database
    query = text("UPDATE users SET user_password = :userPassword WHERE user_email = :userEmail")
    db.session.execute(query, {'userPassword': hashed_password, 'userEmail': userEmail})
    db.session.commit()
    return jsonify({'message': 'Password has been reset', 'Your email': userEmail}), 200

@auth_blueprint.route('/retrieve-username', methods=['POST'])
def retrieve_username():
    userEmail = request.json.get('userEmail')
    query = text("SELECT user_name FROM users WHERE user_email = :userEmail")
    # executes the query and fetches the first result, if any
    user = db.session.execute(query, {'userEmail': userEmail}).fetchone()

    if user:
        # set up the email message with the username
        msg = Message("Username Retrieval", sender="467catdogadoption@gmail.com", recipients=[userEmail])
        msg.body = f"Your username is: {user[0]}"
        mail.send(msg)
        return jsonify({'message': 'Username sent to your email'}), 200
    # return an error if no user was found with the provided email
    return jsonify({'error': 'Email not found'}), 404