import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Github, Mail, Linkedin } from "lucide-react";
import "./HeaderStyles.css";

const LanguageText = ({ children, lang }) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "nl"
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("language-changed", handleLanguageChange);
    return () => {
      window.removeEventListener("language-changed", handleLanguageChange);
    };
  }, []);

  return currentLanguage === lang ? <>{children}</> : null;
};

const Header = ({ isFullScreen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  const isProjectsPage = location.pathname === "/projects";
  const [isHovered, setIsHovered] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "nl"
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(localStorage.getItem("language") || "nl");
    };
    window.addEventListener("language-changed", handleLanguageChange);
    return () => {
      window.removeEventListener("language-changed", handleLanguageChange);
    };
  }, []);

  const setLanguage = (lang) => {
    if (currentLanguage === lang) return;
    localStorage.setItem("language", lang);
    setCurrentLanguage(lang);
    window.dispatchEvent(new CustomEvent("language-changed"));
  };

  return (
    <header className={`header ${isFullScreen ? 'fullscreen' : ''}`}>
      <div
        className="profile-section"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="profile-container" onClick={() => navigate("/about")}>
          <img src="/images/ProfilePic.jpg" alt="Profile" className="profile-image" />
        </div>
        <div className="name-container">
          <h1 className="name" >Sven Groot</h1>
          <p className={`subtitle ${isHovered ? "hidden" : ""}`}>
            <LanguageText lang="nl">Full-Stack Ontwikkelaar</LanguageText>
            <LanguageText lang="en">Full-Stack Developer</LanguageText>
          </p>
          <div className={`icons ${isHovered ? "visible" : ""}`}>
            <a
              href="https://github.com/svendev7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="icon" />
            </a>
            <a href="mailto:svengroot88@gmail.com">
              <Mail className="icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/sven-groot-85b7582bb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="icon" />
            </a>
          </div>
        </div>
      </div>

      <nav className="nav">
        <button
          className={`nav-button ${isProjectsPage ? "active" : ""}`}
          onClick={() => navigate("/projects")}
        >
          <LanguageText lang="nl">Projecten</LanguageText>
          <LanguageText lang="en">Projects</LanguageText>
        </button>

        <div className="vertical-line"></div>

        <button
          className={`nav-button ${isAboutPage ? "active" : ""}`}
          onClick={() => navigate("/about")}
        >
          <LanguageText lang="nl">Over</LanguageText>
          <LanguageText lang="en">About</LanguageText>
        </button>
      </nav>

      <div className="language-switcher">
        <div
          className="language-slider"
          style={{ transform: `translateX(${currentLanguage === "nl" ? "100%" : "0"})` }}
        ></div>
        <button
          className={`flag-button ${currentLanguage === "en" ? "active" : ""}`}
          onClick={() => setLanguage("en")}
        >
          <span className="flag flag-en"></span>
          <span>EN</span>
        </button>
        <button
          className={`flag-button ${currentLanguage === "nl" ? "active" : ""}`}
          onClick={() => setLanguage("nl")}
        >
          <span className="flag flag-nl"></span>
          <span>NL</span>
        </button>
      </div>
    </header>
  );
};



export default Header;
