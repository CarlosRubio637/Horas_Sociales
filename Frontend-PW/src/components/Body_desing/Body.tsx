import NavBar from "../Navbar_desing/Navbar";
import "./Body.css";

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="body-container">
      <NavBar />
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Body;
