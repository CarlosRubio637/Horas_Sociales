# Sistema de Gestión de Horas Sociales (UCA)

Este proyecto es una plataforma web integral diseñada para facilitar y digitalizar el proceso de Servicio Social Estudiantil. Permite a los estudiantes de la universidad inscribirse en proyectos sociales, dar seguimiento a sus solicitudes y generar comprobantes, mientras que ofrece a los administradores herramientas para gestionar proyectos, instituciones y aprobaciones, con integración a Google Sheets.

## 🚀 Tecnologías Utilizadas

El proyecto utiliza una arquitectura **MERN** (MongoDB, Express, React, Node.js) con TypeScript en el frontend.

### Frontend
* **React + Vite:** Framework principal para una interfaz rápida y reactiva.
* **TypeScript:** Para un código más robusto y tipado estático.
* **Tailwind CSS:** Para el diseño y estilizado de componentes.
* **React Router DOM:** Manejo de rutas y navegación.
* **jspdf & html2canvas:** Generación de comprobantes de inscripción en PDF.

### Backend
* **Node.js & Express:** Servidor y API REST.
* **MongoDB & Mongoose:** Base de datos NoSQL y modelado de datos.
* **JWT (JSON Web Tokens):** Autenticación segura de usuarios.
* **Google Sheets API:** Sincronización automática de aplicaciones y estados con hojas de cálculo.

---

## ✨ Funcionalidades Principales

### 🎓 Para Estudiantes
* **Catálogo de Proyectos:** Visualización de proyectos disponibles con filtros por Facultad (Ingeniería, Economía, Humanidades, etc.) y ordenamiento alfabético.
* **Inscripción en Línea:** Formulario digital para aplicar a proyectos, incluyendo validación de requisitos y aceptación de términos.
* **Gestión de Solicitudes:** Panel personal ("Mis Solicitudes") para ver el estado de las aplicaciones (Pendiente, Aprobada, Rechazada).
* **Comprobantes PDF:** Generación automática de un PDF de constancia al enviar una solicitud.

### 🛡️ Para Administradores
* **Gestión de Proyectos:** Crear, editar, eliminar y visualizar proyectos.
* **Gestión de Solicitudes:** Ver lista de estudiantes inscritos por proyecto y cambiar el estado de la solicitud (Aprobar/Rechazar).
* **Integración Google Sheets:** Respaldo automático de las aplicaciones y actualización de estados en tiempo real en una hoja de cálculo.

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente.

### 1. Prerrequisitos
* Node.js (v18 o superior recomendado)
* MongoDB (corriendo localmente o una URI de Atlas)
* Credenciales de Google Cloud (para la integración con Sheets)

### 2. Clonar el repositorio
```bash
git clone https://github.com/CarlosRubio637/Horas_Sociales.git
cd Horas_Sociales
```

### 3. Instalar dependencias
El proyecto cuenta con un script unificado para instalar todo:
```bash
npm run install-all
```
O manualmente en cada carpeta:
```bash 
cd backend && npm install
cd ../frontend && npm install
```
### 4. Configuración de Variables de Entorno
Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:
```Fragmento de código
PORT=4000
MONGO_URI=mongodb://localhost:27017/horas_sociales
JWT_SECRET=tu_secreto_jwt
GOOGLE_SHEET_ID=tu_id_de_spreadsheet_de_google
GOOGLE_SERVICE_ACCOUNT_EMAIL=email_de_cuenta_de_servicio
GOOGLE_PRIVATE_KEY=llave_privada_de_google
```
**Nota sobre Google Sheets**: Debes colocar tu archivo de credenciales de servicio de Google (JSON) en la ruta: `backend/config/credentials.json`.
### 5. Carga de Datos de Prueba (Seeder)
Para poblar la base de datos con usuarios, instituciones y proyectos iniciales, ejecuta desde la carpeta backend:
```bash
npm run seeder
```
(Usa `npm run seeder:d` si deseas eliminar los datos existentes).

---

## ▶️ Ejecución
Puedes correr tanto el servidor (backend) como el cliente (frontend) simultáneamente desde la raíz del proyecto:
```bash
npm start
```
* Frontend: http://localhost:5173
* Backend: http://localhost:4000

---

## 🔐 Credenciales de Acceso (Datos de Prueba)
Si utilizaste el seeder, puedes acceder con los siguientes usuarios predeterminados (la contraseña es la misma para todos):
|Rol|Correo|Contraseña|
|---|---|---|
|Administrador|admin@uca.edu.sv|123456|
|Estudiante|juan@uca.edu.sv|123456|
|Estudiante|pedro@uca.edu.sv|123456|

---

## 📂 Estructura del Proyecto
```
Horas_Sociales/
├── backend/
│   ├── config/         # Configuración de DB y Google Sheets
│   ├── controllers/    # Lógica de negocio (Usuarios, Proyectos, Apps)
│   ├── models/         # Esquemas de Mongoose
│   ├── routes/         # Definición de endpoints API
│   ├── seeder/         # Script de datos iniciales
│   └── service/        # Lógica externa (Google Sheets Service)
│
├── frontend/
│   ├── src/
│   │   ├── app/routes/ # Configuración de rutas
│   │   ├── components/ # Componentes reutilizables (Navbar, Footer, etc.)
│   │   ├── pages/      # Vistas principales (Home, Panel, Formulario)
│   │   └── styles/     # Estilos globales y Tailwind
│   └── public/         # Assets estáticos (imágenes, PDFs guía)
```