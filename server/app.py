from flask import Flask
from models import db, jwt
from routes import app as routes_app, cors
from os import environ
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, set_access_cookies

# expiration time of a JWT
ACCESS_EXPIRES = timedelta(hours=1)

app = Flask(__name__)

# Using an `after_request` callback, we refresh any token that is within 30
# minutes of expiring. Change the timedeltas to match the needs of your application.
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "my secret" # CHANGE THIS
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES
# If true this will only allow the cookies that contain your JWTs to be sent
# over https. In production, this should always be set to True
app.config["JWT_COOKIE_SECURE"] = False
# Enable csrf double submit protection. See this for a thorough
# explanation: http://www.redotheweb.com/2015/11/09/api-security.html
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
# Set the cookie paths, so that you are only sending your access token
# cookie to the access endpoints, Technically this is optional, but it is in
# your best interest to not send additional cookies in the request if
# they aren't needed.
app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]


with app.app_context():
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    db.create_all()

app.register_blueprint(routes_app)