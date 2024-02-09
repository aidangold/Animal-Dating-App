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
    SELECT  Pets.pet_name, Pets.pet_weight, Pets.pet_type, Pets.pet_breed, 
               Pets.pet_birthday, Pets.pet_disposition, Pets.pet_availability, 
               Pets.pet_picture, Pets.added_date, Pets.pet_description
    FROM favorites
    INNER JOIN Pets ON favorites.pet_id = Pets.pet_id
    WHERE favorites.user_id = :user_id
               ''')

  result = db.session.execute(query, {'user_id': requesting_user_id})

  for row in result:
    favorite_pet_data = {
      'petName': row.pet_name,
      'petWeight': row.pet_weight,
      'petType': row.pet_type,
      'petBreed': row.pet_breed,
      'petBirthday': row.pet_birthday,
      'petDisposition': row.pet_disposition,
      'petAvailability': row.pet_availability,
      'petPicture': row.pet_picture,
      'addedData': row.added_date,
      'petDescription': row.pet_description,
    }
    favorites.append(favorite_pet_data)

  return jsonify(favorites)

@favorites_blueprint.route('/favorites/remove', methods=['POST'])    
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

  db.session.commit()

  if result.rowcount >= 1:
    return jsonify({'message': 'The pet has succesfully been unfavorited'})