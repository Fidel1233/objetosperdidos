/* =========================================
   MENÚ RESPONSIVE
========================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const nav =
    document.getElementById("nav");


menuToggle.addEventListener("click", () => {

    nav.classList.toggle("open");

});


/* CERRAR MENÚ AL HACER CLICK */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});



/* =========================================
   HEADER AL HACER SCROLL
========================================= */

const header =
    document.getElementById("header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* =========================================
   CARRUSEL
========================================= */

const slides =
    document.querySelectorAll(".slide");

const dots =
    document.querySelectorAll(".dot");

const nextButton =
    document.getElementById("next");

const prevButton =
    document.getElementById("prev");


let currentSlide = 0;

let sliderInterval;



/* MOSTRAR SLIDE */

function showSlide(index) {

    slides.forEach(slide => {

        slide.classList.remove("active");

    });


    dots.forEach(dot => {

        dot.classList.remove("active");

    });


    slides[index].classList.add("active");

    dots[index].classList.add("active");

    currentSlide = index;

}



/* SIGUIENTE */

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);

}



/* ANTERIOR */

function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide =
            slides.length - 1;

    }

    showSlide(currentSlide);

}



/* BOTÓN SIGUIENTE */

nextButton.addEventListener(
    "click",
    () => {

        nextSlide();

        restartSlider();

    }
);



/* BOTÓN ANTERIOR */

prevButton.addEventListener(
    "click",
    () => {

        previousSlide();

        restartSlider();

    }
);



/* DOTS */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

        restartSlider();

    });

});



/* AUTOMÁTICO */

function startSlider() {

    sliderInterval =
        setInterval(
            nextSlide,
            5000
        );

}


function restartSlider() {

    clearInterval(sliderInterval);

    startSlider();

}


startSlider();



/* =========================================
   ANIMACIONES AL HACER SCROLL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================
   CONTADORES
========================================= */

const counters =
    document.querySelectorAll(".counter");


let countersStarted = false;


function startCounters() {

    if (countersStarted) {

        return;

    }


    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.target
            );

        let current = 0;

        const increment =
            Math.ceil(target / 80);


        const updateCounter =
            setInterval(() => {

                current += increment;


                if (current >= target) {

                    counter.textContent =
                        target + "+";

                    clearInterval(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        current;

                }

            }, 25);

    });

}



/* OBSERVAR ESTADÍSTICAS */

const statsSection =
    document.querySelector(".stats");


const statsObserver =
    new IntersectionObserver(
        entries => {

            if (entries[0].isIntersecting) {

                startCounters();

            }

        },
        {
            threshold: 0.4
        }
    );


statsObserver.observe(statsSection);



/* =========================================
   BUSCADOR
========================================= */

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const searchMessage =
    document.getElementById("searchMessage");


searchButton.addEventListener(
    "click",
    searchObject
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchObject();

        }

    }
);


function searchObject() {

    const value =
        searchInput.value.trim();


    if (value === "") {

        searchMessage.textContent =
            "⚠️ Escribe el nombre del objeto que deseas buscar.";

        return;

    }


    searchMessage.textContent =
        `🔎 Buscando objetos relacionados con "${value}"...`;


    /*
       Aquí posteriormente puedes conectar
       este buscador con tu base de datos.
    */

}



/* =========================================
   BOTÓN VOLVER ARRIBA
========================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* =========================================
   AÑO AUTOMÁTICO
========================================= */

const year =
    document.getElementById("year");


year.textContent =
    new Date().getFullYear();



/* =========================================
   NAVEGACIÓN ACTIVA
========================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (href === `#${current}`) {

            link.classList.add("active");

        }

    });

});