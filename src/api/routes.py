"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email y password son obligatorios"}), 400
    user_exists = User.query.filter_by(email=email).first()
    
    if user_exists:
        return jsonify({"error": "El usuario ya existe"}), 400
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado correctamente"}), 201

@api.route('/login', methods=['POST'])
def login_user():

    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Credenciales inválidas"}), 401
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token, "user": user.serialize()}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():

    current_user_id = get_jwt_identity()
    user = User.query.get(int(current_user_id))

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200

@api.route('/verify-token', methods=['GET'])
@jwt_required()
def verify_token():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        return jsonify({ "user": user.serialize() }), 200
    return jsonify({ "msg": "Usuario no encontrado" }), 404