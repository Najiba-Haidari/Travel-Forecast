//Setup Variables
var getLocation=document.querySelector('#query')
var key ="9d62654932252f98fde48404208ef632"
var searchBtn=document.querySelector("#search-btn")
//Add Event Listener to button
searchBtn.addEventListener('click', function setQuery(e) {
 e.preventDefault()
 var searchResult = getLocation.value
 getGeoLocation(searchResult);

});
//Get lat and lon
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
 var weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key+'&units=imperial';
 fetch(weatherURL)
     .then(function (response) {
      return response.json();
     })
     .then(function (data){
         console.log(data)
         for(i=0;i<5;i++){
         document.getElementById("day"+(i+1)+"Mn").innerHTML="Min: "+Number(data.list[i].main.temp_min).toFixed(2)+"°"
         }
         for(i=0;i<5;i++){
             document.getElementById("day"+(i+1)+"Mx").innerHTML="Max: "+Number(data.list[i].main.temp_max).toFixed(2)+"°"
         }
         for(i=0;i<5;i++){
             document.getElementById("day"+(i+1)+"H").innerHTML=" Humidity: "+Number(data.list[i].main.humidity).toFixed(0)+"%"
         }
         for(i=0;i<5;i++){
             document.getElementById("day"+(i+1)+"W").innerHTML="Wind: "+Number(data.list[i].wind.speed).toFixed(0)+" mph"
         }
         for(i=0;i<5;i++){
             document.getElementById("img"+(i+1)).src="http:openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png";
             }
         
         
 })

}
//Day 
var d =new Date();
var weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function CheckDay(day){
 if(day+d.getDay()>6){
     return day+d.getDay()-7;
 }
 else{
     return day+d.getDay();
 }
}
for(i=0;i<5;i++){
 document.getElementById("day"+(i+1)).innerHTML=weekday[CheckDay(i)];
}
