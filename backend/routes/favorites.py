import os
from flask import Blueprint, jsonify, request
from sqlalchemy import text
from db import db

favorites_blueprint = Blueprint('favorites', __name__)

BUCKET = os.getenv('S3_BUCKET')
REGION = os.getenv('AWS_REGION')

@favorites_blueprint.route('/favorites')
def get_favorites_by_user_id():
  try:
    favorites = []
    requesting_user_id = request.args.get('userID')
    
    if not requesting_user_id:
      return jsonify({'error': 'A User ID (userID) in the argument is required'}), 400

    query = text('''
      SELECT Pets.*, 
      EXTRACT(YEAR FROM AGE(NOW(), Pets.pet_birthday)) AS pet_age_in_years,
      EXTRACT(MONTH FROM AGE(NOW(), Pets.pet_birthday)) AS pet_age_in_months
      FROM favorites
      INNER JOIN Pets ON favorites.pet_id = Pets.pet_id
      WHERE favorites.user_id = :user_id
                ''')

    result = db.session.execute(query, {'user_id': requesting_user_id})

    for row in result:
      favorite_pet_data = {
        'petID': row.pet_id,
        'petName': row.pet_name,
        'petAgeInYears': row.pet_age_in_years,
        'petAgeInMonths': row.pet_age_in_months,
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
      favorites.append(favorite_pet_data)

    return jsonify(favorites)
  except Exception as e:
    return jsonify({'error': f'Error retrieving all favorited pet: {str(e)}'}), 500

@favorites_blueprint.route('/favorites', methods=['POST'])
def favorite_pet_for_user():
  try:
    data = request.get_json()
    requesting_user_id = data.get('userID')    
    requesting_pet_id = data.get('petID')

    if not requesting_user_id or not requesting_pet_id:
      return jsonify({'error': 'Both user ID (userID) and pet ID (petID) are required'}), 400
    
    insert_query = text('''
      INSERT INTO favorites (user_id, pet_id)
      VALUES (:user_id, :pet_id)
                ''')
  
    db.session.execute(insert_query, {'user_id': requesting_user_id, 'pet_id': requesting_pet_id})
    db.session.commit()

    return jsonify({'message': 'The pet has been succesfully been favorited'})
  except Exception as e:
    db.session.rollback()
    return jsonify({'error': f'Error favoriting pet: {str(e)}'}), 500
  
@favorites_blueprint.route('/favorites/unfavorite', methods=['POST'])    
def unfavorite_pet_for_user():
  try:
    data = request.get_json()

    requesting_user_id = data.get('userID')
    requesting_pet_id = data.get('petID')

    if not requesting_user_id or not requesting_pet_id:
      return jsonify({'error': 'Both user ID (userID) and pet ID (petID) are required'}), 400

    query = text('''
      DELETE FROM favorites
      WHERE user_id = :user_id
      AND pet_id = :pet_id
                ''')
  
    result = db.session.execute(query, {'user_id': requesting_user_id, 'pet_id': requesting_pet_id})

    if result.rowcount == 0:
      return jsonify({'error': 'Pet is not favorited by user'}), 400
    
    if result.rowcount >= 1:
      db.session.commit()
      return jsonify({'message': 'The pet has succesfully been unfavorited'})
  except Exception as e:
    db.session.rollback()
    return jsonify({'error': f'Error unfavoriting pet: {str(e)}'}), 500