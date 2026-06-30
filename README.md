# CodeRealm — Plataforma Gamificada de Programación

## 1. Introducción

CodeRealm es una aplicación web que enseña programación a través de desafíos interactivos con mecánicas de videojuego. El usuario avanza por mundos temáticos, completa niveles con ejercicios de código y acumula XP, monedas y logros. La plataforma combina un frontend React moderno con un backend Node.js seguro y una base de datos PostgreSQL administrada en Supabase.

---

## 2. Objetivos

### 2.1 Objetivo General

Desarrollar una plataforma web gamificada que permita a usuarios aprender conceptos de programación de forma progresiva, motivadora e interactiva, integrando autenticación segura, progreso persistente y retroalimentación en tiempo real.

### 2.2 Objetivos Específicos

- Implementar un sistema de mundos y niveles con progreso rastreado por usuario.
- Diseñar desafíos de múltiples tipos: selección múltiple, verdadero/falso, ordenar código, completar código y predecir salida.
- Garantizar la seguridad de la API mediante JWT, rate limiting, validación de entradas y cabeceras HTTP protegidas.
- Integrar autenticación con Google OAuth2 además del registro clásico.
- Ofrecer una experiencia visual premium con animaciones, modo oscuro y diseño responsivo.

---

## 3. Descripción del Proyecto

### 3.1 Problema que Resuelve

Aprender a programar de forma autodidacta suele ser árido y poco motivador. CodeRealm transforma el aprendizaje en una experiencia similar a un videojuego de rol: el usuario tiene un personaje con nivel, monedas y logros, avanza por mundos que representan áreas del conocimiento (fundamentos, funciones, estructuras de datos, etc.) y recibe retroalimentación inmediata con explicaciones de por qué su respuesta fue correcta o incorrecta.

### 3.2 Funcionalidades Principales

- Registro e inicio de sesión con email/contraseña o con cuenta de Google.
- Mapa de mundos estilo Duolingo con camino de progreso visual.
- Lista de niveles por mundo con barra de progreso y contador de completados.
- Motor de desafíos con 6 tipos de preguntas, timer configurable por dificultad y feedback inmediato.
- Sistema de XP y monedas que incrementan al responder correctamente, con bonus por rapidez.
- Cálculo automático de nivel de usuario según XP acumulada.
- Sistema de logros (achievements) desbloqueables por condiciones específicas.
- Perfil editable: cambio de nombre de usuario y selección de avatar pixel-art (DiceBear).
- Ranking global de usuarios ordenado por XP.
- Estadísticas de desempeño: intentos, precisión, racha actual y máxima, niveles completados.
- Música ambiental con control de mute persistente en localStorage.
- Soporte completo de modo oscuro/claro con toggle.

---

## 4. Tecnologías Utilizadas

### 4.1 Frontend (React)

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | Biblioteca principal de UI |
| Vite | 6 | Bundler y servidor de desarrollo |
| React Router DOM | 6 | Enrutamiento SPA |
| TailwindCSS | 3 | Sistema de estilos utilitario |
| TanStack Query (React Query) | 5 | Fetching, caché e invalidación de datos |
| Axios | 1.x | Cliente HTTP con interceptores de token |
| React Hook Form | 7 | Gestión de formularios |
| Zod | 3 | Validación de esquemas tipada |
| GSAP | 3 | Animaciones de entrada y transiciones |
| Lucide React | — | Librería de iconos SVG |
| DiceBear API | 7.x | Generación de avatares pixel-art |
| Google Identity Services | — | Botón de login con Google OAuth2 |

### 4.2 Backend (Node.js + Express)

| Tecnología | Rol |
|---|---|
| Node.js 20 + Express 4 | Servidor HTTP y enrutamiento RESTful |
| Supabase JS SDK | Cliente para comunicarse con la base de datos |
| jsonwebtoken (JWT) | Generación y verificación de tokens de sesión |
| bcrypt | Hasheo seguro de contraseñas con salt |
| google-auth-library | Verificación de ID tokens de Google OAuth2 |
| express-validator | Sanitización y validación de cuerpos de petición |
| Helmet | Cabeceras HTTP de seguridad |
| express-rate-limit | Limitación de peticiones por IP |
| CORS | Control de origen cruzado |
| Morgan | Logging de peticiones HTTP |
| dotenv | Gestión de variables de entorno |

### 4.3 Base de Datos

PostgreSQL administrada a través de Supabase Cloud. El esquema incluye las tablas: `users`, `worlds`, `levels`, `challenges`, `user_progress`, `attempts`, `achievements`, `user_achievements`. Archivo de referencia: `database/schema.sql`.

