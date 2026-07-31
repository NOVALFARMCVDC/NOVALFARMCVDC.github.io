"use strict";


/* ============================================================
   NOVALFARM SAS
   CVDC 2026
   DASHBOARD COMERCIAL

   Archivo:
   dashboardc.js

   Responsabilidades:
   - Consultar resumen ejecutivo.
   - Consultar gestiones comerciales.
   - Aplicar filtros.
   - Gestionar paginación.
   - Consultar detalle individual.
   - Construir tabla.
   - Construir modal.
   - Controlar estados de carga y error.
============================================================ */


/* ============================================================
   1. CONFIGURACIÓN
============================================================ */

const CONFIG = {

    /*
     * IMPORTANTE:
     * Reemplazar por la URL /exec de CVDC2026_API.
     *
     * Debe terminar en:
     *
     * /exec
     *
     * NO agregar ?action=...
     */

    API_URL:
        "https://script.google.com/macros/s/AKfycbxRuQV1aav8s9ig97BJ19wq6UjPwdxo8vDF_ia9xKw6NBRSaQOhjDwqVjq68GUjZOeD/exec",


    RESULTADOS_POR_PAGINA:
        20,


    TIMEOUT_API:
        15000

};


/* ============================================================
   2. ESTADO DE LA APLICACIÓN
============================================================ */

const estadoDashboard = {

    paginaActual:
        1,

    totalPaginas:
        1,

    totalResultados:
        0,

    cargando:
        false,

    filtros: {

        buscar:
            "",

        nivel:
            "",

        potencial:
            "",

        visita:
            "",

        linea:
            ""

    }

};


/* ============================================================
   3. REFERENCIAS DOM
============================================================ */

const DOM = {

    /* --------------------------------------------------------
       INDICADORES
    -------------------------------------------------------- */

    metricTotal:
        document.getElementById(
            "metric-total"
        ),

    metricInterest:
        document.getElementById(
            "metric-interest"
        ),

    metricPotential:
        document.getElementById(
            "metric-potential"
        ),

    metricVisits:
        document.getElementById(
            "metric-visits"
        ),

    metricSamples:
        document.getElementById(
            "metric-samples"
        ),

    lastUpdate:
        document.getElementById(
            "last-update"
        ),


    /* --------------------------------------------------------
       FILTROS
    -------------------------------------------------------- */

    filtersForm:
        document.getElementById(
            "dashboard-filters"
        ),

    search:
        document.getElementById(
            "filter-search"
        ),

    level:
        document.getElementById(
            "filter-level"
        ),

    potential:
        document.getElementById(
            "filter-potential"
        ),

    visit:
        document.getElementById(
            "filter-visit"
        ),

    line:
        document.getElementById(
            "filter-line"
        ),

    clearFilters:
        document.getElementById(
            "clear-filters"
        ),

    applyFilters:
        document.getElementById(
            "apply-filters"
        ),


    /* --------------------------------------------------------
       RESULTADOS
    -------------------------------------------------------- */

    resultsCount:
        document.getElementById(
            "results-count"
        ),

    loading:
        document.getElementById(
            "dashboard-loading"
        ),

    error:
        document.getElementById(
            "dashboard-error"
        ),

    empty:
        document.getElementById(
            "dashboard-empty"
        ),

    tableWrapper:
        document.getElementById(
            "management-table-wrapper"
        ),

    tableBody:
        document.getElementById(
            "management-table-body"
        ),


    /* --------------------------------------------------------
       PAGINACIÓN
    -------------------------------------------------------- */

    pagination:
        document.getElementById(
            "dashboard-pagination"
        ),

    previousPage:
        document.getElementById(
            "previous-page"
        ),

    nextPage:
        document.getElementById(
            "next-page"
        ),

    paginationStatus:
        document.getElementById(
            "pagination-status"
        ),


    /* --------------------------------------------------------
       MODAL
    -------------------------------------------------------- */

    modal:
        document.getElementById(
            "management-modal"
        ),

    modalManagementId:
        document.getElementById(
            "modal-management-id"
        ),

    modalLoading:
        document.getElementById(
            "modal-loading"
        ),

    modalError:
        document.getElementById(
            "modal-error"
        ),

    modalContent:
        document.getElementById(
            "modal-content"
        ),

    closeModal:
        document.getElementById(
            "close-modal"
        )

};


