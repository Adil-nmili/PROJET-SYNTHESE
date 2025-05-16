import { useNavigate } from "react-router-dom";
import { REGISTERSTORE, ALLPRODUCTS } from "@/router/Router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useClientContext } from '../../../api/context/ClientContext'; // adjust import as needed

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, setClient, setAuthenticated, authenticated } = useClientContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      authenticated ? navigate(ALLPRODUCTS) : '';
    }, [authenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    
      const response = await login(formData); // call context login
      if (response.status !== 200) {
        setError(response.data.message);
        return;
      }
      const clientData = response.data.user; // adjust according to backend
      setClient(clientData);
      setAuthenticated(true);
      localStorage.setItem("token", response.data.token); // optional if needed

      toast.success(response.data.message);
      setTimeout(() => {
        navigate(ALLPRODUCTS);
      }, 2000);
      setLoading(false);
  };

  return (
    <div className="h-full py-20 w-full flex items-center justify-center">
      <div className="w-2/3 h-4/5 flex flex-col gap-5">
        <div className="w-full h-full">
          <h2 className="text-2xl text-center">Log in to Exclusive</h2>
          <p className="text-md text-gray-700 text-center capitalize my-2">
            Enter your details below
          </p>
        </div>
        <div className="h-full w-full flex gap-3 relative border-gray-600 rounded-lg overflow-hidden shadow-md shadow-black">
          <img
            src="/images/Logo.jpeg"
            alt="Login"
            className="h-full w-1/2 object-cover"
          />

          <form
            onSubmit={handleLogin}
            className="border absolute top-0 right-0 p-4 flex w-1/2 h-full flex-col justify-between gap-4"
          >
            <div className="flex-1 flex flex-col justify-center gap-4">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              {error && (
                <p className="text-xs text-red-400 italic underline">{error}</p>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </div>
            <div>
              <p>
                Don’t have an account?{" "}
                <Button variant="link" onClick={() => navigate(REGISTERSTORE)}>
                  Sign up
                </Button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
