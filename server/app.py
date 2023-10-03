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
                "id": park.id,
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

# PARKS REVIEWS
class ParksWithReviews(Resource):
    def get(self):
        parks = Park.query.all()
        parks_with_reviews = []

        for park in parks:
            park_dict = {
                "name": park.name,
                "description": park.description,
                "location": park.location,
                "id": park.id,
                "reviews": []
            }

            reviews = Review.query.filter_by(park_id=park.id).all()

            for review in reviews:
                review_dict = {
                    "title": review.title,
                    "id": review.id,
                    "user_id": review.user_id,
                }

                park_dict["reviews"].append(review_dict)

            parks_with_reviews.append(park_dict)

        return jsonify(parks_with_reviews)

api.add_resource(ParksWithReviews, '/parks_with_reviews')


# REVIEWS
class Reviews(Resource):
    def get(self):
        
        reviews = []
        for review in Review.query.all():
            review_dict = {
                "title": review.title,
                "id": review.id,
                "park_id": review.park_id,
                "user_id": review.user_id,
            }
            reviews.append(review_dict)

            response = make_response(
                jsonify(reviews),
                200,
                {"Content-Type": "application/json"}
            )
        return response



    def post(self):
        data = request.get_json()

        
        # user_id = get_authenticated_user_id()
        # title = data.get('title')
        # user_id = data.get('user_id')
        # park_id = data.get('park_id')

        # if not title or not user_id or not park_id:
        #     return jsonify({"message": "Missing required data"}), 400

        new_review = Review(
            title=data['title'],
            user_id=['user_id'],
            park_id=data['park_id'],
            id=data['id'],
        )
        db.session.add(new_review)
        db.session.commit()

        return jsonify(new_review.to_dict(), 201)

api.add_resource(Reviews, '/reviews')

# GET REVIEW BY ID
class ReviewByID(Resource):
    def get(self, id):

        review = Review.query.filter_by(id=id).first()
    
        review_dict = review.to_dict()

        response = make_response(
            
        jsonify(review_dict),
        200
        )
        response.headers["Content-Type"] = "application/json"

        return response

api.add_resource(ReviewByID, '/reviews/<int:id>')


# SIGNUP
class Users(Resource):
    def post(self):
        data = request.get_json()
        user = User(
            username = data['username'],
            firstname = data['firstname'],
            lastname = data['lastname'],
            email = data['email']
        )
        user.password_hash = data['password']

        db.session.add(user)
        db.session.commit()

        session["user_id"] = user.id
        return user.to_dict(), 201
api.add_resource(Users, '/signup')


@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter(User.username == data["username"]).first()
    session['user_id'] = user.id
    return user.to_dict(), 200

@app.route("/checkSession", methods=['GET'])
def checkSession():
    user = User.query.filter(User.id == session.get("user_id")).first()
    print(user)
    if user:
        return user.to_dict(), 200
    else:
        return {"errors": ["Unauthorized"]}, 401
    if session.get('user_id'):
        print('There is a user logged in')
    else:
        print('No session')
    return {}, 204

# class Signup(Resource):
#     def post(self):
#         json_data = request.get_json()

#         user = User(
#             username = json_data.get('username'),
#             firstname = json_data.get('firstname'),
#             lastname = json_data.get('lastname'),
#             email = json_data.get('email')
#         )
        
#         user.password_hash = json_data.get('password')
#         db.session.add(user)
#         db.session.commit()

#         session['user_id'] = user.id
#         return jsonify(user.to_dict())
    



# class CheckSession(Resource):
#     def get(self):
#         user = User.query.filter(User.username == session.get('user_username')).first()
#         if user:
#             return jsonify(user.to_dict())
#         else:
#             return jsonify({'message': '401: Not Authorized'}), 401
# api.add_resource(CheckSession, '/check_session')
    
# api.add_resource(Signup, '/signup')







if __name__ == '__main__':
    app.run(port=5555, debug=True)

