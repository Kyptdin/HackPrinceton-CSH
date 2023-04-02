const form = document.getElementById("myForm");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the default form submission behavior

  const name = { text: document.getElementById("myInput").value }; // get the value of the input field
  const description = { text: document.getElementById("myDescription").value};
  fetch("http://localhost:5500/submitClassName" , {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name),
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

fetch("http://localhost:5500/submitClassDescription" , {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(description),
}).then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
});
