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
import datetime
# Local imports
from config import app, db, api
# Add your model imports
from models import User, Park, Review, Favorite, db
CORS(app)
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
                "image": park.image,
            }
            parks.append(park_dict)
        
        response = make_response(
            jsonify(parks),
            200,
            {"Content-Type": "application/json"}
        )
    
        return response  

api.add_resource(Parks, '/parks')


@app.route("/parks/new", methods=['POST'])
def post():
    data = request.get_json()

    new_park = Park(
        name=data['park']['name'],
        description=data['park']['description'],
        location=data['park']['location'],
        image=data['park']['image'],
    )

    db.session.add(new_park)
    db.session.commit()

    new_review = Review(
        title=data['review']['title'],
        user_id=session.get('user_id'),
        park_id=new_park.id,
    )

    db.session.add(new_review)
    db.session.commit()

    response_dict = {
        "park": new_park.to_dict(),
        "review": new_review.to_dict(),
    }

    response = make_response(
        jsonify(response_dict),
        200,
        {"Content-Type": "application/json"}
    )
    return response
# api.add_resource(Parks, '/parks/new')


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
            "image": park.image,
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


# UPDATE A PARK
    def patch(self, id):

        park = Park.query.filter_by(id=id).first()
    
        for attr in request.form:
            setattr(park, attr, request.form[attr])
            
        db.session.add(park)
        db.session.commit()

        park_dict = park.to_dict()

        response = make_response(park_dict, 200)

        return response

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
                "reviews": [],
                "image": park.image
            }

            reviews = Review.query.filter_by(park_id=park.id).all()

            for review in reviews:
                user = User.query.get(review.user_id)
                if user:
                    review_dict = {
                        "title": review.title,
                        "id": review.id,
                        "user_name": user.username,
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

@app.route("/logout", methods=['DELETE'])
def logout():
    session['user_id'] = None
    return {}, 204



@app.route("/authorized", methods=["GET"])
def authorized():
    user = User.query.filter(User.id == session.get("user_id")).first()
    if user:
        return user.to_dict(), 200
    else:
        return {"errors": ["Unauthorized"]}, 401



# CREATE COOKIE
def expiration_date(delay):
    expire_date = datetime.datetime.now()
    expire_date = expire_date + datetime.timedelta(days=delay)
    return expire_date


@app.route("/cookies", methods=['GET'])
def cookies():
    resp = make_response({'message': 'Cookie route'}, 200)
    resp.set_cookie('new', 'cookie')
    resp.set_cookie('hello', 'world', expires=expiration_date(90), httponly=True)
    return resp


if __name__ == '__main__':
    app.run(port=5555, debug=True)

