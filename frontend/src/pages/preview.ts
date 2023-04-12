const app = document.getElementById("app") as HTMLDivElement;

export async function preview(id?: string) {
  const note = await fetch(`http://localhost:3000/api/notes/${id}`).then(
    (response) => response.json()
  );
  const content = note.content;
  const paragraph = document.createElement("p");
  const h1 = document.createElement("h1");
  const listBtn = document.createElement("button");
  paragraph.innerHTML = content;
  h1.innerHTML = note.title;
  listBtn.innerText = "Tillbaka";
  listBtn.addEventListener("click", () => {
    location.reload();
  });
  app.innerHTML = "";
  app.prepend(h1);
  app.appendChild(paragraph);
  app.appendChild(listBtn);
}
