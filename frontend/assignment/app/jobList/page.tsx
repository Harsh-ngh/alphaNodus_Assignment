"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../components/jobCard";
import Job from "../entities/jobEntitity";

function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);

  async function fetchJobs() {
    try {
      const res = await axios.get("http://localhost:5000/alphanodus/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            flex: "0 0 30%", 
            minWidth: "280px", 
          }}
        >
          <JobCard job={job} />
        </div>
      ))}
    </div>
  );
}

export default JobList;
