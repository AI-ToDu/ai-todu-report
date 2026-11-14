# Capítulo I: Introducción

## 1.1. Startup Profile

### 1.1.1. Descripción de la startup

IA-INNOVATION desarrolla **AI-ToDu**, una propuesta de software para pequeños negocios que necesitan conectar el inventario de almacén con compras, ventas y despachos. La unidad de valor es una operación trazable: conocer qué artículo entró, por qué cambió su saldo, qué venta comprometió unidades y qué entrega utilizó esa venta.

TB1 demuestra esta cadena con datos ficticios y una Fake REST API. El nombre del producto no acredita modelos de inteligencia artificial implementados. Predicción de demanda, optimización automática de rutas y decisiones basadas en IA permanecen fuera de la versión actual.

#### Misión, visión y valores propuestos

**Misión:** ayudar a pequeños negocios a comprender y registrar el recorrido de su mercadería, desde la recepción hasta la venta y la entrega, mediante información compartida y trazable. **Visión:** evolucionar hacia una herramienta comprensible para quienes administran y operan un negocio. Ambas declaraciones expresan una intención del producto; no son resultados empresariales medidos.

Los valores de diseño son trazabilidad (explicar cada cambio), claridad (lenguaje y acciones comprensibles), responsabilidad (identificar quién registra) y mejora basada en evidencia (corregir a partir de observaciones verificables).

### 1.1.2. Perfiles de integrantes del equipo

Perfiles académicos y fotografías del informe base. Se conserva la presentación histórica del equipo; la preparación y el seguimiento actuales de AV2 están a cargo de **Kevin Junior Salazar Marquina**. Los aportes se atribuyen por entrega con sus fuentes en Student Outcome.

| Fotografía original | Integrante y código | Perfil académico declarado |
| --- | --- | --- |
| <img src="Images/Foto-Carlitos.jpg" alt="Carlos Alberto Bernal Torres" width="84"> | Bernal Torres, Carlos Alberto · U202420071 | Estudiante con sólidos conocimientos en el desarrollo frontend y backend. Aporta al equipo habilidades en la implementación de arquitecturas orientadas a dominio (DDD). |
| <img src="Images/Foto-Carlos.jpg" alt="Luis Carlos Chui Kcomt" width="84"> | Chui Kcomt, Luis Carlos · U20241i327 | Estudiante responsable con conocimientos en Python, C++, HTML. Aporta calidad y buen rendimiento en trabajos en equipo así como buen ambiente y compromiso. |
| Fotografía original no disponible | Condezo Pacheco, Fernando André · U202411324 | Estudiante con conocimientos en C++ y Python. Aporta colaboración con el equipo y buen ambiente. |
| <img src="Images/Foto-Kevin.jpg" alt="Kevin Junior Salazar Marquina" width="84"> | Salazar Marquina, Kevin Junior · U202417747 | Estudiante con sólidos conocimientos en el desarrollo frontend y backend. Aporta al equipo habilidades en el uso de frameworks como Angular y Spring Boot, enfocado en asegurar la escalabilidad del sistema B2B. |
| <img src="Images/Foto-Darikson.jpg" alt="Darikson Bill Salazar Quiche" width="84"> | Salazar Quiche, Darikson Bill · U202422620 | Estudiante proactivo, enfocado en el desarrollo de interfaces amigables (UI/UX) y en el análisis de las necesidades operativas de los negocios MYPE. |

Las cuatro imágenes y los perfiles se recuperan del informe TB1. La referencia histórica a `Foto-Nando.jpg` no tiene un archivo correspondiente en el historial revisado; no se sustituye por una fotografía de otra persona.

## 1.2. Solution Profile

### 1.2.1. Antecedentes y problemática

La hipótesis de problema es que el registro fragmentado entre cuadernos, hojas de cálculo y mensajes dificulta conciliar existencias y entregas. Se propone un flujo compartido entre quien administra y quien opera el almacén. La frecuencia, costo y severidad del problema deberán contrastarse con entrevistas verificables; no se presentan porcentajes de pérdida como datos medidos.

| Situación por validar | Consecuencia esperada | Respuesta de diseño |
| --- | --- | --- |
| Entradas y salidas sin motivo ni responsable | Conciliación difícil | Historial persistente y movimientos tipificados. |
| Venta sin comprobación del saldo/conservación | Sobreventa o artículo bloqueado | Validación completa y descuento atómico. |
| Despacho separado de la venta | Doble registro y pérdida de referencia | Manifiesto enlazado con líneas de venta reales. |
| Uso de números manuales como indicadores | Decisiones con información desactualizada | Métricas derivadas del registro, con límites contables explícitos. |

#### Análisis de la problemática · 5W2H

