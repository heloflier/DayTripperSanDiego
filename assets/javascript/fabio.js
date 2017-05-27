// day tripper san diego
// project
// $("button").on("click", function() {
    //   var person = $(this).attr("data-person");

    console.log('start');
    var api = "63f2fa3cfc2e61381b22c657bc65c0cf"
    var lat = "37.42";
    var long = "-122.08";
    if (document.location.protocol.indexOf('file') >= 0) {
      console.log(document.location.protocol.indexOf());
      var queryURL = 
        "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat +  
        "&lon=" + long + "&cnt=5" + "&APPID=" + api;
    }
    else {
      var queryURL = 
        "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat +  
        "&lon=" + long + "&cnt=5" + "&APPID=" + api;
        // "https://api.openweathermap.org/data/2.5/forecast?id=2172797&APPID=63f2fa3cfc2e61381b22c657bc65c0cf"
    };

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        callWeather(response);
      	console.log(response);
      });

    function callWeather(response) {
      
      $('#wx').empty();
      for (var i = 0; i < 5; i++) {
        var wx = response;
        var city = wx.city.name;
        var weather = wx.list[i]
          .weather[0].description;
        var icon = wx.list[i]
          .weather[0].icon;
        console.log(city);
        console.log(weather);
        console.log(icon);

        var gifDiv = $("<div class='icon'>");
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        var p = $("<p>").append('<span>' + weather + '</span>' );
        gifDiv.append("<img src='" + iconUrl  + "'>");
        gifDiv.append(p);
        $('#wx').append(gifDiv);
      };
    };
