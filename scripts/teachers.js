

function teacherOptions(){
    hiddeSecondaryMenus();
    const teacherMenu = document.getElementById("teacher-menu");
    teacherMenu.style.display = 'block';
}

async function showTeachers(){
    initialState();// every innerHTML become empty
    const teachersHTML = document.getElementById("teachers");
    teachersHTML.innerHTML = "";// assure that is empty
    teachersHTML.innerHTML += "<div class='h2 text-center'>Profesores</div>"
    const teachers = await load("teachers");
    for(teacher of teachers){
        if((teacher["id"]-1)%2 === 0){//the rows that we create only have 2 spaces
            const div = document.createElement("div");
            div.classList.add("row");
            div.classList.add("mb-4");
            teachersHTML.appendChild(div);
        }
        let lastRowHTML = teachersHTML.querySelectorAll(".row");
        lastRowHTML = lastRowHTML[lastRowHTML.length-1];
        const card = createCard(teacher);
        lastRowHTML.innerHTML += card;
    }
}

async function newTeacherForm(){
    initialState();
    const teachersHTML = document.getElementById("teachers");
    teachersHTML.innerHTML = `<div class='h2 text-center'>Nuevo Profesor</div>`;
    const teachers = await load("teachers");
    teachersHTML.innerHTML += await createPersonForm(teachers[0], "Teachers");
}

async function addTeachers(){
    const teacherList = await load("teachers");
    const newTeacher = {
        "id": teacherList.length + 1,
        "tipo_documento": document.getElementById("Teachers-tipo_documento-input").value,
        "numero_documento": document.getElementById("Teachers-numero_documento-input").value,
        "nombre": document.getElementById("Teachers-nombre-input").value,
        "apellido": document.getElementById("Teachers-apellido-input").value,
        "departamento_id": document.getElementById("Teachers-departamento_id-input").value
    }
    await save(newTeacher,"teachers");
    alert("Nuevo Profesor Creado Exitosamente!");
    clearForm();
}

function clearForm(){
    document.getElementById("Teachers-tipo_documento-input").value = "";
    document.getElementById("Teachers-document_number-input").value = "";
    document.getElementById("Teachers-nombre-input").value = "";
    document.getElementById("Teachers-last_name-input").value = "";
    document.getElementById("Teachers-departamento_id-input").value = "";
}