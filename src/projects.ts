import { initNavBarMenu } from "./initNavBarMenu.ts";

initNavBarMenu();

self.addEventListener("load", () => {
    document
        .querySelectorAll(".animate-in")
        .forEach(element => element.classList.add("visible"));
});
