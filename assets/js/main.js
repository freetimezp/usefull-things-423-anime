document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const stickySection = document.querySelector(".sticky");
    const totalStickyHeight = window.innerHeight * 4;

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const introParagraph = document.querySelectorAll(".intro-col p");

    introParagraph.forEach((paragraph) => {
        const text = paragraph.textContent;

        paragraph.innerHTML = text
            .split(/(\s+)/)
            .map((part) => {
                if (part.trim() === "") return part;
                return part
                    .split("")
                    .map((char) => `<span style="opacity: 0; display: inline-block">${char}</span>`)
                    .join(""); // <-- important!
            })
            .join(""); // <-- SUPER important!
    });

    function flickerAnimation(targets, toOpacity) {
        gsap.to(targets, {
            opacity: toOpacity,
            duration: 0.05,
            stagger: {
                amount: 0.3,
                from: "random",
            },
        });
    }

    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `${window.innerHeight * 3}px`, // explicit px
        onEnter: () => flickerAnimation(".intro-col p span", 1),
        onLeave: () => flickerAnimation(".intro-col p span", 0),
        onEnterBack: () => flickerAnimation(".intro-col p span", 1),
        onLeaveBack: () => flickerAnimation(".intro-col p span", 0),
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${totalStickyHeight}`, // relative pin length
            scrub: true,
            pin: true,
        },
    });

    tl.to(
        ".img-1 img",
        {
            scale: 1.125,
            ease: "none",
        },
        0
    );

    // Animate parent clip-path via onUpdate (keep tween simple and avoid setting clipPath on the image itself)
    tl.to(
        ".img-2 img",
        {
            scale: 1.125,
            ease: "none",
            onUpdate: function () {
                const progress = this.progress();
                gsap.set(".img-2", {
                    clipPath: `polygon(
                    ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(25, 0, progress)}%,
                    ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(25, 0, progress)}%,
                    ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%,
                    ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%
                )`,
                });
            },
        },
        1
    );

    // img-3: same approach — animate img scale and set parent clip-path in onUpdate
    tl.to(
        ".img-3",
        {
            // we only animate the parent clip-path (tween target is the parent)
            ease: "none",
            onUpdate: function () {
                const progress = this.progress();
                gsap.set(".img-3", {
                    clipPath: `polygon(
                    ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%,
                    ${gsap.utils.interpolate(50, 100, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%,
                    ${gsap.utils.interpolate(50, 100, progress)}% ${gsap.utils.interpolate(50, 100, progress)}%,
                    ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 100, progress)}%
                )`,
                });
            },
        },
        2
    );

    tl.to(".img-3 img", { scale: 1.125, ease: "none" }, 2);

    tl.to(
        ".img-2 img",
        {
            scale: 1.25,
            ease: "none",
        },
        3
    );

    gsap.to(".copy", {
        scrollTrigger: {
            trigger: ".copy-trigger",
            start: "top 70%",
            end: "top 30%",
            scrub: true,
        },
        rotationX: 0,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
    });
});
