"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from base64 import b64encode
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import cloudinary.uploader as uploader
from .models import User

api = Blueprint('api', __name__)


def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")


def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")



@api.route('/user', methods=['POST'])
def register_user():
    if request.method == "POST":
        data_files = request.files
        data_form = request.form
        

        data = {
            "name": data_form.get("name"),
            "lastname": data_form.get("lastname"),
            "email": data_form.get("email"),
            "password": data_form.get("password"),
            "image": data_files.get("image")
        }

        
        if data is None:
            return jsonify({"msg": "Missing JSON in request"}), 400
        if data.get("name") is None:
            return jsonify({"msg": "Missing name parameter"}), 400
        if data.get("lastname") is None:
            return jsonify({"msg": "Missing last name parameter"}), 400
        if data.get("email") is None:
            return jsonify({"msg": "Missing email parameter"}), 400
        if data.get("password") is None:
            return jsonify({"msg": "Missing password parameter"}), 400
        

        user = User.query.filter_by(email=data.get("email")).first()
        if user is not None:
            return jsonify({"msg": "Email already registered"}), 400

        password_salt = b64encode(os.urandom(32)).decode('utf-8')
        password_hash = set_password(data.get("password"), password_salt)

        if data.get("image") is not None:
            response_image = uploader.upload(data.get("image"))
            data.update({"image": response_image.get("url")})

        new_user = User(
            name=data.get("name"),
            lastname=data.get("lastname"),
            email=data.get("email"),
            password=password_hash,
            image=data.get("image"),
            salt=password_salt
        )

        db.session.add(new_user)
        try:
            db.session.commit()
            return jsonify({"msg": "User successfully registered"}), 201
        except Exception as error:
            db.session.rollback()
            return jsonify({"msg": "Error registering user", "error": str(error)}), 500
        return jsonify([]), 200


@api.route('/user/<int:id>', methods=['GET'])
#@jwt_required
def get_user(id):
    # if request.method == "GET":
    #     user_id = get_jwt_identity()
    # if user_id == id:
         user = User.query.get(id)
         if user:
             return jsonify(user.serialize()), 200
         else:
             return jsonify({'error': 'User not found'}), 404
    # else:
    #     return jsonify({'error': 'Unauthorized'}), 401      
