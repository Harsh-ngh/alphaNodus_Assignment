"use client";
import React, { useState } from "react";
import axios from "axios";

function JobCard({ job }: { job: any }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [email, setEmail] = useState("");

  async function applyJob() {
    try {
      const formData = new FormData();
      formData.append("full_name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("cover_letter", ""); // optional
      if (resume) formData.append("resume", resume);

      await axios.post(
        `http://localhost:5000/alphanodus/jobs/${job.id}/apply`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Application submitted successfully!");
      setName("");
      setPhone("");
      setEmail("");
      setResume(null);
    } catch (error: any) {
      console.error("Apply error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to apply. Please try again later."
      );
    }
  }

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "25px",
        margin: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
        maxWidth: "350px",
        backgroundColor: "#fff",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.05)";
      }}
    >
      <h2 style={{ margin: "0 0 10px 0", color: "#111", fontSize: "1.4rem" }}>
        {job.title}
      </h2>
      <p style={{ margin: "0 0 5px 0", fontWeight: "600", color: "#333" }}>
        {job.department}
      </p>
      <p style={{ margin: "0 0 20px 0", color: "#666" }}>{job.location}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "0.95rem",
          }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "0.95rem",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "0.95rem",
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setResume(e.target.files[0]);
            }
          }}
          style={{ fontSize: "0.9rem" }}
        />
        <button
          onClick={applyJob}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1rem",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#005bb5";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#0070f3";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default JobCard;
