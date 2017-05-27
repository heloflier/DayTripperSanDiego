

console.log("hello");



//Imbedded map
var embedAPIkey = "AIzaSyADcGH--swBBpg6-7tYcluAngele15Sz6M";


var userinput   = "hungtington beach";
$("#map1").attr("src","https://www.google.com/maps/embed/v1/place?key="+embedAPIkey+"&q="+userinput);

var lat;
var long;
//Google long. lat. coordinates GEOCODING
var coordinatequeryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+userinput+"&key="+embedAPIkey;
var nearbyqueryURL = "";
var map;

//We need initMap for google library to work, doesn't necessarily need to define just declaration
function initMap() {
	// body...
}


//This AJAX call the google geocoding API for the user's long/lat and find places/weather near that coordinates
$.ajax({
          url: coordinatequeryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          lat = (response.results[0].geometry.location.lat);
          long = (response.results[0].geometry.location.lng);
          console.log("Lat: "+lat);
          console.log("Lng: "+long);

          function initMap() {
		  map = new google.maps.Map(document.getElementById('map1'), {
		  });

		  var service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
		  location: {lat: lat, lng: long},
		  radius: 500,
    	  type: ['food'],
    	  name: "asian"
		  }, callback);
		}
		initMap();

})

//Google nearby Places

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		console.log(results);	
		console.log(results[0].name);
		console.log(results[1].name);

		for(var i=0; i<results.length;i++){
		$(".mappanel").append("<h3>"+results[i].name+"</h3>");
		$(".mappanel").append("Rating: "+results[i].rating);
		}
	}
}


      