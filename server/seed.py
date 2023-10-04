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
        park1 = Park(name="Petrified Forrest National Park", description="Visit this park a see 225-million-year-old folssilized trees", location="Holbrook, Arizona", image="https://www.dirtinmyshoes.com/wp-content/uploads/2018/06/Petrified-Forest-2018-Jasper-Forest-2-e1529537478321-800x543.jpg")
        parks.append(park1)
        park2 = Park(name="Saguaro National Park", description="One of the only places in the world to see the famed saguaro cacti", location="Sonoran Desert", image="https://afar.brightspotcdn.com/dims4/default/e9277fb/2147483647/strip/true/crop/2000x1333+0+0/resize/1440x960!/format/webp/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2F6e%2Fab%2Fd1e638b0a96815b879ebdd4afdcb%2Foriginal-saguaro-national-park.jpg")
        parks.append(park2)
        park3 = Park(name="South Mountain Park", description="Over 50 miles of hikable trails located right by the city.", location="Phoenix, Arizona", image="https://lh3.googleusercontent.com/p/AF1QipMCho5bFwXrg_-w494QzVoiyH4gzGDjVCHb55oe=s680-w680-h510")
        parks.append(park3)
        park4 = Park(name="Grand Canyon National Park", description="One of the Seven Natural Wonders of the World", location="Northwest Arizona", image="https://lh3.googleusercontent.com/p/AF1QipMUW6LtSVXy0h7_-OHWzEItjjD5QpduYowof40j=s680-w680-h510")
        parks.append(park4)
        park5 = Park(name="Vermilion Cliffs National Monument", description="Canyons and cliffs as far as the eye can see", location="North Arizona", image="https://www.touropia.com/gfx/b/2020/11/vermilion_cliffs_national_monument_npm-1.jpg")
        parks.append(park5)
        park6 = Park(name="Boynton Canyon", description="Amazing views and canyon trails", location="Sedona, Arizona", image="https://thatadventurelife.com/wp-content/uploads/2021/04/DSC03087-HDR.jpg")
        parks.append(park6)
        park7 = Park(name="Canyon de Chelly National Monument", description="Red rocks and stunning scenery", location="Northeast Arizona", image="https://www.touropia.com/gfx/b/2020/11/canyon_de_chelly_national_monument_npm.jpg")
        parks.append(park7)
    
        
        db.session.add_all(parks)
        db.session.commit()


        review_list = ['Felt like a mini-vacation right in town.', 'An idyllic place for bird-watching and enjoying the beauty of the outdoors.',
                   'Spent the day hiking and exploring nature trails', 'An enchanting park with winding trails and hidden treasures!',
                   'A lovely spot to watch the sunset', 'Great park to enjoy the afternoon.', 'My favorite place to visit.',
                   'A favorite spot for a morning jog', 'A tranquil oasis in the heart of the city!', 'Best place for a quick hike.',
                   'Visited during cactus season-a breathtaking view.', 'Picnicked by the lake, and it felt like a mini-vacation right in town.',
                   'This is my favorite park to visit', 'The guides are always helpful.', 'Great shade spots for summer hikes',
                   'The largest park in the city']
        for n in range(10):
            user = rc(users)
            park = rc(parks)
            review_title = rc(review_list)
            review = Review(title=review_title, user=user, park=park)
            db.session.add(review)

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