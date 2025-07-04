import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./login/LoginPage";
import AuthGuard from "./guards/AuthGuard";
import SignupPage from "./signup/SignupPage";
import LogoutButton from "./components/LogoutButton";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route
            path="/"
            element={
              <>
                <LogoutButton /> <p>Home Page</p>
              </>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
