"use strict"
let score = 0;
let difficult = 5;
let rightAnswer = 0;
let wrongAnswer = 0;
let curLevel = 1;
let chousen = false;
let firstSelected;
let isLeftSelected = false;
let isWin = false;
let timerWork = false;
let username = '';
let wordsArr = [[
    { num: 0, word: 'Кот' },
    { num: 1, word: 'Бык' },
    { num: 2, word: 'Баран' },
    { num: 3, word: 'Тигр' },
    { num: 4, word: 'Конь' },
    { num: 5, word: 'Пес' },
    { num: 6, word: 'Селезень' },
    { num: 7, word: 'Парень' },
    { num: 8, word: 'Муж' },
    { num: 9, word: 'Дед Мороз' },
], [
    { num: 0, word: 'Кошка' },
    { num: 1, word: 'Корова' },
    { num: 2, word: 'Овца' },
    { num: 3, word: 'Тигрица' },
    { num: 4, word: 'Лошадь' },
    { num: 5, word: 'Собака' },
    { num: 6, word: 'Утка' },
    { num: 7, word: 'Девушка' },
    { num: 8, word: 'Жена' },
    { num: 9, word: 'Снегурочка' },
]];
let wordsArr2 = [[
    { num: 0, word: 'Кошка' },
    { num: 1, word: 'Собака' },
    { num: 2, word: 'Свинья' },
    { num: 3, word: 'Корова' },
    { num: 4, word: 'Утка' },
    { num: 5, word: 'Коза' },
    { num: 6, word: 'Овца' },
    { num: 7, word: 'Кролик' },
    { num: 8, word: 'Индюк' },
    { num: 9, word: 'Гусь' },
], [
    { num: 0, word: 'Котенок' },
    { num: 1, word: 'Щенок' },
    { num: 2, word: 'Поросенок' },
    { num: 3, word: 'Теленок' },
    { num: 4, word: 'Утенок' },
    { num: 5, word: 'Козленок' },
    { num: 6, word: 'Ягненок' },
    { num: 7, word: 'Крольчонок' },
    { num: 8, word: 'Индюшонок' },
    { num: 9, word: 'Гусенок' },
]];
let wordsArr3 = [[
    { num: 0, word: 'Капитан Америка' },
    { num: 1, word: 'Тор' },
    { num: 2, word: 'Железный человек' },
    { num: 3, word: 'Доктор стрендж' },
    { num: 4, word: 'Халк' },
    { num: 5, word: 'Капитан Марвел' },
    { num: 6, word: 'Человек-паук' },
    { num: 7, word: 'Дэдпул' },
    { num: 8, word: 'Человек-муравей' },
    { num: 9, word: 'Соколиный глаз' },
], [
    { num: 0, word: 'Щит' },
    { num: 1, word: 'Молот' },
    { num: 2, word: 'Костюм' },
    { num: 3, word: 'Магия' },
    { num: 4, word: 'Сила' },
    { num: 5, word: 'Космос' },
    { num: 6, word: 'Паутина' },
    { num: 7, word: 'Регенерация' },
    { num: 8, word: 'Уменьшение' },
    { num: 9, word: 'Стрелы' },
]];
openModal();

addModalContent(`
<p class="modal-text">В этой игре вы должны соединять подходящие слова. Нажмите сначала на первое слово, потом на второе</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "5">легкий</option>
                    <option value = "7">средний</option>
                    <option value = "9">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
            </div>
 `);
addCloseListener();

let timeCount = 0;
let timerElemnet = document.querySelector('.timer');

function timer(seconds, callback) {
    let time = seconds;
    let timerId = setTimeout(function tick() {
        if (time <= 0 || !timerWork) {
            timerElemnet.textContent = 'Осталось времени:' + time;
            callback();
        } else {
            timerElemnet.textContent = 'Осталось времени:' + time;
            time--;
            timerId = setTimeout(tick, 1000, seconds, time, callback);
        }

    }, 1000, seconds, time, callback);
}

let difficultSelect = document.querySelector('#difficult-select');

document.querySelector('#start-game').addEventListener('click', () => {
    StartGame();
});

function generateWordsBlock(blockCount, wordsArr) {
    console.log(blockCount);
    let leftBlock = document.querySelector('.left-words');
    leftBlock.innerHTML = '';
    let rightBlock = document.querySelector('.right-words');
    rightBlock.innerHTML = '';
    
    let leftArr = shuffle(wordsArr[0].slice(0, blockCount));
    let rightArr = shuffle(wordsArr[1].slice(0, blockCount));
    let i = 0;

    for (i = 0; i < blockCount; i++) {
        let block = document.createElement('p');
        block.classList.add('word-block');
        block.textContent = leftArr[i].word;
        addSelected(block);
        block.wordId = leftArr[i].num;

        block.left = true;

        leftBlock.append(block);
        if (difficult >= 7) {
            setWordToRandomPlace(block, leftBlock);
            if (difficult >= 9) {
                addAnim(block);
            }
        }

    }

    for (i = 0; i < blockCount; i++) {
        let block = document.createElement('p');
        block.classList.add('word-block');
        block.textContent = rightArr[i].word;
        addSelected(block);
        block.wordId = rightArr[i].num;
        block.left = false;

        rightBlock.append(block);
        if (difficult >= 7) {
            setWordToRandomPlace(block, rightBlock);
            if (difficult >= 9) {
                addAnim(block);
            }
        }
    }
}

