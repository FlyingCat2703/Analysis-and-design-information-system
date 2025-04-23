const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "/";
}

document.getElementById('submit-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    const registration = {
        quantity: 1,
        customerName: document.getElementById('hoTenKH').value,
        customerType: 0,
        scheduleID: document.getElementById('lichThi').value
    };

    const res = await fetch('/add-registration', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registration)
    });
    
    if (!res.ok) {
        return alert('Tạo phiếu đăng ký thất bại!');
    }
    const result = await res.json();

    const candidate = {
        name: document.getElementById('hoTenTS').value,
        phoneNumber: document.getElementById('sdtTS').value,
        home: document.getElementById('diaChiTS').value,
        email: document.getElementById('emailTS').value,
        registrationID: result.id
    };
    
    const res2 = await fetch('/add-candidate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidate)
    });

    if (!res2.ok) {
        return alert('Tạo thông tin thí sinh thất bại!');
    }
        
    alert('Tạo phiếu đăng ký và thông tin thí sinh thành công!');
    document.getElementById("form").reset();
})

document.getElementById('organization-button').addEventListener('click', function() {
    window.location.href = '/register/organization';
});