/* ============================================================
   4. INICIALIZACIÓN
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    inicializarDashboard
);


async function inicializarDashboard() {

    if (
        !validarConfiguracion()
    ) {

        mostrarErrorGeneral(
            "La API del dashboard no está configurada."
        );

        return;

    }


    registrarEventos();


    await Promise.allSettled([

        cargarResumen(),

        cargarGestiones()

    ]);

}


/* ============================================================
   5. VALIDACIÓN DE CONFIGURACIÓN
============================================================ */

function validarConfiguracion() {

    if (
        !CONFIG.API_URL ||
        CONFIG.API_URL.includes(
            "PEGAR_AQUI"
        )
    ) {

        console.error(
            "CVDC 2026: API_URL no configurada."
        );

        return false;

    }


    try {

        const url =
            new URL(
                CONFIG.API_URL
            );


        if (
            url.protocol !== "https:"
        ) {

            console.error(
                "CVDC 2026: la API debe utilizar HTTPS."
            );

            return false;

        }

    }
    catch (error) {

        console.error(
            "CVDC 2026: API_URL no válida."
        );

        return false;

    }


    return true;

}


/* ============================================================
   6. EVENTOS
============================================================ */

function registrarEventos() {

    DOM.filtersForm.addEventListener(
        "submit",
        manejarFiltros
    );


    DOM.clearFilters.addEventListener(
        "click",
        limpiarFiltros
    );


    DOM.previousPage.addEventListener(
        "click",
        paginaAnterior
    );


    DOM.nextPage.addEventListener(
        "click",
        paginaSiguiente
    );


    DOM.tableBody.addEventListener(
        "click",
        manejarClickTabla
    );


    DOM.closeModal.addEventListener(
        "click",
        cerrarModal
    );


    DOM.modal.addEventListener(
        "click",
        manejarClickModal
    );


    document.addEventListener(
        "keydown",
        manejarTeclado
    );

}


/* ============================================================
   7. CLIENTE API
============================================================ */

async function consultarAPI(
    parametros
) {

    /* --------------------------------------------------------
       VALIDAR CONECTIVIDAD
    -------------------------------------------------------- */

    if (
        navigator.onLine === false
    ) {

        const error =
            new Error(
                "No hay conexión a Internet."
            );

        error.tipo =
            "OFFLINE";

        throw error;

    }


    /* --------------------------------------------------------
       CONSTRUIR URL
    -------------------------------------------------------- */

    const url =
        new URL(
            CONFIG.API_URL
        );


    Object.entries(
        parametros
    ).forEach(
        ([clave, valor]) => {

            if (
                valor !== undefined &&
                valor !== null &&
                String(valor).trim() !== ""
            ) {

                url.searchParams.set(
                    clave,
                    String(valor).trim()
                );

            }

        }
    );


    /* --------------------------------------------------------
       CONTROLADOR DE TIMEOUT
    -------------------------------------------------------- */

    const controlador =
        new AbortController();


    const timeout =
        setTimeout(
            () => {

                controlador.abort();

            },
            CONFIG.TIMEOUT_API
        );


    try {

        /* ----------------------------------------------------
           CONSULTA
        ---------------------------------------------------- */

        const respuesta =
            await fetch(
                url.toString(),
                {

                    method:
                        "GET",

                    cache:
                        "no-store",

                    signal:
                        controlador.signal

                }
            );


        /* ----------------------------------------------------
           VALIDAR RESPUESTA HTTP
        ---------------------------------------------------- */

        if (
            !respuesta.ok
        ) {

            const error =
                new Error(
                    `HTTP ${respuesta.status}`
                );

            error.tipo =
                "HTTP";

            error.status =
                respuesta.status;

            throw error;

        }


        /* ----------------------------------------------------
           PROCESAR JSON
        ---------------------------------------------------- */

        let datos;


        try {

            datos =
                await respuesta.json();

        }
        catch (errorJSON) {

            const error =
                new Error(
                    "La API devolvió una respuesta no válida."
                );

            error.tipo =
                "JSON_INVALIDO";

            throw error;

        }


        /* ----------------------------------------------------
           VALIDAR RESPUESTA DE LA API
        ---------------------------------------------------- */

        if (
            !datos ||
            datos.ok !== true
        ) {

            const error =
                new Error(
                    datos?.error ||
                    "La API rechazó la solicitud."
                );

            error.tipo =
                "API";

            throw error;

        }


        return datos;

    }
    catch (error) {

        /* ----------------------------------------------------
           TIMEOUT
        ---------------------------------------------------- */

        if (
            error.name ===
            "AbortError"
        ) {

            const errorTimeout =
                new Error(
                    "La consulta excedió el tiempo máximo de espera."
                );

            errorTimeout.tipo =
                "TIMEOUT";

            throw errorTimeout;

        }


        /* ----------------------------------------------------
           ERROR YA CLASIFICADO
        ---------------------------------------------------- */

        if (
            error.tipo
        ) {

            throw error;

        }


        /* ----------------------------------------------------
           CONEXIÓN PERDIDA DURANTE FETCH
        ---------------------------------------------------- */

        if (
            navigator.onLine === false
        ) {

            const errorOffline =
                new Error(
                    "Se perdió la conexión a Internet."
                );

            errorOffline.tipo =
                "OFFLINE";

            throw errorOffline;

        }


        /* ----------------------------------------------------
           ERROR DE RED NO CLASIFICADO
        ---------------------------------------------------- */

        const errorRed =
            new Error(
                "No fue posible establecer comunicación con el servidor."
            );

        errorRed.tipo =
            "RED";

        throw errorRed;

    }
    finally {

        clearTimeout(
            timeout
        );

    }

}

