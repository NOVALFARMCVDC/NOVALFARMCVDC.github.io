/* =========================================================
   CONTACTO.JS
   PAGINA: CONTACTO
   AUTOR: EDWIN ALEXANDER GALVIS PATIÑO - 1032386348
========================================================= */

/* =========================================================
   ELEMENTOS
========================================================= */

const form =
    document.getElementById("contactForm");

const message =
    document.getElementById("formMessage");

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
               OBTENER DATOS
            ============================================== */

            const nombre =
                document.getElementById("nombre").value.trim();

            const telefono =
                document.getElementById("telefono").value.trim();

            const correo =
                document.getElementById("correo").value.trim();

            const ciudad =
                document.getElementById("ciudad").value.trim();

            const direccion =
                document.getElementById("direccion").value.trim();

            const rangoedad =
                document.getElementById("rangoedad").value.trim();

            const genero =
                document.getElementById("genero").value.trim();

            const quienes =
                document.getElementById("quienes").value.trim();

            const quienesb =
                document.getElementById("quienesb").value.trim();

            const empresa =
                document.getElementById("empresa").value.trim();

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

            /* =============================================
               FORM DATA
            ============================================== */

            const formData =
                new FormData(form);

            /* const formData =
                new FormData(); */

            /* =============================================
               APPEND DATOS
            ============================================== */

            /* formData.append(
                "entry.445168501",
                nombre
            ); */

            /* formData.append(
                "entry.1190734210",
                telefono
            ); */

            /* formData.append(
                "entry.1235014945",
                correo
            ); */

            /* formData.append(
                "entry.204726276",
                ciudad
            ); */

            /* formData.append(
                "entry.1206980979",
                direccion
            ); */

            /* formData.append(
                "entry.147446224",
                rangoedad
            ); */

            /* formData.append(
                "entry.490328538",
                genero
            );

            /* formData.append(
                "entry.2110988957",
                quienes
            ); */

            /* formData.append(
                "entry.1274518297",
                quienesb
            ); */

           /* formData.append(
                "entry.99293918",
                empresa
            ); */

            /* =============================================
               ENVÍO
            ============================================== */

            try {

                await fetch(
                    formURL,
                    {
                        method: "POST",

                        mode: "no-cors",

                        body: formData
                    }
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

                /* =========================================
                   ERROR
                ========================================== */

                showMessage(
                    "❌ Ocurrió un error al realizar el registro.",
                    "error"
                );
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

        if (field.tagName === "SELECT") {

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