import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar_design/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation(); 

  const isFormPage = location.pathname.includes("horas-sociales-form");

  const isPanel = location.pathname.includes("panel")

  return (
    <>
      {!isFormPage && <Navbar />}
      <main>
        {!isPanel && <Outlet />}
      </main>
      {!isFormPage && <Footer />}
    </>
  );
};

export default Layout;