/* ============================================================
   7.1 MENSAJES DE ERROR DE API
============================================================ */

function obtenerMensajeErrorAPI(
    error
) {

    switch (
    error?.tipo
    ) {

        case "OFFLINE":

            return "No hay conexión a Internet. Verifique su conexión e intente nuevamente.";


        case "TIMEOUT":

            return "La consulta está tardando más de lo esperado. Intente nuevamente.";


        case "HTTP":

            return "El servidor no pudo procesar correctamente la consulta.";


        case "JSON_INVALIDO":

            return "El servidor devolvió una respuesta no válida.";


        case "API":

            return error.message ||
                "La API no pudo procesar la solicitud.";


        case "RED":

            return "No fue posible establecer comunicación con el servidor.";


        default:

            return "Ocurrió un error inesperado al consultar la información.";

    }

}

/* ============================================================
   8. RESUMEN EJECUTIVO
============================================================ */

async function cargarResumen() {

    establecerMetricasCargando();


    try {

        const datos =
            await consultarAPI({

                action:
                    "resumengestiones"

            });


        const resumen =
            datos.resumen || {};


        DOM.metricTotal.textContent =
            numeroSeguro(
                resumen.totalGestiones
            );


        DOM.metricInterest.textContent =
            numeroSeguro(
                resumen.interesAlto
            );


        DOM.metricPotential.textContent =
            numeroSeguro(
                resumen.potencialAlto
            );


        DOM.metricVisits.textContent =
            numeroSeguro(
                resumen.solicitanVisita
            );


        DOM.metricSamples.textContent =
            numeroSeguro(
                resumen.entregaMuestra
            );


        actualizarFechaConsulta();

    }
    catch (error) {

        console.error(
            "CVDC 2026: error consultando resumen.",
            error
        );


        establecerMetricasError();


        DOM.lastUpdate.textContent =
            "No disponible";

    }

}


function establecerMetricasCargando() {

    const elementos = [

        DOM.metricTotal,
        DOM.metricInterest,
        DOM.metricPotential,
        DOM.metricVisits,
        DOM.metricSamples

    ];


    elementos.forEach(
        elemento => {

            elemento.textContent =
                "…";

        }
    );

}


function establecerMetricasError() {

    const elementos = [

        DOM.metricTotal,
        DOM.metricInterest,
        DOM.metricPotential,
        DOM.metricVisits,
        DOM.metricSamples

    ];


    elementos.forEach(
        elemento => {

            elemento.textContent =
                "—";

        }
    );

}


/* ============================================================
   9. CONSULTA DE GESTIONES
============================================================ */

async function cargarGestiones() {

    if (
        estadoDashboard.cargando
    ) {

        return;

    }


    estadoDashboard.cargando =
        true;


    mostrarEstadoCarga();


    try {

        const datos =
            await consultarAPI({

                action:
                    "gestiones",

                page:
                    estadoDashboard
                        .paginaActual,

                limit:
                    CONFIG
                        .RESULTADOS_POR_PAGINA,

                buscar:
                    estadoDashboard
                        .filtros
                        .buscar,

                nivel:
                    estadoDashboard
                        .filtros
                        .nivel,

                potencial:
                    estadoDashboard
                        .filtros
                        .potencial,

                visita:
                    estadoDashboard
                        .filtros
                        .visita,

                linea:
                    estadoDashboard
                        .filtros
                        .linea

            });


        procesarRespuestaGestiones(
            datos
        );

    }
    catch (error) {

        console.error(
            "CVDC 2026: error consultando gestiones.",
            error
        );


        mostrarErrorGeneral(
            obtenerMensajeErrorAPI(
                error
            )
        );

    }
    finally {

        estadoDashboard.cargando =
            false;

    }

}


