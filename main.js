const button = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-links");

button.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    button.setAttribute('aria-expanded', isOpen);
});


let visId, fadeId;

const emailButton = document.querySelector('[aria-label="Email"]');
emailButton.addEventListener("click", async () => {
    const email = emailButton.getAttribute("email");
    let copyText = document.querySelector(".copy-text");

    copyText.classList.remove("visible", "fade-out");

    clearTimeout(visId);
    clearTimeout(fadeId);
    let timeoutDuration = 5000;
    
    try {
        await navigator.clipboard.writeText(email);
        copyText.textContent = "Copy Successful.";
    } catch (error) {
        copyText.textContent = `Copy Failed, email me directly: ${email}`;
        timeoutDuration = 20000;
    }

    visId = setTimeout(() => {
        copyText.classList.add("visible");
    }, 100);

    fadeId = setTimeout(() => {
        copyText.classList.add("fade-out");
    }, timeoutDuration);
})
