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
    <>
      <h2>Shared Report</h2>
      <Report report={report} hidden={true} />
    </>
  );
};

export default SharedReportPage;
