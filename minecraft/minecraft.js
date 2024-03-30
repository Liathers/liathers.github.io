/**
 * Retrieves server information and updates the specified HTML elements.
 *
 * @param {string} serverIP - The IP address or hostname of the Minecraft server.
 * @param {string} elementInstance - A unique identifier for the HTML elements to update.
 * @param {boolean} javaEdition - Indicates whether the server is Java Edition (true) or Bedrock Edition (false).
 */
function getServerPingInfo(serverIP, elementInstance, javaEdition) {
  // Get references to HTML elements
  let elementDescription = document.getElementById(`server-text-${elementInstance}`);
  let elementHostName = document.getElementById(`host-name-${elementInstance}`);
  let elementImage = document.getElementById(`server-icon-${elementInstance}`);

  // Construct the API URL based on the edition
  let apiURL = "";
  if (javaEdition) {
    apiURL = "https://api.mcsrvstat.us/2/" + serverIP;
  } else {
    apiURL = "https://api.mcsrvstat.us/bedrock/2/" + serverIP;
  }

  // Fetch server data from the API
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.online) {
        // Update elements with server information
        if (javaEdition) {
          elementDescription.innerHTML = `
            ${data.motd.html.join("<br>")}<br><br>
            Version: ${data.version}<br>
            Players: ${data.players.online}/${data.players.max}<br>`;
          elementHostName.innerHTML = data.hostname;
          elementImage.src = data.icon;
        } else {
          elementDescription.innerHTML = `
            ${data.motd.html.join("<br>")}<br><br>
            Version: ${data.version}<br>
            Map: ${data.map}<br>
            Gamemode: ${data.gamemode}<br>
            Players: ${data.players.online}/${data.players.max}<br>`;
          elementHostName.innerHTML = data.hostname;
          elementImage.src = "../assets/bedrock-icon.png";
        }
      } else {
        // Display an error message if the server is offline
        elementDescription.innerHTML = "<p>The server is offline.</p>";
        elementDescription.style.color = "red";
      }
    })
    .catch((error) => {
      // Handle API request errors
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
            textResponse = "Potential Problems";
            element.style.color = "orange";
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
  // Call the getServerPingInfo function with the server IP, the element instance and whether it is Java or Bedrock Edition
  getServerPingInfo("mc.liath.org", "0", true);
  getServerPingInfo("bedrock.mc.liath.org:25577", "1", false);

  // Call the getDataFromMojangServices function
  getDataFromMojangServices();
};
