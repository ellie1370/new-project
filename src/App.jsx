import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/AboutPage";
import AddProfile from "./pages/AddProfile";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Navbar from "./Components/Navbar";

const App = () => {
  const [mode, setMode] = useState("light");

  const handleModeChange = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <HashRouter>
      <header>
        <Navbar mode={mode} updateMode={handleModeChange} />
      </header>
      <main className={mode === "light" ? "light" : "dark"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </HashRouter>
  );
};

export default App;
