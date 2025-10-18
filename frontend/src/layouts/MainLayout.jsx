import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 px-4 sm:px-8 md:px-12 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;


