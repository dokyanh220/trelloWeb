# 📋 Trello Clone — Full-Stack Project Management App

> Ứng dụng quản lý công việc theo phong cách Kanban Board, được xây dựng theo mô hình **MERN Stack** (MongoDB, Express.js, React, Node.js) với đầy đủ tính năng Drag & Drop, xác thực người dùng, và quản lý board/column/card theo thời gian thực.

---

## 📸 Tổng Quan

| Tính năng | Mô tả |
|---|---|
| 🔐 **Xác thực** | Đăng ký, đăng nhập, xác minh email, JWT httpOnly Cookie |
| 📋 **Board Management** | Tạo, xem, phân trang danh sách boards |
| 📊 **Kanban Board** | Drag & Drop columns và cards linh hoạt |
| 👤 **User Settings** | Cập nhật avatar, display name, đổi mật khẩu |
| 📩 **Invitation System** | Mời thành viên vào board, hệ thống thông báo |
| 🌗 **Dark/Light Mode** | Hỗ trợ chuyển đổi giao diện sáng/tối |
| 🚀 **Deployment** | Frontend trên Vercel, Backend trên Render |

---

## 🏗️ Kiến Trúc Dự Án

```
trello/
├── api/                    # Backend — Node.js + Express.js
│   └── src/
│       ├── config/         # Cấu hình MongoDB, CORS, Environment
│       ├── controllers/    # Xử lý request/response
│       ├── middlewares/    # Auth JWT, Error Handling, Upload File
│       ├── models/         # Data models (Board, Column, Card, User, Invitation)
│       ├── providers/      # Tích hợp bên thứ 3 (JWT, Cloudinary, Brevo)
│       ├── routes/         # Định tuyến API (v1, v2)
│       ├── services/       # Business logic
│       ├── sockets/        # WebSocket handlers
│       ├── utils/          # Helpers, Constants, Error class
│       ├── validations/    # Schema validation với Joi
│       └── server.js       # Entry point
│
├── web/                    # Frontend — React + Vite
│   └── src/
│       ├── apis/           # API service layer (Axios)
│       ├── assets/         # Static resources
│       ├── components/     # Reusable UI components
│       │   ├── AppBar/     # Navigation bar + Notifications
│       │   ├── Form/       # Form components
│       │   ├── Loading/    # Loading spinners
│       │   ├── Modal/      # ActiveCard detail modal
│       │   └── ModeSelect/ # Dark/Light mode toggle
│       ├── customLibararies/ # Custom DnD Kit sensors
│       ├── pages/          # Route pages
│       │   ├── Auth/       # Login, Register, Account Verification
│       │   ├── Boards/     # Board listing + Board detail (Kanban)
│       │   ├── Settings/   # Account & Security settings
│       │   └── 404/        # Not Found page
│       ├── redux/          # State management (Redux Toolkit + Persist)
│       │   ├── activeBoard/
│       │   ├── activeCard/
│       │   ├── notifications/
│       │   └── user/
│       ├── utils/          # Axios interceptors, formatters, validators
│       ├── App.jsx         # Route definitions
│       ├── main.jsx        # App entry point
│       └── theme.js        # MUI custom theme
│
└── package.json            # Root scripts (chạy cả api + web)
```

---

## 🔧 Công Nghệ Sử Dụng

### Frontend

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| **React** | 18.x | UI Library |
| **Vite** | 4.x | Build tool & Dev server |
| **Material UI (MUI)** | 5.x | Component library & Theming |
| **@dnd-kit** | 6.x / 7.x | Drag & Drop (Column + Card) |
| **Redux Toolkit** | 2.x | State management |
| **Redux Persist** | 6.x | Persist user state qua localStorage |
| **React Router** | 7.x | Client-side routing |
| **React Hook Form** | 7.x | Form validation |
| **Axios** | 1.x | HTTP client với interceptors |
| **React Toastify** | 11.x | Toast notifications |
| **@uiw/react-md-editor** | 4.x | Markdown editor cho card description |
| **Moment.js** | 2.x | Date formatting |
| **Lodash** | 4.x | Utility functions |

### Backend

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| **Node.js** | ≥18.x | Runtime |
| **Express.js** | 4.x | Web framework |
| **MongoDB** (Atlas) | 5.x driver | NoSQL Database |
| **JSON Web Token** | 9.x | Access Token + Refresh Token |
| **bcryptjs** | 2.x | Mã hóa mật khẩu |
| **Joi** | 17.x | Request validation |
| **Cloudinary** | 2.x | Upload & quản lý ảnh (Avatar) |
| **Brevo (Sendinblue)** | 2.x | Gửi email xác thực tài khoản |
| **Multer** | 2.x | Xử lý file upload |
| **Babel** | 7.x | Transpiler (ES Modules → CommonJS cho production) |
| **Nodemon** | 3.x | Hot reload trong development |
| **cookie-parser** | 1.x | Parse JWT cookies |

