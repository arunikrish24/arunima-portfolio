/* =========================================
   ARUNIMA PORTFOLIO - FINAL SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= Typing Animation ================= */
    const texts = [
        "Transforming Ideas into Interactive Digital Experiences",
        "MCA Student",
        "Web Developer",
        "UI/UX Enthusiast"
    ];

    let i = 0, j = 0, deleting = false;
    const typing = document.getElementById("typing");

    function type() {
        if (!typing) return;

        typing.textContent = texts[i].substring(0, j);

        if (!deleting) {
            j++;
            if (j > texts[i].length) {
                deleting = true;
                return setTimeout(type, 1200);
            }
        } else {
            j--;
            if (j === 0) {
                deleting = false;
                i = (i + 1) % texts.length;
            }
        }

        setTimeout(type, deleting ? 60 : 100);
    }
    type();

    /* ================= Scroll Reveal ================= */
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => observer.observe(el));

    /* ================= Back to Top ================= */
    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {
        if (topBtn) {
            topBtn.style.display = window.scrollY > 300 ? "block" : "none";
        }
    });

    if (topBtn) {
        topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /* ================= Scroll Progress ================= */
    const progress = document.getElementById("progress-bar");

    window.addEventListener("scroll", () => {
        if (progress) {
            const scrollTop = document.documentElement.scrollTop;
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            progress.style.width = (scrollTop / height) * 100 + "%";
        }
    });

    /* ================= Cursor Glow ================= */
    const cursor = document.getElementById("cursor-glow");

    if (cursor) {
        document.addEventListener("mousemove", e => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
    }

    /* ================= Theme Toggle ================= */
    const toggleBtn = document.getElementById("theme-toggle");
    let particlesMaterial;

    if (toggleBtn) {
        const icon = toggleBtn.querySelector("i");

        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            icon.classList.replace("fa-moon", "fa-sun");
        }

        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            const isLight = document.body.classList.contains("light-mode");

            localStorage.setItem("theme", isLight ? "light" : "dark");

            icon.classList.replace(
                isLight ? "fa-moon" : "fa-sun",
                isLight ? "fa-sun" : "fa-moon"
            );

            // 🔥 update particles color
            if (particlesMaterial) {
                particlesMaterial.color.set(
                    isLight ? 0x6C63FF : 0x00F5FF
                );
            }
        });
    }

    /* ================= VanillaTilt ================= */
    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(
            document.querySelectorAll(".card, .project-card, .tilt"),
            {
                max: 12,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                scale: 1.03
            }
        );
    }

    /* ================= Three.js Background ================= */
    if (typeof THREE !== "undefined") {

        const canvas = document.getElementById("three-canvas");
        if (!canvas) return;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const geometry = new THREE.BufferGeometry();
        const count = 2000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        // 🔥 Dynamic color
        const isLight = document.body.classList.contains("light-mode");

        particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: isLight ? 0x6C63FF : 0x00F5FF,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(geometry, particlesMaterial);
        scene.add(particles);

        function animate() {
            requestAnimationFrame(animate);
            particles.rotation.y += 0.0007;
            particles.rotation.x += 0.0003;
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener("resize", () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });
    }

});