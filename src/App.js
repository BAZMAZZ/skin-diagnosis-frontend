import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AgePage from "./pages/AgePage";
import SkinProblemsPage from "./pages/SkinProblemsPage";
import DiagnosisPage from "./pages/DiagnosisPage";
import ResultsPage from "./pages/ResultsPage";
import EmailPage from "./pages/EmailPage";
import ThankYouPage from "./pages/ThankYouPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/age" element={<AgePage />} />
        <Route path="/skin-problems" element={<SkinProblemsPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/email" element={<EmailPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;
