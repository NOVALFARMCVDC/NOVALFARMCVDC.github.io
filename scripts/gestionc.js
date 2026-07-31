/* =========================================================
   NOVALFARM SAS
   CVDC 2026
   GESTIÓN COMERCIAL
========================================================= */

"use strict";

/* =========================================================
   01. CONFIGURACIÓN
========================================================= */

const CONFIG_GESTION = {

    API_URL:
        "https://script.google.com/macros/s/AKfycbxRuQV1aav8s9ig97BJ19wq6UjPwdxo8vDF_ia9xKw6NBRSaQOhjDwqVjq68GUjZOeD/exec",

    FORM_DOS_URL:
        "https://docs.google.com/forms/d/e/1FAIpQLSfslXCZ4P6BpEDCyeAnUkyC4or_BuNBDYjfXypPxDuczKzPEA/formResponse",

    MIN_SEARCH_LENGTH: 3,

    TIMEOUT_API: 15000

};

/* =========================================================
   CLIENTE FETCH CON TIMEOUT
========================================================= */

async function fetchConTimeout(
    url,
    opciones = {}
) {

    const controlador =
        new AbortController();

    const timeout =
        setTimeout(
            () => {
                controlador.abort();
            },
            CONFIG_GESTION.TIMEOUT_API
        );

    try {

        const response =
            await fetch(
                url,
                {
                    ...opciones,
                    signal:
                        controlador.signal
                }
            );

        return response;

    } catch (error) {

        if (
            error.name ===
            "AbortError"
        ) {

            throw new Error(
                "TIMEOUT_API"
            );

        }

        throw error;

    } finally {

        clearTimeout(
            timeout
        );

    }

}

/* =========================================================
ESTADO GLOBAL DE LA GESTIÓN
========================================================= */

let currentRequestId = "";

/* =========================================================
   02. CÓDIGOS ENTRY - FORM_DOS
========================================================= */

const FORM_DOS_ENTRIES = {

    /* -----------------------------------------------------
       DATOS PROVENIENTES DE FORM_UNO
    ----------------------------------------------------- */

    id: "entry.161807011",
    nombre: "entry.445168501",
    telefono: "entry.1190734210",
    correo: "entry.1235014945",
    ciudad: "entry.204726276",
    direccion: "entry.1206980979",
    edad: "entry.147446224",
    genero: "entry.490328538",
    quienEs: "entry.1826085668",
    otro: "entry.569173161",
    empresa: "entry.1728398192",
    autorizacion: "entry.1009414647",

    /* -----------------------------------------------------
       PERFIL COMERCIAL
    ----------------------------------------------------- */

    poderCompra: "entry.1566618059",
    compraActual: "entry.864571831",

    /* -----------------------------------------------------
       COMPORTAMIENTO DE COMPRA
    ----------------------------------------------------- */

    lugarCompra: "entry.2043545171",
    lugarCompraOtro: "entry.305841347",

    /* -----------------------------------------------------
       INTERÉS COMERCIAL
    ----------------------------------------------------- */

    lineaInteres: "entry.1140663457",
    lineaInteresOtra: "entry.2821573",
    productosInteres: "entry.1510467633",
    deseaInformacion: "entry.1795034996",
    solicitaVisita: "entry.1940980601",

    /* -----------------------------------------------------
       CALIFICACIÓN COMERCIAL
    ----------------------------------------------------- */

    nivelInteres: "entry.1083718269",
    potencialCompra: "entry.1311009887",
    tiempoCompra: "entry.1703539685",

    /* -----------------------------------------------------
       SEGUIMIENTO COMERCIAL
    ----------------------------------------------------- */

    accionSiguiente: "entry.746545429",
    comercial: "entry.1284960632",
    responsable: "entry.1585889568",
    responsableOtro: "entry.685787861",

    /* -----------------------------------------------------
       INFORMACIÓN ADICIONAL
    ----------------------------------------------------- */

    comentario: "entry.1461049898",
    aceptaInformacion: "entry.1019940154",
    entregaMuestra: "entry.559332906"

};

