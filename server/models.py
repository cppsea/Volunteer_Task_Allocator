from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()

# Register a callback function that takes whatever object is passed in as the
# identity when creating JWTs and converts it to a JSON serializable format.
@jwt.user_identity_loader
def user_identity_lookup(obj):
    if type(obj) == User:
        return obj.id
    return obj


# Register a callback function that loads a user from your database whenever
# a protected route is accessed. This should return any python object on a
# successful lookup, or None if the lookup failed for any reason (for example
# if the user has been deleted from the database).
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first_or_404()

# User table for database
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    # note: username = Full Name
    username = db.Column(db.String(100), index=True, nullable=False, unique=True)
    first_name = db.Column(db.String(100), index=True, nullable=False, unique=True)
    last_name = db.Column(db.String(100), index=True, nullable=False, unique=True)
    email = db.Column(db.String(120), index=True, nullable=False, unique=True)
    password_hash = db.Column(db.String(120), nullable=False)
    #password_hashenc = db.Column(db.String(120))

    roles = db.relationship("Role", secondary="user_roles", backref=db.backref("users", lazy="joined"))
    tasks_assigned = db.relationship("Task", backref='assigned_user') 

    def __str__(self):
        return self.email

    def __repr__(self):
        return "<User {}>".format(self.username)

    # if length and character requirement is met, set password. If not, raise error (to be handled in routes)
    def set_password(self, password):
        min = 6
        if not min <= len(password):
            raise ValueError(f"Password must have at least {min} characters")
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
# checks that username is included
@validates('username')
def validate_username(self, key, value):
    if not value:
        raise ValueError("Must include username")
    return value
    
# role table for role-based access control
class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    def __str__(self):
        return self.name
    
# association table between User and Role
class UserRoles(db.Model):
    __tablename__ = "user_roles"

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"), primary_key=True)

# separate table for tasks, shifts, and dates
class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True) #in case there are overlapping tasks
    task = db.Column(db.String(100))
    shift = db.Column(db.String(30))
    description = db.Column(db.Text)
    date = db.Column(db.DateTime, default=datetime.now)
    person_assigned = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = True)

    def __init__(self, task, shift, description):
        self.task = task
        self.shift = shift
        self.description = description 

    def get_task(self, task):
        return self.task

    def get_shift(self, shift):
        return self.shift