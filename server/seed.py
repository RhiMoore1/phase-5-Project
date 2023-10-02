#!/usr/bin/env python3

# Standard library imports
from random import randint, random, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

from models import db, User, Park, Review, Favorite



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("🌱 Seeding DB...")
        # Seed code goes here!
        db.create_all()

        User.query.delete()
        Park.query.delete()
        Review.query.delete()
        Favorite.query.delete()

        users = []
        for n in range(5):
            firstname = firstname=fake.first_name()
            lastname = lastname=fake.last_name()
            username = firstname+lastname
            email = username+ f'@{fake.domain_name()}'
            user = User(firstname=firstname, lastname=lastname, username=username, email=email)
            user.password_hash = username
            users.append(user)

        db.session.add_all(users)
        db.session.commit()


        parks = []
        for n in range(10):
            park = Park(name=fake.name(), description=fake.text(), location=fake.sentence())
            parks.append(park)

        db.session.add_all(parks)
        db.session.commit()


        reviews = []
        for n in range(15):
            user = rc(users)
            park = rc(parks)
            review = Review(title=fake.sentence(), user=user, park=park)
            reviews.append(review)
            
        db.session.add_all(reviews)
        db.session.commit()


        favorites = []
        for n in range(10):
            user = rc(users)
            park = rc(parks)
            favorite = Favorite(user=user, park=park)
            favorites.append(favorite)
            
        db.session.add_all(favorites)


        db.session.commit()


        print("✅ Done seeding!")