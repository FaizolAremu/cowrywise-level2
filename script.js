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

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        firstNameValue === "" ||
        lastNameValue === "" ||
        usernameValue === "" ||
        emailValue === "" ||
        phoneValue === "" ||
        passwordValue === "" ||
        confirmPasswordValue === ""
    ) {
        errorMessage.innerHTML = "Please fill in all fields";
        errorMessage.style.color = "red";
        errorMessage.style.fontSize = "12px";

        return;
    }

    // Email validation
    if (!emailPattern.test(emailValue)) {

        errorMessage.innerHTML = "Enter a valid email address";
        errorMessage.style.color = "red";
        errorMessage.style.fontSize = "12px";

        return;
    }

    errorMessage.innerHTML = "";

    if (isNaN(phoneValue)) {

        errorMessage.innerHTML = "Phone number must contain only numbers";
        errorMessage.style.color = "red";

        return;
    }

    if (phoneValue.length !== 11) {

        errorMessage.innerHTML = "Phone number must be 11 digits";
        errorMessage.style.color = "red";

        return;
    }

    if (passwordValue.length < 8) {

        errorMessage.innerHTML = "Password must be at least 8 characters";
        errorMessage.style.color = "red";

        return;
    }

    if (passwordValue !== confirmPasswordValue) {

        errorMessage.innerHTML = "Passwords do not match";
        errorMessage.style.color = "red";

        return;
    }


    let emailExists = false;

    for (let i = 0; i < users.length; i++) {

        if (users[i].email === emailValue) {
            emailExists = true;
            break;
        }

    }

    if (emailExists) {

        errorMessage.innerHTML = "Email already exists";
        errorMessage.style.color = "red";
        errorMessage.style.fontSize = "12px";
        return;
    }

    let newUser = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        username: usernameValue,
        email: emailValue,
        phone: phoneValue,
        password: passwordValue
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    signupForm.reset();

    alert("Account created successfully!");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);



});


// Login Validation 

const loginForm = document.getElementById("loginform");
const loginEmail = document.getElementById("loginemail");
const loginPassword = document.getElementById("loginpassword");
const loginError = document.getElementById("loginerror");

let allUsers = JSON.parse(localStorage.getItem("users")) || [];

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let emailVal = loginEmail.value.trim();
    let passwordVal = loginPassword.value.trim();
    



});




