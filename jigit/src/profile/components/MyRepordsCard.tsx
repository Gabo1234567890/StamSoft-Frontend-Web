import CardHeader from "./CardHeader";
import Report from "../../components/Report.tsx";
import PlusButton from "../../components/PlusButton.tsx";
import { useState } from "react";

const MyReports = ({ reports }: { reports: Report[] }) => {
  const [expanded, setExpanded] = useState(false);
  const empty = reports.length === 0;
  const toggleSection = () => setExpanded(!expanded);

  return (
    <div className="profile-cards-container">
      <CardHeader title="My Reports">
        {empty ? (
          <PlusButton title="Create Report" />
        ) : (
          <button onClick={toggleSection} className="cursor-pointer">
            <img
              src="../../public/BackArrow.svg"
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
            <img src="../../SmallGreyLogo.svg" alt="Camera" />
            <p className="font-secondary text-body1 text-base-40">
              No reports available
            </p>
          </div>
        )}
        {expanded &&
          reports.map((report) => (
            <div className="shadow-none">
              <Report report={report} shared={true} key={report.id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyReports;
