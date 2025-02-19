import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const skinProblemsList = [
  "Acné",
  "Taches",
  "Rougeurs",
  "Sécheresse",
  "Brillance",
  "Rides",
];

const SkinProblemsPage = () => {
  const [selectedProblems, setSelectedProblems] = useState([]);
  const navigate = useNavigate();

  const toggleProblem = (problem) => {
    if (selectedProblems.includes(problem)) {
      setSelectedProblems(selectedProblems.filter((item) => item !== problem));
    } else {
      setSelectedProblems([...selectedProblems, problem]);
    }
  };

  const handleNext = () => {
    localStorage.setItem("userSkinProblems", JSON.stringify(selectedProblems));
    navigate("/diagnosis");
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center px-6"
      style={{ backgroundImage: "url('/assets/background.jpg')" }}
    >
      {/* Question Box */}
      <div className="bg-blue-500 text-white font-semibold text-center p-4 md:p-6 rounded-lg w-5/6 md:w-3/4 lg:w-1/2 shadow-lg">
        <h2 className="text-lg md:text-2xl lg:text-3xl leading-tight">
          Avez-vous des problèmes de peau ?
        </h2>
      </div>

      {/* Spacer */}
      <div className="h-8"></div>

      {/* Skin Problems Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-5/6 md:w-3/4 lg:w-1/2">
        {skinProblemsList.map((problem) => (
          <button
            key={problem}
            onClick={() => toggleProblem(problem)}
            className={`p-3 rounded-lg text-lg font-medium text-center transition duration-300 ${
              selectedProblems.includes(problem)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {problem}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="h-12"></div>

      {/* Next Button */}
      <button
        className={`${
          selectedProblems.length > 0 ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
        } text-white font-semibold py-3 px-6 md:px-8 rounded-lg shadow-lg text-lg md:text-xl`}
        onClick={handleNext}
        disabled={selectedProblems.length === 0}
      >
        Suivant
      </button>
    </div>
  );
};

export default SkinProblemsPage;
