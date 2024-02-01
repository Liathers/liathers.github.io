// Declare variables for counting easter egg clicks and panorama position
var easterEggClicks = 0;
var panoramaPosition = 0;

// Check the current month and set seasonal modes accordingly
var d = new Date();
var curr_month = d.getMonth() + 1;
// Halloween mode is active in October
if (curr_month == 10) {
	var halloweenMode = true;
}
// Festive mode is active in December
if (curr_month == 12) {
	var festiveMode = true;
}

// Get all elements with the class name "minecraft-button"
var elements = document.getElementsByClassName("minecraft-button");
// If there are any elements, loop through them and add event listeners
if (elements.length > 0) {
  for (var i = 0; i < elements.length; i++) {
    // Get the original link attribute of the element
    var link = elements[i].getAttribute("href");
    // Set the onclick attribute to play a click sound and redirect to the link after a delay
    elements[i].setAttribute("onclick", "clickSound(); setTimeout(function timeout() { window.location = '" + link + "'; }, 100);");
    // Set the onmouseover attribute to play a hover sound
    elements[i].setAttribute("onmouseover", "hoverSound()");
    // Remove the href attribute to prevent default behavior
    elements[i].removeAttribute("href");
  }
}

// Check the local storage for the panorama movement setting
if (localStorage.panoramaMovement == undefined) {
	// If it is undefined, set it to true by default
	localStorage.panoramaMovement = "true";
} else if (localStorage.panoramaMovement == "false") {
	// If it is false, stop the animation of the body element
	document.body.style.animation = "none";
}

// Define a function for the easter egg feature
function easterEgg() {
	// If the user has clicked twice, play the click sound and increment the counter
	if (easterEggClicks == 2) {
		document.getElementById("click").play();
		easterEggClicks++;
		// Set the menu music variable to the default music
		var menuMusic = "music";
		// If halloween mode is active, set the menu music to the halloween music
		if (halloweenMode == true) {
			var menuMusic = "musicHalloween";
		}
		// If festive mode is active, set the menu music to the festive music
		if (festiveMode == true) {
			var menuMusic = "musicFestive";
		}
		// Loop and play the menu music
		document.getElementById(menuMusic).loop = true;
		document.getElementById(menuMusic).play();
		// Change the color of the easter egg element to green
		document.getElementById("easter-egg").setAttribute("style","color: #00aa00");
	} else {
		// If the user has clicked less than three times, play the click sound and increment the counter
		if (easterEggClicks < 3) {
			document.getElementById("click").play();
		}
		easterEggClicks++;
	}
}

// Define a function for playing the click sound
function clickSound() {
  // Create a new audio object with the click sound source
  var clickSound = new Audio("/assets/click.ogg");
  // Play the sound
  clickSound.play();
}

// Define a function for playing the hover sound
function hoverSound() {
  // Create a new audio object with the hover sound source
  var hoverSound = new Audio("/assets/hover.ogg");
  // Play the sound
  hoverSound.play();
}

// Define a function for toggling the panorama movement
function triggerPanoramaMovement() {
	// If the local storage setting is false, resume the animation of the body element and set the setting to true
	if (localStorage.panoramaMovement == "false") {
		document.body.style.animation = "";
		localStorage.panoramaMovement = "true";
	} else {
		// If the local storage setting is true, stop the animation of the body element and set the setting to false
		document.body.style.animation = "none";
		localStorage.panoramaMovement = "false";
	}
}

// Get the base URL of the current window
var baseUrl = window.location.protocol + "//" + window.location.host;

// If halloween mode is active, apply the halloween theme
if (halloweenMode == true) {
	// Set the background image of the body element to the halloween panorama
	document.body.style.backgroundImage = 'url(' + baseUrl + '/assets/halloween/h-Panorama.png)';

	// Get all elements with the class name "panorama-button"
	const regularPanButtons = document.querySelectorAll('.panorama-button');
	// Set the background image of the first element to the halloween button
	regularPanButtons[0].style.backgroundImage = 'url(' + baseUrl + '/assets/halloween/h-btn-panorama.png)';
	// Loop through the elements and add event listeners
	regularPanButtons.forEach(button => {
	  // On mouse enter, change the background image to the halloween button hover
	  button.addEventListener('mouseenter', () => {
		button.style.backgroundImage = 'url(' + baseUrl + '/assets/halloween/h-btn-panorama-hover.png)';
	  });

	  // On mouse leave, change the background image to the halloween button
	  button.addEventListener('mouseleave', () => {
		button.style.backgroundImage = 'url(' + baseUrl + '/assets/halloween/h-btn-panorama.png)';
	  });
	});

	// Get all elements with the class name "minecraft-button"
	const minecraftbuttons = document.querySelectorAll('.minecraft-button');
	// Loop through the elements and add event listeners
	minecraftbuttons.forEach(button => {
	  // Set the background image of the element to the halloween minecraft button
	  button.style.backgroundImage = 'url(' + baseUrl + '/assets/halloween/h-btn-minecraft.png)';
	  // On mouse enter, change the background image to the halloween minecraft button hover
	  button.addEventListener('mouseenter', () => {
		button.style.backgroundImage = 'url(' + baseUrl + '/assets/halloween/h-btn-minecraft-hover.png)';
	  });

	  // On mouse leave, change the background image to the halloween minecraft button
	  button.addEventListener('mouseleave', () => {
		button.style.backgroundImage = 'url(' + baseUrl + '/assets/halloween/h-btn-minecraft.png)';
	  });
	});

	// Get all elements with the class name "guibox"
	const guibox = document.querySelectorAll('.guibox');
    // Loop through the elements and apply the halloween border image
    guibox.forEach(box => {
      box.style.borderImage = 'url(' + baseUrl + '/assets/halloween/h-guimenu.png)';
      box.style.borderImageSlice ='128 128 fill';
      box.style.borderImageWidth = '64px';
    });
}

// If festive mode is active, apply the festive theme
if (festiveMode == true) {
	// Set the background image of the body element to the festive panorama
	document.body.style.backgroundImage = 'url(' + baseUrl + '/assets/festive/f-Panorama.png)';

	// Get all elements with the class name "panorama-button"
	const regularPanButtons = document.querySelectorAll('.panorama-button');
	// Set the background image of the first element to the festive button
	regularPanButtons[0].style.backgroundImage = 'url(' + baseUrl + '/assets/festive/f-btn-panorama.png)';
	// Loop through the elements and add event listeners
	regularPanButtons.forEach(button => {
	  // On mouse enter, change the background image to the festive button hover
	  button.addEventListener('mouseenter', () => {
		button.style.backgroundImage = 'url(' + baseUrl + '/assets/festive/f-btn-panorama-hover.png)';
	  });

	  // On mouse leave, change the background image to the festive button
	  button.addEventListener('mouseleave', () => {
		button.style.backgroundImage = 'url(' + baseUrl + '/assets/festive/f-btn-panorama.png)';
	  });
	});
}
