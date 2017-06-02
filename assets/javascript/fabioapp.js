

console.log("hello");



//Imbedded map
var embedAPIkey = "AIzaSyADcGH--swBBpg6-7tYcluAngele15Sz6M";

//We need initMap for google library to work, doesn't necessarily need to define just declaration
function initMap() {
	// body...
};

var userinput;
var PoI = "restaurant";
var nameofPOI = "";

$("#options").on("change", function(){
	PoI = $(this).val();
})

$("#searchplaces").on("submit", function(){
	userinput   = $("#destination").val();
	console.log(userinput);
	nameofPOI   = $("#namepoi").val();
	event.preventDefault();



$("#map1").attr("src","https://www.google.com/maps/embed/v1/place?key="+embedAPIkey+"&q="+userinput);

var lat;
var long;
//Google long. lat. coordinates GEOCODING API
var coordinatequeryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+userinput+"&key="+embedAPIkey;
var nearbyqueryURL = "";
var map;




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
          console.log("Point of Interest: "+PoI);
          function initMap() {
			  map = new google.maps.Map(document.getElementById('map1'), {
			  });

			  var service = new google.maps.places.PlacesService(map);
	          service.nearbySearch({
			  location: {lat: lat, lng: long},
			  radius: 500,
	    	  type: [PoI],
	    	  name: nameofPOI
			  }, callback);
		  }

		  initMap();
		  weatherMAP(lat,long);

})
//Google nearby Places
});
function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		console.log(results);	
		console.log(results[0].name);
		console.log(results[1].name);

    var user = firebase.auth().currentUser;

		for(var i=0; i<results.length;i++){
      var name = results[i].name;
      var btnDiv = $("<div class='div-save'>");
        		 
      if (user) {
        var btn = $('<button type="button" class="btn btn-default btn-save">Save</button>');
        console.log('user'+user);
        btnDiv.append(btn);
      };

      btnDiv.append("<h3>"+name+"</h3>");
  		btnDiv.append("<p>Rating: "+results[i].rating+'<br><br>');
      
      $('.mappanel').append(btnDiv);
		};
	};
};

//WEATHER INFO
// day tripper san diego

function weatherMAP(latitude,longitude){
    console.log('start');
    var api = "63f2fa3cfc2e61381b22c657bc65c0cf"
    var lat = latitude;
    var long = longitude;
    var queryURL = 
        "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat +  
        "&lon=" + long + "&cnt=5" + "&APPID=" + api;
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        callWeather(response);
      	console.log(response);
      });
  };

var day =[];
console.log("DATE:"+moment().format('dddd MMM Do'));

function callWeather(response) {  

      $('#wx').empty();
      for (var i = 0; i < 5; i++) {
        var wx = response;
        var city = wx.city.name;
        var weather = wx.list[i]
          .weather[0].description;
        var icon = wx.list[i]
          .weather[0].icon;

        //Date and weather formattinig  
        var td = $("<td>");
        var th = $("<th>");

        //GET 5 DAYS OF WEEK FROM NOW
        var date = moment().add(i, 'days');

        th.addClass("date");
        th.append(moment(date).format('dddd MM/DD'));

        var gifDiv = $("<div class='icon'>");
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        var p = $("<p>").append('<span>' + weather + '</span>' );
        gifDiv.append("<img src='" + iconUrl  + "'>");
        gifDiv.append(p);
        td.append(gifDiv);
        $("#wx").append(td);
        $("#5days").append(th);
      };
};

      