### DevOps & Deployment

| Công cụ | Mục đích |
|---|---|
| **Vercel** | Deploy frontend (SPA với rewrite rules) |
| **Render** | Deploy backend API |
| **MongoDB Atlas** | Cloud database |
| **Cloudinary** | Cloud media storage |
| **Brevo** | Transactional email service |
| **ESLint** | Code linting |
| **cross-env** | Cross-platform environment variables |

---

## ⚙️ Quy Trình Hoạt Động

### 1. Luồng Xác Thực (Authentication Flow)

```
┌─────────────┐     POST /register     ┌─────────────┐     Email      ┌─────────────┐
│  User đăng  │ ──────────────────────► │  Backend    │ ──────────────► │   Brevo     │
│  ký tài     │                         │  tạo user   │   verification │   gửi email │
│  khoản      │                         │  + hash pw  │   link         │   xác thực  │
└─────────────┘                         └─────────────┘                └─────────────┘
                                                                              │
       ┌──────────────────────────────────────────────────────────────────────┘
       ▼
┌─────────────┐     PUT /verify         ┌─────────────┐
│  User click │ ──────────────────────► │  Backend    │
│  link xác   │                         │  active     │
│  thực email │                         │  account    │
└─────────────┘                         └─────────────┘

┌─────────────┐     POST /login         ┌─────────────┐
│  User đăng  │ ──────────────────────► │  Backend    │
│  nhập       │                         │  verify pw  │
│             │ ◄────────────────────── │  → tạo JWT  │
│             │  Set httpOnly Cookies   │  (AT + RT)  │
└─────────────┘  (accessToken,          └─────────────┘
                  refreshToken)
```

**Chi tiết Token:**
- **Access Token**: Thời gian sống ngắn, gửi kèm mỗi request qua httpOnly Cookie
- **Refresh Token**: Thời gian sống dài, dùng để tạo lại Access Token khi hết hạn
- **Auto Refresh**: Khi nhận mã `410 GONE` → tự động gọi `/refresh_token` → retry request gốc

### 2. Luồng Drag & Drop (Kanban Board)

```
┌─────────────────────────────────────────────────────────────┐
│                    DndContext (@dnd-kit)                     │
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │ Column 1 │    │ Column 2 │    │ Column 3 │   + Add     │
│   │──────────│    │──────────│    │──────────│   Column     │
│   │ ┌──────┐ │    │ ┌──────┐ │    │ ┌──────┐ │             │
│   │ │Card A│ │◄──►│ │Card D│ │    │ │Card F│ │             │
│   │ └──────┘ │    │ └──────┘ │    │ └──────┘ │             │
│   │ ┌──────┐ │    │ ┌──────┐ │    │          │             │
│   │ │Card B│ │    │ │Card E│ │    │ + Add    │             │
│   │ └──────┘ │    │ └──────┘ │    │   Card   │             │
│   │ ┌──────┐ │    │          │    │          │             │
│   │ │Card C│ │    │ + Add    │    └──────────┘             │
│   │ └──────┘ │    │   Card   │                             │
│   │          │    └──────────┘                             │
│   │ + Add    │                                             │
│   │   Card   │    ◄── Kéo thả Card giữa các Column ──►    │
│   └──────────┘                                             │
│                                                             │
│   ◄────────── Kéo thả Column thay đổi thứ tự ──────────►  │
└─────────────────────────────────────────────────────────────┘
```

**Xử lý Drag & Drop:**
- **Kéo Column**: Sắp xếp lại thứ tự columns → `PUT /boards/:id` cập nhật `columnOrderIds`
- **Kéo Card cùng Column**: Sắp xếp lại cards → `PUT /columns/:id` cập nhật `cardOrderIds`
- **Kéo Card khác Column**: Xóa card khỏi column cũ, thêm vào column mới → `PUT /boards/supports/moving_card`
- **Collision Detection**: Thuật toán tùy chỉnh kết hợp `pointerWithin` + `closestCorners` để tránh flickering
- **Custom Sensors**: Mouse sensor (distance: 10px) + Touch sensor (delay: 250ms) cho trải nghiệm mượt mà

### 3. Luồng API Request (Axios Interceptors)

