# Bài 6 — React CRUD: Quản lý người dùng

Ứng dụng theo bài thực hành `Ex. React-CRUD - 20261.pdf`, dùng React 18, ReactDOM và Babel qua CDN. Không cần cài npm hoặc build.

## Chạy ứng dụng

Mở `index.html` bằng trình duyệt hoặc chọn **Open with Live Server** trong VS Code. Cần Internet để tải thư viện và dữ liệu mẫu lần đầu.

Cũng có thể chạy từ PowerShell:

```powershell
cd "D:\CNghe web\Bai 6 CRUD"
python -m http.server 5500 --bind 127.0.0.1
```

Sau đó truy cập <http://127.0.0.1:5500>. Nhấn `Ctrl+C` để dừng server.

## Chức năng

- **Read:** gọi `https://jsonplaceholder.typicode.com/users` trong `useEffect`, hiển thị bảng với ID, tên, username, email, địa chỉ, điện thoại và website.
- **Search:** lọc theo tên hoặc username, không phân biệt hoa/thường và dấu tiếng Việt.
- **Create:** thêm người dùng bằng modal; bắt buộc tên, username; kiểm tra username trùng, email và website.
- **Update:** mở bản sao dữ liệu vào form, bao gồm bản sao `address`; chỉ cập nhật bảng khi chọn **Lưu thay đổi**.
- **Delete:** xóa ngay bằng `filter()`, không hỏi xác nhận; có thể **Hoàn tác** khi thông báo còn hiển thị.
- Tự lưu dữ liệu bằng `localStorage`; tải lại trang vẫn giữ thay đổi, kể cả khi đã xóa hết danh sách.
- Có trạng thái đang tải, lỗi kết nối, thử lại, danh sách trống và cảnh báo khi trình duyệt không cho phép lưu.

Thêm/sửa/xóa cập nhật state React và bộ nhớ của trình duyệt, không ghi lên máy chủ JSONPlaceholder. Dữ liệu không đồng bộ giữa thiết bị, trình duyệt hoặc địa chỉ truy cập khác nhau. Muốn tải lại danh sách mẫu, xóa khóa `it4409-react-crud-users-v1` trong Local Storage bằng DevTools rồi tải lại trang.

## Cấu trúc và luồng dữ liệu

- `index.html`: khung HTML, thư viện CDN, các functional component và logic React; JSX đặt trong `<script type="text/babel">` theo tài liệu bài tập.
- `styles.css`: giao diện bảng, form, modal và bố cục trên điện thoại.
- `App`: quản lý danh sách, từ khóa tìm kiếm, người đang sửa và thông báo; tải API và lưu dữ liệu bằng `useEffect`.
- `SearchForm`: nhận từ khóa và callback từ `App`.
- `AddUser`: mở form, truyền người dùng mới lên `App` qua `onAdd`.
- `ResultTable`: nhận danh sách và từ khóa qua props; gọi callback sửa/xóa.
- `UserForm`, `FormField`: form điều khiển bằng state, dùng chung cho thêm/sửa. `dialog` hỗ trợ bàn phím, giữ focus và đóng bằng Escape.

Luồng chính: `SearchForm → App → ResultTable`, `AddUser → App → ResultTable`. State chia sẻ tập trung tại `App`; component con gửi thay đổi lên qua callback. Các cập nhật dùng spread, `map()` và `filter()` để không sửa trực tiếp state.

## Kiểm tra thủ công

1. Mở trang lần đầu: tải và hiển thị 10 người dùng mẫu.
2. Tìm theo tên/username; thử từ khóa không có kết quả rồi xóa từ khóa.
3. Thêm người dùng, thử bỏ trống tên, username trùng, email/website sai.
4. Sửa tên và từng trường địa chỉ; chọn Hủy để kiểm tra dữ liệu cũ được giữ, sau đó thử lưu.
5. Xóa một người, thêm người khác để kiểm tra ID không trùng; thử Hoàn tác xóa.
6. Tải lại trang để kiểm tra dữ liệu đã lưu; thử xóa hết và tải lại.
7. Khi chưa có dữ liệu lưu, ngắt kết nối API để kiểm tra thông báo lỗi và nút Thử lại.
8. Thu nhỏ cửa sổ: form chuyển thành một cột, bảng có thể cuộn ngang.

Tài liệu tham khảo: [React](https://react.dev/learn), [Babel Standalone](https://babeljs.io/docs/babel-standalone), [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
