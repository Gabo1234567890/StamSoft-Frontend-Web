import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import AuthGuard from "./guards/AuthGuard";
import SignupPage from "./signup/SignupPage";
import LogoutButton from "./components/LogoutButton";
import ResetPasswordPage from "./login/ResetPasswordPage";
import ProfilePage from "./profile/ProfilePage";
import HomePage from "./home/HomePage";
import CreateReportPage from "./create_report/CreateReportPage";
import SharedReportPage from "./share_report/SharedReportPage";
import AdminGuard from "./guards/AdminGuard";
import AdminPanel from "./admin/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route
            path="/"
            element={
              <>
                <LogoutButton /> <HomePage />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <LogoutButton />
                <ProfilePage />
              </>
            }
          />
          <Route
            path="/create-report"
            element={
              <>
                <LogoutButton />
                <CreateReportPage />
              </>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/report/share/:token" element={<SharedReportPage />} />
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
