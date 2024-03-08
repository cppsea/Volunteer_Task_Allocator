from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager
from flask_login import UserMixin
from flask_security import RoleMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()
login_manager = LoginManager()

# keeps track of current user
@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))

# User table for database
class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    # note: username = Full Name
    username = db.Column(db.String(100), index=True, nullable=False, unique=True)
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
class Role(RoleMixin, db.Model):
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