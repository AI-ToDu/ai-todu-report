# Capítulo IV: Product Design

## 4.1. Style Guidelines

### 4.1.1. General Style Guidelines

La identidad utiliza azul profundo para estructura, verde azulado para acción y superficies claras para lectura de datos. Se priorizan contraste, jerarquía tipográfica y consistencia entre landing y workspace. La aplicación usa **Angular Material y Material Design**; la landing emplea HTML/CSS/JavaScript semánticos.

| Token | Valor / uso |
| --- | --- |
| Estructura | Azul profundo `#112f43` y tonos próximos definidos en CSS. |
| Acción | Verde azulado; botón primario contrastado y estado de foco visible. |
| Tipografía | Familia de sistema sans serif; sin dependencia de fuentes remotas. |
| Superficies | Fondo claro, bordes suaves y espacios consistentes. |
| Estados | Texto explícito además de color: pendiente, tránsito, entregado, error y vacío. |

**Identidad visual de AI-ToDu.**

<img src="Images/Branding-Logo.jpeg" alt="Logotipo de AI-ToDu" width="280">

### 4.1.2. Web Style Guidelines

Inglés predeterminado (`en_US`) y español latinoamericano (`es_419`). Se traducen mensajes, formularios, estados, navegación y errores del dominio. Los nombres de artículos/proveedores son datos del usuario y no se alteran automáticamente. Importes en PEN y fechas se formatean por idioma.

La navegación móvil usa panel superpuesto; tablas amplias desplazan dentro de su contenedor. Formularios muestran validación, deshabilitan doble envío y conservan el error de API. Material administra foco del diálogo, cierre y selectores; existen etiquetas accesibles, enlace para saltar al contenido y preferencia de movimiento reducido. La accesibilidad se ha revisado por implementación y recorrido, pendiente de evaluación con usuarios y auditoría automatizada dedicada.

## 4.2. Information Architecture

### 4.2.1. Organization Systems

El workspace sigue el flujo operativo: inventario/historial, abastecimiento, ventas, despacho, devolución y notificaciones. Overview deriva el estado, Team provisiona registros e IAM controla sesión. Las rutas se cargan por dominio. La landing presenta propósito, capacidades, recorrido, segmentos, equipo y CTA a la demo.

### 4.2.2. Labeling Systems

Las etiquetas distinguen venta de despacho y stock de conservación. `Demo receipt · not a fiscal document` informa el alcance del comprobante. `Gross contribution` se acompaña de definición y exclusiones; no se traduce como utilidad neta. Los códigos de error de API se convierten a mensajes localizados.

### 4.2.3. SEO Tags and Meta Tags

Landing declara título, descripción, idioma, viewport y marca. El selector actualiza título, descripción e idioma del documento. La aplicación autenticada es un espacio de trabajo, no una estrategia de posicionamiento de páginas privadas. No se agregan testimonios, métricas comerciales o etiquetas estructuradas de reseñas sin fuente.

### 4.2.4. Searching Systems

La búsqueda implementada filtra catálogo por nombre/SKU en el cliente sobre datos obtenidos por API. Paginación, filtros avanzados de servidor y búsqueda entre almacenes/lotes permanecen pendientes. Un estado vacío distingue ausencia de coincidencias de un error de carga.

### 4.2.5. Navigation Systems

Las rutas protegidas verifican sesión y permisos. Un usuario autenticado que abre login es enviado a su primera ruta autorizada. En AV2, el servidor verifica el rol y la empresa de cada solicitud. La landing pasa idioma y modo servidor; el perfil sugerido solo pertenece a la demo local.

## 4.3. Landing Page UI Design

### 4.3.1. Landing Page Wireframe

La estructura de lectura es: encabezado con navegación/idioma → propuesta principal y muestra identificada → capacidades → recorrido de cuatro pasos → segmentos → equipo/alcance → CTA y contacto del proyecto → términos y privacidad. En móvil se apilan columnas y el menú se controla por botón con `aria-expanded`.

