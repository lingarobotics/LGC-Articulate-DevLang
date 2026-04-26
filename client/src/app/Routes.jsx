// client/src/app/routes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// 🔥 HOME + INFO
import HomePage from "../features/home/HomePage";
import DocsPage from "../features/home/DocsPage";
import ContactPage from "../features/home/ContactPage";
import HowPage from "../features/home/HowPage";
import WhyPage from "../features/home/WhyPage";

// 🔥 MODES
import LearnPage from "../features/learn/LearnPage";
import EvaluatePage from "../features/evaluate/EvaluatePage";
import DoubtPage from "../features/doubt/DoubtPage";
import HistoryPage from "../features/evaluate/HistoryPage"; // 🔥 ADD THIS

// 🔥 AUTH
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import VerifyPage from "../features/auth/VerifyPage";
import ForgotPasswordPage from "../features/auth/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/ResetPasswordPage";

export default function AppRoutes() {
  return (
    <div className="page-container">

      <Routes>

        {/* 🔥 HOME + INFO */}
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/how" element={<HowPage />} />
        <Route path="/why" element={<WhyPage />} />

        {/* 🔥 AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* 🔥 MODES */}
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/evaluate" element={<EvaluatePage />} />
        <Route path="/doubt" element={<DoubtPage />} />
        <Route path="/history" element={<HistoryPage />} /> {/* 🔥 ADD THIS */}

      </Routes>

    </div>
  );
}