import { useNavigate } from "react-router-dom";
import ClientApi from "../../../service/Client";
import { LOGINSTORE } from "@/router/Router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useClientContext } from "../../../api/context/ClientContext";
import { ALLPRODUCTS } from "../../router/Router";
import { Progress } from "@/components/ui/progress";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { authenticated } = useClientContext();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    authenticated ? navigate(ALLPRODUCTS) : '';
  }, [authenticated]);

  const validateStep = (step) => {
    setError("");
    switch (step) {
      case 1:
        if (!formData.first_name || !formData.last_name || !formData.email) {
          setError("Please fill in all required fields");
          return false;
        }
        if (!formData.email.includes('@')) {
          setError("Please enter a valid email address");
          return false;
        }
        return true;
      case 2:
        if (!formData.password || !formData.password_confirmation) {
          setError("Please fill in all required fields");
          return false;
        }
        if (formData.password !== formData.password_confirmation) {
          setError("Passwords do not match");
          return false;
        }
        if (formData.password.length < 8) {
          setError("Password must be at least 8 characters long");
          return false;
        }
        if (!formData.phone || !formData.address) {
          setError("Please fill in all required fields");
          return false;
        }
        return true;
      case 3:
        if (!formData.city || !formData.country || !formData.postal_code) {
          setError("Please fill in all required fields");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    try {
      const response = await ClientApi.addClient(formData);
      if (response.status === 201) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate(LOGINSTORE);
        }, 2000);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "An error occurred during registration");
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                required
                disabled={loading}
              />
              <Input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>
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
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Account Security</h3>
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
              disabled={loading}
            />
            <h3 className="text-lg font-semibold pt-4">Contact Information</h3>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              disabled={loading}
            />
            <Input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Location Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
                disabled={loading}
              />
              <Input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                required
                disabled={loading}
              />
              <Input
                type="text"
                name="postal_code"
                placeholder="Postal Code"
                value={formData.postal_code}
                onChange={(e) =>
                  setFormData({ ...formData, postal_code: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full py-20 w-full flex items-center justify-center">
      <div className="w-2/3 h-4/5 flex flex-col gap-5">
        <div className="w-full h-full">
          <h2 className="text-2xl text-center">Create an account</h2>
          <p className="text-md text-gray-700 text-center capitalize my-2">
            Step {currentStep} of {totalSteps}
          </p>
          <Progress value={progress} className="w-full mt-4" />
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
              {renderStep()}
              {error && (
                <p className="text-xs text-red-500 italic">{error}</p>
              )}
              <div className="flex justify-between pt-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Back
                  </Button>
                )}
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className="ml-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="ml-auto"
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                )}
              </div>
            </div>
            <div>
              <p>
                Already have an account?{" "}
                <Button variant="link" onClick={() => navigate(LOGINSTORE)} disabled={loading}>
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
