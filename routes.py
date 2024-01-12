from app import app, db
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
    #otherwise

from models import Task
import random
@app.route("/user/get-random-task", methods = ["GET", "POST"])
@login_required
def get_task():
    random_task = random.choice(Task.query.all())
    current_user.tasks_assigned.append(random_task)

    db.session.commit()

    return render_template("Your-Tasks.html")

@app.route("/user/finish-task<int:id>", methods = ["GET", "POST"])
@login_required
def finished_task(id):
    task_finished = Task.query.get_or_404(id)
    try:
        userIDAssignedToTask= task_finished.person_assigned
        if (userIDAssignedToTask == current_user.id):  #check if it's this request is from the same person who was assigned the task
            current_user.tasks_assigned.remove(task_finished)
            db.session.delete(task_finished)
            db.session.commit()
    except:
        flash("Something wrong deleting")