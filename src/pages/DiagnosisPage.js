import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DiagnosisPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Handle file selection from gallery
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Open camera for capturing photo
  const openCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user", // Front camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 1, max: 2 }, // Forces still mode over video
        },
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Erreur d'accès à la caméra:", error);
      alert("Impossible d'accéder à la caméra. Veuillez autoriser l'accès.");
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob.size > 2 * 1024 * 1024) {
        alert("L'image doit être inférieure à 2MB. Veuillez réessayer.");
        return;
      }
      const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
      setSelectedFile(file);
    }, "image/jpeg");

    // Stop camera after capturing
    video.srcObject.getTracks().forEach((track) => track.stop());
    setIsCameraOpen(false);
  };

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Veuillez sélectionner ou capturer une image !");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("https://skin-diagnosis-app-1.onrender.com/api/analyze-skin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const detectedSkinType = response.data.skin_type;
      console.log("Detected Skin Type:", detectedSkinType);

      navigate(`/results?skin_type=${detectedSkinType}`);
    } catch (error) {
      console.error("Erreur lors de l'analyse de la peau:", error);
      alert("Échec de l'analyse de la peau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center px-6 text-white"
      style={{ backgroundImage: "url('/assets/background.jpg')" }}
    >
      {/* Title Box */}
      <div className="bg-blue-500 text-white font-semibold text-center p-4 md:p-6 rounded-lg w-5/6 md:w-3/4 lg:w-1/2 shadow-lg">
        <h2 className="text-lg md:text-2xl lg:text-3xl leading-tight">
          Prenez ou téléchargez une photo pour l'analyse de votre peau
        </h2>
      </div>

      {/* Spacer */}
      <div className="h-8"></div>

      {/* Camera Section */}
      {isCameraOpen ? (
        <div className="flex flex-col items-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-sm rounded-lg shadow-md"
          ></video>
          <button
            onClick={capturePhoto}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold"
          >
            Capturer la photo
          </button>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      ) : (
        <button
          onClick={openCamera}
          className="w-5/6 md:w-3/4 lg:w-1/2 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg text-lg md:text-xl mb-4"
        >
          Ouvrir la caméra
        </button>
      )}

      {/* Upload Section */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        capture="user"
        className="block w-5/6 md:w-3/4 lg:w-1/2 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer p-3 mb-4"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className={`${
          selectedFile ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
        } text-white font-semibold py-3 px-6 rounded-lg shadow-lg text-lg md:text-xl`}
        disabled={!selectedFile}
      >
        {loading ? "Analyse en cours..." : "Analyser la peau"}
      </button>
    </div>
  );
};

export default DiagnosisPage;


// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const DiagnosisPage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);

//   // Handle file selection from gallery
//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   // Open camera
//   const openCamera = async () => {
//     setIsCameraOpen(true);
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = stream;
//   };

//   // Capture photo
//   const capturePhoto = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Convert to JPG format
//     canvas.toBlob((blob) => {
//       if (blob.size > 2 * 1024 * 1024) {
//         alert("Image size must be under 2MB. Please retake the photo.");
//         return;
//       }
//       const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
//       setSelectedFile(file);
//     }, "image/jpeg");

//     // Stop camera
//     video.srcObject.getTracks().forEach((track) => track.stop());
//     setIsCameraOpen(false);
//   };

//   // Handle upload
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Veuillez sélectionner ou capturer une image !");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     try {
//       const response = await axios.post("https://skin-diagnosis-app-1.onrender.com/api/analyze-skin", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const detectedSkinType = response.data.skin_type;
//       console.log("Detected Skin Type:", detectedSkinType);

//       navigate(`/results?skin_type=${detectedSkinType}`);
//     } catch (error) {
//       console.error("Erreur lors de l'analyse de la peau:", error);
//       alert("Échec de l'analyse de la peau. Veuillez réessayer.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="flex flex-col items-center justify-center h-screen bg-cover bg-center px-6 text-white"
//       style={{ backgroundImage: "url('/assets/background.jpg')" }}
//     >
//       {/* Title Box */}
//       <div className="bg-blue-500 text-white font-semibold text-center p-4 md:p-6 rounded-lg w-5/6 md:w-3/4 lg:w-1/2 shadow-lg">
//         <h2 className="text-lg md:text-2xl lg:text-3xl leading-tight">
//           Prenez ou téléchargez une photo pour l'analyse de votre peau
//         </h2>
//       </div>

//       {/* Spacer */}
//       <div className="h-8"></div>

//       {/* Camera Section */}
//       {isCameraOpen ? (
//         <div className="flex flex-col items-center">
//           <video ref={videoRef} autoPlay className="w-full max-w-sm rounded-lg shadow-md"></video>
//           <button
//             onClick={capturePhoto}
//             className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold"
//           >
//             Capturer la photo
//           </button>
//           <canvas ref={canvasRef} className="hidden"></canvas>
//         </div>
//       ) : (
//         <button
//           onClick={openCamera}
//           className="w-5/6 md:w-3/4 lg:w-1/2 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg text-lg md:text-xl mb-4"
//         >
//           Ouvrir la caméra
//         </button>
//       )}

//       {/* Upload Section */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         capture="user"
//         className="block w-5/6 md:w-3/4 lg:w-1/2 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer p-3 mb-4"
//       />

//       {/* Upload Button */}
//       <button
//         onClick={handleUpload}
//         className={`${
//           selectedFile ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
//         } text-white font-semibold py-3 px-6 rounded-lg shadow-lg text-lg md:text-xl`}
//         disabled={!selectedFile}
//       >
//         {loading ? "Analyse en cours..." : "Analyser la peau"}
//       </button>
//     </div>
//   );
// };

// export default DiagnosisPage;

// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const DiagnosisPage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);

//   // Handle file selection from gallery
//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   // Open camera
//   const openCamera = async () => {
//     setIsCameraOpen(true);
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = stream;
//   };

//   // Capture photo
//   const capturePhoto = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Convert to JPG format
//     canvas.toBlob((blob) => {
//       if (blob.size > 2 * 1024 * 1024) {
//         alert("Image size must be under 2MB. Please retake the photo.");
//         return;
//       }
//       const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
//       setSelectedFile(file);
//     }, "image/jpeg");

//     // Stop camera
//     video.srcObject.getTracks().forEach(track => track.stop());
//     setIsCameraOpen(false);
//   };

//   // Handle upload
//   // Handle upload
// const handleUpload = async () => {
//   if (!selectedFile) {
//     alert("Please select or capture an image first!");
//     return;
//   }

//   setLoading(true);
//   const formData = new FormData();
//   formData.append("image", selectedFile);

//   try {
//     const response = await axios.post("http://localhost:8000/api/analyze-skin", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     const detectedSkinType = response.data.skin_type;
//     console.log("Detected Skin Type:", detectedSkinType);

//     // 🔹 Store detected skin type in localStorage
//     localStorage.setItem("userSkinType", detectedSkinType);

//     // 🔹 Navigate to results page WITHOUT passing skin type via URL
//     navigate("/results");
//   } catch (error) {
//     console.error("Error analyzing skin:", error);
//     alert("Failed to analyze skin. Try again.");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="diagnosis-container">
//       <h2>Upload or Take a Photo for Skin Analysis</h2>

//       {/* Camera Section */}
//       {isCameraOpen ? (
//         <div>
//           <video ref={videoRef} autoPlay style={{ width: "100%" }}></video>
//           <button onClick={capturePhoto}>Capture Photo</button>
//           <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//         </div>
//       ) : (
//         <button onClick={openCamera}>Open Camera</button>
//       )}

//       {/* Upload Section */}
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? "Analyzing..." : "Analyze Skin"}
//       </button>
//     </div>
//   );
// };

// export default DiagnosisPage;
