# Capítulo III: Requirements Specification

## 3.1. User Stories

Los identificadores históricos se conservan. La presentación sigue **core → soporte → genéricos → canal público**. El orden de lectura del dominio no implica poder ejecutar una operación protegida sin autenticación. Las estimaciones son una base de planificación, no horas reales ni velocidad medida.

### Épicas

| ID | Categoría | Contexto / capacidad |
| --- | --- | --- |
| EPIC-02 | Core | Inventario |
| EPIC-04 | Core | Logística |
| EPIC-10 | Soporte | Abastecimiento |
| EPIC-03 | Soporte | Comercial y devoluciones |
| EPIC-05 | Soporte | Reporting |
| EPIC-06 | Soporte | Notificaciones |
| EPIC-01 | Genérico | Identidad |
| EPIC-07 | Genérico | Acceso y roles |
| EPIC-08 | Genérico | Preferencias |
| EPIC-09 | Canal público | Landing page |

### EPIC-02 · Inventario

| ID y título | User story | Criterio de aceptación verificable | Estado TB1 |
| --- | --- | --- | --- |
| **US09 · Registro de artículo** | Como Almacenero, deseo registrar un SKU para identificar mercadería. | Al guardar un SKU único normalizado, se crea con saldo cero. Un SKU duplicado, precio inválido o mínimo negativo se rechaza. | Demo implementada |
| **US10 · Ingreso de mercadería** | Como Almacenero, deseo registrar una entrada para conciliar el stock. | Dada cantidad entera positiva y motivo, al recibir se suma el saldo y se conserva movimiento/responsable. Cero o fracción se rechaza. | Demo implementada |
| **US11 · Salida manual** | Como Almacenero, deseo registrar una salida para explicar el saldo. | Con stock suficiente, una salida conserva su motivo y reduce exactamente la cantidad solicitada. Sobrepasar saldo revierte la operación. | Demo implementada |
| **US12 · Registro de mermas** | Como Almacenero, deseo registrar una merma para distinguir pérdida de venta. | Al registrar pérdida positiva se reduce stock y se guarda tipo LOSS. Conservación y cantidad no se confunden. | Demo implementada |
| **US13 · Buscador de inventario** | Como Operador, deseo buscar por nombre o SKU para encontrar un artículo. | Dado catálogo cargado, la búsqueda filtra sin modificar datos. Sin coincidencias aparece un estado vacío. | Demo implementada |
| **US14 · Historial de movimientos** | Como Administrador, deseo consultar movimientos para explicar un cambio de saldo. | Al abrir el historial aparecen producto, tipo, cantidad, motivo y fecha persistidos. Otro tenant no accede a esos registros. | Demo implementada |

### EPIC-04 · Logística

| ID y título | User story | Criterio de aceptación verificable | Estado TB1 |
| --- | --- | --- | --- |
| **US19 · Manifiesto de despacho** | Como Logístico, deseo crear un manifiesto desde ventas para preparar una entrega trazable. | La venta debe estar confirmada, sin despacho previo ni devolución. Sus líneas se enlazan al manifiesto sin descontar stock nuevamente. | Demo: una venta en UI; varias mediante API |
| **US20 · Asignación de recursos** | Como Logístico, deseo asignar conductor y vehículo para responsabilizar recursos. | Se seleccionan recursos existentes. Al iniciar ruta, un conductor o vehículo en otra ruta activa produce conflicto. | Demo implementada |
| **US21 · Estado y confirmación de entrega** | Como Logístico, deseo confirmar el progreso de entrega para saber qué falta atender. | Solo PENDING → IN_TRANSIT → DELIVERED; entrega requiere receptor. Estado terminal y saltos se rechazan. | Demo: un destino e intento exitoso |
| **US22 · Incidencia en ruta** | Como Logístico, deseo registrar una incidencia para conservar el problema observado. | Una descripción válida queda ligada al despacho y fecha. La vista muestra su registro persistido. | Demo implementada; resolución pendiente |
| **US37 · Maestros de recursos logísticos** | Como Logístico, deseo mantener recursos de reparto para asignar entidades existentes. | Conductor exige nombre/licencia y vehículo nombre/placa; referencias son del mismo tenant. | Nueva historia: demo implementada |

