"use strict";

//window.addEventListener('beforeunload', function() {
//    localStorage.removeItem('score');
//});

let scoreContent = document.querySelector('.score-content');
updateScoreList();
function getUserObj() {
    let score = localStorage.getItem('score');
    var obj = JSON.parse(score);
    return obj;
}

if (localStorage.getItem('score') == null) {
    localStorage.setItem('score', '[]');
}

document.querySelector('.menu-button.login').addEventListener('click', function () {
    let name = document.querySelector('.name-input').value;
    clearScoreList();
    addScore(name, 0);
    updateScoreList();
});

function clearScoreList() {
    scoreContent.innerHTML = '';
}


function addScore(player, score) {
    var scoreObj = getUserObj();
    var index = scoreObj.findIndex((e) => {
        return e.name == player;
    });
    if (index != -1) {
        scoreObj[index].score += score;
    } else {
        scoreObj.push({ name: player, score: score });
    }
    localStorage.setItem('score', JSON.stringify(scoreObj));
}

function updateScoreList() {
    var obj = getUserObj();
    console.log(obj)
    for (let key in obj) {
        let userElement = document.createElement('p');
        userElement.textContent = `${obj[key].name}:${obj[key].score}`;
        scoreContent.append(userElement);
    }

}


