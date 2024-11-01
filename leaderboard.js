const leaderboardData = [
    { name: 'Alice', score: 1500 },
    { name: 'Bob', score: 1200 },
    { name: 'Charlie', score: 1100 },
    { name: 'David', score: 1000 },
    { name: 'Eve', score: 900 }
];
function populateLeaderboard(data) {
    const tbody = document.getElementById('leaderboard-body');
    
    // Clear the previous leaderboard data
    tbody.innerHTML = '';

    // Add the new leaderboard data
    data.forEach((entry, index) => {
        const row = document.createElement('tr');
        let rankClass = '';
        // Apply the appropriate class for the top 3
        if (index === 0) rankClass = 'master';
        else if(index === 1) rankClass = 'ruby'
        else if (index >= 2 && index <= 3) rankClass = 'diamond';
        else if (index >= 4 && index <= 6) rankClass = 'platinum';
        else if (index >= 7 && index <= 11) rankClass = 'gold'

        row.className = rankClass;
        row.innerHTML = `
            <td class="rank">${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        tbody.appendChild(row);
    });
}
function populateTotal(data) {
    const tbody = document.getElementById('total-body');
    
    // Clear the previous leaderboard data
    tbody.innerHTML = '';

    // Add the new leaderboard data
    data.forEach((entry, index) => {
        const row = document.createElement('tr');
        let rankClass = '';
        // Apply the appropriate class for the top 3
        if (index === 0) rankClass = 'master';
        else if(index === 1) rankClass = 'ruby'
        else if (index >= 2 && index <= 3) rankClass = 'diamond';
        else if (index >= 4 && index <= 6) rankClass = 'platinum';
        else if (index >= 7 && index <= 11) rankClass = 'gold'

        row.className = rankClass;
        row.innerHTML = `
            <td class="rank">${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        tbody.appendChild(row);
    });
}


const API_KEY = 'AIzaSyCjY3qjr1NDRIpM-DZJRqnfSrf7qaU7lQ4';  // 여기에 API 키를 입력
const SPREADSHEET_ID = '1lEQvlBEKERzlxfq8TiQXi9A8MB_D-wgpeQOf-ZBjMTU';  // 여기에 스프레드시트 ID를 입력


async function loadLeaderboard(LEADERBOARD_RANGE) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${LEADERBOARD_RANGE}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json(); // data.values = 2차원 배열
    if(data.values){
        const ret = data.values.map(row => ({ name: row[0], score: row[1]}));
        return ret;
    }
    else {
        return [];
    }
}
// 페이지 로드 시 데이터 가져오기
window.onload = fetchData;

// Populate the leaderboard when the page loads
async function fetchData() {
    if(window.innerWidth >= 1000) {
        const container = document.getElementById('only-container');
        container.style.display = 'flex';
        const ccs = document.querySelectorAll('.cc');
        ccs.forEach(item => {
            item.style.width = '50%';
        })
    }
    const leaderboard_data = await loadLeaderboard('result!A1:B');  // Wait for loadData to resolve
    populateLeaderboard(leaderboard_data);      // Populate leaderboard after data is fetched
    const total_data = await loadLeaderboard('result!D1:E');
    populateTotal(total_data);
}

// setInterval(fetchData, 5000); // 5초마다 데이터 갱신
