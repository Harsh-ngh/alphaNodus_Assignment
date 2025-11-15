import AdminDashboardPage from "./adminDashboard/page";
import AuthPage from "./auth/login/page";

export default function Home() {
  return (
    <div>
      <h1 
        style={{ textAlign: "center", marginTop: "20px" }} >
        <AuthPage />     
      </h1>
   </div>
  );
}
