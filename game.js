let randomCountryElement = document.querySelector("#random-country");
let userAnswerElement = document.querySelector("#user-answer");
let submitButton = document.querySelector("#submit-answer");
let resultTextElement = document.querySelector("#result");

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array country names and two-letter country codes is provided in the countries.js file.
// Your browser treats all JavaScript files included with script elements as one big file,
// organized in the order of the script tags. So the countriesAndCodes array from countries.js
// is available to this script.

console.log(countriesAndCodes); // You don't need to log countriesAndCodes - just proving it is available

// TODO when the page loads, select an element at random from the countriesAndCodes array
let randomSelect = Math.floor(Math.random() * countriesAndCodes.length);
let randomCountry = countriesAndCodes[randomSelect]; // use the random number to specify which country in the array
let randomCountryCode = randomCountry["alpha-2"]; // get the country code from random country into a variable
console.log(randomCountryCode); // make sure you have the country code
// TODO display the country's name in the randomCountryElement
randomCountryElement.innerHTML = `${randomCountry.name}`;

// create url for the specific country json
let url =
  "https://api.worldbank.org/v2/country/" + randomCountryCode + "?format=json"; // set url to include the country code we need for the random country
console.log(url); // make sure we have the correct url for the specific random country

// TODO add a click event handler to the submitButton.  When the user clicks the button,
// submitButton.addEventListener("click", function () {
//   // click event handler
//   let userAnswer = userAnswerElement.value; // save the users answer in a variable
//   console.log(userAnswer);
// });
//  * read the text from the userAnswerElement

//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
fetch(url) // return a promise
  .then((res) => res.json()) // return json information from the url
  .then((countryData, userAnswer) => {
    // process data from url
    console.log(userAnswer);
    console.log(countryData); // log data into console
    let cityName = countryData[1][0].capitalCity; // get the correct capitol city name into a variable
    console.log(cityName);
    submitButton.addEventListener("click", function () {
      // click event handler
      let userAnswer = userAnswerElement.value; // save the users answer in a variable
      console.log(userAnswer); // log the users answer in console
      if (userAnswer == cityName) {
        // if the users answer matches the correct city, dispaly accordingly
        console.log("true");
        alert("that is correct!");
      } else {
        console.log("false");
        alert("Sorry, that is wrong.");
      }
    });
  })
  //  * Verify no errors were encountered in the API call. If an error occurs, display an alert message.
  .catch((err) => {
    console.log("Error", err);
  });

//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare the actual capital city to the user's answer.

//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong.
//      For example 'Correct! The capital of Germany is Berlin' or 'Wrong - the capital of Germany is not G, it is Berlin'

// TODO finally, connect the play again button. Clear the user's answer, select a new random country,
// display the country's name, handle the user's guess. If you didn't use functions in the code you've
// already written, you should refactor your code to use functions to avoid writing very similar code twice.
