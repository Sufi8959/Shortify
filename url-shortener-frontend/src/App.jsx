import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPage from "./components/AboutPage";
import ShortenUrlPage from "./components/ShortenUrlPage";
import ErrorPage from "./components/ErrorPage";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterPage from "./components/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./components/LoginPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toaster position="bottoom-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/s/:url" element={<ShortenUrlPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
