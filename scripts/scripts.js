/* =========================================================
   SCRIPTS.JS
   PAGINA: TODAS
   AUTOR: EDWIN ALEXANDER GALVIS PATIÑO - 1032386348
========================================================= */

/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.getElementById("menu-toggle");

const mainNav = document.getElementById("main-nav");

/* VALIDAR EXISTENCIA */

if (menuToggle && mainNav) {

    /* ABRIR MENU */

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("active");
    });

    /* CERRAR MENU AL HACER CLICK */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");
        });
    });

    /* CLICK FUERA */

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
        }
    });
}

/* =========================================================
   DARK MODE
========================================================= */

const darkToggle =
    document.getElementById("toggle-dark");

/* CARGAR ESTADO */

if (localStorage.getItem("dark-mode") === "enabled") {

    document.body.classList.add("dark-mode");
}

/* TOGGLE */

if (darkToggle) {

    darkToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        /* GUARDAR */

        if (
            document.body.classList.contains("dark-mode")
        ) {

            localStorage.setItem(
                "dark-mode",
                "enabled"
            );

        } else {

            localStorage.removeItem(
                "dark-mode"
            );
        }
    });
}

/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header =
    document.querySelector(".main-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");
    }
});