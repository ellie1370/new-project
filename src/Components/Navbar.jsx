import styles from "../styles/Navbar.module.css";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "enabled";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.documentElement.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    }, [darkMode]);

    return (
        <nav className={styles.navbar}>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Profiles</a></li>
            </ul>
            <button
                className={styles["toggle-btn"]}
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </nav>
    );
};

export default Navbar;
