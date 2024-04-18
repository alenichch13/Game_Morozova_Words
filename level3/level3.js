"use strict"
document.querySelector('#to-menu').addEventListener('click', () => {
    window.location.href = '../index.html';
})
let texts;
let texts1 = [
    'Кот нежился на солнышке прекрасным апрельским утром. Вдруг он увидел <?> огромную муху, разные мысли <?> одолевали его. Может муху <?> поймать или же продолжить лежать? День был <?> таким спокойным, что <?> суетиться не хотелось. Кот громко зевнул, перевернулся на другой бок и уснул.',
    'Артём любил походы. Вот и в эти выходные <?> он собрался в лес. Собрал рюкзак, все снаряжение и <?> спустился вниз по лестнице, чтобы поскорее сесть в машину и <?> поехать в поход. Артём открывает дверь на улицу и видит, что <?> идет сильный дождь, сверкают молнии и гремит гром. "Штож, видимо, сегодня я остаюсь дома" - подумал <?> парень и поднялся обратно.'
]
let texts2 = [
    'В лесу на высокой сосне <?> свила белка гнездо. Всё круглое, закрытое, а <?> с одной стороны лазейка оставлена, чтобы <?> внутрь можно было забраться. Белка — зверёк <?> ловкий. Весь день с сучка на сучок, с дерева <?> на дерево прыгает — где ягоду сорвёт, где <?> еловую шишку. А наступит осень — тут белка на зиму запасы <?> примется готовить. То грибы повесит сушиться, то орехи в дупло запрячет. Холодно, голодно зимой, вот и пригодятся белке припасы.',
    'Всю зиму дядюшка Барсук проспал в лесу, в <?> своей норе. Но вот ярко засветило солнце, растаяли сугробы, и однажды утром в окошко <?> домика поросят заглянул чёрный грач. - Надеюсь, вы <?> заметили, что в лесу весна! - Уже весна?! - заволновались <?> поросята. - Значит, скоро проснется дядюшка Барсук! <?> Наверное, он будет очень голоден: ведь <?> он всю зиму ничего не ел! - Мы должны приготовить <?> ему салат "весне-я-рад", - объявила сестричка Хрю.'
]

let texts3 = [
    'Мыльный пузырь отделился от соломинки и важно поплыл <?> через открытое окно в сад. Все жители сада оторвались от <?> своих важных дел и уставились на это радужное переливающееся <?> чудо. - Кто ты, как сюда попал? - интересовались птички, <?> жуки, бабочки, кузнечики. - Я прилетел к вам из своего <?> соломенного дворца. Я - очень важная персона. Все вокруг <?> стали нахваливать его за красоту, изысканную одежду, прекрасные <?> манеры. А пузырь только раздувался от важности. И <?> в конце концов - лопнул. Только мокрое место от него <?> осталось. - Он был красивым только снаружи, - догадалась бабочка, - а внутри он <?> оказался пустым и не таким уж важным.',
    'У нас дома жили <?> овчарка Борька и кот Жорик. Ещё мы подкармливали во дворе бездомную кошку <?> Мотьку. Однажды она принесла к нашим дверям котят. Мы <?> впустили Мотьку в дом. Она потащила детёнышей на <?> Борькину подстилку. Пес громко залаял. Кошка выгнула спину <?> и зашипела. Но пёс не унимался, лаял и рвался к <?> Мотьке. Тогда Мотька схватила одного котёнка и выбежала на улицу, потом вернулась <?> за вторым. А про третьего забыла и больше не <?> появлялась. Мы оставили котёнка себе и назвали его <?> Карабасик. Он первое время часто шипел и принимал <?> грозный вид. Жорик и Борька с ним подружились и даже спали вместе.'
]

let words = [
    'мартовский',
    'создание',
    'поход',
    'работа',
    'тайна',
    'обстоятельство',
    'ясный',
    'милый',
    'кофе',
    'масштаб',
    'любовь',
    'момент',
]
let score = 0;
let rightAnswer = 0;
let wrongAnswer = 0;
let timerWork = false;
let difficult = 0;
let needAnswers = 0;
let isWin = false;
let username = '';

let text = document.querySelector('.text');
let counter = document.querySelector('.count');
let timerElemnet = document.querySelector('.timer');
let difficultSelect = document.querySelector('#difficult-select');
let correctWords = [];

function setText() {
    let i = 0;
    let textArr = texts[getRandomNumber(0, 1)].split(' ');
    textArr.forEach((item, index) => {
        if (item == '<?>') {
            textArr[index] = words[i++];
            correctWords.push(index);
        }
        let str = document.createElement('span');
        str.addEventListener('dblclick', clickOnWord);
        str.num = index;
        str.textContent = textArr[index] + ' ';

        text.append(str);
    })
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

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

function clickOnWord(e) {
    console.log(e);
    if (correctWords.indexOf(e.target.num) != -1) {
        e.target.classList.add('correct-word');
        rightAnswer++;
        counter.textContent = `Найдено слов: ${rightAnswer}`
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 1000)
        if (rightAnswer >= needAnswers) {
            switch (difficult) {
                case "25":
                    score = 70;
                    break;
                case "30":
                    score = 100;
                    break;
                case "35":
                    score = 120;
                    break;
            }
            addScore(username, score);
            isWin = true;
            endGame();
        }
    } else {
        e.target.classList.add('wrong-word');
        wrongAnswer++;
        if (wrongAnswer >= 3) {
            isWin = false;
            endGame();
        }
    }
}

openModal();

addModalContent(`
<p class="modal-text">Найдите неподходящие к текстам слова. Выберити их двойным нажатием мыши</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "25">легкий</option>
                    <option value = "30">средний</option>
                    <option value = "35">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
            </div>
 `);
addCloseListener();

document.querySelector('#start-game').addEventListener('click', () => {
    StartGame();
});

function StartGame() {
    difficultSelect = document.querySelector('#difficult-select');
    difficult = difficultSelect.options[difficultSelect.selectedIndex].value;
    switch (difficult) {
        case "25":
            texts = texts1;
            needAnswers = 5;
            break;
        case "30":
            texts = texts2;
            needAnswers = 7;
            break;
        case "35":
            texts = texts3;
            needAnswers = 10;
            break;
    }
    timerWork = true;
    isWin = false;
    text.innerHTML = '';
    setText();

    timer(difficult, () => { endGame() });
    rightAnswer = 0;
    wrongAnswer = 0;
}

function endGame() {
    timerWork = false;
    if (isWin) {

        addModalContent(`
        <p class="modal-text">Вы выиграли</p>
        <p class="modal-text">Счет: ${score} очков</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "25">легкий</option>
                    <option value = "30">средний</option>
                    <option value = "35">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
                <button id="next-level" class="modal-close ui-modal-element">В меню</button>
            </div>
        `);
        document.querySelector('#next-level').addEventListener('click', () => {
            window.location.href = '../index.html';
        });


    } else {
        addModalContent(`
        <p class="modal-text">Вы проиграли, попробуйте снова</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "25">легкий</option>
                    <option value = "30">средний</option>
                    <option value = "35">сложный</option>
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

let s = '123';
s.
    console.log(typeof (s));