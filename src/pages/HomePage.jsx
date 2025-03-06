import Card from "../Components/Card";
import Wrapper from "../Components/Wrapper";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  // Fetch titles when page loads
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~park1843/new-project/get-titles.php")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setTitles(data.titles || []))
      .catch((err) => {
        console.error("Error fetching titles:", err);
        setError("Failed to load titles. Please try again later.");
      });
  }, []);

  // Fetch profiles whenever filter or page changes
  useEffect(() => {
    fetch(
      `https://web.ics.purdue.edu/~park1843/new-project/fetch-data-with-filter.php?title=${encodeURIComponent(title)}&name=${encodeURIComponent(search)}&page=${page}&limit=10`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProfiles(data.profiles || []);
        setCount(data.count || 0);
        setPage(data.page || 1);
      })
      .catch((err) => {
        console.error("Error fetching profiles:", err);
        setError("Failed to load profiles. Please try again later.");
      });
  }, [title, search, page]);

  // Clear filters
  const handleReset = () => {
    setTitle("");
    setSearch("");
    setPage(1);
  };

  return (
    <Wrapper>
      <h1>Profile App</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <div>
          <label htmlFor="title-select">Select a title:</label>
          <select
            id="title-select"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            <option value="">All</option>
            {titles.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search">Search by name:</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button onClick={handleReset}>Reset</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div
              key={profile.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <Link
                to={`/profile/${profile.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card {...profile} />
              </Link>
            </div>
          ))
        ) : (
          <p>No profiles found!</p>
        )}
      </div>

      {count > 10 && (
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
            {page}/{Math.ceil(count / 10)}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(count / 10)}
          >
            Next
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default HomePage;
