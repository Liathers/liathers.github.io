// This function will fetch the data from the API and update the element
// It takes two parameters: the server IP and the element instance
function checkServerOnline(serverIP, elementInstance) {
  // The element to be updated
  let elementDescription = document.getElementById(
    `server-text-${elementInstance}`
  );
  let elementHostName = document.getElementById(`host-name-${elementInstance}`);
  let elementImage = document.getElementById(`server-icon-${elementInstance}`);

  // The API URL with the server IP as a parameter
  let apiURL = "https://api.mcsrvstat.us/2/" + serverIP;

  // Use the fetch API to make a GET request to the API
  fetch(apiURL)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      // Check if the server is online
      if (data.online) {
        // If online, display the server name, version, players, and motd
        elementDescription.innerHTML = `
          ${data.motd.html.join("<br>")}<br><br>
          Version: ${data.version}<br>
          Players: ${data.players.online}/${data.players.max}<br>`;
        elementHostName.innerHTML = data.hostname;
        elementImage.src = data.icon;

        // If the server has a list of online players, append it to the elementDescription
        if (data.players.list) {
          // Join the player names with commas and spaces
          let playerList = data.players.list.join(", ");

          // Add a new paragraph with the player list
          elementDescription.innerHTML += `<p>${playerList}</p>`;
        }
      } else {
        // If offline, display a message
        elementDescription.innerHTML = "<p>The server is offline.</p>";
        elementDescription.style.color = "red";
      }
    })
    .catch((error) => {
      // If there is an error, display it
      elementDescription.innerHTML = `<p>An error occurred: ${error}</p>`;
      elementDescription.style.color = "red";
    });
}

// This function uses the fetch API and the allorigins API to get data from the mojang services api
// and sets it to 4 different html elements with formatted text
function getDataFromMojangServices() {
  // The API URL with the mojang services URL as a parameter
  let apiURL =
    "https://api.allorigins.win/get?url=" +
    encodeURIComponent("https://mcping.me/api/services");

  // Fetch the data from the url using the proxy
  fetch(apiURL)
    .then((response) => response.json()) // Parse the response as json
    .then((data) => {
      // Get the contents from the data object
      let actualData = data.contents;

      // Parse the contents as json
      let services = JSON.parse(actualData);

      // Loop through the object keys
      for (let key in services) {
        // Get the service name and status from the key and value
        let serviceStatus = services[key];

        // Get the html element by id
        let element = document.getElementById(key);

        // Declare a variable for the text response
        let textResponse = "";

        // Use a switch statement to assign the text response based on the service status
        switch (serviceStatus) {
          case "Operational":
            textResponse = "Operational";
            element.style.color = "green";
            break;
          case "PossibleProblems":
            textResponse = "Possible Problems";
            element.style.color = "yellow";
            break;
          case "DefiniteProblems":
            textResponse = "Definite Problems";
            element.style.color = "red";
            break;
          default:
            textResponse = "Unable to Obtain";
            element.style.color = "gray";
        }

        // Set the text content of the element
        element.innerHTML = textResponse;
      }
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

// This function will run once the page is loaded
window.onload = function () {
  // Call the checkServerOnline function with the server IP and the element instance
  checkServerOnline("mc.liath.org", "0");

  // Call the getDataFromMojangServices function
  getDataFromMojangServices();
};
