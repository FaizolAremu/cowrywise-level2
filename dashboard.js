// Eye icon toggle for balance
const toggleIcon = document.getElementById('toggleVisibility');
const balanceValue = document.getElementById('balanceValue');
const balanceCents = document.getElementById('balanceCents');

let isVisible = true;

toggleIcon.addEventListener('click', () => {
    isVisible = !isVisible;
    if (isVisible) {
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
        balanceValue.textContent = '0';
        balanceCents.textContent = '.00';
        balanceCents.style.display = 'inline';
    } else {
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
        balanceValue.textContent = '****';
        balanceCents.style.display = 'none';
    }
});

// Handle Active states on cash buttons
const cashBtns = document.querySelectorAll('.cash-btn');
cashBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cashBtns.forEach(b => {
            b.classList.remove('border-primary', 'text-primary', 'bg-primary-subtle');
        });
        btn.classList.add('border-primary', 'text-primary', 'bg-primary-subtle');
    });
});


/* ==========================
   PROTECT DASHBOARD
========================== */

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    window.location.href = "login.html";

}

/* ==========================
   DISPLAY USER NAME
========================== */

let dashboardUser = document.getElementById("dashboardName");

dashboardUser.innerHTML = currentUser.firstName;

/* ==========================
   LOGOUT
========================== */

function logoutUser() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

}