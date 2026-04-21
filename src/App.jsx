import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicLayout from "./Layout/PublicLayout";
import DashboardLayout from "./Layout/DashboardLayout";

import LandingPage from "./Pages/Landing";
import Features from "./Pages/feature";
import Pricing from "./Pages/pricing";
import RegisterChama from "./Pages/register";
import JoinChama from "./Pages/JoinChama";
import LoginPage from "./Pages/Login";
import ForgotPassword from "./Pages/forgotpassword";
import ResetPassword from "./Pages/Resetpassword";

import ChairpersonDashboard from "./Pages/Dashboard/ChairpersonDashboard";
import MemberDashboard from "./Pages/Dashboard/MemberDashboard";
import Contributions from "./Pages/Dashboard/myContribution";
import MyLoan from "./Pages/Dashboard/Myloan"

import ProtectedRoute from "./component/ProtectedRoutes";
import MemberLoanPage from "./Pages/Dashboard/Myloan";
import NotificationsPage from "./Pages/Dashboard/NotificationPage";
import MemberSettingsPage from "./Pages/Dashboard/SettingPage";
import MemberHistoryPage from "./Pages/Dashboard/MemberHisto";
import MemberVotingPage from "./Pages/Dashboard/Membervoting";
import MemberReportsPage from "./Pages/Dashboard/MemberReport";

export default function App() {
  return (
    <>
      <Routes>
        {/* 🌍 Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<Features />} />

          <Route path="/subscription" element={<Pricing />} />
          <Route path="/create" element={<RegisterChama />} />
          <Route path="/join/:code" element={<JoinChama />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* 🔐 Dashboard Pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Chairperson only */}
          <Route element={<ProtectedRoute roles={["chairperson"]} />}>
            <Route path="chairperson" element={<ChairpersonDashboard />} />
          </Route>

          {/* Member only */}
          <Route element={<ProtectedRoute roles={["member"]} />}>
            <Route path="member" element={<MemberDashboard />} />
            <Route path="/dashboard/member/mycontributions" element={<Contributions />} />
            <Route path="/dashboard/member/myloan" element={<MemberLoanPage/>}/>
            <Route path="/dashboard/member/notification" element={<NotificationsPage/>}/>
            <Route path="/dashboard/member/setting" element={<MemberSettingsPage/>}/>
            <Route path="/dashboard/member/history" element={<MemberHistoryPage/>}/>
            <Route path="/dashboard/member/voting" element={<MemberVotingPage/>}/>
            <Route path="/dashboard/member/reports" element={<MemberReportsPage/>}/>
          </Route>
        </Route>

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-center" />
    </>
  );
}
