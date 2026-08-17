import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/employees">Employees</Link>
      {hasRole("Admin", "Manager") && <Link to="/leave-approvals">Leave Approvals</Link>}
      <span style={{ marginLeft: "auto" }}>
        {user?.email} ({user?.role})
      </span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
