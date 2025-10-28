import "./NavBar_Styles.css";

function NavBar() {
    return (
        <header className="header">
            <nav className="main-navbar">
                <ul className="navbar-list">
                    <img className="navbar-logo" src="/buho.png" alt=" " />
                    <span><h3 className="navbar-title">Servicio Social UCA</h3></span>

                <div className="navbar-item-right">
                    <li><a href="#"></a>CSS</li>
                    <li><a href="#"></a>Servicio Social</li>
                    <li><a href="#"></a>Programas de formacion</li>
                    <li>
                        <input type="text" className="header-search" placeholder="Buscar..."></input>
                    </li>
                </div>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
