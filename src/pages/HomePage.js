import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center px-6"
      style={{ backgroundImage: "url('/assets/background.jpg')" }}
    >
      {/* Title Box */}
      <div className="bg-blue-500 text-white font-semibold text-center p-4 md:p-6 rounded-lg w-5/6 md:w-3/4 lg:w-1/2 shadow-lg">
        <h1 className="text-lg md:text-2xl lg:text-3xl leading-tight">
          QUELLES PRODUITS DE K-BEAUTY CORRESPONDENT LE MIEUX À VOS BESOINS ?
        </h1>
      </div>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Button Box */}
      <button
        className="bg-blue-500 text-white font-semibold py-3 px-6 md:px-8 rounded-lg shadow-lg text-lg md:text-xl"
        onClick={() => navigate("/age")}
      >
        FAIRE LE TEST
      </button>
    </div>
  );
};

export default HomePage;





// import React from "react";
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative flex items-center justify-center h-screen bg-cover bg-center"
//       style={{ backgroundImage: "url('/assets/background.jpg')" }}>
//       {/* Background Image */}

//       {/* Large Text Blob */}
//       <div className="absolute top-20 left-5 bg-blue-500 text-white text-xl font-serif font-bold p-6 w-4/5 sm:w-2/3 md:w-1/2 rounded-3xl shadow-lg">
//         <p>
//           QUELLES PRODUITS DE K-BEAUTY CORRESPONDENT LE MIEUX À VOS BESOINS ?
//         </p>
//       </div>

//       {/* CTA Blob (Button) */}
//       <button
//         className="absolute bottom-20 left-10 bg-blue-500 text-white font-serif text-lg p-4 px-8 rounded-3xl shadow-md hover:bg-blue-600 transition duration-300"
//         onClick={() => navigate("/age")}>
//         FAIRE LE TEST
//       </button>

//     </div>
//   );
// };

// export default HomePage;




// import React from "react";
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="home-container">
//       <h1>Bienvenue sur l'analyse de peau</h1>
//       <button onClick={() => navigate("/age")}>Commencer le test</button>
//     </div>
//   );
// };

// export default HomePage;
