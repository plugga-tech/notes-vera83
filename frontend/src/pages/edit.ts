import tinymce from "tinymce";

const app = document.getElementById("app") as HTMLDivElement;

export async function edit(id?: string) {
  console.log("bajs");

  app.innerHTML = `
  <h1>Titel</h1>
  <input id="title" type="text">
  <div class="editor">
  <textarea name="" id="textContent" cols="" rows=""></textarea>
    <button class="saveBtn" id="saveBtn">Spara</button>
    <button class="editBtn" id="editBtn">Avbryt</button>
 </div>`;

  tinymce.init({
    selector: "#textContent",
    plugins: "code",
    toolbar: "code",

    setup: function (editor) {
      editor.on("init", async function () {
        if (id) {
          await loadNote(id);
        }
      });
    },
  });

  const saveBtn = document.getElementById("saveBtn");

  saveBtn?.addEventListener("click", () => {
    if (id) {
      updateNote(id);
    } else {
      createNote();
    }
  });
}

async function updateNote(id: string) {
  const title = document.getElementById("title")!.value;
  const content = tinymce.activeEditor?.getContent();
  const noteId = id;

  fetch("http://localhost:3000/api/notes", {
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

async function createNote() {
  const title = document.getElementById("title")!.value;
  const content = tinymce.activeEditor?.getContent();
  const authorId = 3; //skall ersättas med inloggades id

  fetch("http://localhost:3000/api/notes", {
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

  document.getElementById("title").value = note.title;

  tinymce.activeEditor?.setContent(note.content);
}
