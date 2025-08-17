import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Crown, Shield } from "lucide-react";

const LoginForm = () => {
  // Mock navigation and context functions
  const navigate = (path) => console.log('Navigate to:', path);
  const authenticated = false;
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
    if (authenticated) navigate('/products');
  }, [authenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Mock login process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful login
      console.log("Login successful!", formData);
      navigate('/products');
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Container */}
      <div className={`relative w-full max-w-6xl transition-all duration-1000 transform ${
        isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden ">
          <div className="grid lg:grid-cols-2 ">
            
            {/* Left Side - Image/Branding */}
            <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 flex items-center justify-center px-12 py-4 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full"></div>
                <div className="absolute bottom-20 right-15 w-24 h-24 border border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/40 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="relative text-center text-white space-y-8">
                {/* Logo/Brand */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Crown className="text-amber-400" size={24} />
                  <span className="font-semibold text-md">Exclusive</span>
                  <Sparkles className="text-amber-400 animate-pulse" size={20} />
                </div>

                {/* Hero Text */}
                <div className="space-y-1">
                  <h1 className="text-xl md:text-2xl  font-black leading-tight">
                    Welcome to
                    <br />
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      Luxury Shopping
                    </span>
                  </h1>
                  <p className="text-sm text-purple-100 max-w-md mx-auto leading-relaxed">
                    Experience premium products and exclusive deals crafted just for you
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 gap-2 max-w-sm mx-auto">
                  <div className="flex items-center gap-3 text-purple-100">
                    <Shield size={20} className="text-emerald-400" />
                    <span>Secure & Encrypted</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-100">
                    <Sparkles size={20} className="text-amber-400" />
                    <span>Premium Experience</span>
                  </div>
                </div>

                {/* Decorative Image */}
                <div className="mt-8">
                  <img
                    src="/asset/shpping.png"
                    alt="Luxury Shopping"
                    className="w-64 h-48 object-cover rounded-2xl mx-auto shadow-2xl border-4 border-white/20"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white/95 backdrop-blur-sm flex items-center justify-center px-8 lg:px-12">
              <div className="w-full max-w-md space-y-2">
                
                {/* Form Header */}
                <div className="text-center ">
                  <h2 className="text-2xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Sign in to access your exclusive account
                  </p>
                </div>

                {/* Login Form */}
                <div className="space-y-3">
                  
                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail size={16} />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={loading}
                        className="w-full px-4 py-1 bg-gray-50 border-2 border-gray-200 rounded-md focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-500 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Lock size={16} />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        disabled={loading}
                        className="w-full px-4 py-1 bg-gray-50 border-2 border-gray-200 rounded-md focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-500 disabled:opacity-50 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs text-red-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="group relative w-full py-2 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-md transition-all duration-300 transform  hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                  >
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    {/* Button Content */}
                    <div className="relative flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Exclusive</span>
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </button>

                  {/* Forgot Password */}
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>

                {/* Register Link */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={handleRegisterClick}
                      disabled={loading}
                      className="font-normal underline text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;