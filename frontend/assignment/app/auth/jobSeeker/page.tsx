"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobSeekerAuth() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");

  //const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:5000/api/auth";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint =
        mode === "login"
          ? `${API_BASE}/loginJobSeeker`
          : `${API_BASE}/signupJobSeeker`;

      const body =
        mode === "login" ? { email, password } : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      alert(`${mode === "login" ? "Login" : "Signup"} Successful!`);

      router.push("/jobs");
    } catch (err) {
      setError("Network Error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Job Seeker {mode === "login" ? "Login" : "Signup"}
      </h2>

      <div style={styles.tabs}>
        <button
          style={mode === "login" ? styles.activeTab : styles.tab}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          style={mode === "signup" ? styles.activeTab : styles.tab}
          onClick={() => setMode("signup")}
        >
          Signup
        </button>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        {/* {mode === "signup" && (
        //   <input
        //     type="text"
        //     placeholder="Full Name"
        //     value={name}
        //     minLength={2}
        //     maxLength={32}
        //     onChange={(e) => setName(e.target.value)}
        //     style={styles.input}
        //   />
        )} */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          {mode === "login" ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    background: "#fff",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
  },
  title: { fontSize: "22px", marginBottom: "20px" },
  tabs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    border: "none",
    background: "#eee",
    cursor: "pointer",
  },
  activeTab: {
    padding: "10px 20px",
    border: "none",
    background: "#0070f3",
    color: "#fff",
    cursor: "pointer",
  },
  form: { display: "flex", flexDirection: "column" as const, gap: "15px" },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    background: "#0070f3",
    borderRadius: "5px",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: { color: "red", fontSize: "14px" },
};
