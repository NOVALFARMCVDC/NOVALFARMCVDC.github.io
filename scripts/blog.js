/* =========================================================
   BLOG.JS
   PAGINA: BLOG
   AUTOR: EDWIN ALEXANDER GALVIS PATIÑO - 1032386348
========================================================= */

/* =========================================================
   ARTÍCULOS BLOG
========================================================= */

const articles = [

    {
        image: "../assets/blog/Blog0.webp",
        category: "SEGURIDAD",
        title: "Cómo prevenir ataques ransomware en empresas",
        description: "Conoce las mejores prácticas para proteger tu información y evitar pérdidas.",
        date: "15 Mayo, 2026"
    },

    {
        image: "../assets/blog/Blog1.webp",
        category: "REDES",
        title: "Qué hacer si tu empresa pierde conexión a internet",
        description: "Pasos clave para actuar rápido y mantener tu operación activa siempre.",
        date: "10 Mayo, 2026"
    },

    {
        image: "../assets/blog/Blog2.webp",
        category: "BACKUP",
        title: "La importancia de los respaldos automáticos",
        description: "Asegura la continuidad de tu negocio con copias de seguridad efectivas.",
        date: "06 Mayo, 2026"
    },

    {
        image: "../assets/blog/Blog3.webp",
        category: "SERVIDORES",
        title: "Cómo optimizar el rendimiento de tus servidores",
        description: "Mejora la velocidad, estabilidad y seguridad de tus sistemas.",
        date: "01 Mayo, 2026"
    }

];

/* =========================================================
   CONTENEDOR ARTÍCULOS
========================================================= */

const container =
    document.getElementById("articlesContainer");

/* =========================================================
   GENERAR ARTÍCULOS
========================================================= */

if (container) {

    generateArticles();
}

/* =========================================================
   FUNCION GENERAR ARTÍCULOS
========================================================= */

function generateArticles() {

    /* =============================================
       LIMPIAR CONTENEDOR
    ============================================== */

    container.innerHTML = "";

    /* =============================================
       RECORRER ARTÍCULOS
    ============================================== */

    articles.forEach((article, index) => {

        /* =========================================
           CREAR CARD
        ========================================== */

        const articleCard =
            document.createElement("article");

        articleCard.classList.add(
            "article-card"
        );

        /* =========================================
           ANIMACIÓN
        ========================================== */

        articleCard.style.animationDelay =
            `${index * 0.12}s`;

        /* =========================================
           TEMPLATE
        ========================================== */

        articleCard.innerHTML = `

            <!-- IMAGEN -->

            <div class="article-image">

                <img
                    src="${article.image}"
                    alt="${article.title}"
                    loading="lazy">

                <span>

                    ${article.category}

                </span>

            </div>

            <!-- CONTENIDO -->

            <div class="article-content">

                <h3>

                    ${article.title}

                </h3>

                <p>

                    ${article.description}

                </p>

                <div class="article-footer">

                    <span>

                        <i class="fas fa-calendar"></i>

                        ${article.date}

                    </span>

                    <a href="#">

                        Leer más

                        <i class="fas fa-arrow-right"></i>

                    </a>

                </div>

            </div>

        `;

        /* =========================================
           INSERTAR
        ========================================== */

        container.appendChild(articleCard);
    });
}

/* =========================================================
   NEWSLETTER
========================================================= */

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterInput =
    document.getElementById("newsletterEmail");

const newsletterMessage =
    document.getElementById("newsletterMessage");

/* =========================================================
   VALIDAR EXISTENCIA NEWSLETTER
========================================================= */

