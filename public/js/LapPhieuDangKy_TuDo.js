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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registration)
    });
    
    console.log(1);
    console.error(1);
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidate)
    });

    if (!res2.ok) {
        return alert('Tạo thông tin thí sinh thất bại!');
    }
        
    alert('Tạo phiếu đăng ký và thông tin thí sinh thành công!');
    window.location.href = '/home';
})