<div class="report-cover" align="center">

<img class="university-logo" src="assets/upc-logo.png" alt="Universidad Peruana de Ciencias Aplicadas" width="96">

**Universidad Peruana de Ciencias Aplicadas · Ingeniería de Software**<br>
Desarrollo de Aplicaciones Open Source · **1ASI0729 · NRC 7750**<br>
Docente: **Efraín Ricardo Bautista Ubillús**<br>
Startup **IA-INNOVATION** · Período **2026-2**

# Informe del Trabajo Final · AI-ToDu

**AV2 · Sprint 3 · Semana 12**<br>
Versión **0.3.2 · revisión del 14 de noviembre de 2026**<br>
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

[Producto](#capítulo-i-introducción) · [Investigación](#capítulo-ii-requirements-elicitation--analysis) · [Requisitos](#capítulo-iii-requirements-specification) · [Diseño](#capítulo-iv-product-design) · [Implementación](#capítulo-v-product-implementation-validation--deployment)

</div>

> **Alcance AV2.** Presentamos el incremento técnico del Sprint 3: backend Java/Spring Boot con PostgreSQL, dominio independiente de frameworks, recursos REST, roles, transacciones, Outbox e integración Open-Meteo. La Fake API conserva el alcance histórico de TB1. Se incorporan cinco sesiones de validación guiada, sus fichas, capturas y hallazgos. Las correcciones de backend y frontend del 13/11 están integradas y publicadas, con comprobación técnica enlazada; los tres videos editados están en YouTube y Stream, con lectura concedida al docente. También comparto mi experiencia de desarrollo en About-the-Team (7:08, §5.5).

## Registro de versiones

El registro resume la evolución del proyecto y sus principales entregables.

| Versión / hito | Fecha verificable | Autor | Descripción de modificación |
| --- | --- | --- | --- |
| AV1 · línea histórica | 19/09/2026 | Equipo, según historial | Capítulos aportados por los cinco integrantes; véase Student Outcome. |
| TB1 · frontend inicial | 08/10/2026 | Equipo, según historial | Seis commits originales de la webapp; módulos y README en [historial](https://github.com/AI-ToDu/ai-todu-webapp/commits/main/). |
| TB1 · informe base | 09/10/2026 | Equipo, según historial | Baseline `fd8d611` del report; fuente anterior conservada en Git. |
| Corrección TB1 · v0.2.0 | 30/10/2026 | Kevin Salazar | Fake API, UI/i18n, arquitectura/datos e informe en bloques de commits de `fix/tb1-readiness`. |
| AV2 · v0.3.0 | 08/11/2026 | Kevin Salazar | API Java, pruebas PostgreSQL, integración, despliegue e informe. [Revisiones del backend](https://github.com/AI-ToDu/ai-todu-api/pulls?q=is%3Apr+is%3Aclosed). |
| Revisión AV2 · v0.3.1 | 08/11/2026 | Kevin Salazar | Contratos CQRS/REST y errores, documentación de 34 operaciones, diagramas AV2/Transactional Outbox, formatos Scrum y criterios específicos. |
| Evidencias AV2 · v0.3.2 | 13/11/2026 | Kevin Salazar | Cinco fichas de validación con capturas y tiempos; recuperación de fotos históricas; ocho hallazgos heurísticos, seguimiento actual y correcciones técnicas en PR. |
| About-the-Team · revisión v0.3.2 | 14/11/2026 | Kevin Salazar | Publicación de la grabación individual de 7:08 en YouTube y actualización de las referencias del informe. |

## Student Outcome · ABET 3

El curso contribuye al cumplimiento del Student Outcome ABET: **ABET – EAC - Student Outcome 3**.

**Criterio: Capacidad de comunicarse efectivamente con un rango de audiencias.**

En el siguiente cuadro se describe las acciones realizadas y enunciados de conclusiones por parte del grupo, que permiten sustentar el haber alcanzado el logro del ABET – EAC - Student Outcome 3.

| Criterio específico | Acciones realizadas | Conclusiones |
| --- | --- | --- |
| Comunica oralmente con efectividad a diferentes rangos de audiencia. | En AV2 conduje cinco entrevistas con participantes de administración y operación. Expliqué el recorrido de la aplicación, planteé tareas y recogí sugerencias (§5.3.2). En About-the-Team comparto mi experiencia con el proyecto (§5.5). | La interacción con los participantes me permitió adaptar las explicaciones y reconocer oportunidades para mejorar la claridad de la interfaz. |
| Comunica por escrito con efectividad a diferentes rangos de audiencia. | Documentamos la propuesta, los requisitos y el diseño durante AV1 y TB1. En AV2 organicé el informe, los contratos de la API y las instrucciones de ejecución para facilitar la revisión del proyecto. | El informe conecta las necesidades de los usuarios con las decisiones de diseño y con el funcionamiento del incremento presentado. |

### Registro de acciones y fuentes

Conservamos los aportes de las entregas anteriores junto con sus referencias en el historial del proyecto.

| Integrante | Entrega | Aporte y fuente |
| --- | --- | --- |
| Carlos | AV1 | Aportó el capítulo de elicitación: [e69f9e4](https://github.com/AI-ToDu/ai-todu-report/commit/e69f9e478750c3a3b981292e13bf13293c63cf93). |
| Luis | AV1 | Aportó el capítulo de implementación: [9940325](https://github.com/AI-ToDu/ai-todu-report/commit/9940325d09eef173c137a82a76201dcc5c64f345). |
| Fernando | AV1 | Aportó requisitos: [cf0f8c4](https://github.com/AI-ToDu/ai-todu-report/commit/cf0f8c4c93e7e789dad29682be9b851b8c618379). |
| Kevin | AV1 | Aportó introducción: [93b6d8e](https://github.com/AI-ToDu/ai-todu-report/commit/93b6d8ed07031e62fa73336328b4a256cd6511d1). |
| Darikson | AV1 | Aportó diseño: [eb5d628](https://github.com/AI-ToDu/ai-todu-report/commit/eb5d62850b1a987af937b42844c4d93be72f8020). |
| Carlos | TB1 | Implementó IAM en frontend: [9aa7dae](https://github.com/AI-ToDu/ai-todu-webapp/commit/9aa7dae4236da015632ec7e8990e162cc4ed6654). |
| Luis | TB1 | Implementó logística en frontend: [b6bb6a3](https://github.com/AI-ToDu/ai-todu-webapp/commit/b6bb6a35bc04643ed1f24adcdc77ac580887c787). |
| Fernando | TB1 | Implementó inventario: [9d10d5a](https://github.com/AI-ToDu/ai-todu-webapp/commit/9d10d5ac4f26c1982f0c668d9e22efd81fc65fa5). |
| Kevin | TB1 | Creó base de aplicación [e090d1f](https://github.com/AI-ToDu/ai-todu-webapp/commit/e090d1fda11606dc53aec8096c5feb5118a91f4d) y documentación [b05f4d7](https://github.com/AI-ToDu/ai-todu-webapp/commit/b05f4d7864c9fb07d1d80357c4649bf185622a3b). |
| Darikson | TB1 | Implementó POS/reporting: [427375e](https://github.com/AI-ToDu/ai-todu-webapp/commit/427375e4f19cd5a7ba481523642e01bcc194acfa). |

**AV2:** En esta entrega continué con el desarrollo de AI-ToDu y conduje las cinco sesiones de validación. Organicé el seguimiento de las actividades en el tablero del Sprint 3 y reuní los resultados en este informe.

| Acción de comunicación | Audiencia y evidencia | Feedback y ajuste |
| --- | --- | --- |
| Plantea tareas de recepción e historial | Operación: Fabiana 05:47–06:58 y Diego 05:28–07:07 | Se requieren acciones visibles y responsable del registro; H-01/H-03. |
| Explica el recorrido comercial y solicita mejoras | Administración: Kimberlin 01:07–02:43, 09:59–10:16 | La propuesta se comprende, pero persisten términos en inglés; H-02. |
| Contrasta compra, venta y alertas con funciones combinadas | Shirley 11:22–12:23 | Falta descubrir la acción de venta y reconocer el artículo de la alerta; H-08/H-09. |

Las marcas de tiempo remiten a las grabaciones originales. Mi reflexión sobre el desarrollo se encuentra en About-the-Team (§5.5, 00:00–07:08).

## Collaboration Insights

[Backend](https://github.com/AI-ToDu/ai-todu-api/commits/main/) · [Frontend](https://github.com/AI-ToDu/ai-todu-webapp/commits/main/) · [Landing](https://github.com/AI-ToDu/ai-todu-platform/commits/develop/) · [Informe](https://github.com/AI-ToDu/ai-todu-report/commits/main/). Los PR permiten seguir los cambios y sus comprobaciones. Las cinco fuentes audiovisuales están en §5.3.2 y la relación entre el tablero actual y las tareas en §5.2.3.3.

### Actividad de colaboración en TB1

Las gráficas muestran la actividad de los repositorios durante TB1. Los enlaces anteriores permiten consultar el historial actualizado.

![Historial de commits conservado de TB1](Images/insigth.jpeg)

![Contribuciones por autor conservadas de TB1](Images/Insight-Collab.jpeg)

![Historial del informe en la entrega TB1](Images/commits.jpeg)

![Autores del informe en la entrega TB1](Images/commiters.jpeg)

## Tabla de contenidos

<!-- REPORT_TOC -->

---
