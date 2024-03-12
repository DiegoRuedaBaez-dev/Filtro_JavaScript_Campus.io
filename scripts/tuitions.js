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

async function addTuition(){
    const tuitionList = await load("tuition");
    const newTuition = {
        "id": tuitionList.length + 1,
        "student_id": document.getElementById("Tuition-student_id-input").value,
        "subject_id": document.getElementById("Tuition-subject_id-input").value,
        "period_id": document.getElementById("Tuition-period_id-input").value,
        "price": document.getElementById("Tuition-last_name-input").value
    }
    await save(newTuition,"tuition");
    clearForm();
    alert("Nueva matricula creada!");
}

function clearForm(){
    document.getElementById("Tuition-document_type-input").value = "";
    document.getElementById("Tuition-subject_id-input").value = "";
    document.getElementById("Tuition-period_id-input").value = "";
    document.getElementById("Tuition-last_name-input").value = "";
}

