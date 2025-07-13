import { useEffect, useState } from "react";
import { deleteReportByID, getMyCarsReports } from "../services/reports";
import Report from "../components/Report";
import { useAuth } from "../context/AuthContext";
import CarsFunctionalDisplay from "../components/CarsFunctionalDisplay";
import InformationField from "../components/InformationField";
import HiddenTextInput from "../components/HiddenTextInput";
import VisibleTextInput from "../components/VisibleTextInput";

const ProfilePage = () => {
  const [myReports, setMyReports] = useState<Report[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useAuth();

  const fetchMyReports = async () => {
    try {
      const reports = await getMyCarsReports();
      setMyReports(reports);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    fetchMyReports();
  }, []);

  const initials = (email: string) => {
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <div className="main-page-background">
      {/* Personal Information Card */}
      <div className="flex flex-col gap-13 p-10 bg-base-0 rounded-lg shadow-subtle">
        <div className="flex flex-col gap-8">
          {/* Title and buttons */}
          <div className="flex justify-between">
            <p className="font-primary text-heading2 text-secondary2">
              Personal Information
            </p>

            {/* Buttons */}
            <div className="flex gap-8">
              <button className="default-not-filled-button border-functional-error text-functional-error hover:bg-functional-error hover:text-base-0">
                <p className="text-paragraph-medium1">Log Out</p>
              </button>
              <button className="flex default-not-filled-button hover:bg-primary1 hover:text-base-0">
                <p className="text-paragraph-medium1">Edit</p>
                <img src="/PencilIcon.svg" alt="Pencil" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="py-2 px-5 gap-25 flex items-center">
            {/* Initials */}
            <div className="flex items-center justify-center aspect-square h-full w-1/6 bg-primary2 rounded-2xl">
              <p className="font-secondary lg:text-heading0 sm:text-heading3 text-secondary2">
                {initials(user?.email || "")}
              </p>
            </div>
            {/* Fields */}
            <div className="flex justify-between w-full pr-31">
              <div className="flex flex-col gap-7">
                <InformationField
                  title="First Name"
                  value={user?.firstName || "Your Name"}
                  type="text"
                />
                <InformationField
                  title="Last Name"
                  value={user?.lastName || "Your Name"}
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-7">
                <InformationField
                  title="Email"
                  value={user?.email || ""}
                  type="email"
                />
                <InformationField
                  title="Password"
                  value={user?.password || 'Click "Edit" to change'}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>{user?.email}</p>
      <p>{user?.firstName}</p>
      <p>{user?.lastName}</p>

      {user?.cars ? (
        <CarsFunctionalDisplay cars={user.cars} />
      ) : (
        <p>You have no cars</p>
      )}

      {user?.reports?.map((report) => {
        const handleDeleteReport = async () => {
          try {
            await deleteReportByID(report.id);
            setUser((prevUser) => {
              if (!prevUser || !prevUser.reports) return prevUser;
              prevUser.reports.splice(prevUser.reports.indexOf(report), 1);
              return { ...prevUser, reports: [...(prevUser.reports || [])] };
            });
          } catch (error) {
            console.log(error);
            alert(error);
          }
        };
        return (
          <>
            <Report report={report} key={report.id} />
            <button onClick={handleDeleteReport}>Delete report</button>
          </>
        );
      })}

      {myReports.map((report) => (
        <Report report={report} key={report.id} />
      ))}
    </div>
  );
};

export default ProfilePage;
