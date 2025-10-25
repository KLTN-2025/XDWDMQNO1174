import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Homepage from "./components/Homepage/Homepage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AboutUs from "./components/AboutUs/AboutUs";
import AccountMN from "./components/AccountMN/AccountMN";
import GameZone from "./components/GameZone/GameZone";
import Newspaper from "./components/Newspaper/Newspaper";
import Contact from "./components/Contact/Contact";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/trangchu" element={<ProtectedRoute><Homepage /></ProtectedRoute>}  />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/AboutUs" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="/AccountMN" element={<ProtectedRoute><AccountMN /></ProtectedRoute>} />
        <Route path="/GameZone" element={<ProtectedRoute><GameZone /></ProtectedRoute>} />
        <Route path="/Newspaper" element={<ProtectedRoute><Newspaper /></ProtectedRoute>} />
        <Route path="/Contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
