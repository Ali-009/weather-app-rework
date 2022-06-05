
async function getWeatherData(locationInput){

    let apiKey = '9ccfde44cd99c120bad6a7b986a92fb2';
  
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}`);
  
    if(!response.ok){
      throw 'Weather Data Not Found';
    }
  
    let data = await response.json();
  
    /*let weatherKelvin = data.main.temp;
    let weatherCelsius = Math.round(weatherKelvin - 273.15);
    let weatherFahrenheit = Math.round(weatherKelvin * (9/5) - 459.67);
  
    let weatherDescription = data.weather[0].description;
  
    return {weatherCelsius, weatherFahrenheit, weatherDescription};*/

    return data;
}

/*To constantly update the UI, we need an asynchronous function*/
//For that to happen, we need to keep calling getWeatherData in a loop
//Data Containers is an array of elements onto which we display the data we are asynchronously fetching


