/* =========================================================
   CONTACTO.JS
   PROYECTO: REGISTRO CVDC 2026
   EMPRESA: NOVALFARM SAS
========================================================= */

/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.getElementById("menu-toggle");

const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {

    /* ABRIR / CERRAR MENU */

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Cerrar menú"
                : "Abrir menú"
        );
    });

    /* CERRAR MENU AL HACER CLICK */

    const navLinks =
        mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );
        });
    });

    /* CERRAR MENU AL HACER CLICK FUERA */

    document.addEventListener("click", (event) => {

        const isClickInsideMenu =
            mainNav.contains(event.target);

        const isClickToggle =
            menuToggle.contains(event.target);

        if (
            !isClickInsideMenu &&
            !isClickToggle
        ) {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );
        }
    });

    /* CERRAR MENU CON ESC */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mainNav.classList.contains("active")
            ) {

                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );

                menuToggle.focus();
            }
        }
    );

}

/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header =
    document.querySelector(".main-header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");
        }
    });
}