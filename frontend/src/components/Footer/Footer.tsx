import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <a className="footer-link" href="https://uca.edu.sv/">Universidad José Simeón Cañas - ©Copyright 2025</a>

        <div className="footer-row">
          <p>
              Teléfonos: 
              <a className="footer-link" href="tel:+50322106600p427">2210-6600 ext. 427</a> 
              y  <a className="footer-link" href="tel:+50322106680">2210-6680</a>
          </p>
          <a  className="footer-link" href="centro.serviciosocial@uca.edu.sv">centro.serviciosocial@uca.edu.sv</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
