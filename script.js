//Fetching all relevant data elements
const dataContainerList = document.querySelectorAll('div[data-api-term]');

let weatherMetaData = {
  tempUnit: 'C',
  location: 'dubai' //This has a dummy value for the time being
}

//Factory Function to create a WeatherDataObject
function createWeatherDataObject(dataContainer){
  
  let fieldCategory= dataContainer.getAttribute('data-category');
  let fieldName = dataContainer.getAttribute('data-api-term');
  let fieldValue;
  
  const getFieldValue = async function(){

    let apiKey = '9ccfde44cd99c120bad6a7b986a92fb2';
  
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${weatherMetaData.location}&appid=${apiKey}`);
  
    if(!response.ok){
      throw 'Weather Data Not Found';
    }
  
    let data = await response.json();
    
    if(fieldCategory == 'main'){
      fieldValue = data.main[fieldName];
    } else if(fieldCategory == 'wind'){
      fieldValue = data.wind[fieldName];
    } else {
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
    }).catch(console.log);
  };

  return {getFieldValue, updateDataContainer};

}

dataContainer = Array.from(dataContainerList)[8];
let mainTempDemo = createWeatherDataObject(dataContainer);
mainTempDemo.updateDataContainer();