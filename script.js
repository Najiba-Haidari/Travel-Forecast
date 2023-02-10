function getInfo(){
    var newName=document.getElementById("query");
    var cityName=document.getElementById("cityName");
    cityName.innerHTML="--"+newName.value+"--"
 
 }
//Setup Variables
var getLocation=document.querySelector('#query')
var key ="9d62654932252f98fde48404208ef632"
var searchBtn=document.querySelector("#search-btn")
var map;
//Add Event Listener to button
searchBtn.addEventListener('click', function setQuery(e) {
 e.preventDefault()
 var searchResult = getLocation.value
 getInfo();
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
           map && map.remove();
        map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
           
    
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
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '30697a497fmsh544d3997e68b17dp1335f7jsncd515ea018b6',
		'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
	}
};

fetch('https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/CO/'+getLocation+'/West%20Bloomfield/0', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));