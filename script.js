const LESSON_TIME_ICON_SVG = '<svg class="time-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/></svg>';

const SCHEDULE_DATA = {
    odd: {
        'Понедельник': [
            {
                time: '17:15 – 18:50',
                name: 'Безопасность компьютерных сетей',
                type: 'Лекция + Лабораторная',
                info: 'доц. Карабцев С.Н.',
                link: 'https://bbb.kemsu.ru/b/6vx-3s8-jrp-5cy'
            },
            {
                time: '18:50 – 20:25',
                name: 'Анализ защищенности компьютерных систем и приложений',
                type: 'Лекция + Лабораторная',
                info: 'ст. преп. Торгулькин В.В.',
                link: 'https://bbb.kemsu.ru/b/adm-dao-8lw-i1t'
            }
        ],
        'Вторник': [
            {
                time: '17:15 – 18:50',
                name: 'Администрирование защищенных баз данных',
                type: 'Лабораторная',
                info: 'зав. кафедрой Гудов А.М.',
                link: 'https://bbb.kemsu.ru/b/nt9-332-k4x-2pe'
            },
            {
                time: '17:15 – 18:50',
                name: 'Современные численные методы',
                type: 'Лабораторная',
                info: 'зав. кафедрой Гудов А.М.',
                link: 'https://bbb.kemsu.ru/b/nt9-332-k4x-2pe'
            }
        ],
        'Среда': [
            {
                time: '15:30 – 17:05',
                name: 'Математические модели и методы искусственного интеллекта',
                type: 'Лабораторная',
                info: 'доц. Саблинский А.И., ауд. 2220'
            },
            {
                time: '17:15 – 18:50',
                name: 'Введение в Data Science и машинное обучение',
                type: 'Лабораторная',
                info: 'доц. Саблинский А.И., ауд. 2220'
            }
        ]
    },
    even: {
        'Понедельник': [
            {
                time: '17:15 – 18:50',
                name: 'Безопасность компьютерных сетей',
                type: 'Лекция + Лабораторная',
                info: 'доц. Карабцев С.Н.',
                link: 'https://bbb.kemsu.ru/b/6vx-3s8-jrp-5cy'
            },
            {
                time: '18:50 – 20:25',
                name: 'Анализ защищенности компьютерных систем и приложений',
                type: 'Лабораторная',
                info: 'ст. преп. Торгулькин В.В.',
                link: 'https://bbb.kemsu.ru/b/adm-dao-8lw-i1t'
            }
        ],
        'Вторник': [
            {
                time: '17:15 – 18:50',
                name: 'Администрирование защищенных баз данных',
                type: 'Лекция',
                info: 'зав. кафедрой Гудов А.М.',
                link: 'https://bbb.kemsu.ru/b/nt9-332-k4x-2pe'
            },
            {
                time: '17:15 – 18:50',
                name: 'Современные численные методы',
                type: 'Лекция',
                info: 'зав. кафедрой Гудов А.М.',
                link: 'https://bbb.kemsu.ru/b/nt9-332-k4x-2pe'
            }
        ],
        'Среда': [
            {
                time: '15:30 – 17:05',
                name: 'Математические модели и методы искусственного интеллекта',
                type: 'Лекция',
                info: 'доц. Саблинский А.И., ауд. 2220'
            },
            {
                time: '17:15 – 18:50',
                name: 'Введение в Data Science и машинное обучение',
                type: 'Лекция',
                info: 'доц. Саблинский А.И., ауд. 2220'
            }
        ]
    }
};

const DOM = {
    currentDate: document.getElementById('currentDate'),
    weekNumber: document.getElementById('weekNumber'),
    weekType: document.getElementById('weekType'),
    oddWeekRadio: document.getElementById('oddWeek'),
    evenWeekRadio: document.getElementById('evenWeek'),
    toggleBg: document.querySelector('.toggle-bg'),
    scheduleDisplay: document.getElementById('scheduleDisplay'),
    weekRadios: document.querySelectorAll('input[name="week"]')
};

const getAcademicWeekNumber = (date) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    let academicYearStart;
    if (currentMonth < 8) {
        academicYearStart = new Date(currentYear - 1, 8, 1);
    } else {
        academicYearStart = new Date(currentYear, 8, 1);
    }

    const firstWeekMonday = new Date(academicYearStart);
    let dayOfWeek = firstWeekMonday.getDay();
    dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    if (dayOfWeek !== 1) {
        firstWeekMonday.setDate(firstWeekMonday.getDate() - (dayOfWeek - 1));
    }

    const diffInTime = date.getTime() - firstWeekMonday.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    return Math.ceil((diffInDays + 1) / 7);
};

const createLessonHtml = (lesson) => {
    const linkHtml = lesson.link
        ? `<a href="${lesson.link}" target="_blank" class="class-link">Онлайн</a>`
        : '';
    
    return `
        <div class="class-item">
            <div class="class-time">
                ${LESSON_TIME_ICON_SVG}
                ${lesson.time}
            </div>
            <div class="class-name">${lesson.name}</div>
            <span class="class-type">${lesson.type}</span>
            <div class="class-info">${lesson.info}</div>
            ${linkHtml}
        </div>
    `;
};

const renderSchedule = (type) => {
    const weekSchedule = SCHEDULE_DATA[type];
    let htmlContent = '';

    for (const day in weekSchedule) {
        if (Object.prototype.hasOwnProperty.call(weekSchedule, day)) {
            htmlContent += `
                <div class="day-section">
                    <div class="day-header">${day}</div>
            `;
            weekSchedule[day].forEach(lesson => {
                htmlContent += createLessonHtml(lesson);
            });
            htmlContent += `</div>`;
        }
    }
    DOM.scheduleDisplay.innerHTML = htmlContent;
};

const updateDateAndWeekInfo = () => {
    const today = new Date();
    const weekNumber = getAcademicWeekNumber(today);
    const isEvenWeek = weekNumber % 2 === 0;
    const weekType = isEvenWeek ? 'even' : 'odd';

    const formattedDate = today.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    });

    DOM.currentDate.textContent = formattedDate;
    DOM.weekNumber.textContent = weekNumber;
    DOM.weekType.textContent = isEvenWeek ? 'чётная' : 'нечётная';

    if (weekType === 'odd') {
        DOM.oddWeekRadio.checked = true;
        DOM.toggleBg.style.transform = 'translateX(0)';
    } else {
        DOM.evenWeekRadio.checked = true;
        DOM.toggleBg.style.transform = 'translateX(100%)';
    }

    renderSchedule(weekType);
};

DOM.weekRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        const selectedWeekType = event.target.id === 'oddWeek' ? 'odd' : 'even';
        DOM.toggleBg.style.transform = event.target.id === 'evenWeek' ? 'translateX(100%)' : 'translateX(0)';
        renderSchedule(selectedWeekType);
    });
});

document.addEventListener('DOMContentLoaded', updateDateAndWeekInfo);