import os
from flask import Blueprint, jsonify, request
from sqlalchemy import text
from db import db
from werkzeug.utils import secure_filename
from uploads.s3_functions import upload_to_s3

pets_blueprint = Blueprint('pets', __name__)

BUCKET = os.getenv('S3_BUCKET')
REGION = os.getenv('AWS_REGION')

# route to create a new pet entry in the database
@pets_blueprint.route('/pets', methods=['POST'])
def add_pet():
    try:
        data = {
            'pet_name': request.form.get('petName'),
            'pet_weight': request.form.get('petWeight'),
            'pet_type': request.form.get('petType'),
            'pet_sex': request.form.get('petSex'),
            'pet_breed': request.form.get('petBreed'),
            'pet_birthday': request.form.get('petBirthday'),
            'good_with_animals': request.form.get('goodWithAnimals'),
            'good_with_children': request.form.get('goodWithChildren'),
            'must_be_leashed': request.form.get('mustBeLeashed'),
            'pet_availability': request.form.get('petAvailability'),
            'pet_picture': f'uploads/{request.files.get("petPicture").filename}',
            'added_date': request.form.get('addedDate'),
            'pet_description': request.form.get('petDescription')
        }

        file_to_upload = request.files.get('petPicture')
        file_to_upload.save(os.path.join('uploads', secure_filename(file_to_upload.filename)))
        upload_success = upload_to_s3(f'uploads/{file_to_upload.filename}', BUCKET)

        if not upload_success:
            return jsonify({'error': 'upload was not a success!'}), 400

        # SQL query to insert new pet data into the pets table
        query = text('''
            INSERT INTO pets (pet_name, pet_weight, pet_type, pet_sex, pet_breed, pet_birthday, good_with_animals, 
                            good_with_children, must_be_leashed, pet_availability, pet_picture, added_date, pet_description)
            VALUES (:pet_name, :pet_weight, :pet_type, :pet_sex, :pet_breed, :pet_birthday, :good_with_animals, 
                    :good_with_children, :must_be_leashed, :pet_availability, :pet_picture, :added_date, :pet_description)
        ''')

        # execute the SQL query with the provided data
        db.session.execute(query, data)
        db.session.commit()
        return jsonify({'message': 'Pet added successfully'}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database add failed: {str(e)}'}), 500

# route to retrieve all pets from the database
@pets_blueprint.route('/pets', methods=['GET'])
def get_pets():
    try: 
        pets = []
        # SQL query to select all entries from the pets table
        query = text('''
                     SELECT *, 
                     EXTRACT(YEAR FROM AGE(NOW(), Pets.pet_birthday)) AS pet_age_in_years,
                     EXTRACT(MONTH FROM AGE(NOW(), Pets.pet_birthday)) AS pet_age_in_months
                     FROM pets
                     ''')
        result = db.session.execute(query)

        for row in result:
            pet_data = {
            'petID': row.pet_id,
            'petAgeInYears': row.pet_age_in_years,
            'petAgeInMonths': row.pet_age_in_months,
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
            'petPicture': f'https://{BUCKET}.s3.{REGION}.amazonaws.com/{row.pet_picture}',
            'addedData': row.added_date,
            'petDescription': row.pet_description,
            }
            pets.append(pet_data)
        return jsonify(pets), 200
    
    except Exception as e:
        return jsonify({'error': f'Database retrieve failed: {str(e)}'}), 500

# route to update an existing pet entry identified by pet_id
@pets_blueprint.route('/pets/<int:pet_id>', methods=['PUT'])
def update_pet(pet_id):
    # check if the pet exists
    pet_exists_query = text("SELECT EXISTS(SELECT 1 FROM pets WHERE pet_id = :pet_id)")
    pet_exists = db.session.execute(pet_exists_query, {'pet_id': pet_id}).scalar()
    
    if not pet_exists:
        return jsonify({'error': 'Pet with specified ID does not exist'}), 404

    # extract JSON data from the request
    data = request.get_json()
    # initialize parts of the SQL update statement and values dictionary
    update_parts = []
    update_values = {'pet_id': pet_id}

    # fields that if included in the request, cannot be updated to empty values
    critical_fields = ['pet_name', 'pet_type', 'pet_sex', 'pet_availability', 'added_date']
    for field in critical_fields:
        if field in data:
            # check if the field value is not empty
            if not data[field].strip():
                return jsonify({'error': f'{field} cannot be updated to an empty value'}), 400
            update_parts.append(f"{field} = :{field}")
            update_values[field] = data[field]

    # include other fields in the update if provided
    optional_fields = ['pet_weight', 'pet_breed', 'pet_birthday', 'good_with_animals', 
                       'good_with_children', 'must_be_leashed', 'pet_picture', 'pet_description']
    for field in optional_fields:
        if field in data:
            update_parts.append(f"{field} = :{field}")
            update_values[field] = data[field]

    # if there are fields to update, construct and execute the update query
    if update_parts:
        try: 
            query = text('''
                UPDATE pets
                SET ''' + ', '.join(update_parts) + '''
                WHERE pet_id = :pet_id
            ''')
            db.session.execute(query, update_values)
            db.session.commit()
            return jsonify({'message': 'Pet updated successfully'}), 200
        
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Database update failed: {str(e)}'}), 500
    else:
        return jsonify({'error': 'No valid fields provided for update'}), 400

# route to delete a pet entry identified by pet_id
@pets_blueprint.route('/pets/<int:pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    try:
        # check if the pet exists to provide a more specific error message if it doesn't
        pet_exists_query = text("SELECT EXISTS(SELECT 1 FROM pets WHERE pet_id = :pet_id)")
        pet_exists = db.session.execute(pet_exists_query, {'pet_id': pet_id}).scalar()
        
        if not pet_exists:
            return jsonify({'error': 'Pet with specified ID does not exist'}), 404
        
        # SQL query to delete the specified pet from the pets table
        query = text("DELETE FROM pets WHERE pet_id = :pet_id")
        result = db.session.execute(query, {'pet_id': pet_id})

        # check if the delete operation had an effect (i.e., if a row was actually deleted)
        if result.rowcount == 0:
            # this case might be redundant due to the pet existence check above but is good for double-checking
            return jsonify({'error': 'No pet found with the specified ID'}), 404

        db.session.commit()
        return jsonify({'message': 'Pet deleted successfully'}), 200

    except Exception as e:
        # catch-all for any other unexpected errors
        return jsonify({'error': f'Database delete failed: {str(e)}'}), 500

# route to filter and sort pets based on query parameters
@pets_blueprint.route('/pets/filter', methods=['GET'])
def filter_and_sort_pets():
    try:
        pets = []
        # retrieve query parameters for filtering and sorting
        filter_params = {
            'pet_type': request.args.get('type'),
            'pet_sex': request.args.get('sex'),
            'pet_breed': request.args.get('breed'),
            'good_with_animals': request.args.get('goodWithAnimals'),
            'good_with_children': request.args.get('goodWithChildren'),
            'must_be_leashed': request.args.get('mustBeLeashed'),
            'pet_availability': request.args.get('availability'),
        }
        sort_order = request.args.get('sort', 'added_date')

        # validate the sort_order against a list of allowed fields
        allowed_sort_fields = [
            'added_date', 'pet_type', 'pet_sex', 'pet_breed',
            'good_with_animals', 'good_with_children', 'must_be_leashed',
            'pet_availability'
        ]
        if sort_order not in allowed_sort_fields:
            return jsonify({'error': 'Invalid sort field'}), 400

        # construct the WHERE clause based on provided filter parameters
        where_clauses = ["{} = :{}".format(k, k) for k, v in filter_params.items() if v is not None]
        where_str = " AND ".join(where_clauses) if where_clauses else "1=1"  # Fallback to a tautology if no filters

        # construct and execute the query with safe sorting and filtering
        query_str = f'''
            SELECT * FROM pets
            WHERE {where_str}
            ORDER BY {sort_order}
        '''
        result = db.session.execute(text(query_str), filter_params)

        for row in result:
            filtered_pet_data = {
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
            pets.append(filtered_pet_data)
        return jsonify(pets), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database filter failed: {str(e)}'}), 500