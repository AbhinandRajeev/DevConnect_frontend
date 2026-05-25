# DevConnect - Client (Frontend) 💻

> **Looking for the Server/API codebase?**  
> 🔗 **[Click here to view the Backend Repository](https://github.com/AbhinandRajeev/DevConnect_backend)** 

---

## 🚀 Overview
This repository contains the complete frontend client for **DevConnect**—a premium, highly responsive marketplace and professional network built for developers to showcase their creative projects, monetize source codes, and apply for tech careers.

Designed with a sleek, modern visual aesthetic, the user interface features smooth glassmorphism, dynamic animations, multi-step onboarding, and intuitive layouts tailored for both developers and hiring companies.

---

## 🎨 Frontend Key Features
* **Developer Marketplace**: Discover ready-made software and premium templates with real-time price tags, built-in search filters, and an interactive payment completion screen.
* **Interactive Project Showcases**: Beautiful project cards and dedicated detail pages supporting carousel image previews, video demonstrations, technology tags, and direct repository links.
* **Engagement Interfaces**: Interactive systems to submit likes, toggle feedback, and participate in project comments.
* **Career Board & Application Forms**: Sleek interface for developers to search through company listings and submit comprehensive job applications containing structured qualifications, cover letters, and resume PDF attachments.
* **Unified Profile Customization**: Seamless multi-step profile builder allowing developers to upload custom profiles, link social bios (GitHub, LinkedIn, Portfolio), and list active skills.
* **Stripe Gateway Elements**: Direct Integration with Stripe Checkout for seamless, secure product purchases.
* **Google OAuth & JWT Auth**: Smooth login and registration workflows using dual custom JWT credentials and passwordless Google Authentication.

---

## 🛠 Technology Stack
* **Core Framework**: React 19
* **Build Tool & Bundler**: Vite (Fast HMR & build optimization)
* **Styling**: Tailwind CSS v4
* **UI Components**: Flowbite React & Material UI (MUI) Icons
* **Routing**: React Router Dom v7 (Single Page Application routing)
* **API Client**: Axios (pre-configured server request layer)
* **Toasts & Feedback**: React Toastify

---

## ⚙️ Getting Started

### 📋 Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed locally (v18.0.0 or higher is recommended).

---

### 💻 Installation

1. **Clone this repository** (or download the source code):
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_FRONTEND_REPO_NAME.git
   cd dc_frontend
   ```

2. **Install dependecies**:
   ```bash
   npm install
   ```

3. **Configure the Server URL**:  
   Open [serverURL.js](file:///c:/Users/abhin/Documents/luminar/10_REACT/Task/Main%20Project/DevConnect/dc_frontend/src/services/serverURL.js) in your codebase and verify that it matches your local or deployed backend URL:
   ```javascript
   // For local development:
   export const serverURL = "http://localhost:3000"

   // For production deployment:
   // export const serverURL = "https://your-deployed-backend-api.onrender.com"
   ```

4. **Launch the Development Server**:
   ```bash
   npm run dev
   ```
   This will start the local Vite development server (typically on `http://localhost:5173`) and automatically open the application in your default web browser.

---

## 📂 Code Structure Highlights
* `/src/components`: Reusable layout layouts (Preloaders, Footers, Navbars, Project Cards).
* `/src/user`: Developer-centric interface views (Home, Marketplace, User Profile, Project Details, Checkout Status).
* `/src/company`: Corporate hiring dashboards and Job posting portals.
* `/src/services`: Centralized Axios API request definitions (`allAPIs.js` & `commonAPI.js`).

---
*Developed with visual excellence and designed to optimize the developer side-project economy.*
