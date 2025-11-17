import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage/Homepage"));
const CSS = lazy(() => import("./pages/CSS_info/Css_info"));
const Programas = lazy(() => import("./pages/Programas/Programas"));
const Contacto = lazy(() => import("./pages/Contacto/Contacto"));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/css" element={<CSS />} />
          <Route path="/programas" element={<Programas />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;



