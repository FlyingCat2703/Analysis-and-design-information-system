const paymentSlipID = document.getElementById('maphieuthanhtoan').textContent.trim();
const registrationID = document.getElementById('RegistrationID').textContent.replace('Mã Phiếu Đăng Ký: ', '').trim();
// const rescheduleFormID = document.getElementById('maphieugiahan').textContent.trim();
const totalText = document.getElementById('Total').textContent.trim().replace('đ', '');
const total = Number(totalText);
const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "/";
}

// document.querySelector('.bottom-right-bar').addEventListener('click', function() {
//     document.getElementById('staffOverlay').style.display = 'flex';
// });

// document.getElementById('cancelInvoice').addEventListener('click', function() {
//     document.getElementById('staffOverlay').style.display = 'none';
// });

document.getElementById('confirmInvoice').addEventListener('click', function () {
    fetch('/api/createInvoice', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            PaymentSlipID: paymentSlipID,
            RegistrationID: registrationID,
            // RescheduleFormID: rescheduleFormID,
            Total: total
        })
    })
    .then(res => res.json())
    .then(result => {
        if (result.success) {
            alert("Lập hóa đơn thành công!");
            window.location.href = "/viewPaymentSlip";
        } else {
            alert("Lập hóa đơn thất bại!");
        }
    })
    .catch(err => console.error(err));
});