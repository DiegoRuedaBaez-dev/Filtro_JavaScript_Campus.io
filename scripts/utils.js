// json functions
async function load(url) {
    try {
        const response = await fetch(`http://localhost:3002/${url}`);
        if (!response.ok) {
            throw new Error(`Error to load ${url} state:`, response.status);
        }
        return await response.json();
    } catch (error) {
        console.error(`error to load the ${url}`, error.message);
    }
}

async function save(newUser, url) {
    try {
        const response = await fetch(`http://localhost:3002/${url}`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newUser),
        });
        if (!response.ok) {
            throw new Error(`Error to load ${url}. state:`, response.status);
        }
        const createdUser = await response.json();
        console.log("created ${url}:", createdUser);
    } catch (error) {
        console.error(`error to load the ${url}`, error.message);
    }
}

//html functions

async function createPersonForm(dataDic, name) {
    let formHTMl = `
    <form class="align-items-center">
    `;

    const keys = Object.keys(dataDic);
    for (const key of keys) {
        if (key === "class_schedule") {
            formHTMl += `
            <label for="${name}-day-input">Select day</label> 
            <select id="${name}-day-input" class="form-select" aria-label="Default select example">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
            </select> `
            // begin and end hour
            formHTMl += `
            <label for="${name}-hour-input">Select hour of start and end</label> 
            <select id="${name}-hour-input" class="form-select" aria-label="Default select example">
                <option value="06:00 07:00">06:00 07:00</option>
                <option value="07:00 08:00">07:00 08:00</option>
                <option value="08:00 09:00">08:00 09:00</option>
                <option value="09:00 10:00">09:00 10:00</option>
                <option value="10:00 11:00">10:00 11:00</option>
                <option value="11:00 12:00">11:00 12:00</option>
                <option value="12:00 13:00">12:00 13:00</option>
                <option value="13:00 14:00">13:00 14:00</option>
                <option value="14:00 15:00">14:00 15:00</option>
                <option value="15:00 16:00">15:00 16:00</option>
                <option value="16:00 17:00">16:00 17:00</option>
                <option value="17:00 18:00">17:00 18:00</option>
                <option value="18:00 19:00">18:00 19:00</option>
                <option value="19:00 20:00">19:00 20:00</option>
                <option value="20:00 21:00">20:00 21:00</option>
                <option value="21:00 22:00">21:00 22:00</option> 
            </select> `
            //classroom id
            formHTMl +=`
            <label for="${name}-classroom_id-input">Select classroom id</label> 
            <select id="${name}-classroom_id-input" class="form-select" aria-label="Default select example">
            `
            classrooms = await load("classrooms");
            for (const classroom of classrooms) {
                formHTMl += `<option value="${classroom["id"]}">${classroom["id"]}</option> `
            }
            formHTMl += `</select>`
        } else if (key !== "id") {
            formHTMl += `
            <div class="form-group">
                <label for="${name}-${key}-input">${key.replaceAll("_", " ")}</label> 
                <textarea class="form-control" id="${name}-${key}-input" rows="1"></textarea>
            </div>`;
        }
    }
    formHTMl += `
    <button type="button" class="btn btn-primary mt-2" onClick="add${name}()">Add ${name}</button>
    </form>
    `;
    return formHTMl;
}



function createCard(dataDic) {
    let cardHTML = `
    <div class="col">
        <div class="card">
            <div class="card-body">
    `;
    if (dataDic["id"] !== undefined) {
        cardHTML += `<h5 class="card-title">ID: ${dataDic["id"]}</h5>`;
    } else {
        cardHTML += `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
</svg>`;
    }
    cardHTML += `<ul class="list-group mt-2">`;

    for (const key in dataDic) {
        if (key === "class_schedule") {
            cardHTML += `<li class="list-group-item"><span>${key.replaceAll("_", " ")}:</span><ul class="list-group">`;

            for (const schedule of dataDic[key]) {
                cardHTML += `<li class="mt-4">${createCard(schedule)}</li>`;
            }

            cardHTML += `</ul></li>`;
        } else {
            cardHTML += `<li class="list-group-item">${key.replaceAll("_", " ")}: ${dataDic[key]}</li>`;
        }
    }

    cardHTML += `</ul></div></div></div>`;
    return cardHTML;
}

function hiddeSecondaryMenus() {
    const teacherMenu = document.getElementById("teacher-menu");
    const studentMenu = document.getElementById("student-menu");
    const subjectMenu = document.getElementById("subject-menu");
    const tuitionMenu = document.getElementById("tuition-menu");

    teacherMenu.style.display = "none";
    studentMenu.style.display = "none";
    subjectMenu.style.display = "none";
    tuitionMenu.style.display = "none";
}

function initialState() {
    hiddeSecondaryMenus();
    const container = document.getElementById("main-container");
    const divs = container.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++) {
        divs[i].innerHTML = "";
    }
}

document.addEventListener('click', function(event) {
    var dropdowns = document.getElementsByClassName('dropdown');
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('active')) {
        if (!openDropdown.contains(event.target)) {
          openDropdown.classList.remove('active');
        }
      }
    }
  });