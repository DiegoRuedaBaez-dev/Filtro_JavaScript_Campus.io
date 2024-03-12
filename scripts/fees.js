async function showFees() {
    initialState();
    const feesHTML = document.getElementById("fees");
    feesHTML.innerHTML = "<div class='h2 text-center'>Tarifas</div>";
    const fees = await load("fees");
    let currentRow = null;
    for (const fee of fees) {
        if (!currentRow || (fee.id % 2 === 0)) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row");
            currentRow.classList.add("mb-4");
            feesHTML.appendChild(currentRow);
        }
        currentRow.innerHTML += createCard(fee);
    }
}