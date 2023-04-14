import { list } from "./list";

const app = document.getElementById("app") as HTMLDivElement;

export async function login() {
  const h1 = document.createElement("h1");
  h1.innerText = "Notes4You";
  h1.classList.add("logo");

  app.append(h1);

  const input = document.createElement("input");
  const loginBtn = document.createElement("button");
  loginBtn.classList.add("loginBtn");
  input.classList.add("loginInput");

  loginBtn.innerText = "Logga in";

  loginBtn.onclick = async () => {
    const response = await fetch("http://localhost:3000/api/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: input.value,
      }),
    });
    if (!response.ok) {
      alert("fel användrnamn");
    } else {
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      app.innerHTML = "";
      list();
    }
  };

  app.append(input, loginBtn);
}
