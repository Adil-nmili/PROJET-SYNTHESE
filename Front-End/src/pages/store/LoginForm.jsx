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

    try {
      const response = await login(formData);
      
      if (response.status === 200) {
        const clientData = response.data.user;
        setClient(clientData);
        setAuthenticated(true);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        navigate(ALLPRODUCTS);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An error occurred during login");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
        <div className="h-[400px] w-full flex gap-3 relative border-gray-600 rounded-lg overflow-hidden shadow-md shadow-black">
          <img
            src="/asset/drapo-2.jpg"
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
                disabled={loading}
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
                disabled={loading}
              />
              {error && (
                <p className="text-xs text-red-500 italic">{error}</p>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </div>
            <div>
              <p>
                Don't have an account?{" "}
                <Button variant="link" onClick={() => navigate(REGISTERSTORE)} disabled={loading}>
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
