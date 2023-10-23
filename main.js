const api = "https://pokeapi.co/api/v2/pokemon/?limit=2000";
const buscador=document.querySelector('#buscador');
const tarjetas=document.querySelector('#tarjetas');
let datos = '';
cargarDatos(api);

async function cargarDatos(api){
    const resultado = await fetch(api);
    const resultado2 = await resultado.json();
    //console.log(resultado2.results)
    datos = resultado2.results;
    imprimir(datos);
}

async function datosPokemon(api){
    const resultado = await fetch(api);
    const resultado2 = await resultado.json();
    let datosPrueba = resultado2;
    console.log(datosPrueba);
}

function imprimir(){
    //buscador.innerHTML=datos;
    let tarjeta='';
    for(let x in datos){
        //Datos de la imagen
        let imagenURL= datos[x].url;
        let prueba = datosPokemon(imagenURL);
        console.log(prueba);
        tarjeta+=
        `<div class='tarjeta'>
            <div class='tarjetaTitulo'>
                ${datos[x].name}
            </div>    
            <div class='tarjetaImagen'>
                ${datos[x].name}
            </div>
        </div> `;
        console.log(datos[x].url);
    }
    tarjetas.innerHTML=tarjeta;
    
}



