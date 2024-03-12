async function showDepartments() {
    initialState();
    const departmentsHTML = document.getElementById("departments");
    departmentsHTML.innerHTML = "<div class='h2 text-center'>Escuelas</div>";
    const departments = await load("departments");
    let currentRow = null;
    for (const department of departments) {
        if (!currentRow || (department.id % 2 === 0)) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row");
            currentRow.classList.add("mb-4");
            departmentsHTML.appendChild(currentRow);
        }
        currentRow.innerHTML += createCard(department);
    }
}