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

const levels = {
  1: {
    palette: 1,
    obstacleCount: 10,
    minObstacleSize: 2,
    maxObstacleSize: 10,
    obstacleSpeed: 1,
  },
  2: {
    palette: 1,
    obstacleCount: 15,
    minObstacleSize: 2,
    maxObstacleSize: 15,
    obstacleSpeed: 2,
  },
  3: {
    palette: 1,
    obstacleCount: 20,
    minObstacleSize: 2,
    maxObstacleSize: 20,
    obstacleSpeed: 3,
  },
  4: {
    palette: 1,
    obstacleCount: 25,
    minObstacleSize: 2,
    maxObstacleSize: 25,
    obstacleSpeed: 4,
  },
  5: {
    palette: 1,
    obstacleCount: 30,
    minObstacleSize: 2,
    maxObstacleSize: 30,
    obstacleSpeed: 5,
  },
};

function runGame() {
	console.log("Game Running!");

	loadLevel(levels[1], 1);
}

function loadLevel(level, levelNumber) {
	console.log(`Loading level ${levelNumber}`);

	const main = document.querySelector("main");
	main.setAttribute("data-palette", level["palette"])


	const levelScreen = document.getElementById("levelScreen");

	const gameboard = document.getElementById("gameboard");
	gameboard.innerHTML = '';


	setTimeout(() => {
		levelScreen.style.opacity = 1;
		levelScreen.querySelector("h2").innerText= `Level ${levelNumber}`;
		gameboard.style.filter = "blur(2px)";
		setTimeout(() => {
			levelScreen.style.opacity = 0;
			gameboard.style.filter = "blur(0px)";
		}, 1000);
	}, 100);

	
  
	// Generate Obstacles
	const obstacles = [];
	for (let i = 0; i < level["obstacleCount"]; i++) {
	  const obstacle = document.createElement("div");
	  obstacle.classList.add("obstacle");
	  const size = Math.random() * (level["maxObstacleSize"] - level["minObstacleSize"]) + level["minObstacleSize"];
	  obstacle.style.width = size + "rem";
	  obstacle.style.height = size + "rem";
	  obstacle.style.transform = `rotate(${Math.random() * (360 - 0) + 0}deg)`;
  
	  const maxX = gameboard.clientWidth - size;
	  const maxY = gameboard.clientHeight - size;
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
  
	const targetSize = 32;
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

	target.addEventListener("click", function () {
  const nextLevelNumber = levelNumber + 1;

  if (levels[nextLevelNumber]) {
    loadLevel(levels[nextLevelNumber], nextLevelNumber);
  } else {
    console.log("Done!");
    loadLevel(levels[1], 1);
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
  
  