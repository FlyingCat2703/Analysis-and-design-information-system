document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);
    const registrationID = urlParams.get("registrationID");

    if (!registrationID) {
        alert("Không tìm thấy mã đăng ký!");
        return;
    }

    // loadCandidates(registrationID);

    document.getElementById("createTicketButton").addEventListener("click", () => createTickets(registrationID));
});

async function loadCandidates(registrationID) {
    const candidateListContainer = document.getElementById("candidate-list");

    try {
        const res = await fetch(`/candidates?registrationID=${encodeURIComponent(registrationID)}`);
        const data = await res.json();

        if (res.ok && data.candidates && data.candidates.length > 0) {
            candidateListContainer.innerHTML = "";
            data.candidates.forEach(candidate => {
                const candidateItem = document.createElement("div");
                candidateItem.className = "candidate-item";
                candidateItem.innerHTML = `
                    <p><strong>Họ tên:</strong> ${candidate.HoTen}</p>
                    <p><strong>Điện thoại:</strong> ${candidate.SDT}</p>
                    <p><strong>Email:</strong> ${candidate.Email}</p>
                `;
                candidateListContainer.appendChild(candidateItem);
            });

            document.getElementById("createTicketButton").disabled = false;
        } else {
            candidateListContainer.innerHTML = "<p class='error'>Không tìm thấy thí sinh!</p>";
            document.getElementById("createTicketButton").disabled = true;
        }
    } catch (error) {
        console.error(error);
        alert("Đã xảy ra lỗi khi tìm kiếm thí sinh.");
    }
}

async function createTickets(registrationID) {
    try {
        const res = await fetch(`/add-ticket?registrationID=${encodeURIComponent(registrationID)}`, {
            method: "POST",
        });

        const data = await res.json();

        if (res.ok && data.success) {
            alert("Lập Ticket thành công cho các thí sinh!");
            loadCandidates(registrationID);
        } else {
            alert("Lỗi khi lập Ticket: " + (data.message || "Có lỗi xảy ra"));
        }
    } catch (error) {
        console.error(error);
        alert("Đã xảy ra lỗi khi lập Ticket.");
    }
}
