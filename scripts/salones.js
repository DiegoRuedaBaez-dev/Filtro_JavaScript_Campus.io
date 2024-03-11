initialState(); // every innerHTML become empty
const classroomsHTML = document.getElementById("classrooms");
classroomsHTML.innerHTML = ""; // assure that is empty
classroomsHTML.innerHTML += "<div class='h2 text-center'>classrooms</div>";
const classrooms = await load("classrooms");

let lastRowHTML = null;
for (const [index, classroom] of classrooms.entries()) {
    if (index % 2 === 0) { // the rows that we create only have 1 spaces
        const div = document.createElement("div");
        div.classList.add("row");
        div.classList.add("mb-4");
        classroomsHTML.appendChild(div);
        lastRowHTML = div;
    }
    if (lastRowHTML) {
        const card = createCard(classroom);
        lastRowHTML.insertAdjacentHTML('beforeend', card);
    }
}