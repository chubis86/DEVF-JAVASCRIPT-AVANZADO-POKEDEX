const api = "https://pokeapi.co/api/v2/pokemon/?limit=1500";
const buscador=document.querySelector('#buscador');
const tarjetas=document.querySelector('#tarjetas');

//Esto es para saber cuántos pokemons son y dividirlos en secciones de 100








cargarDatos();

//Función para obtener el listado general de los pokemons
async function cargarDatos() {
	const resultado = await fetch(api);
	if (!resultado.ok) {
		throw new Error(`HTTP error! status: ${resultado.status}`);
	}
	const resultado2 = await resultado.json();
    const datos = resultado2.results;
    imprimir(datos);
        
}

//Función para obtener las imágenes de cada pokemon e imprimir sus tarjetas en pantalla
async function imprimir(datos){
    //buscador.innerHTML=datos;
    let tarjeta='';
    for(let x in datos){
        //Datos de la imagen
        let imagenURL= datos[x].url;
		//Obtenemos la imagen de la url
        let imagen = await fetch(imagenURL);
        let imagen2 = await imagen.json();
		
        tarjeta+=
        `<div class='tarjeta'>
            <div class='tarjetaTitulo'>
                ${datos[x].name}
            </div>    
            <div class='tarjetaImagen'>
                <img class='tarjetaImagenPokemon' src='${imagen2.sprites.other.home.front_default}'>
            </div>
        </div> `; 
        
    }
    tarjetas.innerHTML=tarjeta;
    
}

//Función para obtener la imagen de los pokemons
async function imagenPokemon(url) {
	const resultado = await fetch(url);
	if (!resultado.ok) {
		throw new Error(`HTTP error! status: ${resultado.status}`);
	}
	const datos = await resultado.json();
    //return datos.results;
    console.log(datos);
}

