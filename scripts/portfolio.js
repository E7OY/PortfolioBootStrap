async function fetchCommitActivity() {
    const username = 'E7OY';
    const token = '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';
    const commitsContainer = document.getElementById('github-activity');
    const commitCounts = {};
    const currentDate = new Date();
    const threeMonthsAgoDate = new Date();
    threeMonthsAgoDate.setMonth(currentDate.getMonth() - 1);
    let page = 1;
    let hasMoreEvents = true;


    const userInfoResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });
    const userInfo = await userInfoResponse.json();

    const userInfoContainer = document.createElement('div');
    userInfoContainer.className = 'user-info text-center mb-4';
    userInfoContainer.innerHTML = `
        <img src="${userInfo.avatar_url}" class="rounded-circle" width="100" alt="${userInfo.login}">
        <h3>${userInfo.login}</h3>
    `;
    commitsContainer.appendChild(userInfoContainer);

    while (hasMoreEvents) {
        const response = await fetch(`https://api.github.com/users/${username}/events?page=${page}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        const events = await response.json();

        if (events.length === 0) {
            hasMoreEvents = false;
            break;
        }

        events.forEach(event => {
            if (event.type === 'PushEvent') {
                const eventDate = new Date(event.created_at);
                const dateStr = eventDate.toISOString().split('T')[0];

                if (eventDate >= threeMonthsAgoDate && eventDate <= currentDate) {
                    if (!commitCounts[dateStr]) {
                        commitCounts[dateStr] = 0;
                    }
                    commitCounts[dateStr] += event.payload.commits.length;
                }
            }
        });

        page++;
    }

    const calendar = document.createElement('div');
    calendar.className = 'calendar';

    for (let d = new Date(threeMonthsAgoDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const count = commitCounts[dateStr] || 0;
        const level = Math.min(4, Math.floor(count / 2));

        const day = document.createElement('div');
        day.className = `day level-${level}`;
        day.title = `${dateStr}: ${count} commits`;
        calendar.appendChild(day);
    }

    commitsContainer.appendChild(calendar);
}

fetchCommitActivity();






function myFunc() {
    var now = new Date();
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    document.getElementById('display-time').innerHTML = time;
}
setInterval(myFunc, 1000);

const apiKey = 'fbc85170dc7995a303c1d3f3a45cd83a';
const ciudad = 'Corunha';
const url = `https://api.openweathermap.org/data/2.5/weather?q=Corunha&appid=fbc85170dc7995a303c1d3f3a45cd83a&units=metric&lang=es`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        const tempDiv = document.getElementById('temp');
        const temperatura = Math.round(data.main.temp);
        const descripcion = data.weather[0].description;
        tempDiv.innerHTML = `${descripcion}<span>, </span>${temperatura}°C`;
    })
    .catch(error => console.log('Error:', error));

