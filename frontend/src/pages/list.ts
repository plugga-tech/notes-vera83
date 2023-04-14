import { edit } from "./edit";
import { preview } from "./preview";

const app = document.getElementById("app") as HTMLDivElement;

type Note = {
  id: number;
  title: string;
  author: {
    name: string;
  };
};

// render list page and functionality
export async function list() {
  const header = document.createElement("h1");
  const subhHeader = document.createElement("h3");

  header.innerText = "Välkommen till Notes4You";
  subhHeader.innerText = "Skapade dokument:";

  app.append(header, subhHeader);

  const result = await fetch("http://localhost:3000/api/notes");
  const notes = (await result.json()) as Note[];
  const ul = document.createElement("ul");
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="listItems">
          <span>${note.title}</span>
          <span>${note.author.name}</span>
          </div>
          <div class="listButtons">
            <button data-id="${note.id}" class="showBtn">visa</button>
            <button data-id="${note.id}" class="editBtn">redigera</button>
          
      </div>
          `;
    ul.appendChild(li);
  });
  app.append(ul);

  // newNote Button to create a new note
  const newNoteBtn = document.createElement("button");
  newNoteBtn.innerText = "Skapa nytt";
  newNoteBtn.classList.add("newNoteBtn");

  app.appendChild(newNoteBtn);

  newNoteBtn.addEventListener("click", () => {
    edit();
  });

  //show button, show note in uneditable state
  document.querySelectorAll<HTMLButtonElement>(".showBtn").forEach((button) => {
    button.onclick = async (e) => {
      if (!(e.currentTarget instanceof HTMLButtonElement)) {
        return;
      }
      const id = e.currentTarget?.dataset.id;
      preview(id);
    };
  });

  //edit button, open tinymce to edit excisting note
  document.querySelectorAll<HTMLButtonElement>(".editBtn").forEach((button) => {
    button.onclick = async (e) => {
      if (!(e.currentTarget instanceof HTMLButtonElement)) {
        return;
      }
      const id = e.currentTarget?.dataset.id;
      edit(id);
    };
  });

  //log out button
  const logoutBtn = document.createElement("button");
  logoutBtn.innerText = "Logga ut";
  logoutBtn.classList.add("logoutBtn");
  app.appendChild(logoutBtn);

  logoutBtn.addEventListener("click", async () => {
    localStorage.removeItem("user");
    location.reload();
  });
}
