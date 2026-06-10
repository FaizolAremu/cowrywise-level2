// Signup form validation
const signupForm = document.getElementById("signupform");
const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const errorMessage = document.getElementById("error");


let users = JSON.parse(localStorage.getItem("users")) || [];



