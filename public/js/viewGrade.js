document.getElementById("searchButton").addEventListener("click", searchTicket);

async function searchTicket() {
    const candidateNumber = document.getElementById("candidateNumber").value.trim();
    const resultBox = document.getElementById("result");

    if (!candidateNumber) {
        resultBox.innerHTML = "<p class='error'>Vui lòng nhập Số báo danh!</p>";
        return;
    }

    try {
        const res = await fetch(`/ticket/result?candidateNumber=${encodeURIComponent(candidateNumber)}`);
        const data = await res.json();

        if (res.ok && data.success && data.result) {
            const { candidateName, certificateType, level, grade } = data.result;

            resultBox.innerHTML = `
                <div class="ticket">
                    <p><strong>Họ tên:</strong> ${candidateName}</p>
                    <p><strong>Loại chứng chỉ:</strong> ${certificateType}</p>
                    <p><strong>Cấp bậc:</strong> ${level}</p>
                    <p><strong>Điểm:</strong> ${grade}</p>
                </div>
            `;
        } else {
            resultBox.innerHTML = `<p class="error">${data.message || "Không tìm thấy kết quả!"}</p>`;
        }
    } catch (err) {
        console.error(err);
        resultBox.innerHTML = `<p class="error">Đã xảy ra lỗi khi tra cứu!</p>`;
    }
}
