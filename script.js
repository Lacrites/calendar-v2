const today = new Date();
const currentDay = today.getDate(); 
const grid = document.getElementById("grid");

const openedCards = JSON.parse(localStorage.getItem("openedCards") || "[]");

for (let day = 1; day <= 25; day++) {
    
    const card = document.createElement("div");
    card.className = "card";

    const isUnlocked = day <= currentDay;
    const wasOpenedBefore = openedCards.includes(day);

    card.innerHTML = `
        <div class="inner ${isUnlocked ? "" : "locked"} ${wasOpenedBefore ? "unlocked" : ""}">
            <div class="back" style="background-image:url('img/back.png')"></div>
            <div class="front" style="background-image:url('img/${day}.png')"></div>
        </div>
    `;

    card.addEventListener("click", () => {
        if (!isUnlocked) {
            alert("Todavía no podés abrir esta carta 🎁");
            return;
        }

        const inner = card.querySelector(".inner");
        inner.classList.add("unlocked");

        if (!openedCards.includes(day)) {
            openedCards.push(day);
            localStorage.setItem("openedCards", JSON.stringify(openedCards));
        }
    });

    grid.appendChild(card);
}
