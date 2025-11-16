"use client";

import { useRouter } from "next/navigation";

export default function RoleSelect() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select Role</h2>

      <div style={styles.cardContainer}>
        <div style={styles.card} onClick={() => router.push("/auth/jobSeeker")}>
          <h3 style={styles.cardTitle}>Job Seeker</h3>
        </div>

        <div style={styles.card} onClick={() => router.push("/auth/admin")}>
          <h3 style={styles.cardTitle}>Admin</h3>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "80px auto",
    padding: "20px",
    //textAlign: "center",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
  },
  card: {
    width: "180px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.3s",
    background: "#fff",
  },
  cardTitle: { fontSize: "20px", fontWeight: "600" },
};
