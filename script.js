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


let users = JSON.parse(localStorage.getItem("usersDetails")) || [];

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let firstNameValue = firstNameInput.value.trim();
    let lastNameValue = lastNameInput.value.trim();
    let usernameValue = usernameInput.value.trim();
    let emailValue = emailInput.value.trim();
    let phoneValue = phoneInput.value.trim();
    let passwordValue = passwordInput.value.trim();
    let confirmPasswordValue = confirmPasswordInput.value.trim();


    let newUser = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        username: usernameValue,
        email: emailValue,
        phone: phoneValue,
        password: passwordValue,
        confirmPassword: confirmPasswordValue,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
});



