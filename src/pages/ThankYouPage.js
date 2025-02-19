import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-900">
          🎉 Merci beaucoup ! 🎉
        </h2>
        <p className="text-gray-600 mt-3">
          Vos informations ont été enregistrées. Vous recevrez bientôt des recommandations personnalisées.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;


// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ThankYouPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="thank-you-container">
//       <h2>Merci pour votre participation ! 🎉</h2>
//       <p>Vos résultats et recommandations vous ont été envoyés par e-mail.</p>
//       <button onClick={() => navigate("/")}>Revenir à l'accueil</button>
//     </div>
//   );
// };

// export default ThankYouPage;
