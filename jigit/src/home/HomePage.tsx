import { getRecentReports } from "../services/reports";
import { useEffect, useState } from "react";
import Report from "../components/Report";
import NavBar from "../components/NavBar";

const HomePage = () => {
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Report[]>([]);

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
        setSearchResult={setSearchResult}
      />
      <div className="main-page-background">
        <div className="feed-container">
          {searchQuery ? (
            searchResult.length == 0 ? (
              <p className="text-heading1 text-center text-base-90 pt-60 font-primary">
                No Results.
              </p>
            ) : (
              <>
                {searchResult.map((report) => (
                  <Report report={report} key={report.id} shared={false} />
                ))}
              </>
            )
          ) : (
            <>
              {recentReports.map((report) => (
                <Report report={report} key={report.id} shared={false} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
