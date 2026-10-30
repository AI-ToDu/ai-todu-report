> ARCHIVO HISTÓRICO. Contenido heredado, sin verificación de entrevistas, autoría de respuestas, permisos, ejecución o despliegue. No constituye evidencia de la entrega corregida. Las referencias gráficas se muestran como texto para evitar asociaciones o imágenes rotas.

# Capítulo V: Product Implementation, Validation & Deployment

En este capítulo se documenta el proceso de implementación, validación y despliegue de los productos digitales que conforman la solución. Se considera el desarrollo progresivo del Landing Page, las Web Applications y los RESTful Web Services, manteniendo la trazabilidad entre los requisitos, los artefactos de diseño y las funcionalidades implementadas.

El proceso de desarrollo se organiza mediante Sprints, complementado con prácticas de Software Configuration Management, control de versiones, integración de cambios, pruebas, documentación y despliegue. De esta manera, se busca mantener un proceso de desarrollo colaborativo y ordenado durante el ciclo de vida del proyecto.

La estructura del capítulo sigue las secciones establecidas para Product Implementation, Validation & Deployment en el trabajo final del curso.

## 5.1. Software Configuration Management

La Gestión de Configuración de Software (Software Configuration Management, SCM) comprende las prácticas utilizadas para identificar, controlar, versionar y mantener los diferentes componentes de software durante el ciclo de vida del proyecto.

Para la solución se establece un conjunto de herramientas, convenciones y procedimientos que permiten mantener la consistencia entre los integrantes del equipo, controlar las modificaciones realizadas sobre el código fuente y mantener la trazabilidad de los cambios.

La configuración considera las actividades de Project Management, Requirements Management, Product UX/UI Design, Software Development, Software Documentation y Software Deployment, de acuerdo con las actividades definidas para el proyecto. El enunciado del curso establece que esta sección debe cubrir Source Code Management, Development Environment Configuration y Deployment Configuration.

### 5.1.1. Software Development Environment Configuration

A continuación se listan los productos de software utilizados por el equipo, organizados por tipo de actividad del ciclo de vida:

