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
import MemberLoanPage from "./Pages/Dashboard/Myloan";
import NotificationsPage from "./Pages/Dashboard/NotificationPage";
import MemberSettingsPage from "./Pages/Dashboard/SettingPage";
import MemberHistoryPage from "./Pages/Dashboard/MemberHisto";
import MemberVotingPage from "./Pages/Dashboard/Membervoting";
import MemberReportsPage from "./Pages/Dashboard/MemberReport";
import ChairMembersPage from "./Pages/Dashboard/ChairMemberPage";
import MemberProfilePage from "./Pages/Dashboard/memberprofilepage";
import ChairContribution from "./Pages/Dashboard/ChairContribution";
import ChairVotingPage from "./Pages/Dashboard/ChairVotingPage";
import ChairLoanPage from "./Pages/Dashboard/chairloan";
import ChairActivities from "./Pages/Dashboard/chairactivities";
import ChairReportPage from "./Pages/Dashboard/chairreport";
import ChairSettingsPage from "./Pages/Dashboard/chairsetting"
import ProtectedRoute from "./component/ProtectedRoutes";
import { CiHardDrive } from "react-icons/ci";

export default function App() {
  return (
    <>
      <Routes>

        {/* 🌍 Public */}
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

        {/* 🔐 Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>

          {/* Chairperson */}
          <Route element={<ProtectedRoute roles={["chairperson"]} />}>
            <Route path="chairperson" element={<ChairpersonDashboard />} />
            <Route path="chairperson/members" element={<ChairMembersPage />} />
            <Route path="chairperson/members/:id" element={<MemberProfilePage />} />
            <Route path="chairperson/contributions" element={<ChairContribution />} />
            <Route path="chairperson/loans" element={<ChairLoanPage />} />
            <Route path="chairperson/activities" element={<ChairActivities />} />
            <Route path="chairperson/setting" element={<ChairSettingsPage />} />
            <Route path="chairperson/voting" element={<ChairVotingPage />} />
            <Route path="chairperson/reports" element={<ChairReportPage />} />
          </Route>

          {/* Member */}
          <Route element={<ProtectedRoute roles={["member"]} />}>
            <Route path="member" element={<MemberDashboard />} />
            <Route path="member/mycontributions" element={<Contributions />} />
            <Route path="member/myloan" element={<MemberLoanPage />} />
            <Route path="member/notification" element={<NotificationsPage />} />
            <Route path="member/setting" element={<MemberSettingsPage />} />
            <Route path="member/history" element={<MemberHistoryPage />} />
            <Route path="member/voting" element={<MemberVotingPage />} />
            <Route path="member/reports" element={<MemberReportsPage />} />
          </Route>

        </Route>

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      <Toaster position="top-center" />
    </>
  );
}