window.onload = function() {
    const gameBoard = document.getElementById('game-board');
    const gameMessage = document.getElementById('game-message');
    const boardSize = 10;
    let playerPosition = { x: 1, y: 1 };
    let currentLevelIndex = 0;

    const initialLevels = [
        [
            '##########',
            '#@      .#',
            '#   #   .#',
            '#   #  ###',
            '#  $     #',
            '#  ###   #',
            '#      $ #',
            '#   ######',
            '#        #',
            '##########',
        ],
        [
            '##########',
            '#@   #   #',
            '#   ##$  #',
            '#   . $  #',
            '#   #   .#',
            '##### ####',
            '#        #',
            '#  $     #',
            '#    .   #',
            '##########',
        ],
        [
            '##########',
            '#@   #   #',
            '# $##    #',
            '#  .  $$ #',
            '#  ###  .#',
            '#  .#  ###',
            '# $   .  #',
            '######## #',
            '#        #',
            '##########',
        ],
        [
            '##########',
            '#@  .#   #',
            '# $$ .$$ #',
            '#  # ##  #',
            '#    .   #',
            '# ###  ###',
            '#   $   .#',
            '######  ##',
            '#        #',
            '##########',
        ],
        [
            '##########',
            '#@  .#   #',
            '# $$ .$$ #',
            '#  # ##  #',
            '#    .   #',
            '# ###  ###',
            '#   $   .#',
            '######  ##',
            '#   $$   #',
            '##########',
        ],
    ];

    let levels = JSON.parse(JSON.stringify(initialLevels));

    function initGame() {
        gameBoard.innerHTML = '';
        gameMessage.innerHTML = '';
        const level = levels[currentLevelIndex];
        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (level[y][x] === '#') {
                    cell.classList.add('wall');
                } else if (level[y][x] === '$') {
                    cell.classList.add('box');
                } else if (level[y][x] === '.') {
                    cell.classList.add('target');
                } else if (level[y][x] === '*') {
                    cell.classList.add('box-on-target');
                } else if (level[y][x] === '@') {
                    playerPosition = { x: x, y: y };
                }
                cell.id = `cell-${x}-${y}`;
                gameBoard.appendChild(cell);
            }
        }
        drawPlayer();
    }

    function drawPlayer() {
        const playerElement = document.createElement('div');
        playerElement.classList.add('player');
        playerElement.style.gridColumnStart = playerPosition.x + 1;
        playerElement.style.gridRowStart = playerPosition.y + 1;
        playerElement.style.transition = 'transform 0.2s';
        gameBoard.appendChild(playerElement);
    }

    function movePlayer(dx, dy) {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;
        if (newX < 0 || newX >= boardSize || newY < 0 || newY >= boardSize) return;

        const level = levels[currentLevelIndex];
        const targetCell = level[newY][newX];
        if (targetCell === '#') return;

        if (targetCell === '$' || targetCell === '*') {
            const boxNewX = newX + dx;
            const boxNewY = newY + dy;
            if (boxNewX < 0 || boxNewX >= boardSize || boxNewY < 0 || boxNewY >= boardSize) return;
            const boxTargetCell = level[boxNewY][boxNewX];
            if (boxTargetCell === '#' || boxTargetCell === '$' || boxTargetCell === '*') return;

            if (boxTargetCell === '.') {
                levels[currentLevelIndex][boxNewY] = replaceAt(levels[currentLevelIndex][boxNewY], boxNewX, '*');
            } else {
                levels[currentLevelIndex][boxNewY] = replaceAt(levels[currentLevelIndex][boxNewY], boxNewX, '$');
            }

            levels[currentLevelIndex][newY] = replaceAt(levels[currentLevelIndex][newY], newX, targetCell === '*' ? '.' : ' ');
        }

        const currentPlayerCell = levels[currentLevelIndex][playerPosition.y][playerPosition.x];
        if (currentPlayerCell === '@') {
            levels[currentLevelIndex][playerPosition.y] = replaceAt(levels[currentLevelIndex][playerPosition.y], playerPosition.x, ' ');
        }

        playerPosition = { x: newX, y: newY };
        initGame();
        checkWin();
    }

    function replaceAt(str, index, char) {
        return str.substring(0, index) + char + str.substring(index + 1);
    }

    function handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
                movePlayer(0, -1);
                break;
            case 'ArrowDown':
                movePlayer(0, 1);
                break;
            case 'ArrowLeft':
                movePlayer(-1, 0);
                break;
            case 'ArrowRight':
                movePlayer(1, 0);
                break;
        }
    }

    function resetGame() {
        levels = JSON.parse(JSON.stringify(initialLevels));
        playerPosition = { x: 1, y: 1 };
        initGame();
    }

    function nextLevel() {
        currentLevelIndex = (currentLevelIndex + 1) % levels.length;
        playerPosition = { x: 1, y: 1 };
        initGame();
    }

    function checkWin() {
        const level = levels[currentLevelIndex];
        let win = true;
        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
                if (level[y][x] === '.' || level[y][x] === '$') {
                    win = false;
                }
            }
        }
        if (win) {
            gameMessage.innerHTML = 'You Win! Proceed to the next level!';
        }
    }

    document.addEventListener('keydown', handleKeyDown);
    initGame();

    document.querySelector('.game-button[onclick="resetGame()"]').addEventListener('click', resetGame);
    document.querySelector('.game-button[onclick="nextLevel()"]').addEventListener('click', nextLevel);
};