/* ============================================================
   10. PROCESAR RESPUESTA DEL LISTADO
============================================================ */

function procesarRespuestaGestiones(
    datos
) {

    const gestiones =
        Array.isArray(
            datos.gestiones
        )
            ? datos.gestiones
            : [];


    estadoDashboard.totalResultados =
        numeroSeguro(
            datos.total
        );


    estadoDashboard.totalPaginas =
        Math.max(
            0,
            numeroSeguro(
                datos.totalPaginas
            )
        );


    estadoDashboard.paginaActual =
        Math.max(
            1,
            numeroSeguro(
                datos.pagina
            ) || 1
        );


    DOM.resultsCount.textContent =
        String(
            estadoDashboard
                .totalResultados
        );


    ocultarEstadosResultados();


    if (
        gestiones.length === 0
    ) {

        DOM.empty.hidden =
            false;


        DOM.pagination.hidden =
            true;


        return;

    }


    construirTabla(
        gestiones
    );


    DOM.tableWrapper.hidden =
        false;


    actualizarPaginacion();

}


/* ============================================================
   11. CONSTRUCCIÓN SEGURA DE TABLA
============================================================ */

function construirTabla(
    gestiones
) {

    DOM.tableBody.replaceChildren();


    const fragmento =
        document.createDocumentFragment();


    gestiones.forEach(
        gestion => {

            const fila =
                document.createElement(
                    "tr"
                );


            /* PARTICIPANTE */

            const participante =
                document.createElement(
                    "td"
                );


            const nombre =
                document.createElement(
                    "span"
                );


            nombre.className =
                "management-name";


            nombre.textContent =
                valorVisible(
                    gestion.nombre
                );


            const id =
                document.createElement(
                    "span"
                );


            id.className =
                "management-id";


            id.textContent =
                valorVisible(
                    gestion.idGestion
                );


            participante.append(
                nombre,
                id
            );


            /* EMPRESA */

            const empresa =
                crearCeldaTexto(
                    gestion.empresa,
                    "management-company"
                );


            /* LÍNEA */

            const linea =
                crearCeldaTexto(
                    obtenerLineaVisible(
                        gestion
                    )
                );


            /* INTERÉS */

            const interes =
                crearCeldaBadge(
                    gestion.nivelInteres,
                    claseNivel(
                        gestion.nivelInteres
                    )
                );


            /* POTENCIAL */

            const potencial =
                crearCeldaBadge(
                    gestion.potencialCompra,
                    claseNivel(
                        gestion.potencialCompra
                    )
                );


            /* VISITA */

            const visita =
                crearCeldaBadge(
                    gestion.solicitaVisita,
                    claseSiNo(
                        gestion.solicitaVisita
                    )
                );


            /* COMERCIAL */

            const comercial =
                crearCeldaTexto(
                    gestion.comercialRegistro
                );


            /* ACCIÓN */

            const accion =
                document.createElement(
                    "td"
                );


            const boton =
                document.createElement(
                    "button"
                );


            boton.type =
                "button";


            boton.className =
                "view-management-button";


            boton.textContent =
                "Ver detalle";


            boton.dataset.gestionId =
                String(
                    gestion.idGestion || ""
                );


            boton.setAttribute(
                "aria-label",
                `Ver detalle de ${valorVisible(
                    gestion.nombre
                )}`
            );


            accion.appendChild(
                boton
            );


            fila.append(

                participante,
                empresa,
                linea,
                interes,
                potencial,
                visita,
                comercial,
                accion

            );


            fragmento.appendChild(
                fila
            );

        }
    );


    DOM.tableBody.appendChild(
        fragmento
    );

}


/* ============================================================
   12. FUNCIONES DE CELDAS
============================================================ */

