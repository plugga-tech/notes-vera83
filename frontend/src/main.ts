import tinymce from "tinymce/tinymce";

tinymce.init({
  selector: "#textContent",
  plugins: "code",
  toolbar: "code",

  setup: function (editor) {
    editor.on("change", function () {
      editor.save();
    });
  },
});

document.getElementById("saveBtn")!.addEventListener("click", () => {
  let textContent = (document.getElementById("textContent") as HTMLInputElement)
    .value;
  let textResult = document.querySelector(".textResult");
  console.log("textContent:", textContent);
  console.log("textResult:", textResult);
  if (textResult) {
    textResult.innerHTML = textContent;
  }
});
