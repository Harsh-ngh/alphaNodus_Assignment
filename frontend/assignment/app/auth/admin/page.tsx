"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === "admin@example.com" && password === "admin123") {
      alert("Admin logged in successfully!");
      router.push("/adminDashboard");
    } else {
      setError("Invalid admin credentials!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Login</h2>

      <form style={styles.form} onSubmit={handleAdminLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "350px",
    margin: "80px auto",
    padding: "30px",
    background: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    textAlign: "center" as const,
  },
  title: { fontSize: "22px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column" as const, gap: "15px" },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    padding: "10px",
    background: "#111",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  error: { color: "red", fontSize: "14px" },
};
