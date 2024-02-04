from app import app, db
from flask import (
    request,
    jsonify,
    render_template,
    flash,
    redirect,
    url_for,
)
from models import User, Task
import random
# from werkzeug.urls import url_parse
from flask_login import current_user, login_user, logout_user, login_required

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        
        login_user(user)
        
        
        return jsonify({
            'success': True, 
            'message': 'Logged in successfully', 
            'user': {
                'username': user.username, 
                'email': user.email
            }
        }), 200

    # if authentication fails, return an error
    return jsonify({'error': 'Invalid email or password'}), 401

@app.route("/api/assign-task", methods=["POST"])
@login_required
def assign_task():
    # fetch ids of tasks already assigned to the current user
    assigned_tasks_ids = [task.id for task in current_user.tasks_assigned]
    
    # find tasks that are not assigned to the current user
    available_tasks = Task.query.filter(~Task.id.in_(assigned_tasks_ids)).all()
    
    if not available_tasks:
        # no available tasks to assign
        return jsonify({'error': 'No more tasks available'}), 404
    
    # randomly select a task from the available ones
    random_task = random.choice(available_tasks)
    current_user.tasks_assigned.append(random_task)
    db.session.commit()

    # return details of the assigned task
    return jsonify({
        'success': True,
        'message': 'Task assigned successfully',
        'task': {
            'id': random_task.id,
            'description': random_task.description
        }
    }), 200
    
    

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already in use'}), 400
    
    new_user = User(username=data['username'], email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    # frontend needs to handle redirection to the login page based on this response.

    return jsonify({'success': True, 'message': 'Registration successful. Please log in.'}), 201


@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    admin_username = "admin"  # Predefined admin username
    admin_password = "password"  # Predefined admin password

    if data.get('username') == admin_username and data.get('password') == admin_password:
        #set up admin session or token-based authentication(?) here
        return jsonify({'success': True, 'message': 'Admin logged in successfully'}), 200
    else:
        return jsonify({'error': 'Invalid admin credentials'}), 401


# this route will provide the admin with a list of users, 
# the tasks assigned to each user, and the assignment times.
@app.route('/api/admin/users-tasks', methods=['GET'])
# @login_required  # ensure this is accessible only by authenticated admins
def admin_users_tasks():
    users_tasks = User.query.all()  # fetch all users and their tasks
    users_tasks_list = [{
        'username': user.username,
        'email': user.email,
        'tasks': [{
            'id': task.id,
            'description': task.description,
            'assigned_time': task.assigned_time  # Assuming you have this field
        } for task in user.tasks_assigned]
    } for user in users_tasks]

    return jsonify(users_tasks_list), 200

# this route will allow admins to add new tasks to the pool of assignable tasks.
@app.route('/api/tasks', methods=['GET', 'POST'])
# @login_required  # ensure this is accessible only by authenticated admins for POST requests
def manage_tasks():
    if request.method == 'POST':
        data = request.json
        new_task = Task(description=data['description'])
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Task added successfully'}), 201

    elif request.method == 'GET':
        tasks = Task.query.all()
        tasks_list = [{'id': task.id, 'description': task.description} for task in tasks]
        return jsonify(tasks_list), 200

# current user's assigned tasks and a list of other users with their tasks
@app.route('/api/user/tasks-and-others', methods=['GET'])
@login_required
def user_tasks_and_others():
    # fetching the current user's tasks
    user_tasks_list = [
        {
            'id': task.id,
            'description': task.description,
            
        } 
        for task in current_user.tasks_assigned
    ]

    # fetching etch tasks assigned to other users (excluding the current user)
    other_users_tasks = User.query.filter(User.id != current_user.id).all()
    other_users_tasks_list = [
        {
            'user_id': user.id,
            'username': user.username,
            'tasks': [
                {
                    'id': task.id,
                    'description': task.description,
                    # Add more task attributes here as needed
                }
                for task in user.tasks_assigned
            ]
        }
        for user in other_users_tasks
    ]

    return jsonify({
        'current_user_tasks': user_tasks_list,
        'other_users_tasks': other_users_tasks_list
    }), 200



    




    
   