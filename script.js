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

    // Removed old localstorage signup submit handler to use Firebase in auth.js
    // signupForm.addEventListener("submit", function (event) {
    //    ...
    // });
}


// ================= LOGIN =================

const loginFormLf = document.getElementById("loginForm");

if (loginFormLf) {

    const loginEmail = document.getElementById("loginemail");
    const loginPassword = document.getElementById("loginpassword");
    const loginError = document.getElementById("loginerror");

    let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];

    // Removed old localstorage login submit handler to use Firebase in auth.js
    // loginFormLf.addEventListener("submit", function (event) {
    //    ...
    // });
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

    window.location.href = "welcome.html";
}

const bvnInput = document.getElementById("bvn");
const bvnError = document.getElementById("bvnError");

const dobInput = document.getElementById("dob");
const dobError = document.getElementById("dobError");

if (bvnInput) {

    bvnInput.addEventListener("input", () => {
        bvnInput.classList.remove("error-border");
        bvnError.innerText = "";
    });

}

if (dobInput) {

    dobInput.addEventListener("input", () => {
        dobInput.classList.remove("error-border");
        dobError.innerText = "";
    });

}



// Welcome 

let selectedOption = "";

function selectSavings() {

    document.getElementById("savingsCard").classList.add("selected");
    document.getElementById("investmentCard").classList.remove("selected");

    selectedOption = "Savings";
}

function selectInvestment() {

    document.getElementById("investmentCard").classList.add("selected");
    document.getElementById("savingsCard").classList.remove("selected");

    selectedOption = "Investments";
}

function continueBtn() {

    if (selectedOption === "") {
        alert("Please select an option");
        return;
    }

    let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];
    let lastUser = allUsers[allUsers.length - 1];

    if (lastUser) {
        lastUser.accountType = selectedOption;
        localStorage.setItem("usersDetails", JSON.stringify(allUsers));
    }

    window.location.href = "dashboard.html";
}