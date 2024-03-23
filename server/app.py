from flask import Flask
from models import db, login_manager
from routes import app as routes_app, cors
from os import environ

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "my secret"

with app.app_context():
    db.init_app(app)
    login_manager.init_app(app)
    cors.init_app(app)
    db.create_all()

app.register_blueprint(routes_app)