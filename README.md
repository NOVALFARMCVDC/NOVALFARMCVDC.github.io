# NOVALFARM SAS — REGISTRO CVDC 2026

## Estado del proyecto

**Proyecto:** Landing Page de Registro — CVDC 2026  
**Empresa:** Novalfarm SAS  
**Año:** 2026  
**Estado actual:** Desarrollo funcional / preparación para despliegue final  
**Versión de referencia:** Julio de 2026

---

# 1. DESCRIPCIÓN DEL PROYECTO

Este proyecto corresponde a una Landing Page desarrollada para la participación
de Novalfarm SAS en el CVDC 2026.

Su objetivo principal es permitir el registro de asistentes y visitantes mediante
un formulario web integrado con Google Forms, manteniendo la identidad gráfica
definida para la campaña y los lineamientos visuales corporativos de Novalfarm SAS.

La página incluye:

- Header corporativo.
- Hero gráfico de campaña CVDC 2026.
- Información de contacto.
- Formulario de registro.
- Integración del formulario con Google Forms.
- Campo condicional según el perfil del visitante.
- Autorización para tratamiento de datos personales.
- Mapa de ubicación.
- Call To Action (CTA).
- Footer corporativo.
- Diseño responsive.
- Menú móvil accesible.
- Validaciones de formulario mediante JavaScript.

---

# 2. TECNOLOGÍAS UTILIZADAS

El proyecto está desarrollado utilizando:

- HTML5
- CSS3
- JavaScript Vanilla
- Google Forms como receptor de registros
- Google Maps Embed
- Google Fonts
- Montserrat
- Font Awesome 6.5.1

No se utilizan frameworks JavaScript ni frameworks CSS.

---

# 3. ESTRUCTURA GENERAL DEL PROYECTO

La estructura debe mantenerse organizada de forma similar a:

project/
│
├── index.html
├── index.css
│
├── assets/
│   ├── icons/
│   │   ├── FaviconNovalfarm.ico
│   │   └── LogoNegativoNovalfarmB.svg
│   │
│   └── images/
│       ├── Header.png
│       ├── Body.webp
│       ├── Footer.webp
│       └── PreviewNovalfarm.webp
│
├── styles/
│   └── styles.css
│
├── scripts/
│   ├── scripts.js
│   └── contacto.js
│
└── README.md

IMPORTANTE:

Antes de modificar rutas, verificar la ubicación real de index.html/index.css
en el servidor, ya que actualmente existen referencias relativas mediante
"./" y "../".

---

# 4. IDENTIDAD VISUAL

## Paleta oficial utilizada

### Color principal — Azul Noval

#312783

Variable CSS:

--color-primary: #312783;

### Color secundario — Morado Mintrel Force

#5F5692

Variable CSS:

--color-secondary: #5F5692;

### Color terciario — Rosado Mintrel Force

#F1C5DC

Variable CSS:

--color-accent: #F1C5DC;

---

# 5. TIPOGRAFÍA

La tipografía definida para todo el proyecto es:

Montserrat

Se carga desde Google Fonts.

Pesos utilizados:

- 400 — texto regular.
- 500 — textos intermedios.
- 600 — elementos destacados.
- 700 — títulos.

Lineamiento principal:

Títulos:
font-weight: 700;

Cuerpo de texto:
font-weight: 400;

No reemplazar Montserrat sin autorización del responsable del proyecto.

---

# 6. ARCHIVOS PRINCIPALES

## index.html

Contiene la estructura principal de la Landing Page.

Incluye:

- Header
- Navegación
- Hero
- Información de contacto
- Formulario
- Autorización de datos
- Mapa
- CTA
- Footer

También contiene los identificadores (`id`) y los nombres (`name`) utilizados
por JavaScript y Google Forms.

IMPORTANTE:

No modificar los atributos `name="entry.xxxxx"` del formulario sin verificar
previamente los identificadores correspondientes en Google Forms.

---

