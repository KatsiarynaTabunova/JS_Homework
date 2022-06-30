const btnStart = document.getElementsByClassName('switcher')[0],
    blockTimer = document.getElementsByClassName('time')[0],
    initial = 'initial',
    running = 'running',
    stopped = 'stopped',
    finished = 'finished';

const blockMillisec = document.getElementsByClassName('milliseconds')[0],
    blockSec = document.getElementsByClassName('seconds')[0],
    blockMin = document.getElementsByClassName('minutes')[0];

let millisecsNum = blockMillisec.innerHTML,
    secsNum = blockSec.innerHTML,
    minsNum = blockMin.innerHTML,
    interval;

btnStart.addEventListener('click', () => {
    toggleTimerState();
    renderTimerState();
    if (blockTimer.dataset.status === initial) {
        interval = setInterval(myTimer, 10);
        resetTimerState();
    }
});

function toggleTimerState() {
    switch (blockTimer.dataset.status) {
        case initial:
            blockTimer.dataset.status = running;
            break;
        case running:
            blockTimer.dataset.status = stopped;
            break;
        case stopped:
            blockTimer.dataset.status = running;
            break;
    }
}

function renderTimerState() {
    switch (blockTimer.dataset.status) {
        case initial:
            showElement(btnStart, true);
            btnStart.innerHTML = 'Start';
            showElement(btnReset, false);
            showElement(btnSave, false);
            showElement(blockTimestamps, false);
            break;
        case running:
            showElement(btnStart, true);
            btnStart.innerHTML = 'Stop';
            interval = setInterval(myTimer, 10);
            showElement(btnReset, true);
            showElement(btnSave, true);
            showElement(blockTimestamps, true);
            break;
        case stopped:
            showElement(btnStart, true);
            btnStart.innerHTML = 'Run';
            clearInterval(interval);
            showElement(btnReset, true);
            showElement(btnSave, true);
            showElement(blockTimestamps, true);
            break;
        case finished:
            showElement(btnStart, false);
            btnStart.innerHTML = 'Start';
            showElement(btnReset, true);
            showElement(btnSave, false);
            showElement(blockTimestamps, true);
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
                blockTimer.dataset.status = finished;
                renderTimerState();
            }
        }
    }
    blockMillisec.innerHTML = millisecsNum;
    blockSec.innerHTML = secsNum;
    blockMin.innerHTML = minsNum;
}

const blockResult = document.getElementsByClassName('result'),
    btnReset = blockResult[0].firstElementChild,
    btnSave = blockResult[0].children[2],
    blockTimestamps = document.getElementsByClassName('timestamps')[0];

let timestamp,
    i = 1,
    arrStamps = [];

btnReset.addEventListener('click', () => {
    clearInterval(interval);
    resetTimerState();
    blockTimestamps.innerHTML = '';
    i = 1;
    blockTimer.dataset.status = 'initial';
    renderTimerState();
    arrStamps = [];
});

btnSave.addEventListener('click', () => {
    let milisek = blockMillisec.innerHTML,
        sec = blockSec.innerHTML,
        min = blockMin.innerHTML;
    const timeText = `${i++}) ${min} : ${sec} : ${milisek}`;
    timestamp = document.createElement('div');
    timestamp.innerHTML += timeText;
    blockTimestamps.appendChild(timestamp);
    arrStamps.push(timeText);
});

function resetTimerState() {
    blockMillisec.innerHTML = '00';
    blockSec.innerHTML = '00';
    blockMin.innerHTML = '00';
    millisecsNum = '00';
    secsNum = '00';
    minsNum = '00';
}

window.addEventListener('beforeunload', pageClosed, false);
window.addEventListener('load', pageOpened, false);

function showElement(Element, show) {
    if (show) {
        Element.classList.add('block-visible');
        Element.classList.remove('block-hidden');
    } else {
        Element.classList.remove('block-visible');
        Element.classList.add('block-hidden');
    }
}

function pageClosed() {
    localStorage.setItem('msec', millisecsNum);
    localStorage.setItem('sec', secsNum);
    localStorage.setItem('min', minsNum);

    localStorage.setItem('status', blockTimer.dataset.status);
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
    blockMillisec.innerHTML = millisecsNum;
    blockSec.innerHTML = secsNum;
    blockMin.innerHTML = minsNum;

    blockTimer.dataset.status = localStorage.getItem('status');
    if (blockTimer.dataset.status === 'null') {
        blockTimer.dataset.status = initial;
    }
    if (blockTimer.dataset.status === initial) {
        resetTimerState();
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
