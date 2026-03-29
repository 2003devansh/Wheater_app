import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Container from "./Container";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
