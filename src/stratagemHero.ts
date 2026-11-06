import { STRATAGEMS, type Direction, type Stratagem } from "./stratagems.ts";

const KEY_MAP: Record<string, Direction> = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    s: "down",
    a: "left",
    d: "right",
};

const MAX_TIME_MS = 10_000;
const TIME_BONUS_MS = 1_000;
const POINTS_PER_ARROW = 5;
const ROUND_PAUSE_MS = 2_000;
const READY_MS = 3_000;

type State = "idle" | "ready" | "playing" | "between" | "over";

export function initStratagemHero(): void
{
    const root = document.querySelector<HTMLElement>("#stratagem-hero");
    if (!root) return;

    const roundEl = root.querySelector<HTMLElement>("#sh-round")!;
    const scoreEl = root.querySelector<HTMLElement>("#sh-score")!;
    const queueEl = root.querySelector<HTMLElement>("#sh-queue")!;
    const iconEl = root.querySelector<HTMLImageElement>("#sh-icon")!;
    const nameEl = root.querySelector<HTMLElement>("#sh-name")!;
    const arrowsEl = root.querySelector<HTMLElement>("#sh-arrows")!;
    const barEl = root.querySelector<HTMLElement>("#sh-timer-bar")!;
    const messageEl = root.querySelector<HTMLElement>("#sh-message")!;
    const startButton = root.querySelector<HTMLButtonElement>("#sh-start")!;

    let state: State = "idle";
    let round = 0;
    let score = 0;
    let perfect = true;
    let queue: Stratagem[] = [];
    let position = 0;
    let timeLeft = MAX_TIME_MS;
    let lastFrame = 0;
    let frameId = 0;
    let pauseId = 0;

    function pickStratagems(count: number): Stratagem[]
    {
        return Array.from({ length: count }, () =>
            STRATAGEMS[Math.floor(Math.random() * STRATAGEMS.length)]);
    }

    function renderHud(): void
    {
        roundEl.textContent = String(round);
        scoreEl.textContent = String(score);
    }

    function renderQueue(): void
    {
        queueEl.replaceChildren(
            ...queue.slice(1).map(item => {
                const chip = document.createElement("img");
                chip.src = item.icon;
                chip.alt = item.name;
                chip.title = item.name;
                return chip;
            }),
        );
        // Show only the chips that fit on one row.
        while (queueEl.lastChild && queueEl.scrollWidth > queueEl.clientWidth)
        {
            queueEl.lastChild.remove();
        }
    }

    function renderStratagem(wrong = false): void
    {
        const current = queue[0];
        renderQueue();
        iconEl.src = current?.icon ?? "";
        iconEl.alt = current?.name ?? "";
        iconEl.hidden = !current;
        nameEl.textContent = current ? current.name : "";
        arrowsEl.replaceChildren(
            ...(current?.code ?? []).map((direction, index) => {
                const arrow = document.createElement("span");
                arrow.className = index < position ? "sh-arrow done" : "sh-arrow";
                arrow.classList.add(direction);
                if (wrong) arrow.classList.add("wrong");
                return arrow;
            }),
        );
    }

    function renderTimer(): void
    {
        barEl.style.width = `${(timeLeft / MAX_TIME_MS) * 100}%`;
    }

    function tick(now: number): void
    {
        if (state !== "playing") return;
        timeLeft -= now - lastFrame;
        lastFrame = now;
        if (timeLeft <= 0)
        {
            timeLeft = 0;
            renderTimer();
            endGame();
            return;
        }
        renderTimer();
        frameId = requestAnimationFrame(tick);
    }

    function startRound(): void
    {
        round += 1;
        perfect = true;
        position = 0;
        timeLeft = MAX_TIME_MS;
        queue = pickStratagems(Math.min(5 + round, 12));
        state = "playing";
        messageEl.textContent = "";
        renderHud();
        renderStratagem();
        renderTimer();
        lastFrame = performance.now();
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(tick);
    }

    function finishRound(): void
    {
        cancelAnimationFrame(frameId);
        state = "between";
        const roundBonus = 50 + 25 * round;
        const timeBonus = Math.floor(timeLeft / 1000) * 10;
        const perfectBonus = perfect ? 100 : 0;
        score += roundBonus + timeBonus + perfectBonus;
        renderHud();
        queueEl.replaceChildren();
        nameEl.textContent = "Round complete";
        arrowsEl.replaceChildren();
        messageEl.textContent =
            `Round +${roundBonus}  Time +${timeBonus}` +
            (perfect ? `  Perfect +${perfectBonus}` : "");
        pauseId = window.setTimeout(startRound, ROUND_PAUSE_MS);
    }

    function endGame(): void
    {
        cancelAnimationFrame(frameId);
        window.clearTimeout(pauseId);
        state = "over";
        queueEl.replaceChildren();
        nameEl.textContent = "Game Over";
        arrowsEl.replaceChildren();
        messageEl.textContent = `Score: ${score}.`;
        startButton.textContent = "Play Again";
        startButton.hidden = false;
    }

    function startGame(): void
    {
        window.clearTimeout(pauseId);
        round = 0;
        score = 0;
        startButton.hidden = true;
        startButton.blur();
        state = "ready";
        queue = [];
        queueEl.replaceChildren();
        arrowsEl.replaceChildren();
        nameEl.textContent = "Get ready!";
        messageEl.textContent = "";
        timeLeft = MAX_TIME_MS;
        renderHud();
        renderTimer();
        pauseId = window.setTimeout(startRound, READY_MS);
    }

    function handleInput(direction: Direction): void
    {
        if (state !== "playing") return;
        const current = queue[0];

        if (direction === current.code[position])
        {
            position += 1;
            if (position === current.code.length)
            {
                score += current.code.length * POINTS_PER_ARROW;
                timeLeft = Math.min(MAX_TIME_MS, timeLeft + TIME_BONUS_MS);
                queue.shift();
                position = 0;
                renderHud();
                renderTimer();
                if (queue.length === 0)
                {
                    finishRound();
                    return;
                }
            }
        }
        else
        {
            position = 0;
            perfect = false;
            renderStratagem(true);
            return;
        }
        renderStratagem();
    }

    document.addEventListener("keydown", event => {
        if (event.ctrlKey || event.metaKey || event.altKey) return;

        if (event.key === "Enter" && (state === "idle" || state === "over"))
        {
            if (event.target instanceof HTMLButtonElement) return; // button click handles it
            event.preventDefault();
            startGame();
            return;
        }

        const direction = KEY_MAP[event.key] ?? KEY_MAP[event.key.toLowerCase()];
        if (!direction || state !== "playing") return;
        event.preventDefault();
        handleInput(direction);
    });

    startButton.addEventListener("click", startGame);

    root.querySelectorAll<HTMLButtonElement>("[data-direction]").forEach(button => {
        button.addEventListener("click", () =>
            handleInput(button.dataset.direction as Direction));
    });

    renderHud();
    renderTimer();
}
