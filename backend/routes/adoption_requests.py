import os
from flask import Blueprint, jsonify, request
from sqlalchemy import text
from db import db

adoption_requests_blueprint = Blueprint('adoption_requests_blueprint', __name__)

BUCKET = os.getenv('S3_BUCKET')
REGION = os.getenv('AWS_REGION')

@adoption_requests_blueprint.route('/user_adoption_requests', methods=['GET'])
def get_adoption_requests_by_user_id():
  try:
    adoption_requests_data = []
    requesting_user_id = request.args.get('userID')

    if not requesting_user_id:
      return jsonify({'error': 'A User ID (userID) in the argument is required'}), 400

    query = text('''
      SELECT pets.*,
      EXTRACT(YEAR FROM AGE(NOW(), pets.pet_birthday)) AS pet_age
      FROM adoption_requests
      INNER JOIN pets on adoption_requests.pet_id = pets.pet_id
      WHERE adoption_requests.user_id = :user_id           
                 ''')
    
    result = db.session.execute(query, {'user_id': requesting_user_id})

    for row in result:
      pet_data = {
        'petID': row.pet_id,
        'petName': row.pet_name,
        'petAge': row.pet_age,
        'petWeight': row.pet_weight,
        'petType': row.pet_type,
        'petSex': row.pet_sex,
        'petBreed': row.pet_breed,
        'petBirthday': row.pet_birthday,
        'goodWithAnimals': row.good_with_animals,
        'goodWithChildren': row.good_with_children,
        'mustBeLeashed': row.must_be_leashed,
        'petAvailability': row.pet_availability,
        'petPicture': f'https://{BUCKET}.s3.{REGION}.amazonaws.com/{row.pet_picture}',
        'addedData': row.added_date,
        'petDescription': row.pet_description,
      }
      adoption_requests_data.append(pet_data)

    return jsonify(adoption_requests_data)
  except Exception as e:
    return jsonify({'error': f'Error retrieving adoption request data for user: {str(e)}'}), 500

@adoption_requests_blueprint.route('/adoption_requests', methods=['GET'])
def get_adoption_requests():
  try:
    adoption_requests_data = []

    query = text('''
      SELECT 
        pets.*,
        EXTRACT(YEAR FROM AGE(NOW(), pets.pet_birthday)) AS pet_age,
        users.user_first_name,
        users.user_last_name,
        users.user_email
      FROM 
        adoption_requests
      INNER JOIN 
        pets on adoption_requests.pet_id = pets.pet_id
      INNER JOIN 
        users on adoption_requests.user_id = users.user_id
                 ''')
    
    result = db.session.execute(query)

    for row in result:
      pet_data = {
        'petID': row.pet_id,
        'petName': row.pet_name,
        'petAge': row.pet_age,
        'petWeight': row.pet_weight,
        'petType': row.pet_type,
        'petSex': row.pet_sex,
        'petBreed': row.pet_breed,
        'petBirthday': row.pet_birthday,
        'goodWithAnimals': row.good_with_animals,
        'goodWithChildren': row.good_with_children,
        'mustBeLeashed': row.must_be_leashed,
        'petAvailability': row.pet_availability,
        'petPicture': f'https://{BUCKET}.s3.{REGION}.amazonaws.com/{row.pet_picture}',
        'addedData': row.added_date,
        'petDescription': row.pet_description,
        'userFirstName': row.user_first_name,
        'userLastName': row.user_last_name,
        'userEmail': row.user_email
      }
      adoption_requests_data.append(pet_data)

    return jsonify(adoption_requests_data)
  except Exception as e:
    return jsonify({'error': f'Error retrieving adoption request data for user: {str(e)}'}), 500

@adoption_requests_blueprint.route('/adoption_requests', methods=['POST'])
def create_adoption_request():
  try:
    data = request.get_json()
    requesting_user_id = data.get('userID')    
    requesting_pet_id = data.get('petID')
    
    if not requesting_user_id or not requesting_pet_id:
      return jsonify({'error': 'Both user ID (userID) and pet ID (petID) are required'}), 400
    
    query = text('''
      INSERT INTO adoption_requests (user_id, pet_id)
      VALUES (:user_id, :pet_id)
                ''')
    
    db.session.execute(query, ({'user_id': requesting_user_id, 'pet_id': requesting_pet_id}))
    db.session.commit()

    return jsonify({'message': 'An adoption request has been created'})

  except Exception as e:
    db.session.rollback()
    return jsonify({'error': f'Error creating an adoption request: {str(e)}'}), 500




