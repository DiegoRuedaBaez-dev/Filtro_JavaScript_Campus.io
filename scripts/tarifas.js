async function showFees() {
    initialState(); // every innerHTML become empty
    const feesHTML = document.getElementById("fees");
    feesHTML.innerHTML = ""; // assure that is empty
    feesHTML.innerHTML += "<div class='h2 text-center'>Fees</div>";
    const fees = await load("fees");
    for (const [index, fee] of fees.entries()) {
        if (index % 2 === 0) { // the rows that we create only have 2 spaces
            const div = document.createElement("div");
            div.classList.add("row");
            div.classList.add("mb-4");
            feesHTML.appendChild(div);
        }
        let lastRowHTML = feesHTML.querySelectorAll(".row");
        lastRowHTML = lastRowHTML[lastRowHTML.length - 1];
        const card = createCard(fee);
        lastRowHTML.insertAdjacentHTML('beforeend', card);
    }
}