import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmailPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!email.includes("@")) {
      alert("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    const userAge = localStorage.getItem("userAge");
    const userSkinProblems = JSON.parse(localStorage.getItem("userSkinProblems"));

    try {
      await axios.post("https://skin-diagnosis-app-1.onrender.com/api/store-user-data", {
        age: userAge,
        skin_problems: userSkinProblems,
        email: email,
      });

      // Navigate to Thank You page after successful submission
      navigate("/thank-you");

    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="email-container flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-lg font-semibold mb-4">Entrez votre e-mail</h2>
      <input
        type="email"
        placeholder="Votre adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2 mb-4 w-80"
      />
      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Terminer
      </button>
    </div>
  );
};

export default EmailPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const EmailPage = () => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleNext = async () => {
//     if (!email.includes("@")) {
//       alert("Veuillez entrer une adresse e-mail valide.");
//       return;
//     }

//     const userAge = localStorage.getItem("userAge");
//     const userSkinProblems = JSON.parse(localStorage.getItem("userSkinProblems"));

//     try {
//       await axios.post("http://localhost:8000/api/store-user-data", {
//         age: userAge,
//         skin_problems: userSkinProblems,
//         email: email,
//       });

//       localStorage.removeItem("userAge");
//       localStorage.removeItem("userSkinProblems");

//       navigate("/thank-you");
//     } catch (error) {
//       console.error("Erreur lors de l'envoi des données:", error);
//     }
//   };

//   return (
//     <div className="email-container">
//       <h2>Entrez votre e-mail</h2>
//       <input
//         type="email"
//         placeholder="Votre adresse e-mail"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={handleNext}>Terminer</button>
//     </div>
//   );
// };

// export default EmailPage;
