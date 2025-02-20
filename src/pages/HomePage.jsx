import Card from "../Components/Card";
import Wrapper from "../Components/Wrapper";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [error, setError] = useState(null);

  // Get titles
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~park1843/new-project/get-titles.php")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setTitles(data.titles))
      .catch((error) => {
        console.error("Error fetching titles:", error);
        setError("Failed to load titles. Please try again later.");
      });
  }, []);

  // Fetch data from the server
  useEffect(() => {
    fetch(
      `https://web.ics.purdue.edu/~park1843/new-project/fetch-data-with-filter.php?title=${encodeURIComponent(title)}&name=${encodeURIComponent(search)}&page=${page}&limit=10`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProfiles(data.profiles);
        setCount(data.count || 0);
        setPage(data.page || 1);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
        setError("Failed to load profiles. Please try again later.");
      });
  }, [title, search, page]);

  return (
    <Wrapper>
      <h1>Profile App</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="filter-wrapper">
        <div className="filter--select">
          <label htmlFor="title-select">Select a title:</label>
          <select id="title-select" onChange={(e) => setTitle(e.target.value)} value={title}>
            <option value="">All</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className="filter--search">
          <label htmlFor="search">Search by name:</label>
          <input
            type="text"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <button onClick={() => { setTitle(""); setSearch(""); setPage(1); }} className="reset-button">
          Reset
        </button>
      </div>
      <div className="profile-cards">
        {profiles.length > 0 ? (
          profiles.map((profile) => <Card key={profile.id} {...profile} />)
        ) : (
          <p>No profiles found!</p>
        )}
      </div>
      {count > 10 && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            &lt; Previous
          </button>
          <span>
            {page}/{Math.ceil(count / 10)}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(count / 10)}
          >
            Next &gt;
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default HomePage;
