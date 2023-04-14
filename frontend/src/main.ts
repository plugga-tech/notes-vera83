import { list } from "./pages/list";
import { login } from "./pages/login";

//list();

function main() {
  const user = localStorage.getItem("user");
  if (!user) {
    login();
  } else {
    list();
  }
}

main();
