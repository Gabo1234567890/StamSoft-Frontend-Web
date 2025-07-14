import { useEffect, useState } from "react";
import { deleteReportByID, getMyCarsReports } from "../services/reports";
import Report from "../components/Report";
import { useAuth } from "../context/AuthContext";
import CarsFunctionalDisplay from "../components/CarsFunctionalDisplay";
import EditButton from "../components/EditButton";
import NavBar from "../components/NavBar";
import PersonalInformationCard from "./components/PersonalInformationCard";
import MyCarsCard from "./components/MyCarsCard";

const ProfilePage = () => {
  const [myReports, setMyReports] = useState<Report[]>([]);
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

  if (!user) {
    return <></>;
  }

  return (
    <>
      <NavBar
        pageTitle="Profile Page"
        searchQuery=""
        setSearchQuery={() => {}}
        setSearchResult={() => {}}
      />
      <div className="main-page-background pt-38">
        <PersonalInformationCard user={user} />
        <MyCarsCard cars={user.cars || []} />

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
    </>
  );
};

export default ProfilePage;