function crearCeldaTexto(
    valor,
    clase = ""
) {

    const celda =
        document.createElement(
            "td"
        );


    if (
        clase
    ) {

        celda.className =
            clase;

    }


    celda.textContent =
        valorVisible(
            valor
        );


    return celda;

}


function crearCeldaBadge(
    valor,
    clase
) {

    const celda =
        document.createElement(
            "td"
        );


    const badge =
        document.createElement(
            "span"
        );


    badge.className =
        `status-badge ${clase}`;


    badge.textContent =
        valorVisible(
            valor
        );


    celda.appendChild(
        badge
    );


    return celda;

}


/* ============================================================
   13. FILTROS
============================================================ */

function manejarFiltros(
    evento
) {

    evento.preventDefault();


    estadoDashboard.filtros = {

        buscar:
            DOM.search.value.trim(),

        nivel:
            DOM.level.value.trim(),

        potencial:
            DOM.potential.value.trim(),

        visita:
            DOM.visit.value.trim(),

        linea:
            DOM.line.value.trim()

    };


    estadoDashboard.paginaActual =
        1;


    cargarGestiones();

}


function limpiarFiltros() {

    DOM.filtersForm.reset();


    estadoDashboard.filtros = {

        buscar:
            "",

        nivel:
            "",

        potencial:
            "",

        visita:
            "",

        linea:
            ""

    };


    estadoDashboard.paginaActual =
        1;


    cargarGestiones();

}


/* ============================================================
   14. PAGINACIÓN
============================================================ */

function actualizarPaginacion() {

    if (
        estadoDashboard.totalPaginas <= 0
    ) {

        DOM.pagination.hidden =
            true;

        return;

    }


    DOM.pagination.hidden =
        false;


    DOM.paginationStatus.textContent =
        `Página ${estadoDashboard.paginaActual
        } de ${estadoDashboard.totalPaginas
        }`;


    DOM.previousPage.disabled =
        estadoDashboard.paginaActual <= 1;


    DOM.nextPage.disabled =
        estadoDashboard.paginaActual >=
        estadoDashboard.totalPaginas;

}


function paginaAnterior() {

    if (
        estadoDashboard.cargando ||
        estadoDashboard.paginaActual <= 1
    ) {

        return;

    }


    estadoDashboard.paginaActual--;


    cargarGestiones();

}


function paginaSiguiente() {

    if (
        estadoDashboard.cargando ||
        estadoDashboard.paginaActual >=
        estadoDashboard.totalPaginas
    ) {

        return;

    }


    estadoDashboard.paginaActual++;


    cargarGestiones();

}


/* ============================================================
   15. EVENTO DE TABLA
============================================================ */

function manejarClickTabla(
    evento
) {

    const boton =
        evento.target.closest(
            "[data-gestion-id]"
        );


    if (
        !boton
    ) {

        return;

    }


    const idGestion =
        String(
            boton.dataset.gestionId || ""
        ).trim();


    if (
        !idGestion
    ) {

        return;

    }


    abrirDetalleGestion(
        idGestion,
        boton
    );

}


/* ============================================================
   16. DETALLE DE GESTIÓN
============================================================ */

async function abrirDetalleGestion(
    idGestion,
    botonOrigen
) {

    prepararModal(
        idGestion
    );


    DOM.modal.hidden =
        false;


    document.body.classList.add(
        "modal-open"
    );


    DOM.modal.dataset.returnFocus =
        idGestion;


    DOM.modal._botonOrigen =
        botonOrigen;


    DOM.closeModal.focus();


    try {

        const datos =
            await consultarAPI({

                action:
                    "gestion",

                id:
                    idGestion

            });


        if (
            !datos.gestion
        ) {

            throw new Error(
                "La gestión no contiene información."
            );

        }


        construirDetalleGestion(
            datos.gestion
        );


        DOM.modalLoading.hidden =
            true;


        DOM.modalContent.hidden =
            false;

    }
    catch (error) {

        console.error(
            "CVDC 2026: error consultando detalle.",
            error
        );


        DOM.modalLoading.hidden =
            true;


        DOM.modalError.textContent =
            obtenerMensajeErrorAPI(
                error
            );


        DOM.modalError.hidden =
            false;

    }

}


/* ============================================================
   17. PREPARAR MODAL
============================================================ */

function prepararModal(
    idGestion
) {

    DOM.modalManagementId.textContent =
        idGestion;


    DOM.modalLoading.hidden =
        false;


    DOM.modalError.hidden =
        true;


    DOM.modalContent.hidden =
        true;


    DOM.modalContent.replaceChildren();

}


