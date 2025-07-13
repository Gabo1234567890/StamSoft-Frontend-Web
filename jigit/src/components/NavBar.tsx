import type { Dispatch, SetStateAction } from "react";
import SearchReportsBar from "./SearchReportsBar";
import { useNavigate } from "react-router";

const NavBar = ({
  searchQuery,
  setSearchQuery,
  setSearchResult,
  pageTitle,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSearchResult: Dispatch<SetStateAction<Report[]>>;
  pageTitle: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="nav-bar-container">
      <img src="/LoginLogo.svg" alt="Logo" />

      <div className="flex items-center justify-between w-1/2 mr-60">
        <SearchReportsBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchResult={setSearchResult}
        />
        <p className="text-heading2 text-primary1 font-primary">{pageTitle}</p>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex gap-7 items-center justify-end pt-0.5">
          <button onClick={() => navigate("/")} className="cursor-pointer">
            <div className="flex flex-col gap-1 items-center">
              <img
                src={
                  pageTitle == "Home Feed"
                    ? "/FocusedHome.svg"
                    : "/DefaultHome.svg"
                }
                alt="Home"
              />
              <p
                className={`text-paragraph-medium2 font-secondary ${
                  pageTitle == "Home Feed" ? "text-primary1" : "text-secondary2"
                }`}
              >
                Home
              </p>
            </div>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="cursor-pointer"
          >
            <div className="flex flex-col gap-1 items-center">
              <img
                src={
                  pageTitle == "Profile Page"
                    ? "/FocusedProfile.svg"
                    : "/DefaultProfile.svg"
                }
                alt="Profile"
              />
              <p
                className={`text-paragraph-medium2 font-secondary ${
                  pageTitle == "Profile Page"
                    ? "text-primary1"
                    : "text-secondary2"
                }`}
              >
                Profile
              </p>
            </div>
          </button>
        </div>

        <div className="flex gap-6 justify-end">
          <button
            onClick={() => navigate("/create-report")}
            className="default-filled-button max-h-[52px] gap-2 px-3 bg-secondary2"
          >
            <img src="/EmptyPlusIcon.svg" alt="Plus" />
            <p>New Report</p>
          </button>
          <div className="border-l border-base-60 px-5 justify-center">
            <button onClick={() => {}} className="cursor-pointer h-full">
              <img src="/DefaultNotificationRead.svg" alt="Notification" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