### EPIC-10 · Abastecimiento

| ID y título | User story | Criterio de aceptación verificable | Estado TB1 |
| --- | --- | --- | --- |
| **US35 · Abastecimiento y recepción parcial** | Como Almacenero, deseo recibir parcialmente una compra para conciliar pedido y entrada. | Proveedor y producto existentes; recibir 2/4 suma dos, conserva recepción y deja PARTIAL; exceso/duplicación revierte la solicitud. | Nueva historia: demo implementada |

### EPIC-03 · Comercial y devoluciones

| ID y título | User story | Criterio de aceptación verificable | Estado TB1 |
| --- | --- | --- | --- |
| **US15 · Creación de venta** | Como Vendedor, deseo confirmar una venta para registrar salida e importe una vez. | Con líneas válidas se guardan venta, detalles, movimiento, pago demo y comprobante histórico. Una línea inválida revierte todo. | Demo implementada |
| **US16 · Validación de stock** | Como Vendedor, deseo validar saldo y conservación para evitar sobreventa. | Si falta stock o el artículo no está en buen estado, se rechaza toda la venta. Dos solicitudes concurrentes no venden las mismas unidades en el adaptador HTTP. | Demo implementada |
| **US17 · Historial de ventas** | Como Vendedor, deseo consultar ventas históricas para revisar una operación. | El historial muestra fecha, estado, importe y comprobante con precios/costos del momento. Recargar conserva datos en el adaptador usado. | Demo implementada |
| **US18 · Anulación de venta** | Como Vendedor, deseo anular una venta para corregir una operación permitida. | Una venta confirmada sin despacho/devolución repone stock una sola vez. Segundo intento o venta ya despachada se rechaza. | Demo implementada |
| **US36 · Devolución trazable** | Como Vendedor, deseo registrar una devolución para conciliar stock y venta neta. | No excede lo vendido; RESTOCK reincorpora y LOSS no; se bloquea durante despacho sin finalizar. | Nueva historia: demo implementada; reembolso real pendiente |

### EPIC-05 · Reporting

| ID y título | User story | Criterio de aceptación verificable | Estado TB1 |
| --- | --- | --- | --- |
| **US23 · Dashboard operativo** | Como Administrador, deseo ver métricas derivadas para conciliar la operación. | Después de una venta/devolución cambian ingresos, contribución y saldo. Reporting directo de otro rol devuelve 403. | Demo implementada; no utilidad neta |
| **US24 · Reporte de productos más vendidos** | Como Administrador, deseo ver productos más vendidos para priorizar decisiones. | El ranking debe derivarse de líneas confirmadas, excluyendo anulaciones y considerando devoluciones. | Pendiente |
| **US25 · Exportación de datos** | Como Administrador, deseo exportar datos autorizados para analizar fuera del sistema. | La exportación debe respetar empresa, filtros y formato; no incluir secretos ni registros ajenos. | Pendiente; imprimir comprobante no cumple esta historia |

### EPIC-06 · Notificaciones

| ID y título | User story | Criterio de aceptación verificable | Estado TB1 |
| --- | --- | --- | --- |
| **US26 · Alerta de stock mínimo** | Como Operador, deseo recibir alerta de mínimo para atender reposición. | Un movimiento que deja stock bajo mínimo genera notificación persistente; la bandeja permite marcarla leída. | Demo implementada; no correo/push |
| **US27 · Alerta de vencimiento** | Como Almacenero, deseo detectar vencimientos por lote para evitar salida vencida. | Dado un lote vencido, se genera alerta y se restringe despacho según política validada. | Pendiente: lotes sin flujo operativo completo |

### EPIC-01 · Identidad

