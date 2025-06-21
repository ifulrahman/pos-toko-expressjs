
# Toko - Backend API

A clean and educational RESTful API for managing a simple online store.  
Built with:

- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **MySQL**
- **JWT Authentication**

This project supports admin-based product management, public user cart, and invoice generation.

---

## ⚠️ Note
- You can use the [Postman Collection JSON here](https://drive.google.com/drive/folders/12wPDK63IRgmqvZGOMgDL-G-omifiTiDd?usp=drive_link).
- Watch the [Demo Video here](https://drive.google.com/file/d/1xMqBSYD2n-XDkAcQ6sf77w_w3XTImVxu/view?usp=drive_link).
- You can import database SQL from [here](https://drive.google.com/drive/folders/12wPDK63IRgmqvZGOMgDL-G-omifiTiDd?usp=drive_link).

---

## Features

### 🔐Admin (JWT Protected)
- `POST /admin/register` — Register a new admin
- `POST /admin/login` — Login and receive JWT token
- `POST /admin/logout` — Logout (client should delete the token)
- `POST /products` — Create a product (requires token)
- `PUT /products/:id` — Update product
- `DELETE /products/:id` — Delete product
- `GET /cart/admin` — View all cart items (admin only)
- `DELETE /cart/:id` — Delete a cart item (admin only)
- `GET /admin/invoices` — View all invoices (admin only)
- `DELETE /admin/invoices/:id` — Delete an invoice (admin only)

### Public User (No Authentication Required)
- `GET /products` — View all products
- `GET /products/:id` — View product details by ID
- `POST /cart` — Add item to cart (product_id, quantity)
- `POST /checkout` — Checkout cart items and generate invoice number

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ifulrahman/pos-toko-expressjs.git
cd syaiful-toko
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_NAME=syaiful_toko
DB_HOST=127.0.0.1
JWT_SECRET=your_jwt_secret
PORT=3000
```

> Replace values according to your local MySQL setup.

---

### 4. Setup Database

```bash
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

---

### 5. Run the Server

```bash
npm run dev
# or
node app.js
```

---

## API Testing

You can use **Postman**, **Thunder Client**, or any REST client to test.

- Admin routes require JWT token in `Authorization` header:
  ```
  Authorization: Bearer <your_token_here>
  ```
- Users can interact with `/cart` and `/checkout` without login.
- After checkout, a unique invoice number is generated and saved.

---

## Notes

- Cart data is not tied to user sessions — this is a simplified project for learning only.
- JWT tokens expire based on the `expiresIn` setting in the login controller.
- Cart items are marked as `is_checked_out: true` after checkout but are not deleted.

---

## Tech Stack

| Layer        | Technology     |
|--------------|----------------|
| Runtime      | Node.js        |
| Web Framework| Express.js     |
| ORM          | Sequelize      |
| Database     | MySQL          |
| Auth         | JWT            |
| Dev Tools    | Nodemon, Postman |

