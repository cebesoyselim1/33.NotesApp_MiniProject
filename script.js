const btnAdd = document.querySelector(".btn-add");
const btnEdits = document.querySelectorAll(".btn-edit");
const btnDelete = document.querySelector(".btn-delete");
const notesContainer = document.querySelector("#section-notes");

loadNotes();

btnAdd.addEventListener("click",(e) => {
    let note = `
        <div class="note">
            <div class="note-tools">
                <button class="btn-edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <textarea class="note-text"></textarea>
        </div>
    `;
    notesContainer.innerHTML += note;
})

notesContainer.addEventListener("click", (e) => {
    addNote(e);
    deleteNote(e);
})

function addNote(e){
    if(e.target.classList.contains("fa-edit") || e.target.classList.contains("btn-edit")){
        let noteText;
        if(e.target.classList.contains("fa-edit")){
            noteText = e.target.parentElement.parentElement.parentElement.querySelector(".note-text");
        }else{
            noteText = e.target.parentElement.parentElement.querySelector(".note-text");
        }

        if(noteText.classList.contains("disabled")){
            noteText.disabled = false;
            noteText.classList.remove("disabled");
            
        }else{
            noteText.disabled = true;
            noteText.classList.add("disabled");
        }
    }
}

function deleteNote(e){
    if(e.target.classList.contains("fa-trash") || e.target.classList.contains("btn-delete")){
        let note;

        if(e.target.classList.contains("fa-trash")){
            e.target.parentElement.parentElement.parentElement.remove();
            deleteNoteFromLS(e.target.parentElement.parentElement.parentElement.querySelector(".note-text").value);
        }else{
            e.target.parentElement.parentElement.remove();
            deleteNoteFromLS(e.target.parentElement.parentElement.querySelector(".note-text").value);
        }

    }
    
}

function deleteNoteFromLS(text){
    if(text){
        let notes = JSON.parse(localStorage.getItem("note"));
        let index = notes.indexOf(text);
        notes.splice(index,1);
        localStorage.setItem("note",JSON.stringify(notes));
    }
}

notesContainer.addEventListener("keyup", (e) => {
    let textArr = [];
    notesContainer.querySelectorAll(".note-text").forEach((text) => {
        if(text.value != ""){
            textArr.push(text.value);
        }
    })
    localStorage.setItem("note",JSON.stringify(textArr));
})

function loadNotes(){
    let notes;
    if(localStorage.getItem("note")){
        notes = JSON.parse(localStorage.getItem("note"));
    }
    if(notes){
        notes.forEach((note) => {
            notesContainer.innerHTML += `
            <div class="note">
                <div class="note-tools">
                    <button class="btn-edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <textarea class="note-text">${note}</textarea>
            </div>
            `;
        })
        
    }
}






