import { useEffect, useState } from "react";
import { getMyCarsReports } from "../services/reports";
import Report from "../components/Report";

const ProfilePage = () => {
  const [myReports, setMyReports] = useState<Report[]>([]);

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

  return (
    <>
      {myReports.map((report) => (
        <Report report={report} />
      ))}
    </>
  );
};

export default ProfilePage;
