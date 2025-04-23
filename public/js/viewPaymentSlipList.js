const searchInput = document.getElementById("searchInput");
const items = document.querySelectorAll(".PhieuThanhToan-list li");
const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "/";
}

searchInput.addEventListener("input", function () {
  const keyword = this.value.trim().toLowerCase();
  items.forEach((item) => {
    const id = item.getAttribute("data-id").toLowerCase();
    if (id.includes(keyword)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

document.querySelectorAll(".btn-lapHoaDon").forEach((button) => {
  button.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    if (id) {
      // Điều hướng sang trang có mã phiếu
      window.location.href = `/createReceipt/${id}`;
    }
  });
});
