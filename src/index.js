import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Intro from "./pages/intro/intro";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
