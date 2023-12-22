from app import app
from flask import (
    request,
    render_template,
    flash,
    redirect,
    url_for,
    get_flashed_messages,
)
from models import User
# from werkzeug.urls import url_parse
from flask_login import current_user, login_user, logout_user, login_required

# index page
@app.route('/')
def index():
    return render_template("index.html")

# user page
@app.route("/user/<username>", methods=["GET", "POST"])
@login_required
def user(username):
    user = current_user
    # if current authenticated user tries to visit a user page that's not theirs, redirect them to home page with message
    if current_user != User.query.filter_by(username=username).first():
        flash("You are not able to access this user page")
        redirect(url_for("index"))