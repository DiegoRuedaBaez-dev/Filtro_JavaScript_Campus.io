function studentOptions() {
    hideSecondaryMenus();
    const studentMenu = document.getElementById("student-menu");
    studentMenu.style.display = "block";
}

async function showStudents() {
    initialState();
    const studentsHTML = document.getElementById("students");
    studentsHTML.innerHTML = "<div class='h2 text-center'>Estudiantes</div>";
    const students = await load("students");
    let currentRow = null;
    for (const student of students) {
        if (!currentRow || (student.id % 2 === 0)) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row");
            currentRow.classList.add("mb-4");
            studentsHTML.appendChild(currentRow);
        }
        currentRow.innerHTML += createCard(student);
    }
}

async function newStudentForm() {
    initialState();
    const studentsHTML = document.getElementById("students");
    studentsHTML.innerHTML = `<div class='h2 text-center'>Nuevo Estudiantes</div>`;
    const students = await load("students");
    studentsHTML.innerHTML += await createPersonForm(students[0], "Students");
}

async function addStudents() {
    const studentList = await load("students");

    const documentInputs = {
        "document_type": document.getElementById("Students-document_type-input"),
        "document_number": document.getElementById("Students-document_number-input"),
        "first_name": document.getElementById("Students-first_name-input"),
        "last_name": document.getElementById("Students-last_name-input"),
        "residence_city": document.getElementById("Students-residence_city-input"),
        "direction": document.getElementById("Students-direction-input"),
        "phone": document.getElementById("Students-phone-input"),
        "birthdate": document.getElementById("Students-birthdate-input"),
        "gender": document.getElementById("Students-gender-input"),
        "program_id": document.getElementById("Students-program_id-input")
    };

    const newStudent = {
        "id": studentList.length + 1,
        ...Object.fromEntries(Object.entries(documentInputs).map(([key, input]) => [key, input.value])),
    };

    await save(newStudent, "students");

    Object.values(documentInputs).forEach(input => input.value = "");

    alert("Estudiante creado exitosamente");
}

function hideSecondaryMenus() {
    const secondaryMenus = document.querySelectorAll(".secondary-menu");
    secondaryMenus.forEach((menu) => {
        menu.style.display = "none";
    });
}