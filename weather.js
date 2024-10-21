// start of script make a request to this Api
// Use data in the response to make HTML elements for the table that shows the weather forecast.

let weatherApiUrl = "https://api.weather.gov/gridpoints/MPX/116,72/forecast";

let forecastTableElement = document.querySelector("#weather-forecast");
// .then because we don't know when/ how long it will take to get all of the data we need.
fetch(weatherApiUrl)
  .then((response) => {
    // response is bytes of data (ones and zeros)
    // take the response data and convert it from bytes to JSON - javascript objects and arrays that our program can use
    // a promise will tell you once they have the results/tell you if there is an error
    let JsonProcessingPromise = response.json(); // .json is built in JS method
    return JsonProcessingPromise;
  })
  .then((processedJson) => {
    // processedJson is javascript objects we can use in the program
    //console.log(processedJson)
    let forecastProperties = processedJson.properties;
    //console.log(forecastProperties)
    let forecastArray = forecastProperties.periods;
    //console.log(forecastArray)
    forecastArray.forEach((forecast) => {
      //console.log(forecast)
      // for every forecast period, need a new table row
      let tableRowElement = document.createElement("tr"); // tr is table row
      // for each piece of information, need one table data (td) element
      let timePeriod = forecast.name;
      console.log(timePeriod);

      let timePeriodTDElement = document.createElement("td");
      timePeriodTDElement.innerHTML = timePeriod; // set the text to the data read from api
      // add to the td to the table row
      tableRowElement.appendChild(timePeriodTDElement);

      // todo make the other td elements

      // use the temperature property for temperature
      let temperatureText = forecast.temperature 
      let temperatureTDElement = document.createElement('td')
      temperatureTDElement.innerHTML = temperatureText
      tableRowElement.appendChild(temperatureTDElement)


      // use the icon property to get the url for the icon
     // let iconURL = forecast.icon 
      //previewImage.src = iconURL
      //let iconTDElement = document.createElement('td')
     // iconTDElement.innerHTML = iconURL
    // tableRowElement.appendChild(iconTDElement)


      // use the detailedForecast property for text description
      let forecastDetailText = forecast.detailedForecast 
      let forecastDetailTDElement = document.createElement('td')
      forecastDetailTDElement.innerHTML = forecastDetailText
      tableRowElement.appendChild(forecastDetailTDElement)
      // use the windSpeed and windDirection for teh wind forecast
        let windSpeedText = forecast.windSpeed 
        let windSpeedTDElement = document.createElement('td')
        windSpeedTDElement.innerHTML = windSpeedText
        tableRowElement.appendChild(windSpeedTDElement)
      // make a new img element and set the source to the icon propertys value
      
      // see wikipedia example from 2 weeks ago
      // make a td to contain the img element

      // add the table row to the table
      forecastTableElement.appendChild(tableRowElement);
    });
  });
