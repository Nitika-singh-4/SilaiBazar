import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";
import UserDashboard from "./pages/UserDashboard";
import TailorDashboard from "./pages/TailorsDashboard"; // ✅ Import tailor dashboard
import About from "./pages/About";
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 Protected Routes for Users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        

        {/* ✅ Protected Route for Tailors */}
        <Route
          path="/tailor/dashboard"
          element={
            <ProtectedRoute>
              <TailorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
    </Router>
  );
};

export default App;
