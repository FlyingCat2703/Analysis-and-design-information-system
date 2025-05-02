function toggleDetail(id) {
    const detailEl = document.getElementById('detail-' + id);
    if (detailEl.style.display === 'none') {
        detailEl.style.display = 'block';
        // Change button text
        document.getElementById('button-' + id).textContent = 'ẨN';
        document.getElementById('button-' + id).style.border = '2px solid black';
    } else {
        detailEl.style.display = 'none';
        document.getElementById('button-' + id).textContent = 'CHI TIẾT';
        document.getElementById('button-' + id).style.border = 'none';
    }
}

const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "/";
}

function parseJwt(token) {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
}

document.addEventListener("DOMContentLoaded", function () {
    const decoded = parseJwt(token);
    const role = decoded.type;

    const registrationCards = document.querySelectorAll('.registration-card');
    registrationCards.forEach(card => {
        const extensionButton = card.querySelector('.action-button[id^="extension-button-"]');
        const removeButton = card.querySelector('.action-button[id^="remove-registration-button-"]');
        const paymentButton = card.querySelector('.action-button[id^="create-payment-slip-button-"]');
        const ticketButton = card.querySelector('.action-button[id^="create-ticket-button-"]');

        if (role === 0) {
            if (extensionButton) {
                extensionButton.disabled = true;
            }
            if (removeButton) {
                removeButton.disabled = true;
            }
            if (paymentButton) {
                paymentButton.disabled = true;
            }
            if (ticketButton) {
                ticketButton.disabled = true;
            }
        } else if (role === 1) {
            if (extensionButton) {
                extensionButton.disabled = true;
            }
            if (removeButton) {
                removeButton.disabled = true;
            }
            if (paymentButton) {
                paymentButton.disabled = true;
            }
            if (ticketButton) {
                ticketButton.disabled = false;
            }
        } else if (role === 2) {
            if (extensionButton) {
                extensionButton.disabled = true;
            }
            if (removeButton) {
                removeButton.disabled = false;
            }
            if (paymentButton) {
                paymentButton.disabled = false;
            }
            if (ticketButton) {
                ticketButton.disabled = true;
            }
        } else if (role === 3) {
            if (extensionButton) {
                extensionButton.disabled = false;
            }
            if (removeButton) {
                removeButton.disabled = true;
            }
            if (paymentButton) {
                paymentButton.disabled = true;
            }
            if (ticketButton) {
                ticketButton.disabled = true;
            }
        }
    });
});