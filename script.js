//Fetching all relevant data elements
const dataContainerList = document.querySelectorAll('div[data-api-term]');
const mainInfoElement = document.querySelector('.main-info');
const additionalInfoElement = document.querySelector('.additional-info');
//Clear the output whenever it need not be displayed
function clearOutput(){
  mainInfoElement.style.visibility = 'hidden';
  additionalInfoElement.style.visibility = 'hidden';
}
function displayOutput(){
  mainInfoElement.style.visibility = 'visible';
  additionalInfoElement.style.visibility = 'visible';
}
function handleError(err){
  clearOutput();
  const errorInfoElement = document.querySelector('.error-info');
  errorInfoElement.style.order = '-1';
  errorInfoElement.textContent = 'Error: ' + err.message;
}

//We initially don't display any output
clearOutput();

let weather = {
  tempUnit: 'c',
  searchPromise: null, //A promise for the weather data requested by the user
  getWeatherPromise: async function(location){
    let apiKey = '9ccfde44cd99c120bad6a7b986a92fb2';
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`, {
      mode: 'cors',
    });
  
    if(!response.ok){
      const error = await response.json();
      throw error;
    }
  
    weatherPromise = await response.json();
    return weatherPromise;
  },
}

//Factory Function to create objects that control the display
function createWeatherDataObject(dataContainer){
  
  /*Field metadata,
  e.g. fieldCategory = main, fieldName = temp and 
  fieldValue is what we are trying to fetch*/ 
  let fieldCategory= dataContainer.getAttribute('data-category');
  let fieldName = dataContainer.getAttribute('data-api-term');
  let fieldValue;

  //Below is a function that updates the HTML elements
  const updateDataContainer = function(weatherObject){
    if(fieldName != 'description'){
      fieldValue = weatherObject[fieldCategory][fieldName];
      //Convert temperature values based on the tempUnit
      if(dataContainer.classList.contains('temperature')){
        weather.tempUnit === 'c' 
        ? fieldValue = Math.round(fieldValue - 273.15) + ' C°'
        : fieldValue = Math.round(fieldValue * (9/5) - 459.67) + ' F°';
      }
    } else{
      fieldValue = weatherObject.weather[0].description;
    }
    
    dataContainer.querySelector('.data').textContent
      = fieldValue; 

  };

  return {updateDataContainer};

}

//Display weather data for the location requested by the user
searchBarForm = document.querySelector('.search-bar-form');
searchBarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //Clear Error
  document.querySelector('.error-info').style.order = '1';
  document.querySelector('.error-info').textContent = '';
  let location = searchBarForm.querySelector('#search-bar').value;

  weather.searchPromise = weather.getWeatherPromise(location).then( 
    (data) => {
      dataContainerList.forEach((dataContainer) => {
        createWeatherDataObject(dataContainer)
        .updateDataContainer(data);
      });
      displayOutput();
      return data; //Returning data so that the promise can be reobserved
    }).catch(handleError);
});

//Convert weather data
unitToggleButton = document.querySelector('.unit-toggle');
unitToggleButton.addEventListener('click', (e) => {
  if(weather.searchPromise === null){
    return;
  }

  if(weather.tempUnit === 'c'){
    weather.tempUnit = 'f';
  } else {
    weather.tempUnit = 'c';
  }

  weather.searchPromise.then((data) => {
    dataContainerList.forEach((dataContainer) => {
      if(!dataContainer.classList.contains('temperature')){
        return;
      } else {
        createWeatherDataObject(dataContainer)
        .updateDataContainer(data);
      }
    });
  }).catch(handleError);
});

