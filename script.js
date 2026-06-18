// ================= SIGN UP =================

const signupForm = document.getElementById("signupform");

if (signupForm) {

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

        if (!emailPattern.test(emailValue)) {

            errorMessage.innerHTML = "Enter a valid email address";
            errorMessage.style.color = "red";
            return;
        }

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

        // for (let i = 0; i < users.length; i++) {

        //     if (users[i].email === emailValue) {

        //         errorMessage.innerHTML = "An account with this email already exists";
        //         errorMessage.style.color = "red";
        //         errorMessage.style.fontSize = "12px";

        //         return;
        //     }

        //     else if (users[i].username === usernameValue) {

        //         errorMessage.innerHTML = "Username already exists. Please choose another username";
        //         errorMessage.style.color = "red";
        //         errorMessage.style.fontSize = "12px";

        //         return;
        //     }

        // }



        // check email already exists
        if (users.find(user => user.email === emailValue)) {

            errorMessage.innerHTML = "An account with this email already exists";
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "12px";

            return;
        }

        // check username already exists
        if (users.find(user => user.username === usernameValue)) {

            errorMessage.innerHTML = "Username already exists. Please choose another one";
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

        localStorage.setItem("usersDetails", JSON.stringify(users));

        signupForm.reset();

        alert("Account created successfully!");

    });

}


// ================= LOGIN =================

const loginFormLf = document.getElementById("loginForm");

if (loginFormLf) {

    const loginEmail = document.getElementById("loginemail");
    const loginPassword = document.getElementById("loginpassword");
    const loginError = document.getElementById("loginerror");

    let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];

    loginFormLf.addEventListener("submit", function (event) {

        event.preventDefault();

        let emailVal = loginEmail.value.trim();
        let passwordVal = loginPassword.value.trim();

        if (emailVal === "" || passwordVal === "") {

            loginError.innerHTML = "Please fill all fields";
            loginError.style.color = "red";
            loginError.style.fontSize = "12px";
            return;
        }

        //  else {

        //     for (let i = 0; i < allUsers.length; i++) {

        //         if (
        //             allUsers[i].email === emailVal &&
        //             allUsers[i].password === passwordVal
        //         ) {

        //             alert(`Welcome ${allUsers[i].firstName} ${allUsers[i].lastName}`);

        //             loginFormLf.reset();

        //             loginError.innerHTML = "";

        //             return;

        //         }

        //     }
        //     loginError.innerHTML = "Invalid credentials. Please try again.";
        //     loginError.style.color = "red";
        //     loginError.style.fontSize = "12px";

        // }

        const foundUser = allUsers.find(
            user => user.email === emailVal && user.password === passwordVal
        );

        if (foundUser) {

            alert(`Welcome ${foundUser.firstName} ${foundUser.lastName}`);

            loginFormLf.reset();

            loginError.innerHTML = "";

        } else {

            loginError.innerHTML = "Invalid credentials. Please try again.";
            loginError.style.color = "red";
            loginError.style.fontSize = "12px";
        }


    });

}