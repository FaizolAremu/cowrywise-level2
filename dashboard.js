
const toggleIcon = document.getElementById('toggleVisibility');
const balanceValue = document.getElementById('balanceValue');
const balanceCents = document.getElementById('balanceCents');

let isVisible = true;

toggleIcon.addEventListener('click', () => {
    isVisible = !isVisible;

    if (isVisible) {
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');

        balanceValue.textContent = currentUser.balance;
        balanceCents.textContent = '.00';
        balanceCents.style.display = 'inline';

    } else {
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');

        balanceValue.textContent = '****';
        balanceCents.style.display = 'none';
    }
});

const cashBtns = document.querySelectorAll('.cash-btn');

cashBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        cashBtns.forEach(b => {
            b.classList.remove('border-primary', 'text-primary', 'bg-primary-subtle');
        });

        btn.classList.add('border-primary', 'text-primary', 'bg-primary-subtle');
    });
});

let selectedAmount = 0;

function selectAmount(amount) {
    selectedAmount = amount;

    payWithPaystack(amount);
}

// PROTECT DASHBOARD

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}



// DISPLAY USER NAME

let dashboardUser = document.getElementById("dashboardName");
dashboardUser.innerHTML = currentUser.firstName;


// SET DEFAULT BALANCE

if (!currentUser.balance) {
    currentUser.balance = 0;
}
// DISPLAY BALANCE ON LOAD

balanceValue.textContent = currentUser.balance;

let nairaFundsBalance = document.getElementById("nairaFundsBalance");
if (nairaFundsBalance) {
    nairaFundsBalance.textContent = currentUser.balance;
}

// LOGOUT

function logoutUser() {

    localStorage.removeItem("currentUser");
    window.location.href = "login.html";

}

// PAYSTACK PAYMENT

function payWithPaystack(amountFromButton = null) {

    let amountInput = document.getElementById("paymentAmount");

    let amount;

    // If button clicked (10k, 20k, 50k)
    if (amountFromButton) {
        amount = amountFromButton;
    } else {
        amount = Number(amountInput.value);
    }

    if (amount <= 0 || amount === "") {
        alert("Please enter a valid amount");
        return;
    }

    let handler = PaystackPop.setup({

        key: "pk_test_66fcb7bbecf30cee80d81bfea2009fd27831c8fd",

        email: currentUser.email,

        amount: amount * 100,

        currency: "NGN",

        callback: function (response) {

            currentUser.balance += amount;

            balanceValue.textContent = currentUser.balance;

            let nairaFundsBalance = document.getElementById("nairaFundsBalance");
            if (nairaFundsBalance) {
                nairaFundsBalance.textContent = currentUser.balance;
            }

            // update users list
            let users = JSON.parse(localStorage.getItem("usersDetails")) || [];

            let index = users.findIndex(user => user.email === currentUser.email);

            if (index !== -1) {
                users[index] = currentUser;
                localStorage.setItem("usersDetails", JSON.stringify(users));
            }

            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            alert("Payment successful! Ref: " + response.reference);
        },

        onClose: function () {
            alert("Transaction cancelled");
        }

    });

    handler.openIframe();
}