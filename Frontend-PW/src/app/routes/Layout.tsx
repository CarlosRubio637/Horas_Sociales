import Footer from "@/components/Footer/Footer"; 
import Navbar from "@/components/Navbar_desing/Navbar"; 
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> 
      </main>
      <Footer /> 
    </>
  );
};

export default Layout;
