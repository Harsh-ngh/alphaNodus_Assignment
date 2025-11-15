"use client";
import React, { useState } from "react";
import "./JobCard.css";
import Job from "../entities/jobEntitity";
import axios from "axios";

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleApplyClick = () => setShowForm(true);

  const validate = () => {
    if (!name || !email || !phone) {
      setError("All fields are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be 10 digits");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/alphanodus/apply", {
        jobId: job.id,
        name,
        email,
        phone,
      });
      setSuccess("Application submitted successfully!");
      setShowForm(false);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      setError("Failed to submit application");
    }
  };

  return (
    <div className="job-card">
      <h2 className="job-title">{job.title}</h2>

      <div className="job-info">
        <p>
          <strong>Department:</strong> {job.department}
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p className="job-desc">{job.description.slice(0, 120)}...</p>
        <p className="job-date">
          Posted on: {new Date(job.posting_date).toLocaleDateString()}
        </p>
      </div>

      <div className="job-actions">
        {!showForm && (
          <button className="apply-btn" onClick={handleApplyClick}>
            Apply
          </button>
        )}

        {showForm && (
          <form className="apply-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