### 4.4 Otras Herramientas

- **Git** — control de versiones.
- **Nodemon** — reinicio automático del servidor en desarrollo.
- **.env** — separación de secretos por entorno (backend y frontend tienen sus propios archivos).

---

## 5. Arquitectura del Sistema

### 5.1 Estructura General

```
reactfinal/
├── backend/
│   ├── src/
│   │   ├── app.js               ← Configuración central de Express
│   │   ├── controllers/         ← Lógica de negocio por recurso
│   │   ├── routes/              ← Definición de endpoints
│   │   ├── middlewares/         ← Auth JWT, manejo de errores
│   │   └── config/              ← Cliente Supabase
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/               ← Vistas principales (Dashboard, Levels, etc.)
│   │   ├── components/          ← Componentes reutilizables
│   │   ├── context/             ← AuthContext (estado global de usuario)
│   │   ├── services/api.js      ← Instancia Axios con interceptor de token
│   │   ├── hooks/               ← Hooks personalizados (GSAP, etc.)
│   │   └── styles/              ← CSS global y por módulo
│   └── .env
└── database/
    ├── schema.sql
    └── seed.sql
```

### 5.2 Comunicación entre Frontend, Backend y Base de Datos

El frontend realiza todas sus peticiones a la API REST del backend a través de Axios. Cada petición privada incluye el token JWT en el header `Authorization: Bearer <token>`. El backend valida el token en el middleware de autenticación antes de pasar a la lógica del controlador. El controlador usa el SDK de Supabase para leer o escribir en PostgreSQL y devuelve la respuesta en JSON. El frontend almacena el token y los datos básicos del usuario en `localStorage`.

---

## 6. Desarrollo e Implementación

### 6.1 Desarrollo del Frontend

El frontend es una SPA (Single Page Application) construida en React 19 con Vite. El enrutamiento es gestionado por React Router v6 con rutas protegidas que redirigen al login si no hay sesión activa. El estado global del usuario (nombre, avatar, XP, monedas, nivel) vive en `AuthContext` y es persistido en `localStorage`. Todas las llamadas de datos usan TanStack Query con `queryKey` específicas por recurso, lo que permite invalidación selectiva al completar un nivel o editar el perfil.

Captura de referencia: `frontend/src/context/AuthContext.jsx` líneas 1–85.

Los formularios de login y registro usan React Hook Form con resolvers de Zod para validación estricta en cliente antes de enviar al servidor. La página de autenticación tiene diseño dividido con ilustraciones pixel-art y soporte para login con Google mediante el SDK de Google Identity Services.

Captura de referencia: `frontend/src/pages/AuthPage.jsx` líneas 11–25 (schemas de validación).

### 6.2 Desarrollo del Backend

La API sigue una arquitectura por capas: rutas → middlewares → controladores → base de datos. Cada recurso tiene su propio archivo de rutas y controlador. El middleware de autenticación (`middlewares/auth.js`) verifica el JWT en cada ruta protegida y adjunta el objeto `user` al request.

Captura de referencia: `backend/src/app.js` líneas 19–38 (configuración de seguridad y rate limit).

El controlador de desafíos (`challengeController.js`) registra cada intento en la tabla `attempts` y calcula si el nivel queda completado comparando la cantidad de desafíos contestados correctamente contra el total de desafíos del nivel.

Captura de referencia: `backend/src/controllers/challengeController.js` líneas 104–160.

### 6.3 Integración con la Base de Datos

Se usa el cliente oficial de Supabase JS (`@supabase/supabase-js`) con la clave `service_role` en el backend, lo que le da acceso completo sin pasar por las políticas RLS de Supabase. Todas las consultas son directas mediante el ORM de Supabase (`.from().select().eq()` etc.). Las relaciones están definidas con claves foráneas y `ON DELETE CASCADE` en el schema SQL.

Archivo de referencia: `database/schema.sql`.

#### Tablas

**`users`** — Almacena el perfil de cada usuario.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID (PK) | Identificador único generado con `gen_random_uuid()` |
| username | VARCHAR(50) UNIQUE | Nombre de usuario único |
| email | VARCHAR(255) UNIQUE | Correo electrónico único |
| password_hash | TEXT NOT NULL | Contraseña hasheada con bcrypt (o hash aleatorio para usuarios de Google) |
| avatar | TEXT | URL del avatar (DiceBear o foto de Google) |
| xp_total | INT DEFAULT 0 | XP acumulada total |
| nivel | INT DEFAULT 1 | Nivel calculado a partir de xp_total |
| monedas | INT DEFAULT 0 | Monedas acumuladas |
| created_at | TIMESTAMPTZ | Fecha de registro |

