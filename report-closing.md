# Conclusiones

1. El prototipo conecta recepción, saldo, venta y entrega mediante registros persistidos. La prueba técnica demuestra coherencia del recorrido ficticio; no mide reducción de pérdidas o productividad empresarial.
2. La corrección separa dominio de transporte, incorpora value objects y contrasta arquitectura TB1 con diseño AV2. Un monolito modular es una propuesta proporcionada al alcance actual; no se declaran microservicios inexistentes.
3. El modelo de 35 tablas organiza capacidades y restricciones. La cobertura operativa sigue siendo parcial en lotes, ubicaciones, clientes, varios intentos/paradas, suscripciones y seguridad productiva. El conteo no sustituye un caso de uso terminado.
4. La interfaz bilingüe Material y la landing explican alcance y resultados del demo. La aceptación con usuarios, la capacidad de comunicación individual y el proceso colaborativo requieren evidencia humana auténtica.

## Mejora continua y autocrítica

| Observación del docente | Corrección aplicada | Evidencia / condición pendiente |
| --- | --- | --- |
| Student Outcome sin acciones por persona/entrega | Matriz AV1/TB1 con commits reales y acción escrita específica. | Evidencia oral y reflexión individual pendientes. |
| Repositorios faltantes | Repositorios reales enlazados; Fake API independiente y copia trazable. | Backend Java se implementará en AV2. |
| Versiones incorrectas | Registro apoyado en fechas/commits; corrección fechada 30/10/2026. | Ratificar fecha formal de las ceremonias. |
| Imágenes rotas | Referencias ausentes sustituidas por estado explícito; fuentes históricas conservadas. | Adjuntar material real; no intercambiar identidades. |
| Seis commits y sin develop | Historial preservado, develop incorporada y bloques de corrección revisables. | Colaboración progresiva, revisión y tablero reales del equipo. |
| Landing sin enlace | URL pública y CTA real en configuración y producto. | Publicar la revisión después de aprobación. |
| Falta de Mock API | Motor persistente, HTTP local, worker estático, OpenAPI y pruebas. | No equivale a servidor productivo multiusuario. |
| Orden del dominio | Épicas, historias y diagramas core → soporte → genérico; canal público al final. | Revalidar clasificación si cambia el negocio. |
| C4 débil | C1, C2 actual/futuro y C3 con responsabilidades, límites y tecnología. | Revisar contra servidor AV2 cuando exista. |
| Tipos primitivos en dominio | Sku, Quantity, Money y Address; límites de agregados. | Migración semántica a Java y repositorios futuros. |
| Tablas con nomenclatura incorrecta | 35 tablas lowercase snake_case, claves/restricciones/diccionario/ERD. | PostgreSQL/JPA y pruebas de migración. |
| Sprint 1 incompleto / salto a 3 | Sprint 1 y 2 con las ocho secciones, límites históricos explícitos. | Actas, tablero y evidencias históricas pendientes. |
| Goal sin formato | Outcome/impact/customer/confirmation con estructura del enunciado. | Acuerdo del equipo y validación del impacto con usuarios. |
| BD poco funcional | Recepción parcial, recursos reales de demo, devoluciones y bandeja operativa. | Profundidad en lotes/ubicaciones/rutas y clientes. |

## Pendientes de evidencia y próxima entrega

**Antes de presentar TB1 corregido:** revisar y aprobar los PR; publicar landing/webapp revisadas y comprobar URLs; completar entrevistas auténticas por segmento/fase; adjuntar tablero con transiciones y responsables; incorporar videos de sustentación/About-the-Product y comunicación individual; confirmar la matriz LACX y reflexiones de mejora. Preparar presentación, reporte de participación y demás formatos exigidos por el enunciado. La revisión de código no acredita estos documentos como realizados.

**Preparación AV2, en orden de dominio:**

1. Inventory: repositorios JPA, transacciones de stock, almacenes/ubicaciones/lotes y vencimiento; pruebas de no sobreventa y aislamiento en PostgreSQL.
2. Logistics: manifiestos con múltiples paradas, intentos fallidos y reprogramación; capacidad/ocupación de recursos; evidencia de entrega con política de datos.
3. Procurement/Commercial/Returns: maestros de clientes, aprobaciones/valorización, devoluciones/cambios y política contable. Pagos/SUNAT solo con alcance y proveedor confirmados.
4. Identity: hash de contraseñas adecuado en servidor, sesiones/token, autorización, activación/recuperación y auditoría; retirando cualquier supuesto de seguridad del mock.
5. Operación: migraciones, contrato real, despliegue, observabilidad, gestión de errores e integración del frontend mediante puerto HTTP. Validación con usuarios y evidencia individual/collaborativa por hito.

