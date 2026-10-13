export function initNavBarMenu(): void
{
    const button = document.querySelector(".hamburger");
    const menu = document.querySelector(".nav-links");

    if (!button || !menu) return;

    button.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open"); 
        button.setAttribute('aria-expanded', String(isOpen));
    });
}