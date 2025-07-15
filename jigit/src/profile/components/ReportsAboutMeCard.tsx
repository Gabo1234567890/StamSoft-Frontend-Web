import { useState } from "react";
import Report from "../../components/Report.tsx";
import CardHeader from "./CardHeader";
import LicensePlate from "../../components/LicensePlate";
import { useAuth } from "../../context/AuthContext.tsx";

const ReportsAboutMe = ({ reports }: { reports: Report[] }) => {
  const [expanded, setExpanded] = useState(false);
  const empty = reports.length === 0;
  const toggleSection = () => setExpanded(!expanded);
  const { user } = useAuth();

  return (
    <div className="profile-cards-container">
      <CardHeader title="Reports About Me">
        {!empty && (
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
      {empty && (
        <div className="flex flex-col gap-2 py-4 items-center">
          <img src="/GreyParty.svg" alt="Party" />
          <p className="font-secondary text-body1 text-base-40">
            Gold star driver! Not a single report.
          </p>
        </div>
      )}
      {expanded && (
        <>
          <div className="flex gap-4 py-4">
            <img src="/NotSelectedCarIcon.svg" alt="Car" />
            <div className="grid grid-cols-6 grid-rows-1 gap-4 w-full">
              {user &&
                user.cars &&
                user.cars.length !== 0 &&
                user.cars.map((car) => (
                  <button className="cursor-pointer h-fit hover:bg-primary2 hover:text-base-0 rounded-md">
                    <LicensePlate
                      licensePlate={car.licensePlate}
                      key={car.id}
                    />
                  </button>
                ))}
              <button className="default-filled-button text-body1 h-13 rounded-lg">
                All
              </button>
            </div>
          </div>

          <>
            {reports.map((report) => (
              <div key={report.id}>
                <Report report={report} shared={false} />
              </div>
            ))}
          </>
        </>
      )}
    </div>
  );
};

export default ReportsAboutMe;
