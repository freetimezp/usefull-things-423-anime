document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const stickySection = document.querySelector(".sticky");

    /* =====================================================
       LENIS
    ===================================================== */

    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.querySelector(".loader");
    const counter = document.querySelector(".loader-counter span");
    const loaderLine = document.querySelector(".loader-line");

    const loaderTl = gsap.timeline();

    const loaderObject = {
        value: 0,
    };

    loaderTl.to(loaderObject, {
        value: 100,
        duration: 1.8,
        ease: "power2.inOut",

        onUpdate: () => {
            counter.textContent = Math.floor(loaderObject.value)
                .toString()
                .padStart(2, "0");

            gsap.set(loaderLine, {
                width: `${loaderObject.value}%`,
            });
        },
    });

    loaderTl.to(loader, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        ease: "power4.inOut",
    });

    /* =====================================================
       HERO INTRO
    ===================================================== */

    const heroTl = gsap.timeline({
        delay: 2,
    });

    heroTl
        .from(".hero-bg", {
            scale: 1.25,
            duration: 2.5,
            ease: "power3.out",
        })
        .from(
            ".hero-kicker",
            {
                opacity: 0,
                y: 20,
                duration: 0.8,
            },
            "-=1.5",
        )
        .from(
            ".hero h1",
            {
                opacity: 0,
                y: 80,
                duration: 1.4,
                ease: "power4.out",
            },
            "-=0.6",
        )
        .from(
            ".hero-content p",
            {
                opacity: 0,
                y: 30,
                duration: 1,
            },
            "-=0.8",
        )
        .from(
            ".hero-top span, .hero-bottom > *",
            {
                opacity: 0,
                y: 15,
                stagger: 0.1,
                duration: 0.7,
            },
            "-=0.7",
        );

    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    gsap.to(".hero-bg", {
        yPercent: 15,
        scale: 1.2,

        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });

    /* =====================================================
       SCROLL INDICATOR
    ===================================================== */

    gsap.to(".scroll-line i", {
        x: 60,
        duration: 1.2,
        repeat: -1,
        ease: "power2.inOut",
        yoyo: true,
    });

    /* =====================================================
       ABOUT IMAGE
    ===================================================== */

    gsap.from(".about-img", {
        y: 120,
        rotate: -5,
        opacity: 0,

        scrollTrigger: {
            trigger: ".about",
            start: "top 75%",
            end: "top 25%",
            scrub: true,
        },
    });

    gsap.from(".about-copy", {
        x: 100,
        opacity: 0,

        scrollTrigger: {
            trigger: ".about",
            start: "top 70%",
            end: "top 25%",
            scrub: true,
        },
    });

    gsap.to(".about-bg-text", {
        x: -100,
        rotation: -10,

        scrollTrigger: {
            trigger: ".about",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });

    /* =====================================================
       INTRO LETTERS
    ===================================================== */

    const introParagraph = document.querySelectorAll(".intro-col p");

    introParagraph.forEach((paragraph) => {
        const text = paragraph.textContent.trim();

        paragraph.innerHTML = text
            .split("")
            .map((char) => {
                if (char === " ") {
                    return " ";
                }

                return `<span>${char}</span>`;
            })
            .join("");
    });

    function flickerAnimation(targets, opacity) {
        gsap.to(targets, {
            opacity,
            duration: 0.05,
            stagger: {
                amount: 0.45,
                from: "random",
            },
            overwrite: true,
        });
    }

    /* =====================================================
       STICKY SECTION
    ===================================================== */

    const totalStickyHeight = window.innerHeight * 4;

    ScrollTrigger.create({
        trigger: stickySection,

        start: "top top",

        end: () => `+=${window.innerHeight * 3}px`,

        onEnter: () => {
            flickerAnimation(".intro-col p span", 1);
        },

        onLeave: () => {
            flickerAnimation(".intro-col p span", 0);
        },

        onEnterBack: () => {
            flickerAnimation(".intro-col p span", 1);
        },

        onLeaveBack: () => {
            flickerAnimation(".intro-col p span", 0);
        },
    });

    /* =====================================================
       MAIN IMAGE TIMELINE
    ===================================================== */

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${totalStickyHeight}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
        },
    });

    /* IMAGE 1 */

    tl.to(
        ".img-1 img",
        {
            scale: 1.18,
            filter: "saturate(0.85) contrast(1.2) brightness(0.8)",
            ease: "none",
        },
        0,
    );

    /* IMAGE 2 */

    tl.to(
        ".img-2 img",
        {
            scale: 1.18,
            ease: "none",

            onUpdate: function () {
                const progress = this.progress();

                const left = gsap.utils.interpolate(40, 0, progress);

                const right = gsap.utils.interpolate(60, 100, progress);

                const top = gsap.utils.interpolate(25, 0, progress);

                const bottom = gsap.utils.interpolate(75, 100, progress);

                gsap.set(".img-2", {
                    clipPath: `
                        polygon(
                            ${left}% ${top}%,
                            ${right}% ${top}%,
                            ${right}% ${bottom}%,
                            ${left}% ${bottom}%
                        )
                    `,
                });
            },
        },
        1,
    );

    /* IMAGE 3 */

    tl.to(
        ".img-3",
        {
            ease: "none",

            onUpdate: function () {
                const progress = this.progress();

                const x1 = gsap.utils.interpolate(50, 0, progress);

                const x2 = gsap.utils.interpolate(50, 100, progress);

                const y1 = gsap.utils.interpolate(50, 0, progress);

                const y2 = gsap.utils.interpolate(50, 100, progress);

                gsap.set(".img-3", {
                    clipPath: `
                        polygon(
                            ${x1}% ${y1}%,
                            ${x2}% ${y1}%,
                            ${x2}% ${y2}%,
                            ${x1}% ${y2}%
                        )
                    `,
                });
            },
        },
        2,
    );

    tl.to(
        ".img-3 img",
        {
            scale: 1.2,
            ease: "none",
        },
        2,
    );

    /* SECOND IMAGE PUSH */

    tl.to(
        ".img-2 img",
        {
            scale: 1.3,
            ease: "none",
        },
        3,
    );

    /* =====================================================
       CINEMATIC COLOR SHIFT
    ===================================================== */

    tl.to(
        ".img-1 img, .img-2 img, .img-3 img",
        {
            filter: "saturate(0.35) contrast(1.4) brightness(0.45)",
            ease: "none",
        },
        2.7,
    );

    /* =====================================================
       COPY REVEAL
    ===================================================== */

    gsap.to(".copy", {
        scrollTrigger: {
            trigger: ".copy-trigger",
            start: "top 75%",
            end: "top 30%",
            scrub: true,
        },

        rotationX: 0,
        scale: 1,
        opacity: 1,

        ease: "power2.out",
    });

    /* =====================================================
       COPY LETTER ANIMATION
    ===================================================== */

    gsap.from(".copy h2", {
        y: 80,
        opacity: 0,

        scrollTrigger: {
            trigger: ".copy-trigger",
            start: "top 55%",
            end: "top 35%",
            scrub: true,
        },
    });

    /* =====================================================
       STICKY BACKGROUND KANJI
    ===================================================== */

    gsap.to(".sticky-bg-text", {
        rotation: 15,
        scale: 1.2,

        scrollTrigger: {
            trigger: stickySection,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });

    /* =====================================================
       FOOTER REVEAL
    ===================================================== */

    gsap.from(".footer-content", {
        y: 100,
        opacity: 0,

        scrollTrigger: {
            trigger: ".footer",
            start: "top 75%",
            end: "top 35%",
            scrub: true,
        },
    });

    gsap.to(".footer-kanji", {
        rotation: -12,
        x: -100,

        scrollTrigger: {
            trigger: ".footer",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });

    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {
        ScrollTrigger.refresh();
    });

    ScrollTrigger.refresh();
});
