// This function will fetch the data from the API and update the element
// It takes one parameter: the IP address of the server to check
function checkServerOnline(serverIP) {
    // Get the element to be updated by its ID
    let element = document.getElementById("server-online");
  
    // Construct the API URL with the server IP as a query parameter
    // Use All Origins proxy to bypass CORS issues
    let apiURL = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://api.mcsrvstat.us/simple/" + serverIP);
  
    // Use the fetch API to make a GET request to the API
    fetch(apiURL)
      // Parse the response as JSON
      .then((response) => response.json())
      // Handle the data received from the API
      .then((data) => {
        // Get the actual data from the contents property
        let actualData = data.contents;
        // If the data is "online", the server is online
        if (actualData === "Online") {
          // Set the element text color to green and show the server status
          element.style.color = "green";
          element.innerHTML += "The Java SMP Server is currently online!";
        }
        // If the data is "offline", the server is offline
        else if (actualData === "Offline") {
          // Set the element text color to red and show the server status
          element.style.color = "red";
          element.innerHTML += "The Java SMP Server is currently offline.";
        }
        // If the data is neither "online" nor "offline", there is an error
        else {
          alert(actualData)
          // Set the element text color to gray and show an error message
          element.style.color = "gray";
          element.innerHTML += "Error: Could not ping the Minecraft Server.";
        }
      })
      // Handle any errors that occur during the fetch
      .catch((error) => {
        // Log the error to the console
        console.error(error);
      });
  }
  
  // This function will run once the page is loaded
  window.onload = function () {
    // Call the checkServerOnline function with the desired server IP
    checkServerOnline("mc.liath.org");
  };
