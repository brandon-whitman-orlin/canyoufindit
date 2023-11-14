document.addEventListener('DOMContentLoaded', function() {
	// Theme selection
	var storedColorMode = localStorage.getItem("colorMode");
	presetTheme(storedColorMode);
	var colorMode = document.getElementById("colorMode");
	colorMode.addEventListener("click", changeTheme);

	// Sound mode
	var storedSoundMode = localStorage.getItem("soundMode");
	presetSound(storedSoundMode);
	var soundMode = document.getElementById("soundMode");
	soundMode.addEventListener("click", changeSound);

	const mainMenu = document.getElementById("mainMenu");
	const playGame = document.getElementById("playGame");
	const instructions = document.getElementById("instructions");
	const instructionScreen = document.getElementById("instructionScreen");
	const backButton = document.getElementById("backButton");
	const playAgain = document.getElementById("playAgain");
	const endScreen = document.getElementById("endScreen");
	playGame.addEventListener("click", function(){
		mainMenu.style.opacity = 0;
		gameboard.style.filter = "blur(0px)";
		setTimeout(() => {
			mainMenu.style.display = "none";
		}, 100);
		// Run the game
		runGame();
	});
	instructions.addEventListener("click", function(){
		mainMenu.style.opacity = 0;
		gameboard.style.filter = "blur(0px)";
		setTimeout(() => {
			mainMenu.style.display = "none";
		}, 100);
		// Run the game
		openInstructions();
	});
	backButton.addEventListener("click", function(){
		instructionScreen.style.opacity = 0;
		gameboard.style.filter = "blur(0px)";
		setTimeout(() => {
			instructionScreen.style.display = "none";
		}, 100);
		// Run the game
		openMainMenu();
	});
	playAgain.addEventListener("click", function(){
		endScreen.style.opacity = 0;
		gameboard.style.filter = "blur(0px)";
		setTimeout(() => {
			endScreen.style.display = "none";
		}, 100);
		runGame();
	});

	// Display main menu
	openMainMenu();
});

function presetTheme(theme) {
	if (theme === "dark") {
		document.documentElement.setAttribute('data-theme', "dark");
	} else {
		document.documentElement.setAttribute('data-theme', "light");
	}
}

function changeTheme() {
	if (document.documentElement.getAttribute('data-theme') == "dark") {
		document.documentElement.setAttribute('data-theme', "light");
		localStorage.setItem("colorMode", "light");
	} else {
		document.documentElement.setAttribute('data-theme', "dark");
		localStorage.setItem("colorMode", "dark");
	}
}

function presetSound(sound) {
	const slider = document.getElementById("volume");
	if (sound === 0) {
		document.documentElement.setAttribute('data-sound', "off");
		sealSFX.volume = 0;
		bgMusic.volume = 0;
		slider.value = 0;
	} else {
		document.documentElement.setAttribute('data-sound', "on");
		sealSFX.volume = sound;
		bgMusic.volume = sound;
		slider.value = sound;
	}
}

function changeSound() {
	const slider = document.getElementById("volume");
	if (document.documentElement.getAttribute('data-sound') == "off") {
		document.documentElement.setAttribute('data-sound', "on");
		localStorage.setItem("soundMode", 1);
		sealSFX.volume = 1;
		bgMusic.volume = 1;
		slider.value = 1;
	} else {
		document.documentElement.setAttribute('data-sound', "off");
		localStorage.setItem("soundMode", 0);
		sealSFX.volume = 0;
		bgMusic.volume = 0;
		slider.value = 0;		
	}
}

function adjustVolume(val) {
	if (val == 0) {
		document.documentElement.setAttribute('data-sound', "off");
		localStorage.setItem("soundMode", 0);
		sealSFX.volume = 0;
		bgMusic.volume = 0;
	} else {
		document.documentElement.setAttribute('data-sound', "on");
		localStorage.setItem("soundMode", val);
		sealSFX.volume = val;
		bgMusic.volume = val;
	}
}