**`worlds`** — Mundos temáticos del mapa (ej: Fundamentos, Funciones, etc.).

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID (PK) | Identificador único |
| nombre | VARCHAR(100) | Nombre del mundo |
| descripcion | TEXT | Descripción breve |
| icono | TEXT | Emoji representativo |
| color | TEXT | Color hex para la UI |
| orden | INT UNIQUE | Orden de aparición en el mapa |

**`levels`** — Niveles dentro de cada mundo.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID (PK) | Identificador único |
| world_id | UUID (FK → worlds) | Mundo al que pertenece |
| titulo | VARCHAR(200) | Nombre del nivel |
| dificultad | VARCHAR(20) | facil / medio / dificil / experto / leyenda |
| tiempo_limite | INT | Segundos por pregunta |
| xp_recompensa | INT | XP base por respuesta correcta |
| monedas_recompensa | INT | Monedas base por respuesta correcta |
| orden | INT | Orden dentro del mundo |

**`challenges`** — Preguntas individuales de cada nivel.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID (PK) | Identificador único |
| level_id | UUID (FK → levels) | Nivel al que pertenece |
| tipo | VARCHAR(20) | multiple / truefalse / sort / complete / predict / fix / match / boss |
| pregunta | TEXT | Enunciado de la pregunta |
| codigo | TEXT | Bloque de código a mostrar (opcional) |
| respuesta_correcta | TEXT | Respuesta esperada (se compara en lowercase/trim) |
| explicacion | TEXT | Explicación mostrada tras responder |
| metadata_json | JSONB | Opciones para multiple choice, pares para match, etc. |
| orden | INT | Orden dentro del nivel |

**`user_progress`** — Progreso de cada usuario por nivel.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID (PK) | Identificador único |
| user_id | UUID (FK → users) | Usuario |
| level_id | UUID (FK → levels) | Nivel |
| completed | BOOLEAN | True solo cuando el usuario respondió correctamente todos los challenges del nivel |
| best_score | INT | Mejor puntaje XP obtenido |
| best_time | INT | Menor tiempo registrado |
| attempts_count | INT | Total de intentos acumulados |
| completed_at | TIMESTAMPTZ | Fecha de primera finalización |
| — | UNIQUE(user_id, level_id) | Un registro por usuario/nivel |

**`attempts`** — Historial de cada respuesta enviada.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID (PK) | Identificador único |
| user_id | UUID (FK → users) | Usuario que respondió |
| challenge_id | UUID (FK → challenges) | Desafío respondido |
| answer | TEXT | Respuesta enviada |
| is_correct | BOOLEAN | Si fue correcta o no |
| time_taken | INT | Segundos que tardó el usuario |
| created_at | TIMESTAMPTZ | Marca de tiempo |

**`achievements`** — Catálogo de logros disponibles.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID (PK) | Identificador único |
| nombre | VARCHAR(100) | Nombre del logro |
| descripcion | TEXT | Condición explicada |
| icono | TEXT | Emoji |
| xp_bonus | INT | XP extra al desbloquearlo |
| monedas_bonus | INT | Monedas extra al desbloquearlo |
| condicion | VARCHAR(50) | Clave interna evaluada en el backend (ej: `first_level`, `streak_5`) |

**`user_achievements`** — Logros desbloqueados por usuario.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID (PK) | Identificador único |
| user_id | UUID (FK → users) | Usuario |
| achievement_id | UUID (FK → achievements) | Logro desbloqueado |
| unlocked_at | TIMESTAMPTZ | Fecha de desbloqueo |
| — | UNIQUE(user_id, achievement_id) | No se puede desbloquear dos veces |

#### Relaciones Principales

```
worlds ──< levels ──< challenges ──< attempts >── users
                  └──< user_progress >── users
achievements ──< user_achievements >── users
```

#### Índices

Se definieron índices en los campos de búsqueda más frecuentes para optimizar las consultas:

- `idx_levels_world_id` — búsquedas de niveles por mundo
- `idx_challenges_level_id` — búsquedas de desafíos por nivel
- `idx_user_progress_user_id` / `idx_user_progress_level_id` — progreso por usuario
- `idx_attempts_user_id` / `idx_attempts_challenge_id` — historial de intentos
- `idx_user_achievements_user_id` — logros desbloqueados por usuario
- `idx_users_xp_total DESC` — ranking global ordenado por XP

#### Función SQL

