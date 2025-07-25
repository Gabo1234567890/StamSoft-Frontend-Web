import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getLicensePlateReports } from "../services/reports";
import { useDebounce } from "react-use";

const SearchReportsBar = ({
  searchQuery,
  setSearchQuery,
  setSearchResult,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSearchResult: Dispatch<SetStateAction<Report[]>>;
}) => {
  const [debounceSearchQuery, setDebounceSearchQuery] = useState("");

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
    <div className="search-bar">
      <input
        className="text-primary1 caret-primary1 w-full"
        placeholder="Search..."
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <img src="/SearchIcon.svg" alt="Search" />
    </div>
  );
};

export default SearchReportsBar;
