$(document).ready(function () {
	var lat;
	var long;
	var temperature;
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
						$('#weather').html('<h1>' + response.weather[0].main + '</h1>');
						temperature = response.main.temp;
						temperature -= 273;
						$('#temp > h1').html('<h1>' + Math.round(temperature * 100) / 100 + '</h1>');
						$('#temp > button > h1').html('&#8451');
						// console.log(response.weather[0].main);
						// console.log(response.name);
					}
				});
			});
		}
		
	}
	updateWeather();

	$('#unit').click(function () {
		var text = $('#unit > h1').text();
		console.log(text);
		console.log('working');
	});
});