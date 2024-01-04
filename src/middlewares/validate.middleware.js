export const validateUser = (req, res, next) => {
  const { username, password, repeat_password, first_name, last_name, age } = req.body;
  const errors = {};

  if (username.length < 3) {
    errors.username = 'Username must contain 3 symbols or more.';
  }

  if (password.length < 4 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    errors.password =
      'Password must contain at least 1 number and 1 letter, and be at least 4 characters long.';
  }

  if (password !== repeat_password) {
    errors.repeat_password = 'Passwords should be the same.';
  }

  if (first_name.length < 3) {
    errors.first_name = 'First name must contain 3 symbols or more.';
  }

  if (last_name.length < 3) {
    errors.last_name = 'Last name must contain 3 symbols or more.';
  }

  if (isNaN(age) || age <= 0) {
    errors.age = "Age must be a number and can't be zero.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ messages: errors });
  }

  next();
};