function openMainMenu() {
	const mainMenu = document.getElementById("mainMenu");
	mainMenu.style.display = "flex";
	gameboard.style.filter = "blur(2px)";
	setTimeout(() => {
		mainMenu.style.opacity = "1";
	}, 100);
}

function openInstructions() {
	const instructionScreen = document.getElementById("instructionScreen");
	instructionScreen.style.display = "flex";
	gameboard.style.filter = "blur(2px)";
	setTimeout(() => {
		instructionScreen.style.opacity = "1";
	}, 100);
}

function openEndScreen() {
	const endScreen = document.getElementById("endScreen");
	endScreen.style.display = "flex";
	endScreen.querySelector("p").innerText = `You found Kiko the seal ${Object.keys(levels).length} times in ${returnTime()}! Great Job!`;
	gameboard.style.filter = "blur(2px)";
	setTimeout(() => {
		endScreen.style.opacity = "1";
		timer();
	}, 100);
}

var bgMusic = new Audio('assets/Club Seamus.mp3');
var sealSFX = new Audio('assets/sealSound.mp3');

const levels = {
	1: {
	  palette: 1,
	  obstacleCount: 10,
	  minObstacleSize: 2,
	  maxObstacleSize: 4,
	  obstacleSpeed: 1,
	},
	2: {
	  palette: 1,
	  obstacleCount: 15,
	  minObstacleSize: 2,
	  maxObstacleSize: 5,
	  obstacleSpeed: 2,
	},
	3: {
	  palette: 1,
	  obstacleCount: 20,
	  minObstacleSize: 2,
	  maxObstacleSize: 5,
	  obstacleSpeed: 3,
	},
	4: {
	  palette: 1,
	  obstacleCount: 25,
	  minObstacleSize: 2,
	  maxObstacleSize: 5,
	  obstacleSpeed: 4,
	},
	5: {
	  palette: 1,
	  obstacleCount: 30,
	  minObstacleSize: 2,
	  maxObstacleSize: 6,
	  obstacleSpeed: 5,
	},
	6: {
		palette: 2,
		obstacleCount: 20,
		minObstacleSize: 2,
		maxObstacleSize: 4,
		obstacleSpeed: 10,
	},
	7: {
		palette: 2,
		obstacleCount: 30,
		minObstacleSize: 2,
		maxObstacleSize: 4,
		obstacleSpeed: 15,
	},
	8: {
		palette: 2,
		obstacleCount: 35,
		minObstacleSize: 2,
		maxObstacleSize: 4,
		obstacleSpeed: 20,
	},
	9: {
		palette: 2,
		obstacleCount: 40,
		minObstacleSize: 2,
		maxObstacleSize: 4,
		obstacleSpeed: 20,
	},
	10: {
		palette: 2,
		obstacleCount: 50,
		minObstacleSize: 2,
		maxObstacleSize: 4,
		obstacleSpeed: 20,
	},
	11: {
		palette: 3,
		obstacleCount: 20,
		minObstacleSize: 1,
		maxObstacleSize: 6,
		obstacleSpeed: 10,
	},
	12: {
		palette: 3,
		obstacleCount: 20,
		minObstacleSize: 1,
		maxObstacleSize: 7,
		obstacleSpeed: 15,
	},
	13: {
		palette: 3,
		obstacleCount: 20,
		minObstacleSize: 1,
		maxObstacleSize: 10,
		obstacleSpeed: 10,
	},
	14: {
		palette: 3,
		obstacleCount: 20,
		minObstacleSize: 1,
		maxObstacleSize: 15,
		obstacleSpeed: 15,
	},
	15: {
		palette: 3,
		obstacleCount: 20,
		minObstacleSize: 1,
		maxObstacleSize: 12,
		obstacleSpeed: 20,
	},
	16: {
		palette: 4,
		obstacleCount: 10,
		minObstacleSize: 1,
		maxObstacleSize: 5,
		obstacleSpeed: 10,
	},
	17: {
		palette: 4,
		obstacleCount: 20,
		minObstacleSize: 1,
		maxObstacleSize: 5,
		obstacleSpeed: 15,
	},
	18: {
		palette: 4,
		obstacleCount: 30,
		minObstacleSize: 1,
		maxObstacleSize: 5,
		obstacleSpeed: 20,
	},
	19: {
		palette: 4,
		obstacleCount: 40,
		minObstacleSize: 1,
		maxObstacleSize: 5,
		obstacleSpeed: 25,
	},
	20: {
		palette: 4,
		obstacleCount: 50,
		minObstacleSize: 1,
		maxObstacleSize: 5,
		obstacleSpeed: 30,
	},
	21: {
		palette: 5,
		obstacleCount: 10,
		minObstacleSize: 2,
		maxObstacleSize: 4,
		obstacleSpeed: 3,
	},
	22: {
		palette: 5,
		obstacleCount: 15,
		minObstacleSize: 2,
		maxObstacleSize: 5,
		obstacleSpeed: 3,
	},
	23: {
		palette: 5,
		obstacleCount: 20,
		minObstacleSize: 2,
		maxObstacleSize: 5,
		obstacleSpeed: 3,
	},
	24: {
		palette: 5,
		obstacleCount: 25,
		minObstacleSize: 2,
		maxObstacleSize: 5,
		obstacleSpeed: 3,
	},
	25: {
		palette: 5,
		obstacleCount: 30,
		minObstacleSize: 2,
		maxObstacleSize: 6,
		obstacleSpeed: 3,
	},
  };

