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

    const halalSwitch = document.getElementById("halalAccount");
    const popupBox = document.getElementById("halalModal");
    const gotItButton = document.getElementById("gotItBtn");
    const closeButton = document.getElementById("closeModal");

    let users = JSON.parse(localStorage.getItem("usersDetails")) || [];

    // Popup functionality
    halalSwitch.addEventListener("change", function () {
        if (halalSwitch.checked) {
            popupBox.style.display = "flex";
        }
    });

    gotItButton.addEventListener("click", function () {
        popupBox.style.display = "none";
    });

    closeButton.addEventListener("click", function () {
        popupBox.style.display = "none";

    });

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

        let phonePattern = /^[+]?[\d\s()-]{10,20}$/;

        if (!phonePattern.test(phoneValue)) {

            errorMessage.innerHTML = "Enter a valid phone number";
            errorMessage.style.color = "red";
            return;
        }

        // if (phoneValue.length !== 11) {

        //     errorMessage.innerHTML = "Phone number must be 11 digits";
        //     errorMessage.style.color = "red";
        //     return;
        // }

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
            password: passwordValue,
            halal: halalSwitch.checked

        };

        users.push(newUser);

        localStorage.setItem("usersDetails", JSON.stringify(users));

        signupForm.reset();

        alert("Account created successfully!");

        setTimeout(() => {
            window.location.href = "create-pin.html";
        }, 1000);

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

// Create-pin

const createPin = () => {
    const pin_Error = document.getElementById("pinError");
    const pinInputs = document.querySelectorAll(".pin-inputs")[0].querySelectorAll("input");
    const confirmpinInputs = document.querySelectorAll(".pin-inputs")[1].querySelectorAll("input");

    function getPin(inputs) {

        let pin = "";

        for (let i = 0; i < inputs.length; i++) {
            pin += inputs[i].value;
        }
        return pin;

    }

    let pin = getPin(pinInputs);
    let confirmPin = getPin(confirmpinInputs);

    if (pin === "" || confirmPin === "") {
        pinError.innerHTML = "Please fill in your PIN";
        return;
    }

    if (isNaN(pin) || isNaN(confirmPin)) {
        pinError.innerHTML = "PIN must contain only numbers";
        return;
    }

    if (pin.length !== 4 || confirmPin.length !== 4) {
        pinError.innerHTML = "PIN must be 4 digits";
        return;
    }

    if (pin !== confirmPin) {
        pinError.innerHTML = "PIN does not match";
        return;
    }

    let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];

    let lastUser = allUsers[allUsers.length - 1];

    if (lastUser) {
        lastUser.pin = pin;

        localStorage.setItem(
            "usersDetails",
            JSON.stringify(allUsers)
        );
    }

    pinError.style.color = "green";
    pinError.innerHTML = "PIN created successfully!";

    setTimeout(() => {
        window.location.href = "bvn.html";
    }, 1000);

}

const allPinInputs = document.querySelectorAll(".pin-inputs input");

allPinInputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        if (input.value.length === 1) {

            let nextInput = allPinInputs[index + 1];

            if (nextInput) {
                nextInput.focus();
            }

        }

    });

});

allPinInputs.forEach((input, index) => {

    input.addEventListener("keydown", (e) => {

        if (e.key === "Backspace" && input.value === "") {

            let prevInput = allPinInputs[index - 1];

            if (prevInput) {
                prevInput.focus();
            }

        }

    });

});

// BVN
const verifyBVN = () => {
    const bvnInput = document.getElementById("bvn");
    const dobInput = document.getElementById("dob");
    const bvnError = document.getElementById("bvnError");
    const dobError = document.getElementById("dobError");

    let bvnValue = bvnInput.value.trim();
    let dobValue = dobInput.value;

    bvnError.innerHTML = "";
    dobError.innerHTML = "";
    bvnInput.classList.remove("error-border");
    dobInput.classList.remove("error-border");

    if (bvnValue === "") {
        bvnError.innerHTML = "Enter your BVN";

        bvnInput.classList.add("error-border");
        return;
    }

    if (dobValue === "") {
        dobError.innerHTML = "Please select your Date of Birth";

        dobInput.classList.add("error-border");
        return;
    }

    if (isNaN(bvnValue)) {
        bvnError.innerHTML = "BVN must contain only numbers";

        bvnInput.classList.add("error-border");
        return;

    }

    if (bvnValue.length !== 11) {
        bvnError.innerHTML = "BVN must be 11 digits";

        bvnInput.classList.add("error-border");
        return;

    }

    let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];

    let lastUser = allUsers[allUsers.length - 1];

    if (lastUser) {
        lastUser.bvn = bvnValue;
        lastUser.dateOfBirth = dobValue;

        localStorage.setItem(
            "usersDetails",
            JSON.stringify(allUsers)
        );
    }

    window.location.href = "login.html";
}

const bvnInput = document.getElementById("bvn");
const bvnError = document.getElementById("bvnError");

bvnInput.addEventListener("input", () => {
    bvnInput.classList.remove("error-border");
    bvnError.innerText = "";

});

dobInput.addEventListener("input", () => {
    dobInput.classList.remove("error-border");
    dobError.innerText = "";

});