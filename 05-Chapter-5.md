# Capítulo V: Product Implementation, Validation & Deployment

## 5.1. Software Configuration Management

### 5.1.1. Software Development Environment Configuration

| Producto / artefacto | Tecnología efectiva | Responsabilidad |
| --- | --- | --- |
| Frontend | Angular 22, TypeScript, Angular Material/CDK, CSS | Workspace responsive, UI/i18n y adaptador HttpClient. |
| Landing | HTML, CSS y JavaScript nativos | Propósito, capacidades, recorrido, CTA y contacto del proyecto. |
| Fake API | JavaScript ESM, Node 24 `node:http`; Service Worker e IndexedDB | Contrato de demo, invariantes y persistencia. |
| Pruebas | `node:test`, SQLite integrado de Node, compilador Angular | Dominio, HTTP real, concurrencia/persistencia, esquema y cobertura de traducciones. |
| Informe | Markdown, Mermaid/SVG y generadores versionados | README completo, fuentes únicas, comprobación y exportación. |
| Backend AV2 | Java 21 / Spring Boot 4.1.2 / JPA / PostgreSQL 17 / Flyway | API con dominio agnóstico, JWT, roles, transacciones y Outbox. |

El repositorio incluye lockfile cuando instala dependencias. La Fake API y landing no requieren paquetes de ejecución. Se usan datos ficticios y archivos de estado excluidos de Git. El equipo debe confirmar su tablero de gestión; se retiraron referencias a nombres de repositorios inexistentes, enlaces de ejemplo y herramientas declaradas sin evidencia de uso.

### 5.1.2. Source Code Management

