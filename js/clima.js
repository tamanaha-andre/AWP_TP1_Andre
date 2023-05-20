const APIKEY = '8bdfb0d58a47eb2bc102930a3daa33e2';	
const URL = 'https://api.openweathermap.org/data/2.5/weather';
const idioma = 'sp';
const button = document.getElementById('sendButton');
const inputPais = document.getElementById('searchPais');
const inputCiudad = document.getElementById('searchCiudad');
const humedad = '%';
const velocidaddelviento = 'm/s';
const celcius = '°C';
const presion = 'hPa';
const camposacompletar = 'Por ingresa todos los campos.';
let tarjetadelclima = document.getElementById('tableDatosClima');
let ubicacion = document.getElementById('lugar');
let resultadosdelclima = document.getElementById('climatemperatura');
let errorbusqueda = document.getElementById('errorSearch');
let mensaje = document.getElementById('mensaje');

button.addEventListener("click", ()=>{
	const pais = inputPais.value;
	const ciudad = inputCiudad.value;
		if(!isNaN(pais) || !isNaN(ciudad)){
			console.log('error');
			errorbusqueda.className = 'errorSearch';
			contentMensaje.innerHTML = camposacompletar;

		}else{
			errorbusqueda.className = 'sinError';
			mensaje.innerHTML = '';
			buscadordeclima(pais,ciudad);
		}
});

function buscadordeclima(pais,ciudad){

	let a = `${URL}?q=${ciudad},${pais}&appid=${APIKEY}&units=metric`;
	
	console.log(a);	
			fetch(`${URL}?q=${ciudad},${pais}&appid=${APIKEY}&lang=${idioma}&units=metric`)
			.then(function(response){return response.json();

			}).then(function(json){
				datosdelclima(json); 
			}).catch(err=>{console.log(`Hubo un error: ${err}`)
		})

};

function datosdelclima(json){
		let temperatura = json.main.temp;
		temperatura = Math.trunc(temperatura);
		let lat = json.coord.lat;
		let lon = json.coord.lon;
		let tempmin = json.main.temp_min;
		tempmin = Math.trunc(tempmin);
		let tempmax = json.main.temp_max;
		tempmax = Math.trunc(tempmax);
		let temphumedad = json.main.humidity;
		let temppresion = json.main.pressure;
		let sensacionTermica = json.main.feels_like;
		sensacionTermica = Math.trunc(sensacionTermica);
		let velViento = json.wind.speed;
		let ciudadJson = json.name;
		let paisJson = json.sys.country;
		let arrayTemperatura = json.weather;
		

		localStorage.latitud = JSON.stringify(lat);
		localStorage.longitud = JSON.stringify(lon);
		
		console.log('Temperatura: ', temperatura, celcius);
		console.log('minima: ', tempmin);
		console.log('maxima: ', tempmax);
		console.log('humedad: ', temphumedad);
		console.log('presion: ', temppresion);
		console.log('sensacion termica: ', sensacionTermica);
		
		ubicacion.innerHTML = `<h2 class="miciudad">${ciudadJson}, ${paisJson}</h2>`;
		tarjetadelclima.innerHTML = 
		
			`<ul>
				<li>Min: ${tempmin} ${celcius}</li>
				<li>Max: ${tempmax} ${celcius}</li>
				<li>Humedad: ${temphumedad} ${humedad}</li>
				<li>Presión Atmosferica: ${temppresion} ${presion}</li>
				<li>Sensación Termica: ${sensacionTermica} ${celcius}</li>	
				<li>Velocidad del viento: ${velViento} ${velocidaddelviento}</li>
			</ul>`;
		
		for(let i = 0; i < arrayTemperatura.length; i++){
			let iconotemperatura = arrayTemperatura[i].icon;
			let iconodeltiempo = arrayTemperatura[i].description;
			console.log('Icono: ', iconotemperatura);
			
	
			let mostramosicono = `https://openweathermap.org/img/wn/${iconotemperatura}@2x.png`;
			    resultadosdelclima.innerHTML = `
				<img src="${mostramosicono}" alt="${iconodeltiempo}" />
				<p>${temperatura} ${celcius}</p>`;
		}
}