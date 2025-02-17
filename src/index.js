import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Intro from "./pages/intro/intro";
import { LanguageProvider } from "./LanguageContext";
const App = () => {
    return (
        <LanguageProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/about" element={<Main />} />
                <Route path="/projects" element={<Main />} />
            </Routes>
        </BrowserRouter>
        </LanguageProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
