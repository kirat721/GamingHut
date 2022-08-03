// trademark
console.log("Created by Gurkirat Singh");

// Audios 
backgroundMusic = new Audio("https://docs.google.com/uc?id=1idtkNuzKgdhlspEWifYft596y3Y112Z1");
gameoverAudio = new Audio("https://docs.google.com/uc?id=1Hk8KDEVxcsdBVtk5VSbPUUtHlC59UCK7");

// global variables
turn = "X";
gameOver = false;

// functions
const changeTurn = () => turn === "X" ? "0" : "X";
const checkWin = () => {
    boxTexts = document.querySelectorAll(".boxText");
    wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    wins.forEach(win => {
        if ((boxTexts[win[0]].innerText === boxTexts[win[1]].innerText) && (boxTexts[win[1]].innerText === boxTexts[win[2]].innerText) && (boxTexts[win[0]].innerText !== '')) {
            document.querySelector(".info").innerText = boxTexts[win[0]].innerText + " Wons";
            gameOver = true;
            backgroundMusic.pause();
            gameoverAudio.play();
            document.querySelector(".imgbox").getElementsByTagName('img')[0].style.width = "35vh"
        }

    });

}


// Game Logic
boxes = document.querySelectorAll(".box");
Array.from(boxes).forEach(box => {
    box.addEventListener('click', () => {
        backgroundMusic.play();
        boxText = box.querySelector(".boxText");
        if (boxText.innerText === '') {
            boxText.innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!gameOver)
                document.querySelector(".info").innerText = "Turn of " + turn;
        }
    })
});

// reset
reset.addEventListener('click', () => {
    boxTexts = document.querySelectorAll(".boxText");
    Array.from(boxTexts).forEach(boxtext => {
        boxtext.innerText = "";
    });
    turn = "X";
    gameOver = false;
    document.querySelector(".info").innerText = "Turn of " + turn;
    document.querySelector(".imgbox").getElementsByTagName('img')[0].style.width = "0px";
    backgroundMusic.play();
})


