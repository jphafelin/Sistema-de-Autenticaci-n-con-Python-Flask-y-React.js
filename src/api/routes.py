"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

import requests
import json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required



api = Blueprint('api', __name__)



## USER
#@jwt_required()
@api.route('/register', methods=['GET', 'POST'])
def user():
    if request.method == "GET":
        users = User.query.all()
        results = [user.serialize() for user in users]
        response_body = {"message": "ok",
                        "results": results,
                        "Total_records": len(results)}
        return response_body, 200
    
    elif request.method == "POST":
         
         request_body = request.get_json()
         user = User(            
                     email=request_body['email'],
                     password=request_body['password']
                    
                     
                    )
         db.session.add(user)
         db.session.commit()
         return jsonify(request_body), 200
        
        
 
    else:
        response_body = {"message": "Error. Method not allowed."}
        return response_body, 400

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = email).first()
    id = user.id
    if not email or not password:
        return jsonify({"msg": "You need to send username and password"}), 400
    if not user:
        return jsonify({"msg": "User doesn't exist"}), 404
    if user and user.password == password:
        access_token = create_access_token(identity=email)
        response_body = {"access_token": access_token, "msg":"usuario logeado ok", "email":email, "id":id}
        return response_body, 200
    else:
        return jsonify({"msg": "Error. Password is wrong."}), 400

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    if current_user:
        return jsonify(logged_in_as=current_user), 200
    else:
        return jsonify({"msg": "Not authorized."}), 400