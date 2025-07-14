import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Comment from "./Comment";
import { useNavigate } from "react-router";

const CommentsSection = ({ shared }: { shared: boolean }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-7 h-full justify-between">
      <div className="flex flex-col justify-between h-full">
        <p className="text-heading3 font-primary text-secondary2">
          {shared
            ? "Log In to join the discussion!"
            : "Join the discussion bellow!"}
        </p>
        <div className="flex flex-col gap-5">
          <Comment
            user={{ id: 500, email: "ds", password: "" }}
            content="That definitely sounds sketchy. Hopefully the authorities can check it out soon. If you see that car around again doing the same thing, don’t hesitate to call it in right away. Better safe than sorry!"
            date="09/07/2025"
            time="12:48"
          />
          <Comment
            user={{ id: 501, email: "gn", password: "" }}
            content="That definitely sounds sketchy. Hopefully the authorities can check it out soon. If you see that car around again doing the same thing, don’t hesitate to call it in right away. Better safe than sorry!"
            date="09/07/2025"
            time="12:48"
          />
        </div>
      </div>
      <div className="flex gap-4">
        {shared ? (
          <button
            className="default-filled-button w-full"
            onClick={() => navigate("/login")}
          >
            Go to Jigit
          </button>
        ) : (
          <>
            <div className="pt-4.5">
              <p className="font-secondary text-secondary2 text-heading3">
                {user?.email.slice(0, 2).toUpperCase()}
              </p>
            </div>
            <div
              className={`flex rounded-sm border ${
                !comment ? "border-secondary2" : "border-primary1"
              } py-3 px-4 gap-3 items-center w-full`}
            >
              <input
                type="text"
                placeholder="Comment..."
                className="w-full text-paragraph-regular2 font-secondary text-base-100 caret-base-100"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {comment ? (
                <button className="cursor-pointer">
                  <img src="/SendIcon.svg" alt="Send" />
                </button>
              ) : (
                <button className="cursor-not-allowed">
                  <img src="/DisabledSendIcon.svg" alt="Send" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
