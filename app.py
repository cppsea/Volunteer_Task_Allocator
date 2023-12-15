from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  #some sort of error here?
db = SQLAlchemy(app)

tasks = ["Task 1", "Task 2", "Task 3", "a", "b", "c", "d", "e"]



class Volunteer(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=True)  #primary key automatically track and increment itself, can only have one
    name = db.Column(db.String)
    taskAssigned= db.Column(db.String(200), nullable=False)


@app.route('/', methods = ['POST', 'GET'])
def getTask():
    if request.method == 'POST':
        if tasks:
            volunteerName = request.form['content'] 
            randomTask = Volunteer(name = volunteerName, taskAssigned=random.choice(tasks)) #add name and random task to database
            tasks.remove(randomTask.taskAssigned) #delete the task so it won't be picked again
            db.session.add(randomTask)
            db.session.commit()
            volunteers= Volunteer.query.all()
            return render_template("index.html", volunteers=volunteers)
        else:
            return render_template("noTasksLeft.html")  
    else: 
        volunteers= Volunteer.query.all()
        return render_template("index.html", volunteers=volunteers) 

##@app.route('/Finished_Task/<string:name>', methods = ['POST', 'GET'])
    
db.drop_all()
db.create_all()


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)