| Pregunta | Delimitación y evidencia |
| --- | --- |
| What · ¿Qué ocurre? | Se usan registros separados para controlar mercadería. Fabiana describe hoja compartida y sistema (00:35–00:47); Diego, portapapeles y computadora (00:36–00:48); Shirley, cuadernos/comprobantes/WhatsApp (00:35–00:54). |
| Why · ¿Por qué atenderlo? | El producto busca facilitar la consulta y explicación del saldo. La falta de responsable visible señalada por Diego (06:45–07:07) muestra una necesidad de trazabilidad; no demuestra una pérdida monetaria medida. |
| Who · ¿Quiénes intervienen? | Administración decide y supervisa; operación recibe y registra. Una persona puede cubrir ambas funciones, como Shirley. Las cinco sesiones no representan estadísticamente a todas las MYPE. |
| Where · ¿Dónde? | Contextos descritos: tienda, almacén, colegio y peluquería/emprendimiento de belleza. La validación se realizó sobre la aplicación con datos ficticios; no es observación de sus sistemas productivos. |
| When · ¿Cuándo? | En recepción, movimiento, venta, preparación y entrega. Frecuencia y duración de conciliación no se midieron; se conservan como variables de investigación. |
| How · ¿Cómo se aborda? | Un SKU y saldo compartido, movimientos con motivo/responsable, recepción parcial y despacho enlazado con una venta. Las acciones y mensajes se revisan con hallazgos H-01–H-09. |
| How much · ¿Cuánto cuesta o mejora? | No se midieron pérdida, disposición de pago, ahorro ni retorno de inversión. Los tiempos de los videos son intervalos de una sesión guiada, no ahorro de tiempo del negocio. |

Fuentes: grabaciones y fichas de §5.3.2. Esta actualización aprovecha el contexto recogido en la validación sin volver a contabilizar esas sesiones como nuevas entrevistas de elicitación.

### 1.2.2. Lean UX Process

#### 1.2.2.1. Lean UX Problem Statements

Un pequeño negocio necesita coordinar recepción, venta y reparto con una vista común de las existencias. Suponemos que la fragmentación actual exige conciliaciones manuales y retrabajo. Sabremos que el problema fue atendido cuando usuarios de ambos segmentos completen un recorrido con saldo y entrega conciliados, con menos errores que en su proceso de referencia.

#### 1.2.2.2. Lean UX Assumptions

- El dueño considera útil un sistema que explica el origen del saldo y de sus métricas.
- El operario dispone de un dispositivo y conexión compatibles con la aplicación web.
- El negocio acepta un catálogo por SKU y cantidades enteras en la primera versión.
- Roles y lenguaje claro reducen errores sin exigir capacitación extensa.

Estas son suposiciones. La demo no prueba disposición de pago, tamaño de mercado, retención ni ahorro de tiempo en una empresa real.

#### 1.2.2.3. Lean UX Hypothesis Statements

| Hipótesis | Experimento propuesto | Criterio objetivo, aún no medido |
| --- | --- | --- |
| H1 · Un saldo acompañado por historial genera comprensión. | Pedir a los participantes con funciones de almacén que expliquen un cambio de saldo después de una recepción y una venta. | Al menos 80% identifica cantidad y motivo sin ayuda. |
| H2 · El manifiesto enlazado evita pérdida de referencia. | Dueños y operarios preparan el mismo despacho desde una venta. | 80% completa el flujo sin duplicar venta ni descontar stock nuevamente. |
| H3 · La interfaz bilingüe conserva comprensión del flujo. | Repetir una tarea en el idioma preferido, observar etiquetas y errores. | Sin mensajes clave sin traducir; 80% comprende el rechazo de sobreventa. |

Los porcentajes son umbrales de decisión del experimento, no resultados del producto. Registrar tamaño muestral, tiempo, errores y ayuda del moderador antes de compararlos.

#### 1.2.2.4. Lean UX Canvas

![Lean UX Canvas específico de AI-ToDu](assets/lean-ux-canvas.svg)

**Canvas de la entrega TB1.** Se conserva la imagen original como antecedente del proceso; el canvas anterior presenta la síntesis revisada para AI-ToDu.

![Lean UX Canvas histórico de TB1](Images/Lean_UX_Canvas.jpeg)

El canvas representa hipótesis actuales. Reemplaza la imagen heredada de otro producto y se actualiza con hallazgos trazables, no con conclusiones anticipadas.

## 1.3. Segmentos objetivo

### 1.3.1. Dueños y administradores de pequeños negocios

Deciden la adopción y necesitan comprender existencias, ventas registradas y despachos pendientes. La entrevista debe contrastar frecuencia de conciliación, consecuencias de errores y quién autoriza ajustes o devoluciones. La versión actual ofrece un resumen operativo; contribución bruta no equivale a utilidad neta.

### 1.3.2. Jefes de logística y personal de almacén

Ejecutan recepción, movimientos, preparación y entrega. Se priorizan lectura clara, acciones por rol y acceso móvil. Las restricciones del primer corte son cantidades enteras, una ubicación operativa de referencia y un destino por despacho. Operaciones por lote, múltiples almacenes y rutas con varias paradas requieren evolución y validación.