/* =========================================================
   03. REFERENCIAS DOM - BÚSQUEDA
========================================================= */

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const searchMessage =
    document.getElementById("searchMessage");

const searchResults =
    document.getElementById("searchResults");

const resultsList =
    document.getElementById("resultsList");

/* =========================================================
   04. REFERENCIAS DOM - PARTICIPANTE
========================================================= */

const participantSection =
    document.getElementById("participantSection");

const participantOtherGroup =
    document.getElementById("participantOtherGroup");

const changeParticipant =
    document.getElementById("changeParticipant");

const continueCommercial =
    document.getElementById("continueCommercial");

const participantFields = {

    id:
        document.getElementById("participantId"),

    nombre:
        document.getElementById("participantName"),

    telefono:
        document.getElementById("participantPhone"),

    correo:
        document.getElementById("participantEmail"),

    ciudad:
        document.getElementById("participantCity"),

    direccion:
        document.getElementById("participantAddress"),

    edad:
        document.getElementById("participantAge"),

    genero:
        document.getElementById("participantGender"),

    quienEs:
        document.getElementById("participantType"),

    otro:
        document.getElementById("participantOther"),

    empresa:
        document.getElementById("participantCompany"),

    autorizacion:
        document.getElementById("participantAuthorization")

};

/* =========================================================
   05. REFERENCIAS DOM - FORMULARIO COMERCIAL
========================================================= */

const commercialForm =
    document.getElementById("commercialForm");

const commercialSubmit =
    document.getElementById("commercialSubmit");

const commercialMessage =
    document.getElementById("commercialMessage");

const newCommercialManagement =
    document.getElementById("newCommercialManagement");

/* =========================================================
   06. CAMPOS DEL FORMULARIO COMERCIAL
========================================================= */

const commercialFields = {

    poderCompra:
        document.getElementById("purchasePower"),

    compraActual:
        document.getElementById("currentCustomer"),

    lugarCompra:
        document.getElementById("purchaseLocation"),

    lugarCompraOtro:
        document.getElementById("purchaseLocationOther"),

    lineaInteres:
        document.getElementById("interestLine"),

    lineaInteresOtra:
        document.getElementById("interestLineOther"),

    productosInteres:
        document.getElementById("specificProducts"),

    deseaInformacion:
        document.getElementById("receiveInformation"),

    solicitaVisita:
        document.getElementById("commercialVisit"),

    nivelInteres:
        document.getElementById("interestLevel"),

    potencialCompra:
        document.getElementById("purchasePotential"),

    tiempoCompra:
        document.getElementById("purchaseTime"),

    accionSiguiente:
        document.getElementById("nextAction"),

    comercial:
        document.getElementById("commercialAgent"),

    responsable:
        document.getElementById("followUpResponsible"),

    responsableOtro:
        document.getElementById("followUpOther"),

    comentario:
        document.getElementById("visitorComments"),

    aceptaInformacion:
        document.getElementById("commercialInformationConsent"),

    entregaMuestra:
        document.getElementById("sampleDelivery")

};

/* =========================================================
   07. GRUPOS CONDICIONALES
========================================================= */

const purchaseLocationOtherGroup =
    document.getElementById("purchaseLocationOtherGroup");

const interestLineOtherGroup =
    document.getElementById("interestLineOtherGroup");

const followUpOtherGroup =
    document.getElementById("followUpOtherGroup");

/* =========================================================
   08. VALIDACIÓN INICIAL DEL DOM
========================================================= */

