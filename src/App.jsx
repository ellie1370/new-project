import "./App.css";
import AboutPage from "./pages/AboutPage";
import Navbar from "./Components/Navbar";
import AddProfile from "./pages/AddProfile";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProfileDetail from "./pages/ProfileDetail";
import ProfileEdit from "./pages/ProfileEdit";
import ProfileIndex from "./pages/ProfileIndex";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; 
import { HashRouter, Routes, Route } from "react-router-dom";
import { useMode } from "./contexts /ModeContext"; 
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts /AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Chatbot from "./Components/Chatbox";




const App = () => {

  const { mode } = useMode();
  const LazyComponent = lazy(() => import("./pages/ProfileDetail"));
  return (
    <AuthProvider>
      <HashRouter>
        <header>
          <Navbar />
        </header>
        <main className={mode === "light" ? "light" : "dark"}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/add-profile" element={
              <ProtectedRoute>
                <AddProfile />
              </ProtectedRoute>
              } />
            <Route path="/profile/:id" element={<ProfileIndex />}>
              <Route index element={<Suspense fallback = {<div>Loading...</div>}><LazyComponent /></Suspense>} />
              <Route path="edit" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />

        </main>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;



