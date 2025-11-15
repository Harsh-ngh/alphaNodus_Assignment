"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation";


export default function AdminDashboardNav() {
   
    const router = useRouter();
     function handleCreateJob() {
       router.push("/addJob");
     }

    
    return (
        <div
            style={{
            display: "flex",
            flexDirection: "row",
            padding: "20px",
            borderBottom: "1px solid #ccc",
            justifyContent: "space-between",
        }}>
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
          <button>View Jobs</button>
            </div>
            {/* {
            showJobForm && <AddJobPage />
            } */}
      </div>
    );
}