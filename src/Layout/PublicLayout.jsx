import { Outlet } from "react-router-dom";
import Navbar from "../component/Navigation/Navbar";

export default function PublicLayout() {
  return (
    <div className="font-sans">
      <Navbar />

      {/* offset for fixed navbar */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
