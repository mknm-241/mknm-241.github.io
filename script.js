function getWeekNumber(date) {
    const currentYear = date.getFullYear();
    const septemberFirst = new Date(currentYear, 8, 1);

    const academicYearStart = date < septemberFirst
        ? new Date(currentYear - 1, 8, 1)
        : septemberFirst;

    const firstWeekMonday = new Date(academicYearStart);
    const dayShift = (firstWeekMonday.getDay() + 6) % 7;
    firstWeekMonday.setDate(firstWeekMonday.getDate() - dayShift);

    const diffInDays = Math.floor((date - firstWeekMonday) / (1000 * 60 * 60 * 24));

    return Math.ceil((diffInDays + 1) / 7);
}

function updateDateAndWeek() {
    const today = new Date();
    const weekNumber = getWeekNumber(today);
    const isEvenWeek = weekNumber % 2 === 0;

    const formattedDate = today.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'long'
    });

    document.getElementById('currentDate').textContent = formattedDate;
    document.getElementById('currentWeek').innerHTML = `
        Неделя <span>${weekNumber}</span>${isEvenWeek ? ' чётная' : ' нечётная'}
    `;

    const weekType = isEvenWeek ? 'even' : 'odd';
    document.getElementById(`${weekType}Week`).checked = true;

    toggleWeek(weekType);
}

function toggleWeek(weekType) {
    const evenTable = document.getElementById('evenWeekTable');
    const oddTable = document.getElementById('oddWeekTable');

    evenTable.style.display = weekType === 'even' ? 'block' : 'none';
    oddTable.style.display = weekType === 'odd' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', updateDateAndWeek);