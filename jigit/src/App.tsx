import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import AuthGuard from "./guards/AuthGuard";
import SignupPage from "./signup/SignupPage";
import ResetPasswordPage from "./login/ResetPasswordPage";
import ProfilePage from "./profile/ProfilePage";
import HomePage from "./home/HomePage";
import CreateReportPage from "./create_report/CreateReportPage";
import SharedReportPage from "./share_report/SharedReportPage";
import AdminGuard from "./guards/AdminGuard";
import AdminPanel from "./admin/AdminPanel";
import TermsAndConditions from "./legal_pages/TermsAndConditions";
import PrivacyPolicy from "./legal_pages/PrivacyPolicy";
import ForgottenPasswordPage from "./login/ForgottenPasswordPage";
import ResetPasswordResult from "./login/ResetPasswordResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-report" element={<CreateReportPage />} />
        </Route>
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgottenPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/reset-password-result"
          element={<ResetPasswordResult />}
        />
        <Route path="/report/share/:token" element={<SharedReportPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
