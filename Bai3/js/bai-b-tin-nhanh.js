/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const dsTin = document.getElementById("list");
const oTimKiem = document.getElementById("o-tim-kiem");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
function capNhatBoDem(soHien, tongSo) {
	boDem.textContent = `Đang hiển thị ${soHien}/${tongSo} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoaGoc = oTimKiem.value;
	const tuKhoa = tuKhoaGoc.toLowerCase();
	// Lấy lại danh sách mỗi lần lọc để bao gồm cả những tin vừa đăng.
	const cacTin = dsTin.querySelectorAll("li");
	let soHien = 0;

	for (const tin of cacTin) {
		const tieuDe = tin.querySelector("h3").textContent.toLowerCase();
		const noiDung = tin.querySelector("p").textContent.toLowerCase();
		const khop = tieuDe.includes(tuKhoa) || noiDung.includes(tuKhoa);
		tin.classList.toggle("an", !khop);
		if (khop) {
			soHien++;
		}
	}

	capNhatBoDem(soHien, cacTin.length);
	khongThay.classList.toggle("an", soHien > 0);
	khongThay.textContent = soHien === 0 ? `Không tìm thấy tin nào cho "${tuKhoaGoc}"` : "";
}

oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
dsTin.addEventListener("click", (e) => {
	if (!e.target.matches("button.more")) {
		return;
	}

	const nut = e.target;
	const doanVan = nut.closest("li").querySelector("p");
	const daMo = doanVan.classList.toggle("day-du");
	nut.textContent = daMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value;
	const noiDung = oNoiDung.value;
	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const tinMoi = document.createElement("li");
	const ngay = document.createElement("span");
	ngay.className = "time";
	ngay.textContent = homNay();

	const tieuDeMoi = document.createElement("h3");
	tieuDeMoi.textContent = tieuDe;
	const noiDungMoi = document.createElement("p");
	noiDungMoi.textContent = noiDung;

	const nutMoRong = document.createElement("button");
	nutMoRong.type = "button";
	nutMoRong.className = "more";
	nutMoRong.textContent = "Read more >>";

	tinMoi.append(ngay, tieuDeMoi, noiDungMoi, nutMoRong);
	dsTin.prepend(tinMoi);
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	locTin();
});

// Khởi tạo bộ đếm và trạng thái lọc ngay khi tải trang.
locTin();
