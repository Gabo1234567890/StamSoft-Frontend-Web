import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getLicensePlateReports } from "../services/reports";
import TextInput from "./TextInput";
import Report from "./Report";
import { useDebounce } from "react-use";

const SearchReportsBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) => {
  const [debounceSearchQuery, setDebounceSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Report[]>([]);

  const handleSearch = async (searchQuery: string) => {
    try {
      const response = await getLicensePlateReports(searchQuery);
      setSearchResult(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    searchQuery ? handleSearch(debounceSearchQuery) : null;
  }, [debounceSearchQuery]);

  useDebounce(() => setDebounceSearchQuery(searchQuery), 500, [searchQuery]);

  return (
    <>
      <TextInput
        placeholder="Search for reports by license plate"
        type="text"
        val={searchQuery}
        onChange={(val) => {
          setSearchQuery(val.toString());
        }}
      />
      {searchQuery &&
        (searchResult.length > 0 ? (
          <ul>
            {searchResult.map((report) => (
              <li key={report.id}>
                <Report report={report} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching results</p>
        ))}
    </>
  );
};

export default SearchReportsBar;
