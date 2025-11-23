import "./Body.css";

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="body-container">
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Body;