## styles/styles.css

Contiene los estilos globales del proyecto.

Responsable de:

- Variables CSS.
- Paleta corporativa.
- Reset.
- Tipografía.
- Botones.
- Header.
- Navegación.
- Menú móvil.
- Footer.
- Responsive global.
- Scrollbar.
- Estados generales.

---

## index.css

Contiene los estilos específicos de la Landing Page CVDC 2026.

Responsable de:

- Hero.
- Sección de registro.
- Información de contacto.
- Formulario.
- Tratamiento de datos.
- Mapa.
- CTA.
- Responsive específico.

---

## scripts/scripts.js

Contiene funcionalidades generales de interfaz.

Actualmente administra:

- Menú hamburguesa móvil.
- Apertura y cierre del menú.
- Estado ARIA del menú.
- Cierre al seleccionar una opción.
- Cierre al hacer clic fuera.
- Cierre mediante tecla ESC.
- Retorno del foco al botón.
- Efecto visual del header durante scroll.

---

## scripts/contacto.js

Contiene toda la lógica relacionada con el formulario.

Actualmente administra:

- Prevención del submit tradicional.
- Validación de campos.
- Validación de correo electrónico.
- Validación del consentimiento.
- Validaciones en tiempo real.
- Campo condicional "Otro".
- Estados visuales de validación.
- Estado de carga del botón.
- Construcción de FormData.
- Envío hacia Google Forms.
- Reset posterior al registro.
- Mensajes de éxito/error.

---

# 7. FORMULARIO DE REGISTRO

Actualmente se recopilan los siguientes datos:

1. Nombre completo.
2. Número de contacto.
3. Correo electrónico.
4. Ciudad de origen.
5. Dirección.
6. Rango de edad.
7. Género.
8. Quién es usted.
9. Profesión u ocupación, cuando se selecciona "Otro".
10. Empresa / Clínica / Universidad.
11. Autorización para tratamiento de datos personales.

---

# 8. INTEGRACIÓN CON GOOGLE FORMS

El formulario HTML NO utiliza un backend propio.

Los datos son enviados mediante JavaScript hacia Google Forms.

La URL utilizada se encuentra en:

scripts/contacto.js

Variable:

const formURL = ".../formResponse";

Cada campo HTML utiliza un identificador de Google Forms mediante:

name="entry.XXXXXXXX"

IMPORTANTE:

No modificar:

- URL formResponse.
- entry IDs.
- valores de las opciones.

sin comprobar posteriormente que Google Forms recibe correctamente los datos.

Cualquier modificación estructural del Google Form puede cambiar los entry IDs.

Después de modificar Google Forms se debe ejecutar nuevamente una prueba
End-to-End.

---

# 9. CAMPO CONDICIONAL "OTRO"

El campo:

"Si seleccionó 'Otro', por favor especifique."

depende de:

"Quién es usted"

Su comportamiento esperado es:

Médico veterinario
→ Campo oculto.

Estudiante
→ Campo oculto.

Propietario de Clínica
→ Campo oculto.

Groomer
→ Campo oculto.

Otro
→ Campo visible y obligatorio.

HTML involucrado:

#quienes
#grupoQuienesOtro
#quienesb

JavaScript involucrado:

actualizarCampoOtro()

IMPORTANTE:

El CSS debe respetar el atributo HTML `hidden`.

Mantener:

.form-group[hidden] {
    display: none;
}

No eliminar esta regla, ya que `.form-group` utiliza `display: flex` y podría
hacer visible nuevamente el campo condicional.

---

# 10. PRIVACIDAD Y TRATAMIENTO DE DATOS

Se incorporó autorización explícita para tratamiento de datos personales.

El usuario debe marcar el checkbox antes de realizar el registro.

El checkbox:

- Es obligatorio.
- Es validado mediante JavaScript.
- Está asociado a Google Forms.
- Se reinicia después de un registro exitoso.

