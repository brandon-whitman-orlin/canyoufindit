document.addEventListener('DOMContentLoaded', function() {
	// Theme selection
	var storedColorMode = localStorage.getItem("colorMode");
	presetTheme(storedColorMode);
	var colorMode = document.getElementById("colorMode");
	colorMode.addEventListener("click", changeTheme);

	// Run the game
	runGame()
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

function runGame() {
	console.log("Game Running!");

	const levels = {
		1: {
			palette: 1,
			obstacleCount: 10,
			minObstacleSize: 2,
			maxObstacleSize: 10
		},
		2: {
			palette: 1,
			obstacleCount: 20,
			minObstacleSize: 2,
			maxObstacleSize: 15
		},
	}

	loadLevel(levels[1], 1);
}

function loadLevel(level, levelNumber) {
	console.log(`Loading level ${levelNumber}`);
	
	const gameboard = document.getElementById("gameboard");
	
	// Function to check if two elements overlap
	function doElementsOverlap(element1, element2) {
	  const rect1 = element1.getBoundingClientRect();
	  const rect2 = element2.getBoundingClientRect();
  
	  return !(
		rect1.right < rect2.left ||
		rect1.left > rect2.right ||
		rect1.bottom < rect2.top ||
		rect1.top > rect2.bottom
	  );
	}
  
	// Generate Obstacles
	const obstacles = [];
	for (let i = 0; i < level["obstacleCount"]; i++) {
	  const obstacle = document.createElement("div");
	  obstacle.classList.add("obstacle");
	  const size = Math.random() * (level["maxObstacleSize"] - level["minObstacleSize"]) + level["minObstacleSize"];
	  obstacle.style.width = size + "rem";
	  obstacle.style.height = size + "rem";
	  obstacle.style.transform = `rotate(${Math.random() * (360 - 0) + 0}deg)`;
	
	  const maxX = window.innerWidth - size;
	  const maxY = window.innerHeight - size;
	  const randomX = Math.random() * maxX;
	  const randomY = Math.random() * maxY;
	
	  obstacle.style.position = "absolute";
	  obstacle.style.left = randomX + "px";
	  obstacle.style.top = randomY + "px";
	
	  gameboard.appendChild(obstacle);
	  obstacles.push(obstacle);
	}
	
	// Position Target
	const targetItem = document.createElement("div");
	targetItem.classList.add("target");
  
	const targetSize = 32;
	let randomX, randomY;
	do {
	  randomX = Math.random() * (window.innerWidth - targetSize);
	  randomY = Math.random() * (window.innerHeight - targetSize);
	} while (obstacles.some(obstacle => doElementsOverlap(targetItem, obstacle)));
	
	targetItem.style.position = "absolute";
	targetItem.style.width = targetSize + "px";
	targetItem.style.height = targetSize + "px";
	targetItem.style.left = randomX + "px";
	targetItem.style.top = randomY + "px";
	
	gameboard.appendChild(targetItem);
  }
  