function validarElementosDOM() {

    const elementosObligatorios = {

        searchForm,
        searchInput,
        searchButton,
        searchMessage,
        searchResults,
        resultsList,

        participantSection,
        participantOtherGroup,
        changeParticipant,
        continueCommercial,

        commercialForm,
        commercialSubmit,
        commercialMessage,
        newCommercialManagement,

        purchaseLocationOtherGroup,
        interestLineOtherGroup,
        followUpOtherGroup,

        ...participantFields,
        ...commercialFields

    };

    const faltantes =
        Object.entries(elementosObligatorios)
            .filter(([, elemento]) => !elemento)
            .map(([nombre]) => nombre);

    if (faltantes.length > 0) {

        console.error(
            "CVDC 2026 - Elementos DOM no encontrados:",
            faltantes
        );

        return false;

    }

    return true;

}

/* =========================================================
   09. MENSAJES DE BÚSQUEDA
========================================================= */

function mostrarMensaje(
    mensaje,
    tipo = ""
) {

    searchMessage.textContent =
        mensaje;

    searchMessage.className =
        "gestion-message";

    if (tipo) {

        searchMessage.classList.add(
            tipo
        );

    }

}

function limpiarMensaje() {

    searchMessage.textContent = "";

    searchMessage.className =
        "gestion-message";

}

/* =========================================================
   10. MENSAJES FORMULARIO COMERCIAL
========================================================= */

function mostrarMensajeComercial(
    mensaje,
    tipo = ""
) {

    commercialMessage.textContent =
        mensaje;

    commercialMessage.className =
        "gestion-message commercial-message";

    if (tipo) {

        commercialMessage.classList.add(
            tipo
        );

    }

}

function limpiarMensajeComercial() {

    commercialMessage.textContent = "";

    commercialMessage.className =
        "gestion-message commercial-message";

}

/* =========================================================
   11. ESTADO DE BÚSQUEDA
========================================================= */

function establecerEstadoBusqueda(
    buscando
) {

    searchButton.disabled =
        buscando;

    searchInput.disabled =
        buscando;

    searchButton.innerHTML =
        buscando
            ? '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Buscando...'
            : '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> Buscar';

}

/* =========================================================
   12. BUSCAR PARTICIPANTES
========================================================= */

async function buscarParticipantes(
    termino
) {

    establecerEstadoBusqueda(true);

    searchResults.hidden =
        true;

    resultsList.innerHTML =
        "";

    try {

        const url =
            new URL(
                CONFIG_GESTION.API_URL
            );

        url.searchParams.set(
            "action",
            "buscar"
        );

        url.searchParams.set(
            "q",
            termino
        );

        const response =
            await fetchConTimeout(
                url.toString()
            );

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const data =
            await response.json();

        if (!data.ok) {

            throw new Error(
                data.error ||
                "No fue posible realizar la búsqueda."
            );

        }

        if (
            !Array.isArray(data.resultados) ||
            data.resultados.length === 0
        ) {

            mostrarMensaje(
                "No se encontraron participantes con ese criterio.",
                "error"
            );

            return;

        }

        mostrarResultados(
            data.resultados
        );

    } catch (error) {

        console.error(
            "Error buscando participantes:",
            error
        );

        mostrarMensaje(
            "No fue posible consultar los participantes. Intente nuevamente.",
            "error"
        );

    } finally {

        establecerEstadoBusqueda(
            false
        );

    }

}

/* =========================================================
   13. MOSTRAR RESULTADOS
========================================================= */

function mostrarResultados(
    participantes
) {

    resultsList.innerHTML =
        "";

    participantes.forEach(
        (participante) => {

            const item =
                document.createElement(
                    "article"
                );

            item.className =
                "result-item";

            const info =
                document.createElement(
                    "div"
                );

            const nombre =
                document.createElement(
                    "div"
                );

            nombre.className =
                "result-name";

            nombre.textContent =
                participante.nombre ||
                "Sin nombre";

            const meta =
                document.createElement(
                    "div"
                );

            meta.className =
                "result-meta";

            const telefono =
                document.createElement(
                    "span"
                );

            telefono.textContent =
                participante.telefono ||
                "Sin teléfono";

            const correo =
                document.createElement(
                    "span"
                );

            correo.textContent =
                participante.correo ||
                "Sin correo";

            meta.append(
                telefono,
                correo
            );

            const id =
                document.createElement(
                    "div"
                );

            id.className =
                "result-id";

            id.textContent =
                participante.id ||
                "";

            info.append(
                nombre,
                meta,
                id
            );

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "btn btn-primary";

            button.textContent =
                "Seleccionar";

            button.addEventListener(
                "click",
                () => {

                    seleccionarParticipante(
                        participante.id
                    );

                }
            );

            item.append(
                info,
                button
            );

            resultsList.appendChild(
                item
            );

        }
    );

    searchResults.hidden =
        false;

    mostrarMensaje(
        `${participantes.length} participante(s) encontrado(s).`,
        "success"
    );

}

