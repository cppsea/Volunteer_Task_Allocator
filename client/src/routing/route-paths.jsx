export const route_paths = {
  login: "/login",
  admin_login: "/admin-login",
  signup: "/signup",
  task: "/task",
  admin_user_tasks: "/admin-user-tasks",
  admin_tasks: "/admin-tasks",
};

export const logged_in_paths = [route_paths.task];

export const logged_out_paths = [
  route_paths.login,
  route_paths.signup,
  route_paths.admin_login,
];

export const admin_paths = [route_paths.admin_user_tasks, route_paths.admin_tasks];
