# Capítulo II: Requirements Elicitation & Analysis

## 2.1. Competidores

### 2.1.1. Análisis competitivo

Revisión documental de fuentes primarias realizada el **13/11/2026**. Se distingue una capacidad publicada por el proveedor de una prueba realizada por el proyecto. No se comparan precios ni se atribuye una función ausente por no encontrarla en una página.

| Referente y fuente | Capacidad documentada por el proveedor | Relación con la necesidad de AI-ToDu |
| --- | --- | --- |
| [Odoo Inventory 19 · gestión de inventario](https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/inventory/warehouses_storage/inventory_management.html) | Distingue almacenes físicos y ubicaciones internas para organizar existencias. | La separación por sedes solicitada por Junior exige un modelo de ubicaciones; AV2 todavía mantiene una referencia operativa única. |
| [Alegra Perú](https://www.alegra.com/peru/) | Presenta contabilidad, facturación electrónica y punto de venta; su página describe inventario, reportes y terminales de venta. | Es un referente comercial para venta e inventario. AI-ToDu usa comprobantes de demostración y no declara equivalencia tributaria. |
| [Wally · sitio oficial](https://miwally.com/) | Presenta control de inventario, facturación y punto de venta en la nube. El dominio histórico wallypos.com redirige a miwally.com. | Permite contrastar la presentación de una operación comercial. No se realizó una prueba comparativa de usabilidad ni de desempeño. |
| AI-ToDu · repositorios y pruebas AV2 | Recepción parcial, movimientos, venta atómica y despacho vinculado; reglas y permisos probados con datos ficticios. | Propuesta académica de un recorrido compacto para administración y operación. Sus límites actuales incluyen sedes, lotes, pagos y fiscalidad. |

**Inferencia de diseño:** los referentes muestran que inventario/venta e integración administrativa son capacidades establecidas. La oportunidad propuesta es la comprensión de un recorrido acotado para los segmentos estudiados; su superioridad, preferencia y disposición de pago no han sido demostradas.

#### SWOT de AI-ToDu

| Factor | Análisis y respaldo | Respuesta propuesta |
| --- | --- | --- |
| Strengths | Flujo consistente, restricciones transaccionales y API documentada, respaldados por pruebas técnicas. Junior valora reunir funciones (12:01–13:08). | Conservar el vínculo recepción–saldo–venta–entrega y mostrar sus referencias. |
| Weaknesses | Recorridos guiados; vocabulario mezclado, acciones poco visibles e historial sin responsable en la versión evaluada. | Corregir H-01–H-09 y comprobar nuevamente con participantes; no sustituir esta comprobación por pruebas técnicas. |
| Opportunities | Solicitudes de separar sedes (Junior) y clasificar productos/identificar alertas (Shirley). Son señales cualitativas, no tamaño de mercado. | Evaluar marcas y ubicaciones con reglas de stock y nuevas tareas de validación. |
| Threats | Los referentes publican capacidades comerciales amplias; además, el alojamiento académico tiene límites de disponibilidad y continuidad. | Explicar alcance sin prometer equivalencia comercial; preparar continuidad de datos y operación. |

### 2.1.2. Estrategias y tácticas frente a competidores

La diferenciación propuesta es la comprensión del recorrido de una operación, no la cantidad de pantallas. Se probarán tres tácticas: historial visible para explicar el saldo, despacho a partir de una venta ya registrada e indicadores con definición comprensible. La preferencia y disposición de adopción requieren investigación; no se afirman como ventaja validada.

## 2.2. Entrevistas

### 2.2.1. Diseño de entrevistas

La elicitación inicial se registra por segmento objetivo. Preparar consentimiento, guion, ficha de contexto y registro accesible. Evitar preguntas que sugieran una respuesta favorable al producto. El plan y los registros de validación del incremento AV2 se presentan por separado en la sección 5.3.

| Etapa | Preguntas y actividad | Registro requerido |
| --- | --- | --- |
| Contexto | ¿Qué rol cumple? ¿Cómo fue su última recepción, venta o entrega? | Rol/segmento, fecha, consentimiento y entorno. |
| Proceso actual | Muestre cómo registra un cambio de stock. ¿Cómo descubre una diferencia? | Secuencia y ejemplo concreto, sin datos privados innecesarios. |
| Dificultad | ¿Cuándo ocurrió por última vez? ¿Cómo la resolvió y qué costo tuvo? | Cita con minuto; separar estimación del participante de medición. |
| Prioridad | ¿Qué necesita resolver primero y por qué? | Clasificación de problemas, incluyendo desacuerdos. |
| Cierre | ¿Qué condición le impediría usar una solución? | Riesgos y permiso para una sesión de validación posterior. |

### 2.2.2. Registro de entrevistas


Las entrevistas de elicitación se organizaron en dos segmentos: tomadores de decisión y usuarios finales. Cada ficha presenta los datos y el resumen registrados por el equipo en TB1.


#### Segmento 1: Tomadores de Decisión (Dueños, Administradores, Gerentes)

<div class="interview-record">

| Campo | Detalle |
| :--- | :--- |
| **Nombres y Apellidos** | Carlos Mendoza |
| **ID** | E-S1-01 |
| **Edad / Distrito** | 45 años / Santiago de Surco |
| **Timing del video** | 00:00 - 04:15 min |
| **Evidencia fotográfica** | <img src="Images/Carlos_Mendoza.jpeg" width="260" alt="Carlos Mendoza"> |
| **Resumen descriptivo** | Carlos está casado y tiene dos hijos. Administra una pequeña cadena de tres restaurantes. Su dispositivo principal es una Laptop con Windows, pero revisa todo el día su celular (iPhone). Se informa vía LinkedIn y WhatsApp, y admira marcas que proyectan estatus y eficiencia como Apple y a referentes locales como Gastón Acurio. En su día a día, sufre de estrés porque confía en reportes de Excel elaborados a mano por su administrador, lo que genera un descuadre constante (merma) entre las compras de mercado y las ventas en caja. Su mayor expectativa de "varita mágica" es un panel de control (Dashboard) que le muestre en su celular si el negocio está ganando o perdiendo dinero en tiempo real. |

</div>

<div class="interview-record">

| Campo | Detalle |
| :--- | :--- |
| **Nombres y Apellidos** | Lucía Valdivia |
| **ID** | E-S1-02 |
| **Edad / Distrito** | 38 años / San Borja |
| **Timing del video** | 04:16 - 08:30 min |
| **Evidencia fotográfica** | <img src="Images/Lucia_Valdivia1.jpeg" width="260" alt="Lucía Valdivia"> |
| **Resumen descriptivo** | Lucía es soltera y fundadora de una MYPE textil. Pasa casi todo su día en su Smartphone (Android de gama alta) y utiliza mucho Instagram y WhatsApp Business para vender. Sigue a marcas como Zara (por su logística) y a diversos influencers emprendedores. Su mayor frustración (dolor) es que se le ha paralizado la producción varias veces porque olvidó comprar hilos o botones específicos, ya que el control lo lleva en un cuaderno. Expresó que aprender sistemas nuevos le asusta un poco, por lo que pide que la solución tenga botones muy claros y alertas de colores cuando falte mercadería. |

</div>

<div class="interview-record">

| Campo | Detalle |
| :--- | :--- |
| **Nombres y Apellidos** | Sebastián Ramírez |
| **ID** | E-S1-03 |
| **Video de entrevista** | [Ver entrevista de Sebastián Ramírez](https://youtu.be/AItYU4_ckvU) |
| **Evidencia fotográfica** | <img src="Images/Entrevista_%20Sebastian.jpg" width="260" alt="Sebastián Ramírez durante la entrevista"> |

</div>

#### Segmento 2: Usuarios Finales (Jefes de Logística, Operarios de Almacén)

<div class="interview-record">

| Campo | Detalle |
| :--- | :--- |
| **Nombres y Apellidos** | Miguel Rojas |
| **ID** | E-S2-01 |
| **Edad / Distrito** | 28 años / San Juan de Miraflores |
| **Timing del video** | 12:46 - 16:20 min |
| **Evidencia fotográfica** | <img src="Images/Raul_Delgado.jpeg" width="260" alt="Miguel Rojas"> |
| **Resumen descriptivo** | Miguel vive con su pareja y es Jefe de Logística en una distribuidora. Es totalmente nativo digital, utiliza un celular Android y sus canales favoritos son TikTok y YouTube. Sigue marcas de tecnología accesible y deportivas (Samsung, Adidas). Confesó que su mayor carga operativa es hacer el inventario de fin de mes; se queda hasta la madrugada contando cajas a mano porque los papeles de despacho de la semana siempre se pierden. Pide que el sistema ideal le permite registrar salidas con la menor cantidad de clics posibles, casi como usar una red social. |

</div>

<div class="interview-record">

| Campo | Detalle |
| :--- | :--- |
| **Nombres y Apellidos** | María Morales |
| **Video de entrevista** | [Ver entrevista de María Morales](https://youtu.be/-meI6Cyn0IA) |
| **ID** | E-S2-02 |
| **Edad / Distrito** | 28 años / Chorrillos |
| **Timing del video** | 16:21 - 20:00 min |
| **Evidencia fotográfica** | <img src="Images/Entrevista_Maria_Morales.jpg" width="260" alt="Entrevista E-S2-02"> |
| **Resumen descriptivo** | Maria es madre soltera y operaria de almacén en una MYPE textil. Usa un teléfono Android de gama media y se comunica exclusivamente por WhatsApp y Facebook. Sigue marcas de ropa nacionales y páginas de entretenimiento. Su frustración principal es el desorden físico y lógico: pierde hasta una hora buscando un código de tela específico porque en Excel los nombres son muy confusos. Aceptaría probar AI-ToDu siempre y cuando tenga un "buscador inteligente" donde pueda escribir palabras clave (ej. "tela roja algodón") y le diga en qué repisa está. |

</div>

<div class="interview-record">

| Campo | Detalle |
| :--- | :--- |
| **Nombres y Apellidos** | Diego Ramirez |
| **ID** | E-S2-03 |
| **Edad / Distrito** | 31 años / Ate Vitarte |
| **Timing del video** | 20:01 - 24:15 min |
| **Evidencia fotográfica** | <img src="Images/Entrevista_Diego_Ramirez.jpg" width="260" alt="Entrevista E-S2-03"> |
| **Resumen descriptivo** | Diego es casado y encargado de despachos en un consorcio de alimentos. Tiene habilidades tecnológicas moderadas y prefiere herramientas extremadamente simples. Usa Facebook para informarse y admira marcas de consumo masivo que son transparentes (Gloria, Cristal). Su dolor principal radica en el registro de mermas y devoluciones: cuando un producto llega malogrado al cliente, el trámite en papel para ingresarlo de nuevo como "pérdida" es tan tedioso que a veces simplemente no lo anota, generando el descuadre. Desea un sistema que con dos toques le permita registrar una merma. |

</div>


### 2.2.3. Análisis de entrevistas

Las fichas de elicitación identifican cuatro temas: conciliación de saldos, visibilidad de las operaciones, control de pérdidas y coordinación del despacho. Estos temas orientan las personas y los escenarios de diseño. Las cinco entrevistas de validación de AV2 se analizan por separado en §5.3.2.

## 2.3. Needfinding

### 2.3.1. User Personas

| Persona provisional | Objetivo | Necesidad y decisión de diseño | Aspecto de análisis |
| --- | --- | --- | --- |
| Administrador de negocio | Saber qué puede vender y qué falta entregar | Resumen de transacciones, stock y despachos; definiciones de métricas visibles. | Confirmar prioridades y frecuencia de consulta. |
| Operario de almacén | Registrar y preparar sin duplicar el trabajo | Recepción parcial, movimientos con motivo, navegación móvil y acciones por rol. | Observar el proceso real, conectividad y unidades que utiliza. |

Son arquetipos de diseño, no personas reales adicionales. La actualización cualitativa usa las cinco validaciones sin añadir participantes ni datos demográficos inferidos.

| Arquetipo | Comportamiento descrito y fuente | Necesidad observada | Límite de la síntesis |
| --- | --- | --- | --- |
| Administración de negocio | Kimberlin recibe materiales y supervisa compras/ventas (00:37–00:57); Junior valora concentrar registros (12:01–13:08). | Comprender el recorrido y diferenciar sedes; lenguaje en español. | No se midió presupuesto, adopción ni frecuencia de uso. |
| Operación de almacén | Fabiana registra en hoja compartida y sistema (00:35–00:47); Diego usa portapapeles y computadora (00:36–00:48). | Acciones accesibles, saldo claro, responsable y espera visible. | Contexto declarado en entrevista; no se observó la jornada real. |

**User Personas.** Carlos Mendoza representa la administración del negocio y Miguel Rojas la operación del almacén.

![User Persona de administración: Carlos Mendoza](Images/User-Persona-1.png)

![User Persona de operación: Miguel Rojas](Images/User-Persona-2.png)

### 2.3.2. User Task Matrix

Consideramos dos segmentos: administrador del negocio y operario de almacén. Las tareas existen independientemente de AI-ToDu. Las frecuencias e importancias se presentan como estimaciones de diseño.

| Tarea del negocio | Administrador · frecuencia | Administrador · importancia | Operario · frecuencia | Operario · importancia |
| --- | --- | --- | --- | --- |
| Conciliar mercadería disponible | Diaria, por validar | Alta, por validar | Diaria, por validar | Alta, por validar |
| Contrastar pedido y entrega del proveedor | Por recepción, por validar | Alta, por validar | Por recepción, por validar | Alta, por validar |
| Registrar entradas, salidas y pérdidas | Diaria, por validar | Alta, por validar | Por movimiento, por validar | Alta, por validar |
| Comprobar que se puede atender una venta | Por venta, por validar | Alta, por validar | Por preparación, por validar | Alta, por validar |
| Coordinar recursos y confirmar entrega | Por reparto, por validar | Alta, por validar | Por pedido, por validar | Media/alta, por validar |
| Explicar diferencias de saldo e importes | Periódica, por validar | Alta, por validar | Al detectar diferencia, por validar | Alta, por validar |

La coincidencia propuesta es conciliar saldo y registrar movimientos. La diferencia por validar está en la supervisión global frente a la comprobación física. Esta matriz no representa permisos de software. Las fichas y capturas de UXPressia acompañan el análisis de los segmentos.

### 2.3.3. User Journey Mapping

El recorrido **As-Is**, anterior a nuestra solución, abarca recepción, preparación de entrega y conciliación. Los escenarios son hipótesis; no observaciones verificadas. Las capturas históricas de UXPressia se conservan a continuación; su contraste con las fuentes de investigación sigue siendo una actividad de análisis.

| Persona | Etapa actual sin AI-ToDu | Acción del negocio por validar | Fricción hipotética | Fuente |
| --- | --- | --- | --- | --- |
| Administrador | Comprueba disponibilidad | Contrasta pedido, registro y confirmación del almacén | Información distribuida entre registros y mensajes | Escenario de diseño |
| Administrador | Coordina reparto | Asigna responsable y pide confirmación | Venta y entrega difíciles de relacionar | Escenario de diseño |
| Administrador | Concilia jornada | Compara ventas, mercadería y entregas | Diferencias sin referencia compartida | Escenario de diseño |
| Operario | Recibe mercadería | Cuenta unidades y compara con pedido | Entrega parcial o dato incompleto | Escenario de diseño |
| Operario | Prepara salida | Ubica, separa y vuelve a contar unidades | Saldo desactualizado o doble anotación | Escenario de diseño |
| Operario | Informa diferencias | Comunica pérdida o faltante y busca la causa | Motivo y responsable sin vincular | Escenario de diseño |

El recorrido recepción → venta → despacho del prototipo corresponde a la solución **To-Be**; se documenta en diseño e implementación y no sustituye el Journey As-Is.

**User Journey Maps.** Los mapas representan los escenarios de administración y operación definidos durante el diseño de TB1.

![User Journey del administrador](Images/User-Journey-Map-1.png)

![User Journey del operario](Images/User-Journey-Map-2.png)

### 2.3.4. Empathy Mapping

El mapa separa lo expresado de lo inferido. Las paráfrasis remiten a sus fuentes; no se inventan citas ni emociones.

| Dimensión | Administración | Operación | Naturaleza de la evidencia |
| --- | --- | --- | --- |
| Dice | Kimberlin pide cambiar palabras en inglés (09:59–10:16); Junior solicita separar tiendas (13:19–13:40). | Diego pide quién registró y espera visible (06:45–07:35); Fabiana pide acciones accesibles (08:59–09:11). | Paráfrasis del feedback grabado. |
| Hace | Kimberlin ejecuta recepción, venta y despacho con indicaciones (04:15–08:16). | Fabiana recibe parcialmente con ayuda (05:47–06:58). | Actividad observada en la demo, sin extrapolar al trabajo real. |
| Piensa | Podría necesitar distinguir el estado de cada sede y el significado de sus registros. | Podría necesitar confiar en la cantidad antes de confirmar una salida. | Inferencias de diseño por contrastar; no pensamientos declarados. |
| Siente | No se aplicó un instrumento para medir confianza, satisfacción o frustración. | La conectividad es una preocupación descrita; no se midió estrés ni frecuencia del problema. | No se asignan emociones o puntuaciones sin evidencia. |

Shirley combina ambos perfiles y aporta dudas sobre la acción de venta y las alertas (11:22–12:23). El mapa no transforma una valoración favorable en aceptación del producto.

**Empathy Maps.** Las láminas organizan necesidades y dificultades de los dos arquetipos; la tabla anterior incorpora las observaciones obtenidas en AV2.

![Empathy Map del administrador](Images/Empathy-Map-1.png)

![Empathy Map del operario](Images/Empathy-Map-2.png)

## 2.4. Big Picture Event Storming

El recorrido del dominio se ordena por el core: **mercadería recibida → saldo actualizado → venta confirmada → manifiesto creado → ruta iniciada → entrega confirmada**. Compras y ventas soportan el flujo; IAM limita quién puede ejecutar cada comando. Se distinguen comandos (registrar recepción), hechos (recepción registrada), política (crear alerta de stock mínimo), lectura (saldo) e interrogante (¿cómo tratar una entrega fallida?).

![Big Picture propuesto: comandos, hechos, políticas y lecturas](design/diagrams/rendered/event-storming.svg)

Cada fila muestra la secuencia local de un contexto; se presentan primero los contextos core y después el soporte comercial. La venta confirmada es una precondición del despacho. El modelo organiza los actores, comandos, eventos y políticas del dominio. Los hechos nombran conceptos del dominio, no mensajes publicados por un bus. La implementación TB1 ejecuta políticas de forma síncrona y conserva registros transaccionales; no implementa broker ni event sourcing.

## 2.5. Ubiquitous Language

| Término | Definición y regla compartida |
| --- | --- |
| SKU | Identificador normalizado del artículo, único en una empresa. No representa saldo ni ubicación. |
| Stock (saldo) | Cantidad entera disponible. Nunca negativa. |
| Conservation condition (conservación) | Condición del artículo independiente de su cantidad; puede bloquear una venta. |
| Stock movement (movimiento) | Cambio de saldo con tipo, cantidad, motivo y responsable. |
| Purchase order (orden de compra) | Compromiso con un proveedor que conserva cantidades pedidas y pendientes. |
| Goods receipt (recepción) | Hecho de recibir mercadería; una recepción de compra puede ser parcial. |
| Sale (venta) | Transacción confirmada que descuenta stock una vez. |
| Dispatch manifest (manifiesto de despacho) | Asignación de venta, recursos y destino; no vuelve a descontar inventario. |
| Delivery confirmation (confirmación de entrega) | Finalización con receptor y fecha; los intentos fallidos quedan para una extensión futura. |
| Return (devolución) | Retorno limitado por la línea vendida; reincorpora stock o registra pérdida según disposición. |
| Gross contribution (contribución bruta) | Venta neta de devoluciones menos costo registrado y pérdidas; excluye otros gastos e impuestos. |
| Business (empresa) | Organización a la que pertenecen los registros y los usuarios autorizados. |