| Repositorio individual | Artefacto | Rama para esta revisión |
| --- | --- | --- |
| [ai-todu-webapp](https://github.com/AI-ToDu/ai-todu-webapp) | Frontend y transporte AV2 | `fix/av2-api-integration` |
| [ai-todu-platform](https://github.com/AI-ToDu/ai-todu-platform) | Landing | `fix/tb1-readiness` |
| [ai-todu-fake-api](https://github.com/AI-ToDu/ai-todu-fake-api) | Fuente canónica de Fake API, contrato y pruebas | `fix/tb1-readiness` |
| [ai-todu-report](https://github.com/AI-ToDu/ai-todu-report) | Informe, arquitectura y datos | `fix/av2-report-alignment` |
| [ai-todu-api](https://github.com/AI-ToDu/ai-todu-api) | Backend, contratos, migraciones y CI | `fix/av2-domain-foundation` y `fix/av2-runtime-configuration` |

**Workflow:** `main` conserva la línea estable; `develop` integra trabajo; las ramas nuevas usan `fix/<scope>`. AV2 se integra mediante PR con comprobaciones de CI antes del merge. No se reescriben commits históricos ni se atribuyen las correcciones asistidas a otros integrantes. Para el frontend se incorpora `develop` desde la base original de `main`. En landing, la rama predeterminada original ya era `develop`; se documenta esta transición antes de normalizar una futura rama estable, sin mover la publicación durante la revisión.

Los cuatro bloques de corrección son: **(1) integración funcional con Fake API; (2) interfaz, landing e idiomas; (3) DDD/C4/datos; (4) informe, trazabilidad y guía de revisión**. Cada repositorio registra un commit por bloque aplicable; no se crean commits vacíos para aumentar un contador. El paquete nuevo registra además su inicialización real. Los hashes y PR vigentes se consultan en Git, sin duplicar un historial que pueda quedar desactualizado.

El frontend conserva un manifiesto de procedencia y hashes del motor vendorizado desde la Fake API. Su prueba de integridad detecta cambios no sincronizados. Esta decisión permite servir el demo desde hosting estático y mantener un repositorio individual revisable para el contrato.

### 5.1.3. Source Code Style Guide & Conventions

TypeScript/JavaScript usan identificadores en inglés, `PascalCase` para clases y `camelCase` para funciones/DTOs. Nombres físicos SQL usan **minúsculas snake_case**. Objetos de valor y reglas de dominio se separan de UI, transporte y almacenamiento. Las vistas se agrupan por contexto; nuevas funcionalidades se exponen mediante servicio de aplicación y contrato, evitando introducir reglas de stock en el componente.

Los mensajes visibles se resuelven por clave en `en_US`/`es_419`; el API emite códigos de error estables. Un mensaje nuevo requiere ambas traducciones y revisión de accesibilidad. No se utilizan números inventados en Overview ni testimonios no autenticados en la landing.

### 5.1.4. Software Deployment Configuration

| Acceso | URL / comando | Estado y límite |
| --- | --- | --- |
| Landing pública existente | [GitHub Pages](https://ai-todu.github.io/ai-todu-platform/) | Canal estático público y CTA hacia la webapp. |
| Webapp pública existente | [GitHub Pages](https://ai-todu.github.io/ai-todu-webapp/) | GitHub Actions desde main; PR AV2 #5 integrado con CI aprobado. |
| Workspace + Fake API HTTP | `npm ci` y `npm run demo`, frontend | Sirve interfaz compilada y API en `http://127.0.0.1:8850/?api=http`. |
| Fake API independiente | `npm test`; `npm start -- --port 8853` | API local `/api/v1`, sin frontend compilado. |
| Modo estático | Build Pages y origen HTTPS o localhost | Worker/IndexedDB por origen/perfil; no servidor público REST. |

El workflow de verificación revisa ramas `fix/**` y PR. El workflow Pages de la webapp se restringe a `main` después de revisión; exige configurar GitHub Pages como **GitHub Actions** al publicar. Actions y la publicación de webapp se comprobaron; el servidor AV2 se verifica por separado. La navegación usa hash para rutas estáticas y el build fija `base-href` `/ai-todu-webapp/`. Se conserva el selector de idioma y CTA de la landing.

## 5.2. Landing Page, Services & Applications Implementation

La estructura siguiente recupera **Sprint 1 y Sprint 2**. La reconstrucción documental no acredita reuniones, horas ni transiciones históricas que no fueron registradas. La corrección técnica se ejecuta el 30/10/2026; las fechas/participantes de la planificación original y el tablero deben completarse con evidencia del equipo.

### 5.2.1. Sprint 1

#### 5.2.1.1. Sprint Planning 1

**Hito:** AV1 / primera landing y diseño. **Fuente temporal:** historial de landing y report. **Planning original:** fecha, duración, asistentes y decisiones pendientes de confirmar. **Goal propuesto para corregir el formato**, según enunciado p. 24:

> Our focus is on helping potential business owners and warehouse operators understand the traceable inventory-to-delivery proposal. We believe it delivers a clear basis for deciding whether to try the product to these two user segments. This will be confirmed when visitors can identify the product purpose, find the relevant capabilities and reach the demo entry point from the landing.

**Cobertura propuesta:** US05, US06, US08, US33, US34; suma de 12 SP de backlog. Velocity histórica y compromiso original: sin registro verificado.

La meta describe outcome, impacto, clientes y evento de confirmación. La implementación actual permite revisar el recorrido; su comprensión por usuarios reales requiere sesión de validación.

#### 5.2.1.2. Aspect Leaders and Collaborators

El historial de landing contiene aportes de los cinco integrantes. El nombramiento formal de leaders/collaborators por Development, Execution, Documentation y Deployment no quedó acreditado por una lista firmada o acta accesible. Se debe ratificar la matriz del equipo; no se reconstruye liderazgo a partir de una cantidad de commits.

#### 5.2.1.3. Sprint Backlog 1

Descomposición de referencia para recuperar el alcance, con **estimaciones propuestas**, no horas trabajadas. Story points se consultan en el backlog canónico y no se convierten a horas.

| Task | Historia | Engineering task | Est. | Evidencia / estado actual |
| --- | --- | --- | --- | --- |
| S1-T01 | US05 | Implementar estructura semántica de propósito y navegación. | 4 h | Landing actual; trazabilidad histórica por confirmar. |
| S1-T02 | US06 | Implementar capacidades y flujo del producto con alcance explícito. | 4 h | Secciones actuales y CTA. |
| S1-T03 | US08 | Conectar contacto real y revisar destinos de navegación. | 4 h | Enlace al proyecto; formulario B2B pendiente. |
| S1-T04 | US33–US34 | Incorporar idiomas, términos y privacidad accesibles. | 6 h | Implementación actual; validar con usuarios. |
| S1-T05 | US05–US06 | Revisar móvil/teclado y publicar versión revisada. | 4 h | Revisión local; merge y publicación pendientes de aprobación. |

**Seguimiento histórico To Do / In Process / To Review / Done:** pendiente de tablero exportado o enlace accesible. Esta tabla no simula transiciones históricas.

#### 5.2.1.4. Development Evidence for Sprint Review

Los commits originales de [landing](https://github.com/AI-ToDu/ai-todu-platform/commits/develop/) y capítulos AV1 enlazados en Student Outcome acreditan cambios de archivos. El rediseño de esta corrección tiene su propio commit de bloque 2. Se evita asociar capturas de otro producto con la versión actual.

#### 5.2.1.5. Execution Evidence for Sprint Review

La landing se sirve localmente y se revisan navegación, selector de idioma, CTA, términos y móvil. Se debe adjuntar video de exposición AV1 con fecha/audiencia si se usa como evidencia de ejecución histórica. Las pruebas actuales de enlaces e idiomas corresponden a la corrección.

#### 5.2.1.6. Services Documentation Evidence for Sprint Review

Sprint 1 no acredita un servidor productivo. El alcance documentado es landing/diseño. Los servicios de TB1 se describen con Fake API/OpenAPI en Sprint 2; Spring Boot/PostgreSQL queda para AV2.

#### 5.2.1.7. Software Deployment Evidence for Sprint Review

La URL pública de landing figura en configuración. El historial público y configuración de Pages son evidencia distinta del navegador local. El rediseño se integró en una revisión posterior; el [PR #4 de AV2](https://github.com/AI-ToDu/ai-todu-platform/pull/4) ajusta el alcance y el acceso al servidor, sin atribuir esta revisión a la entrega histórica de Sprint 1.

#### 5.2.1.8. Team Collaboration Insights during Sprint

Hay contribuciones históricas de los cinco integrantes en landing. Hace falta vincular cada acción con tarea y revisión. Una captura de Insights o un contador no demuestra por sí solo planificación, colaboración continua ni revisión cruzada. Se solicita el tablero real y enlaces de PR de la entrega original.

### 5.2.2. Sprint 2

#### 5.2.2.1. Sprint Planning 2

**Hito:** TB1, frontend integrado con Fake REST API. **Corrección actual:** 30/10/2026. **Planning histórico:** calendario/asistentes pendientes. **Sprint Goal de corrección:**

> Our focus is on enabling a traceable receiving-to-delivery workflow in the TB1 prototype. We believe it delivers confidence in stock and delivery records to business owners, warehouse operators and logistics operators. This will be confirmed when receiving two of four ordered units, selling two units and delivering that sale leaves a reconciled stock balance, historical demo receipt and delivery recipient that survive a page reload.

**Cobertura de corrección referenciada:** 25 historias, 99 SP de backlog. No representa velocity medida ni un compromiso histórico de capacidad. El equipo debe acordar capacidad y selección final con su calendario real.

La confirmación técnica se observa en el recorrido local. El impacto de confianza es una hipótesis que debe validarse con usuarios. **Fuera de este goal:** cobros reales, SUNAT, IA, rutas optimizadas y servidor Java de producción.

#### 5.2.2.2. Aspect Leaders and Collaborators

| Aspecto | Evidencia histórica disponible | Validación pendiente |
| --- | --- | --- |
| Development | Carlos/IAM, Fernando/inventario, Darikson/POS-reporting, Luis/logística y Kevin/base-documentación; commits en Student Outcome. | Ratificar leaders/collaborators y enlazar tareas. |
| Execution | Pruebas automatizadas y recorrido local de la corrección. | Evidencia individual de ejecución y demostración original. |
| Documentation | Contribuciones AV1 y nueva revisión asistida autorizada por Kevin. | Revisión cruzada y reflexión individual por entrega. |
| Deployment | URLs/configuración de Pages y workflows preparados. | Responsable real, aprobación y evidencia del despliegue de la versión revisada. |

#### 5.2.2.3. Sprint Backlog 2

Las tareas siguientes son la descomposición **actualizada de corrección**; las horas son estimaciones propuestas entre 4 y 8 horas, no una declaración retroactiva de esfuerzo. El ejecutor técnico de esta corrección es trabajo asistido autorizado por Kevin; no se distribuye autoría ficticia entre integrantes.

| Task | Historias | Engineering task | Est. | Evidencia de aceptación |
| --- | --- | --- | --- | --- |
| S2-T01 | US01–US03, US29 | Implementar sesión, rol y consultas por tenant en la Fake API. | 6 h | Pruebas de autenticación, autorización y aislamiento. |
| S2-T02 | US09–US14 | Persistir catálogo/movimientos y validar SKU, saldo y conservación. | 6 h | Pruebas de SKU, cantidades y producto bloqueado. |
| S2-T03 | US35 | Implementar proveedor/orden/recepción parcial atómica. | 6 h | Recepción 2/4 y rechazo de exceso/duplicación. |
| S2-T04 | US15–US18 | Integrar carrito, stock y comprobante histórico; anulación única. | 8 h | Sobreventa/concurrencia y reintegro una vez. |
| S2-T05 | US19–US22, US37 | Integrar venta, recursos, transición e identificación del receptor. | 8 h | Recorrido de entrega y conflicto de recursos. |
| S2-T06 | US23, US26, US36 | Integrar devolución, métricas derivadas y bandeja de alertas. | 6 h | Límites de devolución y consistencia del resumen. |
| S2-T07 | US33–US34 | Aplicar Material/responsive, localización y estados accesibles. | 6 h | Compilación, cobertura de traducciones y revisión móvil. |
| S2-T08 | Transversal | Revisar DDD, VO, C4, DDL/ERD y alcance real de 35 tablas. | 8 h | Diagramas renderizados y restricciones SQL ejecutadas. |
| S2-T09 | Transversal | Corregir informe, evidencias, versiones y guía de revisión. | 6 h | README reproducible, enlaces/imágenes y matriz de pendientes. |
| S2-T10 | Transversal | Ejecutar verificación y preparar PR/CI de cada producto. | 4 h | Resultados locales y PR de revisión; merge posterior. |

La tabla no reemplaza el tablero con transiciones y responsables reales. El equipo debe incorporar estos items a su herramienta y conservar la evidencia progresiva, sin backdating.

#### 5.2.2.4. Development Evidence for Sprint Review

Los seis commits iniciales de la webapp se conservan íntegros. La rama de corrección registra bloques de cambios concretos; la nueva Fake API dispone de repositorio propio. El front usa HttpClient y llamadas por contrato: los componentes no modifican directamente un arreglo en memoria como persistencia final.

Los objetos de valor son inmutables y los agregados/servicios de aplicación validan el comando antes de confirmar el draft. La copia de demo del frontend se verifica por hash frente al paquete canónico. El modelo SQL sigue siendo una base de diseño AV2; no se presenta como JPA desplegado.

#### 5.2.2.5. Execution Evidence for Sprint Review

| Verificación | Observación y límite |
| --- | --- |
| Dominio/API | Pruebas automatizadas de cantidades, SKU, conservación, sobreventa, anulación, recepción parcial, despacho, devolución, roles y tenant. |
| HTTP real | Dos solicitudes concurrentes contra stock 8, cada una por 5: una aceptada y otra rechazada; saldo 3 conserva persistencia después de reiniciar servidor. |
| Datos | DDL ejecutado en SQLite; saldo negativo y referencia cruzada entre empresas rechazados. No valida aún PostgreSQL/JPA. |
| Integración por navegador | Compra de 4 unidades de arroz, recepción de 2, venta de 2 por PEN 290 y despacho hasta entrega con receptor. Overview derivó contribución PEN 70 y stock valorizado PEN 1,510. |
| Sesión ante fallo | Fixture aislado respondió 503 en logout; la UI eliminó la sesión local y mostró acceso. La sesión del servidor no se declaró revocada cuando este falló. |
| Hosting estático | Acceso y creación de MEM-001 mediante worker/IndexedDB sin backend; al recargar el registro permanece. Worker empaquetado en un solo .js para evitar dependencia de MIME .mjs. |
| Internacionalización | Inglés predeterminado y claves cubiertas en español latinoamericano; revisión del cambio de idioma. |
| Compilación | Build de producción y build Pages, sin relajar el presupuesto original de 500 kB para el bundle inicial. |
| Despliegue | Pruebas locales de la revisión; versión pública posterior al merge/aprobación. |

![Recorrido HTTP local · datos ficticios · 30/10/2026](assets/evidence/overview.jpg)

Son datos ficticios de prueba, no ventas reales ni un estudio de eficiencia de negocio. El recibo es explícitamente no fiscal. La compilación y las pruebas no prueban por sí solas usabilidad ni colaboración del equipo.

#### 5.2.2.6. Services Documentation Evidence for Sprint Review

El [OpenAPI de la Fake API](https://github.com/AI-ToDu/ai-todu-fake-api/blob/fix/tb1-readiness/openapi.json) especifica rutas, cuerpos, errores y sesión demo. Contiene solo operaciones implementadas. Recuperación de contraseña, cambio de perfil/contraseña, planes y captación B2B siguen pendientes. Cambios frente a los Technical Stories se listan en el capítulo III.

El transporte HTTP local y el worker consumen el mismo motor. La URL de Pages `/api/v1` se intercepta en navegador después de instalar el worker; no es un backend remoto accesible mediante curl. El archivo JSON local y el IndexedDB no sincronizan dispositivos.

#### 5.2.2.7. Software Deployment Evidence for Sprint Review

El workflow de verificación ejecuta checks en fix/PR. El frontend incluye build con ruta base Pages y un workflow de despliegue para versión revisada. Pages cambió a GitHub Actions el 7/11; el incremento AV2 se publica desde main el 8/11. La existencia de un PR no se registra como despliegue completado.

#### 5.2.2.8. Team Collaboration Insights during Sprint

Los aportes originales se enlazan por integrante y módulo. La corrección no intenta suplir colaboración con volumen de commits: registra trabajo asistido y deja revisión cruzada pendiente. Para completar la evidencia, cada integrante debe revisar su contexto, ejecutar un caso principal/alternativo, comentar un PR y explicar una decisión en la exposición con marca de tiempo.

### 5.2.3. Sprint 3

#### 5.2.3.1. Sprint Planning 3

**Hito:** AV2, semana 12. **Registro técnico:** 7–8/11/2026. Calendario, asistentes, duración de ceremonia y compromiso de capacidad no están acreditados. La selección siguiente documenta el incremento trabajado; no reconstruye una reunión.

> Our focus is on enabling an authorized workspace to reconcile receiving, sales and delivery through the deployed API. We believe it delivers a shared and traceable operational record to business owners and warehouse operators. This will be confirmed when a sale and its delivery preserve stock, historical amounts and recipient across sessions, concurrent sales cannot oversell, and invalid or unauthorized operations leave no partial changes.

El criterio técnico se prueba con datos ficticios; la confianza del usuario sigue como hipótesis. Product Owner y Scrum Master: pendientes de confirmar. Se conserva la atribución histórica sin asignar aportes nuevos no verificados.

#### 5.2.3.2. Aspect Leaders and Collaborators

| Aspecto | Actividad verificada | Responsable y límite |
| --- | --- | --- |
| Development | Backend Java e integración Angular en PR | Trabajo asistido autorizado por Kevin; sin atribuirlo a otros integrantes |
| Execution | Pruebas locales, CI PostgreSQL y recorrido HTTP público | Ejecución técnica asistida; demostración/reflexión individual pendientes |
| Documentation | Informe, OpenAPI y README | Revisión asistida; aprobación académica y reflexiones pendientes |
| Deployment | Pages y API gratuita con PostgreSQL aislado | Autorización de Kevin; evidencias técnicas enlazadas |

Matriz LACX formal y aprobación: pendientes. Los aportes históricos de los integrantes se mantienen con sus fuentes.

#### 5.2.3.3. Sprint Backlog 3

Estimaciones de referencia, no horas registradas ni capacidad medida. La prioridad sigue core → soporte → genérico; autenticación es una dependencia técnica, no el primer objetivo del negocio.

| Task | Historia | Engineering task | Est. | Resultado verificable |
| --- | --- | --- | --- | --- |
| S3-T01 | US09–US14 | Implementar InventoryItem, VOs, movimientos y persistencia separada. | 8 h | Reglas, migraciones y rollback |
| S3-T02 | US15–US18, TS35 | Confirmar/anular ventas atómicas con concurrencia e idempotencia. | 8 h | Solo una de seis ventas de la última unidad se acepta |
| S3-T03 | US19–US22, US37 | Preparar/iniciar/entregar manifiesto con recursos existentes. | 8 h | Receptor y saldo sin doble descuento |
| S3-T04 | US35 | Implementar compra y recepción parcial acotada. | 8 h | Exceso y líneas repetidas rechazados |
| S3-T05 | US36, US23 | Conciliar devoluciones e indicadores. | 4 h | Restock/loss y límite de devolución |
| S3-T06 | US26, TS34 | Traducir eventos internos a PL v1 con Outbox e inbox. | 8 h | Fallo/reintento y reentrega sin duplicación |
| S3-T07 | TS33 | Integrar Open-Meteo mediante gateway y caché. | 4 h | Traducción/caché/fallo probados y llamada real |
| S3-T08 | US01–US03, US28–US29 | Implementar JWT revocables, BCrypt, roles y aislamiento. | 8 h | Sesión y denegaciones verificadas |
| S3-T09 | US33, contratos TS | Integrar Angular con API y separar sesiones demo/servidor. | 8 h | 21 pruebas y build Pages aprobados |
| S3-T10 | Transversal | Desplegar API/DB/webapp y comprobar recorrido. | 8 h | Render live, health UP y Pages |
| S3-T11 | Transversal | Alinear informe, diagramas y servicios. | 8 h | Fuentes y exportación de esta versión |
| S3-T12 | Validación / ABET 3 | Incorporar entrevistas, tablero, videos y reflexión. | 8 h | Pendiente de evidencia humana real |

El tablero externo y sus responsables siguen pendientes de recibir. Esta tabla no simula transiciones To Do / In Process / To Review / Done ni tiempo trabajado.

#### 5.2.3.4. Development Evidence for Sprint Review

[Backend PR #1](https://github.com/AI-ToDu/ai-todu-api/pull/1) implementa contextos, agregados, recursos, migraciones y Outbox. [PR #2](https://github.com/AI-ToDu/ai-todu-api/pull/2) retira administración del runtime y prueba el gateway externo. [Frontend PR #5](https://github.com/AI-ToDu/ai-todu-webapp/pull/5) integra API, sesiones, idioma, provisión y clima.

El dominio no importa Spring/JPA. Las entidades de persistencia son separadas; converters, embeddables y assemblers pertenecen a infraestructura. Los agregados conservan sus invariantes y los errores esperados se devuelven mediante Result.

#### 5.2.3.5. Execution Evidence for Sprint Review

| Verificación | Resultado y evidencia | Límite |
| --- | --- | --- |
| Backend local | 14 pruebas aprobadas | H2 de desarrollo y pruebas del gateway |
| Backend CI | Suite aprobada con PostgreSQL 17 / Java 21 | Datos aislados; no mide carga empresarial |
| Webapp | 21 pruebas y bundle inicial 443.85 kB | Incluye regresión demo y selección de transporte |
| HTTP público | Entrada 5 → venta 2 / PEN 21 → entrega → saldo 3 | Datos ficticios; no equivale a aceptación de usuarios |
| Open-Meteo/CORS | Respuesta real Lima y origen GitHub Pages autorizado | Clima regional de referencia |
| Outbox | Fallo/reintento y reentrega sin duplicación | Relay e inbox en el monolito, sin broker externo |

[CI backend](https://github.com/AI-ToDu/ai-todu-api/actions) · [CI/Pages frontend](https://github.com/AI-ToDu/ai-todu-webapp/actions).

![Inventario AV2 publicado después de escribir y recargar](assets/inventario-av2-publicado.png)

Evidencia del 8/11/2026: desde Angular se crea el producto ficticio BROWSER-20261108, se reciben dos unidades y se vende una por PEN 12,50. La recarga y el nuevo inicio de sesión conservan una unidad. El otro artículo corresponde al recorrido HTTP anterior. Los datos son sintéticos y no representan resultados comerciales.

#### 5.2.3.6. Services Documentation Evidence for Sprint Review

[Swagger UI](https://ai-todu-api-av2.onrender.com/swagger-ui.html) · [OpenAPI](https://ai-todu-api-av2.onrender.com/v3/api-docs) · [README API](https://github.com/AI-ToDu/ai-todu-api) · [Published Language v1](https://github.com/AI-ToDu/ai-todu-api/blob/main/contracts/integration-messages.v1.schema.json).

La API /api/v1 es el Open Host Service. Usa recursos JSON, Problem Details y códigos estables; Accept-Language selecciona en-US o es-419. Los eventos internos se traducen antes de cruzar contextos. Fachadas públicas y gateways delimitan la integración; no se importan agregados de otros dominios.

#### 5.2.3.7. Software Deployment Evidence for Sprint Review

| Artefacto | Publicación | Estado |
| --- | --- | --- |
| Landing | [Pages](https://ai-todu.github.io/ai-todu-platform/) | Canal estático y CTA |
| Frontend | [Pages](https://ai-todu.github.io/ai-todu-webapp/) | Workflow main aprobado |
| API | [Render / health](https://ai-todu-api-av2.onrender.com/actuator/health) | Servicio gratuito live y UP |
| PostgreSQL | Base aislada aitodu_av2 / usuario aitodu_app | Red privada y sin lectura sobre tablas de otros proyectos |

El runtime recibe solo credenciales propias. La provisión administrativa se ejecutó desde el equipo local con una regla /32 temporal, ya retirada. La instancia gratuita comparte capacidad y caducidad: Dashboard indica 28/11/2026 y la API de Render devuelve su expiración UTC equivalente al 29/11. Se requiere continuidad/exportación antes del vencimiento. El servicio gratuito puede tardar en reactivarse tras inactividad.

#### 5.2.3.8. Team Collaboration Insights during Sprint

PR y CI muestran el incremento técnico asistido autorizado por Kevin. No prueban reuniones, revisión cruzada o participación reciente de todos. Se conservan aportes AV1/TB1 y se espera el tablero y los videos existentes. La entrega distingue autoría histórica, trabajo actual, reflexión individual y comunicación.

## 5.3. Validation Interviews

### 5.3.1. Diseño de entrevistas

Validación es una fase distinta de elicitación: **3–5 personas por segmento**, con consentimiento y grabación autorizada. Para dos segmentos: 6–10 sesiones. Cada persona intenta recibir parcialmente, explicar saldo, vender y seguir entrega sin instrucciones de cada paso. Registrar éxito, errores, tiempo, ayuda y feedback contrario. No afirmar ahorro porcentual sin una referencia medida.

### 5.3.2. Registro de entrevistas

**Pendiente de recibir/verificar videos.** Los registros heredados de Carlos Mendoza y Miguel Rojas no se cuentan sin fuente. Por sesión se requiere ID anonimizado, segmento, fecha, consentimiento, enlace, minutos, tareas, resultado y mejora. Un registro no se cuenta automáticamente como elicitación y validación.

### 5.3.3. Evaluación heurística

| Principio | Criterio de revisión | Evidencia técnica | Pendiente |
| --- | --- | --- | --- |
| Visibilidad | Espera, error y resultado claros | Formularios bloquean doble envío y usan códigos | Comprensión y espera con usuarios |
| Correspondencia | Referencias entre recepción, venta y entrega | Flujo transaccional verificado | Vocabulario con ambos segmentos |
| Prevención | Cantidad, stock y estados válidos | Invariantes y rollback probados | Errores de uso no previstos |
| Control | Anulación y devolución con restricciones | Restitución una vez y retorno acotado | Comprensión y recuperación |
| Consistencia | Material, idioma y PEN | Traducciones y build | Evaluador externo |
| Accesibilidad | Teclado, foco, etiquetas y contraste | Implementación semántica y revisión navegador | Auditoría completa y usuarios |

La inspección técnica no sustituye una evaluación heurística independiente. Evaluador, fecha, severidad y hallazgos requieren registro real.

## 5.4. Video About-the-Product

**Pendiente de enlace y validación.** Requiere 1–3 minutos, Stream/YouTube y publicación embebida en landing al recibir material propio. Guion: problema/segmentos → recepción parcial → rechazo de sobreventa → venta/recibo académico → entrega/receptor → conciliación → límites. Incluir testimonios autorizados de ambos segmentos según Anexo C. No se sustituyen por testimonios generados.

## 5.5. Video About-the-Team

**Pendiente de evidencia real.** Mostrar trabajo, aportes y reflexión de cada participante que corresponda. Las grabaciones históricas se atribuyen con contexto verificable. No se simulan reuniones, integrantes activos ni contribuciones recientes. Enlace, duración, participantes y minutos se completarán al recibir videos.
