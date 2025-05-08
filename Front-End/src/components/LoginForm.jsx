import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const loginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });

      console.log("Connexion réussie :", response.data);
      localStorage.setItem("token", response.data.token); // stocker le token
      navigate("/dashboard"); // rediriger après connexion
    } catch (error) {
      console.error("Erreur de connexion :", error.response?.data || error.message);
      alert(error.response?.data?.message || "Erreur lors de la connexion.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <img
          src="/images/Logo.jpeg"
          alt="Lakers Logo"
          style={styles.logo}
        />
      </div>
      <div style={styles.right}>
        <h1 style={styles.title}>Log in to Exclusive</h1>
        <p>Enter your details below</p>
        <form onSubmit={handlelogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <div style={styles.actions}>
            <button type="submit" style={styles.button}>Log in</button>
            <a href="#" style={styles.link}>Forgot Password?</a>
          </div>
        </form>
        <p>
          Don’t have an account?{" "}
          <button onClick={() => navigate("/register")} style={styles.linkButton}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  left: {
    flex: 1,
    backgroundColor: "#552583",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  input: {
    marginBottom: "15px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: "10px 24px",
    backgroundColor: "#552583",
    color: "white",
    border: "none",
    borderRadius: "12px", // même style que bouton "Create Account"
    cursor: "pointer",
    fontSize: "15px",
    marginTop: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#552583",
    fontSize: "14px",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#552583",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default loginForm;