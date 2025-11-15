"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "applicant";

  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (role === "admin") {
      if (email === "admin@example.com" && password === "admin123") {
        alert("Admin logged in successfully!");
        router.push("/admin-dashboard");
      } else {
        setError("Invalid admin credentials!");
      }
      return;
    }

    if (role === "applicant") {
      if (!email || !password) {
        setError("Please fill all fields");
        return;
      }

      alert(`Welcome, ${name}! You’re logged in as Job Seeker`);
      router.push("/jobs");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {role === "admin" ? "Admin Login" : "Job Seeker Signup"}
      </h2>

      <form style={styles.form} onSubmit={handleSubmit}>
   
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
          {role === "admin" ? "Login" : "Signup"}
        </button>
      </form>

      <div style={styles.switch}>
        {role === "admin" ? (
          <p>
            Not an admin?{" "}
            <button
              onClick={() => router.push("/auth?role=applicant")}
              style={styles.textButton}
            >
              Go to Job Seeker Signup
            </button>
          </p>
        ) : (
          <button
            onClick={() => router.push("/admin")}
            style={styles.textButton}
          >
            Login as Admin
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: "22px",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#0070f3",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  switch: {
    marginTop: "20px",
    fontSize: "14px",
  },
  textButton: {
    background: "none",
    border: "none",
    color: "#0070f3",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "14px",
  },
};

export default AuthPage;
