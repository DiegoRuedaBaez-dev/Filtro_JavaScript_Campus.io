async function showPrograms() {
    initialState();
    const programsHTML = document.getElementById("programs");
    programsHTML.innerHTML = "<div class='h2 text-center'>Programas</div>";
    const programs = await load("programs");
    let currentRow = null;
    for (const program of programs) {
        if (!currentRow || (program.id % 2 === 0)) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row");
            currentRow.classList.add("mb-4");
            programsHTML.appendChild(currentRow);
        }
        currentRow.innerHTML += createCard(program);
    }
}