const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth(); // 11 = diciembre
const grid = document.getElementById("grid");

const openedCards = JSON.parse(localStorage.getItem("openedCards") || "[]");

for (let day = 1; day <= 25; day++) {

    const card = document.createElement("div");
    card.className = "card";

    // 🔒 MODO REAL: solo el 1 de diciembre abierto por ahora
    const isUnlocked =
        (day === 1) ||                                   // Día 1 siempre abierto
        (currentMonth === 11 && day <= currentDay);      // Diciembre real

    const wasOpenedBefore = openedCards.includes(day);

    // Si ya estaba abierta previamente → queda flipped
    if (wasOpenedBefore) {
        card.classList.add("unlocked");
        card.classList.add("flipped");
    }

    // HTML con dorso con imagen + número, frente con imagen del día
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back ${isUnlocked ? "" : "locked"}">
                <img class="back-image" src="back.png" alt="back">
                <div class="day-number">${day}</div>
            </div>
            <div class="card-front" style="background-image:url('${day}.png')"></div>
        </div>
    `;

    // Manejo del click: flip / unflip
    card.addEventListener("click", () => {
        if (!isUnlocked) {
            alert("Todavía no podés abrir esta carta 💫");
            return;
        }

        // Flip / unflip
        card.classList.toggle("flipped");

        // Guardar apertura solo la primera vez
        if (!openedCards.includes(day)) {
            openedCards.push(day);
            localStorage.setItem("openedCards", JSON.stringify(openedCards));
            card.classList.add("unlocked");
        }
    });

    grid.appendChild(card);
}