if (newsletterForm) {

    /* =====================================================
       SUBMIT
    ====================================================== */

    newsletterForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            /* =============================================
               BOTÓN
            ============================================== */

            const submitButton =
                newsletterForm.querySelector("button");

            /* =============================================
               TEXTO ORIGINAL
            ============================================== */

            const originalButtonText =
                submitButton.innerHTML;

            /* =============================================
               EMAIL
            ============================================== */

            const email =
                newsletterInput.value.trim();

            /* =============================================
               VALIDAR EMAIL
            ============================================== */

            const isValid =
                validateEmail(email);

            if (!isValid) {

                showMessage(
                    "❌ Ingresa un correo electrónico válido.",
                    "error"
                );

                newsletterInput.style.borderColor =
                    "#ef4444";

                newsletterInput.style.boxShadow =
                    "0px 0px 0px 4px rgba(239,68,68,0.10)";

                return;
            }

            /* =============================================
               ESTADO LOADING
            ============================================== */

            submitButton.disabled = true;

            submitButton.innerHTML = `

                <i class="fas fa-spinner fa-spin"></i>

                Enviando...

            `;

            /* =============================================
               ESTADO INPUT OK
            ============================================== */

            newsletterInput.style.borderColor =
                "#22c55e";

            newsletterInput.style.boxShadow =
                "0px 0px 0px 4px rgba(34,197,94,0.10)";

            try {

                /* =========================================
                   SIMULACION ENVIÓ
                ========================================== */

                await new Promise((resolve) => {

                    setTimeout(resolve, 1800);
                });

                /* =========================================
                   RESET FORM
                ========================================== */

                newsletterForm.reset();

                /* =========================================
                   LIMPIAR ESTILOS
                ========================================== */

                newsletterInput.style.borderColor =
                    "";

                newsletterInput.style.boxShadow =
                    "";

                /* =========================================
                   SUCCESS
                ========================================== */

                showMessage(
                    "✅ Suscripción realizada correctamente.",
                    "success"
                );

            } catch (error) {

                /* =========================================
                   ERROR
                ========================================== */

                showMessage(
                    "❌ Ocurrió un error al procesar la suscripción.",
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
       VALIDACIÓN EN TIEMPO REAL
    ====================================================== */

    newsletterInput.addEventListener(
        "input",
        () => {

            validateNewsletterInput();
        }
    );

    newsletterInput.addEventListener(
        "blur",
        () => {

            validateNewsletterInput();
        }
    );
}

/* =========================================================
   VALIDAR INPUT NEWSLETTER
========================================================= */

function validateNewsletterInput() {

    const value =
        newsletterInput.value.trim();

    /* =============================================
       INPUT VACIÓ
    ============================================== */

    if (value === "") {

        newsletterInput.style.borderColor =
            "";

        newsletterInput.style.boxShadow =
            "";

        return false;
    }

    /* =============================================
       EMAIL INVALIDO
    ============================================== */

    if (!validateEmail(value)) {

        newsletterInput.style.borderColor =
            "#ef4444";

        newsletterInput.style.boxShadow =
            "0px 0px 0px 4px rgba(239,68,68,0.10)";

        return false;
    }

    /* =============================================
       EMAIL VALIDO
    ============================================== */

    newsletterInput.style.borderColor =
        "#22c55e";

    newsletterInput.style.boxShadow =
        "0px 0px 0px 4px rgba(34,197,94,0.10)";

    return true;
}

/* =========================================================
   VALIDAR EMAIL
========================================================= */

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}

/* =========================================================
   MENSAJES
========================================================= */

function showMessage(text, type) {

    if (!newsletterMessage) return;

    newsletterMessage.classList.add(
        "active"
    );

    newsletterMessage.innerHTML =
        text;

    /* =============================================
       SUCCESS
    ============================================== */

    if (type === "success") {

        newsletterMessage.style.background =
            "rgba(34,197,94,0.10)";

        newsletterMessage.style.color =
            "#22c55e";
    }

    /* =============================================
       ERROR
    ============================================== */

    else {

        newsletterMessage.style.background =
            "rgba(239,68,68,0.10)";

        newsletterMessage.style.color =
            "#ef4444";
    }

    /* =============================================
       OCULTAR
    ============================================== */

    setTimeout(() => {

        newsletterMessage.classList.remove(
            "active"
        );

    }, 5000);
}