No se asignan fechas, responsables ni estimaciones de AV2 como compromisos del equipo sin su acuerdo.

# Bibliografía y fuentes

- Universidad Peruana de Ciencias Aplicadas. (2026). *1ASI0729 Final Project Statement, ABET*. Documento del curso proporcionado por el equipo; formato de Sprint Goal, p. 24; entregables y evidencias según secciones correspondientes.
- Universidad Peruana de Ciencias Aplicadas. (2026). *Rúbrica ABET 3* y *Rúbrica de logro 1ASI0729*. Documentos proporcionados por el equipo. Las capturas de la evaluación TB1 son feedback, no una calificación recalculada por esta revisión.
- Angular Team. (s. f.). *Angular Material: Getting started*. https://material.angular.dev/guide/getting-started
- Mozilla. (s. f.). *Using Service Workers*. https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
- Node.js Contributors. (s. f.). *SQLite*. https://nodejs.org/api/sqlite.html
- GitHub. (s. f.). *Using custom workflows with GitHub Pages*. https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Mermaid Contributors. (s. f.). *Mermaid CLI*. https://github.com/mermaid-js/mermaid-cli
- Brown, S. (s. f.). *The C4 model for visualising software architecture*. https://c4model.com/
- AI-ToDu. (2026). *Repositorios de producto e informe*. https://github.com/AI-ToDu

Las fuentes de mercado heredadas sin trazabilidad entre afirmación y documento no se utilizan para sostener porcentajes o resultados. El análisis competitivo vincula páginas oficiales y requiere prueba de edición/fecha antes de afirmar equivalencias de funciones o precio.

# Anexos

- [Arquitectura, decisiones y brechas](design/architecture.md).
- [Diccionario de las 35 tablas](design/database/dictionary.md) y [DDL](design/database/schema.sql).
- [Registro de investigación y fuentes heredadas](research/README.md).
- [Checklist de revisión y demostración](REVIEW.md).
- Diagramas: fuentes Mermaid junto a los SVG en `design/diagrams`.

El README completo se genera desde las fuentes indicadas en la introducción. `npm run check` valida sincronía, assets locales y límites de estimaciones; la exportación PDF mantiene el mismo texto. Ningún generador completa evidencias humanas pendientes automáticamente.

## Modelo físico · diagramas de detalle

Los diagramas siguientes incluyen claves y columnas. Las FK entre áreas se consultan en el DDL y diccionario; los SVG editables permiten ampliar el detalle sin pérdida de definición. El modelo es diseño AV2, no persistencia relacional ya desplegada.

<div class="diagram-appendix">

### Inventario · core

![ERD de Inventario · core](design/diagrams/rendered/erd-inventory.svg)

[Fuente SVG ampliable](design/diagrams/rendered/erd-inventory.svg) · [DDL completo](design/database/schema.sql).

</div>

<div class="diagram-appendix">

### Logística · core

![ERD de Logística · core](design/diagrams/rendered/erd-logistics.svg)

[Fuente SVG ampliable](design/diagrams/rendered/erd-logistics.svg) · [DDL completo](design/database/schema.sql).

</div>

<div class="diagram-appendix">

### Abastecimiento · soporte

![ERD de Abastecimiento · soporte](design/diagrams/rendered/erd-procurement.svg)

[Fuente SVG ampliable](design/diagrams/rendered/erd-procurement.svg) · [DDL completo](design/database/schema.sql).

</div>

<div class="diagram-appendix">

### Ventas · soporte

![ERD de Ventas · soporte](design/diagrams/rendered/erd-sales.svg)

[Fuente SVG ampliable](design/diagrams/rendered/erd-sales.svg) · [DDL completo](design/database/schema.sql).

</div>

<div class="diagram-appendix">

### Devoluciones · soporte

![ERD de Devoluciones · soporte](design/diagrams/rendered/erd-returns.svg)

[Fuente SVG ampliable](design/diagrams/rendered/erd-returns.svg) · [DDL completo](design/database/schema.sql).

</div>

<div class="diagram-appendix">

### Notificaciones · soporte

![ERD de Notificaciones · soporte](design/diagrams/rendered/erd-notifications.svg)

[Fuente SVG ampliable](design/diagrams/rendered/erd-notifications.svg) · [DDL completo](design/database/schema.sql).

</div>

<div class="diagram-appendix">

### Identidad · genérico

![ERD de Identidad · genérico](design/diagrams/rendered/erd-identity.svg)

[Fuente SVG ampliable](design/diagrams/rendered/erd-identity.svg) · [DDL completo](design/database/schema.sql).

</div>
