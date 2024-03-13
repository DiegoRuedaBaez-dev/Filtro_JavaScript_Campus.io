function tuitionOptions() {
    hiddeSecondaryMenus();
    const tuitionMenu = document.getElementById("tuition-menu");
    tuitionMenu.style.display = "block";
}

async function showTuitions() {
    initialState();
    const tuitionsHTML = document.getElementById("tuitions");
    tuitionsHTML.innerHTML = "<div class='h2 text-center'>Matriculas</div>";
    const tuitions = await load("tuitions");
    let currentRow = null;
    for (const tuition of tuitions) {
        if (!currentRow || (tuition.id % 2 === 0)) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row");
            currentRow.classList.add("mb-4");
            tuitionsHTML.appendChild(currentRow);
        }
        currentRow.innerHTML += createCard(tuition);
    }
}

async function newTuitionForm() {
    initialState();
    const tuitionsHTML = document.getElementById("tuitions");
    tuitionsHTML.innerHTML = "<div class='h2 text-center'>Nueva Matricula</div>";
    const tuitions = await load("tuitions");
    tuitionsHTML.innerHTML += await createPersonForm(tuitions[0], "Tuitions");
}

async function addTuitions(){
    const tuitionList = await load("tuitions");
    const newTuition = {
        "id": tuitionList.length + 1,
        "student_id": document.getElementById("Tuitions-student_id-input").value,
        "subject_id": document.getElementById("Tuitions-subject_id-input").value,
        "period_id": document.getElementById("Tuitions-period_id-input").value,
        "price": document.getElementById("Tuitions-price-input").value
    }
    await save(newTuition,"tuitions");
    alert("Nueva matricula creada!");
    clearForm();

}

function clearForm(){
    document.getElementById("Tuitions-document_type-input").value = "";
    document.getElementById("Tuitions-subject_id-input").value = "";
    document.getElementById("Tuitions-period_id-input").value = "";
    document.getElementById("Tuitions-price-input").value = "";
}