/* =========================================================
   14. OBTENER PARTICIPANTE
========================================================= */

async function seleccionarParticipante(
    id
) {

    limpiarMensaje();


    if (!id) {

        mostrarMensaje(
            "El participante seleccionado no tiene un identificador válido.",
            "error"
        );

        return;

    }

    try {

        const url =
            new URL(
                CONFIG_GESTION.API_URL
            );

        url.searchParams.set(
            "action",
            "participante"
        );

        url.searchParams.set(
            "id",
            id
        );

        const response =
            await fetchConTimeout(
                url.toString()
            );

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const data =
            await response.json();

        if (
            !data.ok ||
            !data.participante
        ) {

            throw new Error(
                data.error ||
                "Participante no encontrado."
            );

        }

        cargarParticipante(
            data.participante
        );

    } catch (error) {

        console.error(
            "Error obteniendo participante:",
            error
        );

        mostrarMensaje(
            "No fue posible cargar la información del participante.",
            "error"
        );

    }

}

/* =========================================================
   15. CARGAR PARTICIPANTE
========================================================= */

function cargarParticipante(
    participante
) {

    participantFields.id.value =
        participante.id || "";

    participantFields.nombre.value =
        participante.nombre || "";

    participantFields.telefono.value =
        participante.telefono || "";

    participantFields.correo.value =
        participante.correo || "";

    participantFields.ciudad.value =
        participante.ciudad || "";

    participantFields.direccion.value =
        participante.direccion || "";

    participantFields.edad.value =
        participante.edad || "";

    participantFields.genero.value =
        participante.genero || "";

    participantFields.quienEs.value =
        participante.quienEs || "";

    participantFields.otro.value =
        participante.otro || "";

    participantFields.empresa.value =
        participante.empresa || "";

    participantFields.autorizacion.value =
        participante.autorizacion || "";

    participantOtherGroup.hidden =
        !participantFields.otro.value.trim();

    searchResults.hidden =
        true;

    participantSection.hidden =
        false;

    commercialForm.hidden =
        true;

    continueCommercial.disabled =
        false;

    participantSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

/* =========================================================
   16. LIMPIAR PARTICIPANTE
========================================================= */

function limpiarParticipante() {

    Object.values(
        participantFields
    ).forEach(
        (field) => {

            field.value =
                "";

        }
    );


    participantOtherGroup.hidden =
        true;

}

/* =========================================================
   17. RESTABLECER CAMPOS CONDICIONALES
========================================================= */

function restablecerCamposCondicionales() {

    purchaseLocationOtherGroup.hidden =
        true;

    commercialFields.lugarCompraOtro.required =
        false;

    commercialFields.lugarCompraOtro.value =
        "";

    interestLineOtherGroup.hidden =
        true;

    commercialFields.lineaInteresOtra.required =
        false;

    commercialFields.lineaInteresOtra.value =
        "";


    followUpOtherGroup.hidden =
        true;

    commercialFields.responsableOtro.required =
        false;

    commercialFields.responsableOtro.value =
        "";

}

/* =========================================================
   18. HABILITAR FORMULARIO COMERCIAL
========================================================= */

function habilitarFormularioComercial() {

    commercialForm
        .querySelectorAll(
            "input, select, textarea"
        )
        .forEach(
            (campo) => {

                campo.disabled =
                    false;

            }
        );

}

/* =========================================================
   19. ACTUALIZAR CAMPO CONDICIONAL - LUGAR DE COMPRA
========================================================= */

function actualizarLugarCompraOtro() {

    const mostrar =
        commercialFields.lugarCompra.value ===
        "OTRA";


    purchaseLocationOtherGroup.hidden =
        !mostrar;

    commercialFields.lugarCompraOtro.required =
        mostrar;


    if (!mostrar) {

        commercialFields.lugarCompraOtro.value =
            "";

    }

}

/* =========================================================
   20. ACTUALIZAR CAMPO CONDICIONAL - LÍNEA DE INTERÉS
========================================================= */

function actualizarLineaInteresOtra() {

    const mostrar =
        commercialFields.lineaInteres.value ===
        "Otra";


    interestLineOtherGroup.hidden =
        !mostrar;

    commercialFields.lineaInteresOtra.required =
        mostrar;


    if (!mostrar) {

        commercialFields.lineaInteresOtra.value =
            "";

    }

}

/* =========================================================
   21. ACTUALIZAR CAMPO CONDICIONAL - RESPONSABLE
========================================================= */

function actualizarResponsableOtro() {

    const mostrar =
        commercialFields.responsable.value ===
        "Otro";

    followUpOtherGroup.hidden =
        !mostrar;

    commercialFields.responsableOtro.required =
        mostrar;

    if (!mostrar) {

        commercialFields.responsableOtro.value =
            "";

    }

}

/* =========================================================
   22. OBTENER DATOS DE LA GESTIÓN
========================================================= */

function obtenerDatosGestion() {

    return {

        /* -------------------------------------------------
           PARTICIPANTE
        ------------------------------------------------- */

        id:
            participantFields.id.value.trim(),

        nombre:
            participantFields.nombre.value.trim(),

        telefono:
            participantFields.telefono.value.trim(),

        correo:
            participantFields.correo.value.trim(),

        ciudad:
            participantFields.ciudad.value.trim(),

        direccion:
            participantFields.direccion.value.trim(),

        edad:
            participantFields.edad.value.trim(),

        genero:
            participantFields.genero.value.trim(),

        quienEs:
            participantFields.quienEs.value.trim(),

        otro:
            participantFields.otro.value.trim(),

        empresa:
            participantFields.empresa.value.trim(),

        autorizacion:
            participantFields.autorizacion.value.trim(),

        /* -------------------------------------------------
           GESTIÓN COMERCIAL
        ------------------------------------------------- */

        poderCompra:
            commercialFields.poderCompra.value,

        compraActual:
            commercialFields.compraActual.value,

        lugarCompra:
            commercialFields.lugarCompra.value,

        lugarCompraOtro:
            commercialFields.lugarCompraOtro.value.trim(),

        lineaInteres:
            commercialFields.lineaInteres.value,

        lineaInteresOtra:
            commercialFields.lineaInteresOtra.value.trim(),

        productosInteres:
            commercialFields.productosInteres.value.trim(),

        deseaInformacion:
            commercialFields.deseaInformacion.value,

        solicitaVisita:
            commercialFields.solicitaVisita.value,

        nivelInteres:
            commercialFields.nivelInteres.value,

        potencialCompra:
            commercialFields.potencialCompra.value,

        tiempoCompra:
            commercialFields.tiempoCompra.value,

        accionSiguiente:
            commercialFields.accionSiguiente.value,

        comercial:
            commercialFields.comercial.value,

        responsable:
            commercialFields.responsable.value,

        responsableOtro:
            commercialFields.responsableOtro.value.trim(),

        comentario:
            commercialFields.comentario.value.trim(),

        aceptaInformacion:
            commercialFields.aceptaInformacion.value,

        entregaMuestra:
            commercialFields.entregaMuestra.value

    };

}

/* =========================================================
   OBTENER GENERAR REQUEST_ID
========================================================= */

function obtenerRequestIdGestion() {

    if (currentRequestId) {

        return currentRequestId;

    }

    if (
        window.crypto &&
        typeof window.crypto.randomUUID === "function"
    ) {

        currentRequestId =
            window.crypto.randomUUID();

    } else {

        currentRequestId =
            "REQ-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 12);

    }

    return currentRequestId;

}

/* =========================================================
   CONSTRUIR PAYLOAD CVDC2026_API
========================================================= */

function construirPayloadAPI(
    datos
) {

    return {

        action:
            "registrargestion",

        requestId:
            obtenerRequestIdGestion(),

        participanteId:
            participantFields.id.value.trim(),

        gestion: {

            poderCompra:
                datos.poderCompra ?? "",

            compraProductos:
                datos.compraActual ?? "",

            dondeCompra:
                datos.lugarCompra ?? "",

            otroDondeCompra:
                datos.lugarCompraOtro ?? "",

            lineaInteres:
                datos.lineaInteres ?? "",

            otraLinea:
                datos.lineaInteresOtra ?? "",

            productosInteres:
                datos.productosInteres ?? "",

            deseaInformacion:
                datos.deseaInformacion ?? "",

            solicitaVisita:
                datos.solicitaVisita ?? "",

            nivelInteres:
                datos.nivelInteres ?? "",

            potencialCompra:
                datos.potencialCompra ?? "",

            tiempoCompra:
                datos.tiempoCompra ?? "",

            accionSiguiente:
                datos.accionSiguiente ?? "",

            comercialRegistro:
                datos.comercial ?? "",

            responsableSeguimiento:
                datos.responsable ?? "",

            otroResponsable:
                datos.responsableOtro ?? "",

            comentarioVisitante:
                datos.comentario ?? "",

            aceptaInfoComercial:
                datos.aceptaInformacion ?? "",

            entregaMuestra:
                datos.entregaMuestra ?? ""

        }

    };

}

/* =========================================================
   23. VALIDAR GESTIÓN COMERCIAL
========================================================= */

function validarGestionComercial() {

    limpiarMensajeComercial();

    if (
        !participantFields.id.value.trim()
    ) {

        mostrarMensajeComercial(
            "No existe un participante seleccionado.",
            "error"
        );

        return false;

    }

    if (
        commercialFields.lugarCompra.value === "OTRA" &&
        !commercialFields.lugarCompraOtro.value.trim()
    ) {

        mostrarMensajeComercial(
            "Debe indicar dónde compra normalmente.",
            "error"
        );

        commercialFields.lugarCompraOtro.focus();

        return false;

    }

    if (
        commercialFields.lineaInteres.value === "Otra" &&
        !commercialFields.lineaInteresOtra.value.trim()
    ) {

        mostrarMensajeComercial(
            "Debe especificar la línea de interés.",
            "error"
        );

        commercialFields.lineaInteresOtra.focus();

        return false;

    }

    if (
        commercialFields.responsable.value === "Otro" &&
        !commercialFields.responsableOtro.value.trim()
    ) {

        mostrarMensajeComercial(
            "Debe especificar el responsable del seguimiento.",
            "error"
        );

        commercialFields.responsableOtro.focus();

        return false;

    }

    if (
        !commercialForm.checkValidity()
    ) {

        commercialForm.reportValidity();

        mostrarMensajeComercial(
            "Complete todos los campos obligatorios antes de registrar la gestión.",
            "error"
        );

        return false;

    }

    return true;

}

/* =========================================================
   24. CONSTRUIR PAYLOAD FORM_DOS
========================================================= */

function construirFormData(
    datos
) {

    const formData =
        new FormData();

    Object.entries(
        FORM_DOS_ENTRIES
    ).forEach(
        ([campo, entry]) => {

            const valor =
                datos[campo] ?? "";

            formData.append(
                entry,
                valor
            );

        }
    );

    return formData;

}

/* =========================================================
   ENVIAR GESTIÓN A CVDC2026_API
========================================================= */

async function enviarGestionComercial(
    payload
) {

    const response =
        await fetchConTimeout(
            CONFIG_GESTION.API_URL,
            {
                method:
                    "POST",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify(
                        payload
                    )
            }
        );

    if (!response.ok) {

        throw new Error(
            "HTTP_" +
            response.status
        );

    }

    const resultado =
        await response.json();

    if (!resultado.ok) {

        throw new Error(
            resultado.error ||
            "La API rechazó el registro."
        );

    }

    return resultado;

}

/* =========================================================
   26. ESTADO DE ENVÍO
========================================================= */

function establecerEstadoEnvio(
    estado
) {

    switch (estado) {

        case "enviando":

            commercialSubmit.hidden =
                false;

            commercialSubmit.disabled =
                true;

            commercialSubmit.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Registrando...';

            break;

        case "exito":

            commercialSubmit.disabled =
                true;

            commercialSubmit.hidden =
                true;

            newCommercialManagement.hidden =
                false;

            break;

        default:

            commercialSubmit.hidden =
                false;

            commercialSubmit.disabled =
                false;

            commercialSubmit.innerHTML =
                '<i class="fa-solid fa-floppy-disk" aria-hidden="true"></i> Registrar gestión comercial';

            newCommercialManagement.hidden =
                true;

            break;

    }

}

/* =========================================================
   27. FINALIZAR GESTIÓN
========================================================= */

function finalizarGestion() {

    commercialForm
        .querySelectorAll(
            "input, select, textarea"
        )
        .forEach(
            (campo) => {

                campo.disabled =
                    true;

            }
        );

    continueCommercial.disabled =
        true;

    establecerEstadoEnvio(
        "exito"
    );

}

/* =========================================================
   28. NUEVA GESTIÓN
========================================================= */

function iniciarNuevaGestion() {

    currentRequestId = "";

    habilitarFormularioComercial();


    commercialForm.reset();

    commercialForm.hidden =
        true;

    participantSection.hidden =
        true;

    searchResults.hidden =
        true;

    limpiarParticipante();

    restablecerCamposCondicionales();

    establecerEstadoEnvio(
        "normal"
    );

    continueCommercial.disabled =
        false;

    limpiarMensaje();

    limpiarMensajeComercial();

    searchInput.value =
        "";

    searchInput.disabled =
        false;

    searchButton.disabled =
        false;

    searchInput.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* =========================================================
   29. EVENTO - BUSCAR PARTICIPANTE
========================================================= */

function registrarEventos() {

    searchForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const termino =
                searchInput.value.trim();

            limpiarMensaje();

            if (
                termino.length <
                CONFIG_GESTION.MIN_SEARCH_LENGTH
            ) {

                mostrarMensaje(
                    "Ingrese al menos 3 caracteres.",
                    "error"
                );

                searchInput.focus();

                return;

            }

            await buscarParticipantes(
                termino
            );

        }
    );

    /* -----------------------------------------------------
       BUSCAR OTRO PARTICIPANTE
    ----------------------------------------------------- */

    changeParticipant.addEventListener(
        "click",
        () => {

            currentRequestId = "";

            habilitarFormularioComercial();

            commercialForm.reset();

            commercialForm.hidden =
                true;

            limpiarParticipante();

            restablecerCamposCondicionales();

            participantSection.hidden =
                true;

            searchResults.hidden =
                true;

            continueCommercial.disabled =
                false;

            establecerEstadoEnvio(
                "normal"
            );

            limpiarMensaje();

            limpiarMensajeComercial();

            searchInput.value =
                "";

            searchInput.focus();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

    /* -----------------------------------------------------
       CONTINUAR GESTIÓN
    ----------------------------------------------------- */

    continueCommercial.addEventListener(
        "click",
        () => {

            limpiarMensaje();

            if (
                !participantFields.id.value.trim()
            ) {

                mostrarMensaje(
                    "Debe seleccionar un participante antes de continuar.",
                    "error"
                );

                return;

            }

            habilitarFormularioComercial();

            commercialForm.hidden =
                false;

            commercialForm.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

    /* -----------------------------------------------------
       CAMPOS CONDICIONALES
    ----------------------------------------------------- */

    commercialFields.lugarCompra.addEventListener(
        "change",
        actualizarLugarCompraOtro
    );

    commercialFields.lineaInteres.addEventListener(
        "change",
        actualizarLineaInteresOtra
    );

    commercialFields.responsable.addEventListener(
        "change",
        actualizarResponsableOtro
    );

    /* -----------------------------------------------------
       REGISTRAR GESTIÓN COMERCIAL
    ----------------------------------------------------- */

    commercialForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            /*
             * 1. Validar formulario.
             */
            if (
                !validarGestionComercial()
            ) {

                return;

            }

            /*
             * 2. Obtener información del participante
             *    y de la gestión comercial.
             */
            const datos =
                obtenerDatosGestion();

            /*
             * 3. Construir payload para CVDC2026_API.
             */
            const payload =
                construirPayloadAPI(
                    datos
                );

            /*
             * 4. Cambiar interfaz a estado de envío.
             */
            establecerEstadoEnvio(
                "enviando"
            );

            mostrarMensajeComercial(
                "Registrando gestión comercial..."
            );

            try {

                /*
                 * 5. Enviar información al backend.
                 */
                const resultado =
                    await enviarGestionComercial(
                        payload
                    );

                /*
                 * 6. Registro nuevo.
                 */
                if (
                    resultado.estado ===
                    "gestion_registrada"
                ) {

                    mostrarMensajeComercial(
                        "Gestión comercial registrada correctamente. Código: " +
                        resultado.idGestion,
                        "success"
                    );

                }

                /*
                 * 7. REQUEST_ID previamente registrado.
                 */
                else if (
                    resultado.estado ===
                    "gestion_ya_registrada"
                ) {

                    mostrarMensajeComercial(
                        "La gestión ya había sido registrada correctamente. Código: " +
                        resultado.idGestion,
                        "success"
                    );

                }

                /*
                 * 8. Respuesta inesperada.
                 */
                else {

                    throw new Error(
                        "Respuesta inesperada del servidor."
                    );

                }

                /*
                 * 9. Bloquear formulario después
                 *    de confirmación del servidor.
                 */
                finalizarGestion();

            } catch (error) {

                console.error(
                    "Error registrando gestión comercial:",
                    error
                );

                mostrarMensajeComercial(
                    "No fue posible confirmar el registro. Intente nuevamente.",
                    "error"
                );

            } finally {

                /*
                 * Si finalizarGestion() mostró el botón
                 * Nueva gestión, mantenemos bloqueado
                 * Registrar gestión.
                 */
                if (
                    !newCommercialManagement.hidden
                ) {

                    commercialSubmit.disabled =
                        true;

                } else {

                    /*
                     * Si hubo error, restauramos
                     * el botón para permitir reintento.
                     */
                    establecerEstadoEnvio(
                        "normal"
                    );

                }

            }

        }
    );

    /* -----------------------------------------------------
       NUEVA GESTIÓN
    ----------------------------------------------------- */

    newCommercialManagement.addEventListener(
        "click",
        iniciarNuevaGestion
    );
}

/* =========================================================
   31. INICIALIZACIÓN
========================================================= */

function inicializarGestionComercial() {

    if (
        !validarElementosDOM()
    ) {

        console.error(
            "CVDC 2026 - La aplicación no pudo inicializarse."
        );

        return;

    }

    restablecerCamposCondicionales();

    commercialForm.hidden =
        true;

    participantSection.hidden =
        true;

    searchResults.hidden =
        true;

    newCommercialManagement.hidden =
        true;

    establecerEstadoEnvio(
        "normal"
    );

    registrarEventos();

    console.info(
        "CVDC 2026 - Módulo de Gestión Comercial inicializado correctamente."
    );

}

/* =========================================================
   INICIAR APLICACIÓN
========================================================= */

inicializarGestionComercial();