| Herramienta / Producto | Propósito en el Proyecto | Enlace de Referencia / Descarga |
| :--- | :--- | :--- |
| **UXPressia** | *Requirements Management & UX:* Elaboración de Fichas de User Personas, Empathy Maps, As-Is Journey Maps e Impact Maps. (SaaS) | [UXPressia](https://uxpressia.com/) |
| **Figma** | *Product UX/UI Design:* Creación de Wireframes, Mock-ups, Design Systems y prototipado interactivo para Web y Landing Page. (SaaS) | [Figma](https://www.figma.com/) |
| **LucidChart / PlantUML** | *Software Architecture:* Elaboración de diagramas UML, C4 Model y representaciones de la arquitectura de software del proyecto. | [LucidChart](https://lucid.app/) |
| **Trello / Jira** | *Project Management:* Gestión del Product Backlog, Sprint Backlog y control de Work-items mediante tableros Kanban. (SaaS) | [Trello](https://trello.com/) |
| **GitHub** | *Source Code Management:* Alojamiento de repositorios en la nube, control de versiones colaborativo y Code Reviews. (SaaS) | [GitHub](https://github.com/) |
| **WebStorm / VS Code** | *Software Development:* IDE principal utilizado para el desarrollo de la Landing Page y las Web Applications mediante tecnologías web. | [VS Code](https://code.visualstudio.com/) |
| **Angular** | *Frontend Web Application:* Framework utilizado para desarrollar la aplicación web mediante componentes y TypeScript. | [Angular](https://angular.dev/) |
| **TypeScript** | *Frontend Development:* Lenguaje utilizado para implementar la lógica y los componentes de la Web Application. | [TypeScript](https://www.typescriptlang.org/) |
| **Node.js & npm** | *Software Development Environment:* Entorno de ejecución y gestor de paquetes para el desarrollo con Angular Framework. | [Node.js](https://nodejs.org/) |
| **Java Development Kit (JDK 17)** | *Software Development Environment:* Entorno de desarrollo para compilar y ejecutar nuestra API en Spring Boot. | [Adoptium JDK](https://adoptium.net/) |
| **Swagger UI (OpenAPI)** | *Software Documentation:* Herramienta integrada en el backend para la documentación automatizada e interactiva de nuestros Endpoints. | [Swagger](https://swagger.io/) |

### 5.1.2. Source Code Management

La administración del código fuente constituye un elemento fundamental para el desarrollo colaborativo de la solución. El equipo utiliza GitHub como plataforma de control de versiones y colaboración, permitiendo mantener un historial de los cambios realizados sobre los diferentes productos digitales.

**1. Establecimiento de repositorios en GitHub**
El proyecto mantiene repositorios independientes para los componentes principales de la solución:
* **Landing Page Repository:** `https://github.com/AI-ToDu/ai-todu-landing-page`
* **Web Applications (Frontend) Repository:** `https://github.com/AI-ToDu/ai-todu-frontend-app`
* **RESTful Web Services (Backend) Repository:** `https://github.com/AI-ToDu/ai-todu-backend-api` *(Nota: Este repositorio incluye los archivos y paquetes de pruebas unitarias y de integración del API).*

**2. GitFlow Workflow**
Para gestionar la evolución de nuestro código de manera ordenada sin interrumpir el trabajo de otros colaboradores, aplicamos el modelo **GitFlow**:
* **Main Branch (`main`):** Rama base que refleja el estado de producción. Es la rama publicada por GitHub Pages.
* **Develop Branch (`develop`):** Rama utilizada para integrar los cambios realizados durante el desarrollo.
* **Feature Branches (`feature/*`):** Ramas temporales para desarrollar funcionalidades aisladas.
* **Release Branches (`release/*`):** Rama utilizada para preparar una nueva versión antes de incorporar a `main`.
* **Hotfix Branches (`hotfix/*`):** Rama utilizada para corregir problemas detectados en una versión publicada.

El etiquetado de nuestros *Releases* en la rama `main` sigue el estándar de versionado semántico **MAJOR.MINOR.PATCH** (ej. `v1.2.4`):
* **MAJOR:** Cambios drásticos o arquitectónicos que rompen la compatibilidad hacia atrás.
* **MINOR:** Inclusión de nuevas funcionalidades que mantienen la compatibilidad hacia atrás.
* **PATCH:** Corrección de *bugs* o refactorizaciones menores.

**3. Conventional Commits**
Para mantener un historial de repositorios legible y generar notas de lanzamiento automáticas, todo el equipo utiliza la especificación *Conventional Commits*:
* `feat:` Una nueva característica o funcionalidad.
* `fix:` Una corrección de error (*bug*).
* `docs:` Cambios únicamente en la documentación.
* `style:` Cambios que no afectan el significado del código (espacios, formato).
* `refactor:` Un cambio de código que ni corrige un error ni añade una característica.
* `test:` Adición o corrección de pruebas existentes.
* `chore:` Actualizaciones de tareas de construcción o configuración.

### 5.1.3. Source Code Style Guide & Conventions

Con el objetivo de mantener un código fuente uniforme, legible y mantenible durante el desarrollo del proyecto, se establecen convenciones de nomenclatura, formato y organización, integrando nuestra arquitectura basada en Domain-Driven Design (DDD).

* **A. Landing Page (HTML5, CSS3, JavaScript):** Nombres de elementos en minúsculas, valores de atributos entre comillas dobles, estructura semántica e identación uniforme.
* **B. Frontend Web Applications (Angular y TypeScript):** Nombres descriptivos, variables y funciones en `camelCase`, clases e interfaces en `PascalCase`, separación estricta de lógica y presentación.
* **C. Web Services (Java, Spring Boot y Spring Data JPA):** Clases en `PascalCase`, variables y métodos en `camelCase`, controladores para exponer recursos, servicios con lógica de negocio y persistencia gestionada mediante Spring Data JPA.
* **D. Convenciones generales:** Identificadores técnicos en inglés, evitar código duplicado y adhesión estricta a *Conventional Commits* y *Semantic Versioning*.

### 5.1.4. Software Deployment Configuration

Para garantizar que los productos desarrollados estén disponibles continuamente, hemos configurado procesos de despliegue automatizado estructurados en las siguientes plataformas:
1. **Landing Page (Sitio Web Estático):** Alojado en **Vercel o Netlify**. Cada *Merge* a la rama `main` dispara automáticamente un *webhook* que construye los archivos estáticos y los despliega globalmente mediante un CDN.
2. **Frontend Web Applications (Angular):** Vinculado a **Vercel o Firebase Hosting**. Al fusionar un *Pull Request* hacia la rama de producción (`main`), el motor interno ejecuta `ng build --configuration production`, optimizando el *bundle* y desplegando artefactos seguros para SPA.
3. **RESTful Web Services & Database (Backend):** Alojado en **Render o Railway (PaaS)**. Clona el código fuente de Spring Boot desde GitHub, compila mediante Maven/Gradle a un archivo `.jar` y se conecta de forma administrada a una base de datos **PostgreSQL** mediante variables de entorno encriptadas.

<div style="page-break-after: always"></div>

## 5.2. Landing Page, Services & Applications Implementation

En esta sección detallamos el progreso interactivo y colaborativo del equipo a lo largo del ciclo de vida del proyecto utilizando Scrum organizado en Sprints.

### 5.2.1. Sprint 1

Este primer Sprint se centró en la configuración de la infraestructura base, repositorios, y en el diseño e implementación de la versión inicial de la Landing Page (sitio web estático).

#### 5.2.1.1. Sprint Planning 1

| Sprint # | Sprint 1 |
| :--- | :--- |
| **Sprint Planning Background** | During the Sprint Planning meeting, the team reviewed the Product Backlog and prioritized the User Stories related to the implementation of the official AI-ToDu Landing Page. The team discussed scope, assigned responsibilities, estimated effort, and agreed on acceptance criteria. |
| **Date** | 2026-09-01 |
| **Time** | 10:00 AM |
| **Location** | Microsoft Teams (Reunión Virtual) |
| **Prepared By** | Salazar Marquina, Kevin Junior (Team Leader) |
| **Attendees** | Salazar Marquina, Kevin / Bernal Torres, Carlos / Chui Kcomt, Luis / Condezo Pacheco, Fernando / Salazar Quiche, Darikson |
| **Sprint 0 Review Summary** | N/A (First sprint of the project). Team reviewed initial requirements and assigned first User Stories. |
| **Sprint 0 Retrospective Summary** | N/A. Initial agreements regarding communication, task distribution, and collaboration were established. |
| **Sprint Goal & User Stories** | **Sprint Goal:** Implement the first functional version of the AI-ToDu Landing Page, focusing on presenting the product's value proposition to potential MYPE customers.<br>**User Story:** US01 – Propuesta de Valor Landing Page. |
| **Sprint 1 Goal** | Launching the official Landing Page for AI-ToDu, delivering a clear understanding of our B2B value proposition to MYPEs across desktop and mobile devices. |
| **Sprint 1 Velocity** | 15 Story Points |
| **Sum of Story Points** | 13 Story Points |

#### 5.2.1.2. Aspect Leaders and Collaborators

| Team Member | GitHub Username | Landing Page UI/UX | Env & Repo Setup | Documentation |
| :--- | :--- | :---: | :---: | :---: |
| Bernal Torres, Carlos Alberto | @CharlesBernal-Hub | C | C | L |
| Chui Kcomt, Luis Carlos | @OffEnergy | C | L | C |
| Condezo Pacheco, Fernando André | @LEFEROX | C | C | L |
| Salazar Marquina, Kevin Junior | @AresSalamar | L | C | C |
| Salazar Quiche, Darikson Bill | @darikson26 | L | C | C |

#### 5.2.1.3. Sprint Backlog 1

| Story Id | Story Title | Task Id | Task Title | Task Description | Est. (h) | Assigned To |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| US01 | Presentación del Modelo de Negocio | T01.1 | Diseñar Wireframes LP | Crear wireframes para Desktop y Mobile en Figma | 3 | Salazar Marquina, Kevin |
| US01 | Presentación del Modelo de Negocio | T01.2 | Maquetar HTML5/CSS3 | Codificar estructura semántica y estilos base responsivos. | 5 | Salazar Quiche, Darikson |
| US01 | Presentación del Modelo de Negocio | T01.3 | Optimización SEO y ARIA | Implementar Meta tags y atributos de accesibilidad. | 2 | Bernal Torres, Carlos |
| TSK01 | Configuración de Repositorios | T00.1 | Set up GitHub Orgs | Crear repositorios, configurar protección de rama y GitFlow. | 2 | Chui Kcomt, Luis |
| US08 | Estructura del Informe de Proyecto | T08.1 | Redacción Cap. I y II | Documentar Startup Profile, Lean UX y Entrevistas en Markdown. | 4 | Condezo Pacheco, Fernando |

<div style="page-break-after: always"></div>

#### 5.2.1.4. Development Evidence for Sprint Review

Durante este Sprint, el equipo se enfocó en el desarrollo frontend del sitio web estático (Landing Page) y la configuración inicial de repositorios.

| Repository | Branch | Commit Id | Commit Message | Commited on |
| :--- | :--- | :--- | :--- | :---: |
| iainnovation/aitodu-landing | `feature/hero-section` | `a1b2c3d` | feat: implement hero section and responsive navbar | 2026-09-04 |
| iainnovation/aitodu-landing | `feature/seo-accessibility` | `f8e7d6c` | fix: add ARIA tags and SEO meta descriptions | 2026-09-05 |
| iainnovation/aitodu-backend | `chore/initial-setup` | `b4c5d6e` | chore: init spring boot project structure | 2026-09-06 |

*(Nota: Se adjuntarán capturas adicionales del historial de GitHub demostrando el uso de Conventional Commits).*

<p align="center">
  [Archivo histórico: Images/Evidencia_Codigo.png]
</p>

#### 5.2.1.5. Execution Evidence for Sprint Review

Se alcanzó una versión completamente funcional de la Landing Page de AI-ToDu, adaptada correctamente a dispositivos móviles, tablets y de escritorio.

<p align="center">
  [Archivo histórico: Images/Ejecucion_Landing.png]
</p>

*Video de flujo de navegación:* [Enlace al video en Microsoft Stream](PENDIENTE-DE-EVIDENCIA-REAL)

#### 5.2.1.6. Services Documentation Evidence for Sprint Review

El desarrollo de Web Services estuvo en fase de *scaffolding*. Se configuró Swagger (OpenAPI) y se documentó el endpoint de verificación de estado (Health Check).

| Endpoint | Verbo HTTP | Acciones Implementadas | URL de Documentación (Swagger) |
| :--- | :---: | :--- | :--- |
| `/api/v1/health` | GET | Retorna el estado de disponibilidad del servidor y conexión a base de datos. | `http://localhost:8080/swagger-ui.html` (Local) |

#### 5.2.1.7. Software Deployment Evidence for Sprint Review

El despliegue de la Landing Page se realizó utilizando **Vercel**, conectando el repositorio principal de GitHub. Cada Pull Request aprobado hacia `main` ejecuta un *build* automático.

<p align="center">
  [Archivo histórico: Images/Deployment_Vercel.png]
</p>

#### 5.2.1.8. Team Collaboration Insights during Sprint

El equipo utilizó GitHub para gestionar el código bajo el flujo GitFlow mediante ramas `feature/`.

**Integración de Inteligencia Artificial como Pair Programmer:**
* **Diseño de Arquitectura y Tipado Estricto:** La IA actuó como asesor utilizando ingeniería de prompts para generar la estructura de los Modelos de Dominio iniciales (Interfaces y Enums).
* **Documentación Automatizada:** La redacción técnica y el formato Markdown fueron co-creados con IA aplicando estándares corporativos.

<p align="center">
  [Archivo histórico: Images/GitHub_Insights.png]
</p>

<div style="page-break-after: always"></div>

## 5.3. Validation Interviews

### 5.3.1. Diseño de entrevistas

Para la validación de AI-ToDu se diseñaron entrevistas orientadas a usuarios pertenecientes a los segmentos identificados. El objetivo fue observar la interacción con la Landing Page y las aplicaciones desarrolladas, identificar dificultades y recopilar opiniones. Las actividades incluyeron presentación del producto, escenario de uso, interacción, observación de acciones y evaluación heurística de usabilidad.

### 5.3.2. Registro de Entrevistas

**Entrevista de Validación 1 (Segmento 1 - Dueño / Administrador)**
* **Nombre:** Carlos Mendoza
* **Edad / Distrito:** 45 años / Santiago de Surco
* **Resumen de evaluación:** Carlos interactuó con la Landing Page. Comprendió que la plataforma centraliza inventario y ventas. Destacó el valor de las alertas preventivas de stock. Indicó como mejora prioritaria añadir enlaces directos a planes de suscripción visibles.

**Entrevista de Validación 2 (Segmento 2 - Operario de Almacén)**
* **Nombre:** Miguel Rojas
* **Edad / Distrito:** 28 años / San Juan de Miraflores
* **Resumen de evaluación:** Miguel probó los wireframes y mockups del módulo de almacén. Validó que el registro de entradas requiere pocos clics en comparación con los cuadernos físicos. Sugirió agregar soporte para escáner de códigos de barras mediante la cámara del móvil.

## 5.4. Video About-the-Product

El video About-the-Product presenta AI-ToDu y explica su propuesta de valor, los problemas que soluciona y las funcionalidades principales.

* **Enlace del Video:** [YouTube - AI-ToDu Product Overview](https://youtu.be/NXNWTw8_6GY)
* **Duración:** 00:10 min

<div style="page-break-after: always"></div>

## Bibliografía

* Instituto Nacional de Estadística e Informática. (2022). *Producción nacional: Informe técnico*. INEI. [Enlace](https://www.inei.gob.pe/media/MenuRecursivo/boletines/boletin-estadistico-del-sector-servicios-n-12-diciembre-2022.pdf)
* Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley Professional.
* Centro Nacional de Planeamiento Estratégico. (2023). *Políticas y estrategias nacionales de desarrollo agroalimentario*. CEPLAN. [Enlace](https://www.ceplan.gob.pe/documentos_/politicas-y-estrategias-nacionales/)
* Ministerio de Trabajo y Promoción del Empleo. (2023). *Informe anual del empleo en el Perú 2022*. MTPE. [Enlace](https://cdn.www.gob.pe/uploads/document/file/4558080/Informe_Anual_del_Empleo_Peru_2022.pdf)
* Ministerio de Transportes y Comunicaciones. (2022). *Anuario estadístico 2022*. MTC. [Enlace](https://portal.mtc.gob.pe/estadisticas/publicaciones/anuarios/ANUARIO_ESTADISTICO_2022.pdf)
* Evans, E. (2004). *Domain-driven design: Tackling complexity in the heart of software*. Addison-Wesley Professional.
* França, A. C. C., da Silva, F. Q. B., & Mariz, L. M. R. de S. (2010). An empirical study on the relationship between the use of agile practices and the success of Scrum projects. *Proceedings of the 2010 ACM-IEEE International Symposium on Empirical Software Engineering and Measurement*. [DOI](https://doi.org/10.1145/1852786.1852835)
* Curcio, K., Santana, R., Reinehr, S., & Malucelli, A. (2019). Usability in agile software development: A tertiary study. *Computer Standards & Interfaces, 64*, 61–77. [DOI](https://doi.org/10.1016/j.csi.2018.12.003)
* Nielsen, J. (1992). Finding usability problems through heuristic evaluation. *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems*, 373–380. [DOI](https://doi.org/10.1145/142750.142834)
* Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems*, 249–256. [DOI](https://doi.org/10.1145/97243.97281)
* Law, E. L.-C., & Hvannberg, E. T. (2007). Heuristic evaluation: Comparing ways of finding and reporting usability problems. *Interacting with Computers, 19*(2), 225–240. [DOI](https://doi.org/10.1016/j.intcom.2006.10.001)
* Matharu, G. S., Mishra, A., Singh, H., & Upadhyay, P. (2015). Empirical study of agile software development methodologies: A comparative analysis. *ACM SIGSOFT Software Engineering Notes, 40*(1), 1–6. [DOI](https://doi.org/10.1145/2693208.2693233)
* Sato, D., Bassi, D., Bravo, M., Goldman, A., & Kon, F. (2006). Experiences tracking agile projects: An empirical study. *Journal of the Brazilian Computer Society, 12*, 45–64.