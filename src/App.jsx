import "./styles/reset.css";
import About from "./Components/About.jsx";
import Navbar from "./Components/Navbar.jsx";
import image_man from "./assets/boy-picture.jpg";
import image_woman from "./assets/girl-cartoon.jpg";
import Card from "./Components/Card.jsx";
import Wrapper from "./Components/Wrapper.jsx";
import { useState } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const profiles = [
    { img: image_man, name: "John Doe", title: "Software Engineer", email: "a@a.com" },
    { img: image_woman, name: "Lily Smith", title: "UX Designer", email: "b@b.com" },
    { img: image_man, name: "Jason Lee", title: "Web Developer", email: "e@a.com" },
    { img: image_man, name: "Eva Lee", title: "Graphic Designer", email: "f@a.com" },
  ];

  const filteredProfiles = profiles.filter((profile) =>
    (profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm === "") &&
    (profile.title === selectedRole || selectedRole === "")
  );

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedRole("");
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="center-content">
        <h1 className="main-title">Profile App</h1>

        {/* Search and Filter Section */}
        <div className="filter-container">
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All Roles</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="UX Designer">UX Designer</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Graphic Designer">Graphic Designer</option>
          </select>

          <button onClick={resetFilters} className="reset-btn">
            Reset
          </button>
        </div>

        {/* About Section */}
        <div className="about-container">
          <h2>About</h2>
          <p className="about-text">This is a simple profile app that allows users to filter and search profiles easily.</p>
        </div>

        {/* Profiles */}
        <Wrapper>
          <div className="profile-container">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <Card key={profile.email} {...profile} />
              ))
            ) : (
              <p>No profiles found</p>
            )}
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default App;
