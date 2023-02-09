//As a user I want to be able to pull up the page and see a search bar
// add event listener to the search button
// needs to perform a fetch for getLocation
// if search is invalid show 404 error dynamically populated on the page
var getLocation = document.querySelector("#query")
var searchBtn = document.querySelector('#search-btn')
var fiveDayContainer = document.querySelector('#card')
var key = '11a69b2b8d9505e35af4031a2fe1c8ca'
searchBtn.addEventListener('click', function setQuery(e) {
    e.preventDefault()
    var searchResult = getLocation.value
    getGeoLocation(searchResult)
});


var getGeoLocation = function (searchResult) {
    var geoCode = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchResult + '&appid=' + key;
    fetch(geoCode)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat
            var lon = data[0].lon

            console.log(lat, lon)
            getForecast(lat, lon);
        })

}
var getForecast = function (lat, lon) {

    var weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key;
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var sunrise = data.city.sunrise
            console.log(sunrise);
            var sunset = data.city.sunset
            console.log(sunset);
            var humidity = data.list[0].main.humidity
            console.log(humidity)
            var maxTemp = data.list[0].main.temp_max
            console.log(maxTemp)

            for (let index = 0; index < data.list.length; index = index + 8) {
                humidity = (data.list[index].main.humidity)
                maxTemp = (data.list[index].main.temp_max)
                maxTemp = ((maxTemp-273.15)*1.+32).toFixed()


                console.log(humidity)
                var containerDiv = document.createElement('div')
                var humidityEl = document.createElement('p')
                var maxTempEl = document.createElement('p')
                humidityEl.textContent = ("Humidity: " + humidity + '%');
                maxTempEl.textContent = ('High Temp: ' + maxTemp + '°')
                containerDiv.append(humidityEl)
                containerDiv.append(maxTempEl)
                fiveDayContainer.append(containerDiv)
                

            }
        }


        )
}



// When I input a search I see a 5 day forecast for the area along with a list of hiking trails nearby
    //fetch lat and lon through our geoCode API
    // use that data to create our URL for the five day forecast
    // create divs and internal elements to host this information
    //dynamically populate the divs and elements

// When I look at the forecast I see temp, rain, wind, humidity, sunrise and sunset 
    //create "card" div with list or p elements to note all the specific weather information
    // use an API to show the weather icons

// When I look at the trails list, I can see photos of the trails and maybe links to trail websites or reviews
    // fetch API data to pull list of trails
    // get photos to populate with the trails on our page 