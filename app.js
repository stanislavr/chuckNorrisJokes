UIalertMsg = document.querySelector("#alertMsg");
document.querySelector(".get-jokes").addEventListener("click", getJokes);

function getJokes(e) {
  e.preventDefault();

  // get a number of random jokes
  const number = document.querySelector('input[type="number"]').value;
  // validate input
  if (number.length == 0) {
    showAlert("Please enter a number of jokes to be requested!", "red", 5000);
    return;
  }

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
        showAlert("Something went wrong during the request!", "red", 5000);
        return;
      }

      showAlert("Success!", "green", 3000);
      document.querySelector(".jokes").innerHTML = output;
    }
  };

  xhr.send();
}

// Show Alert Message
function showAlert(msg, color, timeout) {
  UIalertMsg.style.color = color;
  UIalertMsg.textContent = msg;

  // clear msg after timeout milliSec
  setTimeout(function() {
    UIalertMsg.textContent = "";
  }, timeout);
}
