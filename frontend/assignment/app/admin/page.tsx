"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Hardcoded admin credentials
    if (email === "admin@example.com" && password === "admin123") {
      router.push("/adminDashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <h1 style={{ fontSize: "28px", color: "red", marginBottom: "20px" }}>
        Admin Login
      </h1>

      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "8px", padding: "10px", width: "250px" }}
      />

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "8px", padding: "10px", width: "250px" }}
      />

      <button
        onClick={handleLogin}
        style={{
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        Login
      </button>

      {error && <p style={{ color: "blue", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}
