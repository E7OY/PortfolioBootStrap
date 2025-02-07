const apiKey = 'fbc85170dc7995a303c1d3f3a45cd83a';
const ciudad = 'Corunha';
const url = `https://api.openweathermap.org/data/2.5/weather?q=Corunha&appid=fbc85170dc7995a303c1d3f3a45cd83a&units=metric&lang=es`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const tempDiv = document.getElementById('temp');
        const temperatura = Math.round(data.main.temp);
        const humedad = data.main.humidity;
        const descripcion = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        tempDiv.innerHTML = `${descripcion}<span>, </span>${temperatura}°C <img class="img-icono" src="${iconUrl}" width="50px" /*style="position: absolute; left: 650px; top: 345px"*/ alt="Icono del clima" /> 
        `;    
    });