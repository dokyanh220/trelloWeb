# Tổng quan dự án: trello

## Backend (`trello-api`)
### Tổng quan
Backend được xây dựng bằng Node.js và Express. Nó cung cấp các API RESTful để quản lý bảng, cột và thẻ. MongoDB được sử dụng làm cơ sở dữ liệu.

### Các thành phần chính
1. **`server.js`**:
   - Khởi tạo server Express.
   - Kết nối tới MongoDB.
   - Cấu hình middleware để xử lý JSON và xử lý lỗi.
   - Định tuyến các yêu cầu API tới `/v1`.

2. **Routes**:
   - **`boardRoute.js`**:
     - Định nghĩa các route cho tài nguyên `boards`.
     - Hỗ trợ `GET` (phản hồi mẫu) và `POST` (tạo bảng mới).

3. **Controllers**:
   - **`boardController.js`**:
     - Xử lý yêu cầu `POST` để tạo bảng mới.
     - Chuyển dữ liệu sang tầng service để xử lý.

4. **Models**:
   - **`boardModel.js`**:
     - Định nghĩa schema cho collection `boards` sử dụng `Joi`.
     - Cung cấp các phương thức để xác thực và chèn bảng mới vào MongoDB.

5. **Cấu hình**:
   - **MongoDB**: Quản lý kết nối và cơ sở dữ liệu.
   - **Biến môi trường**: Quản lý bằng `.env`.

### Quy trình hoạt động
1. Client gửi yêu cầu tới backend (ví dụ: `POST /v1/boards`).
2. Yêu cầu được định tuyến tới controller tương ứng qua `boardRoute.js`.
3. Controller xử lý yêu cầu và tương tác với tầng service.
4. Tầng service xác thực và xử lý dữ liệu bằng model.
5. Model tương tác với MongoDB để thực hiện các thao tác cơ sở dữ liệu.
6. Phản hồi được gửi lại cho client.

---

## Frontend (`trello-web`)
### Tổng quan
Frontend được xây dựng bằng React và Vite. Nó cung cấp giao diện người dùng để quản lý bảng, cột và thẻ. Material-UI được sử dụng để tạo kiểu.

### Các thành phần chính
1. **`App.jsx`**:
   - Thành phần chính của ứng dụng.
   - Hiển thị thành phần `Board` từ trang `Boards`.

2. **`main.jsx`**:
   - Điểm vào của ứng dụng React.
   - Bao bọc ứng dụng trong `CssVarsProvider` của Material-UI để quản lý chủ đề.

3. **`AppBar.jsx`**:
   - Triển khai thanh điều hướng trên cùng với các thành phần Material-UI.
   - Bao gồm các menu cho Workspaces, Recent, Starred, Templates và Profiles.
   - Cung cấp thanh tìm kiếm và các biểu tượng cho thông báo, trợ giúp và các hành động khác.

4. **Cấu hình Vite**:
   - Được cấu hình trong `vite.config.js`.
   - Bao gồm các plugin cho React và xử lý SVG.
   - Thiết lập alias (`~`) cho thư mục `src`.

### Quy trình hoạt động
1. Người dùng tương tác với giao diện (ví dụ: nhấn nút hoặc gửi biểu mẫu).
2. Frontend gửi yêu cầu API tới backend.
3. Backend xử lý yêu cầu và gửi phản hồi.
4. Frontend cập nhật giao diện dựa trên phản hồi.

---

## Quy trình tổng thể
1. **Frontend**:
   - Người dùng tương tác với giao diện (ví dụ: tạo bảng mới).
   - Frontend gửi yêu cầu API tới backend.

2. **Backend**:
   - Yêu cầu được định tuyến tới controller tương ứng.
   - Controller xử lý yêu cầu và tương tác với cơ sở dữ liệu.
   - Backend gửi phản hồi tới frontend.

3. **Frontend**:
   - Giao diện được cập nhật dựa trên phản hồi từ backend.

---

## Ghi chú
- Backend sử dụng `Joi` để xác thực schema và `mongodb` để thao tác cơ sở dữ liệu.
- Frontend sử dụng Material-UI để tạo kiểu và Vite để phát triển.
- Dự án được tổ chức module hóa, với sự phân tách rõ ràng giữa các thành phần, route, controller và model.
