//Fetching all relevant data elements
const dataContainerList = document.querySelectorAll('div[data-api-term]');

let weatherMetaData = {
  tempUnit: 'c',
  weatherObject: {},
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
        weatherMetaData.tempUnit === 'c' 
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

let fetchedWeatherPromise;

//Display weather data for the location requested by the user
searchBarForm = document.querySelector('.search-bar-form');
searchBarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let location = searchBarForm.querySelector('#search-bar').value;

fetchedWeatherPromise = weatherMetaData.getWeatherPromise(location).then( 
    (data) => {
      dataContainerList.forEach((dataContainer) => {
        createWeatherDataObject(dataContainer)
        .updateDataContainer(data);
      });
    }).catch((err) => console.log(err.message));
});

//Convert weather data
unitToggleButton = document.querySelector('.unit-toggle');
unitToggleButton.addEventListener('click', (e) => {
  if(weatherMetaData.tempUnit === 'c'){
    weatherMetaData.tempUnit = 'f'
  } else {
    weatherMetaData.tempUnit = 'c'
  }
  

});