const api = "https://pokeapi.co/api/v2/pokemon/?limit=1500";
//const api = "https://pokeapi.co/api/v2/pokemon/";
//const buscador=document.querySelector('#buscadorBoton');
const buscador=document.querySelector('#buscadorInput');
const tarjetas=document.querySelector('#tarjetas');
let pokemones = [];



//Empezamos la renderización
cargarDatos();

//Función para obtener el listado general de los pokemons
async function cargarDatos() {
    tarjetas.innerHTML='Cargando...';
    const resultado = await fetch(api);
	if (!resultado.ok) {
		throw new Error(`HTTP error! status: ${resultado.status}`);
	}
	const resultado2 = await resultado.json();
    const datos = resultado2.results;
    //Aquí ordenamos y mandamos a imprimir
    const datos2 = datos.map(async (dato, index) =>{
        let arreglo=[];
        arreglo[0] = index+1;
        arreglo[1] = dato.name.toUpperCase();
        let imagen = dato.url;
        let imagen2 = await fetch(imagen);
        let imagen3 = await imagen2.json();
        arreglo[2] = imagen3.sprites.front_default;
        //console.log(arreglo);
        return arreglo;
        
    });
    Promise.all(datos2).then(data => {
        pokemones=data;
    });    
        
}

//Damos un tiempo para cargar la lista completa
setTimeout(()=>{
    //console.log(pokemones); 
    imprimir(pokemones);
    }
    ,5000);


function imprimir(arreglo){
    let tarjeta='';
    arreglo.forEach(pokemon =>{
        
        tarjeta +=
        `<div class='tarjeta' data='${pokemon[0]}'>
            <div class='tarjetaTitulo'>
                ${pokemon[1]}
            </div>
                
            <div class='tarjetaImagen'>
                
            
                <img class='tarjetaImagenPokemon'
        `;
        tarjeta += pokemon[2]==null ?  `src="/imagenes/error.jpg"` : `src="${pokemon[2]}" `;
        tarjeta += `    
                />
                
            </div>
        </div> `;
    });
       
     
    
    setTimeout(() => {
        tarjetas.innerHTML=tarjeta;
        //Le asignamos listeners a las tarjetas
        darAccionTarjetas();
    }, 1000);

    
}

//Funcionalidad del buscador
buscador.addEventListener('keyup', e => {
    //console.log(buscador.value);
    //console.log(pokemones);
    let arregloBusqueda = pokemones.filter(pokemon => {
        /* console.log(pokemon[1]);
        console.log(pokemon[1].indexOf(buscador.value)); */
        if(pokemon[1].indexOf(buscador.value.toUpperCase()) > -1){
            return pokemon;
        }
    });
    //console.log(arregloBusqueda);    
    imprimir(arregloBusqueda);
});


//Aquí asignamos funcionalidad a las tarjetas
function darAccionTarjetas(){
    //Se tiene que llamar desde la función asíncrona que es donde se crean todas las tarjetas. De otro modo, esta función no encuentra ningún elemento con clase 'tarjeta'
    
    const tarjetaSelector=document.querySelectorAll('.tarjeta');
    tarjetaSelector.forEach(tarjeta =>{
        tarjeta.addEventListener('click',async e =>{
            let posicion = tarjeta.getAttribute('data');
            
            document.querySelector('.modal-title').innerHTML = pokemones[posicion-1][1];
            let apiPokemon='https://pokeapi.co/api/v2/pokemon/' + pokemones[posicion-1][0];
            let informacionPokemon = await fetch(apiPokemon);
            let informacionPokemon2 = await informacionPokemon.json();
            let cadena = 
            `<div class='informacionColumnaIzquierda'>
                <span class='subtitulo'>HABILIDADES:</span>
            `;    
                informacionPokemon2.abilities.forEach(habilidad =>{
                    cadena+= `${habilidad.ability.name}`;
                });    
            cadena+=
                `
                <span class='subtitulo'>ALTURA:</span>
                    ${informacionPokemon2.height}
                <span class='subtitulo'>PESO:</span>
                    ${informacionPokemon2.weight}
            </div>
            <div class='informacionColumnaDerecha'>
                <img class='imagenModal' `;
                cadena+=pokemones[posicion-1][2]==null ?  `src="/imagenes/error.jpg"` : `src="${pokemones[posicion-1][2]}" `;
            
            cadena+=
            `/>    
            </div>
            `;

            document.querySelector('.modal-body').innerHTML = cadena;
            
            $('.modal').modal('show');
        });
    });
}

$(".cerrarModal").click(function(){
    $(".modal").modal('hide')
});