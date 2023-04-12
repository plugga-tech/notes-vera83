import tinymce from "tinymce";

const app = document.getElementById("app") as HTMLDivElement;

export function edit(id?: string) {
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
  });

  const saveBtn = document.getElementById("saveBtn");

  saveBtn?.addEventListener("click", () => {
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
  });
}