Se definió la función `calculate_nivel(xp INT)` en PostgreSQL que devuelve el nivel del usuario según tramos de XP (1 a 20). Esta misma lógica está replicada en el backend en `challengeController.js` para actualizar el campo `nivel` del usuario sin depender de un trigger.

Captura de referencia: `database/schema.sql` líneas 136–153.


### 6.4 Autenticación y Seguridad

**JWT (JSON Web Tokens):** Al hacer login, el backend firma un token con `JWT_SECRET` y expiración de 7 días. El token es enviado al frontend y almacenado en `localStorage`. Cada petición privada lo envía en el header `Authorization`. El middleware lo verifica con `jsonwebtoken.verify()`.

**Bcrypt:** Las contraseñas se hashean con salt factor 10 antes de guardarse. Los usuarios de Google reciben un hash aleatorio criptográfico (`crypto.randomBytes(32)`) ya que no tienen contraseña propia.

**Google OAuth2:** El frontend usa el botón de Google Identity Services para obtener un ID token. Ese token se envía al backend, que lo verifica con `google-auth-library` (`OAuth2Client.verifyIdToken`). Si el email ya existe en la base de datos, se inicia sesión; si no, se crea el usuario automáticamente.

**Helmet:** Aplica automáticamente cabeceras HTTP de seguridad: `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Content-Security-Policy` y otras.

**Rate Limiting:** Dos límites configurados en `app.js`:
- General: 100 peticiones cada 15 minutos por IP.
- Rutas de auth: 10 peticiones cada 15 minutos por IP (protege contra fuerza bruta en login/registro).

**CORS:** Configurado para aceptar peticiones únicamente desde el origen del frontend (`FRONTEND_URL` en `.env`), bloqueando cualquier otro dominio.

**express-validator:** Los controladores de registro y login validan y sanitizan los campos del body antes de procesarlos (tipo de dato, longitud, formato de email).

**Payload limit:** El body parser acepta máximo 10kb por petición (`express.json({ limit: '10kb' })`), mitigando ataques de payload masivo.

### 6.5 Consumo de APIs Externas

- **Supabase API** — Base de datos y almacenamiento de usuarios mediante SDK oficial.
- **Google Identity Services** — Autenticación OAuth2 sin necesidad de manejar contraseñas de Google.
- **DiceBear API** (`api.dicebear.com/7.x/pixel-art/svg`) — Generación de avatares pixel-art únicos por seed, usados en registro automático y selección de perfil.

---

## 7. Pruebas y Resultados

### 7.1 Casos de Prueba

| Caso | Resultado esperado |
|---|---|
| Registro con email duplicado | Error 409 con mensaje descriptivo |
| Login con contraseña incorrecta | Error 401 sin revelar si existe el usuario |
| Acceder a ruta protegida sin token | Error 401 |
| Superar el rate limit de auth | Error 429 después de 10 intentos en 15 min |
| Completar todos los desafíos de un nivel | `completed: true` en `user_progress`, XP y monedas sumadas |
| Completar solo algunos desafíos | `completed: false`, progreso guardado pero no marcado como completo |
| Login con Google (usuario nuevo) | Cuenta creada automáticamente, sesión iniciada |
| Login con Google (usuario existente) | Sesión iniciada con cuenta preexistente |
| Editar nombre con uno ya tomado | Error 409 con mensaje |
| Cambiar avatar | Actualizado en DB, navbar y perfil reflejan el cambio inmediatamente |

### 7.2 Capturas de Funcionamiento

_(A completar con pantallas del sistema en funcionamiento)_

---

## 8. Conclusiones

_(A completar)_

---

## 9. Referencias

- Documentación oficial de React: https://react.dev
- Documentación de Express: https://expressjs.com
- Supabase Docs: https://supabase.com/docs
- TanStack Query: https://tanstack.com/query
- Google Identity Services: https://developers.google.com/identity
- DiceBear Avatars: https://www.dicebear.com
- Helmet.js: https://helmetjs.github.io
- express-rate-limit: https://github.com/express-rate-limit/express-rate-limit

---

## 10. Anexos

### Variables de Entorno Necesarias

**`/backend/.env`**
```
PORT=3001
JWT_SECRET=...
JWT_EXPIRES_IN=7d
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
GOOGLE_CLIENT_ID=...
FRONTEND_URL=http://localhost:5173
```

**`/frontend/.env`**
```
VITE_API_URL=http://localhost:3001/api
VITE_GOOGLE_CLIENT_ID=...
```

### Usuarios de Prueba (Seed)

- **ProCoder99** — `procoder@test.com` / `Test1234!`
- **NinjaJava** — `ninja@test.com` / `Test1234!`
- **AlgoMaster** — `algo@test.com` / `Test1234!`
