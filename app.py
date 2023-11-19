from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db' #location of the database
db = SQLAlchemy(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

tasks =[{"task 1"}, {"task 2"},{"task 3"} ]

class Volunteer(db.Model):
    name = db.Column(db.String, primary_key=True)
    taskAssigned= db.Column(db.String(200), nullable=False)

@app.route("/index")
def index():
    return render_template("index.html")

@app.route('/getTask')
def getTask():
    if tasks:
        randomTask = random.choice[tasks]
        db.session.add(randomTask)
        db.session.commit()
        return randomTask
    if not tasks:
        return "No tasks left to do"
    
@app.route('/completeTask/<string:name>', methods = ['POST'])
def completeTask(task):
    if (request.method == 'POST'):
        completedTask= Volunteer.query.filter_by(name=task).first()

    