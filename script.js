document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("page-ready");


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".intro-section, " +
        ".section-top, " +
        ".service, " +
        ".feature-image, " +
        ".feature-content, " +
        ".numbers-heading, " +
        ".number-grid > div, " +
        ".final-cta, " +
        ".footer-main"
    );

    revealElements.forEach((element, index) => {

        element.classList.add("reveal");

        if (element.classList.contains("service")) {
            element.style.transitionDelay =
                `${index * 80}ms`;
        }

    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -70px 0px"
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       STAGGER SERVICES
       ===================================================== */

    const services =
        document.querySelectorAll(".service");

    services.forEach((service, index) => {

        service.style.setProperty(
            "--delay",
            `${index * 100}ms`
        );

    });


    /* =====================================================
       NUMBER COUNTERS
       ===================================================== */

    const numberValues = {
        "01": "01",
        "02": "02",
        "03": "03"
    };


    const numberCards =
        document.querySelectorAll(".number-grid strong");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("counter-active");

                    counterObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.5
        }
    );


    numberCards.forEach(number => {
        counterObserver.observe(number);
    });


    /* =====================================================
       HERO IMAGE 3D TILT
       ===================================================== */

    const heroImage =
        document.querySelector(".image-main");

    if (heroImage) {

        heroImage.addEventListener("mousemove", event => {

            const rect =
                heroImage.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            const rotateX =
                ((centerY - y) / centerY) * 4;

            heroImage.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.025)
                `;

        });


        heroImage.addEventListener("mouseleave", () => {

            heroImage.style.transform =
                `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
                `;

        });

    }


    /* =====================================================
       CURSOR GLOW
       ===================================================== */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "cursor-glow";

    document.body.appendChild(cursorGlow);


    document.addEventListener("mousemove", event => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    });


    /* =====================================================
       MAGNETIC BUTTONS
       ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".btn-primary, " +
            ".btn-dark, " +
            ".cta-button, " +
            ".nav-cta"
        );


    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", event => {

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `
                translate(${x * 0.12}px,
                           ${y * 0.12}px)
                `;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0,0)";

        });

    });


    /* =====================================================
       PARALLAX HERO
       ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroBackground =
        document.querySelector(".hero-background");


    window.addEventListener("scroll", () => {

        const scroll =
            window.scrollY;

        if (hero && heroBackground) {

            heroBackground.style.transform =
                `
                translateY(${scroll * 0.15}px)
                scale(1.05)
                `;

        }

    });


    /* =====================================================
       FEATURE IMAGE PARALLAX
       ===================================================== */

    const featureImage =
        document.querySelector(".feature-image");


    window.addEventListener("scroll", () => {

        if (!featureImage) return;

        const rect =
            featureImage.getBoundingClientRect();

        const windowHeight =
            window.innerHeight;


        if (
            rect.top < windowHeight &&
            rect.bottom > 0
        ) {

            const progress =
                (windowHeight - rect.top) /
                (windowHeight + rect.height);

            const movement =
                (progress - 0.5) * 25;

            featureImage.style.backgroundPosition =
                `center ${50 + movement}%`;

        }

    });


    /* =====================================================
       SCROLL PROGRESS BAR
       ===================================================== */

    const progress =
        document.createElement("div");

    progress.className =
        "scroll-progress";

    document.body.appendChild(progress);


    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            (scrollTop / totalHeight) * 100;

        progress.style.width =
            `${percentage}%`;

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("section");

    const navLinks =
        document.querySelectorAll(".navbar nav a");


    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (
                window.scrollY >= sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

        });

    });


    /* =====================================================
       SERVICE HOVER NUMBER
       ===================================================== */

    services.forEach(service => {

        service.addEventListener("mouseenter", () => {

            service.classList.add("service-hover");

        });

        service.addEventListener("mouseleave", () => {

            service.classList.remove("service-hover");

        });

    });


    /* =====================================================
       SMOOTH PAGE LINKS
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});