async function getWeather(city, lat, long, cityData) {
    const link = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,rain,snowfall,surface_pressure,cloudcover,windspeed_10m,winddirection_10m`

    const response = await fetch(link);
    var data = await response.json();

    console.log(data);

    // document.querySelector(".card > .content > .town").value = city;
    document.querySelector(".card > .content > .temp").innerHTML = data.hourly.temperature_2m[14]  + "<span class=\"less\"> °C </span>";
    document.querySelector(".card > .content > .a1").innerHTML = `${city}, ${cityData.results[0].admin1}, ${cityData.results[0].country}`;

    // Rain
    if (data.hourly.rain[14] != 0) {
        document.querySelector(".card > .content > .elem > div > .rain").innerHTML = `Il pleut à ${city}`;
    } else {
        document.querySelector(".card > .content > .elem > div > .rain").innerHTML = `Il ne pleut pas à ${city}`;
    }

    // Snow
    if (data.hourly.snowfall[14] != 0) {
        document.querySelector(".card > .content > .elem > div > .snow").innerHTML = `Il neige à ${city}`;
    } else {
        document.querySelector(".card > .content > .elem > div > .snow").innerHTML = `Il ne neige pas à ${city}`;
    }

    // Surface pressure
    document.querySelector(".card > .content > .elem > div > .pressure").innerHTML = `${data.hourly.surface_pressure[14]} hPa`;

    // Rain
    if (0 <= data.hourly.cloudcover[14] >= 33) {
        document.querySelector(".card > .content > .elem > div > .clouds").innerHTML = `Faible couverture`;
    } else if (33 < data.hourly.cloudcover[14] >= 66) {
        document.querySelector(".card > .content > .elem > div > .clouds").innerHTML = `Moyenne couverture`;
    } else {
        document.querySelector(".card > .content > .elem > div > .clouds").innerHTML = `Forte couverture`;
    }

    // Wind
    document.querySelector(".card > .content > .elem > div > .wind").innerHTML = `${data.hourly.windspeed_10m[14]} km/h`;
}

async function getCity(text) {
    const link = `https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=15&language=en&format=json`;

    const response = await fetch(link);
    var data = await response.json();

    console.log(data);

    return data;
}

async function main() {
    let cityInput = document.getElementsByClassName("town")[0];
    cityInput.addEventListener('input', async () => {
        const cityData = await getCity(cityInput.value);
        getWeather(cityData.results[0].name, cityData.results[0].latitude, cityData.results[0].longitude, cityData);
    });
}

main();