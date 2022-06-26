const btnStart = document.getElementsByClassName('switcher'),
    blockTimer = document.getElementsByClassName('time'),
    initial = 'initial',
    running = 'running',
    stopped = 'stopped';

const blockMillisec = document.getElementsByClassName('milliseconds'),
    blockSec = document.getElementsByClassName('seconds'),
    blockMin = document.getElementsByClassName('minutes');

let millisecsNum = blockMillisec[0].innerHTML,
    secsNum = blockSec[0].innerHTML,
    minsNum = blockMin[0].innerHTML,
    interval

btnStart[0].addEventListener('click', () => {
    toggleTimerState();
    renderTimerState();
    if (blockTimer[0].dataset.status === initial) {
        interval = setInterval(myTimer, 10);
        resetTimerState();
    }
});

function toggleTimerState() {
    switch (blockTimer[0].dataset.status) {
        case initial:
            blockTimer[0].dataset.status = running;
            break;
        case running:
            blockTimer[0].dataset.status = stopped;
            break;
        case stopped:
            blockTimer[0].dataset.status = running;
            break;
    }
}

function renderTimerState() {
    switch (blockTimer[0].dataset.status) {
        case initial:
            btnStart[0].innerHTML = 'Start';
            blockResult[0].style.display = "none";
            break;
        case running:
            btnStart[0].innerHTML = 'Stop';
            interval = setInterval(myTimer, 10);
            blockResult[0].style.display = "inline-block";
            break;
        case stopped:
            btnStart[0].innerHTML = 'Run';
            clearInterval(interval);
            blockResult[0].style.display = "inline-block";
            break;
    }
}

function myTimer() {
    millisecsNum = +millisecsNum + 1;
    if (millisecsNum < 10) {
        millisecsNum = '0' + millisecsNum;
    }
    if (+millisecsNum === 100) {
        millisecsNum = '00';
        secsNum = +secsNum + 1;
        if (secsNum < 10) {
            secsNum = '0' + secsNum;
        }
        if (+secsNum === 60) {
            secsNum = '00';
            minsNum = +minsNum + 1;
            if (minsNum < 10) {
                minsNum = '0' + minsNum;
            }
            if (+minsNum === 60) {
                clearInterval(interval);
                btnSave.remove();
                btnStart[0].remove();
                blockTimer[0].dataset.status = initial;
            }
        }
    }
    blockMillisec[0].innerHTML = millisecsNum;
    blockSec[0].innerHTML = secsNum;
    blockMin[0].innerHTML = minsNum;
}

const blockResult = document.getElementsByClassName('result'),
    btnReset = blockResult[0].firstElementChild,
    btnSave = blockResult[0].children[2],
    blockTimestamps = document.createElement('div');

blockResult[0].appendChild(blockTimestamps);

let timestamp,
    i = 1,
    arrStamps = [];

btnReset.addEventListener('click', () => {
    clearInterval(interval);
    resetTimerState();
    blockResult[0].style.display = 'none';
    blockTimestamps.innerHTML = '';
    i = 1;
    blockTimer[0].dataset.status = 'initial';
    btnStart[0].innerHTML = 'Start';
    arrStamps = [];
});

btnSave.addEventListener('click', () => {
    let milisek = blockMillisec[0].innerHTML,
        sec = blockSec[0].innerHTML,
        min = blockMin[0].innerHTML;
    const timeText = `${i++}) ${min} : ${sec} : ${milisek}`;
    timestamp = document.createElement('div');
    timestamp.innerHTML += timeText;
    blockTimestamps.appendChild(timestamp);
    arrStamps.push(timeText);
});

function resetTimerState() {
    blockMillisec[0].innerHTML = '00';
    blockSec[0].innerHTML = '00';
    blockMin[0].innerHTML = '00';
    millisecsNum = '00';
    secsNum = '00';
    minsNum = '00';
}

window.addEventListener('beforeunload', pageClosed, false);
window.addEventListener('load', pageOpened, false);

let getStyle = getComputedStyle(blockResult[0]);

function pageClosed() {
    localStorage.setItem('msec', millisecsNum);
    localStorage.setItem('sec', secsNum);
    localStorage.setItem('min', minsNum);

    localStorage.setItem('status', blockTimer[0].dataset.status);
    localStorage.setItem('style', getStyle.display);
    localStorage.setItem('stamps', JSON.stringify(arrStamps));
}

function pageOpened() {
    millisecsNum = localStorage.getItem('msec');
    secsNum = localStorage.getItem('sec');
    minsNum = localStorage.getItem('min');

    if (millisecsNum === 'null' && secsNum === 'null' || minsNum === 'null') {
        millisecsNum = '00';
        secsNum = '00';
        minsNum = '00';
    }
    blockMillisec[0].innerHTML = millisecsNum;
    blockSec[0].innerHTML = secsNum;
    blockMin[0].innerHTML = minsNum;

    blockTimer[0].dataset.status = localStorage.getItem('status');
    if (blockTimer[0].dataset.status === 'null') {
        blockTimer[0].dataset.status = initial;
    }
    if (blockTimer[0].dataset.status === initial) {
        resetTimerState();
    }
    let btnStyle = localStorage.getItem('style');
    if (btnStyle === 'inline-block') {
        blockResult[0].style.display = "inline-block";
    }
    arrStamps = JSON.parse(localStorage.getItem('stamps'));
    for (let value of arrStamps) {
        timestamp = document.createElement('div');
        timestamp.innerHTML += value;
        blockTimestamps.appendChild(timestamp);
    }
    i = arrStamps.length + 1;
    renderTimerState();
}
