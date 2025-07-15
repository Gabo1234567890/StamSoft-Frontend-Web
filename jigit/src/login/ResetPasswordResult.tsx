import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import background from "../assets/AuthBackground.jpg";
import success from "../assets/Success.jpg";
import fail from "../assets/Fail.jpg";

const ResetPasswordResult = () => {
  const [resetPasswordState, setResetPasswordState] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = params.get("state");
    if (!s) {
      alert("No state provided");
      navigate("/login");
    } else {
      setResetPasswordState(s);
    }
  }, [location.search]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-form max-w-md min-w-[412px] w-1/4">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-8 items-center text-center">
            {resetPasswordState == "success" ? (
              <>
                <img alt="Success" src={success} />
                <div className="flex flex-col gap-4">
                  <p className="text-heading2 text-functional-success font-primary">
                    Password Changed!
                  </p>
                  <p className="text-body1 text-functional-success font-secondary">
                    Your password has been changed successfully
                  </p>
                </div>
              </>
            ) : resetPasswordState == "fail" ? (
              <>
                <img alt="Fail" src={fail} />
                <div className="flex flex-col gap-4">
                  <p className="text-heading2 text-functional-error font-primary">
                    Password Change Unsuccessful!
                  </p>
                  <p className="text-body1 text-functional-error font-secondary">
                    There was an error while trying to change your password
                  </p>
                </div>
              </>
            ) : (
              <h1>Invalid state</h1>
            )}
          </div>
          <button
            className="default-filled-button"
            onClick={() => navigate("/login")}
          >
            Back to Jigit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordResult;
