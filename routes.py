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
    if current_user.username != username:
        flash("You are not allowed to access this page.")
        return redirect(url_for('index')) #return was missing, fixed that; now it ensures redirection
        
    

from models import Task
import random
@app.route("/user/get-random-task", methods = ["GET", "POST"])
@login_required
def get_task():
    #to avoid assigning the same task to a user multiple times
    assigned_tasks_ids = [task.id for task in current_user.task_assigned]
    available_tasks = Task.query.filter(Task.id.notin_(assigned_tasks_ids)).all()
    
    if not available_tasks:
        flash("No more tasks available")
        return redirect(url_for("index"))
    
    random_task = random.choice(available_tasks)
    current_user.tasks_assigned.append(random_task)

    db.session.commit()

    return redirect(url_for('index'))

@app.route("/user/finish-task<int:id>", methods = ["GET", "POST"])
@login_required
def finished_task(id):
    task = Task.query.get_or_404(id)
    if task.person_assigned == current_user.id:
        task.completed = True
        db.session.commit()
        flash("Task marked as completed.")
    else:
        flash("You are not authorized to complete this task.")
        
    return redirect(url_for('index'))
    
   