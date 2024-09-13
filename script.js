function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo - 34;
}

function updateDateAndWeek() {
    const today = new Date();
    const weekNumber = getWeekNumber(today);
    const isEvenWeek = weekNumber % 2 === 0;

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'long'
    };
    
    let dateString = today.toLocaleDateString('ru-RU', options);

    document.getElementById('currentDate').textContent = dateString;

    document.getElementById('currentWeek').innerHTML = `
        Неделя <span>${weekNumber}</span>${isEvenWeek ? 'чётная' : 'нечётная'}
    `;

    document.getElementById(isEvenWeek ? 'evenWeek' : 'oddWeek').checked = true;
    toggleWeek(isEvenWeek ? 'even' : 'odd');
}

function toggleWeek(weekType) {
    document.getElementById('evenWeekTable').style.display = weekType === 'even' ? 'block' : 'none';
    document.getElementById('oddWeekTable').style.display = weekType === 'odd' ? 'block' : 'none';
}

updateDateAndWeek();