// "use strict";
const form = document.getElementById("myForm");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the default form submission behavior

  const data = { text: document.getElementById("myInput").value }; // get the value of the input field

  fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
});