function runGame() {

	seconds = 0;
	minutes = 0;
	hours = 0;

	document.getElementById('timer').innerText = "00:00:00";


	timer();

	console.log("Game Running!");
    
    bgMusic.addEventListener('ended', function() {
        bgMusic.currentTime = 0;
        bgMusic.play();
    });

    bgMusic.play();

	const nextLevelButton = document.getElementById("nextLevel");
	nextLevelButton.addEventListener("click", function(){
		levelScreen.style.opacity = 0;
		gameboard.style.filter = "blur(0px)";
		setTimeout(() => {
			levelScreen.style.display = "none";
			timer();
		}, 100);
	});

	loadLevel(levels[1], 1);
}

function loadLevel(level, levelNumber) {
	console.log(`Loading level ${levelNumber}`);

	if (levelNumber != 1) {
		levelMenu(levelNumber);
	}

	const main = document.querySelector("main");
	main.setAttribute("data-palette", level["palette"])

	const gameboard = document.getElementById("gameboard");
	gameboard.innerHTML = '';

	// Generate Obstacles
	const obstacles = [];
	for (let i = 0; i < level["obstacleCount"]; i++) {
	  const obstacle = document.createElement("div");
	  obstacle.classList.add("obstacle");
	  const size = Math.random() * (level["maxObstacleSize"] - level["minObstacleSize"]) + level["minObstacleSize"];
	  obstacle.style.width = size + "rem";
	  obstacle.style.height = size + "rem";
	  obstacle.style.transform = `rotate(${Math.random() * (360 - 0) + 0}deg)`;
  
	  const maxX = gameboard.clientWidth - (size * 16);
	  const maxY = gameboard.clientHeight - (size * 16);
	  const randomX = Math.random() * maxX;
	  const randomY = Math.random() * maxY;
  
	  obstacle.style.left = randomX + "px";
	  obstacle.style.top = randomY + "px";
  
	  obstacle.direction = Math.random() * 360;
	  obstacle.cumulativeRotation = 0;
	  gameboard.appendChild(obstacle);
	  obstacles.push(obstacle);
	}
  
	// Generate Target
	const target = document.createElement("div");
	target.classList.add("target");
  
	const targetSize = 48;
	const maxX = gameboard.clientWidth - targetSize;
	const maxY = gameboard.clientHeight - targetSize;
  
	const randomX = Math.random() * maxX;
	const randomY = Math.random() * maxY;
  
	target.style.left = randomX + "px";
	target.style.top = randomY + "px";
  
	target.direction = Math.random() * 360;
	target.cumulativeRotation = 0;
  
	const sealSVG = document.getElementById("sealSVG");
  
	const clonedSVG = sealSVG.cloneNode(true);
	clonedSVG.removeAttribute("id");
	target.appendChild(clonedSVG);

	target.addEventListener("click", function(){
		timer();
		const nextLevelNumber = levelNumber + 1;

		if (levels[nextLevelNumber]) {
			loadLevel(levels[nextLevelNumber], nextLevelNumber);
		} else {
			console.log("Done!");
			timer();
			openEndScreen();
		}
	});
  
	gameboard.appendChild(target);
  
	// Move Obstacles and Target
	setInterval(() => {
	  moveElementRandomly(target, maxX, maxY, false, level["obstacleSpeed"]);
	  obstacles.forEach(obstacle => moveElementRandomly(obstacle, maxX, maxY, true, level["obstacleSpeed"]));
	}, 100);
  }
  
  function moveElementRandomly(element, maxX, maxY, rotation, moveSpeed) {
	const changeDirectionProbability = 0.02;
	const directionChangeAmount = 30;
  
	if (Math.random() < changeDirectionProbability) {
	  element.direction += Math.random() * directionChangeAmount - directionChangeAmount / 2;
	  if (rotation) {
		element.cumulativeRotation += Math.random() * 360;
		element.style.transform = `rotate(${element.cumulativeRotation}deg)`;
	  }
	}
  
	const speed = moveSpeed;
  
	let newX = parseFloat(element.style.left) + speed * Math.cos(element.direction * (Math.PI / 180));
	let newY = parseFloat(element.style.top) + speed * Math.sin(element.direction * (Math.PI / 180));
  
	if (newX < 0 || newX > maxX) {
	  element.direction = (180 - element.direction) % 360;
	}
  
	if (newY < 0 || newY > maxY) {
	  element.direction = (-element.direction) % 360;
	}
  
	newX = Math.max(0, Math.min(maxX, newX));
	newY = Math.max(0, Math.min(maxY, newY));
  
	element.style.left = newX + "px";
	element.style.top = newY + "px";
  }
  