También existe un enlace hacia la Política de Tratamiento de Datos Personales
de Novalfarm SAS.

Los enlaces externos abiertos mediante `target="_blank"` deben conservar:

rel="noopener noreferrer"

No eliminar esta protección.

---

# 11. VALIDACIONES

El formulario implementa validaciones HTML5 y JavaScript.

Se validan:

- Campos obligatorios.
- Campos vacíos.
- Correo electrónico.
- Selects.
- Checkbox de privacidad.
- Campo "Otro" cuando corresponde.

Los estados visuales utilizan:

Verde:
#22C55E

Rojo:
#EF4444

No depender exclusivamente del color para futuras mejoras de accesibilidad.

---

# 12. ACCESIBILIDAD

Se realizaron mejoras de accesibilidad.

## Menú móvil

El menú hamburguesa utiliza un elemento:

<button>

y no un `<div>`.

Implementa:

aria-label
aria-controls
aria-expanded

El icono utiliza:

aria-hidden="true"

El menú también puede cerrarse mediante:

ESC

Al cerrarlo mediante ESC, el foco vuelve al botón hamburguesa.

## Mensajes del formulario

El contenedor de mensajes utiliza:

role="status"
aria-live="polite"

## Hero

El hero debe conservar correctamente:

aria-label="Campaña Novalfarm CVDC 2026"

como atributo del elemento `<section>`.

---

# 13. SEGURIDAD

Se realizaron las siguientes mejoras:

- Eliminación de información personal innecesaria de comentarios JavaScript.
- Uso de HTTPS donde los recursos lo permiten.
- Uso de `rel="noopener noreferrer"` en enlaces externos con `target="_blank"`.
- Eliminación de código obsoleto.
- Protección de ejecución JavaScript verificando existencia de elementos.
- Validación previa al envío del formulario.
- Uso de `type="button"` en el botón hamburguesa.

IMPORTANTE:

Nunca incluir en comentarios del código:

- Números de identificación personal.
- Contraseñas.
- Tokens.
- Credenciales.
- Claves API privadas.
- Información confidencial.

---

# 14. RESPONSIVE DESIGN

El proyecto contempla:

Desktop
> 1200 px

Laptop
<= 1200 px

Tablet
<= 992 px

Mobile
<= 768 px

Small Mobile
<= 480 px

Antes de publicar cualquier nueva versión deben probarse como mínimo:

1920x1080
1366x768
1024x768
768px
480px
390px
360px

También probar orientación vertical y horizontal cuando corresponda.

---

# 15. MENÚ MÓVIL

El menú hamburguesa aparece por debajo de:

992px

Comportamientos implementados:

- Abrir mediante clic/tap.
- Cerrar mediante botón.
- Cerrar seleccionando enlace.
- Cerrar haciendo clic fuera.
- Cerrar mediante ESC.
- Actualizar `aria-expanded`.
- Actualizar `aria-label`.

No eliminar esta lógica al modificar scripts.js.

---

# 16. ASSETS PRINCIPALES

## Header.png

Imagen principal de campaña CVDC 2026 utilizada en el Hero.

## Body.webp

Imagen utilizada como fondo visual en el CTA.

## Footer.webp

Imagen utilizada como fondo del footer.

## PreviewNovalfarm.webp

Imagen preparada para Open Graph / vista previa al compartir la página.

## LogoNegativoNovalfarmB.svg

Logo utilizado en el header.

---

# 17. SEO Y OPEN GRAPH

Actualmente están configurados:

<title>
<meta name="description">
<meta name="author">
og:title
og:description
og:type
og:image

La información corresponde al evento CVDC 2026.

Antes del despliegue público se recomienda verificar que `og:image` utilice
una URL absoluta del dominio de producción para garantizar compatibilidad
con plataformas externas.

---

# 18. CONTACTO CORPORATIVO

El footer contiene enlaces funcionales mediante:

mailto:
tel:
https:

No reemplazar nuevamente estos enlaces por texto plano.

