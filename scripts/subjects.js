

function subjectOptions() {
    hiddeSecondaryMenus();
    const subjectMenu = document.getElementById("subject-menu");
    subjectMenu.style.display = "block";
}

async function showSubjects() {
    initialState();
    const subjectsHTML = document.getElementById("subjects");
    subjectsHTML.innerHTML = "<div class='h2 text-center'>Asignaturas</div>";
    const subjects = await load("subjects");
    let currentRow = null;
    for (const subject of subjects) {
        if (!currentRow || (subject.id % 2 === 0)) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row");
            currentRow.classList.add("mb-4");
            subjectsHTML.appendChild(currentRow);
        }
        currentRow.innerHTML += createCard(subject);
    }
}

async function newSubjectForm() {
    initialState();
    const subjectsHTML = document.getElementById("subjects");
    subjectsHTML.innerHTML = "<div class='h2 text-center'>Asignatura Nueva</div>";
    const subjects = await load("subjects");
    subjectsHTML.innerHTML += await createPersonForm(subjects[0], "Subject");
}

async function addSubject() {
    const subjectList = await load("subjects");

    const courseIdInput = document.getElementById("Subject-course_id-input");
    const codeInput = document.getElementById("Subject-code-input");
    const creditInput = document.getElementById("Subject-credits-input");
    const teacherIdInput = document.getElementById("Subject-teacher_id-input");
    const spaceAvailableInput = document.getElementById("Subject-space_available-input");
    const programIdInput = document.getElementById("Subject-program_id-input");
    const dayInput = document.getElementById("Subject-day-input");
    const hourInput = document.getElementById("Subject-hour-input");
    const classroomIdInput = document.getElementById("Subject-classroom_id-input");

    const newSubject = {
        "id": subjectList.length + 1,
        "course_id": courseIdInput.value,
        "code": codeInput.value,
        "credits": creditInput.value,
        "teacher_id": teacherIdInput.value,
        "space_available": spaceAvailableInput.value,
        "program_id": programIdInput.value,
        "class_schedule": [
            {
                "day": dayInput.value,
                "start_hour": hourInput.value.split(" ")[0],
                "end_hour": hourInput.value.split(" ")[1],
                "classroom_id": classroomIdInput.value
            }
        ]
    }

    await save(newSubject, "subjects");

    clearForm(courseIdInput, codeInput, creditInput, teacherIdInput, spaceAvailableInput, programIdInput, dayInput, hourInput, classroomIdInput);

    alert("Subject sucessfully created");
}

function clearForm(...inputs) {
    inputs.forEach(input => input.value = "");
}