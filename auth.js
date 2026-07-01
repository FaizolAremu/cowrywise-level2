import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCVESV-8Du5443065Kilym_WlbeZHn1XgU",
    authDomain: "level2project-cowrywise.firebaseapp.com",
    projectId: "level2project-cowrywise",
    storageBucket: "level2project-cowrywise.firebasestorage.app",
    messagingSenderId: "116158142819",
    appId: "1:116158142819:web:118e8e2d480670d9071b56"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// =============== GOOGLE AUTH ===============
const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];
            
            if (!allUsers.find(u => u.email === user.email)) {
                let nameParts = user.displayName ? user.displayName.split(" ") : ["User"];
                allUsers.push({
                    firstName: nameParts[0],
                    lastName: nameParts.slice(1).join(" ") || "",
                    username: user.email.split("@")[0],
                    email: user.email,
                    halal: false,
                    password: "google_oauth_user"
                });
                localStorage.setItem("usersDetails", JSON.stringify(allUsers));
            }
            
            alert(`Welcome ${user.displayName || user.email}!`);
            
            if (window.location.pathname.includes('login.html')) {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "create-pin.html";
            }
        })
        .catch((error) => {
            console.error("Error signing in with Google:", error);
            alert("Authentication failed: " + error.message);
        });
};

const signupGoogleBtn = document.querySelector(".signup-google-btn");
if (signupGoogleBtn) {
    signupGoogleBtn.addEventListener("click", handleGoogleSignIn);
}

const loginGoogleBtn = document.querySelector(".btn.google");
if (loginGoogleBtn) {
    loginGoogleBtn.addEventListener("click", handleGoogleSignIn);
}

// =============== EMAIL/PASSWORD SIGNUP ===============
const signupForm = document.getElementById("signupform");
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById("firstname").value.trim();
        const lastName = document.getElementById("lastname").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const halalSwitch = document.getElementById("halalAccount");
        const errorMessage = document.getElementById("error");
        
        if (firstName === "" || lastName === "" || username === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
            errorMessage.innerHTML = "Please fill in all fields";
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "12px";
            return;
        }

        if (password.length < 8) {
            errorMessage.innerHTML = "Password must be at least 8 characters";
            errorMessage.style.color = "red";
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.innerHTML = "Passwords do not match";
            errorMessage.style.color = "red";
            return;
        }
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Sync additional details to local storage
                let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];
                allUsers.push({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    phone: phone,
                    halal: halalSwitch.checked,
                    password: password 
                });
                localStorage.setItem("usersDetails", JSON.stringify(allUsers));
                
                signupForm.reset();
                alert("Account created successfully!");
                setTimeout(() => {
                    window.location.href = "create-pin.html";
                }, 1000);
            })
            .catch((error) => {
                errorMessage.innerHTML = error.message;
                errorMessage.style.color = "red";
                errorMessage.style.fontSize = "12px";
            });
    });
}

// =============== EMAIL/PASSWORD LOGIN ===============
const loginFormLf = document.getElementById("loginForm");
if (loginFormLf) {
    loginFormLf.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const loginEmail = document.getElementById("loginemail").value.trim();
        const loginPassword = document.getElementById("loginpassword").value.trim();
        const loginError = document.getElementById("loginerror");
        
        if (loginEmail === "" || loginPassword === "") {
            loginError.innerHTML = "Please fill all fields";
            loginError.style.color = "red";
            loginError.style.fontSize = "12px";
            return;
        }
        
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                // Sync local storage check if needed, or just redirect
                let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];
                const foundUser = allUsers.find(u => u.email === loginEmail);
                
                if(foundUser) {
                    alert(`Welcome ${foundUser.firstName} ${foundUser.lastName}`);
                } else {
                    alert(`Welcome ${userCredential.user.email}!`);
                }
                
                loginFormLf.reset();
                loginError.innerHTML = "";
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                loginError.innerHTML = "Invalid credentials. Please try again.";
                loginError.style.color = "red";
                loginError.style.fontSize = "12px";
                console.error(error);
            });
    });
}
