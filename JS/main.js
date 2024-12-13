// DOM Element References
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signinEmail = document.getElementById('signinEmail');
const signinPassword = document.getElementById('signinPassword');

const usernameDisplay = document.getElementById('username');
const existMessage = document.getElementById('exist');
const incorrectMessage = document.getElementById('incorrect');

// Base URL Calculation
const baseURL = location.pathname.split('/').slice(0, -1).join('/') || '/';
console.log(baseURL);

// Load Session Username
const sessionUsername = localStorage.getItem('sessionUsername');
if (sessionUsername) {
  usernameDisplay.innerHTML = `Welcome ${sessionUsername}`;
}

// Load Stored Users
let users = JSON.parse(localStorage.getItem('users')) || [];

// Helper Functions
var isEmpty = (...fields) => fields.some(field => field.value.trim() === '');

var isEmailExist = (email) => {
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

// Signup Function
var signUp = () => {
  if (isEmpty(signupName, signupEmail, signupPassword)) {
    existMessage.innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
    return;
  }

  if (isEmailExist(signupEmail.value)) {
    existMessage.innerHTML = '<span class="text-danger m-3">Email already exists</span>';
    return;
  }

  const newUser = {
    name: signupName.value.trim(),
    email: signupEmail.value.trim(),
    password: signupPassword.value.trim(),
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  existMessage.innerHTML = '<span class="text-success m-3">Success</span>';
};

// Login Function
var login = () => {
  if (isEmpty(signinEmail, signinPassword)) {
    incorrectMessage.innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
    return;
  }

  const email = signinEmail.value.trim();
  const password = signinPassword.value.trim();

  const user = users.find(user =>
    user.email.toLowerCase() === email.toLowerCase() &&
    user.password === password
  );

  if (user) {
    localStorage.setItem('sessionUsername', user.name);

    // Dynamically get the base URL
    const baseURL = `${window.location.origin}`;
    const homePath = `${baseURL}/html/home.html`;

    console.log(`Redirecting to: ${homePath}`); // Debugging
    location.replace(homePath);
  } else {
    incorrectMessage.innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
  }
};


// Logout Function
const logout = () => {
  localStorage.removeItem('sessionUsername');
};
