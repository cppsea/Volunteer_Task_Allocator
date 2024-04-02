from flask import Flask
from models import db, jwt
from routes import app as routes_app, cors, ACCESS_EXPIRES
from os import environ

app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "my secret"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES


with app.app_context():
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    db.create_all()

app.register_blueprint(routes_app)