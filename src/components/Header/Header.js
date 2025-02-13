"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Github, Mail, Linkedin } from "lucide-react"
import "./HeaderStyles.css"

const LanguageText = ({ children, lang }) => {
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("language") || "nl")

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(localStorage.getItem("language") || "en")
    }
    window.addEventListener("language-changed", handleLanguageChange)
    return () => {
      window.removeEventListener("language-changed", handleLanguageChange)
    }
  }, [])

  return currentLanguage === lang ? <>{children}</> : null
}

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAboutPage = location.pathname === "/about"
  const isProjectsPage = location.pathname === "/projects"
  const [isHovered, setIsHovered] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("language") || "nl")

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(localStorage.getItem("language") || "nl")
    }
    window.addEventListener("language-changed", handleLanguageChange)
    return () => {
      window.removeEventListener("language-changed", handleLanguageChange)
    }
  }, [])

  const setLanguage = (lang) => {
    if (currentLanguage === lang) return
    localStorage.setItem("language", lang)
    setCurrentLanguage(lang)
    window.dispatchEvent(new CustomEvent("language-changed"))
  }

  return (
    <header className="header">
        <nav className="nav">
            <button 
                className={`nav-button ${isProjectsPage ? "active" : ""}`} 
                onClick={() => navigate("/projects")}
            >
                Projects
            </button>

            <div className="profile-container" onClick={() => navigate("/about")}>
                <img src="/images/1.jpg" alt="Profile" className="profile-image" />
            </div>

            <button 
                className={`nav-button ${isAboutPage ? "active" : ""}`} 
                onClick={() => navigate("/about")}
            >
                About
            </button>
        </nav>

      <div className="language-switcher">
        <div
          className="language-slider"
          style={{ transform: `translateX(${currentLanguage === "nl" ? "100%" : "0"})` }}
        ></div>
        <button className={`flag-button ${currentLanguage === "en" ? "active" : ""}`} onClick={() => setLanguage("en")}>
          <span className="flag flag-en"></span>
          <span>EN</span>
        </button>
        <button className={`flag-button ${currentLanguage === "nl" ? "active" : ""}`} onClick={() => setLanguage("nl")}>
          <span className="flag flag-nl"></span>
          <span>NL</span>
        </button>
        
      </div>

      <div className="name-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <h1 className="name">Sven Groot</h1>
        <p className={`subtitle ${isHovered ? "hidden" : ""}`}>
          <LanguageText lang="nl">Full-Stack Ontwikkelaar</LanguageText>
          <LanguageText lang="en">Full-Stack Developer</LanguageText>
        </p>
        <div className={`icons ${isHovered ? "visible" : ""}`}>
          <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
            <Github className="icon" />
          </a>
          <a href="mailto:youremail@example.com">
            <Mail className="icon" />
          </a>
          <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">
            <Linkedin className="icon" />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header

