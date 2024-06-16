document.addEventListener('DOMContentLoaded', () => {
    let pomodoroInterval;
    let focusTime = 25 * 60;
    let breakTime = 5 * 60;
    let currentTimer = focusTime;
    let isBreak = false;
    let alarmSound = new Audio();

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startPomodoro);

    function startPomodoro() {
        clearInterval(pomodoroInterval);
        const focusMinutes = parseInt(document.getElementById('focusTime').value);
        const breakMinutes = parseInt(document.getElementById('breakTime').value);
        focusTime = focusMinutes * 60;
        breakTime = breakMinutes * 60;
        currentTimer = focusTime;
        isBreak = false;
        renderTimer();
        pomodoroInterval = setInterval(updatePomodoro, 1000);
    }

    function updatePomodoro() {
        if (currentTimer > 0) {
            currentTimer--;
            renderTimer();
        } else {
            alarmSound.play();
            isBreak = !isBreak;
            currentTimer = isBreak ? breakTime : focusTime;
            renderTimer();
        }
    }

    function renderTimer() {
        const timerElement = document.getElementById('timer');
        const minutes = Math.floor(currentTimer / 60);
        const seconds = currentTimer % 60;
        timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const bookmarkList = document.getElementById('bookmarkList');
    const addBookmarkButton = document.getElementById('addBookmarkButton');

    addBookmarkButton.addEventListener('click', () => {
        const bookmarkName = document.getElementById('bookmarkName').value;
        const bookmarkLink = document.getElementById('bookmarkLink').value;
        if (bookmarkName && bookmarkLink) {
            const bookmarkItem = document.createElement('div');
            bookmarkItem.innerHTML = `<a href="${bookmarkLink}" target="_blank">${bookmarkName}</a> <button onclick="removeElement(this)">Remove</button>`;
            bookmarkList.appendChild(bookmarkItem);
            document.getElementById('bookmarkName').value = '';
            document.getElementById('bookmarkLink').value = '';
        }
    });

    const toDoList = document.getElementById('toDoList');
    const addToDoButton = document.getElementById('addToDoButton');

    addToDoButton.addEventListener('click', () => {
        const toDoInput = document.getElementById('toDoInput').value;
        if (toDoInput) {
            const toDoItem = document.createElement('div');
            toDoItem.innerHTML = `${toDoInput} <button onclick="removeElement(this)">Remove</button>`;
            toDoList.appendChild(toDoItem);
            document.getElementById('toDoInput').value = '';
        }
    });
});

function removeElement(button) {
    button.parentElement.remove();
}
