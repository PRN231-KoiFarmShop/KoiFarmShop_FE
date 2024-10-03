import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer/Footer";
import AboutUs from "./components/MainPages/AboutUs";
import Contact from "./components/MainPages/Contact";
import Policy from "./components/MainPages/Policy";
import Home from "./components/MainPages/Home";

const App = () => {
  const [loginPopup, setLoginPopup] = React.useState(false);

  const handleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar handleLoginPopup={handleLoginPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;