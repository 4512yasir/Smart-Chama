import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicLayout from "./Layout/PublicLayout";
import DashboardLayout from "./Layout/DashboardLayout";

import LandingPage from "./Pages/Landing";
import AboutPage from "./Pages/about";
import ContactPage from "./Pages/contact";
import RegisterChama from "./Pages/register";
import JoinChama from "./Pages/JoinChama";
import LoginPage from "./Pages/Login";
import ForgotPassword from "./Pages/forgotpassword";
import ResetPassword from "./Pages/Resetpassword";

import ChairpersonDashboard from "./Pages/Dashboard/ChairpersonDashboard";
import MemberDashboard from "./Pages/Dashboard/MemberDashboard";

import ProtectedRoute from "./component/ProtectedRoutes";

// Example: current logged-in user
// You can replace this with actual auth state from context or redux
const user = {
  name: "John Doe",
  role: "chairperson", // "member" or "chairperson"
};

export default function App() {
  return (
    <>
      <Routes>
        {/* 🌍 Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/create" element={<RegisterChama />} />
          <Route path="/join/:code" element={<JoinChama />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* 🔐 Dashboard Pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Chairperson only */}
          <Route element={<ProtectedRoute user={user} roles={["chairperson"]} />}>
            <Route path="chairperson" element={<ChairpersonDashboard />} />
          </Route>

          {/* Member only */}
          <Route element={<ProtectedRoute user={user} roles={["member"]} />}>
            <Route path="member" element={<MemberDashboard />} />
          </Route>
        </Route>

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-center" />
    </>
  );
}
