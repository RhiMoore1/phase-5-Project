from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(25), nullable=False)
    lastname = db.Column(db.String(25), nullable=False)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(55), nullable=False)
    _password_hash = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='user')
    favorites = db.relationship('Favorite', back_populates='user')


    @hybrid_property
    def password_hash(self):
        # raise AttributeError('cannot access password')
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

    @validates('firstname')
    def validate_name(self, key, value):
        if value == "":
            raise ValueError("Name cannot be blank")
        return value
    
    @validates('lastname')
    def validate_name(self, key, value):
        if value == "":
            raise ValueError("Name cannot be blank")
        return value




    def __repr__(self):
        return f'User {self.username}, ID {self.id}'
    


class Park(db.Model, SerializerMixin):
    __tablename__ = 'parks'

    serializer_rules = ("-reviews", "-favorites")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False, unique=True)
    description = db.Column(db.String(200))
    location = db.Column(db.String)
    image = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='park')
    favorites = db.relationship('Favorite', back_populates='park')

    def __repr__(self):
        return f'Park {self.name}, ID {self.id}, Description {self.description}, Location {self.location}'



class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    park_id = db.Column(db.Integer, db.ForeignKey('parks.id'), nullable=False)

    user = db.relationship('User', back_populates='reviews')
    park = db.relationship('Park', back_populates='reviews')

    def __repr__(self):
        return f'Title {self.title}, ID {self.id}'
    
    def get_park_review():
        return db.session.query(Park).options(db.joinedload(Park.reviews)).all()




class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    park_id = db.Column(db.Integer, db.ForeignKey('parks.id'), nullable=False)

    user = db.relationship('User', back_populates='favorites')
    park = db.relationship('Park', back_populates='favorites')

    def __repr__(self):
        return f'ID {self.id}'