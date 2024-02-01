// This function will fetch the data from the API and update the element
// It takes two parameters: the server IP and the element instance
function checkServerOnline(serverIP, elementInstance) {
  // The element to be updated
  let elementDescription = document.getElementById(`server-text-${elementInstance}`);
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
          elementDescription.innerHTML += `${playerList}`;
        }
      } else {
        // If offline, display a message
        elementDescription.innerHTML = "<p>The server is offline.</p>";
        elementDescription.style.color = "#FF0000";
      }
    })
    .catch((error) => {
      // If there is an error, display it
      elementDescription.innerHTML = "<p>An error occurred: " + error + "</p>";
      elementDescription.style.color = "red";
    });
}

// This function will run once the page is loaded
window.onload = function () {
  // Call the checkServerOnline function with the server IP and the element instance
  checkServerOnline("mc.liath.org", "0");
};