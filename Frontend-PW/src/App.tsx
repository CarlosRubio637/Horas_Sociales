import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Asegúrate de importar React Router
import HomePage from "./pages/HomePage/Homepage"; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />{" "}
        {/* Ruta para la página de inicio */}
      </Routes>
    </Router>
  );
}

export default App;
