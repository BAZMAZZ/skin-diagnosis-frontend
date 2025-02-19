import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const skinType = queryParams.get("skin_type");
  const [recommendations, setRecommendations] = useState([]);
  const [userAge, setUserAge] = useState(null);
  const [skinAge, setSkinAge] = useState(null);

  // Get User's Age from Local Storage
  useEffect(() => {
    const storedAge = localStorage.getItem("userAge");
    if (storedAge) {
      const parsedAge = parseInt(storedAge, 10);
      setUserAge(parsedAge);

      // Deduct 1 to 4 years randomly to create skin age
      const deductedYears = Math.floor(Math.random() * 4) + 1;
      setSkinAge(parsedAge - deductedYears);
    }
  }, []);

  // Fetch product recommendations
  useEffect(() => {
    if (skinType) {
      axios
        .get(`https://skin-diagnosis-app-1.onrender.com/api/recommendations?skin_type=${skinType}`)
        .then((response) => {
          setRecommendations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        });
    }
  }, [skinType]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white px-6 py-10"
      style={{ backgroundImage: "url('/assets/background.jpg')" }}
    >
      {/* Skin Type Box */}
      <div className="bg-blue-500 text-white font-semibold text-center p-4 md:p-6 rounded-lg w-5/6 md:w-3/4 lg:w-1/2 shadow-lg">
        <h2 className="text-lg md:text-2xl lg:text-3xl leading-tight">
          Votre type de peau : <span className="font-bold">{skinType}</span>
        </h2>
      </div>

      {/* Spacer */}
      <div className="h-6"></div>

      {/* Skin Age Box */}
      {skinAge && (
        <div className="bg-blue-500 text-white font-semibold text-center p-4 md:p-6 rounded-lg w-5/6 md:w-3/4 lg:w-1/2 shadow-lg">
          <h2 className="text-lg md:text-2xl lg:text-3xl leading-tight">
            Votre âge de peau : <span className="font-bold">{skinAge} ans</span>
          </h2>
        </div>
      )}

      {/* Spacer */}
      <div className="h-6"></div>

      {/* Recommendations Box */}
      <div className="bg-white text-gray-900 font-semibold text-center p-4 md:p-6 rounded-lg w-5/6 md:w-3/4 lg:w-1/2 shadow-lg">
        <h2 className="text-lg md:text-2xl lg:text-3xl mb-4">Produits Recommandés</h2>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.map((product, index) => (
              <div key={index} className="bg-gray-200 p-3 rounded-lg shadow-lg">
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <p className="mt-2 font-semibold">{product.product_name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">Aucune recommandation trouvée.</p>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => navigate("/email")}
        className="mt-6 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg text-lg md:text-xl"
      >
        Recevoir mes recommandations
      </button>
    </div>
  );
};

export default ResultsPage;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ResultsPage = () => {
//   const navigate = useNavigate();
//   const [recommendations, setRecommendations] = useState([]);
//   const [skinType, setSkinType] = useState("");

//   useEffect(() => {
//     // 🔹 Retrieve skin type from localStorage
//     const storedSkinType = localStorage.getItem("userSkinType");

//     if (!storedSkinType) {
//       alert("No skin type detected. Please retry the diagnosis.");
//       navigate("/diagnosis"); // Redirect if skin type is missing
//       return;
//     }

//     setSkinType(storedSkinType);

//     // 🔹 Fetch recommendations based on detected skin type
//     axios
//       .get(`http://localhost:8000/api/recommendations?skin_type=${storedSkinType}`)
//       .then((response) => setRecommendations(response.data))
//       .catch((error) => console.error("Error fetching recommendations:", error));
//   }, [navigate]);

//   return (
//     <div className="results-container">
//       <h2>Vos recommandations</h2>

//       {/* 🔹 Show detected skin type */}
//       <p><strong>Votre type de peau :</strong> {skinType}</p>

//       {recommendations.length > 0 ? (
//         <ul>
//           {recommendations.map((product, index) => (
//             <li key={index}>
//               <h3>{product.product_name}</h3>
//               <p>{product.brand} - {product.product_type}</p>
//               <img src={product.image_url} alt={product.product_name} width="100" />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Aucune recommandation trouvée.</p>
//       )}

//       <button onClick={() => navigate("/email")}>Suivant</button>
//     </div>
//   );
// };

// export default ResultsPage;
