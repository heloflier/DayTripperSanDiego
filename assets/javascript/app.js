


var embedAPIkey = "AIzaSyADcGH--swBBpg6-7tYcluAngele15Sz6M";
var userinput;
var PoI = "food";
var nameofPOI = "";


var lat;
var long;
var numIndex = 1;

/*Google long. lat. coordinates GEOCODING API*/
var coordinatequeryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+userinput+"&key="+embedAPIkey;
var nearbyqueryURL = "";
var map;
var infowindow;
var results;
$("#options").on("change", function(){
	PoI = $(this).val();
})

$("#searchplaces").on("submit", function(){
	userinput   = $("#destination").val();
	console.log(userinput);
	console.log("here!");
	nameofPOI   = $("#namepoi").val();
	coordinatequeryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+userinput+"&key="+embedAPIkey;
	event.preventDefault();
	initMap();

});

function initMap() {
	$.ajax({
		url: coordinatequeryURL,
		method: "GET"
	}).done(function(response) {

		console.log(response);
		console.log(userinput);
		lat = (response.results[0].geometry.location.lat);
		long = (response.results[0].geometry.location.lng);
		console.log("Lat: "+lat);
		console.log("Lng: "+long);
		console.log("Point of Interest: "+PoI);
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: lat, lng: long},
			zoom: 15
		});
		infowindow = new google.maps.InfoWindow();
		var service = new google.maps.places.PlacesService(map);
		service.nearbySearch({
			location: {lat: lat, lng: long},
			radius: 500,
			type: [PoI],
			name: nameofPOI
		}, callback);

	});
	weatherMAP(lat,long);
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		$(".placespanel").empty(); 
		for(var i=0; i<results.length;i++){
			try{
        //Title of place
        var title = $("<div class='div-save'>");
        title.append("<h3>"+results[i].name+"</h3>");
        //Rating on title if exist
        if(results[i].rating!=undefined){
        	title.append("<p class='poi-rating'>Rating: "
        		+results[i].rating+"</p>");
        }
        //Address on Title
        title.append("<p class='poi-address'>"+results[i].vicinity+"</p>");
        title.css("background-color","black");
        title.css("color","white");
        title.css("text-align","center");
        title.css("padding","3px 0px 7px 0px");
        title.css("margin","15px 0px 0px 0px");
        $(".placespanel").append(title);

        // // Adding save button if user is logged in
        // if (user != null) {
        //  console.log('button append');
    //          title.append(btn);
        // };
        //Getting Picture of each place and append it to div
        var imgDiv = $("<div>")
        var picUrl = results[i].photos[0].getUrl({'maxWidth': 1000});
        var picDiv = $("<img>");
        picDiv.attr("src", picUrl);
        picDiv.css("max-width","100%");
        imgDiv.append(picDiv);
        $(".placespanel").append(imgDiv);
        createMarker(results[i]);     
    }
    catch(err){
    }
}
}
}


function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
		label: numIndex.toString()
	});
	numIndex++;
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}


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
	});
};

var day =[];
console.log("DATE:"+moment().format('dddd MMM Do'));

function callWeather(response) {

	$('#wx').empty();
	$("#5days").empty();
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