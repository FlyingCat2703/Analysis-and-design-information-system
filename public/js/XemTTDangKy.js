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
