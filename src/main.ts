import { initNavBarMenu } from "./initNavBarMenu.ts";
import { copyEmailToClip } from "./copyEmailToClip.ts";

initNavBarMenu();
copyEmailToClip();

self.addEventListener("load", () => {
    document
        .querySelectorAll(".animate-in")
        .forEach(element => element.classList.add("visible"));
});