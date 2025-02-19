import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AgePage = () => {
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!age) {
      alert("Veuillez entrer votre âge.");
      return;
    }
    localStorage.setItem("userAge", age); // Store in localStorage
    navigate("/skin-problems");
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center px-6"
      style={{ backgroundImage: "url('/assets/background.jpg')" }}
    >
      {/* Question Box */}
      <div className="bg-blue-500 text-white font-semibold text-center p-4 md:p-6 rounded-lg w-5/6 md:w-3/4 lg:w-1/2 shadow-lg">
        <h2 className="text-lg md:text-2xl lg:text-3xl leading-tight">
          Quel âge avez-vous ?
        </h2>
      </div>

      {/* Spacer */}
      <div className="h-12"></div>

      {/* Input Box */}
      <input
        type="number"
        placeholder="Entrez votre âge"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-3/4 md:w-1/2 p-3 rounded-lg border border-gray-300 text-lg text-center"
      />

      {/* Spacer */}
      <div className="h-12"></div>

      {/* Next Button */}
      <button
        className="bg-blue-500 text-white font-semibold py-3 px-6 md:px-8 rounded-lg shadow-lg text-lg md:text-xl"
        onClick={handleNext}
      >
        Suivant
      </button>
    </div>
  );
};

export default AgePage;