```
┌──────────┐    Request     ┌──────────────┐    API Call    ┌──────────┐
│  React   │ ──────────────► │   Axios      │ ─────────────► │ Express  │
│  Component│                │  Interceptor │                │  Server  │
│          │ ◄────────────── │  (Request)   │ ◄───────────── │          │
│          │    Response     │              │    Response    │          │
└──────────┘                └──────────────┘                └──────────┘
                                   │
                           ┌───────┴───────┐
                           │ Interceptor   │
                           │ xử lý:       │
                           │ • Loading UI  │
                           │ • 401 → Logout│
                           │ • 410 → Refresh│
                           │   Token       │
                           │ • Error Toast │
                           └───────────────┘
```

### 4. Kiến Trúc Backend (MVC + Service Layer)

```
Request → Route → Validation (Joi) → Controller → Service → Model → MongoDB
                                          │
                                     Middleware
                                   (Auth JWT, Multer,
                                    Error Handling)
```

| Tầng | Trách nhiệm |
|---|---|
| **Routes** | Định tuyến URL, gắn middleware |
| **Validations** | Validate request body/params với Joi |
| **Controllers** | Nhận request, gọi service, trả response |
| **Services** | Business logic, gọi providers bên ngoài |
| **Models** | Tương tác trực tiếp với MongoDB collections |
| **Providers** | Tích hợp dịch vụ bên thứ 3 (JWT, Cloudinary, Brevo) |
| **Middlewares** | Auth check, Error handling, File upload |

---

## 🚀 Cài Đặt & Chạy Dự Án

### Yêu cầu

- **Node.js** ≥ 18.x
- **Yarn** hoặc **npm**
- Tài khoản **MongoDB Atlas**
- Tài khoản **Cloudinary** (upload ảnh)
- Tài khoản **Brevo** (gửi email)

### 1. Clone Repository

```bash
git clone https://github.com/dokyanh220/trelloWeb.git
cd trello
```

### 2. Cấu hình Backend

Tạo file `api/.env`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
DATABASE_NAME=trello_database

# Server
APP_HOST=localhost
APP_PORT=8017
BUILD_MODE=dev

# Author
AUTHOR=dokyanh220

# Frontend Domains
WEBSITE_DOMAIN_DEVELOPER=http://localhost:5173
WEBSITE_DOMAIN_PRODUCTION=https://your-domain.vercel.app

# Brevo (Email)
BREVO_API_KEY=your_brevo_api_key
ADMIN_EMAIL_ADDRESS=your_admin@email.com
ADMIN_EMAIL_NAME=Trello Web

# JWT
ACCESS_TOKEN_SECRET_SIGNATURE=your_access_token_secret
ACCESS_TOKEN_LIFE=1h
REFRESH_TOKEN_SECRET_SIGNATURE=your_refresh_token_secret
REFRESH_TOKEN_LIFE=14d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Cài đặt Dependencies

```bash
# Cài đặt cho cả api và web
cd api && yarn install && cd ..
cd web && yarn install && cd ..
```

### 4. Chạy Development

```bash
# Chạy cả Frontend + Backend cùng lúc (từ root)
npm run dev

# Hoặc chạy riêng từng phần:
# Backend (port 8017)
cd api && yarn dev

# Frontend (port 5173)
cd web && yarn dev
```

### 5. Build Production

