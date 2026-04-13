const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("close");
const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");
const mobileMenuLinks = document.querySelectorAll(
    "#mobileMenu a[data-menu-link]",
);

const openMobileMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (mobileMenuBtn) mobileMenuBtn.setAttribute("aria-expanded", "true");
};

const closeMobileMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.add("hidden");
    document.body.style.overflow = "auto";
    if (mobileMenuBtn) mobileMenuBtn.setAttribute("aria-expanded", "false");
};

mobileMenuBtn?.addEventListener("click", openMobileMenu);
closeMenu?.addEventListener("click", closeMobileMenu);
mobileMenuBackdrop?.addEventListener("click", closeMobileMenu);
mobileMenuLinks.forEach((link) =>
    link.addEventListener("click", closeMobileMenu),
);



const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        backToTopBtn.classList.remove("hidden");
    } else {
        backToTopBtn.classList.add("hidden");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});



const swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    fadeEffect: {
        crossFade: true, // 👈 Smooth cross-fade
    },
    pagination: {
        el: ".reviews-swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("[data-menu-link]");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120; // adjust for header height
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        const desktopMenuItem = link.closest(".menu-item");
        desktopMenuItem?.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === "#" + current) {
            desktopMenuItem?.classList.add("active");
        }
    });
});

function openLightbox(element) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");

    // Get the image source and alt text from the clicked card
    const clickedImg = element.querySelector("img");
    const imgSrc = clickedImg.getAttribute("src");
    const imgAlt = clickedImg.getAttribute("alt");

    // Update the lightbox content
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = imgAlt;

    // Show the lightbox with a fade effect
    lightbox.classList.remove("hidden");
    setTimeout(() => {
        lightboxImg.classList.remove("scale-95");
        lightboxImg.classList.add("scale-100");
    }, 10);

    // Prevent scrolling on the main page while open
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightboxImg.classList.add("scale-95");
    lightbox.classList.add("hidden");

    // Re-enable scrolling
    document.body.style.overflow = "auto";
}

// Close on 'Esc' key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});



// ================================> contact form api implementation  < =================================== //

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const btn = document.getElementById("submitBtn");
    const messageBox = document.getElementById("formMessage");

    if (!form || !btn || !messageBox) return;

    const hasEmailJs = typeof emailjs !== "undefined";
    if (hasEmailJs) {
        emailjs.init("gGFgDlzaImgM5kmKp");
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        messageBox.className = "hidden my-4 text-sm rounded-md px-4 py-3";
        messageBox.textContent = "";

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (!hasEmailJs) {
            messageBox.classList.remove("hidden");
            messageBox.classList.add(
                "bg-red-500/10",
                "text-red-400",
                "border",
                "border-red-500/30"
            );
            messageBox.textContent = "Failed to load email service. Please refresh and try again.";
            return;
        }

        btn.innerText = "Sending...";
        btn.disabled = true;
        btn.classList.add("opacity-70", "cursor-not-allowed");

        const params = {
            name: form.elements.name.value.trim(),
            phone: form.elements.phone.value.trim(),
            email: form.elements.email.value.trim(),
            message: form.elements.message.value.trim(),
        };

        try {
            await emailjs.send("service_6qj4s5c", "template_hvg7zck", params);

            messageBox.classList.remove("hidden");
            messageBox.classList.add(
                "bg-green-500/10",
                "text-green-400",
                "border",
                "border-green-500/30"
            );
            messageBox.innerText = "Thank you! Your message has been sent successfully.";

            btn.innerText = "Sent";
            form.reset();

            setTimeout(() => {
                messageBox.classList.add("hidden");
            }, 4000);
        } catch (error) {
            console.error(error);

            messageBox.classList.remove("hidden");
            messageBox.classList.add(
                "bg-red-500/10",
                "text-red-400",
                "border",
                "border-red-500/30"
            );
            messageBox.innerText = "Failed to send message. Please try again.";

            setTimeout(() => {
                messageBox.classList.add("hidden");
            }, 4000);
        }

        btn.innerText = "Request a Quote";
        btn.disabled = false;
        btn.classList.remove("opacity-70", "cursor-not-allowed");
    });
});
