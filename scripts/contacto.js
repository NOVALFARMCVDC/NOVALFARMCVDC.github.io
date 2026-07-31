/* =========================================================
   CONTACTO.JS
   PROYECTO: REGISTRO CVDC 2026
   EMPRESA: NOVALFARM SAS
========================================================= */

const form =
    document.getElementById("contactForm");

const message =
    document.getElementById("formMessage");

const quienesSelect =
    document.getElementById("quienes");

const grupoQuienesOtro =
    document.getElementById("grupoQuienesOtro");

const quienesOtroInput =
    document.getElementById("quienesb");


/* ======================================================
ENVIO FORM CON TIMEOUT
========================================================= */

async function enviarFormUnoConTimeout(
    url,
    formData
) {

    const controlador =
        new AbortController();

    const timeout =
        setTimeout(
            () => {
                controlador.abort();
            },
            TIMEOUT_FORM_UNO
        );

    try {

        await fetch(
            url,
            {
                method: "POST",
                mode: "no-cors",
                body: formData,
                signal: controlador.signal
            }
        );

        return true;

    } catch (error) {

        if (
            error.name === "AbortError"
        ) {

            throw new Error(
                "TIMEOUT_FORM_UNO"
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
   VALIDAR EXISTENCIA
========================================================= */

if (form) {

    /* =====================================================
       SUBMIT FORM
    ====================================================== */

    form.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            /* =============================================
               BOTÓN
            ============================================== */

            const submitButton =
                form.querySelector(".submit-btn");

            /* =============================================
               TEXTO ORIGINAL
            ============================================== */

            const originalButtonText =
                submitButton.innerHTML;

            /* =============================================
               VALIDAR CAMPOS
            ============================================== */

            const fields =
                form.querySelectorAll(
                    "input, select, textarea"
                );

            let formIsValid = true;

            fields.forEach((field) => {

                const valid =
                    validateField(field);

                if (!valid) {

                    formIsValid = false;
                }
            });

            /* =============================================
               DETENER SI HAY ERRORES
            ============================================== */

            if (!formIsValid) {

                showMessage(
                    "❌ Por favor completa correctamente los campos obligatorios.",
                    "error"
                );

                return;
            }

            /* =============================================
               LOADING STATE
            ============================================== */

            submitButton.disabled = true;

            submitButton.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                Enviando...
            `;

            /* =============================================
               GOOGLE FORM URL
            ============================================== */

            const formURL =
                "https://docs.google.com/forms/d/e/1FAIpQLSfTsuP86TGgXtvGI1_HN9LwRnlbXPwGm_fjJj-lT1Gh7DT5MA/formResponse";

            const TIMEOUT_FORM_UNO = 15000;

            /* =============================================
               FORM DATA
            ============================================== */

            const formData =
                new FormData(form);

            /* =============================================
               ENVÍO
            ============================================== */

            try {

                await enviarFormUnoConTimeout(
                    formURL,
                    formData
                );

                /* =========================================
                   RESET FORM
                ========================================== */

                form.reset();

                /* =========================================
                   LIMPIAR ESTILOS CAMPOS
                ========================================== */

                fields.forEach((field) => {

                    field.style.borderColor = "";

                    field.style.boxShadow = "";
                });

                /* =========================================
                   MENSAJE SUCCESS
                ========================================== */

                showMessage(
                    "✅ Registro realizado correctamente.",
                    "success"
                );

            } catch (error) {

                console.error(
                    "CVDC 2026: error durante el registro.",
                    error
                );

                if (
                    error.message ===
                    "TIMEOUT_FORM_UNO"
                ) {

                    mostrarMensaje(
                        "No fue posible confirmar el envío dentro del tiempo esperado. Verifique su conexión e intente nuevamente.",
                        "error"
                    );

                } else {

                    mostrarMensaje(
                        "No fue posible enviar la información. Verifique su conexión e intente nuevamente.",
                        "error"
                    );

                }

            }

            /* =============================================
               RESTAURAR BOTÓN
            ============================================== */

            submitButton.disabled = false;

            submitButton.innerHTML =
                originalButtonText;
        }
    );

    /* =====================================================
       OCULTAMIENTO CAMPO "OTRO" EN QUIÉNES
    ====================================================== */

    if (quienesSelect && grupoQuienesOtro && quienesOtroInput) {

        const actualizarCampoOtro = () => {

            const mostrar =
                quienesSelect.value === "Otro";

            grupoQuienesOtro.hidden = !mostrar;

            quienesOtroInput.required = mostrar;

            if (!mostrar) {
                quienesOtroInput.value = "";
                quienesOtroInput.style.borderColor = "";
                quienesOtroInput.style.boxShadow = "";
            }
        };

        quienesSelect.addEventListener(
            "change",
            actualizarCampoOtro
        );

        actualizarCampoOtro();
    }

    /* =====================================================
       VALIDACIONES EN TIEMPO REAL
    ====================================================== */

    const fields =
        form.querySelectorAll(
            "input, select, textarea"
        );

    fields.forEach((field) => {

        /* =============================================
           INPUT / TEXTAREA / SELECT
        ============================================== */

        field.addEventListener(
            "input",
            () => {

                validateField(field);
            }
        );

        field.addEventListener(
            "blur",
            () => {

                validateField(field);
            }
        );

        /* =============================================
           SELECT
        ============================================== */

        if (
            field.tagName === "SELECT" ||
            field.type === "checkbox"
        ) {

            field.addEventListener(
                "change",
                () => {

                    validateField(field);
                }
            );
        }
    });

    /* =====================================================
       FUNCION VALIDAR CAMPO
    ====================================================== */

    function validateField(field) {

        /* =============================================
           RESET ESTILOS
        ============================================== */

        field.style.borderColor = "";

        field.style.boxShadow = "";

        /* =============================================
            VALIDAR CHECKBOX
         ============================================== */

        if (field.type === "checkbox") {

            const privacyBox =
                field.closest(".privacy-consent");

            if (
                field.required &&
                !field.checked
            ) {

                if (privacyBox) {

                    privacyBox.style.borderColor =
                        "#ef4444";

                    privacyBox.style.background =
                        "rgba(239,68,68,0.06)";
                }

                return false;
            }

            if (privacyBox) {

                privacyBox.style.borderColor = "";

                privacyBox.style.background = "";
            }

            return true;
        }

        /* =============================================
           CAMPOS OPCIONALES
        ============================================== */

        if (!field.required) {

            if (field.value.trim() === "") {

                return true;
            }
        }

        /* =============================================
           VALIDAR VACÍO
        ============================================== */

        if (field.value.trim() === "") {

            field.style.borderColor =
                "#ef4444";

            field.style.boxShadow =
                "0px 0px 0px 4px rgba(239,68,68,0.10)";

            return false;
        }

        /* =============================================
           VALIDAR EMAIL
        ============================================== */

        if (field.type === "email") {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                !emailPattern.test(
                    field.value.trim()
                )
            ) {

                field.style.borderColor =
                    "#ef4444";

                field.style.boxShadow =
                    "0px 0px 0px 4px rgba(239,68,68,0.10)";

                return false;
            }
        }

        /* =============================================
           VALIDACIÓN EXITOSA
        ============================================== */

        field.style.borderColor =
            "#22c55e";

        field.style.boxShadow =
            "0px 0px 0px 4px rgba(34,197,94,0.10)";

        return true;
    }

    /* =====================================================
       FUNCION MENSAJES
    ====================================================== */

    function showMessage(text, type) {

        message.classList.add("active");

        message.innerHTML = text;

        /* =============================================
           SUCCESS
        ============================================== */

        if (type === "success") {

            message.style.background =
                "rgba(34,197,94,0.10)";

            message.style.color =
                "#22c55e";
        }

        /* =============================================
           ERROR
        ============================================== */

        else {

            message.style.background =
                "rgba(239,68,68,0.10)";

            message.style.color =
                "#ef4444";
        }

        /* =============================================
           OCULTAR MENSAJE
        ============================================== */

        setTimeout(() => {

            message.classList.remove(
                "active"
            );

        }, 5000);
    }
}