```bash
# Build backend
cd api && yarn build

# Chạy production
cd api && yarn production

# Build frontend
cd web && yarn build
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| `POST` | `/v1/users/register` | Đăng ký tài khoản | ❌ |
| `PUT` | `/v1/users/verify` | Xác thực email | ❌ |
| `POST` | `/v1/users/login` | Đăng nhập | ❌ |
| `DELETE` | `/v1/users/logout` | Đăng xuất | ❌ |
| `GET` | `/v1/users/refresh_token` | Làm mới Access Token | ❌ |
| `PUT` | `/v1/users/update` | Cập nhật thông tin user (avatar, displayName, password) | ✅ |

### Boards

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| `GET` | `/v1/boards` | Lấy danh sách boards (có phân trang) | ✅ |
| `POST` | `/v1/boards` | Tạo board mới | ✅ |
| `GET` | `/v1/boards/:id` | Lấy chi tiết board | ✅ |
| `PUT` | `/v1/boards/:id` | Cập nhật board | ✅ |
| `PUT` | `/v1/boards/supports/moving_card` | Di chuyển card giữa các columns | ✅ |

### Columns

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| `POST` | `/v1/columns` | Tạo column mới | ✅ |
| `PUT` | `/v1/columns/:id` | Cập nhật column | ✅ |
| `DELETE` | `/v1/columns/:id` | Xóa column | ✅ |

### Cards

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| `POST` | `/v1/cards` | Tạo card mới | ✅ |
| `PUT` | `/v1/cards/:id` | Cập nhật card (description, cover, members...) | ✅ |

### Invitations

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| `POST` | `/v1/invitations/board` | Mời user vào board | ✅ |

---

## 🗄️ Database Schema (MongoDB)

### Users Collection
```json
{
  "_id": "ObjectId",
  "email": "user@example.com",
  "password": "$2a$08$...(hashed)",
  "username": "user",
  "displayName": "User Display Name",
  "avatar": "https://res.cloudinary.com/.../avatar.jpg",
  "verifyToken": "uuid-v4 | null",
  "isActive": true,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Boards Collection
```json
{
  "_id": "ObjectId",
  "title": "Board Title",
  "description": "Board Description",
  "type": "public | private",
  "columnOrderIds": ["columnId_1", "columnId_2"],
  "ownerIds": ["userId"],
  "memberIds": ["userId_1", "userId_2"],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Columns Collection
```json
{
  "_id": "ObjectId",
  "boardId": "ObjectId",
  "title": "Column Title",
  "cardOrderIds": ["cardId_1", "cardId_2"],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Cards Collection
```json
{
  "_id": "ObjectId",
  "boardId": "ObjectId",
  "columnId": "ObjectId",
  "title": "Card Title",
  "description": "Markdown content...",
  "cover": "image_url",
  "memberIds": ["userId_1"],
  "comments": [],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Invitations Collection
```json
{
  "_id": "ObjectId",
  "inviterId": "ObjectId",
  "inviteeId": "ObjectId",
  "type": "BOARD_INVITATION",
  "boardInvitation": {
    "boardId": "ObjectId",
    "status": "PENDING | ACCEPTED | REJECTED"
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## 🔑 Tính Năng Chi Tiết

### ✅ Đã Hoàn Thành

- [x] **Đăng ký / Đăng nhập / Đăng xuất** với email & password
- [x] **Xác thực email** qua Brevo transactional email
- [x] **JWT Authentication** (Access Token + Refresh Token) lưu trong httpOnly Cookie
- [x] **Tự động refresh token** khi Access Token hết hạn (mã 410)
- [x] **Protected Routes** — redirect về `/login` nếu chưa đăng nhập
- [x] **Tạo Board mới** với title, description, type (public/private)
- [x] **Danh sách Boards** với phân trang (pagination)
- [x] **Kanban Board** — hiển thị columns và cards
- [x] **Drag & Drop Columns** — sắp xếp lại thứ tự columns
- [x] **Drag & Drop Cards** — kéo thả trong cùng column hoặc giữa các columns
- [x] **Tạo Column mới** trong board
- [x] **Xóa Column** (kèm tất cả cards bên trong)
- [x] **Tạo Card mới** trong column
- [x] **Card Detail Modal** — xem/sửa chi tiết card
- [x] **Markdown Editor** cho card description (react-md-editor)
- [x] **Card Members** — thêm/xóa thành viên trong card
- [x] **Card Activity/Comments** section
- [x] **Upload Avatar** lên Cloudinary (tự động xóa avatar cũ)
- [x] **Cập nhật Display Name**
- [x] **Đổi mật khẩu** (kiểm tra mật khẩu hiện tại)
- [x] **Account Settings** & **Security Settings** tabs
- [x] **Dark/Light Mode** toggle
- [x] **Notification System** với invitation UI
- [x] **Mời thành viên** vào board
- [x] **Custom scrollbar** styling
- [x] **Horizontal scroll** bằng cuộn chuột trên board
- [x] **Loading spinners** cho UX mượt mà
- [x] **Interceptor loading** — ngăn double-click khi API đang chạy
- [x] **Centralized error handling** (cả Frontend và Backend)
- [x] **Responsive Layout** với MUI Grid system
- [x] **Redux Persist** — giữ trạng thái user khi refresh trang

---

## 📦 Deployment

### Frontend → Vercel
- Cấu hình SPA rewrite trong `vercel.json`
- Build command: `yarn build`
- Output: `dist/`

### Backend → Render
- Production URL: `https://trelloweb-hyk3.onrender.com`
- Build: `yarn build` (Babel transpile)
- Start: `node ./build/src/server.js`

---

## 👤 Tác Giả

- **Author**: dokyanh220
- **Website**: [anhdo.io.vn](https://anhdo.io.vn/)

---

## 📄 License

Dự án này được phát triển cho mục đích học tập và thực hành. Mọi quyền thuộc về tác giả.
