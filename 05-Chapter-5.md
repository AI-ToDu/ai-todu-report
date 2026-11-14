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

El repositorio incluye lockfile cuando instala dependencias. La Fake API y landing no requieren paquetes de ejecución. Se usan datos ficticios y archivos de estado excluidos de Git. El tablero de cierre AV2 está enlazado en §5.2.3.3; se retiraron referencias a nombres de repositorios inexistentes, enlaces de ejemplo y herramientas declaradas sin evidencia de uso.

### 5.1.2. Source Code Management

| Repositorio individual | Artefacto | Rama para esta revisión |
| --- | --- | --- |
| [ai-todu-webapp](https://github.com/AI-ToDu/ai-todu-webapp) | Frontend y transporte AV2 | `fix/av2-api-integration` |
| [ai-todu-platform](https://github.com/AI-ToDu/ai-todu-platform) | Landing y acceso al servidor AV2 | `fix/av2-platform-scope` |
| [ai-todu-fake-api](https://github.com/AI-ToDu/ai-todu-fake-api) | Fuente canónica de Fake API, contrato y pruebas | `fix/tb1-readiness` |
| [ai-todu-report](https://github.com/AI-ToDu/ai-todu-report) | Informe, arquitectura y datos | `fix/av2-report-alignment` |
| [ai-todu-api](https://github.com/AI-ToDu/ai-todu-api) | Backend, contratos, migraciones y CI | `fix/av2-domain-foundation` y `fix/av2-runtime-configuration` |

**Workflow:** `main` conserva la línea estable; `develop` integra trabajo; las ramas nuevas usan `fix/<scope>`. AV2 se integra mediante PR con comprobaciones de CI antes del merge. No se reescriben commits históricos. Para el frontend se incorpora `develop` desde la base original de `main`. En landing, la rama predeterminada original ya era `develop`; se documenta esta transición antes de normalizar una futura rama estable, sin mover la publicación durante la revisión.

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
| Documentation | Contribuciones AV1 y actualización de la documentación. | Revisión cruzada y reflexión individual por entrega. |
| Deployment | URLs/configuración de Pages y workflows preparados. | Responsable real, aprobación y evidencia del despliegue de la versión revisada. |

#### 5.2.2.3. Sprint Backlog 2

Las tareas siguientes son la descomposición **actualizada de corrección**; las horas son estimaciones propuestas entre 4 y 8 horas, no una declaración retroactiva de esfuerzo. Kevin es el responsable de coordinar esta actualización.

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

Los aportes originales se enlazan por integrante y módulo. Los commits permiten seguir los cambios y su revisión. Para completar la evidencia, cada integrante debe revisar su contexto, ejecutar un caso principal/alternativo, comentar un PR y explicar una decisión en la exposición con marca de tiempo.

### 5.2.3. Sprint 3

#### 5.2.3.1. Sprint Planning 3

**Hito:** AV2, semana 12. **Registro técnico:** 7–8/11/2026. Calendario, asistentes, duración de ceremonia y compromiso de capacidad no están acreditados. La selección siguiente documenta el incremento trabajado; no reconstruye una reunión.

> Our focus is on enabling an authorized workspace to reconcile receiving, sales and delivery through the deployed API. We believe it delivers a shared and traceable operational record to business owners and warehouse operators. This will be confirmed when a sale and its delivery preserve stock, historical amounts and recipient across sessions, concurrent sales cannot oversell, and invalid or unauthorized operations leave no partial changes.

El criterio técnico se prueba con datos ficticios; la confianza del usuario se contrasta cualitativamente en cinco recorridos guiados. **Responsable actual de priorización, desarrollo y seguimiento: Kevin Junior Salazar Marquina.** No se acredita una ceremonia ni una asignación formal separada de Product Owner y Scrum Master. Los aportes históricos mantienen su atribución.

| Sprint Planning Background | Registro |
| --- | --- |
| Sprint | 3 / AV2 / semana 12 |
| Date / Time / Location | Pendiente: fecha, hora y lugar reales de la ceremonia |
| Prepared by | Kevin Junior Salazar Marquina |
| Attendees | Pendiente de acta o tablero; no se presume asistencia de integrantes retirados |
| Review of previous Sprint | Evidencias TB1 y AV1 conservadas; conclusiones de la reunión pendientes |
| Retrospective of previous Sprint | Pendiente de registro real y acciones acordadas |
| Sprint Goal | Conciliar recepción, venta y entrega mediante API, conservando saldo e importes históricos |
| Sprint Goal Metric | Flujo persistente y rechazos atómicos; cobertura HTTP de las 34 operaciones; aceptación humana pendiente |
| Sprint Velocity | No medida: falta fuente de puntos completados de sprints anteriores |
| Sum of Story Points | Pendiente de estimación del equipo; horas de tareas no equivalen a story points |

#### 5.2.3.2. Aspect Leaders and Collaborators

| Aspecto | Actividad verificada | Responsable y límite |
| --- | --- | --- |
| Development | Backend Java e integración Angular en PR | Kevin Salazar |
| Execution | Pruebas locales, CI PostgreSQL y recorrido HTTP público | Ejecución técnica; About-the-Team en §5.5; exposición técnica pendiente |
| Documentation | Informe, OpenAPI y README | Revisión documental; About-the-Team en §5.5; aprobación académica pendiente |
| Deployment | Pages y API gratuita con PostgreSQL aislado | Autorización de Kevin; evidencias técnicas enlazadas |

La siguiente matriz registra la **responsabilidad actual de AV2**, sin reconstruir colaboración histórica. **L:** responsable del aspecto; **—:** sin nueva participación acreditada en este incremento.

| Aspecto | Kevin | Carlos | Luis | Fernando | Darikson |
| --- | --- | --- | --- | --- | --- |
| Development | L | — | — | — | — |
| Execution | L | — | — | — | — |
| Documentation | L | — | — | — | — |
| Deployment | L | — | — | — | — |

La matriz no es una calificación, acta de reunión ni registro de horas. Los aportes de AV1/TB1 se conservan con sus fuentes.

#### 5.2.3.3. Sprint Backlog 3

Estimaciones de referencia, no horas registradas ni capacidad medida. La prioridad sigue core → soporte → genérico; autenticación es una dependencia técnica, no el primer objetivo del negocio.

| Story Id | Story Title | Task Id | Task Title | Task Description | Estimation (Hours) | Assigned To | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| US09 | Registro de artículo | S3-T01 | Implementar InventoryItem, VOs, movimientos y persistencia separada | Implementar InventoryItem, VOs, movimientos y persistencia separada. Evidencia: Reglas, migraciones y rollback. Cobertura asociada: US10–US14. | 8 h | Kevin Salazar | To-Review |
| US15 | Creación de venta | S3-T02 | Confirmar/anular ventas atómicas con concurrencia e idempotencia | Confirmar/anular ventas atómicas con concurrencia e idempotencia. Evidencia: Solo una de seis ventas de la última unidad se acepta. Cobertura asociada: US16–US18, TS35. | 8 h | Kevin Salazar | To-Review |
| US19 | Manifiesto de despacho | S3-T03 | Preparar/iniciar/entregar manifiesto con recursos existentes | Preparar/iniciar/entregar manifiesto con recursos existentes. Evidencia: Receptor y saldo sin doble descuento. Cobertura asociada: US20–US22, US37. | 8 h | Kevin Salazar | To-Review |
| US35 | Abastecimiento y recepción parcial | S3-T04 | Implementar compra y recepción parcial acotada | Implementar compra y recepción parcial acotada. Evidencia: Exceso y líneas repetidas rechazados. Cobertura asociada: TS28–TS30. | 8 h | Kevin Salazar | To-Review |
| US36 | Devolución trazable | S3-T05 | Conciliar devoluciones e indicadores | Conciliar devoluciones e indicadores. Evidencia: Restock/loss y límite de devolución. Cobertura asociada: US23. | 4 h | Kevin Salazar | To-Review |
| US26 | Alerta de stock mínimo | S3-T06 | Traducir eventos internos a PL v1 con Outbox e inbox | Traducir eventos internos a PL v1 con Outbox e inbox. Evidencia: Fallo/reintento y reentrega sin duplicación. Cobertura asociada: TS34. | 8 h | Kevin Salazar | To-Review |
| TS33 | Clima regional | S3-T07 | Integrar Open-Meteo mediante gateway y caché | Integrar Open-Meteo mediante gateway y caché. Evidencia: Traducción/caché/fallo probados y llamada real. Cobertura asociada: Integración externa de Logistics. | 4 h | Kevin Salazar | To-Review |
| US01 | Registro de cuenta | S3-T08 | Implementar JWT revocables, BCrypt, roles y aislamiento | Implementar JWT revocables, BCrypt, roles y aislamiento. Evidencia: Sesión y denegaciones verificadas. Cobertura asociada: US02–US03, US28–US29. | 8 h | Kevin Salazar | To-Review |
| US33 | Idioma de aplicación | S3-T09 | Integrar Angular con API y separar sesiones demo/servidor | Integrar Angular con API y separar sesiones demo/servidor. Evidencia: 21 pruebas y build Pages aprobados. Cobertura asociada: Integración del transporte AV2. | 8 h | Kevin Salazar | To-Review |
| Enabler AV2 | Despliegue | S3-T10 | Desplegar API/DB/webapp y comprobar recorrido | Desplegar API/DB/webapp y comprobar recorrido. Evidencia: Render live, health UP y Pages. | 8 h | Kevin Salazar | To-Review |
| Enabler AV2 | Documentación | S3-T11 | Alinear informe, diagramas y servicios | Alinear informe, diagramas y servicios. Evidencia: Fuentes y exportación de esta versión. | 8 h | Kevin Salazar | To-Review |
| Enabler AV2 | Validación y comunicación | S3-T12 | Incorporar entrevistas, tablero, videos y reflexión | Incorporar entrevistas, tablero, videos y reflexión. Evidencia: Cinco fichas y ocho hallazgos; tres ediciones publicadas en YouTube y Stream, con lectura concedida al docente; About-the-Team individual publicado en YouTube (§5.5), copia institucional pendiente. | 8 h | Kevin Salazar | In-Process |

Las filas identifican una historia principal por tarea; las historias asociadas se indican en Task Description. Los enablers transversales corresponden a publicación, documentación y evaluación. El [tablero de cierre AV2 / Sprint 3](https://trello.com/b/82JkmgZH/ai-todu-av2-sprint-3) fue creado el 13/11/2026 y es público: el docente puede consultar tareas y estados sin invitación. Contiene doce tarjetas y cuatro estados para el trabajo actual; no se reconstruyen las transiciones de los sprints 1 y 2. Status utiliza To-do / In-Process / To-Review / Done. To-Review indica artefacto técnico disponible para revisión; no acredita transición histórica del tablero, aceptación del equipo ni tiempo trabajado. Assigned To identifica la responsabilidad actual de Kevin.

| Tarjetas del cierre actual | Tareas del incremento | Criterio de seguimiento |
| --- | --- | --- |
| S3-C01, S3-C03, S3-C07–C10, S3-C12 | S3-T12 · validación y comunicación | Cinco originales publicados; fichas/hallazgos y edición disponibles; publicación institucional y reflexión se cierran con fuente real. |
| S3-C02, S3-C05, S3-C11 | S3-T11 · documentación | Fotografías recuperadas, fuentes consistentes y exportación verificada; revisión de archivos de entrega. |
| S3-C04 | S3-T09 · frontend | Acciones, vocabulario, historial, esperas y alertas; PR #7 con comprobación técnica. |
| S3-C06 | S3-T01–T08 y S3-T10 | Revisión de reglas, API, Outbox, CI y versión desplegada. |

Una tarjeta puede terminar una parte acotada: S3-C12 registra recibir/publicar cinco originales; no afirma cerrar toda la validación. Las tarjetas de revisión y sus fuentes no equivalen a aceptación académica.

#### 5.2.3.4. Development Evidence for Sprint Review

| Repository | Branch | Commit Id | Commit Message | Commit Message Body | Commited on (Date) |
| --- | --- | --- | --- | --- | --- |
| [ai-todu-api](https://github.com/AI-ToDu/ai-todu-api) | `fix/av2-api-contracts` | [067abc7bd258](https://github.com/AI-ToDu/ai-todu-api/commit/067abc7bd2583d0286dc1cc4e84c17d292c0afc2) | fix: align HTTP contracts and CQRS boundaries | Document all 34 service operations with concrete success and ProblemDetail schemas. Map expected failures directly to HTTP, validate transport resources and keep response status consistent.<br><br>Separate command/query and session contracts from implementation classes, move REST transformation into assemblers and exercise every operation with sanitized evidence. Verification: 15 local tests pass with H2; CI independently verifies PostgreSQL 17 and Java 21.<br> | 2026-11-08T13:44:13-05:00 |
| [ai-todu-webapp](https://github.com/AI-ToDu/ai-todu-webapp) | `fix/av2-readme-consistency` | [36944ba02bf2](https://github.com/AI-ToDu/ai-todu-webapp/commit/36944ba02bf23218cb1222bd8fc6852aa01993e7) | docs: align README with the published AV2 increment | Preserve the original structure and historical team attribution while linking current branches and distinguishing server contracts from the demonstration API.<br> | 2026-11-08T13:45:09-05:00 |
| [ai-todu-platform](https://github.com/AI-ToDu/ai-todu-platform) | `fix/av2-readme-consistency` | [737a4f09820c](https://github.com/AI-ToDu/ai-todu-platform/commit/737a4f09820cd463f7b551f8b35a57b7cb39b8b9) | docs: align README with the published AV2 increment | Preserve the original structure and historical team attribution while linking current branches and distinguishing server contracts from the demonstration API.<br> | 2026-11-08T13:45:10-05:00 |
| [ai-todu-fake-api](https://github.com/AI-ToDu/ai-todu-fake-api) | `fix/av2-readme-consistency` | [2b4c05a89593](https://github.com/AI-ToDu/ai-todu-fake-api/commit/2b4c05a89593bbc281eeeaf559f2296ba44d9525) | docs: align README with the published AV2 increment | Preserve the original structure and historical team attribution while linking current branches and distinguishing server contracts from the demonstration API.<br> | 2026-11-08T13:45:10-05:00 |
| [ai-todu-report](https://github.com/AI-ToDu/ai-todu-report) | `fix/av2-design-evidence` | [0ac9c2e78391](https://github.com/AI-ToDu/ai-todu-report/commit/0ac9c2e783918efc1dd0d53d085060e8ed48fdef) | docs: add measurable goals and editable AV2 design evidence | Sin cuerpo adicional | 2026-11-08T09:35:50-05:00 |
| [ai-todu-report](https://github.com/AI-ToDu/ai-todu-report) | `fix/av2-report-evidence` | [968efcafa0f4](https://github.com/AI-ToDu/ai-todu-report/commit/968efcafa0f43519b78cc1e0b0b72cad5a16739a) | docs: align AV2 service evidence and DDD views with the rubric | Document all 34 service operations with sanitized HTTP examples and Swagger captures. Make current AV2 architecture, Transactional Outbox Pattern and 19-table physical views primary while preserving the historical design.<br><br>Complete Sprint Planning, backlog and commit evidence columns, refine 37 alternative scenarios, and describe screen states and user flows. Keep unknown human evidence pending. Validation: synchronized report, local assets, endpoint catalogue and physical dictionary checks pass. | 2026-11-08T13:59:44-05:00 |

Los hashes y fechas proceden del historial Git local de los repositorios identificados. Las filas del informe identifican la evidencia de diseño previa y el commit de documentación que incorpora esta revisión. La anotación de trazabilidad posterior no modifica la autoría de esos cambios. Un commit no acredita una reunión Scrum ni participación de un integrante.

[Backend PR #1](https://github.com/AI-ToDu/ai-todu-api/pull/1) implementa contextos, agregados, recursos, migraciones y Outbox. [PR #2](https://github.com/AI-ToDu/ai-todu-api/pull/2) retira administración del runtime y prueba el gateway externo. [Frontend PR #5](https://github.com/AI-ToDu/ai-todu-webapp/pull/5) integra API, sesiones, idioma, provisión y clima.

El dominio no importa Spring/JPA. Las entidades de persistencia son separadas; converters, embeddables y assemblers pertenecen a infraestructura. Los agregados conservan sus invariantes y los errores esperados se devuelven mediante Result.

#### 5.2.3.5. Execution Evidence for Sprint Review

| Verificación | Resultado y evidencia | Límite |
| --- | --- | --- |
| Backend local 8/11 | 15 pruebas aprobadas; 34 operaciones y rechazos HTTP contrastados | H2 de desarrollo; clima fixture en el recorrido de contratos; gateway probado por separado |
| Backend publicado 13/11 | 17 pruebas locales y CI PostgreSQL 17 / Java 21; referencia de producto en alertas | [PR #4 integrado](https://github.com/AI-ToDu/ai-todu-api/pull/4), [CI 43550024736](https://github.com/AI-ToDu/ai-todu-api/actions/runs/43550024736); V5 aplicada en Render y referencia comprobada por HTTP público |
| Frontend revisión 13/11 | 21 pruebas y build; venta por teclado, error de stock, responsable y navegación alerta → SKU; acciones dentro de 390 px | [PR #7 integrado](https://github.com/AI-ToDu/ai-todu-webapp/pull/7); Pages publicado con CI aprobado; navegador demo local, no una segunda sesión con participantes |
| Backend CI | 15 pruebas aprobadas con PostgreSQL 17 / Java 21, commit 067abc7 | [Run 42511549771](https://github.com/AI-ToDu/ai-todu-api/actions/runs/42511549771); datos aislados, no mide carga empresarial |
| Webapp | 21 pruebas y bundle inicial 443.85 kB | Incluye regresión demo y selección de transporte |
| HTTP público | Entrada 5 → venta 2 / PEN 21 → entrega → saldo 3 | Datos ficticios; no equivale a aceptación de usuarios |
| Open-Meteo/CORS | Respuesta real Lima y origen GitHub Pages autorizado | Clima regional de referencia |
| Outbox | Fallo/reintento y reentrega sin duplicación | Relay e inbox en el monolito, sin broker externo |

[CI backend](https://github.com/AI-ToDu/ai-todu-api/actions) · [CI/Pages frontend](https://github.com/AI-ToDu/ai-todu-webapp/actions).

![Inventario AV2 publicado después de escribir y recargar](assets/inventario-av2-publicado.png)

Evidencia del 8/11/2026: desde Angular se crea el producto ficticio BROWSER-20261108, se reciben dos unidades y se vende una por PEN 12,50. La recarga y el nuevo inicio de sesión conservan una unidad. El otro artículo corresponde al recorrido HTTP anterior. Los datos son sintéticos y no representan resultados comerciales.

##### Comprobación del incremento público del 13/11/2026

Backend [e139148](https://github.com/AI-ToDu/ai-todu-api/commit/e13914816c3016c3f4cd5de299964654c0cf6be2) en Render, deploy `dep-dbru67l6e07s73895tp0` con estado live. Los logs confirman V5 aplicada y `/actuator/health` devuelve 200/UP. Un espacio de trabajo ficticio aislado recibe 3 unidades y vende 1; el saldo final es 2. `GET /notifications` devuelve LOW_STOCK con el mismo `productId`; PATCH conserva la referencia al marcar el aviso leído. La sesión se cierra con 204. [Registro HTTP sanitizado](assets/notification-live-verification-av2.json).

Frontend [df8c119](https://github.com/AI-ToDu/ai-todu-webapp/commit/df8c119bca2d87abc7bab3b6d9c73eb91b0c21d3), con [publicación Pages aprobada](https://github.com/AI-ToDu/ai-todu-webapp/actions/runs/43551273943). Landing [PR #6 integrado](https://github.com/AI-ToDu/ai-todu-platform/pull/6), con el video verificado en la URL pública. Estas comprobaciones son técnicas; no miden impacto empresarial ni aceptación de usuarios.

##### Product Navigation del incremento AV2

[Recorrido completo en YouTube, 7:59](https://youtu.be/yJ4Z1_eoIPs) · [Microsoft Stream](https://upcedupe-my.sharepoint.com/personal/u202417747_upc_edu_pe/_layouts/15/stream.aspx?id=%2Fpersonal%2Fu202417747_upc_edu_pe%2FDocuments%2FAI-ToDu+AV2+Sprint+3+-+Evidencias%2FAI-ToDu-Product-Navigation-AV2-revision.mp4). El montaje incluye **3:02 de landing** y **4:51 de aplicación**, más cinco segundos de cierre. El archivo dura aproximadamente 7:58; YouTube lo muestra como 7:59. Se identifican las sesiones guiadas y los datos ficticios. El último tramo incluye la confirmación de entrega, sin afirmar transferencia entre sedes ni entregas parciales.

| Inicio | Recorrido | Fuente original |
| --- | --- | --- |
| 00:00 | Landing: presentación, contenido y acceso | Kimberlin 00:59–02:43; Shirley 01:00–02:13; portada inicial de 5 s |
| 03:02 | Aplicación: inventario e historial | Shirley 03:20–04:53; portada de 5 s |
| 04:40 | Recepción de mercadería | Shirley 05:02–05:45 |
| 05:23 | Venta y comprobante demo | Shirley 06:16–06:48 |
| 05:55 | Despacho y confirmación de entrega | Shirley 07:28–09:26 |
| 07:53 | Cierre académico | Portada final de 5 s |

![Confirmación de entrega en el recorrido de navegación, 07:41](assets/validation/navigation-av2.png)

#### 5.2.3.6. Services Documentation Evidence for Sprint Review

**Versión documentada:** backend [6014719](https://github.com/AI-ToDu/ai-todu-api/commit/60147198e5e7776059f2177d495c2d9f7ebb509c), integrado mediante [PR #4](https://github.com/AI-ToDu/ai-todu-api/pull/4). Las 17 pruebas y el contrato de 34 operaciones pasan en CI Java 21/PostgreSQL 17 ([run 43550024736](https://github.com/AI-ToDu/ai-todu-api/actions/runs/43550024736)). Los ejemplos siguientes proceden de la ejecución local del 13/11/2026; la comprobación pública se documenta por separado.

[Swagger UI](https://ai-todu-api-av2.onrender.com/swagger-ui.html) · [OpenAPI](https://ai-todu-api-av2.onrender.com/v3/api-docs) · [Repositorio Web Services](https://github.com/AI-ToDu/ai-todu-api) · [Published Language v1](https://github.com/AI-ToDu/ai-todu-api/blob/main/contracts/integration-messages.v1.schema.json).

La API `/api/v1` es el **Open Host Service**. Recursos JSON y OpenAPI definen el contrato HTTP; los esquemas versionados definen el Published Language de integración. Los eventos internos se traducen dentro de su bounded context antes de cruzarlo. Tenant y rol provienen de la identidad autenticada; no se reciben desde el cuerpo. Las colecciones usan `{"items":[]}`.

**Bases:** desarrollo `http://localhost:8080/api/v1`; despliegue `https://ai-todu-api-av2.onrender.com/api/v1`. Se anexa el path de cada ficha a la base correspondiente. No hay parámetros query de paginación ni filtros de servidor implementados. Todo `{id}` es UUID de un recurso del espacio autenticado.

**Headers:** `Content-Type: application/json` cuando hay cuerpo; `Authorization: Bearer <token>` en operaciones protegidas; `Accept-Language: en-US` o `es-419` para mensajes localizados. `POST /sales` admite además `Idempotency-Key` opcional. Los ejemplos usan identidades ficticias y ocultan contraseña/token. Los UUID de respuesta deben sustituir las referencias ilustrativas de la siguiente petición.

**Origen y límites:** las solicitudes y respuestas siguientes provienen de ServicesContractIntegrationTest, ejecutado localmente con H2 en modo PostgreSQL y datos sintéticos. El ejemplo de clima usa un fixture determinista; WeatherGatewayTest verifica traducción/caché/fallo y la integración pública previa documenta Open-Meteo real. Esta ejecución local no acredita despliegue ni validación con personas. La verificación CI PostgreSQL se identifica separadamente por commit y run.

| Código | Significado y contrato |
| --- | --- |
| 200 | Consulta o transición aceptada; devuelve el recurso descrito |
| 201 | Creación aceptada; devuelve el recurso; replay idempotente de venta conserva 201 |
| 204 | Sesión revocada; respuesta sin cuerpo |
| 400 | JSON ilegible, parámetro inválido o validación de entrada incompleta |
| 401 / 403 | Sesión ausente/inválida/revocada o rol sin permiso |
| 404 | Identificador/referencia no encontrado en el espacio autenticado |
| 409 | Duplicado o conflicto de negocio, como stock insuficiente |
| 422 | Regla del dominio rechaza valores válidos a nivel de transporte |
| 503 | Proveedor climático no disponible |
| 500 | Fallo inesperado; no expone detalles internos |

Los errores usan `application/problem+json` con `type`, `title`, `status`, `detail` y `code`. HTTP y `status` del cuerpo coinciden. Cada ficha lista únicamente los códigos declarados para esa operación; una declaración no implica haber provocado todos sus fallos.

[OpenAPI de esta versión](assets/services-openapi-av2.json) · [Solicitudes y respuestas sanitizadas](assets/service-http-examples-av2.json).

##### Interacción real con Swagger UI

Capturas locales del 8/11/2026, con datos ficticios y base H2 en memoria. Las imágenes documentan respuestas observadas y se distinguen del despliegue público.

![Swagger: producto creado con 201 y ProductResource](assets/swagger-product-201.png)

POST /products crea un artículo con saldo cero. El identificador retornado permite registrar la recepción posterior.

![Swagger: venta rechazada con 409 y código INSUFFICIENT_STOCK](assets/swagger-sale-409.png)

Sin saldo, POST /sales devuelve 409. La prueba de integración comprueba que no quedan venta, salidas ni Outbox parciales.

![Swagger: venta confirmada con 201 después de recibir existencias](assets/swagger-sale-201.png)

Después de recibir dos unidades, vender una devuelve 201 con líneas históricas, total PEN 12,50 y referencia de recibo académico.

##### Catálogo de las 34 operaciones

| Verbo | Ruta | Acción / contexto | Éxito | Roles |
| --- | --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Register a workspace / IAM | 201 | Public |
| POST | `/api/v1/auth/login` | Create a session / IAM | 200 | Public |
| GET | `/api/v1/auth/me` | Read the current identity / IAM | 200 | Any active role |
| POST | `/api/v1/auth/logout` | Revoke the current session / IAM | 204 | Any active role |
| GET | `/api/v1/employees` | List employees / IAM | 200 | ADMIN |
| POST | `/api/v1/employees` | Create an employee / IAM | 201 | ADMIN |
| GET | `/api/v1/products` | List products / Inventory | 200 | Any active role |
| POST | `/api/v1/products` | Register a product / Inventory | 201 | ADMIN, WAREHOUSE |
| PATCH | `/api/v1/products/{id}` | Change conservation status / Inventory | 200 | ADMIN, WAREHOUSE |
| GET | `/api/v1/movements` | List stock movements / Inventory | 200 | ADMIN, WAREHOUSE |
| POST | `/api/v1/movements` | Record a stock movement / Inventory | 201 | ADMIN, WAREHOUSE |
| GET | `/api/v1/suppliers` | List suppliers / Procurement | 200 | ADMIN, WAREHOUSE |
| POST | `/api/v1/suppliers` | Register a supplier / Procurement | 201 | ADMIN, WAREHOUSE |
| GET | `/api/v1/purchases` | List purchase orders / Procurement | 200 | ADMIN, WAREHOUSE |
| POST | `/api/v1/purchases` | Place a purchase order / Procurement | 201 | ADMIN, WAREHOUSE |
| POST | `/api/v1/purchases/{id}/receipts` | Receive a purchase partially or fully / Procurement | 201 | ADMIN, WAREHOUSE |
| GET | `/api/v1/sales` | List sales / Sales | 200 | ADMIN, SALES |
| POST | `/api/v1/sales` | Confirm a sale / Sales | 201 | ADMIN, SALES |
| POST | `/api/v1/sales/{id}/cancel` | Cancel a sale / Sales | 200 | ADMIN, SALES |
| GET | `/api/v1/returns` | List customer returns / Returns | 200 | ADMIN, SALES |
| POST | `/api/v1/returns` | Record a customer return / Returns | 201 | ADMIN, SALES |
| GET | `/api/v1/dispatches` | List dispatch manifests / Logistics | 200 | ADMIN, LOGISTICS |
| POST | `/api/v1/dispatches` | Prepare a dispatch / Logistics | 201 | ADMIN, LOGISTICS |
| PATCH | `/api/v1/dispatches/{id}` | Transition a dispatch / Logistics | 200 | ADMIN, LOGISTICS |
| POST | `/api/v1/dispatches/{id}/incidents` | Record a delivery incident / Logistics | 201 | ADMIN, LOGISTICS |
| GET | `/api/v1/dispatch-candidates` | List eligible sales / Logistics | 200 | ADMIN, LOGISTICS |
| GET | `/api/v1/drivers` | List drivers / Logistics | 200 | ADMIN, LOGISTICS |
| POST | `/api/v1/drivers` | Register a driver / Logistics | 201 | ADMIN, LOGISTICS |
| GET | `/api/v1/vehicles` | List vehicles / Logistics | 200 | ADMIN, LOGISTICS |
| POST | `/api/v1/vehicles` | Register a vehicle / Logistics | 201 | ADMIN, LOGISTICS |
| GET | `/api/v1/logistics/weather` | Read regional Lima weather / Logistics | 200 | ADMIN, LOGISTICS |
| GET | `/api/v1/notifications` | List notifications / Notifications | 200 | Any active role |
| PATCH | `/api/v1/notifications/{id}` | Mark a notification as read / Notifications | 200 | Any active role |
| GET | `/api/v1/metrics` | Read operational metrics / Reporting | 200 | ADMIN |

##### Servicio 01. Register a workspace

**POST `/api/v1/auth/register`** · Contexto IAM · Permisos: Public.

Create a company and its first administrator; email must be unique.

**Recurso de solicitud:** `RegistrationResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `name` | `string` | Obligatorio |
| `company` | `string` | Obligatorio |
| `email` | `string` | Obligatorio; email |
| `password` | `string` | Obligatorio; registro: mínimo 8 caracteres y máximo 72 bytes UTF-8 |

Solicitud de ejemplo:

```json
{"name":"Contract review","company":"Synthetic company","email":"contracts-78e3132e-6d31-46ee-9001-afd9fd435084@example.test","password":"[REDACTED]"}
```

**Respuesta:** 201 con `UserResource`.

Ejemplo observado:

```json
{"id":"7f87254a-c54f-4a82-a01b-f016951d697c","tenantId":"097ff020-2910-4ed6-93da-e8b259e38f22","name":"Contract review","email":"contracts-78e3132e-6d31-46ee-9001-afd9fd435084@example.test","role":"ADMIN"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 02. Create a session

**POST `/api/v1/auth/login`** · Contexto IAM · Permisos: Public.

Authenticate an active account and return a revocable JWT.

**Recurso de solicitud:** `LoginResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `email` | `string` | Obligatorio; email |
| `password` | `string` | Obligatorio; registro: mínimo 8 caracteres y máximo 72 bytes UTF-8 |

Solicitud de ejemplo:

```json
{"email":"contracts-78e3132e-6d31-46ee-9001-afd9fd435084@example.test","password":"[REDACTED]"}
```

**Respuesta:** 200 con `SessionResource`.

Ejemplo observado:

```json
{"token":"[REDACTED]","user":{"id":"7f87254a-c54f-4a82-a01b-f016951d697c","tenantId":"097ff020-2910-4ed6-93da-e8b259e38f22","name":"Contract review","email":"contracts-78e3132e-6d31-46ee-9001-afd9fd435084@example.test","role":"ADMIN"}}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Invalid credentials or inactive account; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 03. Read the current identity

**GET `/api/v1/auth/me`** · Contexto IAM · Permisos: Any active role.

Read the authenticated identity; tenant is derived from the token.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `UserResource`.

Ejemplo observado:

```json
{"id":"7f87254a-c54f-4a82-a01b-f016951d697c","tenantId":"097ff020-2910-4ed6-93da-e8b259e38f22","name":"Contract review","email":"contracts-78e3132e-6d31-46ee-9001-afd9fd435084@example.test","role":"ADMIN"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 04. Revoke the current session

**POST `/api/v1/auth/logout`** · Contexto IAM · Permisos: Any active role.

Revoke the presented token; later access with it returns 401.

**Solicitud:** sin cuerpo. El token que se revoca es el presentado en Authorization.

**Respuesta:** 204 sin cuerpo.

**Interpretación:** La sesión deja de autorizar solicitudes; el cuerpo vacío es intencional.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 05. List employees

**GET `/api/v1/employees`** · Contexto IAM · Permisos: ADMIN.

List employees in the authenticated workspace.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceEmployeeResource`.

Ejemplo observado:

```json
{"items":[{"id":"7f87254a-c54f-4a82-a01b-f016951d697c","name":"Contract review","email":"contracts-78e3132e-6d31-46ee-9001-afd9fd435084@example.test","role":"ADMIN","active":true},{"id":"525db239-6865-4dd9-8c9d-0b6ccd721c7e","name":"Operator","email":"employee-b6694a6d-5e34-43b7-93f7-6a42f90f4f2b@example.test","role":"WAREHOUSE","active":true}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 06. Create an employee

**POST `/api/v1/employees`** · Contexto IAM · Permisos: ADMIN.

Provision a role and initial password; no password or hash is returned.

**Recurso de solicitud:** `CreateEmployeeResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `name` | `string` | Obligatorio |
| `email` | `string` | Obligatorio; email |
| `role` | `string` | Obligatorio; Valores: ADMIN, WAREHOUSE, SALES, LOGISTICS |
| `password` | `string` | Obligatorio; registro: mínimo 8 caracteres y máximo 72 bytes UTF-8 |

Solicitud de ejemplo:

```json
{"name":"Operator","email":"employee-b6694a6d-5e34-43b7-93f7-6a42f90f4f2b@example.test","role":"WAREHOUSE","password":"[REDACTED]"}
```

**Respuesta:** 201 con `EmployeeResource`.

Ejemplo observado:

```json
{"id":"525db239-6865-4dd9-8c9d-0b6ccd721c7e","name":"Operator","email":"employee-b6694a6d-5e34-43b7-93f7-6a42f90f4f2b@example.test","role":"WAREHOUSE","active":true}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 07. List products

**GET `/api/v1/products`** · Contexto Inventory · Permisos: Any active role.

List products in the authenticated workspace; no server-side pagination or filters.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceProductResource`.

Ejemplo observado:

```json
{"items":[{"id":"305ced5a-9473-442c-9b19-1137ff3304ce","sku":"CONTRACT-001","name":"Example item","quantity":0,"price":12.5,"cost":7.0,"minimum":1,"conservation":"GOOD"}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 08. Register a product

**POST `/api/v1/products`** · Contexto Inventory · Permisos: ADMIN, WAREHOUSE.

Register a unique workspace SKU with zero initial stock. Amounts are PEN.

**Recurso de solicitud:** `CreateProductResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `sku` | `string` | Obligatorio |
| `name` | `string` | Obligatorio |
| `price` | `number` | Obligatorio; PEN ≥ 0; precisión de centavos |
| `cost` | `number` | Obligatorio; PEN ≥ 0; precisión de centavos |
| `minimum` | `integer` | Obligatorio; int32 |

Solicitud de ejemplo:

```json
{"sku":"CONTRACT-001","name":"Example item","price":12.5,"cost":7,"minimum":1}
```

**Respuesta:** 201 con `ProductResource`.

Ejemplo observado:

```json
{"id":"305ced5a-9473-442c-9b19-1137ff3304ce","sku":"CONTRACT-001","name":"Example item","quantity":0,"price":12.5,"cost":7.0,"minimum":1,"conservation":"GOOD"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 09. Change conservation status

**PATCH `/api/v1/products/{id}`** · Contexto Inventory · Permisos: ADMIN, WAREHOUSE.

Change conservation; this action does not edit price or stock.

**Path:** `id` UUID obligatorio; identificador de artículo.

**Recurso de solicitud:** `ConservationResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `conservation` | `string` | Obligatorio; Valores: GOOD, DAMAGED, QUARANTINED |

Solicitud de ejemplo:

```json
{"conservation":"GOOD"}
```

**Respuesta:** 200 con `ProductResource`.

Ejemplo observado:

```json
{"id":"305ced5a-9473-442c-9b19-1137ff3304ce","sku":"CONTRACT-001","name":"Example item","quantity":0,"price":12.5,"cost":7.0,"minimum":1,"conservation":"GOOD"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 10. List stock movements

**GET `/api/v1/movements`** · Contexto Inventory · Permisos: ADMIN, WAREHOUSE.

Read the audit history of signed stock movements.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceMovementResponseResource`.

Ejemplo observado:

```json
{"items":[{"id":"da0276c3-1112-41cd-a6bc-c4db962cd799","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","delta":5,"type":"RECEIPT","reason":"Initial receipt","actorId":"7f87254a-c54f-4a82-a01b-f016951d697c","createdAt":"2026-11-14T03:04:20.793988Z"}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 11. Record a stock movement

**POST `/api/v1/movements`** · Contexto Inventory · Permisos: ADMIN, WAREHOUSE.

Apply RECEIPT or ISSUE in whole positive units; an issue cannot exceed available stock.

**Recurso de solicitud:** `MovementResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `productId` | `string` | Obligatorio; uuid |
| `quantity` | `number` | Obligatorio; entero positivo |
| `type` | `string` | Obligatorio; Valores: RECEIPT, ISSUE, LOSS |
| `reason` | `string` | Obligatorio |

Solicitud de ejemplo:

```json
{"productId":"305ced5a-9473-442c-9b19-1137ff3304ce","quantity":5,"type":"RECEIPT","reason":"Initial receipt"}
```

**Respuesta:** 201 con `ProductResource`.

Ejemplo observado:

```json
{"id":"305ced5a-9473-442c-9b19-1137ff3304ce","sku":"CONTRACT-001","name":"Example item","quantity":5,"price":12.5,"cost":7.0,"minimum":1,"conservation":"GOOD"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 12. List suppliers

**GET `/api/v1/suppliers`** · Contexto Procurement · Permisos: ADMIN, WAREHOUSE.

Read suppliers belonging to this workspace.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceSupplierResource`.

Ejemplo observado:

```json
{"items":[{"id":"4986775d-e1c8-456e-9144-19e7981b91c1","name":"Example supplier","contact":"supplier@example.test"}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 13. Register a supplier

**POST `/api/v1/suppliers`** · Contexto Procurement · Permisos: ADMIN, WAREHOUSE.

Register supplier name and contact information.

**Recurso de solicitud:** `CreateSupplierResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `name` | `string` | Obligatorio |
| `contact` | `string` | Obligatorio |

Solicitud de ejemplo:

```json
{"name":"Example supplier","contact":"supplier@example.test"}
```

**Respuesta:** 201 con `SupplierResource`.

Ejemplo observado:

```json
{"id":"4986775d-e1c8-456e-9144-19e7981b91c1","name":"Example supplier","contact":"supplier@example.test"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 14. List purchase orders

**GET `/api/v1/purchases`** · Contexto Procurement · Permisos: ADMIN, WAREHOUSE.

Read orders and ordered/received quantities.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourcePurchaseResource`.

Ejemplo observado:

```json
{"items":[{"id":"5dbfad60-0379-4422-9b34-1fe9946bcbd7","number":"PO-5dbfad60","supplierId":"4986775d-e1c8-456e-9144-19e7981b91c1","status":"OPEN","createdAt":"2026-11-14T03:04:20.886128Z","lines":[{"id":"8084851c-1d58-48d5-b37f-6bcbf2fd0edb","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","quantity":3,"received":0}]}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 15. Place a purchase order

**POST `/api/v1/purchases`** · Contexto Procurement · Permisos: ADMIN, WAREHOUSE.

Create an order for an existing supplier and distinct workspace products.

**Recurso de solicitud:** `PlacePurchaseResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `supplierId` | `string` | Obligatorio; uuid |
| `lines` | `List<RequestedPurchaseLineResource>` | Obligatorio |

Solicitud de ejemplo:

```json
{"supplierId":"4986775d-e1c8-456e-9144-19e7981b91c1","lines":[{"productId":"305ced5a-9473-442c-9b19-1137ff3304ce","quantity":3}]}
```

Elementos `RequestedPurchaseLineResource`:

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `productId` | `string` | Obligatorio; uuid |
| `quantity` | `number` | Obligatorio; entero positivo |

**Respuesta:** 201 con `PurchaseResource`.

Ejemplo observado:

```json
{"id":"5dbfad60-0379-4422-9b34-1fe9946bcbd7","number":"PO-5dbfad60","supplierId":"4986775d-e1c8-456e-9144-19e7981b91c1","status":"OPEN","createdAt":"2026-11-14T03:04:20.886127500Z","lines":[{"id":"8084851c-1d58-48d5-b37f-6bcbf2fd0edb","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","quantity":3,"received":0}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 16. Receive a purchase partially or fully

**POST `/api/v1/purchases/{id}/receipts`** · Contexto Procurement · Permisos: ADMIN, WAREHOUSE.

Receive positive quantities by order line; exceeding outstanding units rolls back the entire receipt.

**Path:** `id` UUID obligatorio; identificador de compra.

**Recurso de solicitud:** `ReceivePurchaseResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `lines` | `List<ReceivedPurchaseLineResource>` | Obligatorio |

Solicitud de ejemplo:

```json
{"lines":[{"lineId":"8084851c-1d58-48d5-b37f-6bcbf2fd0edb","quantity":2}]}
```

Elementos `ReceivedPurchaseLineResource`:

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `lineId` | `string` | Obligatorio; uuid |
| `quantity` | `number` | Obligatorio; entero positivo |

**Respuesta:** 201 con `PurchaseResource`.

Ejemplo observado:

```json
{"id":"5dbfad60-0379-4422-9b34-1fe9946bcbd7","number":"PO-5dbfad60","supplierId":"4986775d-e1c8-456e-9144-19e7981b91c1","status":"PARTIAL","createdAt":"2026-11-14T03:04:20.886128Z","lines":[{"id":"8084851c-1d58-48d5-b37f-6bcbf2fd0edb","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","quantity":3,"received":2}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 17. List sales

**GET `/api/v1/sales`** · Contexto Sales · Permisos: ADMIN, SALES.

Read sales, immutable commercial line snapshots and academic receipt references.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceSaleResource`.

Ejemplo observado:

```json
{"items":[{"id":"98771c96-002f-4faa-971c-4fdfe9f60d3c","number":"SAL-98771c96","status":"CONFIRMED","total":25.0,"createdAt":"2026-11-14T03:04:20.982749Z","lines":[{"id":"8ab855cb-5863-4d27-9160-d3163732c4cf","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","name":"Example item","sku":"CONTRACT-001","quantity":2,"price":12.5,"cost":7.0,"returned":0}],"receipt":{"number":"REC-SAL-98771c96"}}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 18. Confirm a sale

**POST `/api/v1/sales`** · Contexto Sales · Permisos: ADMIN, SALES.

Atomically record sale, stock issues and integration messages. An identical Idempotency-Key replay returns the existing sale with 201; a conflicting payload returns 409.

**Recurso de solicitud:** `ConfirmSaleResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `lines` | `List<LineRequest>` | Obligatorio |

Solicitud de ejemplo:

```json
{"lines":[{"productId":"305ced5a-9473-442c-9b19-1137ff3304ce","quantity":2}]}
```

Elementos `LineRequest`:

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `productId` | `string` | Obligatorio; uuid |
| `quantity` | `number` | Obligatorio; entero positivo |

**Header opcional:** `Idempotency-Key`; repetirlo con iguales productos/cantidades conserva la venta y devuelve 201; con otro contenido devuelve 409.

**Respuesta:** 201 con `SaleResource`.

Ejemplo observado:

```json
{"id":"98771c96-002f-4faa-971c-4fdfe9f60d3c","number":"SAL-98771c96","status":"CONFIRMED","total":25.0,"createdAt":"2026-11-14T03:04:20.982748600Z","lines":[{"id":"8ab855cb-5863-4d27-9160-d3163732c4cf","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","name":"Example item","sku":"CONTRACT-001","quantity":2,"price":12.5,"cost":7.0,"returned":0}],"receipt":{"number":"REC-SAL-98771c96"}}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 19. Cancel a sale

**POST `/api/v1/sales/{id}/cancel`** · Contexto Sales · Permisos: ADMIN, SALES.

Cancel a sale that has not been dispatched and restore its stock once.

**Path:** `id` UUID obligatorio; identificador de venta.

**Recurso de solicitud:** `CancelResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `reason` | `string` | Obligatorio |

Solicitud de ejemplo:

```json
{"reason":"Example cancellation"}
```

**Respuesta:** 200 con `SaleResource`.

Ejemplo observado:

```json
{"id":"ce6169e7-93f5-4441-9b90-29e901354860","number":"SAL-ce6169e7","status":"CANCELLED","total":12.5,"createdAt":"2026-11-14T03:04:21.339909Z","lines":[{"id":"91c1942c-1ae0-4a0c-9ab9-7c8f9026365d","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","name":"Example item","sku":"CONTRACT-001","quantity":1,"price":12.5,"cost":7.0,"returned":0}],"receipt":{"number":"REC-SAL-ce6169e7"}}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 20. List customer returns

**GET `/api/v1/returns`** · Contexto Returns · Permisos: ADMIN, SALES.

Read previously recorded returns and disposition.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceReturnResource`.

Ejemplo observado:

```json
{"items":[{"id":"722fec71-ee69-4498-9390-c0e72ea8508f","saleId":"98771c96-002f-4faa-971c-4fdfe9f60d3c","saleLineId":"8ab855cb-5863-4d27-9160-d3163732c4cf","quantity":1,"disposition":"RESTOCK","reason":"Example return","createdAt":"2026-11-14T03:04:21.296884Z"}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 21. Record a customer return

**POST `/api/v1/returns`** · Contexto Returns · Permisos: ADMIN, SALES.

Return units against one sale line. RESTOCK restores stock; LOSS records loss. Previously returned quantities limit the remaining return.

**Recurso de solicitud:** `RecordReturnResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `saleId` | `string` | Obligatorio; uuid |
| `saleLineId` | `string` | Obligatorio; uuid |
| `quantity` | `number` | Obligatorio; entero positivo |
| `disposition` | `string` | Obligatorio; Valores: RESTOCK, LOSS |
| `reason` | `string` | Obligatorio |

Solicitud de ejemplo:

```json
{"saleId":"98771c96-002f-4faa-971c-4fdfe9f60d3c","saleLineId":"8ab855cb-5863-4d27-9160-d3163732c4cf","quantity":1,"disposition":"RESTOCK","reason":"Example return"}
```

**Respuesta:** 201 con `ReturnResource`.

Ejemplo observado:

```json
{"id":"722fec71-ee69-4498-9390-c0e72ea8508f","saleId":"98771c96-002f-4faa-971c-4fdfe9f60d3c","saleLineId":"8ab855cb-5863-4d27-9160-d3163732c4cf","quantity":1,"disposition":"RESTOCK","reason":"Example return","createdAt":"2026-11-14T03:04:21.296884400Z"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 22. List dispatch manifests

**GET `/api/v1/dispatches`** · Contexto Logistics · Permisos: ADMIN, LOGISTICS.

Read manifests, lines, incidents and recipient evidence.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceDispatchResource`.

Ejemplo observado:

```json
{"items":[{"id":"1e25dd22-28c0-46d3-b99e-0f53aef41889","number":"DSP-1e25dd22","driverId":"fa947858-2d51-43dd-afff-d206e524cd21","vehicleId":"9aeea7f9-ad25-45ba-ad6a-b4213b712912","destination":"Example Lima warehouse","status":"PENDING","createdAt":"2026-11-14T03:04:21.115278Z","lines":[{"id":"e67e0ff7-df81-4325-8165-335fe57679b9","saleId":"98771c96-002f-4faa-971c-4fdfe9f60d3c","saleLineId":"8ab855cb-5863-4d27-9160-d3163732c4cf","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","name":"Example item","quantity":2}],"incidents":[],"recipient":null}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 23. Prepare a dispatch

**POST `/api/v1/dispatches`** · Contexto Logistics · Permisos: ADMIN, LOGISTICS.

Assign confirmed undispatched sales, a driver, a vehicle and destination. Stock is not deducted again.

**Recurso de solicitud:** `PrepareDispatchResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `saleIds` | `List<string>` | Obligatorio |
| `driverId` | `string` | Obligatorio; uuid |
| `vehicleId` | `string` | Obligatorio; uuid |
| `destination` | `string` | Obligatorio |

Solicitud de ejemplo:

```json
{"saleIds":["98771c96-002f-4faa-971c-4fdfe9f60d3c"],"driverId":"fa947858-2d51-43dd-afff-d206e524cd21","vehicleId":"9aeea7f9-ad25-45ba-ad6a-b4213b712912","destination":"Example Lima warehouse"}
```

**Respuesta:** 201 con `DispatchResource`.

Ejemplo observado:

```json
{"id":"1e25dd22-28c0-46d3-b99e-0f53aef41889","number":"DSP-1e25dd22","driverId":"fa947858-2d51-43dd-afff-d206e524cd21","vehicleId":"9aeea7f9-ad25-45ba-ad6a-b4213b712912","destination":"Example Lima warehouse","status":"PENDING","createdAt":"2026-11-14T03:04:21.115278300Z","lines":[{"id":"e67e0ff7-df81-4325-8165-335fe57679b9","saleId":"98771c96-002f-4faa-971c-4fdfe9f60d3c","saleLineId":"8ab855cb-5863-4d27-9160-d3163732c4cf","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","name":"Example item","quantity":2}],"incidents":[],"recipient":null}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 24. Transition a dispatch

**PATCH `/api/v1/dispatches/{id}`** · Contexto Logistics · Permisos: ADMIN, LOGISTICS.

Transition PENDING to IN_TRANSIT, then DELIVERED with recipient evidence; invalid transitions preserve the previous state.

**Path:** `id` UUID obligatorio; identificador de manifiesto.

**Recurso de solicitud:** `TransitionResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `status` | `string` | Obligatorio; Valores: IN_TRANSIT, DELIVERED |
| `recipient` | `string` | obligatorio al entregar |

Solicitud de ejemplo:

```json
{"status":"IN_TRANSIT"}
```

**Respuesta:** 200 con `DispatchResource`.

Ejemplo observado:

```json
{"id":"1e25dd22-28c0-46d3-b99e-0f53aef41889","number":"DSP-1e25dd22","driverId":"fa947858-2d51-43dd-afff-d206e524cd21","vehicleId":"9aeea7f9-ad25-45ba-ad6a-b4213b712912","destination":"Example Lima warehouse","status":"IN_TRANSIT","createdAt":"2026-11-14T03:04:21.115278Z","lines":[{"id":"e67e0ff7-df81-4325-8165-335fe57679b9","saleId":"98771c96-002f-4faa-971c-4fdfe9f60d3c","saleLineId":"8ab855cb-5863-4d27-9160-d3163732c4cf","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","name":"Example item","quantity":2}],"incidents":[{"id":"77bfa107-40ab-44c9-8336-b2fab11d0f10","description":"Recipient contacted before delivery","createdAt":"2026-11-14T03:04:21.159400Z"}],"recipient":null}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 25. Record a delivery incident

**POST `/api/v1/dispatches/{id}/incidents`** · Contexto Logistics · Permisos: ADMIN, LOGISTICS.

Append an incident description to the selected manifest.

**Path:** `id` UUID obligatorio; identificador de manifiesto.

**Recurso de solicitud:** `IncidentResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `description` | `string` | Obligatorio |

Solicitud de ejemplo:

```json
{"description":"Recipient contacted before delivery"}
```

**Respuesta:** 201 con `DispatchResource`.

Ejemplo observado:

```json
{"id":"1e25dd22-28c0-46d3-b99e-0f53aef41889","number":"DSP-1e25dd22","driverId":"fa947858-2d51-43dd-afff-d206e524cd21","vehicleId":"9aeea7f9-ad25-45ba-ad6a-b4213b712912","destination":"Example Lima warehouse","status":"PENDING","createdAt":"2026-11-14T03:04:21.115278Z","lines":[{"id":"e67e0ff7-df81-4325-8165-335fe57679b9","saleId":"98771c96-002f-4faa-971c-4fdfe9f60d3c","saleLineId":"8ab855cb-5863-4d27-9160-d3163732c4cf","productId":"305ced5a-9473-442c-9b19-1137ff3304ce","name":"Example item","quantity":2}],"incidents":[{"id":"77bfa107-40ab-44c9-8336-b2fab11d0f10","description":"Recipient contacted before delivery","createdAt":"2026-11-14T03:04:21.159399500Z"}],"recipient":null}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 26. List eligible sales

**GET `/api/v1/dispatch-candidates`** · Contexto Logistics · Permisos: ADMIN, LOGISTICS.

Read confirmed sales that can be assigned to a dispatch.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceCandidateResource`.

Ejemplo observado:

```json
{"items":[{"id":"98771c96-002f-4faa-971c-4fdfe9f60d3c","number":"SAL-98771c96"}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 27. List drivers

**GET `/api/v1/drivers`** · Contexto Logistics · Permisos: ADMIN, LOGISTICS.

Read drivers registered in this workspace.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceDriverResponseResource`.

Ejemplo observado:

```json
{"items":[{"id":"fa947858-2d51-43dd-afff-d206e524cd21","name":"Example driver","license":"LIC-CONTRACT"}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 28. Register a driver

**POST `/api/v1/drivers`** · Contexto Logistics · Permisos: ADMIN, LOGISTICS.

Register a driver and unique license.

**Recurso de solicitud:** `DriverResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `name` | `string` | Obligatorio |
| `license` | `string` | Obligatorio |

Solicitud de ejemplo:

```json
{"name":"Example driver","license":"LIC-CONTRACT"}
```

**Respuesta:** 201 con `DriverResponseResource`.

Ejemplo observado:

```json
{"id":"fa947858-2d51-43dd-afff-d206e524cd21","name":"Example driver","license":"LIC-CONTRACT"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 29. List vehicles

**GET `/api/v1/vehicles`** · Contexto Logistics · Permisos: ADMIN, LOGISTICS.

Read vehicles registered in this workspace.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceVehicleResponseResource`.

Ejemplo observado:

```json
{"items":[{"id":"9aeea7f9-ad25-45ba-ad6a-b4213b712912","name":"Example van","plate":"CON-001"}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 30. Register a vehicle

**POST `/api/v1/vehicles`** · Contexto Logistics · Permisos: ADMIN, LOGISTICS.

Register a vehicle and unique plate.

**Recurso de solicitud:** `VehicleResource`.

| Campo | Tipo | Validación / semántica |
| --- | --- | --- |
| `name` | `string` | Obligatorio |
| `plate` | `string` | Obligatorio |

Solicitud de ejemplo:

```json
{"name":"Example van","plate":"CON-001"}
```

**Respuesta:** 201 con `VehicleResponseResource`.

Ejemplo observado:

```json
{"id":"9aeea7f9-ad25-45ba-ad6a-b4213b712912","name":"Example van","plate":"CON-001"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 409 Duplicate identity or conflicting business state; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 31. Read regional Lima weather

**GET `/api/v1/logistics/weather`** · Contexto Logistics · Permisos: ADMIN, LOGISTICS.

Read fixed central-Lima conditions from Open-Meteo, cached for ten minutes. Provider failure returns 503; dispatch commands remain usable.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `WeatherResource`.

Ejemplo observado:

```json
{"location":"Lima fixture","temperatureC":21.0,"precipitationMm":0.0,"windKmh":8.0,"observedAt":"2026-11-08T12:00:00Z","fetchedAt":"2026-11-08T12:00:00Z","source":"Open-Meteo","attributionUrl":"https://open-meteo.com/"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 503 Weather provider unavailable; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 32. List notifications

**GET `/api/v1/notifications`** · Contexto Notifications · Permisos: Any active role.

Read workspace notifications produced by committed integration messages.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `CollectionResourceNotificationResource`.

Ejemplo observado:

```json
{"items":[{"id":"c0616be7-9eab-405f-8515-bf58915dc778","type":"LOW_STOCK","createdAt":"2026-11-14T03:04:21.383444Z","read":false,"productId":"305ced5a-9473-442c-9b19-1137ff3304ce"},{"id":"dd31670a-e58e-40c8-bdc7-426513445a02","type":"SALE_CONFIRMED","createdAt":"2026-11-14T03:04:21.339909Z","read":false,"productId":null},{"id":"b6367a7e-15a2-4998-bd55-5566975c7619","type":"DELIVERY_CONFIRMED","createdAt":"2026-11-14T03:04:21.261877Z","read":false,"productId":null},{"id":"47b14a9b-16a7-48b9-861f-696a748a36da","type":"SALE_CONFIRMED","createdAt":"2026-11-14T03:04:20.982749Z","read":false,"productId":null}]}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. `items` contiene los recursos del espacio autenticado; una lista vacía es un resultado válido.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 500 Unexpected server failure; internal details are not disclosed.

**Contexto del producto:** `productId` es UUID opcional. Las nuevas alertas LOW_STOCK conservan el producto del mensaje; avisos de otro tipo y registros anteriores pueden devolver null. La interfaz consulta nombre/SKU dentro de la empresa autorizada.

##### Servicio 33. Mark a notification as read

**PATCH `/api/v1/notifications/{id}`** · Contexto Notifications · Permisos: Any active role.

Mark a workspace notification as read; repeating it preserves the read state.

**Path:** `id` UUID obligatorio; identificador de notificación.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `NotificationResource`.

Ejemplo observado:

```json
{"id":"c0616be7-9eab-405f-8515-bf58915dc778","type":"LOW_STOCK","createdAt":"2026-11-14T03:04:21.383444Z","read":true,"productId":"305ced5a-9473-442c-9b19-1137ff3304ce"}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 400 Malformed request, missing required input or invalid parameter; 422 A domain invariant rejects the supplied values; 404 Reference not found in the authenticated workspace; 500 Unexpected server failure; internal details are not disclosed.

##### Servicio 34. Read operational metrics

**GET `/api/v1/metrics`** · Contexto Reporting · Permisos: ADMIN.

Read revenue, gross contribution, inventory valuation, low-stock count and dispatch/sale counts. Gross contribution is not net profit.

**Solicitud:** sin cuerpo. No admite filtros query de servidor.

**Respuesta:** 200 con `Metrics`.

Ejemplo observado:

```json
{"revenue":12.5,"grossMargin":5.5,"inventoryValue":0.0,"lowStock":1,"dispatches":0,"sales":1}
```

**Interpretación:** El objeto conserva los identificadores y valores aceptados. Los importes monetarios están expresados en PEN y las cantidades en unidades enteras.

**Errores aplicables:** 401 Missing, invalid, expired or revoked session; 403 Role does not permit this operation; 500 Unexpected server failure; internal details are not disclosed.

##### Ejemplos de rechazo observados

**POST /api/v1/products → 400**

```json
{"detail":"Revisa la longitud del texto y los campos obligatorios.","instance":"/api/v1/products","status":400,"title":"Bad Request","type":"about:blank","code":"INVALID_TEXT"}
```

**POST /api/v1/products → 400**

```json
{"detail":"Revisa la longitud del texto y los campos obligatorios.","instance":"/api/v1/products","status":400,"title":"Bad Request","type":"about:blank","code":"INVALID_TEXT"}
```

**POST /api/v1/sales → 400**

```json
{"detail":"Revisa la longitud del texto y los campos obligatorios.","instance":"/api/v1/sales","status":400,"title":"Bad Request","type":"about:blank","code":"INVALID_TEXT"}
```

**PATCH /api/v1/products/not-a-uuid → 400**

```json
{"detail":"Revisa la longitud del texto y los campos obligatorios.","instance":"/api/v1/products/not-a-uuid","status":400,"title":"Bad Request","type":"about:blank","code":"INVALID_TEXT"}
```

**POST /api/v1/sales → 409**

```json
{"detail":"La cantidad supera el stock disponible. Revisa el carrito.","instance":"/api/v1/sales","status":409,"title":"Conflict","type":"about:blank","code":"INSUFFICIENT_STOCK"}
```

**POST /api/v1/movements → 422**

```json
{"detail":"Ingresa una cantidad entera positiva.","instance":"/api/v1/movements","status":422,"title":"Unprocessable Content","type":"about:blank","code":"INVALID_QUANTITY"}
```

**GET /api/v1/metrics → 403**

```json
{"detail":"Tu rol no tiene acceso a esta operación.","instance":"/api/v1/metrics","status":403,"title":"Forbidden","type":"about:blank","code":"FORBIDDEN"}
```

**GET /api/v1/products → 401**

```json
{"title":"Unauthorized","code":"UNAUTHENTICATED","detail":"Vuelve a iniciar sesión para continuar.","status":401,"type":"about:blank"}
```

#### 5.2.3.7. Software Deployment Evidence for Sprint Review

| Artefacto | Publicación | Estado |
| --- | --- | --- |
| Landing | [Pages](https://ai-todu.github.io/ai-todu-platform/) | Canal estático y CTA |
| Frontend | [Pages](https://ai-todu.github.io/ai-todu-webapp/) | Workflow main aprobado |
| API | [Render / health](https://ai-todu-api-av2.onrender.com/actuator/health) | Servicio gratuito live y UP |
| PostgreSQL | Base aislada aitodu_av2 / usuario aitodu_app | Red privada y sin lectura sobre tablas de otros proyectos |

El runtime recibe solo credenciales propias. La provisión administrativa se ejecutó desde el equipo local con una regla /32 temporal, ya retirada. La instancia gratuita comparte capacidad y caducidad: Dashboard indica 28/11/2026 y la API de Render devuelve su expiración UTC equivalente al 29/11. Se requiere continuidad/exportación antes del vencimiento. El servicio gratuito puede tardar en reactivarse tras inactividad.

#### 5.2.3.8. Team Collaboration Insights during Sprint

Los PR y las ejecuciones de CI documentan el incremento técnico de AV2. No prueban reuniones, revisión cruzada o participación reciente de todos. Se conservan aportes AV1/TB1 y se enlaza el tablero público actual y se conservan las cinco validaciones recibidas. La entrega distingue autoría histórica, trabajo actual, reflexión individual y comunicación.

## 5.3. Validation Interviews

### 5.3.1. Diseño de entrevistas

El plan de validación del Sprint 3 contempla **cinco entrevistas en total**, con participantes de los dos segmentos objetivo, consentimiento y grabación autorizada. Esta fase se registra por separado de la elicitación inicial. Ambos perfiles revisan la landing; las tareas de la aplicación se adaptan a su función: recepción parcial y explicación del saldo para almacén, y venta y seguimiento de entrega para administración. Registrar éxito, errores, tiempo, ayuda y feedback contrario. No afirmar ahorro porcentual sin una referencia medida.

### 5.3.2. Registro de entrevistas

Se recibieron cinco grabaciones originales y se publicaron como **no listadas** en el canal de Kevin Salazar Marquina el **13/11/2026**. Los perfiles de la tabla corresponden a la identificación proporcionada por Kevin. La revisión documental combina las grabaciones, sus capturas y transcripciones automáticas en español. Se usan paráfrasis con marcas de tiempo; los errores del reconocimiento automático no se convierten en datos personales verificados.

| ID | Participante | Perfil indicado | Inicio del archivo | Duración del reproductor | Fuente |
| --- | --- | --- | --- | --- | --- |
| VAL-S3-01 | Junior | Administrador; supervisor de Entel | 00:00 | 14:00 | [Entrevista de Junior](https://youtu.be/4JEE-XqUjrM) |
| VAL-S3-02 | Fabiana | Operaria; asesora de Entel | 00:00 | 09:31 | [Entrevista de Fabiana](https://youtu.be/5jAaAcLhDPM) |
| VAL-S3-03 | Diego | Operario; almacenero de Makro | 00:00 | 08:18 | [Entrevista de Diego](https://youtu.be/o0oloMIIYdc) |
| VAL-S3-04 | Kimberlin | Administradora; colegio y productos de belleza | 00:00 | 10:49 | [Entrevista de Kimberlin](https://youtu.be/SnLXXd2ZRlI) |
| VAL-S3-05 | Shirley | Administradora y operaria; peluquería y productos de belleza | 00:00 | 12:48 | [Entrevista de Shirley](https://youtu.be/-ITG0JFogfw) |

**Estado de incorporación: 5 de 5 grabaciones recibidas y publicadas.** Dos participantes fueron identificados con el perfil administrador, dos con el perfil operario y Shirley con funciones de administración y operación. Shirley cuenta como una participante. La recepción del material está completa; las fichas y la evaluación de las sesiones se registran por separado.

#### Protocolo y límites de observación

**Responsable de las sesiones:** Kevin Junior Salazar Marquina. **Fecha de incorporación y revisión:** 13/11/2026. Las pantallas de las operaciones muestran el 13 de noviembre; no se infieren horarios de inicio de las sesiones a partir de las horas de los movimientos. Se registran los perfiles proporcionados por Kevin. Edad, apellidos, dirección y otros datos no necesarios no se completan por inferencia. El nombre mostrado por una cuenta de videollamada o una cuenta de prueba puede diferir del participante.

**Instrumento aplicado:** presentación y consentimiento; contexto laboral; lectura de la landing; acceso a una cuenta preparada; recorrido de inventario, recepción y, según rol, venta/despacho; preguntas de comprensión y mejora. El moderador indica menús, productos y acciones. Por ello los intervalos siguientes describen actividades guiadas, no tiempos de tarea autónoma. No se aplicó una medición comparable del proceso previo, SUS ni un cálculo de aceptación porcentual.

**Consentimiento:** cada fuente conserva la autorización al inicio. Junior (00:16–00:23), Diego (00:20–00:33) y Shirley (00:25–00:32) aceptan la grabación para la sesión académica; Fabiana (00:22–00:35) y Kimberlin (00:17–00:34) hacen referencia al curso y al docente. Esta evidencia no se interpreta como autorización general de uso publicitario. Una URL no listada se puede compartir; no equivale a acceso privado autenticado.

#### VAL-S3-01 · Junior · Administración

<div class="interview-record">

| Campo | Detalle |
| --- | --- |
| Contexto | supervisión de tienda de Entel. Describe control de ingresos, ventas y caja; la transcripción del contexto tiene fragmentos poco claros, por lo que no se atribuyen citas literales ni cifras. |
| Fuente | [grabación completa, 14:00](https://youtu.be/4JEE-XqUjrM). |
| Inicio y consentimiento | 00:00; consentimiento desde 00:16. |
| Evidencia fotográfica | <img src="assets/validation/junior-session.png" alt="Junior y Kevin durante el cierre de la sesión, 12:18" width="400"> |

</div>

| Actividad y tiempo en la fuente | Observación y orientación del moderador | Interpretación / decisión |
| --- | --- | --- |
| Landing y acceso · 01:33–02:32 | Revisa la página y accede con una cuenta preparada, con indicaciones del moderador. | Se observa acceso guiado; no se mide descubrimiento autónomo. |
| Inventario e historial · 03:54–06:29 | El moderador explica movimientos, producto nuevo e historial; se cancelan formularios de exploración. | Evidencia de comprensión guiada del recorrido, no de completar altas sin ayuda. |
| Venta · 07:08–08:08 | Se agregan dos unidades y se confirma la venta con indicaciones; se muestra el comprobante. | Conservar la referencia venta–comprobante; no presentarlo como comprobante tributario. |
| Opinión y mejora · 12:01–13:40 | Valora reunir funciones que utiliza en varios sistemas; solicita separar tiendas/sedes (13:19–13:40). | H-06: evaluar múltiples ubicaciones como evolución del dominio. |

**Resumen:** la integración del flujo resulta pertinente para su función de supervisión. La necesidad de separar tiendas no está cubierta por el incremento AV2. En 08:19–09:13 el moderador describe un traspaso automático entre tiendas; esa explicación excede la implementación: el despacho enlaza una venta y no mueve saldo entre almacenes. La conclusión y el alcance del producto mantienen esa distinción. No hay segunda sesión de comprobación.

#### VAL-S3-02 · Fabiana · Operación

<div class="interview-record">

| Campo | Detalle |
| --- | --- |
| Contexto | asesora de Entel con tareas de recepción e inventario. Describe anotar desde el teléfono en una hoja compartida y trasladar la información a otro sistema (00:35–00:47). |
| Fuente | [grabación completa, 09:31](https://youtu.be/5jAaAcLhDPM). |
| Inicio y consentimiento | 00:00; consentimiento desde 00:22. |
| Evidencia fotográfica | <img src="assets/validation/fabiana-session.png" alt="Fabiana y Kevin con el historial visible, 08:59" width="400"> |

</div>

| Actividad y tiempo en la fuente | Observación y orientación del moderador | Interpretación / decisión |
| --- | --- | --- |
| Landing e idioma · 01:10–02:54 | Necesita indicación para pasar de inglés a español; identifica el recorrido general. | H-02: hacer comprensibles los términos y conservar el idioma elegido. |
| Acceso e inventario · 03:09–05:20 | Cuenta preparada; ayuda para abrir menú y localizar el producto. Inicialmente menciona tres unidades y el moderador distingue la fila de prueba con saldo cero. | H-07: diferenciar cantidad de productos y unidades disponibles. No registrar la tarea como éxito sin indicaciones del moderador. |
| Recepción parcial · 05:47–06:58 | Registra dos de cuatro unidades y consulta el historial con indicaciones. | H1 tiene evidencia cualitativa de uso guiado; el umbral de 80% no se evaluó. |
| Mejora · 08:59–09:11 | Solicita acciones visibles sin desplazamiento lateral y mensajes con el stock disponible. | H-01 y H-05: priorizar acceso a acciones y recuperación de errores. |

**Resumen:** percibe mayor control que en una hoja compartida (08:08–08:16), pero esto es una valoración de la participante, no una medición de seguridad o productividad. La sesión identifica barreras concretas de navegación y mensajes; la corrección debe comprobarse técnicamente y después con usuarios.

#### VAL-S3-03 · Diego · Operación

<div class="interview-record">

| Campo | Detalle |
| --- | --- |
| Contexto | almacenero de Makro. Describe recepción de proveedores, registro en portapapeles y traslado a una computadora (00:36–00:48). |
| Fuente | [grabación completa, 08:18](https://youtu.be/o0oloMIIYdc). |
| Inicio y consentimiento | 00:00; consentimiento desde 00:20. |
| Evidencia fotográfica | <img src="assets/validation/diego-session.png" alt="Diego y Kevin revisando el historial, 06:48" width="400"> |

</div>

| Actividad y tiempo en la fuente | Observación y orientación del moderador | Interpretación / decisión |
| --- | --- | --- |
| Movimiento de inventario · 05:03–05:20 | Registra una entrada con ayuda del moderador. | Observar registro guiado, sin extrapolar al proceso real de Makro. |
| Recepción e historial · 05:28–06:18 | Revisa compra, recepción e historial con indicaciones. | Se distingue la recepción de compra del movimiento manual. |
| Responsable del registro · 06:45–07:07 | Señala que ve la fecha, pero no quién recibió. | H-03: mostrar el responsable que la API ya conserva y una fecha precisa. |
| Conectividad y acciones · 07:24–07:54 | Reporta conectividad débil en almacén y pide una espera clara para evitar repetir clics; también solicita acciones visibles. | H-04: revisar carga/envío; H-01: acceso a acciones. Conectividad descrita, no medida. |

**Resumen:** para operar y conciliar por turnos necesita identificar quién ejecutó la acción y cuándo. El problema observado corresponde a la presentación del historial; la API de movimientos incluye `actorId`. No se requiere inventar un nuevo dato del dominio para corregir la vista. No hay una prueba posterior en su almacén.

#### VAL-S3-04 · Kimberlin · Administración

<div class="interview-record">

| Campo | Detalle |
| --- | --- |
| Contexto | administración y recepción de materiales en un colegio, además de compras, ventas y stock de un emprendimiento de belleza (00:37–00:57). |
| Fuente | [grabación completa, 10:49](https://youtu.be/SnLXXd2ZRlI). |
| Inicio y consentimiento | 00:00; consentimiento desde 00:17. |
| Evidencia fotográfica | <img src="assets/validation/kimberlin-session.png" alt="Kimberlin y Kevin con el historial en español y motivos en inglés, 09:59" width="400"> |

</div>

| Actividad y tiempo en la fuente | Observación y orientación del moderador | Interpretación / decisión |
| --- | --- | --- |
| Landing · 01:07–02:43 | Explica que se reúnen compra, almacén, venta y despacho; localiza la demo tras la consigna. | Evidencia de comprensión de la propuesta, con una participante. |
| Inventario · 03:10–04:08 | Busca el producto indicado y responde que hay dos unidades y condición buena, con guía del moderador. | H1 tiene un ejemplo cualitativo; no se mide su umbral. |
| Recepción, venta y despacho · 04:15–08:16 | Recibe unidades, confirma venta y ejecuta el despacho con indicaciones. La cuenta de demostración es de administrador. | H2: recorrido guiado; no prueba un reparto físico, entrega parcial ni autonomía. |
| Historial y vocabulario · 09:38–10:16 | Confunde inicialmente el historial con recibos; pide cambiar términos en inglés. | H-02: traducir etiquetas y motivos generados; explicar la función del historial. |

**Resumen:** reconoce el propósito del producto y lo percibe práctico. La mezcla de idiomas dificulta la comprensión. En 07:48–07:59 el moderador menciona una entrega parcial; AV2 confirma la entrega completa del manifiesto, por lo que no se atribuye esa capacidad al sistema. El feedback favorable no se convierte en una tasa de aceptación.

#### VAL-S3-05 · Shirley · Administración y operación

<div class="interview-record">

| Campo | Detalle |
| --- | --- |
| Contexto | administra su peluquería y realiza compras, entradas, salidas y ventas de productos de belleza; utiliza cuadernos, comprobantes y WhatsApp (00:35–00:54). Cuenta como una participante con dos funciones. |
| Fuente | [grabación completa, 12:48](https://youtu.be/-ITG0JFogfw). |
| Inicio y consentimiento | 00:00; consentimiento desde 00:25. |
| Evidencia fotográfica | <img src="assets/validation/shirley-session.png" alt="Shirley y Kevin durante la revisión final, 11:30" width="400"> |

</div>

| Actividad y tiempo en la fuente | Observación y orientación del moderador | Interpretación / decisión |
| --- | --- | --- |
| Landing y acceso · 01:00–03:17 | Recorre la landing y entra con cuenta preparada; el moderador explica el resumen. | Comprensión posterior a explicación, sin medición autónoma. |
| Inventario y recepción · 03:20–06:10 | Explora formulario de producto, historial y recepción de una unidad, con guía. | Evidencia cualitativa del flujo de entrada con datos ficticios. |
| Venta y despacho · 06:16–09:26 | Agrega productos, confirma venta y completa las transiciones del despacho con indicaciones. | Recorrido guiado; no demuestra entrega física ni ahorro de tiempo. |
| Descubrimiento de venta · 11:22–11:52 | No reconoce claramente la tarjeta como acción para agregar producto; menciona contraste tenue. | H-08: incluir una acción explícita y perceptible para agregar al carrito. |
| Organización y alertas · 12:02–12:23 | Solicita clasificar por marca/sede e identificar el producto en alertas de stock. | H-09: resolver producto en la notificación; H-06: evaluar clasificación y sedes como evolución. |

**Resumen:** la sesión aporta necesidades de una persona que combina compra, venta y administración. Las marcas/sedes son una necesidad propuesta, no una función validada de AV2. El producto debe ayudar a descubrir acciones sin explicación del moderador y relacionar las alertas con artículos concretos.

#### Síntesis de hallazgos y contraste de hipótesis

| Hipótesis | Evidencia disponible | Resultado del contraste |
| --- | --- | --- |
| H1 · Comprender saldo e historial | Fabiana 05:47–06:58; Diego 05:28–07:07; Kimberlin 03:10–04:08 | Apoyo cualitativo parcial en un recorrido guiado. Persisten confusión de cantidades y ausencia visible del responsable. No se midió 80% sin ayuda. |
| H2 · Relacionar venta y despacho | Junior 07:08–09:13; Kimberlin 05:29–08:16; Shirley 06:16–09:26 | Se explora el flujo con asistencia. La ausencia de doble descuento se verifica en pruebas técnicas; no equivale a éxito autónomo de participantes. Sedes/entregas parciales no están implementadas. |
| H3 · Comprensión bilingüe | Fabiana 01:10–01:27; Kimberlin 09:59–10:16 | Hay evidencia contraria al criterio de mensajes clave totalmente traducidos: roles y motivos siguen en inglés. Requiere corrección y nueva comprobación. |

**Decisión:** priorizar acciones visibles, términos comprensibles, identificación del responsable, estados de espera y detalle del producto en alertas. Se conserva la solicitud de múltiples sedes y clasificación como trabajo futuro con reglas por definir. No se presenta una nueva prueba con usuarios que todavía no se ha realizado.

Las cinco fichas tienen fuente, captura, actividades y observaciones del recorrido guiado. Las correcciones de código se detallan en el seguimiento del Anexo D y se encuentran en [backend PR #4](https://github.com/AI-ToDu/ai-todu-api/pull/4) y [frontend PR #7](https://github.com/AI-ToDu/ai-todu-webapp/pull/7); ambos PR están integrados, frontend publicado en Pages y backend actualizado en Render. La comprobación técnica no equivale a una nueva sesión con participantes. La edición consolidada de 3–5 minutos por participante está publicada en YouTube y Stream y se detalla en el Anexo C; se concedió lectura al docente en Microsoft 365, sin notificación. Los registros heredados no se cuentan como nuevas validaciones.

### 5.3.3. Evaluación heurística

La evaluación documental sigue la estructura del **Anexo D** del enunciado: alcance, escala, tabla resumen, problema, evidencia y recomendación. Los hallazgos proceden de las cinco sesiones; la clasificación y las recomendaciones se presentan en el Anexo D. No se declara una auditoría independiente ni una segunda evaluación con participantes.

| ID | Problema identificado | Severidad propuesta | Principio | Fuente |
| --- | --- | --- | --- | --- |
| H-01 | Acciones de fila dependientes del desplazamiento horizontal | 3 | Usability · flexibilidad y eficiencia | Fabiana 08:59–09:11; Diego 07:44–07:54 |
| H-02 | Motivos generados en inglés en una vista en español | 2 | Usability · consistencia; Inclusive Design · comprensión | Kimberlin 09:59–10:16; captura del historial |
| H-03 | Historial sin responsable visible ni segundos/zona horaria | 3 | Information Architecture · información comprensible y útil | Diego 06:45–07:07 y 07:44–07:54 |
| H-04 | Riesgo de repetir acciones durante una espera poco clara | 3 | Usability · visibilidad del estado y prevención de errores | Diego 07:24–07:35; conectividad reportada |
| H-05 | Rechazo de stock sin cantidad disponible para corregirlo | 2 | Usability · reconocer y recuperarse de errores | Fabiana 08:59–09:11 |
| H-07 | Contador de productos que puede confundirse con unidades | 2 | Information Architecture · etiquetas claras | Fabiana 04:56–05:20 |
| H-08 | Tarjeta de producto sin acción explícita para agregar a venta | 3 | Usability · reconocimiento; Inclusive Design · percepción | Shirley 11:22–11:52 |
| H-09 | Alerta de stock sin identificar el artículo | 2 | Information Architecture · contexto y referencia | Shirley 12:02–12:23 |

La necesidad H-06 de marcas/sedes es una solicitud de capacidad adicional, no un error heurístico de una función prometida. Se mantiene como trabajo futuro. El [Anexo D](#anexo-d-evaluación-de-user-experience-según-heurísticas) desarrolla los ocho problemas y sus criterios de comprobación.

## 5.4. Video About-the-Product

La versión AV2 **AI-ToDu | AV2 Sprint 3 | About-the-Product** reúne escenas reales de recepción, venta y despacho y opiniones de administración (Kimberlin) y operación (Fabiana). Usa extractos de las sesiones guiadas del 13/11/2026, datos ficticios y las autorizaciones de publicación correspondientes. No presenta las opiniones como resultados empresariales ni como pruebas autónomas.

[Ver en YouTube, 2:21](https://youtu.be/nvsYXk91k4c) · [Reproducir en Microsoft Stream](https://upcedupe-my.sharepoint.com/personal/u202417747_upc_edu_pe/_layouts/15/stream.aspx?id=%2Fpersonal%2Fu202417747_upc_edu_pe%2FDocuments%2FAI-ToDu+AV2+Sprint+3+-+Evidencias%2FAI-ToDu-About-the-Product-AV2-revision.mp4) · [Video embebido en la landing pública](https://ai-todu.github.io/ai-todu-platform/#product-video). El archivo tiene aproximadamente 2:20; YouTube redondea a 2:21. La reproducción institucional se verificó desde la cuenta propietaria; se concedió acceso de lectura al docente, sin notificación. No se comprobó su inicio de sesión.

![Escena de venta del About-the-Product AV2, 00:42](assets/validation/about-product-av2.png)

| Inicio | Sección | Fuente |
| --- | --- | --- |
| 00:00 | Propuesta de valor y contexto académico | Portada de edición |
| 00:05 | Recepción de mercadería | Shirley, 05:02–05:33 |
| 00:36 | Venta y comprobante demo | Shirley, 06:16–06:48 |
| 01:08 | Despacho | Kimberlin, 07:11–07:39 |
| 01:36 | Opinión de administración | Kimberlin, 09:59–10:16 |
| 01:53 | Opinión de operación | Fabiana, 08:08–08:18 |
| 02:03 | Mejora sugerida por operación | Fabiana, 08:59–09:11 |
| 02:15 | Cierre | Portada final |

Se conserva como antecedente el [clip promocional PROMO: Ai ToDu](https://youtu.be/NXNWTw8_6GY), de aproximadamente 10 segundos. La edición AV2 amplía esa evidencia sin sustituir su procedencia histórica.

## 5.5. Video About-the-Team

**Publicado el 14/11/2026.** [Ver About-the-Team · AV2 · Sprint 3 en YouTube](https://youtu.be/0dV36qhdQjE).

| Dato de la evidencia | Registro |
| --- | --- |
| Participante de AV2 | Kevin Junior Salazar Marquina |
| Alcance | Presentación y reflexión individual sobre el desarrollo de AI-ToDu, identificada por Kevin como About-the-Team. |
| Fuente | Grabación de Kevin, exportada desde su proyecto de Clipchamp en 1080p; video H.264 y audio AAC. |
| Duración y referencia | Archivo: 7:07,9; reproductor de YouTube: **7:08**, intervalo completo **00:00–07:08**. |
| Publicación | Canal de Kevin Salazar Marquina; **No listado**. Cualquier persona con el enlace puede verlo. |
| Destino institucional | Esta grabación todavía no se ha incorporado a la carpeta de Stream; las otras tres ediciones conservan sus enlaces institucionales. |

Esta evidencia corresponde a Kevin en AV2. Los aportes de los demás integrantes se conservan como antecedentes históricos; no se les atribuye participación en esta grabación. About-the-Team no sustituye la exposición técnica indicada en el Anexo E.
