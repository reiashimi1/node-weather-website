const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

// const errorParagraph = document.getElementById("error");
// const forecastParagraph = document.getElementById("forecast");

const errorParagraph = document.querySelector("#error");
const forecastParagraph = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  errorParagraph.textContent = "Loading...";
  forecastParagraph.textContent = "";

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          errorParagraph.append(data.error);
        } else {
          errorParagraph.textContent = data.location;
          //   forecastParagraph.append(data.location);
          forecastParagraph.textContent = data.forecast;
        }
      });
    }
  );
  search.value = "";
});
