from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app import app, db, login_manager
from flask_login import UserMixin
from sqlalchemy.orm import validates
from flask_rbac import RBAC

# with app.app_context():
#     db.create_all()

# RBAC (role-based access control)
# currently not being used, will implement it next
rbac = RBAC(app)

# keeps track of current user
@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


# User table for database
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # note: username = Full Name
    username = db.Column(db.String(100), index=True, nullable=False, unique=True)
    email = db.Column(db.String(120), index=True, nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)
    password_hash = db.Column(db.String(120))

    def __repr__(self):
        return "<User {}>".format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
# checks that username is included
@validates('username')
def validate_username(self, key, value):
    if not value:
        raise ValueError("Must include username")
    return value

# checks that password is in a specific range of characters
@validates('password')
def validate_password(self, key, value):
    min = 6
    max = 32
    if not min <= len(value) <= max:
        raise ValueError("Password must be between " + str(min) + " - " + str(max) + " characters")
    return value

# separate table for tasks, shifts, and dates
class Task(db.Model):
    task = db.Column(db.String(100))
    shift = db.Column(db.String(30))
    date = db.Column(db.DateTime, default=datetime.now)

    def __init__(self, task, shift):
        self.task = task
        self.shift = shift
    
    def get_task(self, task):
        return self.task

    def get_shift(self, shift):
        return self.shift