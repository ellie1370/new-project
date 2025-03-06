import "./App.css";
import AboutPage from "./pages/AboutPage";
import Navbar from "./Components/Navbar"; // Fix path
import AddProfile from "./pages/AddProfile"; // Add this import
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProfileDetail from "./pages/ProfileDetail";
import ProfileEdit from "./pages/ProfileEdit";
import ProfileIndex from "./pages/ProfileIndex";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; 
import { HashRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./contexts /AuthContext.jsx";
import ModeContext from "./contexts /ModeContext.jsx" ;// Fix this import



const App = () => {
    const { mode, handleModeChange } = useContext(ModeContext); // Use both mode and handleModeChange

    return (
        <AuthProvider>
            <HashRouter>
                <header>
                    <Navbar mode={mode} updateMode={handleModeChange} /> {/* Pass props */}
                </header>
                <main className={mode === "light" ? "light" : "dark"}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/add-profile" element={
                            <ProtectedRoute>
                                <AddProfile/>
                            </ProtectedRoute>
                        } />
                        <Route path="/profile/:id" element={<ProfileIndex />}>
                            <Route index element={<ProfileDetail />} />
                            <Route path="edit" element={
                                <ProtectedRoute>
                                    <ProfileEdit />
                                </ProtectedRoute>
                            } />
                        </Route>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </HashRouter>
        </AuthProvider>
    );
};

export default App;
