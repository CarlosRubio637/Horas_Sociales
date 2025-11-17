import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PATHS } from "@/app/routes/paths"; 

// Importar las páginas
const HomePage = lazy(() => import("@/pages/HomePage/Homepage"));
const QuienesSomos = lazy(() => import("@/pages/QuienesSomos/QuienesSomos"));
const Programas = lazy(() => import("@/pages/Programas/Programas"));
const Contacto = lazy(() => import("@/pages/Contacto/Contacto")); 

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Router>
        <Routes>
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.QUIENES_SOMOS} element={<QuienesSomos />} />
          <Route path={PATHS.PROGRAMAS} element={<Programas />} />
          <Route path={PATHS.CONTACTO} element={<Contacto />} /> 
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
