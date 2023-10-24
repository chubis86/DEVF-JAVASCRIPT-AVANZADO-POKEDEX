const api = "https://pokeapi.co/api/v2/pokemon/?limit=1 ";
const buscador=document.querySelector('#buscador');
const tarjetas=document.querySelector('#tarjetas');

const x = cargarDatos();
console.log(x.next);
//Función para obtener el listado general de los pokemons
async function cargarDatos() {
	const resultado = await fetch(
		api/* ,
		{
			method: 'GET',
			headers: {
				'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
				'x-rapidapi-key': 'your_api_key'
			}
		} */
	);
	if (!resultado.ok) {
		throw new Error(`HTTP error! status: ${resultado.status}`);
	}
	const resultado2 = await resultado.json();
    /* const datos = resultado2.results;
    imprimir(datos); */
    return resultado2;    
}

//Función para obtener las imágenes de cada pokemon e imprimir sus tarjetas en pantalla
function imprimir(datos){
    //buscador.innerHTML=datos;
    let tarjeta='';
    for(let x in datos){
        //Datos de la imagen
        let imagenURL= datos[x].url;
        let imagen = imagenPokemon(imagenURL);
        console.log(imagen);
        tarjeta+=
        `<div class='tarjeta'>
            <div class='tarjetaTitulo'>
                ${datos[x].name}
            </div>    
            <div class='tarjetaImagen'>
                <img src='${imagen}'>
            </div>
        </div> `;
        
    }
    tarjetas.innerHTML=tarjeta;
    
}

//Función para obtener la imagen de los pokemons
async function imagenPokemon(url) {
	const resultado = await fetch(
		url/* ,
		{
			method: 'GET',
			headers: {
				'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
				'x-rapidapi-key': 'your_api_key'
			}
		} */
	);
	if (!resultado.ok) {
		throw new Error(`HTTP error! status: ${resultado.status}`);
	}
	const datos = await resultado.json();
    //return datos.results;
    console.log(datos);
}

