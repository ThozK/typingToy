const koArray = ["1", "q", "a", "z", "0", "-", "^", "\\", "p", "@", "[", ";", ":", "]", "/"];
const kusuriArray = ["2", "w", "s", "x", "9", "o", "l", "."];
const nakaArray = ["3", "e", "d", "c", "8", "i", "k", ","];
const hitosashiArray = ["4", "r", "f", "v", "5", "t", "g", "b", "6", "y", "h", "n", "7", "u", "j", "m"];

document.addEventListener('keydown', function (event) {
    if (event.code == "IntlRo") {  //adapt for 2 same key[\]
        document.getElementById("en2").classList.add('yellow');
        if (blindButtonClick) {
            document.getElementById("en2").classList.remove('blind');
        }
    } else {
        const textElement = document.getElementById(event.key);
        if (textElement) {
            if (blindButtonClick) {
                textElement.classList.remove('blind');
            }
            if (koArray.includes(event.key)) {
                textElement.classList.add('yellow');
            } else if (kusuriArray.includes(event.key)) {
                textElement.classList.add('blue');
            } else if (nakaArray.includes(event.key)) {
                textElement.classList.add('green');
            } else if (hitosashiArray.includes(event.key)) {
                textElement.classList.add('purple');
            }
        }
    }
});

document.addEventListener('keyup', function (event) {
    const textElement = document.getElementById(event.key);
    if (event.code === "IntlRo") {   //adapt for 2 same key[\]
        document.getElementById("en2").classList.remove('yellow');
        if (blindButtonClick) {
            document.getElementById("en2").classList.add('blind');
        }
    } else {
        if (textElement) {
            textElement.classList.remove('yellow');
            textElement.classList.remove('blue');
            textElement.classList.remove('green');
            textElement.classList.remove('purple');
            if (blindButtonClick) {
                textElement.classList.add('blind');
            }
        }
    }
});

let alpNumList
let timer;
let correctCount = 0;
let mistakeCount = "";
let currentRandomValue;

let buttonClicked = false;


function changeColOnMouse() {
    if (buttonClicked) {
        return;
    }
    for (let i = 0; i < alpNumList.length; i++) {
        const quesKey = document.getElementById(alpNumList[i]);
        quesKey.classList.add('quest');
    }
}
function changeColOutMouse() {
    if (buttonClicked) {
        return;
    }
    for (let i = 0; i < alpNumList.length; i++) {
        const quesKey = document.getElementById(alpNumList[i]);
        quesKey.classList.remove('quest');
    }
}

const levels = [
    { id: "level1", alpNumList: "rtyufghjvbnm", comment: "人差し指の練習" },
    { id: "level2", alpNumList: "eidkc,", comment: "中指の練習" },
    { id: "level3", alpNumList: "woslx.", comment: "薬指の練習" },
    { id: "level4", alpNumList: "qpaz", comment: "小指の練習" },
    { id: "level5", alpNumList: "abcdefghijklmnopqrstuvwxyz,.", comment: "アルファベットの練習" },
    { id: "level6", alpNumList: "abcdefghijklmnopqrstuvwxyz,.1234567890", comment: "アルファベットと数字の練習" }
];

levels.forEach(level => {
    const element = document.getElementById(level.id);
    const indicValue = document.getElementById("indicator");

    element.addEventListener("mouseover", (event) => {
        if (!buttonClicked) {
            alpNumList = level.alpNumList;
            element.classList.add("gameStarthover");
            changeColOnMouse();
            indicValue.textContent = level.comment;
            indicValue.classList.add("comment");
        }
    });

    element.addEventListener("mouseout", (event) => {
        if (!buttonClicked) {
            element.classList.remove("gameStarthover");
            changeColOutMouse();
            indicValue.textContent = "";
            indicValue.classList.remove("comment");

        }
    });

    element.addEventListener("click", (event) => {
        if (!buttonClicked) {
            element.classList.add('gameClicked');
            element.classList.remove("gameStarthover");
            indicValue.textContent = "";
            indicValue.classList.remove("comment");
            startGame();
        }
    });
});

const stopButton = document.getElementById('stopgame')
stopButton.addEventListener("click", (event) => {
    if (buttonClicked && startedGame) {
        stopGame();
        const levelbu = document.getElementsByClassName('gameStart')
        for (let i = 0; i < levelbu.length; i++) {
            levelbu[i].classList.remove('gameClicked');
        }
    }
}
)

let randomValue;
let randomValueNew;
function randomKey() {
    do {
        const randomIndex = Math.floor(Math.random() * alpNumList.length);
        randomValueNew = alpNumList[randomIndex];
    }
    while (randomValue === randomValueNew);


    randomValue = randomValueNew;
    if (!blindButtonClick) {
        const quesKey = document.getElementById(randomValue);
        quesKey.classList.add('quest');
    }
    const indicValue = document.getElementById("indicator");
    indicValue.textContent = randomValue.toUpperCase();

    document.removeEventListener('keydown', keydownHandler);

    currentRandomValue = randomValue;

    document.addEventListener('keydown', keydownHandler);
}

