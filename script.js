document.getElementById('main').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Crear nota...');
    // const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push({ content: content });
    console.log('notes:', notesObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    document.getElementById("content").value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <br />
        <form class="noteCard">
            <div class="textarea-container">
                <textarea  id="content${index}" name="content${index}">${element.content}</textarea>
                <button id="del${index}" class="btn-delete" onclick="deleteNode(${index})">Borrar</button>
                <button id="edit${index}" class="btn-edit" onclick="editNode(${index}, 'content${index}')">Editar</button>
            </div>
        </form>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `
        <br />
        <div>
            No hay notas disponibles.
        </div>
        `;
    }
}

function editNode(index, str) {
    console.log('editar', str, index);
    let node = document.getElementById(str).value;
    console.log('node:', node);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);
    notesObj.splice(index, 1, { content: node });
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

function deleteNode(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

showNotes();