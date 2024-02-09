from flask import Blueprint, jsonify, request
from sqlalchemy import text
from db import db

pets_blueprint = Blueprint('pets', __name__)

# route to create a new pet entry in the database
@pets_blueprint.route('/pets', methods=['POST'])
def create_pet():
    # extract JSON data from the request
    data = request.get_json()
    # SQL query to insert new pet data into the pets table
    query = text('''
        INSERT INTO pets (pet_name, pet_weight, pet_type, pet_breed, pet_birthday,
                          pet_disposition, pet_availability, pet_picture, added_date, pet_description)
        VALUES (:pet_name, :pet_weight, :pet_type, :pet_breed, :pet_birthday,
                :pet_disposition, :pet_availability, :pet_picture, :added_date, :pet_description)
    ''')
    # execute the SQL query with the provided data
    db.session.execute(query, data)
    db.session.commit()
    return jsonify({'message': 'Pet created successfully'}), 201

# route to retrieve all pets from the database
@pets_blueprint.route('/pets', methods=['GET'])
def get_pets():
    # SQL query to select all entries from the pets table
    query = text("SELECT * FROM pets")
    result = db.session.execute(query)
    # convert each row to a dictionary and return as a JSON list
    pets = [row._asdict() for row in result]
    return jsonify(pets), 200

# route to update an existing pet entry identified by pet_id
@pets_blueprint.route('/pets/<int:pet_id>', methods=['PUT'])
def update_pet(pet_id):
    # extract JSON data from the request
    data = request.get_json()
    # initialize parts of the SQL update statement and values dictionary
    update_parts = []
    update_values = {'pet_id': pet_id}

    if 'pet_name' in data:
        update_parts.append("pet_name = :pet_name")
        update_values['pet_name'] = data['pet_name']

    if 'pet_type' in data:
        update_parts.append("pet_type = :pet_type")
        update_values['pet_type'] = data['pet_type']

    if 'pet_weight' in data:
        update_parts.append("pet_weight = :pet_weight")
        update_values['pet_weight'] = data['pet_weight']

    if 'pet_breed' in data:
        update_parts.append("pet_breed = :pet_breed")
        update_values['pet_breed'] = data['pet_breed']

    if 'pet_birthday' in data:
        update_parts.append("pet_birthday = :pet_birthday")
        update_values['pet_birthday'] = data['pet_birthday']

    if 'pet_disposition' in data:
        update_parts.append("pet_disposition = :pet_disposition")
        update_values['pet_disposition'] = data['pet_disposition']

    if 'pet_availability' in data:
        update_parts.append("pet_availability = :pet_availability")
        update_values['pet_availability'] = data['pet_availability']

    if 'pet_picture' in data:
        update_parts.append("pet_picture = :pet_picture")
        update_values['pet_picture'] = data['pet_picture']

    if 'added_date' in data:
        update_parts.append("added_date = :added_date")
        update_values['added_date'] = data['added_date']

    if 'pet_description' in data:
        update_parts.append("pet_description = :pet_description")
        update_values['pet_description'] = data['pet_description']

    # if there are fields to update, construct and execute the update query
    if update_parts:
        query = text('''
            UPDATE pets
            SET ''' + ', '.join(update_parts) + '''
            WHERE pet_id = :pet_id
        ''')
        db.session.execute(query, update_values)
        db.session.commit()
        return jsonify({'message': 'Pet updated successfully'}), 200
    else:
        return jsonify({'error': 'No valid fields provided for update'}), 400

# route to delete a pet entry identified by pet_id
@pets_blueprint.route('/pets/<int:pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    # SQL query to delete the specified pet from the pets table
    query = text("DELETE FROM pets WHERE pet_id = :pet_id")
    db.session.execute(query, {'pet_id': pet_id})
    db.session.commit()
    return jsonify({'message': 'Pet deleted successfully'}), 200

# route to filter and sort pets based on query parameters
@pets_blueprint.route('/pets/filter', methods=['GET'])
def filter_and_sort_pets():
    # retrieve query parameters for filtering and sorting
    pet_type = request.args.get('type')
    sort_order = request.args.get('sort', 'added_date')

    # validate the sort_order against a list of allowed fields
    allowed_sort_fields = ['added_date', 'pet_name', 'pet_type', 'pet_weight']
    if sort_order not in allowed_sort_fields:
        return jsonify({'error': 'Invalid sort field'}), 400

    # construct and execute the query with safe sorting and optional filtering
    query_str = '''
        SELECT * FROM pets
        WHERE (:pet_type IS NULL OR pet_type = :pet_type)
        ORDER BY {sort_order}
    '''.format(sort_order=sort_order)
    
    result = db.session.execute(text(query_str), {'pet_type': pet_type})
    pets = [row._asdict() for row in result]
    return jsonify(pets), 200
