import { Link } from "react-router";
import { getRecentReports } from "../services/reports";
import { useEffect, useState } from "react";
import Report from "../components/Report";
import SearchReportsBar from "../components/SearchReportsBar";
import NavBar from "../components/NavBar";

const HomePage = () => {
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRecentReports = async () => {
    try {
      const response = await getRecentReports();
      setRecentReports(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    fetchRecentReports();
  }, []);

  return (
    <>
      <NavBar
        pageTitle="Home Feed"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="main-page-background">
        <Link to={"/profile"}>Profile</Link>
        <Link to={"/create-report"}>Create Report</Link>
        <SearchReportsBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {!searchQuery && (
          <>
            <h2>Feed:</h2>
            {recentReports.map((report) => (
              <Report report={report} key={report.id} hidden={false} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
