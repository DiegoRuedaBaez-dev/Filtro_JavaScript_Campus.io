async function showClassrooms() {
    initialState();
    const classroomsHTML = document.getElementById("classrooms");
    classroomsHTML.innerHTML = "<div class='h2 text-center'>Salones</div>";
    const classrooms = await load("classrooms");
    let currentRow = null;
    for (const classroom of classrooms) {
        if (!currentRow || (classroom.id % 2 === 0)) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row");
            currentRow.classList.add("mb-4");
            classroomsHTML.appendChild(currentRow);
        }
        currentRow.innerHTML += createCard(classroom);
    }
}