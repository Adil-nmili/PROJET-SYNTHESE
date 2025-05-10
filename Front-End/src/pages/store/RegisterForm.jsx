
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../api/axios";
import { motion } from "framer-motion";
import { LOGINSTORE } from "@/router/Router";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient.post("/api/register", formData);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(
          err.response.data.message ||
          "Erreur lors de l'inscription. Vérifiez les champs."
        );
      } else {
        setError("Une erreur s'est produite.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={styles.container}
    >
      <motion.div
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.3 }}
        style={styles.left}
      >
        <img src="/images/Création.jpeg" alt="Register" style={styles.logo} />
      </motion.div>

      <motion.div
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.3 }}
        style={styles.right}
      >
        <h2 style={styles.title}>Create an account</h2>
        <p style={styles.subtitle}>Enter your details below</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            style={styles.googleButton}
          >
            <img
              src="images/google.png"
              alt="Google"
              style={{ width: 20, height: 20 }}
            />
            Sign up with Google
          </motion.button>
        </form>
        <p>
          Already have an account?{" "}
          <button onClick={() => navigate(LOGINSTORE)} style={styles.linkButton}>
            Log in
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  left: {
    flex: 1,
    backgroundColor: "#FDB927",
    overflow: "hidden",
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  right: {
    flex: 1,
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    marginBottom: "30px",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "16px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "16px",
    backgroundColor: "#552583",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    transition: "0.3s",
  },
  googleButton: {
    padding: "16px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "1px solid #ccc",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: "10px",
    transition: "0.3s",
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#552583",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default RegisterForm;
