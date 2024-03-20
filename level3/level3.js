"use strict"
document.querySelector('#to-menu').addEventListener('click',()=>{
    window.location.href='../index.html';
})

let texts=[
    'Кот нежился на солнышке прекрасным апрельским утром. Вдруг он увидел <?> огромную муху, разные мысли <?> одолевали его. Может муху <?> поймать или же продолжить лежать? День был <?> таким спокойным, что <?> суетиться не хотелось. Кот громко зевнул, перевернулся на другой бок и уснул.',
    'Артём любил походы. Вот и в эти выходные <?> он собрался в лес. Собрал рюкзак, все снаряжение и <?> спустился вниз по лестнице, чтобы поскорее сесть в машину и <?> поехать в поход. Артём открывает дверь на улицу и видит, что <?> идет сильный дождь, сверкают молнии и гремит гром. "Штож, видимо, сегодня я остаюсь дома" - подумал <?> парень и поднялся обратно.'
]
let words=[
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
]
let rightAnswer = 0;
let wrongAnswer = 0;
let timerWork=false;
let difficult =0;
let isWin =false;
let username='';
shuffle(words);
let text =document.querySelector('.text');
let counter = document.querySelector('.count');
let timerElemnet = document.querySelector('.timer');
let difficultSelect = document.querySelector('#difficult-select');
let correctWords =[];
setText();
function setText(){
    let i =0;
    let textArr = texts[getRandomNumber(0,1)].split(' ');
    textArr.forEach((item,index)=>{
        if(item=='<?>'){
            console.log(1)
            textArr[index] = words[i++];
            correctWords.push(index);
        }
        let str = document.createElement('span');
        str.addEventListener('dblclick',clickOnWord);
        str.num =index;
        str.textContent=textArr[index]+' ';

        text.append(str);
    })
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function clickOnWord(e){
    if(correctWords.indexOf(e.target.num)!=-1){
        e.target.classList.add('correct-word');
        rightAnswer++;
        counter.textContent=`Найдено слов: ${rightAnswer}`
        setTimeout(()=>{
            e.target.style.display='none';
        },1000)
        if(rightAnswer>=5){
            if(localStorage.getItem(username)<3 && username!=''){
                let obj = getUserObj();
                    obj[username] = `3`;
                    localStorage.setItem('score',JSON.stringify(obj));
            }
            isWin=true;
            endGame();
        }
    }else{
        e.target.classList.add('wrong-word');
        wrongAnswer++;
        if(wrongAnswer>=3){
            isWin=false;
            endGame();
        }
    }
  }

  openModal();
//addOpenListener();
 addModalContent(`
<p class="modal-text">Найдите неподходящие к текстам слова. Выберити их двойным нажатием мыши</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "35">легкий</option>
                    <option value = "25">средний</option>
                    <option value = "15">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
            </div>
 `);
addCloseListener();

document.querySelector('#start-game').addEventListener('click',()=>{
    StartGame();
});

function StartGame(){
    timerWork=true;
    isWin=false;
    text.innerHTML='';
    setText();
    difficultSelect = document.querySelector('#difficult-select');
    difficult = difficultSelect.options[difficultSelect.selectedIndex].value;
    timer(difficult,()=>{endGame()});
    rightAnswer=0;
    wrongAnswer=0;
}

function endGame(){
    timerWork=false;
    if(isWin){
        
        
            addModalContent(`
        <p class="modal-text">Вы выиграли</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "35">легкий</option>
                    <option value = "25">средний</option>
                    <option value = "15">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
                <button id="next-level" class="modal-close ui-modal-element">В меню</button>
            </div>
        `);
        document.querySelector('#next-level').addEventListener('click',()=>{
            window.location.href='../index.html';
        });
        
  
    }else{
        addModalContent(`
        <p class="modal-text">Вы проиграли, попробуйте снова</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "35">легкий</option>
                    <option value = "25">средний</option>
                    <option value = "15">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
            </div>
        `);
        
    }
    openModal();
        document.querySelector('#start-game').addEventListener('click',()=>{
            StartGame();
        });
        addCloseListener();
}

  function timer(seconds,callback){
    let time = seconds;
    let timerId = setTimeout(function tick() {
        if(time<=0 || !timerWork){
            timerElemnet.textContent='Оставшееся время:'+time;
            callback();
        }else{
            timerElemnet.textContent='Оставшееся время:'+time;
            time--;
            timerId = setTimeout(tick, 1000, seconds,time,callback);
        }
         
      }, 1000,seconds,time,callback);
}

getUsername();
function getUsername(){
    let myUrl = window.location.search
    myUrl = myUrl.substring(1);
    let arr = myUrl.split("&");
    let userArr = arr[0].split('=');
    if(userArr[0]='name'){
        username = userArr[1];
    }
}

let s ='123';
s.
console.log(typeof(s));