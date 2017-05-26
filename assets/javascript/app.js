console.log("hello");

//Imbedded map
var embedAPIkey = "AIzaSyADcGH--swBBpg6-7tYcluAngele15Sz6M";


var userinput   = "hungtington beach";
$("#map").attr("src","https://www.google.com/maps/embed/v1/place?key="+embedAPIkey+"&q="+userinput);

var lat = "";
var long = "";
//Google long. lat. coordinates
var coordinatequeryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+userinput+"&key="+embedAPIkey;
var nearbyqueryURL = "";

$.ajax({
          url: coordinatequeryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          lat = String(response.results[0].geometry.location.lat);
          long = String(response.results[0].geometry.location.lng);
          console.log("Lat: "+lat);
          console.log("Lng: "+long);
          nearbyqueryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+long+"&radius="+radius+"&types="+typesofActivity+"&name="+name+"&key="+embedAPIkey;


        $.ajax({
        url: nearbyqueryURL,
        method: "GET"
        }).done(function(response) {
          	console.log(response);
          	console.log("1st: "+response.results[0].name);
          	console.log(response.results[0].rating);
          	console.log("2nd: "+response.results[1].name);
          	console.log(response.results[1].rating);

		})
})

//Google nearby Places
var typesofActivity = "food";
var radius          = 500;
var name            = ""





