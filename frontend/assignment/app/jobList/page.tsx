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
      setJobs(res.data); // or res.data.jobs depending on backend
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
}

export default JobList;
