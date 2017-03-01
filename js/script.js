$(document).ready(function () {
	var lat;
	var long;
	var temp_cel;
	var temp_far;
	var weather_desc;
	var iconId;
	var descript;
	function updateWeather() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (location) {
				lat = location.coords.latitude;
				long = location.coords.longitude;
				// console.log(location);
				$.ajax({
					url : 'http://api.openweathermap.org/data/2.5/weather',
					data : {
						lat : location.coords.latitude,
						lon : location.coords.longitude,
						APPID : '1441c8e897ff1a1ed70ee7c63677d08c'
					},
					success : function (response) {
						$('#city').html(response.name + ',' + response.sys.country);
						$('#weather-box > ul > h1').text('Weather');
						$('#weather').html('<h1>' + response.weather[0].main + '</h1>');
						weather_desc = response.weather[0].main;
						console.log(weather_desc);
						temp_cel = response.main.temp;
						temp_cel -= 273;
						temp_far = temp_cel*1.8 + 32;
						$('#temp-box > ul > h2').text('Temperature');
						$('#temp > h1').html(Math.round(temp_cel * 100) / 100 + '&#176');
						$('#temp > button > h1').html('C');
						// console.log(response.weather[0].main);
						// console.log(response.name);
						iconId = response.weather[0].icon;
						descript = response.weather[0].description;
						$('#icon').attr('src', "http://openweathermap.org/img/w/" + iconId + ".png");
						$("body").removeClass();
     					switch (descript) {
        					case 'clear sky':
					            $("body").addClass("clear-sky");
					        break;

					        case 'broken clouds':
					        case 'few clouds':
					        case 'scattered clouds':
					            $("body").addClass("few-clouds");
					        break;

					        case 'shower rain':
					        case 'light rain':
					        case 'heavy rain':
					        case 'rain':
					           $("body").addClass("rain");
					        break;

					        case 'thunderstorm':
					             $("body").addClass("thunder-storm");
					        break;

					        case 'snow':
					            $("body").addClass("snow");
					        break;

					        case 'mist':
					            $("body").addClass("mist");
					        break;

					        default:
					            $("body").addClass("thunder-storm");
					    }
					}
				});
			});
		}
		
	}
	updateWeather();

	$('#unit').click(function () {
		var text = $('#unit > h1').html();
		console.log(text);
		console.log('working');
		if($('#unit > h1').text() == 'C') {
			$('#unit > h1').html('F');
			$('#temp > h1').html(Math.round(temp_far * 100) / 100 + '&#176')
		}
		else {
			$('#unit > h1').html('C');
			$('#temp > h1').html(Math.round(temp_cel * 100) / 100 + '&#176');
		}
	});
});