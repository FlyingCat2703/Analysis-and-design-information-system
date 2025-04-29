const token = sessionStorage.getItem("token");
const urlParams = new URLSearchParams(window.location.search);
const registrationID = urlParams.get("registrationID");

document.addEventListener("DOMContentLoaded", () => {
    if (!registrationID) {
        alert("Không tìm thấy mã đăng ký!");
        return;
    }

    // loadCandidates(registrationID);

    // document.getElementById("createTicketButton").addEventListener("click", () => createTickets(registrationID));
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

// async function createTickets(registrationID) {
//     try {
//         const res = await fetch(`/add-ticket?registrationID=${encodeURIComponent(registrationID)}`, {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             },
            
//         });
//         console.log(res);
//         const data = await res.json();

//         if (res.ok) {
//             alert("Lập Ticket thành công cho các thí sinh!");
//             loadCandidates(registrationID);
//         } else {
//             alert("Lỗi khi lập Ticket: " + (data.message || "Có lỗi xảy ra"));
//         }
//     } catch (error) {
//         console.log(error);
//         alert("Đã xảy ra lỗi khi lập Ticket.");
//     }
// }

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', async function (event) {
        const candidateID = event.target.dataset.candidateId;
        try {
            const res = await fetch(`/add-ticket?registrationID=${encodeURIComponent(registrationID)}&candidateId=${candidateID}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                // const data = await res.json();
                alert("Lập phiếu dự thi thành công!");
                window.location.reload();
            } else {
                alert("Lập Ticket thất bại cho các thí sinh!");
            }
        } catch (err) {
            console.error(err);
            alert("Đã xảy ra lỗi khi lập Ticket.");
        }
    });
});