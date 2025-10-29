import "./NavBar_Styles.css";

interface NavBarProps {
    title?: string;
    logoUrl?: string;
}

function NavBar({ 
    title = "Servicio Social UCA", 
    logoUrl = "/buho.png" 
}: NavBarProps) {

const handleSearch = (query: string) => {
console.log("Buscando:", query);
};

const handleNavigation = (section: string) => {
    console.log("Navegando a:", section);
};

return (
    <header className="header">
        <nav className="main-navbar">
        <div className="navbar-list">
            <div className="navbar-brand">
                <img className="navbar-logo" src={logoUrl} 
                alt={`Logo ${title}`} />
                <h3 className="navbar-title">{title}</h3>
            </div>

            <div className="navbar-item-right">
            <span className="nav-item" onClick={() => handleNavigation("CSS")}> CSS</span>
            <span className="nav-item" onClick={() => handleNavigation("ServiciSocial")}> ServiciSocial</span>
            <span className="nav-item" onClick={() => handleNavigation("Programas de formacion")}>Programas de formacion</span>
            
            <div className="search-container">
                <input 
                type="text" 
                className="header-search" 
                placeholder="Buscar..."
                onChange={(e) => handleSearch(e.target.value)}
                />
                </div>
            </div>
            </div>
        </nav>
        </header>
    );
}

export default NavBar;