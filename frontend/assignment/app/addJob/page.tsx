"use client";

import { useState } from "react";

export default function AddJobPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [message, setMessage] = useState("");

const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (!jobTitle || !department || !location || !description || !postingDate) {
    setMessage("Please fill all fields before submitting.");
    return;
  }

  const newJob = {
    jobTitle,
    department,
    location,
    description,
    postingDate,
  };

  try {
    const response = await fetch("http://localhost:5000/alphanodus/addJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Job posted successfully!");
      setJobTitle("");
      setDepartment("");
      setLocation("");
      setDescription("");
      setPostingDate("");
    } else {
      setMessage(data.error || "Something went wrong!");
    }
  } catch (error) {
    console.error(error);
    setMessage("Server not reachable.");
  }
};


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Post a New Job</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <input
          type="date"
          value={postingDate}
          onChange={(e) => setPostingDate(e.target.value)}
          style={styles.input}
        />

        {message && <p style={styles.message}>{message}</p>}

        <button type="submit" style={styles.button}>
          Submit Job
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "60px auto",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  } as const,
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  } as const,
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "100px",
    resize: "vertical",
  } as const,
  button: {
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    color: "green",
    textAlign: "center",
  } as const,
};
