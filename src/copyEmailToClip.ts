let visId: ReturnType<typeof setTimeout> | undefined;
let fadeId: ReturnType<typeof setTimeout> | undefined;

export function copyEmailToClip(): void {
    const button = document.querySelector<HTMLElement>('[aria-label="Email"]');
    const message = document.querySelector<HTMLElement>(".copy-text");

    if (!button || !message) return;

    const email = button.dataset.email;
    if (!email) return;

    button.addEventListener("click", async () => {
        clearTimeout(visId);
        clearTimeout(fadeId);

        message.classList.remove("visible", "fade-out");

        let timeout = 5000;

        try {
            await navigator.clipboard.writeText(email);
            message.textContent = "Copy Successful.";
        } catch {
            message.textContent = `Copy Failed, email me directly: ${email}`;
            timeout = 20000;
        }

        visId = setTimeout(() => {
            message.classList.add("visible");
        }, 100);

        fadeId = setTimeout(() => {
            message.classList.add("fade-out");
        }, timeout);
    });
}