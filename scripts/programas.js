async function showPrograms() {
    initialState(); // every innerHTML become empty
    const programsHTML = document.getElementById("programs");
    programsHTML.innerHTML = ""; // assure that is empty
    programsHTML.innerHTML += "<div class='h2 text-center'>Programs</div>";
    const programs = await load("programs");
    let lastRowHTML = null;
    for (const [index, program] of programs.entries()) {
        if (index % 2 === 0) { // the rows that we create only have 2 spaces
            const div = document.createElement("div");
            div.classList.add("row");
            div.classList.add("mb-4");
            programsHTML.appendChild(div);
            lastRowHTML = div;
        }
        if (lastRowHTML) {
            const card = createCard(program);
            lastRowHTML.insertAdjacentHTML('beforeend', card);
        }
    }
}