<div class="report-cover" align="center">

<img class="university-logo" src="assets/upc-logo.png" alt="Universidad Peruana de Ciencias Aplicadas" width="96">

**Universidad Peruana de Ciencias Aplicadas · Ingeniería de Software**<br>
Desarrollo de Aplicaciones Open Source · **1ASI0729 · NRC 7750**<br>
Docente: **Efraín Ricardo Bautista Ubillús**<br>
Startup **IA-INNOVATION** · Período **2026-2**

# Informe del Trabajo Final · AI-ToDu

**AV2 · Sprint 3 · Semana 12**<br>
Versión **0.3.2 · 13 de noviembre de 2026**<br>
Lima, Perú · Noviembre de 2026

<div class="cover-team">

| Integrante | Código |
| --- | --- |
| Carlos Alberto Bernal Torres | U202420071 |
| Luis Carlos Chui Kcomt | U20241i327 |
| Fernando André Condezo Pacheco | U202411324 |
| Kevin Junior Salazar Marquina | U202417747 |
| Darikson Bill Salazar Quiche | U202422620 |

</div>

[Producto](#capítulo-i-introducción) · [Investigación](#capítulo-ii-requirements-elicitation--analysis) · [Requisitos](#capítulo-iii-requirements-specification) · [Diseño](#capítulo-iv-product-design) · [Implementación](#capítulo-v-product-implementation-validation--deployment) · [Pendientes](#pendientes-de-evidencia-y-próxima-entrega)

</div>

> **Alcance AV2.** Presentamos el incremento técnico del Sprint 3: backend Java/Spring Boot con PostgreSQL, dominio independiente de frameworks, recursos REST, roles, transacciones, Outbox e integración Open-Meteo. La Fake API conserva el alcance histórico de TB1. Se incorporan cinco sesiones de validación guiada, sus fichas, capturas y hallazgos. Las correcciones del 13/11 están en ramas de revisión; los tres videos editados están en YouTube y Stream, con lectura concedida al docente. La grabación About-the-Team y la comprobación posterior con usuarios siguen pendientes.

## Cómo leer y mantener este informe

Este README es el informe completo **generado** desde `report-front.md`, los cinco capítulos y `report-closing.md`. Se edita cada fuente una sola vez y se ejecuta `npm run report`; `npm run check` detecta divergencias e imágenes locales rotas. Los diagramas se entregan en SVG y Mermaid editable. La exportación HTML/PDF comparte el mismo contenido.

| Estado documental | Significado |
| --- | --- |
| Implementado y verificado | Comportamiento observado en prueba automatizada o recorrido local, con alcance indicado. |
| Diseñado | Modelo, contrato o decisión revisada cuya implementación productiva aún falta. |
| Evidencia pendiente | Dato que el equipo debe sustentar con una fuente real. |

## Registro de versiones

Las fechas se apoyan en commits existentes; no se reconstruyen reuniones ni aprobaciones sin registro.

| Versión / hito | Fecha verificable | Autor | Descripción de modificación |
| --- | --- | --- | --- |
| AV1 · línea histórica | 19/09/2026 | Equipo, según historial | Capítulos aportados por los cinco integrantes; véase Student Outcome. No se afirma que esta fecha represente la ceremonia de entrega. |
| TB1 · frontend inicial | 08/10/2026 | Equipo, según historial | Seis commits originales de la webapp; módulos y README en [historial](https://github.com/AI-ToDu/ai-todu-webapp/commits/main/). |
| TB1 · informe base | 09/10/2026 | Equipo, según historial | Baseline `fd8d611` del report; fuente anterior conservada en Git. |
| Corrección TB1 · v0.2.0 | 30/10/2026 | Kevin Salazar, revisión asistida | Fake API, UI/i18n, arquitectura/datos e informe en bloques de commits de `fix/tb1-readiness`. Revisión asistida ejecutada con autorización de Kevin; no atribuida a otros integrantes. |
| AV2 · v0.3.0 | 08/11/2026 | Kevin Salazar, con implementación asistida autorizada | API Java, pruebas PostgreSQL, integración, despliegue e informe. [Revisiones del backend](https://github.com/AI-ToDu/ai-todu-api/pulls?q=is%3Apr+is%3Aclosed). |
| Revisión AV2 · v0.3.1 | 08/11/2026 | Revisión técnica asistida autorizada por Kevin | Contratos CQRS/REST y errores, documentación de 34 operaciones, diagramas AV2/Transactional Outbox, formatos Scrum y criterios específicos. |
| Evidencias AV2 · v0.3.2 | 13/11/2026 | Kevin Salazar, con revisión asistida | Cinco fichas de validación con capturas y tiempos; recuperación de fotos históricas; ocho hallazgos heurísticos, seguimiento actual y correcciones técnicas en PR. |

## Student Outcome · ABET 3

El curso contribuye al cumplimiento del Student Outcome ABET: **ABET – EAC - Student Outcome 3**.

**Criterio: Capacidad de comunicarse efectivamente con un rango de audiencias.**

En el siguiente cuadro se describe las acciones realizadas y enunciados de conclusiones por parte del grupo, que permiten sustentar el haber alcanzado el logro del ABET – EAC - Student Outcome 3.

| Criterio específico | Acciones realizadas | Conclusiones |
| --- | --- | --- |
| Comunica oralmente con efectividad a diferentes rangos de audiencia. | AV1/TB1: intervenciones y minutos individuales pendientes de verificar. AV2: Kevin modera cinco sesiones con administración y operación: plantea tareas, explica navegación y solicita mejoras (§5.3.2). La guía frecuente y los términos poco claros son límites observados. Exposición técnica y reflexión individual grabada pendientes. | Las sesiones evidencian comunicación con usuarios y feedback específico; no acreditan por sí solas toda la competencia ni una sustentación técnica individual. Se debe contrastar la comprensión sin ayuda y grabar la reflexión. |
| Comunica por escrito con efectividad a diferentes rangos de audiencia. | AV1: aportes de los cinco integrantes a los capítulos enlazados abajo. TB1: frontend por contexto y documentación. AV2: Kevin coordina la revisión asistida de API, contratos, límites y ejecución para docentes/desarrolladores. Nuevos aportes de otros integrantes requieren evidencia. | Los artefactos permiten examinar decisiones y límites. La comprensión individual y la claridad requieren feedback y reflexión; no se declara alcanzado todo el resultado. |

### Registro de acciones y fuentes

Cada fila distingue una contribución respaldada por Git de la evidencia oral pendiente. Un commit acredita un cambio de archivo; no prueba por sí solo aprendizaje individual ni sustentación.

| Integrante | Entrega | Acción escrita realizada y fuente | Acción oral / evidencia requerida |
| --- | --- | --- | --- |
| Carlos | AV1 | Aportó el capítulo de elicitación: [e69f9e4](https://github.com/AI-ToDu/ai-todu-report/commit/e69f9e478750c3a3b981292e13bf13293c63cf93). | Adjuntar intervención, audiencia, enlace y minuto; sin registro verificado. |
| Luis | AV1 | Aportó el capítulo de implementación: [9940325](https://github.com/AI-ToDu/ai-todu-report/commit/9940325d09eef173c137a82a76201dcc5c64f345). | Adjuntar intervención y cómo explicó decisiones; sin registro verificado. |
| Fernando | AV1 | Aportó requisitos: [cf0f8c4](https://github.com/AI-ToDu/ai-todu-report/commit/cf0f8c4c93e7e789dad29682be9b851b8c618379). | Adjuntar intervención sobre requisitos y audiencia. |
| Kevin | AV1 | Aportó introducción: [93b6d8e](https://github.com/AI-ToDu/ai-todu-report/commit/93b6d8ed07031e62fa73336328b4a256cd6511d1). | Adjuntar intervención sobre problema/propuesta y minuto. |
| Darikson | AV1 | Aportó diseño: [eb5d628](https://github.com/AI-ToDu/ai-todu-report/commit/eb5d62850b1a987af937b42844c4d93be72f8020). | Adjuntar intervención sobre diseño y decisión comunicada. |
| Carlos | TB1 | Implementó IAM en frontend: [9aa7dae](https://github.com/AI-ToDu/ai-todu-webapp/commit/9aa7dae4236da015632ec7e8990e162cc4ed6654). | Adjuntar explicación de acceso/roles en sustentación TB1. |
| Luis | TB1 | Implementó logística en frontend: [b6bb6a3](https://github.com/AI-ToDu/ai-todu-webapp/commit/b6bb6a35bc04643ed1f24adcdc77ac580887c787). | Adjuntar demostración y minuto de despacho. |
| Fernando | TB1 | Implementó inventario: [9d10d5a](https://github.com/AI-ToDu/ai-todu-webapp/commit/9d10d5ac4f26c1982f0c668d9e22efd81fc65fa5). | Adjuntar demostración y explicación de reglas de stock. |
| Kevin | TB1 | Creó base de aplicación [e090d1f](https://github.com/AI-ToDu/ai-todu-webapp/commit/e090d1fda11606dc53aec8096c5feb5118a91f4d) y documentación [b05f4d7](https://github.com/AI-ToDu/ai-todu-webapp/commit/b05f4d7864c9fb07d1d80357c4649bf185622a3b). | Adjuntar explicación de integración y límites de la entrega. |
| Darikson | TB1 | Implementó POS/reporting: [427375e](https://github.com/AI-ToDu/ai-todu-webapp/commit/427375e4f19cd5a7ba481523642e01bcc194acfa). | Adjuntar demostración de venta/métricas y minuto. |

**AV2:** Kevin continúa con el incremento actual y conduce las cinco sesiones enlazadas en §5.3.2. La revisión de código, pruebas y documentación incorpora asistencia técnica autorizada. Se conservan las contribuciones históricas de los demás integrantes, sin asignarles nuevas actividades. El seguimiento actual se registra en un tablero público creado el 13/11/2026; no acredita ceremonias históricas.

| Acción de comunicación de Kevin | Audiencia y evidencia | Feedback y ajuste |
| --- | --- | --- |
| Plantea tareas de recepción e historial | Operación: Fabiana 05:47–06:58 y Diego 05:28–07:07 | Se requieren acciones visibles y responsable del registro; H-01/H-03. |
| Explica el recorrido comercial y solicita mejoras | Administración: Kimberlin 01:07–02:43, 09:59–10:16 | La propuesta se comprende, pero persisten términos en inglés; H-02. |
| Contrasta compra, venta y alertas con funciones combinadas | Shirley 11:22–12:23 | Falta descubrir la acción de venta y reconocer el artículo de la alerta; H-08/H-09. |

Las marcas se refieren a las grabaciones originales, no al consolidado editado. Las reflexiones en un guion son propuestas para preparar la grabación; no se presentan como testimonios ya pronunciados.

## Collaboration Insights

[Backend](https://github.com/AI-ToDu/ai-todu-api/commits/main/) · [Frontend](https://github.com/AI-ToDu/ai-todu-webapp/commits/main/) · [Landing](https://github.com/AI-ToDu/ai-todu-platform/commits/develop/) · [Informe](https://github.com/AI-ToDu/ai-todu-report/commits/main/). Los PR muestran cambios y comprobaciones; no equivalen a colaboración de todo el equipo. Las cinco fuentes audiovisuales están en §5.3.2 y la relación entre el tablero actual y las tareas en §5.2.3.3.

## Tabla de contenidos

<!-- REPORT_TOC -->

---