/* ============================================================
   18. CONSTRUCCIÓN DEL DETALLE
============================================================ */

function construirDetalleGestion(
    gestion
) {

    DOM.modalContent.replaceChildren();


    const fragmento =
        document.createDocumentFragment();


    fragmento.append(

        crearSeccionDetalle(
            "Identificación del participante",
            [

                [
                    "ID participante",
                    gestion.idParticipante
                ],

                [
                    "Nombre completo",
                    gestion.nombre
                ],

                [
                    "Número de contacto",
                    gestion.telefono
                ],

                [
                    "Correo electrónico",
                    gestion.correo
                ],

                [
                    "Ciudad de origen",
                    gestion.ciudad
                ],

                [
                    "Dirección",
                    gestion.direccion
                ],

                [
                    "Rango de edad",
                    gestion.edad
                ],

                [
                    "Género",
                    gestion.genero
                ]

            ]
        ),


        crearSeccionDetalle(
            "Perfil del participante",
            [

                [
                    "Quién es",
                    gestion.quienEs
                ],

                [
                    "Otro / Profesión u ocupación",
                    gestion.otroParticipante
                ],

                [
                    "Empresa / Clínica / Universidad",
                    gestion.empresa
                ],

                [
                    "Autorización de datos",
                    gestion.autorizacion
                ]

            ]
        ),


        crearSeccionDetalle(
            "Perfil comercial",
            [

                [
                    "Tiene poder de compra",
                    gestion.poderCompra
                ],

                [
                    "Compra productos veterinarios",
                    gestion.compraProductos
                ],

                [
                    "Dónde compra",
                    gestion.dondeCompra
                ],

                [
                    "Otro lugar de compra",
                    gestion.otroDondeCompra
                ],

                [
                    "Línea de interés",
                    gestion.lineaInteres
                ],

                [
                    "Otra línea",
                    gestion.otraLinea
                ],

                [
                    "Productos específicos de interés",
                    gestion.productosInteres,
                    true
                ],

                [
                    "Desea recibir información",
                    gestion.deseaInformacion
                ],

                [
                    "Solicita visita comercial",
                    gestion.solicitaVisita
                ]

            ]
        ),


        crearSeccionDetalle(
            "Calificación y seguimiento",
            [

                [
                    "Nivel de interés",
                    gestion.nivelInteres
                ],

                [
                    "Potencial de compra",
                    gestion.potencialCompra
                ],

                [
                    "Tiempo estimado de compra",
                    gestion.tiempoCompra
                ],

                [
                    "Acción siguiente",
                    gestion.accionSiguiente
                ],

                [
                    "Comercial que realiza registro",
                    gestion.comercialRegistro
                ],

                [
                    "Responsable del seguimiento",
                    gestion.responsableSeguimiento
                ],

                [
                    "Otro responsable",
                    gestion.otroResponsable
                ],

                [
                    "Comentario del visitante",
                    gestion.comentarioVisitante,
                    true
                ],

                [
                    "Acepta información comercial",
                    gestion.aceptaInfoComercial
                ],

                [
                    "Entrega de muestra",
                    gestion.entregaMuestra
                ]

            ]
        ),


        crearSeccionDetalle(
            "Trazabilidad",
            [

                [
                    "ID gestión",
                    gestion.idGestion
                ],

                [
                    "Fecha de registro",
                    gestion.fechaRegistroApi
                ],

                [
                    "Origen",
                    gestion.origen
                ],

                [
                    "Estado",
                    gestion.estadoRegistro
                ]

            ]
        )

    );


    DOM.modalContent.appendChild(
        fragmento
    );

}


/* ============================================================
   19. CREAR SECCIÓN DEL DETALLE
============================================================ */

function crearSeccionDetalle(
    titulo,
    campos
) {

    const seccion =
        document.createElement(
            "section"
        );


    seccion.className =
        "detail-section";


    const encabezado =
        document.createElement(
            "h3"
        );


    encabezado.className =
        "detail-section-title";


    encabezado.textContent =
        titulo;


    const grid =
        document.createElement(
            "div"
        );


    grid.className =
        "detail-grid";


    campos.forEach(
        campo => {

            const [
                etiqueta,
                valor,
                anchoCompleto = false
            ] = campo;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                anchoCompleto
                    ? "detail-item detail-item-full"
                    : "detail-item";


            const label =
                document.createElement(
                    "span"
                );


            label.className =
                "detail-label";


            label.textContent =
                etiqueta;


            const contenido =
                document.createElement(
                    "span"
                );


            contenido.className =
                "detail-value";


            contenido.textContent =
                valorVisible(
                    valor
                );


            item.append(
                label,
                contenido
            );


            grid.appendChild(
                item
            );

        }
    );


    seccion.append(
        encabezado,
        grid
    );


    return seccion;

}


