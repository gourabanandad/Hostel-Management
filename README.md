# 🏠 Smart Hostel Management System

![HostelHub Banner](https://github.com/gourabanandad/Hostel-Management/blob/main/image.png)  


A **full-stack digital platform** designed to revolutionize hostel operations for colleges. Streamline meal confirmations, automate notices, and track student presence with scalability for future modules.

---

## ✨ Key Features

### 📱 Student App
| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| **Registration**       | Name, Semester, Roll No., Room No., Contact, Email                         |
| **Meal Confirmation**  | Daily prompts (Lunch/Dinner) with 9PM cut-off                              |
| **Notice Board**       | Real-time updates with PDF/image support                                    |
| **Auth**               | Email + OTP login (Firebase)                                                |
| **Offline Support**    | Cache notices & submit confirmations offline                                |

### 🖥️ Admin Panel
| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| **Dashboard**          | Visualize meal stats, confirmations, and student presence                  |
| **Student Directory**  | Filter by room/semester, mark attendance                                   |
| **Notice Management**  | Publish/archive notices with rich text support                              |
| **Data Export**        | Export meal reports to CSV/PDF                                             |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase)

### Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb)

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Student Mobile App] -->|REST API| B[Backend Server]
    C[Admin Web Panel] -->|REST API| B
    B --> D[(PostgreSQL)]
    B --> E[Firebase Auth]
    B --> F[Redis Cache]
    G[SMTP Server] -->|Notifications| A