const today = new Date();
const currentDay = today.getDate();
const grid = document.getElementById("grid");

const openedCards = JSON.parse(localStorage.getItem("openedCards") || "[]");

for (let day = 1; day <= 25; day++) {
    
    const card = document.createElement("div");
    card.className = "card";

    const isUnlocked = day <= currentDay;
    const wasOpenedBefore = openedCards.includes(day);

    // Si ya estaba abierta previamente → la dejamos flipped
    if (wasOpenedBefore) {
        card.classList.add("unlocked");
        card.classList.add("flipped");
    }

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back ${isUnlocked ? "" : "locked"}">${day}</div>
            <div class="card-front" style="background-image:url('img/${day}.png')"></div>
        </div>
    `;

    card.addEventListener("click", () => {
        if (!isUnlocked) {
            alert("Todavía no podés abrir esta carta 💫");
            return;
        }

        // Hacemos que gire o des-gire con click
        card.classList.toggle("flipped");

        // Guardar la apertura UNA sola vez
        if (!openedCards.includes(day)) {
            openedCards.push(day);
            localStorage.setItem("openedCards", JSON.stringify(openedCards));

            // Marcamos como desbloqueada visualmente
            card.classList.add("unlocked");
        }
    });

    grid.appendChild(card);
}
