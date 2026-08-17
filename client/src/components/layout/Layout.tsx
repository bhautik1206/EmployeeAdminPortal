import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
