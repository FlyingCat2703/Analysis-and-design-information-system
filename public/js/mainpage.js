const token = sessionStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

function redirectToViewGrade() {
    window.location.href = "/viewGrade";
}

function redirecToUpdateGrade() {

}

function redirectToCertInput() {

}

function redirectToViewCertitifcation() {
    // window.location.href = "";
}

function redirectToViewPaymentSlip() {
    window.location.href = "/viewPaymentSlip";
}

function redirectToCreateRegistration() {
    window.location.href = "/register/customer";
}

function redirectToViewRegistration() {
    window.location.href = "/viewRegistration";
}