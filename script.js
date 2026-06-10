// Signup form validation
let signupForm = document.getElementById("signupform");
let emailInput = document.getElementById("email");
let errorMessage = document.getElementById("error");

signupform.addEventListener("submit", function (event) {
    event.preventDefault();
    let emailValue = emailInput.value.trim();

    if (emailValue === "") {
        errorMessage.innerHTML = "Enter your email address";
        errorMessage.style.color = "red";
        errorMessage.style.fontSize = "12px";
        emailInput.style.border = "1px solid red";
    } else {
        errorMessage.innerHTML = "";
        emailInput.style.border = "1px solid #0066f5";

        let usersInput = JSON.parse(localStorage.getItem("users")) || [];

        let emailExist = false;

        for (let i = 0; i < usersInput.length; i++) {
            if (usersInput[i].email === emailValue) {
                emailExist = true;
                break;
            }
        }

        if (emailExist) {
            errorMessage.innerHTML = "Email already exists";
            emailInput.style.border = "1px solid red";
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "12px";
            return;
        }


        let newUser = {
            email: emailValue
        };

        usersInput.push(newUser);

        localStorage.setItem("users", JSON.stringify(usersInput));

        emailInput.value = "";


    }

});

emailInput.addEventListener("input", function () {
    if (emailInput.value !== "") {
        errorMessage.innerHTML = "";
        emailInput.style.border = "1px solid #0066f5";
    }
});