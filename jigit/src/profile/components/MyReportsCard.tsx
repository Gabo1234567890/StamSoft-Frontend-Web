import CardHeader from "./CardHeader.tsx";
import Report from "../../components/Report.tsx";
import PlusButton from "../../components/PlusButton.tsx";
import { useState } from "react";
import { useNavigate } from "react-router";
import { deleteReportByID } from "../../services/reports.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import DeleteButton from "../../components/DeleteButton.tsx";

const MyReportsCard = ({ reports }: { reports: Report[] }) => {
  const [expanded, setExpanded] = useState(false);
  const empty = reports.length === 0;
  const toggleSection = () => setExpanded(!expanded);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleDeleteReport = async (report: Report) => {
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
    <div className="profile-cards-container">
      <CardHeader title="My Reports">
        {empty ? (
          <PlusButton
            title="Create Report"
            onClick={() => navigate("/create-report")}
          />
        ) : (
          <button onClick={toggleSection} className="cursor-pointer">
            <img
              src="/BackArrow.svg"
              alt="Arrow"
              className={`transition-transform duration-100 ${
                expanded ? "rotate-270" : "rotate-180"
              }`}
            />
          </button>
        )}
      </CardHeader>
      <div className="flex flex-col gap-7">
        {empty && (
          <div className="flex flex-col gap-2 py-4 items-center">
            <img src="/SmallGreyLogo.svg" alt="Camera" />
            <p className="font-secondary text-body1 text-base-40">
              No reports available
            </p>
          </div>
        )}
        {expanded &&
          reports.map((report) => (
            <div className="shadow-none relative" key={report.id}>
              <Report report={report} shared={false} />
              <div className="absolute bottom-7 left-2/5">
                <DeleteButton handleDelete={() => handleDeleteReport(report)} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyReportsCard;