| ID y título | User story | Criterio de aceptación verificable | Estado TB1 |
| --- | --- | --- | --- |
| **US01 · Registro de cuenta** | Como Administrador, deseo registrar mi empresa para acceder a un espacio separado. | Dado un correo nuevo y contraseña válida, cuando registro el espacio, entonces se crea empresa/administrador/sesión. Correo existente se rechaza. | Demo implementada |
| **US02 · Inicio de sesión** | Como Usuario, deseo iniciar sesión para operar según mi rol. | Dadas credenciales válidas, al iniciar sesión recibo sesión y ruta autorizada. Contraseña incorrecta devuelve 401. | Demo implementada |
| **US03 · Cierre de sesión** | Como Usuario, deseo cerrar sesión para terminar el acceso. | Dada una sesión, al salir se invalida y se eliminan credenciales locales. Un acceso posterior sin sesión devuelve 401. | Demo implementada |
| **US04 · Recuperación de contraseña** | Como Usuario, deseo recuperar el acceso para volver a operar. | Dado un correo, la respuesta no debe revelar si existe; el enlace real debe expirar y permitir recuperación segura. | Pendiente AV2 |

### EPIC-07 · Acceso y roles

| ID y título | User story | Criterio de aceptación verificable | Estado TB1 |
| --- | --- | --- | --- |
| **US28 · Creación de usuarios** | Como Administrador, deseo incorporar empleados para distribuir operación. | La provisión registra nombre, correo y rol sin divulgar contraseña. Activación y credencial real requieren flujo posterior. | Parcial: provisión, sin activación/invitación |
| **US29 · Restricción por roles** | Como Administrador, deseo restringir acciones por rol para delimitar responsabilidades. | Navegación y API aplican permisos. Acceso directo no autorizado devuelve 403; referencias ajenas no modifican datos. | Demo implementada; seguridad productiva pendiente |

### EPIC-08 · Preferencias

| ID y título | User story | Criterio de aceptación verificable | Estado TB1 |
| --- | --- | --- | --- |
| **US30 · Edición de perfil empresa** | Como Administrador, deseo editar perfil de empresa para mantener datos vigentes. | Una edición validada debe persistir únicamente en el tenant autorizado. | Pendiente |
| **US31 · Cambio de contraseña** | Como Usuario, deseo cambiar contraseña para mantener el acceso. | Verificar credencial actual, política de hash segura en servidor e invalidación de sesiones según política. | Pendiente AV2 |
| **US33 · Idioma de aplicación** | Como Usuario, deseo cambiar idioma para comprender la operación. | Inglés predeterminado y español latinoamericano; selector actualiza navegación, formularios, estados y errores y conserva preferencia. | Implementada: en_US / es_419 |

### EPIC-09 · Landing page

| ID y título | User story | Criterio de aceptación verificable | Estado TB1 |
| --- | --- | --- | --- |
| **US05 · Propuesta de valor** | Como Visitante, deseo comprender la propuesta para identificar el problema atendido. | Dada la landing, al leer el hero comprendo inventario/venta/despacho y el carácter académico. | Implementada |
| **US06 · Capacidades de landing** | Como Visitante, deseo conocer las capacidades para decidir si probar. | Dada la landing, al recorrer capacidades encuentro flujo, roles y acceso a la demo. La ilustración está identificada como muestra. | Implementada |
| **US07 · Modelo comercial y planes** | Como Comprador, deseo consultar planes para evaluar la adopción. | Dado un modelo comercial validado, se describen condiciones y límites sin simular cobros o suscripciones activas. | Pendiente; sin planes comerciales activos |
| **US08 · Contacto B2B** | Como Visitante, deseo contactar al equipo para resolver dudas. | El canal debe conducir a un destino real. Un formulario B2B requerirá persistencia, validación y seguimiento. | Parcial: enlace real al proyecto; captación B2B pendiente |
| **US32 · Testimonios** | Como Visitante, deseo leer testimonios auténticos para evaluar experiencias. | Solo publicar testimonios autorizados con fuente real. Sin fuente se mantiene fuera de la landing. | Pendiente evidencia; no se publican testimonios ficticios |
| **US34 · Términos y privacidad** | Como Visitante, deseo consultar términos y privacidad para comprender el tratamiento del demo. | Se informa alcance académico, persistencia local y ausencia de pagos/facturación real; diálogo accesible y cierre por teclado. | Implementada |

