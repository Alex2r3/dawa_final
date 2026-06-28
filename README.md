<div align="center">
  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=CodeQuest" width="120" alt="CodeQuest Logo" />
  <h1>👾 CodeQuest</h1>
  <p><strong>Plataforma Gamificada de Aprendizaje de Programación</strong></p>
</div>

---

CodeQuest es una aplicación web interactiva diseñada para aprender conceptos de programación a través de la resolución de desafíos con elementos de gamificación. Inspirado en el diseño de videojuegos de última generación, ofrece una experiencia premium con mecánicas de progresión y competencia.

## 🚀 Tecnologías Destacadas

### 💻 Frontend (La Experiencia Visual)
Desarrollado con las herramientas más modernas del ecosistema React para garantizar un rendimiento inigualable y una experiencia inmersiva e interactiva.

*   **⚡ React 19 + Vite:** Renderizado ultrarrápido y un entorno de desarrollo casi instantáneo.
*   **🎨 TailwindCSS:** Sistema de diseño robusto con utilidades modernas para interfaces adaptables con "glassmorphism".
*   **✨ Animaciones Premium:**
    *   **Framer Motion & GSAP:** Transiciones fluidas, animaciones de componentes complejas y físicas UI.
    *   **Three.js:** Escenarios inmersivos y fondos interactivos 3D con efecto parallax al mover el ratón.
*   **📝 Monaco Editor:** Integración del mismo editor de código que impulsa a VSCode, directamente en tu navegador (resaltado de sintaxis profesional).
*   **🧩 Dnd Kit:** Mecánicas de arrastrar y soltar (Drag and Drop) para crear desafíos de "ordenar código" muy intuitivos.
*   **🗄️ TanStack Query (React Query):** Caché inteligente, optimización del rendimiento y sincronización de datos perfecta entre pantallas.
*   **🛡️ Zod + React Hook Form:** Validación de formularios tipada y súper estricta en tiempo real para evitar envíos incorrectos.
*   **📊 Recharts:** Gráficos y diagramas dinámicos de tu progreso y rachas de aprendizaje.

### ⚙️ Backend (El Motor Seguro)
Una API RESTful robusta construida sobre Node.js, diseñada teniendo como absoluta prioridad la seguridad (hardening) y la estabilidad.

*   **🟢 Node.js & Express:** Arquitectura estable, manejable y escalable.
*   **☁️ Supabase (PostgreSQL):** Base de datos relacional de alto rendimiento conectada a través del Supabase SDK.
*   **🔐 Seguridad y Protecciones (Hardening):**
    *   **Helmet:** Protege la API inyectando múltiples cabeceras HTTP de seguridad, mitigando vulnerabilidades críticas como XSS (Cross-Site Scripting), Clickjacking y Sniffing de MIME-types.
    *   **Express Rate Limit:** Actúa como un escudo contra ataques de fuerza bruta y denegación de servicio (DDoS) bloqueando múltiples peticiones desde una misma IP en corto tiempo.
    *   **Express Validator:** Sanitización rigurosa para evitar ataques de Inyección SQL y XSS asegurando que los "payloads" sean exactamente los esperados.
    *   **Bcrypt:** Hasheo criptográfico unidireccional con *salting* de contraseñas. Incluso si hubiera una filtración de base de datos, las claves originales son imposibles de recuperar.
    *   **JSON Web Tokens (JWT):** Autenticación *stateless* y encriptada, con firmas secretas que garantizan que las sesiones no puedan ser falsificadas, configuradas con tiempos de expiración seguros.
    *   **CORS Estricto:** Restringe desde qué dominios se puede consumir la API de CodeQuest.
*   **📈 Monitoreo y Optimización:** 
    *   **Morgan:** Sistema de registros (logging) para el monitoreo instantáneo de endpoints, errores y tiempos de respuesta.

---

## 🌍 Arquitectura del Sistema

```text
                  ┌──────────────────────────────────┐
                  │   Frontend (React + Three.js)    │
                  │   Visuales 3D, Zod y Formularios │
                  └──────────┬───────────────────────┘
                             │
                             │ HTTPS / Axios 
                             │ (Tokens JWT en Bearer Headers)
                             ▼
            ┌──────────────────────────────────────────┐
            │   Backend API (Express)                  │
            │   🛡️ Helmet / Rate Limit / Validaciones  │
            └────────────────┬─────────────────────────┘
                             │
                             │ Supabase SDK
                             ▼
            ┌──────────────────────────────────────────┐
            │   PostgreSQL (Supabase Cloud)            │
            │   Tablas Optimizadas e Índices exactos   │
            └──────────────────────────────────────────┘
```

---

## 🚀 Guía de Instalación Rápida

### 1. Base de Datos (Supabase)
1. Crea un proyecto en [Supabase](https://supabase.com/).
2. Ve al **SQL Editor**. Ejecuta primero el contenido de `database/schema.sql`.
3. Ejecuta el contenido de `database/seed.sql` para tener los mundos y retos de prueba creados.
4. Obtén el `Project URL` y tu clave secreta `service_role` de tu panel de Configuración -> API.

### 2. Configuración de Entornos (.env)

En **`/backend/.env`**:
```env
PORT=3001
JWT_SECRET=super_secret_jwt_codequest_key_2026_dev
SUPABASE_URL=tu_project_url_https_sin_slash_al_final
SUPABASE_SERVICE_KEY=sb_secret_tu_clave_aqui
```

En **`/frontend/.env`**:
```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Arranque del Entorno (Dev)
Abre dos terminales y ejecuta estos comandos:

**Terminal 1 (Levantar Servidor Node):**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 (Levantar Cliente React):**
```bash
cd frontend
npm install
npm run dev
```

La aplicación de React se abrirá en `http://localhost:5173/`.

---

## 🎮 Usuarios de Prueba (Seed Data)

Si no quieres registrarte y validar correos, puedes ingresar de inmediato con estos perfiles de administrador ya integrados:

*   **ProCoder99** (`procoder@test.com`) - Clave: `Test1234!`
*   **NinjaJava** (`ninja@test.com`) - Clave: `Test1234!`
*   **AlgoMaster** (`algo@test.com`) - Clave: `Test1234!`
