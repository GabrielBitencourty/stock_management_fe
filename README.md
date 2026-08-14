# 📦 Stock Management

A modern and responsive **stock and financial management dashboard** built to help businesses manage products, expenses, clients, employees and payments in one place.

The application features a clean dashboard, financial overview cards, transaction history, authentication and an integrated assistant chat designed to provide support directly inside the application.

---

<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/7ae875e4-8843-4ef9-97aa-18e909658e5a" />

## 🚀 About the Project

**Stock Management** is a full-stack management application focused on providing a simple and intuitive interface for monitoring business operations.

The project was created with a strong focus on:

* Modern UI/UX
* Responsive design
* Component reusability
* Clean project structure
* Authentication
* Financial data visualization
* Scalable architecture

---

## ✨ Features

### 📊 Dashboard

The dashboard provides a quick overview of the most important financial information:

* 💰 Total profits
* 💸 Total expenses
* 💳 Accounts receivable
* ⏳ Pending payments
* 📈 Recent transactions
* 🧾 Payment information

### 📦 Product Management

Manage the products registered in the system, including:

* Product information
* Stock data
* Prices
* Product management

### 💰 Expense Management

Keep track of business expenses and monitor financial activity.

### 👥 Client Management

Manage registered clients and their information.

### 👨‍💼 Employee Management

Manage employees and their information within the system.

### 🤖 AI Assistant

The application includes an integrated assistant that can be accessed from anywhere in the application.

The assistant provides a chat interface where users can:

* Ask questions
* Receive assistance
* Interact with the system
* Send messages in real time

The assistant architecture is prepared to be connected to an AI backend/API.

### 🔐 Authentication

The project includes authentication screens and form validation for:

* Sign in
* Sign up
* Forgot password

---

## 🖥️ Interface

The application uses a modern dashboard layout with:

* Responsive sidebar
* Navigation bar
* Financial cards
* Transaction tables
* Floating assistant button
* Responsive components
* Modern notifications

---

## 🛠️ Technologies

### Front-end

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Shadcn/UI**
* **Lucide React**
* **React Hook Form**
* **Zod**
* **Sonner**

### Back-end

The application is designed to communicate with a backend API responsible for authentication, users and business data.

Planned/used technologies include:

* **Node.js**
* **Express**
* **MongoDB**
* **Mongoose**

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── home/
│   │   └── page.tsx
│   ├── signIn/
│   ├── signUp/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── customComponents/
│   │   ├── AgentChat.tsx
│   │   ├── AssistentButton.tsx
│   │   ├── DashboardCard.tsx
│   │   ├── LoginCard.tsx
│   │   ├── LoginForm.tsx
│   │   ├── SignUpCard.tsx
│   │   └── SignUpForm.tsx
│   │
│   ├── logedComponents/
│   │   ├── navbar.tsx
│   │   └── sideMenu.tsx
│   │
│   └── ui/
│
├── lib/
├── schemas/
└── services/
    └── authService.ts
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/GabrielBitencourty/StockManagement.git
```

### 2. Navigate to the project

```bash
cd StockManagement
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Adjust the API URL according to your backend environment.

### 5. Run the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 📱 Responsive Design

The application was designed to work across different screen sizes, including:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

The dashboard components adapt their layout according to the available screen width.

---

## 🔮 Roadmap

Future improvements planned for the project:

* [ ] Connect the AI Assistant to the backend
* [ ] Implement real-time financial data
* [ ] Complete product CRUD
* [ ] Complete client CRUD
* [ ] Complete employee CRUD
* [ ] Add advanced financial reports
* [ ] Add charts and analytics
* [ ] Add dark mode
* [ ] Improve mobile navigation
* [ ] Add role-based access control
* [ ] Deploy the application

---

## 🎯 Project Goals

The main goal of this project is to build a realistic management platform while applying modern software engineering practices.

The project also serves as a portfolio application demonstrating experience with:

* Front-end development
* React architecture
* Next.js
* TypeScript
* API integration
* Authentication
* Form validation
* Responsive UI
* Component-based architecture
* Software engineering principles

---

## 👨‍💻 Author

**Gabriel Bitencourt**

Software Engineering student and software developer focused on building modern and scalable applications.

### Connect with me

* 💼 LinkedIn: [Gabriel Bitencourt](https://www.linkedin.com/in/gabriel-bitencourt-931b4b248/)
* 🐙 GitHub: [GabrielBitencourty](https://github.com/GabrielBitencourty)

---

⭐ If you found this project interesting, consider giving it a star!
