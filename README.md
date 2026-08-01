# CVDC 2026 - NOVALFARM SAS

## Descripción

Sistema web desarrollado para el registro, gestión comercial y consulta ejecutiva de los visitantes del stand de NOVALFARM SAS durante el Congreso Veterinario CVDC 2026.

El proyecto fue desarrollado como una solución ligera, rápida y altamente disponible utilizando tecnologías web estáticas y los servicios de Google Workspace.

El sistema fue diseñado para operar durante el evento con múltiples usuarios trabajando simultáneamente desde computadores, tablets y teléfonos móviles.

---

# Objetivos del proyecto

El sistema permite cubrir completamente el flujo comercial del evento:

1. Registro inicial del visitante.
2. Consulta inteligente del visitante registrado.
3. Registro de la gestión comercial realizada.
4. Consulta ejecutiva de resultados en tiempo real.

---

# Arquitectura General

Visitante

↓

Landing Page (index.html)

↓

FORM_UNO (Google Forms)

↓

Google Sheets A

↓

Apps Script API

↓

Gestión Comercial (gestioncomercial.html)

↓

FORM_DOS

↓

Google Sheets B

↓

Dashboard Comercial

↓

Dirección Comercial / CEO

---

# Tecnologías utilizadas

Frontend

- HTML5
- CSS3
- JavaScript ES6

Servicios

- GitHub Pages
- Google Forms
- Google Sheets
- Google Apps Script

APIs

- Fetch API
- AbortController
- FormData

Control de versiones

- Git
- GitHub

---

# Estructura del proyecto

/assets

/css

/styles.css

/index.css

/gestioncomercial.css

/dashboardcomercial.css

/js

/scripts.js

/contacto.js

/gestionc.js

/dashboardc.js

/pages

/index.html

/gestioncomercial.html

/dashboardcomercial.html

---

# Flujo del sistema

## 1 Registro del visitante

Página:

index.html

Script:

contacto.js

Destino:

Google Forms (FORM_UNO)

Base de datos:

Google Sheets A

Resultado:

Generación automática del ID único del participante.

---

## 2 Gestión Comercial

Página:

gestioncomercial.html

Script:

gestionc.js

Consulta:

CVDC2026_API

Base:

Google Sheets A

Registro:

Google Sheets B

Resultado:

Registro de la gestión comercial asociada al participante.

---

## 3 Dashboard Comercial

Página:

dashboardcomercial.html

Script:

dashboardc.js

Consulta:

CVDC2026_API

Resultado:

Indicadores ejecutivos en tiempo real.

---

# API

Servicio

CVDC2026_API

Funciones implementadas

estado

buscar

participante

registrargestion

resumengestiones

gestiones

gestion

---

# Funcionalidades implementadas

## Landing

✔ Registro del visitante

✔ Validaciones

✔ Responsive

✔ Integración Google Forms

---

## Gestión Comercial

✔ Búsqueda inteligente

✔ Autocompletado

✔ Recuperación del participante

✔ Registro comercial

✔ Idempotencia

✔ Control de duplicados

✔ Trazabilidad

---

## Dashboard

✔ Resumen Ejecutivo

✔ Indicadores

✔ Buscador

✔ Filtros

✔ Paginación

✔ Modal de detalle

✔ Actualización automática

---

# Seguridad implementada

✔ Validación Frontend

✔ Validación Backend

✔ Timeout de API

✔ AbortController

✔ Prevención de doble envío

✔ Prevención de doble clic

✔ RequestID

✔ ID Gestión

✔ Recuperación automática

✔ Protección frente a suspensión

✔ Versionado de recursos

✔ Manejo de errores

✔ Estados de carga

✔ Recuperación de conexión

---

# Arquitectura de Datos

Google Sheets A

Registro del visitante.

Google Sheets B

Registro de la gestión comercial.

Las hojas trabajan mediante Apps Script como API REST.

El Frontend nunca consulta directamente Google Sheets.

---

# Dashboard

Permite consultar:

Número de gestiones.

Interés comercial.

Potencial de compra.

Solicitudes de visita.

Entrega de muestras.

Filtros por:

- búsqueda
- nivel
- potencial
- visita
- línea de interés

Detalle completo por gestión.

---

# Compatibilidad

Desktop

✔ Windows

✔ macOS

Tablet

✔ Android

✔ iPadOS

Móvil

✔ Android

✔ iPhone

Navegadores

✔ Chrome

✔ Edge

✔ Firefox

✔ Safari

---

# Rendimiento

Arquitectura validada para:

Hasta aproximadamente 1500 registros durante el evento.

Consultas concurrentes desde múltiples dispositivos.

Operación sincronizada entre:

Visitantes

↓

Comerciales

↓

Dirección Comercial

↓

CEO

---

# Versionado

Versión actual

Frontend 1.0.0

Backend 1.0.0

API 1.0.0

Los archivos CSS y JavaScript utilizan versionado mediante Query String.

Ejemplo

dashboardc.js?v=1.0.0

Cuando exista una actualización publicada deberá incrementarse la versión correspondiente.

---

# Despliegue

Repositorio

GitHub

Hosting

GitHub Pages

Base de datos

Google Sheets

API

Google Apps Script

---

# Estado del Proyecto

Estado actual

PRODUCCIÓN

Proyecto certificado funcionalmente.

Todas las pruebas de integración fueron ejecutadas satisfactoriamente.

---

# Pruebas realizadas

Se certificaron:

Registro del visitante.

Registro comercial.

Dashboard.

API.

Responsive.

Desktop.

Tablet.

Móvil.

Timeout.

Offline.

Recuperación.

Versionado.

Estados de carga.

Protección frente a suspensión.

Prevención de duplicados.

Prevención de doble envío.

Recuperación automática.

Consultas concurrentes.

Paginación.

Filtros.

Modal.

Integración completa.

---

# Mantenimiento

Para futuras modificaciones:

1.

Actualizar la versión del recurso.

Ejemplo

dashboardc.js?v=1.0.1

2.

Actualizar README.

3.

Realizar pruebas de integración.

4.

Publicar mediante GitHub.

---

# Autor

Proyecto desarrollado para

NOVALFARM SAS

Congreso Veterinario CVDC 2026

Departamento de Tecnología e Informática

---

# Licencia

Uso interno exclusivo de NOVALFARM SAS.

Proyecto desarrollado para operación institucional.