La información oficial debe validarse con Novalfarm SAS antes de modificarla.

---

# 19. GOOGLE MAPS

La sección "Nuestra Ubicación" utiliza Google Maps mediante iframe.

El iframe implementa:

loading="lazy"
allowfullscreen
referrerpolicy
title

Si se modifica la dirección corporativa, también debe actualizarse la URL
del mapa.

---

# 20. ESTADO ACTUAL DE LIMPIEZA

Se han trabajado los siguientes puntos:

[x] Paleta corporativa actualizada.
[x] Montserrat aplicada globalmente.
[x] Títulos configurados en Bold.
[x] Texto general configurado en Regular.
[x] Limpieza de comentarios sensibles.
[x] Formulario integrado con Google Forms.
[x] Validaciones JavaScript.
[x] Campo "Otro" condicional.
[x] Checkbox de tratamiento de datos.
[x] Consentimiento registrado en Google Forms.
[x] Enlaces mailto.
[x] Enlaces tel.
[x] HTTPS en política de datos.
[x] noopener noreferrer.
[x] Menú hamburguesa convertido a button.
[x] ARIA implementado en menú móvil.
[x] Cierre mediante ESC.
[x] Protección de ejecución del header.
[x] Limpieza de código obsoleto revisada.
[x] Open Graph actualizado para CVDC 2026.
[x] Diseño responsive.
[x] Footer responsive.
[x] CTA actualizado.
[x] Identidad gráfica CVDC aplicada.

---

# 21. CORRECCIONES RECIENTES IMPORTANTES

## Campo "Otro"

Se detectó que `.form-group` utilizaba:

display: flex;

lo que podía interferir con el atributo:

hidden

La solución implementada es:

.form-group[hidden] {
    display: none;
}

Esta regla debe conservarse.

## Hero ARIA

La estructura correcta debe ser:

<section
    class="contact-hero"
    aria-label="Campaña Novalfarm CVDC 2026">
</section>

No colocar `aria-label` como texto dentro de la sección.

## Limpieza contacto.js

No declarar variables individuales de campos cuando no sean utilizadas.

El envío actualmente puede obtener los datos directamente mediante:

const formData = new FormData(form);

---

# 22. PENDIENTES ANTES DE PRODUCCIÓN

Antes de considerar el proyecto 100 % cerrado se debe realizar la fase final
de pruebas.

## Prueba funcional End-to-End

Realizar registros reales y comprobar directamente en Google Forms:

[ ] Nombre recibido correctamente.
[ ] Teléfono recibido correctamente.
[ ] Correo recibido correctamente.
[ ] Ciudad recibida correctamente.
[ ] Dirección recibida correctamente.
[ ] Edad recibida correctamente.
[ ] Género recibido correctamente.
[ ] Perfil recibido correctamente.
[ ] Campo "Otro" recibido correctamente cuando corresponda.
[ ] Empresa recibida correctamente.
[ ] Consentimiento recibido correctamente.

Realizar como mínimo:

Caso 1:
Registro utilizando "Médico veterinario".

Caso 2:
Registro utilizando "Otro" y completando profesión/ocupación.

Caso 3:
Intento de registro sin aceptar tratamiento de datos.

Caso 4:
Intento de registro con correo inválido.

Caso 5:
Intento de registro dejando campos obligatorios vacíos.

---

# 23. PRUEBAS DE DESPLIEGUE

Después de subir el proyecto al servidor realizar nuevamente todas las pruebas.

NO considerar suficientes las pruebas realizadas mediante localhost.

Verificar en producción:

[ ] Carga de CSS.
[ ] Carga de JavaScript.
[ ] Carga del Header.
[ ] Carga de Body.webp.
[ ] Carga de Footer.webp.
[ ] Carga del logo.
[ ] Carga del favicon.
[ ] Google Fonts.
[ ] Font Awesome.
[ ] Google Maps.
[ ] Formulario.
[ ] Google Forms.
[ ] Política de datos.
[ ] Enlaces de correo.
[ ] Enlaces telefónicos.
[ ] Menú móvil.
[ ] Campo condicional "Otro".
[ ] Consentimiento.
[ ] HTTPS.
[ ] Consola del navegador sin errores críticos.
[ ] Desktop.
[ ] Tablet.
[ ] Mobile.