function addSelected(block) {
    block.addEventListener('click', (e) => {
        if (chousen) {
            if (isLeftSelected != e.target.left) {
                if (firstSelected.wordId === e.target.wordId) {
                    firstSelected.classList.add('word-block-right');
                    e.target.classList.add('word-block-right');
                    firstSelected.classList.remove('word-block-selected');
                    firstSelected.classList.remove('word-block-wrong');
                    e.target.classList.remove('word-block-wrong');
                    rightAnswer++;
                    counter.textContent = `соединено ${rightAnswer}/${difficult}`;
                    if (rightAnswer == difficult) {
                        isWin = true;
                        setScore();
                        curLevel++;
                        endGame();
                    }
                } else {
                    firstSelected.classList.remove('word-block-selected');
                    firstSelected.classList.add('word-block-wrong');
                    e.target.classList.add('word-block-wrong');
                    wrongAnswer++;
                    if (wrongAnswer >= 3) {
                        endGame();
                    }
                }
                chousen = false;
            }
        } else {
            isLeftSelected = e.target.left;
            firstSelected = e.target;
            e.target.classList.add('word-block-selected');
            chousen = true;
        }
    })
}


function shuffle(array, size) {

    let currentIndex = array.length, randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function shuffleParralel(array, array2) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        [array2[currentIndex], array2[randomIndex]] = [
            array2[randomIndex], array2[currentIndex]];
    }
    return array;
}
function setScore() {
    switch (curLevel) {
        case 1:
            score = 10;
            break;
        case 2:
            score = 20;
            break;
        case 3:
            score = 30;
            break;
        case 4:
            score = 30;
            break;
    }
    switch (difficult) {
        case "5":
            score *= 0.7;
            break;
        case "7":
            score *= 1;
            break;
        case "9":
            score *= 1.2;
            break;
    }
    addScore(username, score);
}
function endGame() {
    timerWork = false;
    if (isWin) {

        if (curLevel <= 3) {

            addModalContent(`
        <p class="modal-text">Вы выиграли</p>
        <p class="modal-text">Счет: ${score} очков</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "5">легкий</option>
                    <option value = "7">средний</option>
                    <option value = "9">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">Продолжить</button>
            </div>
        `);
        } else {
            addModalContent(`
        <p class="modal-text">Вы выиграли</p>
        <p class="modal-text">Счет: ${score} очков</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "5">легкий</option>
                    <option value = "7">средний</option>
                    <option value = "9">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
                <button id="next-level" class="modal-close ui-modal-element">Следующий уровень</button>
            </div>
        `);
            document.querySelector('#next-level').addEventListener('click', () => {
                window.location.href = `../level2/level2.html?name=${username}`;
            });
        }

    } else {
        addModalContent(`
        <p class="modal-text">Вы проиграли, попробуйте снова</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "5">легкий</option>
                    <option value = "7">средний</option>
                    <option value = "9">сложный</option>
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
let counter = document.querySelector('.count');
function StartGame() {

    difficultSelect = document.querySelector('#difficult-select');
    difficult = difficultSelect.options[difficultSelect.selectedIndex].value;
    timerWork = true;
    switch (curLevel) {
        case 1:
            timer(20, () => { endGame(); });
            generateWordsBlock(difficult, wordsArr);
            break
        case 2:
            timer(30, () => { endGame(); });
            generateWordsBlock(difficult, wordsArr2);
            break
        case 3:
            timer(40, () => { endGame(); });
            generateWordsBlock(difficult, wordsArr3);
            break
        default:
            timer(40, () => { endGame(); });
            generateWordsBlock(difficult, wordsArr);
            break
    }
    rightAnswer = 0;
    wrongAnswer = 0;
    chousen = false;
    firstSelected;
    isLeftSelected = false;
    isWin = false;

    counter.textContent = `соединено 0/${difficult}`;
}
document.querySelector('#to-menu').addEventListener('click', () => {
    window.location.href = '../index.html';
})

function setWordToRandomPlace(block, place) {
    let area = place.getBoundingClientRect();
    let width = block.getBoundingClientRect().width;
    let height = block.getBoundingClientRect().height;
    console.log(area);
    console.log(block);
    console.log(width);
    console.log(height);
    console.log((area.x + area.width - width));
    block.style.left = `${Math.max((Math.random() * (area.width)) - area.width / 2, area.width / 2 * -1)}px`;
    block.style.top = `${Math.max((Math.random() * (area.height)) - area.height / 2, area.height / 2 * -1)}px`;
}

function addAnim(block) {
    var time = getRandomNumber(1, 4);
    block.style.animation = `wordsAnim ${time}s infinite alternate-reverse`;
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

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}