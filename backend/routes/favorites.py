from flask import Blueprint, jsonify, request
from sqlalchemy import text
from db import db

favorites_blueprint = Blueprint('favorites', __name__)

@favorites_blueprint.route('/favorites')
def get_favorites_by_user_id():
  favorites = []
  requesting_user_id = request.args.get('userID')
  
  if not requesting_user_id:
    return jsonify({'error': 'A User ID (userID) in the argument is required'}), 400

  query = text('''
    SELECT  Pets.pet_id, Pets.pet_name, Pets.pet_weight, Pets.pet_type, Pets.pet_sex, Pets.pet_breed, 
               Pets.pet_birthday, Pets.good_with_animals, Pets.good_with_children, Pets.must_be_leashed,
               Pets.pet_availability, Pets.pet_picture, Pets.added_date, Pets.pet_description
    FROM favorites
    INNER JOIN Pets ON favorites.pet_id = Pets.pet_id
    WHERE favorites.user_id = :user_id
               ''')

  result = db.session.execute(query, {'user_id': requesting_user_id})

  for row in result:
    favorite_pet_data = {
      'petID': row.pet_id,
      'petName': row.pet_name,
      'petWeight': row.pet_weight,
      'petType': row.pet_type,
      'petSex': row.pet_sex,
      'petBreed': row.pet_breed,
      'petBirthday': row.pet_birthday,
      'goodWithAnimals': row.good_with_animals,
      'goodWithChildren': row.good_with_children,
      'mustBeLeashed': row.must_be_leashed,
      'petAvailability': row.pet_availability,
      'petPicture': row.pet_picture,
      'addedData': row.added_date,
      'petDescription': row.pet_description,
    }
    favorites.append(favorite_pet_data)

  return jsonify(favorites)

@favorites_blueprint.route('/favorites', methods=['POST'])
def favorite_pet_for_user():
  data = request.get_json()
  requesting_user_id = data.get('userID')    
  requesting_pet_id = data.get('petID')

  if not requesting_user_id or not requesting_pet_id:
    return jsonify({'error': 'Both user ID (userID) and pet ID (petID) are required'}), 400
  
  query = text('''
    INSERT INTO favorites (user_id, pet_id)
    VALUES (:user_id, :pet_id)
               ''')
  
  try:
    db.session.execute(query, {'user_id': requesting_user_id, 'pet_id': requesting_pet_id})
    db.session.commit()
    return jsonify({'message': 'The pet has been succesfully been favorited'})
  except Exception as e:
    db.session.rollback()
    return jsonify({'error': f'Error favoriting pet: {str(e)}'}), 500
  

@favorites_blueprint.route('/favorites/unfavorite', methods=['POST'])    
def unfavorite_pet_for_user():
  data = request.get_json()
  requesting_user_id = data.get('userID')
  requesting_pet_id = data.get('petID')

  query = text('''
    DELETE FROM favorites
    WHERE user_id = :user_id
    AND pet_id = :pet_id
               ''')
  
  result = db.session.execute(query, {'user_id': requesting_user_id, 'pet_id': requesting_pet_id})

  if result.rowcount >= 1:
    db.session.commit()
    return jsonify({'message': 'The pet has succesfully been unfavorited'})