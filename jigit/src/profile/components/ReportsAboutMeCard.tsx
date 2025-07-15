import { useState } from "react";
import Report from "../../components/Report.tsx";
import CardHeader from "./CardHeader";
import LicensePlate from "../../components/LicensePlate";

const ReportsAboutMe = ({
  reports,
  cars,
}: {
  reports: Report[];
  cars: Car[];
}) => {
  const [expanded, setExpanded] = useState(false);
  const empty = reports.length === 0;
  const toggleSection = () => setExpanded(!expanded);

  return (
    <div className="profile-cards-container">
      <CardHeader title="Reports About Me">
        <button onClick={toggleSection} className="cursor-pointer">
          <img
            src="../../public/BackArrow.svg"
            alt="Arrow"
            className={`transition-transform duration-100 ${
              expanded ? "rotate-270" : "rotate-180"
            }`}
          />
        </button>
      </CardHeader>
      {expanded && (
        <>
          <div className="flex gap-4 py-4">
            <img src="../../public/NotSelectedCarIcon.svg" alt="Car" />
            {cars.length !== 0 &&
              cars.map((car) => (
                <LicensePlate licensePlate={car.licensePlate} />
              ))}
            <LicensePlate licensePlate="All" />
          </div>
          {empty && (
            <div className="flex flex-col gap-2 py-4 items-center">
              <img src="../../public/GreyParty.svg" alt="Party" />
              <p className="font-secondary text-body1 text-base-40">
                Gold star driver! Not a single report.
              </p>
            </div>
          )}
          <>
            {reports.map((report) => (
              <div className="shadow-none">
                <Report report={report} shared={true} key={report.id} />
              </div>
            ))}
          </>
        </>
      )}
    </div>
  );
};

export default ReportsAboutMe;
