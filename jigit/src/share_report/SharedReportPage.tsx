import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getReportByToken } from "../services/reports";
import Report from "../components/Report";

const SharedReportPage = () => {
  const { token } = useParams();
  const [report, setReport] = useState<Report | null>();

  const handleFetchReportByToken = async () => {
    try {
      if (token) {
        const response = await getReportByToken(token);
        setReport(response);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    handleFetchReportByToken();
  }, [token]);

  if (!report) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen px-25 flex flex-col justify-center">
      <Report report={report} shared={true} />
    </div>
  );
};

export default SharedReportPage;
