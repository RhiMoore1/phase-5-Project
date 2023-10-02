#!/usr/bin/env python3

# Standard library imports

# Remote library imports
import os
from flask import request, Flask, jsonify, make_response, current_app, abort, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_migrate import Migrate
from sqlalchemy import MetaData
from dotenv import load_dotenv
# Local imports
from config import app, db, api
# Add your model imports
from models import User, Park, Review, Favorite, db

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


# ALL PARKS
class Parks(Resource):
    def get(self):
 
        parks = []
        for park in Park.query.all():
            park_dict = {
                "name": park.name,
                "description": park.description,
                "location": park.location,
            }
            parks.append(park_dict)
        
        response = make_response(
            jsonify(parks),
            200,
            {"Content-Type": "application/json"}
        )
    
        return response  
    
    
# ADD A PARK
    def post(self):
        data = request.get_json()

        new_park = Park(
            name=data['name'],
            description=data['description'],
            location=data['location'],
        )

        db.session.add(new_park)
        db.session.commit()

        response_dict = new_park.to_dict()
        response = make_response(
            jsonify(response_dict),
            200,
            {"Content-Type": "application/json"}
        )
        return response
api.add_resource(Parks, '/parks')


# PARKS BY ID
class ParkByID(Resource):
    def get(self, id):
        park = Park.query.filter_by(id=id).first()

        if not park:
            response_body = '<h1>404 park not found</h1>'
            response = make_response(response_body, 404)
            return response
            
        park_data = {
            "id": park.id,
            "name": park.name,
            "description": park.description,
            "location": park.location,
        }

        response = make_response(
            jsonify(park_data),
            200,
            {"Content-Type": "application/json"}
        )
        return response


# DELETE A PARK
    def delete(self, id):

        park = Park.query.filter_by(id=id).first()
        Favorite.query.filter_by(park_id=id).delete()
        Review.query.filter_by(park_id=id).delete()
        db.session.delete(park)
        db.session.commit()

        response_dict = {"message": "park successfully deleted"}

        response = make_response(
            response_dict,
            200
        )
        return response

# recursion error #
# UPDATE A PARK
    def patch(self, id):

        park = Park.query.filter_by(id=id).first()
    
        data = request.get_json()
        for attr in data:
            setattr(park, attr, data[attr])
            
        db.session.add(park)
        db.session.commit()

        response = make_response(
            jsonify(park.to_dict()),
            200,
            {"Content-Type": "application/json"}
        )
        return response, 200

api.add_resource(ParkByID, '/parks/<int:id>')






if __name__ == '__main__':
    app.run(port=5555, debug=True)

