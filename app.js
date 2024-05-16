const selectionTimers = document.querySelector('.selection_timers');
const selectionTimer = document.querySelectorAll('.selection_timer');
const timerText = document.querySelector('.timer_text-clock');
const outsideCircle = document.querySelector('.outside_circle');
const timerTxtBtn = document.querySelector('.timer_text-button');
const timerDashOffset = document.querySelector('#countDownCircle');
const timeMinuteInput = document.querySelectorAll('.time_minute-input input');
const upArrow = document.querySelectorAll('.up-arrow');
const downArrow = document.querySelectorAll('.down-arrow');
const settingsBtn = document.querySelector('.settings');
const form = document.querySelector('.form');
const formSubmitBtn = document.querySelector('.form_submit');
const formSettingsCloseBtn = document.querySelector('.form_settings-closeBtn');
const formFontItem = document.querySelectorAll('.form_font-item');
const colorTextEl = document.querySelectorAll('.color_text');
let colors = ['#f87070', 'rgb(112, 243, 248)','rgb(216, 129, 248)']
let fonts = ['"Kumbh Sans", sans-serif', '"Roboto Slab", serif', '"Space Mono", monospace'];
let timers = [25, 5, 15]
let timersTexts = ['25:00', '05:00', '15:00']
let timerTime = timers[0] * 60;
let min, sec;
let selectedTimerIndex = 0;

settingsBtn.addEventListener('click', () => {
    form.classList.add('active_form');
    document.querySelector('.settings_modal').style.visibility = 'visible';
})
formSettingsCloseBtn.addEventListener('click', (e) => {
    e.preventDefault()
    form.classList.remove('active_form');
    document.querySelector('.settings_modal').style.visibility = 'collapse';
})

formSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    form.classList.remove('active_form');
    document.querySelector('.settings_modal').style.visibility = 'collapse';
    timeMinuteInput.forEach((input, idx) => {
        timers[idx] = +input.value;
        timersTexts[idx] = `${input.value < 10 ? '0' : ''}${input.value}:00`;
        if (selectedTimerIndex === idx) {
            timerTime = timers[idx] * 60;
            updateTimerDisplay();
        }
    });
    const selectedFontIndex = Array.from(formFontItem).findIndex(item => item.classList.contains('active_font'));
    const selectedColorIndex = Array.from(colorTextEl).findIndex(item => item.innerHTML == '✓');
    if (selectedFontIndex !== -1 && selectedColorIndex !== -1) {
        document.querySelector('.selection_timers').style.fontFamily = fonts[selectedFontIndex];
        timerText.style.fontFamily = fonts[selectedFontIndex];
        timerText.style.fontFamily = fonts[selectedFontIndex];
        timerTxtBtn.style.fontFamily = fonts[selectedFontIndex];
        document.querySelector('.outside_circle svg circle').style.stroke = colors[selectedColorIndex];
        document.querySelector('.timer_selected').style.backgroundColor = colors[selectedColorIndex]
    }
});

formFontItem.forEach((item, idx) => {
    item.addEventListener('click', () => {
        formFontItem.forEach((el, index) => {
            if (idx === index) {
                el.classList.add('active_font');
            } else {
                el.classList.remove('active_font')
            }
        })

    })
})
colorTextEl[0].innerHTML = '✓'
colorTextEl.forEach((item, idx) => {
    item.addEventListener('click', () => {
        colorTextEl.forEach((el, index) => {
            if (idx === index) {
                el.innerHTML = '✓';
            } else {
                el.innerHTML = '';
            }
        })

    })
})

function increaseInputValue(arrow, input) {
    arrow.addEventListener('click', () => {
        if (arrow.classList.contains('up-arrow')) {
            input.value++;
        } else if (arrow.classList.contains('down-arrow') && input.value > 1) {
            input.value--;
        }
    });
}
timeMinuteInput.forEach((input, idx) => {
    increaseInputValue(upArrow[idx], input);
    increaseInputValue(downArrow[idx], input);
});

selectionTimer.forEach((selection, idx) => {
    selection.addEventListener('click', () => {
        selectionTimer.forEach((selected, index) => {
            const selectedColorIndex = Array.from(colorTextEl).findIndex(item => item.innerHTML == '✓');
            if (idx === index) {
                selected.classList.add('timer_selected');
                selectedTimerIndex = idx;
                timerTime = timers[idx] * 60;
                timerText.innerHTML = timersTexts[idx];
                selected.style.backgroundColor = colors[selectedColorIndex]
            } else {
                selected.classList.remove('timer_selected');
                selected.style.backgroundColor = ''
            }
        });
        clearInterval(timerInterval);
        timerRunning = false;
        timerTxtBtn.innerHTML = 'Start';
        timerDashOffset.style.strokeDashoffset = 0;
        timerDashOffset.style.strokeDasharray = "1068";
    });
});

function updateTimerDisplay() {
    min = Math.floor(timerTime / 60);
    sec = timerTime % 60;
    let setTime = `${min < 10 ? 0 : ''}${min}:${sec < 10 ? 0 : ''}${sec}`
    timerText.innerHTML = setTime;
}
let timerInterval;
let timerRunning = false;
function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerTxtBtn.innerHTML = 'Start';
    timerTime = timers[selectedTimerIndex] * 60;
    timerDashOffset.style.strokeDashoffset = 1068;
}

timerTxtBtn.addEventListener('click', () => {
    if (!timerRunning) {
        timerInterval = setInterval(() => {
            if (timerTime > 0) {
                timerTime--;
                updateTimerDisplay();
                let percentage = (timerTime / (timers[selectedTimerIndex] * 60)) * 100;
                let dashArrayValue = (percentage / 100) * 1068;
                timerDashOffset.style.strokeDashoffset = (1068 - dashArrayValue);
            } else {
                resetTimer();
            }
        }, 1000);
        timerRunning = true;
        timerTxtBtn.innerHTML = 'Stop';
    } else {
        clearInterval(timerInterval);
        timerRunning = false;
        timerTxtBtn.innerHTML = 'Start';
    }
});
