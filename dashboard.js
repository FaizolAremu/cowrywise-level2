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


function payWithPaystack() {

    let amountInput = document.getElementById("paymentAmount");
    let amount = amountInput.value;

    if (amount === "" || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    let handler = PaystackPop.setup({

        key: "pk_test_66fcb7bbecf30cee80d81bfea2009fd27831c8fd",

        email: "testuser@gmail.com",

        amount: amount * 100,

        currency: "NGN",

        callback: function (response) {

            let balanceValue = document.getElementById("balanceValue");

            let currentBalance = Number(balanceValue.textContent);

            let amount = document.getElementById("paymentAmount").value;

            let newBalance = currentBalance + Number(amount);

            balanceValue.textContent = newBalance;

            localStorage.setItem("balance", newBalance);

            alert("Payment successful! Ref: " + response.reference);

        },

        onClose: function () {

            alert("Transaction cancelled");

        }

    });

    handler.openIframe();
}