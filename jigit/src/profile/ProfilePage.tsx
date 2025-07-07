import { useEffect, useState } from "react";
import { getMyCarsReports } from "../services/reports";
import Report from "../components/Report";
import { useAuth } from "../context/AuthContext";
import CarsFunctionalDisplay from "../components/CarsFunctionalDisplay";

const ProfilePage = () => {
  const [myReports, setMyReports] = useState<Report[]>([]);
  const { user } = useAuth();

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
      <p>{user?.email}</p>
      <p>{user?.firstName}</p>
      <p>{user?.lastName}</p>

      {user?.cars ? (
        <CarsFunctionalDisplay cars={user.cars} />
      ) : (
        <p>You have no cars</p>
      )}

      {user?.reports?.map((report, index) => {
        return <Report report={report} key={index} />;
      })}

      {myReports.map((report, index) => (
        <Report report={report} key={index} />
      ))}
    </>
  );
};

export default ProfilePage;
