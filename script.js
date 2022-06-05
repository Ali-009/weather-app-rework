//Fetching all relevant data elements
const dataContainerList = document.querySelectorAll('div[data-api-term]');

<<<<<<< HEAD
async function getWeatherData(locationInput){

    let apiKey = '9ccfde44cd99c120bad6a7b986a92fb2';
=======
let weatherMetaData = {
  tempUnit: 'C',
  location: 'Dubai' //This has a dummy value for the time being
}

//Factory Function to create a WeatherDataObject
function createWeatherDataObject(dataContainer){
>>>>>>> script-rework
  
  /*Field metadata,
  e.g. fieldCategory = main, fieldName = temp and 
  fieldValue is what we are trying to fetch*/ 
  let fieldCategory= dataContainer.getAttribute('data-category');
  let fieldName = dataContainer.getAttribute('data-api-term');
  let fieldValue;
  
  //Fetchnig Weather Data
  const getFieldValue = async function(){
    let apiKey = '9ccfde44cd99c120bad6a7b986a92fb2';
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${weatherMetaData.location}&appid=${apiKey}`);
  
    if(!response.ok){
      const error = await response.json();
      throw error;
    }
  
    let data = await response.json();
<<<<<<< HEAD
  
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


=======
    if(fieldName != 'description'){
      fieldValue = data[fieldCategory][fieldName];
    } else{
      fieldValue = data.weather[0].description;
    }

    return fieldValue;

  };

  //Below is a function that uses getFieldValue to update the displayed HTML
  const updateDataContainer = function(){
    let fieldValuePromise = getFieldValue(location);

    fieldValuePromise.then((fieldValue) => {
      const dataElement 
      = dataContainer.querySelector('.data');
      dataElement.textContent = fieldValue;
    }).catch((err) => console.log(err.message));
  };

  return {getFieldValue, updateDataContainer};

}

dataContainer = Array.from(dataContainerList)[8];
let mainTempDemo = createWeatherDataObject(dataContainer);
mainTempDemo.updateDataContainer();
>>>>>>> script-rework