function levelMenu(levelNum) {
	const levelScreen = document.getElementById("levelScreen");

	levelScreen.querySelector(".levelMenu").querySelector("p").innerText = `LEVEL ${levelNum - 1} COMPLETE!`
	levelScreen.style.display = "flex";
	setTimeout(() => {
		levelScreen.style.opacity = 1;
		gameboard.style.filter = "blur(2px)";
		sealSFX.play();
	}, 100);
}

let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

function timer() {
    // Check if the timer is already running
    if (timerInterval) {
		console.log("Stopping Timer");
        // If it's running, stop the timer
        clearInterval(timerInterval);
        timerInterval = null;
    } else {
        // If it's not running, start the timer
		console.log("Starting Timer");

        timerInterval = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    // Increment seconds and update the display
    seconds++;
    if (seconds === 60) {
        // If 60 seconds have passed, reset seconds and increment minutes
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            // If 60 minutes have passed, reset minutes and increment hours
            minutes = 0;
            hours++;
        }
    }

    // Update the display with the formatted time
    updateDisplay();
}

function updateDisplay() {
    // Format the time as HH:MM:SS
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

    // Update the <p> element with the formatted time
    document.getElementById('timer').innerText = formattedTime;
}

function padZero(value) {
    // Add a leading zero if the value is less than 10
    return value < 10 ? `0${value}` : value;
}

function returnTime() {
    const hoursText = hours > 0 ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '';
    const minutesText = minutes > 0 ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : '';
    const secondsText = seconds > 0 ? `${seconds} ${seconds === 1 ? 'second' : 'seconds'}` : '';

    const timeArray = [hoursText, minutesText, secondsText].filter(Boolean);

    if (timeArray.length === 0) {
        return '0 seconds';
    } else {
        return timeArray.join(' and ');
    }
}