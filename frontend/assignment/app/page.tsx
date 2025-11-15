import AdminDashboardPage from "./adminDashboard/page";
import RoleSelect from "./auth/page";



export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        <RoleSelect />
      </h1>
    </div>
  );
}
