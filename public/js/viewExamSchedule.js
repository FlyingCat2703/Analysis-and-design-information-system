document.getElementById("input-date").addEventListener("change", async function () {
    const selectedDate = this.value;
    if (!selectedDate) {
        return;
    }

    try {
        const res = await fetch(`/viewExamSchedule/byDate?date=${selectedDate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const schedules = await res.json();
        const scheduleList = document.getElementById("schedule-list");
        scheduleList.innerHTML = "";
        
        schedules["schedules"].forEach(schedule => {
            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item';
            scheduleItem.innerHTML = `
                <p><span><b>Ngày thi:</b> ${schedule.date}</span></p>
                <p><span><b>Thời gian thi:</b> ${schedule.startTime} - ${schedule.endTime}</span></p>
                <p><span><b>Loại chứng chỉ:</b> ${schedule.certificateType}</span></p>
                <p><span><b>Cấp bậc:</b> ${schedule.level}</span></p>
                <p><span><b>Số lượng hiện tại:</b> ${schedule.currentQuantity || 'unknown'}</span></p>
            `;
            scheduleList.appendChild(scheduleItem);
        });

    } catch (error) {
        console.log(error);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const inputDate = document.getElementById("input-date");
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 14);
    const futureStr = future.toISOString().split("T")[0];
    inputDate.min = futureStr;
});
