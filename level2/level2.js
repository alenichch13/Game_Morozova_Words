"use strict"
document.querySelector('#to-menu').addEventListener('click', () => {
    window.location.href = '../index.html';
})
let words;

let words1 = [
    'машина',
    'нора',
    'овал',
    'рама',
    'рана',
    'шива',
    'шина',
    'нова',
    'пора',
    'вина',
    'вино',
    'кора',
    'пони',
    'кома',
]

let words2 = [
    'заря',
    'буря',
    'лиса',
    'липа',
    'лицо',
    'коза',
    'ваза',
    'роза',
    'коса',
    'сани',
    'кора',
    'лира',
    'зараза',
]
let words3 = [
    'капель',
    'пельмень',
    'комар',
    'темень',
    'мука',
    'музей',
    'марка',
    'кара',
    'кора',
    'капель',
    'камень',
]
let wordsPart;
let wordsPart1 = [
    'ма',
    'ши',
    'на',
    'но',
    'по',
    'ва',
    'ра',
    'ак',
    'ол',
    'ра',
    'ко',
    'ви',
    'на',
    'ни',
    'ри',
]
let wordsPart2 = [
    'за',
    'ря',
    'бу',
    'ря',
    'ли',
    'са',
    'цо',
    'ли',
    'ко',
    'за',
    'за',
    'ва',
    'ра',
    'са',
    'ко',
    'ни',
    'са',
]
let wordsPart3 = [
    'пель',
    'те',
    'мень',
    'ка',
    'ко',
    'мар',
    'ка',
    'му',
    'зей',
    'ра',
]
let wordsSpawn = document.querySelector('.word-spawn');
let wordPlaceContainer = document.querySelector('.word-place-container');
let counter = document.querySelector('.count');
let timerElemnet = document.querySelector('.timer');
let difficultSelect = document.querySelector('#difficult-select');
let rightWords = 0;
let timerWork = false;
let difficult = 0;
let isWin = false;
let username = '';
let score = 0;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function timer(seconds, callback) {
    let time = seconds;
    let timerId = setTimeout(function tick() {
        if (time <= 0 || !timerWork) {
            timerElemnet.textContent = 'Оставшееся время:' + time;
            callback();
        } else {
            timerElemnet.textContent = 'Оставшееся время:' + time;
            time--;
            timerId = setTimeout(tick, 1000, seconds, time, callback);
        }

    }, 1000, seconds, time, callback);
}

openModal();
addModalContent(`
<p class="modal-text">Собирайте слова из слогов. Для прохождения требуется собрать минимум 2 слова</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "35">легкий</option>
                    <option value = "25">средний</option>
                    <option value = "20">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
            </div>
 `);
addCloseListener();

document.querySelector('#start-game').addEventListener('click', () => {
    StartGame();
});


function setWords() {
    for (let i = 0; i < 10; i++) {
        let word = document.createElement('div');
        word.className = 'word';
        word.innerHTML = wordsPart[i];
        addDraggable(word);
        wordsSpawn.append(word)
    }
}

let currentDraggElement = null;
let isDragging = false;

function addDraggable(element) {
    element.draggable = true;
    element.addEventListener('dragstart', (event) => {
        currentDraggElement = event.target;
        isDragging = true;
    })
    element.addEventListener('dragend', (event) => {
    })
}

function setTargetBlock(dragTarget) {

    dragTarget.addEventListener('dragover', (e) => {
        e.preventDefault();
    })

    dragTarget.addEventListener('drop', (event) => {
        currentDraggElement.remove();
        dragTarget.append(currentDraggElement);
        if (words.indexOf(event.target.textContent) != -1) {

            for (let i = 0; i < event.target.childNodes.length; i++) {
                event.target.childNodes[i].draggable = false;
                event.target.childNodes[i].classList.add('word-right');
            }
            rightWords++;
            counter.textContent = `Составлено слов: ${rightWords}`;
        }
    })
}

function addWordTarget(wordPlaceContainer) {
    let wordTarget = document.createElement('div');
    wordTarget.classList.add('word-block');
    wordTarget.classList.add('word-tartget');
    setTargetBlock(wordTarget);
    wordPlaceContainer.append(wordTarget);
}

function StartGame() {
    difficultSelect = document.querySelector('#difficult-select');
    difficult = difficultSelect.options[difficultSelect.selectedIndex].value;
    console.log(difficult);
    switch (difficult) {
        case "35":
            words = words1;
            wordsPart = wordsPart1;
            break;
        case "25":
            words = words2;
            wordsPart = wordsPart2;
            break;
        case "20":
            words = words3;
            wordsPart = wordsPart3;
            break;
    }
    wordsSpawn.innerHTML = '';
    console.log(wordsPart);
    shuffle(wordsPart);
    setWords();
    wordPlaceContainer.innerHTML = '';
    words.forEach(item => {
        addWordTarget(wordPlaceContainer);
    });
    timerWork = true;
    isWin = false;

    timer(difficult, () => { endGame() });
    rightWords = 0;

}
function endGame() {
    timerWork = false;
    if (rightWords >= 2) {
        isWin = true;
    }
    if (isWin) {
        switch (difficult) {
            case "35":
                score = 70;
                break;
            case "25":
                score = 100;
                break;
            case "20":
                score = 120;
                break;
        }
        addScore(username, score);

        addModalContent(`
        <p class="modal-text">Вы выиграли</p>
        <p class="modal-text">Счет: ${score} очков</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "35">легкий</option>
                    <option value = "25">средний</option>
                    <option value = "20">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
                <button id="next-level" class="modal-close ui-modal-element">Следующий уровень</button>
            </div>
        `);
        document.querySelector('#next-level').addEventListener('click', () => {
            window.location.href = `../level3/level3.html?name=${username}`;
        });

    } else {
        addModalContent(`
        <p class="modal-text">Вы проиграли, попробуйте снова</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "35">легкий</option>
                    <option value = "25">средний</option>
                    <option value = "20">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
            </div>
        `);

    }
    openModal();
    document.querySelector('#start-game').addEventListener('click', () => {
        StartGame();
    });
    addCloseListener();
}

getUsername();
function getUsername() {
    let myUrl = window.location.search
    myUrl = myUrl.substring(1);
    let arr = myUrl.split("&");
    let userArr = arr[0].split('=');
    if (userArr[0] = 'name') {
        username = userArr[1];
    }
}