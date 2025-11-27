const today = new Date();
const currentDay = today.getDate();
const grid = document.getElementById("grid");

const openedCards = JSON.parse(localStorage.getItem("openedCards") || "[]");

for (let day = 1; day <= 25; day++) {
    
    const card = document.createElement("div");
    card.className = "card";

    const isUnlocked = day <= currentDay;
    const wasOpenedBefore = openedCards.includes(day);

    if (wasOpenedBefore) card.classList.add("unlocked");

    card.innerHTML = `
        <div class="inner">
            <div class="back ${isUnlocked ? "" : "locked"}">${day}</div>
            <div class="front" style="background-image:url('img/${day}.png')"></div>
        </div>
    `;

    card.addEventListener("click", () => {
        if (!isUnlocked) {
            alert("Todavía no podés abrir esta carta 💫");
            return;
        }

        card.classList.add("unlocked");

        if (!openedCards.includes(day)) {
            openedCards.push(day);
            localStorage.setItem("openedCards", JSON.stringify(openedCards));
        }
    });

    grid.appendChild(card);
}
