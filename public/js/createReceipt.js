const paymentSlipID = document.getElementById('maphieuthanhtoan').textContent.trim();
const registrationID = document.getElementById('RegistrationID').textContent.replace('Mã Phiếu Đăng Ký: ', '').trim();
const rescheduleFormID = document.getElementById('maphieugiahan').textContent.trim();
const totalText = document.getElementById('Total').textContent.trim().replace('đ', '');
const total = Number(totalText);


document.querySelector('.bottom-right-bar').addEventListener('click', function() {
    document.getElementById('staffOverlay').style.display = 'flex';
});

document.getElementById('cancelInvoice').addEventListener('click', function() {
    document.getElementById('staffOverlay').style.display = 'none';
});

document.getElementById('confirmInvoice').addEventListener('click', function() {
    const staffCode = document.getElementById('staffCode').value.trim();
    if (!staffCode) {
        alert("Vui lòng nhập mã nhân viên phụ trách!");
        return;
    }

    fetch('/api/createInvoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            PaymentSlipID: paymentSlipID,
            RegistrationID: registrationID,
            RescheduleFormID: rescheduleFormID,
            Total: total,
            StaffCode: staffCode
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