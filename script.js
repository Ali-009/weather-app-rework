//Fetching all relevant data elements
const dataContainerList = document.querySelectorAll('div[data-api-term]');

let weatherMetaData = {
  tempUnit: 'C',
  location: 'Dubai' //This has a dummy value for the time being
}

//Factory Function to create a WeatherDataObject
function createWeatherDataObject(dataContainer){
  
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