[Archivo Figma de propuestas AV2](https://www.figma.com/design/Kxkl1QhgvRiFthAN9O6CuW): 32 vistas editables, diez wireframes y 22 mockups para desktop/mobile; 38 conexiones definidas. Son propuestas simplificadas de interacción creadas durante esta revisión, no capturas de la aplicación ni evidencia de un taller previo. Los nodos usan texto Inter, auto-layout y componentes Material 3, con colores del producto. La validación con usuarios y el video de prototipo siguen pendientes.

![Wireframe propuesto de landing desktop en Figma](assets/wireframe-landing-desktop.png)

### 4.3.2. Landing Page Mock-up

El diseño publicado se encuentra en [ai-todu-platform](https://github.com/AI-ToDu/ai-todu-platform/tree/develop). El mockup de Figma siguiente conserva propósito, jerarquía y estilo como propuesta simplificada; la aplicación publicada conserva una composición más amplia. Se distingue el diseño propuesto de la captura de ejecución del capítulo V.

![Mockup propuesto de landing desktop en Figma](assets/mockup-landing-desktop.png)

Versión móvil editable: [wireframe](https://www.figma.com/design/Kxkl1QhgvRiFthAN9O6CuW?node-id=3-2530) y [mockup](https://www.figma.com/design/Kxkl1QhgvRiFthAN9O6CuW?node-id=3-2874).

## 4.4. Web Applications UX/UI Design

### 4.4.1. Web Applications Wireframes

Acceso usa una composición de propósito y formulario. El workspace presenta navegación lateral, encabezado con rol/idioma y área central. Inventario usa tabla y diálogos; ventas usa catálogo/carrito; logística agrupa por estado. Los mensajes de carga/error/vacío conservan el contexto de la tarea.

Propuesta Figma: [inventario desktop](https://www.figma.com/design/Kxkl1QhgvRiFthAN9O6CuW?node-id=3-2459), [recepción desktop](https://www.figma.com/design/Kxkl1QhgvRiFthAN9O6CuW?node-id=3-2481), [inventario móvil](https://www.figma.com/design/Kxkl1QhgvRiFthAN9O6CuW?node-id=3-2579) y [recepción móvil](https://www.figma.com/design/Kxkl1QhgvRiFthAN9O6CuW?node-id=3-2601). El camino del operario conserva cada estado: saldo inicial, formulario y saldo actualizado; el regreso al inventario evita perder el contexto.

### 4.4.2. Web Applications Wireflow Diagrams

![Objetivo del operario: recepción y conciliación](design/diagrams/rendered/user-flow-operator.svg)

La secuencia corresponde a pantallas de Acceso, Inventario, Compras/recepción e Historial. Desktop conserva navegación lateral y tabla; móvil abre la navegación como panel y desplaza únicamente el contenedor de datos. Los formularios conservan sus datos al rechazarse la operación.

![Flujo integrado de recepción, venta y entrega](design/diagrams/rendered/workflow-core.svg)

User goal del operario: registrar dos unidades y explicar el saldo. En el wireflow Figma: Acceso → Inventario → Registrar movimiento → Recepción → Saldo actualizado → Inventario. Hay puntos de inicio desktop/mobile; las conexiones son de diseño y no escriben en la base real.

### 4.4.3. Web Applications Mock-ups

La fuente de la vista publicada son los componentes Material y `src/styles.css`. La propuesta simplificada tiene frames de 1120 px y 390 px, con campos rotulados, acciones explícitas y textos que explican el estado. [Mockup de recepción móvil](https://www.figma.com/design/Kxkl1QhgvRiFthAN9O6CuW?node-id=3-2945). No se afirma una matriz exhaustiva de dispositivos ni equivalencia visual exacta con la implementación.

![Revisión del mockup de recepción móvil dentro de Figma](assets/figma-receipt-mobile.png)

#### 4.4.3.1. Especificación por pantalla

La tabla describe la implementación y sus estados esperados; no afirma que cada estado tenga un frame individual en Figma ni que haya sido validado con usuarios. Las propuestas editables se enlazan en cada apartado y las capturas de ejecución se distinguen de los mockups.

| Pantalla | Propósito | Elementos principales | Estados y alternativas | Desktop / móvil |
| --- | --- | --- | --- | --- |
| Acceso | Entrar al espacio correcto | Correo, contraseña, idioma y enlace de registro | Cargando, credencial inválida, sesión válida | Panel/formulario en desktop; columna única y campos completos en móvil |
| Inventario | Explicar existencia y conservación | Búsqueda SKU/nombre, cantidad, mínimo, precio/costo PEN, acciones | Vacío, sin coincidencias, carga fallida, éxito | Tabla contenida; acciones accesibles sin desplazar toda la página |
| Movimiento | Registrar entrada, salida o merma | Producto, tipo, cantidad entera, motivo y saldo de referencia | Envío bloqueado, cantidad inválida, stock insuficiente | Diálogo con foco y etiquetas; ancho adaptado al viewport |
| Compras y recepción | Conciliar orden, recibido y pendiente | Proveedor, producto, unidades ordenadas, recepción parcial | Sin proveedor/artículo, exceso, recepción aceptada | Detalle legible y formulario por línea; UI inicial crea una línea por orden |
| Ventas | Confirmar solo lo disponible | Catálogo, carrito, unidades, total y comprobante académico | Carrito vacío, artículo bloqueado, falta de stock, confirmación | Catálogo/carrito lado a lado en desktop; secuencia vertical en móvil |
| Despachos | Asignar y acreditar la entrega | Ventas elegibles, conductor, vehículo, destino, estado y receptor | Recurso ocupado, transición inválida, receptor ausente, entregado | Grupos por estado; controles apilados y destino legible en móvil |
| Devoluciones | Conciliar unidades retornadas | Venta/línea, pendiente de retorno, RESTOCK/LOSS y motivo | Exceso, despacho activo, retorno aceptado | Formulario rotulado; estado y explicación junto a la acción |
| Notificaciones | Atender mensajes del negocio | Tipo, fecha, indicador de lectura y acción | Bandeja vacía, mensaje nuevo, leído | Lista con acción por elemento; sin depender solo del color |
| Dashboard | Relacionar saldo, venta y entrega | Ingresos, contribución bruta, valoración y contadores | Carga, sin operaciones, error y datos derivados | Tarjetas en columnas o apiladas; definición de contribución visible |
| Equipo | Provisionar permisos | Nombre, correo, rol y contraseña inicial | Correo repetido, rol inválido, éxito sin devolver contraseña | Formulario adaptable; acceso exclusivo de administrador |

### 4.4.4. Web Applications User Flow Diagrams

![Objetivo del administrador: venta y entrega conciliadas](design/diagrams/rendered/user-flow-admin.svg)


El camino principal sigue recibir → consultar saldo → vender → revisar comprobante → crear despacho → iniciar ruta → identificar receptor → confirmar entrega. Los caminos alternativos incluyen credencial inválida, stock insuficiente, artículo bloqueado, recepción excesiva y recurso ocupado. La matriz de pruebas distingue observación de navegador de pruebas del contrato.

User goal del administrador: relacionar una venta con la entrega. En los mockups conectados: Saldo actualizado → Venta → Venta confirmada → Despacho pendiente → Confirmar entrega → Entregado. La alternativa «Ver alternativa sin stock» lleva a Venta rechazada y permite corregir cantidad. Se conservan versiones desktop/mobile en el mismo archivo. Los otros rechazos se documentan en los criterios y las pruebas, sin atribuirles una conexión que no se creó en Figma.

## 4.5. Web Applications Prototyping

TB1 es un prototipo funcional con dos transportes que comparten motor: HTTP local con archivo persistente y Service Worker con IndexedDB para hosting estático. La demo no emite documentos fiscales, realiza cobros, envía invitaciones ni comparte datos entre navegadores. El prototipo permite revisar interacción y consistencia antes del servidor AV2.

AV2 añade la webapp conectada al servidor y la propuesta navegable Figma con cuatro puntos de inicio (wireflow/prototipo, desktop/mobile). Las conexiones de diseño se registraron estructuralmente y se revisaron vistas representativas; la grabación y validación completa del prototipo se mantienen pendientes. El límite de consultas del conector Figma impidió completar todas las exportaciones individuales en esta revisión.

## 4.6. Domain-Driven Software Architecture

### 4.6.1. Design-Level Event Storming

El modelo representa tres flujos de AV2 a partir del código. Los roles de almacén, ventas y logística disparan sus respectivos comandos, y el administrador también tiene acceso a esas operaciones. En una salida de inventario, `StockBelowMinimum` aparece solo cuando el saldo pasa de estar por encima del mínimo a quedar en el mínimo o por debajo. En una venta, la falta de stock en cualquier línea revierte los cambios de todas las líneas. En una entrega, el manifiesto debe estar en tránsito. El modelo sirve como evidencia de diseño basada en la implementación.

![Design-Level Event Storming AV2](design/diagrams/rendered/design-level-event-storming.svg)

Los publishers del contexto propietario traducen `StockBelowMinimum`, `SaleConfirmed` y `DeliveryConfirmed` a mensajes de integración v1. La política de Notifications es registrar una notificación por cada uno de esos mensajes. `NotificationService.accept` ejecuta la política y usa `eventId` para identificar el registro. La bandeja se consulta por separado con `GET /api/v1/notifications`. La [secuencia del Outbox](#4611-transactional-outbox-pattern) muestra la entrega posterior al commit, el rollback ante un fallo del consumidor y el reintento. Las relaciones entre contextos se detallan en el [Context Map](design/diagrams/rendered/context-map.svg) y el [análisis arquitectónico](design/architecture.md).

#### 4.6.1.1. Transactional Outbox Pattern

![Secuencia del Transactional Outbox Pattern implementado](design/diagrams/rendered/transactional-outbox.svg)

El problema de doble escritura aparece si se confirma la operación de negocio y el proceso falla antes de comunicarla. El patrón guarda el cambio y el mensaje público en la **misma transacción**. JpaIntegrationOutbox exige transacción existente (MANDATORY); una regla rechazada elimina ambos mediante rollback. El evento interno solo lo maneja su contexto: InventoryIntegrationPublisher, SaleIntegrationPublisher y DeliveryIntegrationPublisher lo traducen a IntegrationMessage/Published Language v1 antes de persistirlo.

OutboxRelay lee hasta 25 mensajes PENDING cuyo next_attempt_at ha vencido; bloquea cada fila, llama a suscriptores locales y marca PUBLISHED. Ante fallo revierte efectos y registra attempts, last_error y próximo reintento en otra transacción. La demora crece con límite de 300 segundos. Notifications usa el eventId como clave persistida; una reentrega no crea otra notificación. La entrega es eventual y admite reintentos: no se promete transporte exactly-once.

| Evidencia de código/prueba | Qué demuestra | Límite |
| --- | --- | --- |
| V2 / integration_outbox | Mensajes, estado, intentos y próxima ejecución persistidos | Esquema propio de la aplicación |
| messageRollsBackWithFailedCommand | Un comando rechazado no deja mensaje Outbox | Prueba de integración, no caída de máquina |
| retryAfterFailureAndDuplicateDeliveryAreDurable | Fallo, rollback del consumidor, reintento y efecto idempotente | Mismo proceso y relay local |
| notifications.id = eventId | Identidad estable del efecto consumidor | No constituye un inbox genérico para todos los consumidores |

El relay y Notifications comparten PostgreSQL y transacción local al consumir. No se implementó broker externo, dead-letter queue ni prueba de reinicio de proceso; esas capacidades no se atribuyen a esta evidencia. El Outbox durable conserva pendientes para una ejecución posterior.

#### 4.6.1.2. Context Map de AV2

![Context Map de AV2](design/diagrams/rendered/context-map.svg)

Las flechas continuas entre contextos muestran quién consume el contrato de quién. `InventoryGateway.take` y `SalesGateway.claim` traducen datos al modelo del consumidor. Compras y Devoluciones invocan fachadas públicas, y Reporting combina consultas públicas. Los mensajes de integración siguen la ruta punteada del productor al Outbox y a Notifications. IAM aporta la identidad autenticada a la API REST, que funciona como Open Host Service. El [análisis arquitectónico](design/architecture.md#bounded-contexts-in-review-order) detalla las operaciones de cada relación.

### 4.6.2. Software Architecture Context Diagram

![C4 C1 · personas y sistema](design/diagrams/rendered/c4-context.svg)

C1 muestra personas y propósito del sistema. No incluye pasarelas fiscales o proveedores de IA que el prototipo no integra.

### 4.6.3. Software Architecture Container Diagrams

![C4 C2 · ejecución AV2](design/diagrams/rendered/c4-containers-av2.svg)

Vista principal AV2: monolito modular Spring Boot y PostgreSQL. La SPA usa HTTPS hacia Render; la API conecta su base aislada por red privada y consulta Open-Meteo mediante un gateway. Un bounded context no equivale a un microservicio.

**Referencia histórica TB1:**

![C4 C2 · ejecución TB1](design/diagrams/rendered/c4-containers-tb1.svg)

TB1 sirve archivos estáticos y ejecuta la Fake API en el navegador; el adaptador Node/archivo es una alternativa de desarrollo local.

### 4.6.4. Software Architecture Components Diagrams

![C4 C3 · contratos y componentes reales AV2](design/diagrams/rendered/c4-components-av2.svg)

Los controladores dependen de CommandService/QueryService. Los handlers coordinan puertos y agregados propios; adaptadores JPA y assemblers mantienen entidades persistentes separadas. Las consultas no ejecutan comandos. El Outbox se guarda antes del commit y el relay procesa los mensajes comprometidos.

**Referencia histórica TB1:**

![C4 C3 · componentes del motor de demo](design/diagrams/rendered/c4-components.svg)

## 4.7. Software Object-Oriented Design

### 4.7.1. Class Diagrams

![Agregados y valores del backend AV2](design/diagrams/rendered/class-core-av2.svg)

Vista principal del incremento Java: InventoryItem, Sale, PurchaseOrder y DispatchManifest; sus colecciones internas se reconstruyen con assemblers de persistencia. Los comandos/consultas pertenecen al dominio, las interfaces CommandService/QueryService delimitan los casos de uso y las implementaciones internas coordinan transacciones. Los controladores dependen de esos contratos y los assemblers REST construyen los recursos. Las vistas TB1 siguientes se conservan como historial del prototipo.

![Modelo histórico del prototipo TB1](design/diagrams/rendered/class-core.svg)

La tabla siguiente corresponde al modelo histórico de TB1. En AV2, `Money` conserva centavos en un `long`, `Quantity` es un entero y `DispatchManifest` valida su destino como texto y contiene `DeliveryEvidence` (receptor/fecha). `Sale` y `PurchaseOrder` son agregados independientes. La separación entre clases Java de dominio y entidades JPA se comprueba en el repositorio API; `Address` y `SaleSummary` del dibujo histórico no se presentan como clases actuales del backend.

| Objeto TB1 | Semántica del prototipo | Representación en frontera TB1 |
| --- | --- | --- |
| Sku | Normalización y validación; inmutable. | Cadena JSON / columna `sku` única por empresa. |
| Quantity | Entero no negativo, positivo cuando el comando lo exige; límite explícito. | Número JSON / entero SQL con restricción. |
| Money | PEN, precisión de centavos, valor finito/no negativo; inmutable. | Número de importe en API de demo; centavos enteros en diseño SQL. |
| Address | Texto normalizado con longitud válida; inmutable. | Recurso de frontera / columna del prototipo. |
| InventoryItem | Identidad estable; entrada/salida y aptitud de venta. | Recurso de producto y adaptador de demo. |
| SaleSummary | Total validado en centavos, sin aritmética acumulada de decimales. | Total serializado; snapshot de líneas. |
| DispatchManifest | Destino y transición PENDING → IN_TRANSIT → DELIVERED. | Recurso de despacho y adaptador de demo. |

JSON y SQL requieren tipos de transporte/persistencia; eso no elimina el valor semántico del dominio. El servidor usa InventoryItem, Sale, PurchaseOrder y DispatchManifest con operaciones e invariantes; no trata cada fila persistente como agregado independiente. Los precios/costos históricos se conservan en la venta y no se recalculan desde un catálogo modificado.

## 4.8. Database Design

### 4.8.1. Database Diagrams

**Vista principal AV2: 19 tablas ejecutadas**, además del historial Flyway. [Diccionario físico por columna y restricción](design/database/dictionary-av2.md). La vista completa siguiente representa las FK del DDL; una FK entre tablas no autoriza importar el agregado de otro bounded context.

![Vista general de relaciones entre las 19 tablas AV2](design/diagrams/rendered/erd-av2-overview.svg)

[Poster físico completo ampliable](design/diagrams/rendered/erd-av2.svg). Las vistas de detalle siguientes muestran las columnas reales por grupo; las FK entre grupos se consultan en el poster y el diccionario. No se añaden asociaciones de dominio como si fueran FK implementadas.

**IAM, coordinación e integración:**

![AV2: identidad, coordinación y Transactional Outbox](design/diagrams/rendered/erd-av2-identity-integration.svg)

**Inventario y ventas:**

![AV2: inventario, movimientos y snapshots de venta](design/diagrams/rendered/erd-av2-inventory-sales.svg)

**Abastecimiento y devoluciones:**

![AV2: compras, recepción parcial y retorno](design/diagrams/rendered/erd-av2-procurement-returns.svg)

**Logística:**

![AV2: recursos, manifiesto, líneas e incidencias](design/diagrams/rendered/erd-av2-logistics.svg)

**Modelo objetivo e histórico de referencia:**

El [DDL](design/database/schema.sql) contiene **35 tablas** con nombres físicos en minúsculas y `snake_case`, claves, unicidad, restricciones y referencias por empresa. [El diccionario](design/database/dictionary.md) enumera cada columna. Se ejecutó en SQLite como referencia; TB1 usa 35 colecciones JSON. **AV2 implementa 19 tablas de negocio/infraestructura**, además de flyway_schema_history, definidas por sus [migraciones PostgreSQL](https://github.com/AI-ToDu/ai-todu-api/tree/main/src/main/resources/db/migration). No se declara implementada automáticamente toda la referencia de 35 tablas.

| Área lógica | Tablas | Capacidad operativa actual y brecha |
| --- | --- | --- |
| Identidad y empresa | 7 | Registro, roles, sesión y provisión de empleado. Activación, recuperación e invitación pendientes; suscripciones fuera del modelo actual. |
| Inventario | 8 | Catálogo, saldo, entradas/salidas, pérdidas e historial. Categorías/unidades/ubicación de referencia; variantes, lotes y múltiples ubicaciones sin flujo completo. |
| Abastecimiento | 5 | Maestro de proveedores, orden y recepción parcial. API admite varias líneas; formulario inicial trabaja un SKU por orden. Aprobación pendiente. |
| Ventas | 5 | Venta, detalle, pago demo y comprobante histórico. Consulta de cliente de referencia; maestro de clientes sin flujo de UI completo. Sin cobros/fiscalidad real. |
| Logística | 7 | Maestros de conductor/vehículo, manifiesto, líneas, una parada, estados, receptor, intento exitoso e incidencias. Varias paradas, intentos fallidos/capacidad/rutas pendientes. |
| Devoluciones | 2 | Flujo por línea con disposición reintegrar/pérdida y límite de cantidad. Sin reembolso real, cambio ni reexpedición. |
| Notificaciones | 1 | Generación por movimiento bajo mínimo, bandeja y lectura. Sin correo/push ni alertas de vencimiento operativas. |
| **Total** | **35** | **La existencia de una tabla o colección no acredita una funcionalidad completa.** |

Los ERD se dividen para conservar legibilidad: [Inventario](design/diagrams/rendered/erd-inventory.svg), [Logística](design/diagrams/rendered/erd-logistics.svg), [Abastecimiento](design/diagrams/rendered/erd-procurement.svg), [Ventas](design/diagrams/rendered/erd-sales.svg), [Devoluciones](design/diagrams/rendered/erd-returns.svg), [Notificaciones](design/diagrams/rendered/erd-notifications.svg) e [Identidad](design/diagrams/rendered/erd-identity.svg). El DDL es la referencia completa para relaciones entre áreas.

La venta y sus salidas de stock se confirman en una sola transacción. Las pruebas cubren la reversión de todas las líneas ante falta de stock y la venta concurrente de la última unidad. Las notificaciones aparecen después del commit a través del Outbox. El [ADR de consistencia](design/architecture.md#adr-004--atomic-commands-and-workspace-locking) identifica las demás operaciones que comparten una transacción y la regla que protege cada una.

Las migraciones AV2 usan FK por UUID y FK compuestas, según la relación. Por ejemplo, `sale_lines.product_id` comprueba la existencia del producto y `customer_returns(tenant_id, sale_id)` comprueba la pertenencia de la venta a la empresa. La aplicación valida el alcance del workspace en sus consultas y fachadas. El [ADR del esquema](design/architecture.md#adr-006--implemented-schema-versus-target-model) documenta las dependencias físicas que se conservan entre contextos. AV2 usa nombres `snake_case`, centavos enteros, converters para valores simples y embeddables para valores compuestos. Los datos de demo en el navegador y los datos del servidor se almacenan por separado.

#### 4.8.1.1. Esquema ejecutado del incremento AV2

| Área | Tablas PostgreSQL implementadas |
| --- | --- |
| IAM y coordinación | workspaces, workspace_locks, users, sessions |
| Inventario | inventory_items, stock_movements |
| Ventas | sales, sale_lines |
| Logística | drivers, vehicles, dispatches, dispatch_lines, delivery_incidents |
| Compras | suppliers, purchase_orders, purchase_lines |
| Devoluciones | customer_returns |
| Integración | integration_outbox, notifications |

Flyway aplica V1–V5 y Hibernate valida el esquema sin generarlo en producción. V5 añade `notifications.product_id` nullable para conservar la referencia del mensaje de stock; los avisos históricos siguen siendo legibles. No se añade una FK entre contextos. CI ejecuta las pruebas con PostgreSQL 17. El saldo, su movimiento y la venta se confirman en una transacción. No se implementa event sourcing ni un ledger fiscal.
