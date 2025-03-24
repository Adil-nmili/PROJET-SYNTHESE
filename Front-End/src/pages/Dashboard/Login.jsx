import { useState, useEffect } from "react";
import { useAdminContext } from "../../../api/context/AdminContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "adil@email.com",
    password: "password123"
  });

  const navigate = useNavigate();
  const { login, setAuthenticated,setAdmin, authenticated } = useAdminContext();

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
    return () => clearInterval(interval);
  }, [fullText]);


  if (authenticated === true) {
    navigate('/dashboard');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(user).then((response) => response);
      if (response.status >= 200 && response.status < 300) {
        setAuthenticated(true);
        setAdmin(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
   


  };

  return (
    <div className="flex min-h-screen bg-[#552582] items-center justify-center">
      <div className="flex bg-white shadow-2xl rounded-2xl w-3/4 backdrop-blur-md border border-gray-300 relative overflow-hidden">
        {/* Formulaire */}
        <div className="w-1/2 p-3 text-center relative bg-white bg-opacity-90">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Logo" width={80} height={80} className="animate-bounce" />
          </div>
          
          {/* Titre animé */}
          <h2 className="text-3xl font-extrabold text-gray-800 transition-transform duration-700">
            {welcomeText}
          </h2>
          
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-gray-700 text-left"> Email</label>
              <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
                <span className="text-gray-500 pl-2">✉️</span>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                  className="w-full outline-none pl-2 text-gray-800"
                  placeholder="Entrez votre nom ou email"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-gray-700 text-left">Password</label>
              <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
                <span className="text-gray-500 pl-2">🔑</span>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={e => setUser({ ...user, password: e.target.value })}
                  className="w-full outline-none pl-2 bg-transparent text-gray-800"
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#8861B7] text-white py-2 rounded-lg transition-all duration-300 transform hover:scale-y-125 active:scale-95 shadow-lg"
            >
              Connexion
            </button>
          </form>
          
          <p className="text-center text-gray-600 mt-4">
            Forget Password? <span className="text-blue-600 cursor-pointer hover:underline">Reset</span>
          </p>
        </div>
        <div
          className="w-1/2 h-full bg-cover bg-center flex justify-center items-center">
          <img
            src="/lakersTeams.jpg"
            alt="Lakers Image"
            style={{
              maxHeight: '500px',
              maxWidth: '530px',
              margin: '0'
            }}
            className="w-full h-full max-w-full max-h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
