# Capítulo II: Requirements Elicitation & Analysis

## 2.1. Competidores

### 2.1.1. Análisis competitivo

El análisis se concentra en el enfoque de producto. No se atribuyen precios, ausencia de funciones o limitaciones vigentes sin probar una edición específica y registrar fecha/fuente.

| Referente | Fuente primaria | Enfoque a contrastar con el segmento |
| --- | --- | --- |
| Odoo Inventory | [Documentación oficial](https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/inventory.html) | Gestión de inventario como parte de una suite empresarial. |
| Alegra | [Sitio oficial](https://www.alegra.com/) | Operación administrativa/comercial para negocios. |
| Wally | [Sitio oficial](https://wallypos.com/) | Operación de punto de venta. |
| AI-ToDu | Repositorios y pruebas de esta entrega | Recorrido académico compacto entre saldo, venta y entrega; sin equivalencia funcional con una suite comercial. |

### 2.1.2. Estrategias y tácticas frente a competidores

La diferenciación propuesta es la comprensión del recorrido de una operación, no la cantidad de pantallas. Se probarán tres tácticas: historial visible para explicar el saldo, despacho a partir de una venta ya registrada e indicadores con definición comprensible. La preferencia y disposición de adopción requieren investigación; no se afirman como ventaja validada.

## 2.2. Entrevistas

### 2.2.1. Diseño de entrevistas

La investigación requiere **3–5 participantes por segmento y fase**, conforme al enunciado. Preparar consentimiento, guion, ficha de contexto y registro accesible. Evitar preguntas que sugieran una respuesta favorable al producto.

| Etapa | Preguntas y actividad | Registro requerido |
| --- | --- | --- |
| Contexto | ¿Qué rol cumple? ¿Cómo fue su última recepción, venta o entrega? | Rol/segmento, fecha, consentimiento y entorno. |
| Proceso actual | Muestre cómo registra un cambio de stock. ¿Cómo descubre una diferencia? | Secuencia y ejemplo concreto, sin datos privados innecesarios. |
| Dificultad | ¿Cuándo ocurrió por última vez? ¿Cómo la resolvió y qué costo tuvo? | Cita con minuto; separar estimación del participante de medición. |
| Prioridad | ¿Qué necesita resolver primero y por qué? | Clasificación de problemas, incluyendo desacuerdos. |
| Cierre | ¿Qué condición le impediría usar una solución? | Riesgos y permiso para una sesión de validación posterior. |

### 2.2.2. Registro de entrevistas

**Estado:** existen diferencias entre las fichas del capítulo separado y el README remoto más reciente. El primero conserva cuatro rutas inexistentes; el segundo referencia seis archivos fotográficos existentes y cambia dos nombres, manteniendo textos alternativos anteriores. Se conservan ambas fuentes para revisión, sin reasignar fotografías ni descartar respuestas del equipo. La correspondencia entre identidad, imagen, consentimiento y grabación requiere confirmación.

| Registro del README remoto | Diferencia con el capítulo separado | Archivo localizado; correspondencia por confirmar |
| --- | --- | --- |
| Carlos Mendoza | Mismo nombre; segmento de decisión | `Images/Carlos_Mendoza.jpeg` |
| Lucía Valdivia | Mismo nombre; segmento de decisión | `Images/Lucia_Valdivia1.jpeg` |
| Roberto Sánchez | El capítulo apunta a un archivo ausente | `Images/Entrevista_ Sebastian.jpg`; nombre de archivo distinto de la ficha |
| Miguel Rojas | El capítulo apunta a un archivo ausente | `Images/Raul_Delgado.jpeg`; nombre de archivo distinto de la ficha |
| Maria Morales | El capítulo registra Andrea Gómez; el README conserva ese alt | `Images/Entrevista_Maria_Morales.jpg` |
| Diego Ramirez | El capítulo registra Jorge Quispe; el README conserva ese alt | `Images/Entrevista_Diego_Ramirez.jpg` |

Las fichas y respuestas de **ambas versiones** están en el [archivo de investigación](research/README.md). La presencia de archivos no resuelve estas diferencias ni acredita por sí sola las entrevistas. Confirmar cada registro con el equipo y completar responsable real, fecha, enlace autorizado, duración, transcripción y marcas de tiempo antes de contabilizarlo como evidencia.

### 2.2.3. Análisis de entrevistas

Se conserva un **mapa provisional de temas**, pendiente de codificar con citas auténticas: conciliación de saldos, visibilidad de pendientes, control de pérdidas y coordinación del despacho. Para cada hallazgo, registrar participante anonimizado, cita/minuto, interpretación, requisito relacionado y evidencia contradictoria. No se calculan porcentajes de aceptación con estas fichas sin verificar.

## 2.3. Needfinding

### 2.3.1. User Personas

| Persona provisional | Objetivo | Necesidad y decisión de diseño | Validación pendiente |
| --- | --- | --- | --- |
| Administrador de negocio | Saber qué puede vender y qué falta entregar | Resumen de transacciones, stock y despachos; definiciones de métricas visibles. | Confirmar prioridades y frecuencia de consulta. |
| Operario de almacén | Registrar y preparar sin duplicar el trabajo | Recepción parcial, movimientos con motivo, navegación móvil y acciones por rol. | Observar el proceso real, conectividad y unidades que utiliza. |

Son arquetipos de diseño, no personas reales adicionales ni síntesis empírica concluida.

### 2.3.2. User Task Matrix

| Tarea | Administrador | Almacén | Ventas | Logística |
| --- | --- | --- | --- | --- |
| Consultar saldo | Sí | Sí | Sí | Lectura según permisos actuales |
| Recibir / ajustar inventario | Sí | Sí | No | No |
| Vender / devolver | Sí | No | Sí | No |
| Preparar y confirmar despacho | Sí | No | No | Sí |
| Ver resumen comercial | Sí | No | No | No |
| Provisionar empleado | Sí | No | No | No |

Esta matriz describe permisos del prototipo. Las reglas se validan también en API, no solo ocultando botones. El entorno de demo no sustituye una frontera de seguridad de servidor.

### 2.3.3. User Journey Mapping

| Momento | Tarea | Fricción hipotética | Respuesta y criterio observable |
| --- | --- | --- | --- |
| Recepción | Contrastar pedido y mercadería | Entrega incompleta | Recibir 2/4 mantiene pedido parcial y suma solo dos al saldo. |
| Venta | Seleccionar cantidad disponible | Sobreventa o producto dañado | Rechazo completo sin venta ni movimiento parcial. |
| Preparación | Asignar venta, conductor y vehículo | Recursos duplicados | Una venta no se asigna dos veces; conflicto de recursos al salir. |
| Entrega | Confirmar recepción | Estado sin evidencia mínima | Secuencia válida y receptor registrado. |
| Conciliación | Explicar el resultado | Métricas manuales | Saldo e importes derivados de operaciones persistidas. |

### 2.3.4. Empathy Mapping

El mapa de empatía es provisional: el administrador podría pensar «necesito saber de dónde sale este número» y el operario «necesito registrar una sola vez». Estas frases son hipótesis de diseño, no citas de entrevistados. Las capas piensa/siente/dice/hace se completarán con observación autorizada y citas, incluyendo frustraciones y prácticas que el equipo aún no conoce.

## 2.4. Big Picture Event Storming

El recorrido del dominio se ordena por el core: **mercadería recibida → saldo actualizado → venta confirmada → manifiesto creado → ruta iniciada → entrega confirmada**. Compras y ventas soportan el flujo; IAM limita quién puede ejecutar cada comando. Se distinguen comandos (registrar recepción), hechos (recepción registrada), política (crear alerta de stock mínimo), lectura (saldo) e interrogante (¿cómo tratar una entrega fallida?).

![Big Picture propuesto: comandos, hechos, políticas y lecturas](design/diagrams/rendered/event-storming.svg)

Cada fila muestra la secuencia local de un contexto; se presentan primero los contextos core y después el soporte comercial. La venta confirmada es una precondición del despacho. Este modelo de análisis requiere revisión del equipo; no acredita un taller colaborativo ya realizado. Los hechos nombran conceptos del dominio, no mensajes publicados por un bus. La implementación TB1 ejecuta políticas de forma síncrona y conserva registros transaccionales; no implementa broker ni event sourcing.

## 2.5. Ubiquitous Language

| Término | Definición y regla compartida |
| --- | --- |
| SKU | Identificador normalizado del artículo, único en una empresa. No representa saldo ni ubicación. |
| Stock / saldo | Cantidad entera disponible en TB1. Nunca negativa. |
| Conservación | Condición del artículo independiente de su cantidad; puede bloquear una venta. |
| Movimiento | Cambio de saldo con tipo, cantidad, motivo y responsable. |
| Orden de compra / recepción | Compromiso con proveedor y hecho de recibir; una recepción puede ser parcial. |
| Venta | Transacción confirmada que descuenta stock una vez. |
| Manifiesto de despacho | Asignación de venta, recursos y destino; no vuelve a descontar inventario. |
| Intento de entrega | Registro del resultado; TB1 registra únicamente confirmación exitosa con receptor. |
| Devolución | Retorno limitado por la línea vendida; reincorpora stock o registra pérdida según disposición. |
| Contribución bruta | Venta neta de devoluciones menos costo registrado y pérdidas; excluye otros gastos e impuestos. |
| Empresa / tenant | Frontera de pertenencia de los registros operativos. |
