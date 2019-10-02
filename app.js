document.querySelector(".get-jokes").addEventListener("click", getJokes);

function getJokes(e) {
  e.preventDefault();

  // get a number of random jokes
  const number = document.querySelector('input[type="number"]').value;

  // making request
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = ``;
      // parse json response
      if (response.type == "success") {
        response.value.forEach(joke => {
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += "<li>Something went wrong during the request</li>";
      }

      document.querySelector(".jokes").innerHTML = output;
    }
  };

  xhr.send();
}
