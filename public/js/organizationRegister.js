let candidateInfo = [];
const token = sessionStorage.getItem("token");
const fileInput = document.getElementById("candidate-info");

if (!token) {
    window.location.href = "/";
}

function showErrorMessage(message) {
    const errorDiv = document.getElementById("error-message");
    if (message.trim() === "") {
        errorDiv.style.display = "none";
        errorDiv.textContent = "";
    } else {
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
    }
}

document.getElementById('candidate-info').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) {
        alert('No file selected');
        return;
    }

    let fileNameDisplay = document.getElementById('file-name-display');
    if (!fileNameDisplay) {
        fileNameDisplay = document.createElement('div');
        fileNameDisplay.id = 'file-name-display';
        fileNameDisplay.style.marginTop = '5px';
        fileInput.parentNode.appendChild(fileNameDisplay);
    }
    fileNameDisplay.textContent = `${file.name}`;

    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            candidateInfo = results.data;
            if (candidateInfo.length === 0) {
                alert('The CSV file is empty.');
                document.getElementById("candidate-info").value = "";
                return;
            }

            const requiredColumns = ["Ten", "So dien thoai", "Email", "Dia chi"];
            const headers = Object.keys(candidateInfo[0] || {});
            const missingColumns = requiredColumns.filter(col => !headers.includes(col));
            if (missingColumns.length > 0) {
                alert(`Missing required columns: ${missingColumns.join(', ')}`);
                document.getElementById("candidate-info").value = "";
                candidateInfo = [];
                return;
            }

            const invalidRows = [];
            candidateInfo.forEach((row, index) => {
                const missingFields = requiredColumns.filter(col => {
                    const value = row[col];
                    return value === undefined || value === null || value.trim() === '';
                });
                if (missingFields.length > 0) {
                    invalidRows.push(`Row ${index + 2}: Missing or empty ${missingFields.join(', ')}`);
                }
            });

            if (invalidRows.length > 0) {
                alert(`Invalid rows detected:\n${invalidRows.join('\n')}`);
                document.getElementById("candidate-info").value = "";
                candidateInfo = [];
                return;
            }
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
            alert('Error parsing CSV file. Please check the file format.');
            document.getElementById("candidate-info").value = "";
            candidateInfo = [];
        }
    });
});


document.getElementById("submit-btn").addEventListener("click", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const certificateType = document.getElementById("certificate-type").value;
    const certificateLevel = document.getElementById("certificate-level").value;

    const payload = {
        name: name,
        candidateInfo: candidateInfo,
        date: date,
        startTime: startTime,
        endTime: endTime,
        certificateType: certificateType,
        certificateLevel: certificateLevel
    };

    if (candidateInfo.length < 35) {
        alert("Phải có ít nhất 35 thí sinh mới có thể mở thêm lịch thi!!");
        return;
    }
    
    try {
        const res = await fetch('/register/organization', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            showErrorMessage(`${data.message}`);
        } else {
            alert(`${data.message}`);
            document.getElementById("register-form").reset();
            candidateInfo = [];
        }
    } catch (error) {
        alert("Quyền truy cập bị giới hạn!!");
        console.log(error);
    }
});

document.getElementById("customer").addEventListener("click", function () {
    window.location.href = "/register/customer";
});

window.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    const submitBtn = document.getElementById('submit-btn');

    const today = new Date();
    today.setDate(today.getDate() + 14);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${year}-${month}-${day}`;

    function validateTimes() {
        const start = startTimeInput.value;
        const end = endTimeInput.value;
    
        const MIN_START_TIME = '08:00';
        const MAX_END_TIME  = '17:00';
    
        if (!start || !end) {
            showErrorMessage("Vui lòng nhập đủ giờ bắt đầu và kết thúc.");
            submitBtn.disabled = true;
        } else if (start < MIN_START_TIME) {
            showErrorMessage("Giờ bắt đầu phải từ 08:00 trở lên.");
            submitBtn.disabled = true;
        } else if (end > MAX_END_TIME ) {
            showErrorMessage("Giờ kết thúc phải từ 17:00 trở xuống.");
            submitBtn.disabled = true;
        } else if (end <= start) {
            showErrorMessage("Giờ kết thúc phải lớn hơn giờ bắt đầu.");
            submitBtn.disabled = true;
        } else {
            showErrorMessage("");
            submitBtn.disabled = false;
        }
    }

    startTimeInput.addEventListener('input', validateTimes);
    endTimeInput.addEventListener('input', validateTimes);
});