import { useNavigate } from "react-router-dom";
import ClientApi from "../../../service/Client";
import { LOGINSTORE } from "@/router/Router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (
        formData.password !== formData.password_confirmation || 
        formData.password.length < 8
      ) {
        setLoading(false);
        setError("Incorect password confirmation or password too short");
        return;
      }
     const response =  await ClientApi.addAdmin(formData);
     console.log(response)
      if (response.status !== 201) {
        setLoading(false);
        setError(response.data.message);
        return;
      }
      setLoading(false);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate(LOGINSTORE);
      }, 2000);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(
          err.response.data.message ||
            "Error occurred while creating your account."
        );
      } else {
        setError("Error occurred while creating your account.");
      }
    }
  };

  return (
    <div className="h-full py-20 w-full flex items-center justify-center">
      <div className="w-2/3 h-4/5 flex flex-col gap-5">
        <div className="w-full h-full">
          <h2 className="text-2xl text-center">Create an account</h2>
          <p className="text-md text-gray-700 text-center capitalize my-2">
            Enter your details below
          </p>
        </div>
        <div className="h-full w-full flex gap-3 relative border-gray-600 rounded-lg overflow-hidden shadow-md shadow-black">
          <img
            src="/images/Création.jpeg"
            alt="Register"
            className="h-full w-1/2 object-cover"
          />

          <form
            onSubmit={handleSubmit}
            className="border absolute top-0 right-0 p-4 flex w-1/2 h-full flex-col justify-between gap-4"
          >
            <div className="flex-1 flex flex-col justify-center gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
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
              <Input
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  })
                }
                required
              />
              {error && (
                <p className="text-xs text-red-400 italic underline">{error}</p>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </div>
            <div>
              <p className="">
                Already have an account?{" "}
                <Button variant="link" onClick={() => navigate(LOGINSTORE)}>
                  Log in
                </Button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
