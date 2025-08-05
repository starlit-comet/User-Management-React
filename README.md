# 🚀 User Management System

A full-stack **User Management Application** built with **React**, **Node.js**, **Express**, and **MongoDB Atlas**, featuring secure authentication, image upload via **Cloudinary**, and a powerful admin dashboard for managing user accounts.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Completed-brightgreen)
![Tech](https://img.shields.io/badge/stack-MERN-informational)

---

## 🌟 Features

🔐 **JWT Authentication**  
👤 **User Registration & Login**  
🖼️ **Image Upload via Cloudinary**  
🧑‍💻 **Admin Dashboard for Full User Control**  
🛠️ **Role-Based Access**  
💾 **MongoDB Atlas Cloud Storage**  
🎨 **Modern UI with Tailwind CSS & ShadCN UI**  
⚛️ **State Management using Redux Toolkit**  

---

## 📸 Screenshots

> *(Include screenshots or a demo GIF here if available)*  
> `Login | Admin Panel | User Profile | Image Upload`

---

## 🔧 Tech Stack

| Frontend        | Backend         | Database      | Others                     |
|-----------------|-----------------|---------------|----------------------------|
| React.js        | Node.js         | MongoDB Atlas | Cloudinary (Image Upload) |
| Redux Toolkit   | Express.js      | Mongoose      | JWT (Authentication)      |
| Tailwind CSS    | REST API        |               | ShadCN UI Components      |

---

## 🔑 Admin Features

- Create new user accounts
- Edit user details
- Block or unblock users
- Upload/update profile images
- View all registered users

---

## 👥 User Features

- Create an account
- Upload a profile picture
- Log in securely using email & password
- View and update their profile

---

## 🛠️ Setup Instructions

### 1. Clone the repository:
```bash
git clone https://github.com/starlit-comet/User-Management-React.git
cd User-Management-React
```

### 2. Setup the backend:
```bash
cd backend
npm install
# Create a .env file and add:
# MONGO_URI=your_mongo_uri
# JWT_SECRET=your_jwt_secret
# CLOUDINARY_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
npm run dev
```

### 3. Setup the frontend:
```bash
cd ../frontend
npm install
npm start
```

---

## 📁 Folder Structure (Brief)

```
/frontend         -> React app with Redux & Tailwind
/backend          -> Express server with routes, controllers, JWT logic
/uploads          -> (Optional if used for local backup)
.env              -> Environment variables
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [Cloudinary](https://cloudinary.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📣 Let's Connect

Feel free to reach out if you have questions or want to collaborate!