---

# 24. IMPORTANTE SOBRE FETCH Y GOOGLE FORMS

El envío utiliza:

fetch()

con:

mode: "no-cors"

Debido al funcionamiento de `no-cors`, el navegador no permite inspeccionar
normalmente la respuesta de Google Forms.

Por esta razón, que `fetch()` termine sin lanzar una excepción NO constituye
por sí solo confirmación absoluta de que Google Forms almacenó correctamente
todos los campos.

La validación definitiva debe realizarse comprobando las respuestas directamente
en Google Forms o en la hoja de respuestas asociada.

Esto es especialmente importante después de modificar preguntas o `entry IDs`.

---

# 25. REGLAS PARA FUTUROS DESARROLLADORES

Antes de intervenir el proyecto:

1. Leer completamente este README.
2. Realizar copia o control de versión antes de modificar.
3. No modificar los `entry IDs` sin revisar Google Forms.
4. No cambiar nombres de IDs utilizados por JavaScript.
5. No eliminar atributos ARIA.
6. No eliminar la regla CSS asociada a `[hidden]`.
7. No eliminar el consentimiento de tratamiento de datos.
8. No modificar la paleta corporativa sin autorización.
9. Mantener Montserrat como tipografía.
10. Mantener títulos en Bold y cuerpo en Regular.
11. Mantener enlaces externos seguros.
12. No almacenar información sensible dentro del código.
13. Probar cualquier modificación en desktop, tablet y móvil.
14. Después de modificar el formulario, realizar prueba End-to-End.
15. Después de desplegar, repetir las pruebas en producción.

---

# 26. FLUJO DEL FORMULARIO

Usuario
   │
   ▼
Completa formulario
   │
   ▼
Selecciona "Quién es usted"
   │
   ├── Diferente de "Otro"
   │       └── Campo adicional oculto
   │
   └── "Otro"
           └── Campo profesión visible + obligatorio
   │
   ▼
Acepta tratamiento de datos
   │
   ▼
JavaScript valida información
   │
   ├── ERROR
   │     └── No se envía
   │
   └── CORRECTO
           │
           ▼
       FormData
           │
           ▼
      Google Forms
           │
           ▼
    Mensaje de registro
           │
           ▼
       form.reset()

---

# 27. CRITERIO DE CIERRE DEL PROYECTO

El proyecto podrá considerarse listo para publicación definitiva cuando:

- No existan errores críticos en consola.
- Todos los assets carguen mediante HTTPS.
- Google Forms reciba correctamente todos los campos.
- El consentimiento quede registrado.
- El comportamiento de "Otro" funcione correctamente.
- El formulario funcione desde el servidor de producción.
- El menú móvil funcione mediante mouse, touch y teclado.
- No existan desbordamientos horizontales.
- La página haya sido probada en desktop, tablet y móvil.
- Los enlaces externos funcionen.
- La política de tratamiento de datos sea accesible.
- La vista final sea aprobada por Novalfarm SAS.

---

# 28. ESTADO DE ENTREGA

A fecha de esta documentación:

El desarrollo visual y funcional principal está completado.

La prioridad actual NO es realizar cambios de diseño adicionales.

La siguiente fase corresponde a:

1. Validación final del código.
2. Pruebas End-to-End con Google Forms.
3. Pruebas responsive finales.
4. Despliegue en servidor.
5. Pruebas posteriores al despliegue.
6. Corrección de incidencias, si aparecen.
7. Publicación definitiva.

---

© 2026 Novalfarm SAS.
Documentación técnica — Proyecto Registro CVDC 2026.