let candidateInfo = [];
const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "/";
}

document.getElementById('candidate-info').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) {
        alert('No file selected');
        return;
    }

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
            alert(`${data.message}`);
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