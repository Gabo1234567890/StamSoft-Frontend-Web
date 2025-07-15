import { useEffect, useState } from "react";
import { getMyCarsReports } from "../services/reports";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import PersonalInformationCard from "./components/PersonalInformationCard";
import MyCarsCard from "./components/MyCarsCard";
import ReportsAboutMe from "./components/ReportsAboutMeCard";
import MyReportsCard from "./components/MyReportsCard";

const ProfilePage = () => {
  const [reportsAboutMe, setReportsAboutMe] = useState<Report[]>([]);
  const { user } = useAuth();

  const fetchMyReports = async () => {
    try {
      const reports = await getMyCarsReports();
      setReportsAboutMe(reports);
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
        <MyReportsCard reports={user.reports || []} />
        <ReportsAboutMe reports={reportsAboutMe} />
      </div>
    </>
  );
};

export default ProfilePage;
