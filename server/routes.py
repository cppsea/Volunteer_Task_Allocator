from flask import (
    Blueprint,
    request,
    jsonify,
)
from models import db, User, Task, jwt
from flask_cors import CORS
import random
# from werkzeug.urls import url_parse
from flask_jwt_extended import create_access_token, current_user, jwt_required, set_access_cookies, unset_jwt_cookies

app = Blueprint('routes', __name__)
cors = CORS()


@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    # error handling for same email/username
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'errors': [{'email': 'Email already in use'}]}), 400
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'errors': [{'username': 'Username already in use'}]}), 400
    
    new_user = User(username = data['username'], first_name=data['first_name'], last_name=data['last_name'], email=data['email'])
    # if password does not meet minimum char requirements, handle.
    try:
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
    # password error
    except ValueError as e:
        return jsonify({'errors': [{'password':repr(e)}]}), 400

    # frontend needs to handle redirection to the login page based on this response.

    return jsonify({'success': True, 'message': 'Registration successful. Please log in.'}), 201

# endpoint for users entering login info and logging in using an existing account
@app.route('/api/login', methods=['POST'])
def login():
    # grab user data from login form
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    # if the user exists and the password is correctly entered, log the user in and return
    # response containing success message and status as well as username and email of the user for parsing the webpage
    if user and user.check_password(data['password']):
        response = jsonify({
            'success': True, 
            'message': 'Logged in successfully', 
            'user': {
                'username': user.username, 
                'email': user.email
            },
        })
        access_token = create_access_token(identity=user)
        set_access_cookies(response, access_token)
        return response, 200

    # if authentication fails, return an error
    return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({'success': True, 'message': 'Logged out'}, 200)
    unset_jwt_cookies(response)
    return response

# endpoint that assigns task to logged in user upon request
@app.route("/api/assign-task", methods=["POST"])
@jwt_required()
def assign_task():
    # fetch ids of tasks already assigned to the users
    all_users = User.query.all()
    for user in all_users:
        assigned_tasks_ids = [task.task_id for task in user.tasks_assigned]
    
    # find tasks that are not assigned to the current user
    available_tasks = Task.query.filter(~Task.task_id.in_(assigned_tasks_ids)).all()
    
    if not available_tasks:
        # no available tasks to assign
        return jsonify({'error': 'No more tasks available'}), 404
    
    # randomly select a task from the available ones and add to user's assigned tasks
    random_task = random.choice(available_tasks)
    current_user.tasks_assigned.append(random_task)
    db.session.commit()

    # return details of the assigned task
    return jsonify({
        'success': True,
        'message': 'Task assigned successfully',
        'task': {
            'id': random_task.task_id,
            'description': random_task.description
        }
    }), 200

# Note: currently the front-end only has admin password, not admin username.
#       Implement admin username to front-end if necessary
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    admin_username = "admin"  # Predefined admin username
    admin_password = "password"  # Predefined admin passwor

    if data['admin_password'] == admin_password:
        response = jsonify({'success': True, 'message': 'Admin logged in successfully'})
        access_token = create_access_token(identity=admin_username)
        set_access_cookies(response, access_token)
        return response, 200
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
            'assigned_time': task.assigned_time  
        } for task in user.tasks_assigned]
    } for user in users_tasks]

    return jsonify(users_tasks_list), 200

# this route will allow admins to see tasks in the pool of assignable tasks.
@app.route('/api/admin/tasks', methods=['GET'])
# @login_required  # ensure this is accessible only by authenticated admins for POST requests
def manage_tasks():
# view list of all tasks and their description and which user it is assigned to (if assigned to any)
    tasks = Task.query.all()
    all_users = User.query.all()
    # get task description and id and store in list containing each task's info
    tasks_list = [{'id': task.task_id, 'description': task.description} for task in tasks]
    for i in range(len(tasks_list)):
        for user in all_users:

            # if user is assigned the task, add user id to appropriate task's user_assigned_to field in task list
            if tasks_list[i]['id'] in user.tasks_assigned:
                tasks_list[i]['user_assigned_to'] = user.id
        if 'user_assigned_to' not in tasks_list[i] or tasks_list[i]['user_assigned_to'] == None:

            # else, assign "N/A" to user_assigned_to field
            tasks_list[i]['user_assigned_to'] = "N/A"
            
    # return task list containing each task's info
    return jsonify(tasks_list), 200

# add tasks to the pool of assignable tasks from admin page
@app.route('/api/admin/add-task', methods=['POST'])
# @login_required  # ensure this is accessible only by authenticated admins for POST requests
def add_task():
# add task according to form
    data = request.json
    new_task = Task(task=data.get('task'), shift=data.get('shift'), description=data.get('description'))  # Updated to include 'task', 'shift', and 'description'
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Task added successfully'}), 201

# delete tasks from the pool of assignable tasks from admin page
@app.route('/api/admin/delete-task', methods=['POST'])
# @login_required  # ensure this is accessible only by authenticated admins for POST requests
def delete_task():
# delete task according to form (if task exists)
    data = request.json
    task = Task.query.filter_by(task_id=data['id']).first()
    if task == None:
        return jsonify({'error': 'Task not found'}), 401
    
    db.session.delete(task)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Task deleted successfully'}), 201

# current user's assigned tasks and a list of other users with their tasks
@app.route('/api/user/tasks-and-others', methods=['GET'])
@jwt_required()
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
                    
                }
                for task in user.tasks_assigned
            ]
        }
        for user in other_users_tasks
    ]
    # return list of user and others task
    return jsonify({
        'current_user_tasks': user_tasks_list,
        'other_users_tasks': other_users_tasks_list
    }), 200
