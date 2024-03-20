"use strict";

function getUserObj() {
    let score = localStorage.getItem('score');
    var obj = JSON.parse(score);
    return obj;
}

if (localStorage.getItem('score') == null) {
    localStorage.setItem('score', '{}');
}

// Инициализация объекта для хранения данных игроков и их рейтинга
let players = {};

document.querySelector('.menu-button.login').addEventListener('click', function() {
    let name = document.querySelector('.name-input').value;
    
    // Проверяем, есть ли игрок уже в списке
    if (!players[name]) {
        players[name] = { score: 0 }; // Добавляем нового игрока с нулевым счетом
    }
    
    updateScoreList(); // Обновляем список участников
});

document.getElementById('open-score').addEventListener('click', function() {
    updateScoreList();
});

// Функция для обновления списка участников и их рейтинга на главной странице
function updateScoreList() {
    let scoreContent = document.querySelector('.score-content');
    scoreContent.innerHTML = ''; // Очищаем текущий список
    
    for (let player in players) {
        let playerItem = document.createElement('div');
        playerItem.textContent = `${player}: ${players[player].score} баллов`;
        scoreContent.appendChild(playerItem);
    }
}

// Функция для начисления баллов за успешное прохождение уровня игроку
function addPointsToPlayer(playerName, points) {
    if (players[playerName]) {
        players[playerName].score += points; // Увеличиваем счет игрока на указанное количество баллов
        updateScoreList(); // Обновляем отображение списка участников
    }
}
