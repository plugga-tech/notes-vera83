import tinymce from "tinymce";
import { list } from "./list";
import { login } from "./login";

const app = document.getElementById("app") as HTMLDivElement;

//open editor
export async function edit(id?: string) {
  app.innerHTML = `
  <h3>Namn på dokumentet:</h3>
    <div class="editArea">
     <input class ="titleInput" id="title" type="text">
        <textarea name="" id="textContent" cols="" rows=""></textarea>
        <div class="editButtons">
             <button class="saveBtn" id="saveBtn">Spara</button>
             <button class="abortBtn" id="abortBtn">Avbryt</button>
        </div>
    </div>`;

  tinymce.init({
    selector: "#textContent",
    plugins: "code",
    toolbar:
      "undo redo | bold | italic | fontsize | forecolor backcolor | alignleft aligncenter alignright alignjustify",

    setup: function (editor) {
      editor.on("init", async function () {
        if (id) {
          await loadNote(id);
        }
      });
    },
  });

  //save note
  const saveBtn = document.getElementById("saveBtn");
  saveBtn?.addEventListener("click", async () => {
    if (id) {
      await updateNote(id);
    } else {
      await createNote();
    }
    location.reload();
  });

  //Avbrytknappen tar dig tillbaka till listvyn utan att spara eller skapa
  const abortBtn = document.getElementById("abortBtn");
  abortBtn?.addEventListener("click", () => {
    location.reload();
  });
}

//funktion för att uppdatera befintlig note
function updateNote(id: string) {
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const title = titleEl.value;
  const content = tinymce.activeEditor?.getContent();
  const noteId = id;

  return fetch("http://localhost:3000/api/notes", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
      noteId,
    }),
  });
}

//funktion för att skapa en ny note
function createNote() {
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const title = titleEl.value;
  const content = tinymce.activeEditor?.getContent();
  const authorId = getUserId(); //skall ersättas med inloggades id

  return fetch("http://localhost:3000/api/notes", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      authorId,
    }),
  });
}

async function loadNote(id: string) {
  const note = await fetch(`http://localhost:3000/api/notes/${id}`).then(
    (response) => response.json()
  );

  const titleEl = document.getElementById("title") as HTMLInputElement;
  titleEl.value = note.title;

  tinymce.activeEditor?.setContent(note.content);
}

function getUserId() {
  const userString = localStorage.getItem("user");
  if (!userString) {
    login();
  } else {
    const user = JSON.parse(userString);
    return user.id;
  }
}
