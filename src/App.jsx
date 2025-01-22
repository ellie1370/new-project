import "./App.css";
import "./styles/reset.css";
import About from "./Components/About.jsx";
import Navbar from "./Components/Navbar.jsx";
import Card1 from "./Components/Card1.jsx";
import Card2 from "./Components/Card2.jsx";

const App =() => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className ="section">
          <div className= "container">
            <h1>Profile App</h1>
          </div>
        </div>
        <div className = "section">
          <div className="container">
            <About />
          </div>
          </div>
        <div className ="section">
          <div className ="container">
            <div className ="profile-cards">
              <Card1 />
              <Card2 />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default App;