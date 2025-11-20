import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/app/routes/Layout";  


const HomePage = lazy(() => import("./pages/HomePage/Homepage"));
const CSS = lazy(() => import("./pages/CSS_info/Css_info"));
const Programas = lazy(() => import("./pages/Programas/Programas"));
const HoursForm = lazy(() => import("./components/HorasSocialesForm_desing/HoursForm")); 

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/css" element={<CSS />} />
            <Route path="/programas" element={<Programas />} />
            <Route path="/horas-sociales-form" element={<HoursForm />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;


