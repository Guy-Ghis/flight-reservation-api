# Flight Reservation Frontend

A modern, accessible, and responsive flight reservation web app built with **React** and **Vite**. This frontend connects to a Spring Boot backend and provides a beautiful, user-friendly interface for booking and managing flight tickets.

![Screenshot](screenshot.png) <!-- Add a screenshot if you have one -->

## ✈️ Features

- View all tickets in a responsive grid
- Create new tickets with a simple, accessible form
- Search tickets by destination, kickoff, and date
- Delete tickets with confirmation
- Modern, visually appealing design with a plane background
- Fully responsive for desktop, tablet, and mobile
- Accessible: keyboard navigation, visible focus, color contrast

## 🚀 Technologies Used

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- Custom CSS (no framework)
- Fetch API for backend integration
- [Spring Boot backend](../) (Java, not included in this folder)

## 🔗 Backend API

- The frontend expects the backend API to be available at:  
  `http://10.153.115.208:30080/api/tickets`
- Make sure your backend is running and accessible from your frontend environment.

## 🖼️ Custom Background

- The app uses a beautiful plane image as the background:
  [passenger-aircraft-4s5hcabba55c0fme.jpg](https://wallpapers.com/images/hd/passenger-aircraft-4s5hcabba55c0fme.jpg)
- You can change the background image by editing the `background` property in `src/App.css`.

## 🛠️ Setup & Usage

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173)

3. **Build for production**

   ```bash
   npm run build
   ```

## 📱 Responsive & Accessible

- The UI adapts to all screen sizes
- All forms and buttons are accessible by keyboard
- Sufficient color contrast and visible focus indicators

## 📂 Project Structure

```plaintext
frontend/
  src/
    App.jsx        # Main React component
    App.css        # Custom styles (edit background here)
    index.jsx      # Entry point
    ...
```

## 📝 License

This project is for educational/demo purposes. Replace or extend as needed for your use case.
