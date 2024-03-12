async function showPeriods() {
    initialState();
    const periodsHTML = document.getElementById("periods");
    periodsHTML.innerHTML = "<div class='h2 text-center'>Peridos Academicos</div>";
    const periods = await load("periods");
    let currentRow = null;
    for (const period of periods) {
        if (!currentRow) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row");
            currentRow.classList.add("mb-4");
            periodsHTML.appendChild(currentRow);
        }
        currentRow.innerHTML += createCard(period);
    }
}