let unoTime = 0;

function keydownHandler(event) {
    if (currentRandomValue != null) {
        if (event && event.key === currentRandomValue) {
            unoTime++;
            if (unoTime == 1) {
                const quesKey = document.getElementById(currentRandomValue);
                quesKey.classList.remove('quest');
                correctCount++;
                if ((correctCount % 5) === 0 && correctCount !== 0) {
                    const corEl = document.getElementById("encaurageId");
                    switch (correctCount / 5) {
                        case 1:
                            corEl.innerHTML = 'Good !';
                            break;
                        case 2:
                            corEl.innerHTML = 'Great !';
                            break;
                        case 3:
                            corEl.innerHTML = 'Cool !';
                            break;
                        default:
                            corEl.innerHTML = 'Excellent!!';
                            break;
                    }
                    setTimeout(() => {
                        corEl.textContent = '';
                    }, 1000);
                }

                let timerID;  //上手くいかない

                if (correctCount > 2) {
                    const corCoEl = document.getElementById("corId");
                    corCoEl.textContent = correctCount + ' combo';

                    clearTimeout(timerID);
                    console.log("aaa")


                    timerID = setTimeout(() => {
                        corCoEl.textContent = '';
                    }, 1000);
                }

                const indiEl = document.getElementById("indicator");
                indiEl.classList.add("correct");
                setTimeout(() => {
                    const indiEl = document.getElementById("indicator");
                    indiEl.classList.remove("correct");
                    randomKey();
                    unoTime = 0;
                }, 200);

            }
        } else {
            if (correctCount >= 5) {
                const corEl = document.getElementById("encaurageId");
                corEl.textContent = "oh..";
                setTimeout(() => {
                    corEl.textContent = '';
                }
                    , 2000)
            }

            correctCount = 0;
            document.getElementById("indiCont").classList.add('misFont');
            const indiEl = document.getElementById("indicator");
            indiEl.classList.add("misAni");
            setTimeout(() => {
                const indiEl = document.getElementById("indicator");
                indiEl.classList.remove("misAni");
                document.getElementById("indiCont").classList.remove('misFont');
            }, 200);
        }
    }
}

let startedGame = false;

function startGame() {
    if (buttonClicked) {
        return;
    }
    for (let i = 0; i < alpNumList.length; i++) {
        const quesKey = document.getElementById(alpNumList[i]);
        quesKey.classList.remove('quest');
    }
    buttonClicked = true;
    changeColOutMouse();

    setTimeout(() => {
        const key3 = document.getElementById("3");
        key3.classList.add('countdownIlumi');
        const indicValue = document.getElementById("indicator");
        indicValue.textContent = '3';
    }, 200);
    setTimeout(() => {
        const key3 = document.getElementById("3");
        key3.classList.remove('countdownIlumi');
        const key2 = document.getElementById("2");
        key2.classList.add('countdownIlumi');
        const indicValue = document.getElementById("indicator");
        indicValue.textContent = '2';
    }, 700);
    setTimeout(() => {
        const key2 = document.getElementById("2");
        key2.classList.remove('countdownIlumi');
        const key1 = document.getElementById("1");
        key1.classList.add('countdownIlumi');
        const indicValue = document.getElementById("indicator");
        indicValue.textContent = '1';

    }, 1200);
    setTimeout(() => {
        const indicValue = document.getElementById("indicator");
        indicValue.textContent = 'GO!';
    }, 1700);
    setTimeout(() => {
        const key1 = document.getElementById("1");
        key1.classList.remove('countdownIlumi');
        correctCount = 0;
        mistakeCount = "";
        randomKey();
        startedGame = true;

    }, 2200);

}

function stopGame() {
    for (let i = 0; i < alpNumList.length; i++) {
        const quesKey = document.getElementById(alpNumList[i]);
        quesKey.classList.remove('quest');
    }
    currentRandomValue = null;
    buttonClicked = false;
    const indicValue = document.getElementById("indicator");
    indicValue.textContent = "";
    startedGame = false;

}

const blindButton = document.getElementById("blindButton");
let blindButtonClick = false;
blindButton.addEventListener("click", (event) => {
    const keyAll = document.getElementsByClassName("fantasy");
    for (let i = 0; i < keyAll.length; i++) {
        keyAll[i].classList.add('blind');
    }
    blindButtonClick = true;
})

const visibleButton = document.getElementById("visibleButton");
visibleButton.addEventListener("click", (event) => {
    const keyAll = document.getElementsByClassName("fantasy");
    for (let i = 0; i < keyAll.length; i++) {
        keyAll[i].classList.remove('blind');
    }
    blindButtonClick = false;
})