/* ============================================================
   20. CERRAR MODAL
============================================================ */

function cerrarModal() {

    if (
        DOM.modal.hidden
    ) {

        return;

    }


    DOM.modal.hidden =
        true;


    document.body.classList.remove(
        "modal-open"
    );


    DOM.modalContent.replaceChildren();


    const botonOrigen =
        DOM.modal._botonOrigen;


    DOM.modal._botonOrigen =
        null;


    if (
        botonOrigen &&
        document.contains(
            botonOrigen
        )
    ) {

        botonOrigen.focus();

    }

}


function manejarClickModal(
    evento
) {

    if (
        evento.target.matches(
            "[data-close-modal]"
        )
    ) {

        cerrarModal();

    }

}


function manejarTeclado(
    evento
) {

    if (
        evento.key === "Escape" &&
        !DOM.modal.hidden
    ) {

        cerrarModal();

    }

}


/* ============================================================
   21. ESTADOS DEL LISTADO
============================================================ */

function mostrarEstadoCarga() {

    ocultarEstadosResultados();


    DOM.loading.hidden =
        false;


    DOM.resultsCount.textContent =
        "…";

}


function ocultarEstadosResultados() {

    DOM.loading.hidden =
        true;


    DOM.error.hidden =
        true;


    DOM.empty.hidden =
        true;


    DOM.tableWrapper.hidden =
        true;


    DOM.pagination.hidden =
        true;

}


function mostrarErrorGeneral(
    mensaje
) {

    ocultarEstadosResultados();


    DOM.error.textContent =
        mensaje;


    DOM.error.hidden =
        false;


    DOM.resultsCount.textContent =
        "0";

}


/* ============================================================
   22. UTILIDADES
============================================================ */

function numeroSeguro(
    valor
) {

    const numero =
        Number(
            valor
        );


    if (
        !Number.isFinite(
            numero
        ) ||
        numero < 0
    ) {

        return 0;

    }


    return Math.trunc(
        numero
    );

}


function valorVisible(
    valor
) {

    if (
        valor === undefined ||
        valor === null
    ) {

        return "—";

    }


    const texto =
        String(
            valor
        ).trim();


    return texto || "—";

}


function normalizarTexto(
    valor
) {

    return String(
        valor || ""
    )
        .normalize(
            "NFD"
        )
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .trim()
        .toLowerCase();

}


/* ============================================================
   23. CLASES DE ESTADO
============================================================ */

function claseNivel(
    valor
) {

    const nivel =
        normalizarTexto(
            valor
        );


    if (
        nivel === "alto"
    ) {

        return "status-high";

    }


    if (
        nivel === "medio"
    ) {

        return "status-medium";

    }


    return "status-low";

}


function claseSiNo(
    valor
) {

    const respuesta =
        normalizarTexto(
            valor
        );


    if (
        respuesta === "si"
    ) {

        return "status-yes";

    }


    return "status-no";

}


/* ============================================================
   24. LÍNEA DE INTERÉS VISIBLE
============================================================ */

function obtenerLineaVisible(
    gestion
) {

    const linea =
        String(
            gestion.lineaInteres || ""
        ).trim();


    const otra =
        String(
            gestion.otraLinea || ""
        ).trim();


    if (
        normalizarTexto(
            linea
        ) === "otra" &&
        otra
    ) {

        return otra;

    }


    return linea || "—";

}


/* ============================================================
   25. FECHA DE ACTUALIZACIÓN
============================================================ */

function actualizarFechaConsulta() {

    const ahora =
        new Date();


    const fecha =
        new Intl.DateTimeFormat(
            "es-CO",
            {

                day:
                    "2-digit",

                month:
                    "2-digit",

                year:
                    "numeric",

                hour:
                    "2-digit",

                minute:
                    "2-digit"

            }
        )
            .format(
                ahora
            );


    DOM.lastUpdate.textContent =
        `Actualizado ${fecha}`;

}