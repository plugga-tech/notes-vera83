import { edit } from "./edit";
import { preview } from "./preview";

const app = document.getElementById("app") as HTMLDivElement;

export async function list() {
  const result = await fetch("http://localhost:3000/api/notes");
  const notes = await result.json();
  console.log(notes);
  const ul = document.createElement("ul");
  notes.forEach((note: { id: any; title: string }) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <span>${note.title}</span>
            <button data-id="${note.id}" class="showBtn">visa</button>
            <button data-id="${note.id}" class="editBtn">redigera</button>
          `;
    ul.appendChild(li);
  });
  app.append(ul);

  //FETCH AND SHOW TITLE AND CONTENT BY CLICKING SHOWBTN

  document.querySelectorAll<HTMLButtonElement>(".showBtn").forEach((button) => {
    button.onclick = async (e) => {
      if (!(e.currentTarget instanceof HTMLButtonElement)) {
        return;
      }
      const id = e.currentTarget?.dataset.id;
      preview(id);
    };
  });

  document.querySelectorAll<HTMLButtonElement>(".editBtn").forEach((button) => {
    button.onclick = async (e) => {
      if (!(e.currentTarget instanceof HTMLButtonElement)) {
        return;
      }
      const id = e.currentTarget?.dataset.id;
      edit(id);
    };
  });
}
