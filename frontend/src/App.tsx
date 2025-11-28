import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/app/routes/Layout";  

const HomePage = lazy(() => import("./pages/HomePage/Homepage"));
const CSS = lazy(() => import("./pages/CSS_info/Css_info"));
const Programas = lazy(() => import("./pages/Programas/Programas"));
const HoursForm = lazy(() => import("./components/HorasSocialesForm_design/HoursForm")); 
const UserPanel = lazy(() => import("./pages/UserPanel/UserPanel"));
const MyApplications = lazy(() => import("./pages/UserPanel/MyApplications"));
const StudentInscription = lazy(() => import("./pages/UserPanel/StudentInscription"));
const AdminProjectsManager = lazy(() => import("./pages/UserPanel/AdminProjectsManager"));

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
          <Route path="/panel" element={<> <UserPanel /> <Layout /> </>}> 
             <Route path="mis-solicitudes" element={<MyApplications />} />
             <Route path="inscribir-proyecto" element={<StudentInscription />} />
             <Route path="gestion-proyectos" element={<AdminProjectsManager />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;