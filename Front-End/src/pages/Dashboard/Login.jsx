import { useState, useEffect } from "react";
export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    identifier: "", // Peut être un nom ou un email
    password: ""
  });
  const [animate, setAnimate] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");
  const fullText = "Welcome Admin";

  useEffect(() => {
    setAnimate(true);
    let i = 0;
    const interval = setInterval(() => {
      setWelcomeText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 200);
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": " /json",
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la connexion");
      }
  
      // Stocker le token dans le localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
  
      alert("Connexion réussie !");
      window.location.href = "/dashboard"; // Redirection vers la page admin
  
    } catch (error) {
      alert(error.message); // Affichage de l'erreur en cas d'échec
    }
  };
  

  return (
    <div className="flex min-h-screen bg-[#552582] items-center justify-center">
      <div className="flex bg-white shadow-2xl rounded-2xl w-3/4 backdrop-blur-md border border-gray-300 relative overflow-hidden">
        {/* Image Lakers à gauche */}
        {/* <div className=" h-full bg-cover bg-center " style={{ backgroundImage:"url('/lakersTeams.jpg')",backgroundSize: 'cover'}}></div> */}
        
        
        {/* Formulaire */}
        <div className="w-1/2 p-3  text-center relative bg-white bg-opacity-90">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/logo.jpeg" alt="Logo" width={80} height={80} className="animate-bounce" />
          </div>
          
          {/* Titre animé */}
          <h2 className="text-3xl font-extrabold text-gray-800 transition-transform duration-700">
            {welcomeText}
          </h2>
          
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-gray-700 text-left">Nom ou Email</label>
              <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
                <span className="text-gray-500 pl-2">✉️</span>
                <input
                  type="text"
                  name="identifier"
                  value={credentials.identifier}
                  onChange={handleChange}
                  className="w-full outline-none pl-2 bg-transparent"
                  placeholder="Entrez votre nom ou email"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-gray-700 text-left">Mot de passe</label>
              <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
                <span className="text-gray-500 pl-2">🔑</span>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full outline-none pl-2 bg-transparent"
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#8861B7] text-white py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Connexion
            </button>
          </form>
          
          <p className="text-center text-gray-600 mt-4">
            Mot de passe oublié? <span className="text-blue-600 cursor-pointer hover:underline">Réinitialiser</span>
          </p>
        </div>
        <div
          className="w-1/2 h-full bg-cover bg-center  flex justify-center items-center">
          <img
            src="/lakersTeams.jpg"
            alt="Lakers Image"
            style={{
                
                maxHeight:'500px',
                 maxWidth:'500px', margin: 'auto' }}
                className="w-full h-full max-w-full max-h-full object-contain"/>
          
        </div>
      </div>
    </div>
  );
}
// Axios methode
// import { useState, useEffect } from "react";
// import axios from "axios"; // Importez axios

// export default function LoginPage() {
//   const [credentials, setCredentials] = useState({
//     identifier: "", // Peut être un nom ou un email
//     password: ""
//   });
//   const [animate, setAnimate] = useState(false);
//   const [welcomeText, setWelcomeText] = useState("");
//   const fullText = "Welcome Admin";

//   useEffect(() => {
//     setAnimate(true);
//     let i = 0;
//     const interval = setInterval(() => {
//       setWelcomeText(fullText.slice(0, i + 1));
//       i++;
//       if (i === fullText.length) clearInterval(interval);
//     }, 200);
//   }, []);

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/login", credentials, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       // Vérifiez la réponse de l'API
//       if (response.status === 200) {
//         // Stocker le token dans le localStorage
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("admin", JSON.stringify(response.data.admin));

//         alert("Connexion réussie !");
//         window.location.href = "/dashboard"; // Redirection vers la page admin
//       }
//     } catch (error) {
//       if (error.response) {
//         alert(error.response.data.error || "Erreur lors de la connexion");
//       } else {
//         alert("Erreur lors de la requête");
//       }
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#552582] items-center justify-center">
//       <div className="flex bg-white shadow-2xl rounded-2xl w-3/4 backdrop-blur-md border border-gray-300 relative overflow-hidden">
//         {/* Image Lakers à gauche */}
//         {/* <div className=" h-full bg-cover bg-center " style={{ backgroundImage:"url('/lakersTeams.jpg')",backgroundSize: 'cover'}}></div> */}
        
//         {/* Formulaire */}
//         <div className="w-1/2 p-3  text-center relative bg-white bg-opacity-90">
//           {/* Logo */}
//           <div className="flex justify-center mb-6">
//             <img src="/logo.jpeg" alt="Logo" width={80} height={80} className="animate-bounce" />
//           </div>
          
//           {/* Titre animé */}
//           <h2 className="text-3xl font-extrabold text-gray-800 transition-transform duration-700">
//             {welcomeText}
//           </h2>
          
//           <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
//             <div className="relative">
//               <label className="block text-gray-700 text-left">Nom ou Email</label>
//               <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
//                 <span className="text-gray-500 pl-2">✉️</span>
//                 <input
//                   type="text"
//                   name="identifier"
//                   value={credentials.identifier}
//                   onChange={handleChange}
//                   className="w-full outline-none pl-2 bg-transparent"
//                   placeholder="Entrez votre nom ou email"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="relative">
//               <label className="block text-gray-700 text-left">Mot de passe</label>
//               <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
//                 <span className="text-gray-500 pl-2">🔑</span>
//                 <input
//                   type="password"
//                   name="password"
//                   value={credentials.password}
//                   onChange={handleChange}
//                   className="w-full outline-none pl-2 bg-transparent"
//                   placeholder="Entrez votre mot de passe"
//                   required
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-[#8861B7] text-white py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
//             >
//               Connexion
//             </button>
//           </form>
          
//           <p className="text-center text-gray-600 mt-4">
//             Mot de passe oublié? <span className="text-blue-600 cursor-pointer hover:underline">Réinitialiser</span>
//           </p>
//         </div>
//         <div
//           className="w-1/2 h-full bg-cover bg-center  flex justify-center items-center">
//           <img
//             src="/lakersTeams.jpg"
//             alt="Lakers Image"
//             style={{
//                 maxHeight:'500px',
//                 maxWidth:'500px', margin: 'auto' }}
//             className="w-full h-full max-w-full max-h-full object-contain"/>
//         </div>
//       </div>
//     </div>
//   );
// }
