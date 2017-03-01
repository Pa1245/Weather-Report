$(document).ready(function () {
	var lat;
	var long;
	var temp_cel;
	var temp_far;
	var weather_desc;
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
						if (weather_desc == 'Clear') {
							console.log(weather_desc);
							$('#weather-img').html('<img src=\'http://www.gannett-cdn.com/-mm-/719e7bcee360ff12d4581723688418bf93195dad/c=0-0-449-338&r=x404&c=534x401/local/-/media/MIGroup/PortHuron/2014/09/16/1410873237000-SUNNY.jpg\'>');
						}
						$('#weather-img > img').addClass('img-responsive');
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