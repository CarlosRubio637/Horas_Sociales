import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar_desing/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation(); 

  const isFormPage = location.pathname.includes("horas-sociales-form");

  return (
    <>
      {!isFormPage && <Navbar />}
      <main>
        <Outlet />
      </main>
      {!isFormPage && <Footer />}
    </>
  );
};

export default Layout;

