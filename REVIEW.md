# Revisión conjunta de TB1

## Reproducir el informe

`npm ci --ignore-scripts` · `npm run report` · `npm run check`.

Para exportar: `npm run export`. Requiere un Chrome/Chromium disponible para Puppeteer; se puede indicar `MERMAID_CHROME_PATH`. `output/report.html` y el PDF nombrado con NRC 7750 se generan desde la misma fuente; `output/` no se versiona. Los diagramas renderizados están incluidos; `npm run diagrams` permite regenerarlos con Mermaid CLI.

## Revisar con el equipo

1. Leer alcance, registro de versiones y Student Outcome. Confirmar intervenciones reales y completar evidencia oral; nunca reasignar commits asistidos.
2. Verificar 37 historias, criterios y estados. Las 34 originales suman 119 SP; tres nuevas proponen 18 SP. La estimación no acredita horas ni velocidad.
3. Revisar DDD core → soporte → genéricos, value objects y límites de agregados. Contrastar C4 actual con diseño AV2.
4. Ejecutar el DDL de 35 tablas y revisar brechas por área. La demo sigue usando JSON/IndexedDB.
5. Completar actas/LACX, tablero con transiciones, entrevistas por segmento/fase, video de producto/exposición y reflexión individual.
6. Ejecutar recorrido funcional en frontend y revisar móvil, idiomas, errores y persistencia. Aprobar PR antes de merge y publicación.
7. Adjuntar presentación y reporte de participación exigidos por el curso. Este cambio no declara esos entregables como realizados.

La matriz de mejora continua del informe relaciona cada comentario del docente con su corrección y evidencia pendiente. La calificación permanece a criterio del docente; no se estima una nueva nota.
