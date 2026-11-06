export function initAnimateIn(): void
{
    self.addEventListener("load", () => {
        document
            .querySelectorAll(".animate-in")
            .forEach(element => element.classList.add("visible"));
    });
}
