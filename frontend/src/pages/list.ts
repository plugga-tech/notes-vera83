import { edit } from "./edit";
import { preview } from "./preview";

const app = document.getElementById("app") as HTMLDivElement;

type Note = {
  id: number;
  title: string;
  createdAt: string;
  author: {
    name: string;
  };
};

// render list
export async function list() {
  const header = document.createElement("h1");
  const subhHeader = document.createElement("h3");

  header.innerText = "Välkommen till Notes4You";
  subhHeader.innerText = "Sparade dokument:";

  app.append(header, subhHeader);

  //create note list
  const result = await fetch("http://localhost:3000/api/notes");
  const notes = (await result.json()) as Note[];
  const ul = document.createElement("ul");
  notes.forEach((note) => {
    const li = document.createElement("li");
    const createdAt = new Date(note.createdAt);
    li.innerHTML = `
        <div class="listItems">
          <span class="noteTitle">${note.title}</span>
          <span class="noteAuthor">Skapat av: ${note.author.name}</span>
          <span class="noteDate">${createdAt.toLocaleString()}</span>
        </div>
        <div class="listButtons">
          <button data-id="${note.id}" class="showBtn">visa</button>
          <button data-id="${note.id}" class="editBtn">redigera</button>
          <button data-id="${note.id}" class="deleteBtn">Radera</button>
        </div>
          `;
    ul.appendChild(li);
  });
  app.append(ul);

  //show note in uneditable state
  document.querySelectorAll<HTMLButtonElement>(".showBtn").forEach((button) => {
    button.onclick = async (e) => {
      if (!(e.currentTarget instanceof HTMLButtonElement)) {
        return;
      }
      const id = e.currentTarget?.dataset.id;
      preview(id);
    };
  });

  //open tinymce to edit excisting note
  document.querySelectorAll<HTMLButtonElement>(".editBtn").forEach((button) => {
    button.onclick = async (e) => {
      if (!(e.currentTarget instanceof HTMLButtonElement)) {
        return;
      }
      const id = e.currentTarget?.dataset.id;
      edit(id);
    };
  });

  //delete created note
  document
    .querySelectorAll<HTMLButtonElement>(".deleteBtn")
    .forEach((button) => {
      button.onclick = async (e) => {
        if (!(e.currentTarget instanceof HTMLButtonElement)) {
          return;
        }
        const id = e.currentTarget?.dataset.id;
        await fetch(`http://localhost:3000/api/notes/${id}`, {
          method: "DELETE",
        });

        location.reload();
      };
    });

  //create a new note
  const newNoteBtn = document.createElement("button");
  newNoteBtn.innerText = "Skapa nytt";
  newNoteBtn.classList.add("newNoteBtn");

  app.appendChild(newNoteBtn);

  newNoteBtn.addEventListener("click", () => {
    edit();
  });

  //log out
  const logoutBtn = document.createElement("button");
  logoutBtn.innerText = "Logga ut";
  logoutBtn.classList.add("logoutBtn");
  app.appendChild(logoutBtn);

  logoutBtn.addEventListener("click", async () => {
    localStorage.removeItem("user");
    location.reload();
  });
}