### Technical stories y cambio de contrato

Prefijo común: `/api/v1`. Esta tabla conserva la intención de los TS originales y hace visibles los cambios de contrato. Lo pendiente no se declara en OpenAPI como implementado. El [contrato ejecutable](https://github.com/AI-ToDu/ai-todu-fake-api/blob/fix/tb1-readiness/openapi.json) describe la versión de demo.

| ID | Contrato o capacidad | Validación / diferencia frente a versión anterior |
| --- | --- | --- |
| TS05 | `GET /products` | Reemplaza GET /inventory; consulta de catálogo |
| TS06 | `POST /products` | Reemplaza POST /inventory; SKU único |
| TS07 | `POST /movements · type RECEIPT` | Reemplaza /inventory/{sku}/entries |
| TS08 | `POST /movements · type ISSUE o LOSS` | Reemplaza /inventory/{sku}/exits |
| TS09 | `GET /movements` | Reemplaza /inventory/{sku}/history; producto referenciado |
| TS14 | `GET /dispatches` | Manifiestos con líneas/paradas/incidencias |
| TS15 | `POST /dispatches` | Ventas y recursos del mismo tenant |
| TS16 | `PATCH /dispatches/{id}` | Reemplaza subruta /status; transición y receptor |
| TS17 | `POST /dispatches/{id}/incidents` | Incidencia persistida |
| TS32 | `GET/POST /drivers · GET/POST /vehicles` | Nueva: maestros de recursos |
| TS28 | `POST /purchases` | Nueva: orden y líneas |
| TS29 | `POST /purchases/{id}/receipts` | Nueva: recepción parcial acotada |
| TS30 | `GET /suppliers · POST /suppliers` | Nueva: maestro de proveedor |
| TS10 | `GET /sales` | Historial con detalles y comprobante |
| TS11 | `POST /sales` | Transacción completa / 201 / conflicto 409 |
| TS12 | `Detalle incluido en GET /sales` | GET /sales/{id} no está implementado; proyección de consulta documentada |
| TS13 | `POST /sales/{id}/cancel` | Ajusta método anterior PATCH; reintegro una sola vez |
| TS31 | `POST /returns` | Nueva: retorno acotado y disposición |
| TS18 | `GET /metrics` | Reemplaza /analytics/dashboard; administrador |
| TS19 | `GET /notifications` | Bandeja de alertas persistidas |
| TS20 | `PATCH /notifications/{id}` | Reemplaza subruta /read |
| TS01 | `POST /auth/register` | Alta de empresa/administrador en demo |
| TS02 | `POST /auth/login` | Credencial válida / 401 |
| TS03 | `POST /auth/logout` | Invalida sesión / 204 |
| TS04 | `Recuperación de contraseña` | Pendiente; no endpoint implementado |
| TS21 | `GET /employees` | Proyección de empleados, no listado general de credenciales |
| TS22 | `POST /employees` | Reemplaza /users/invite solo para provisión; invitación/activación pendiente |
| TS23 | `GET /auth/me` | Perfil de sesión; sin hash ni contraseña |
| TS24 | `Edición de perfil` | Pendiente; no endpoint operativo |
| TS25 | `Cambio de contraseña` | Pendiente AV2 |
| TS26 | `Captación B2B` | Pendiente; no POST /contact-messages |
| TS27 | `Planes comerciales` | Pendiente; no GET /landing/plans |

## 3.2. Impact Mapping

| Objetivo e impacto esperado | Actor | Cambio observable | Entregables / historias |
| --- | --- | --- | --- |
| Explicar el saldo y evitar sobreventa | Almacén / ventas | Recepción y venta dejan historial conciliado | US09–US18, US35. |
| Coordinar una entrega trazable | Logística | Despacho referencia venta y finaliza con receptor | US19–US22, US37. |
| Comprender la operación | Administrador | Distingue venta neta, costo y contribución | US23, US26, US36. |
| Poder probar sin ambigüedad | Visitante / usuario | Accede a demo y comprende su alcance e idioma | US01–US06, US29, US33–US34. |

Los objetivos comerciales heredados (clientes, retención y ahorro porcentual) se tratan como hipótesis, no como resultados. La primera validación mide comprensión y ejecución; la segunda podrá contrastar tiempo frente al proceso real.

## 3.3. Product Backlog

<div class="backlog-table">

| Orden de revisión | Story ID | Épica | Título | Story points propuestos |
| --- | --- | --- | --- | --- |
| 1 | US09 | EPIC-02 | Registro de artículo | 3 |
| 2 | US10 | EPIC-02 | Ingreso de mercadería | 5 |
| 3 | US11 | EPIC-02 | Salida manual | 3 |
| 4 | US12 | EPIC-02 | Registro de mermas | 2 |
| 5 | US13 | EPIC-02 | Buscador de inventario | 3 |
| 6 | US14 | EPIC-02 | Historial de movimientos | 3 |
| 7 | US19 | EPIC-04 | Manifiesto de despacho | 5 |
| 8 | US20 | EPIC-04 | Asignación de recursos | 3 |
| 9 | US21 | EPIC-04 | Estado y confirmación de entrega | 3 |
| 10 | US22 | EPIC-04 | Incidencia en ruta | 3 |
| 11 | US37 | EPIC-04 | Maestros de recursos logísticos | 5 |
| 12 | US35 | EPIC-10 | Abastecimiento y recepción parcial | 8 |
| 13 | US15 | EPIC-03 | Creación de venta | 8 |
| 14 | US16 | EPIC-03 | Validación de stock | 5 |
| 15 | US17 | EPIC-03 | Historial de ventas | 3 |
| 16 | US18 | EPIC-03 | Anulación de venta | 5 |
| 17 | US36 | EPIC-03 | Devolución trazable | 5 |
| 18 | US23 | EPIC-05 | Dashboard operativo | 5 |
| 19 | US24 | EPIC-05 | Reporte de productos más vendidos | 3 |
| 20 | US25 | EPIC-05 | Exportación de datos | 5 |
| 21 | US26 | EPIC-06 | Alerta de stock mínimo | 5 |
| 22 | US27 | EPIC-06 | Alerta de vencimiento | 3 |
| 23 | US01 | EPIC-01 | Registro de cuenta | 3 |
| 24 | US02 | EPIC-01 | Inicio de sesión | 3 |
| 25 | US03 | EPIC-01 | Cierre de sesión | 2 |
| 26 | US04 | EPIC-01 | Recuperación de contraseña | 5 |
| 27 | US28 | EPIC-07 | Creación de usuarios | 5 |
| 28 | US29 | EPIC-07 | Restricción por roles | 5 |
| 29 | US30 | EPIC-08 | Edición de perfil empresa | 2 |
| 30 | US31 | EPIC-08 | Cambio de contraseña | 3 |
| 31 | US33 | EPIC-08 | Idioma de aplicación | 2 |
| 32 | US05 | EPIC-09 | Propuesta de valor | 3 |
| 33 | US06 | EPIC-09 | Capacidades de landing | 2 |
| 34 | US07 | EPIC-09 | Modelo comercial y planes | 2 |
| 35 | US08 | EPIC-09 | Contacto B2B | 3 |
| 36 | US32 | EPIC-09 | Testimonios | 2 |
| 37 | US34 | EPIC-09 | Términos y privacidad | 2 |

</div>

<div class="backlog-summary">

**Total:** 137 story points: 119 de las 34 historias originales y 18 propuestos para US35–US37. Se corrige la suma heredada de 121; el valor original recalculado es 119. Las tres historias nuevas reflejan funcionalidad incorporada, no un incremento de velocidad histórica.

**Tablero colaborativo:** no se localizó un enlace público verificable que demuestre transiciones históricas To Do / In Process / To Review / Done. El backlog versionado sirve como fuente textual; el equipo debe adjuntar tablero, responsables reales y trazabilidad de cambios. No se utiliza una captura aislada como prueba de seguimiento continuo.

</div>
