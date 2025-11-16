"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminDashboardNav() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [showApplications, setShowApplications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  function handleCreateJob() {
    router.push("/addJob");
  }


  async function handleViewJobs() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/alphanodus/applications"); 
      if (res.data.success) {
        setApplications(res.data.applications);
        setShowApplications(true);
      } else {
        setError("Failed to fetch applications");
      }
    } catch (err) {
      console.error(err);
      setError("Server error while fetching applications");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          borderBottom: "1px solid #ccc",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2>Admin Dashboard</h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "20px 0",
            gap: "15px",
          }}
        >
          <button onClick={handleCreateJob}>Create Job</button>
          <button onClick={handleViewJobs}>View Jobs</button>
        </div>
      </div>

   
      {loading && <p>Loading applications...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showApplications && applications.length > 0 && (
        <div style={{ padding: "20px" }}>
          <h3>All Job Applications</h3>
          <table  cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Status</th>
                <th>Applied At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app : any) => (
                <tr key={app.application_id}>
                  <td>{app.application_id}</td>
                  <td>{app.full_name}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{app.job_title}</td>
                  <td>{app.job_department}</td>
                  <td>{app.job_location}</td>
                  <td>{app.status}</td>
                  <td>{new Date(app.applied_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showApplications && applications.length === 0 && (
        <p>No applications found.</p>
      )}
    </div>
  );
}
