//api
const API_KEY =  "4d6424bc2150ba632e62d039873d2706";
const url= "https://api.themoviedb.org/3/search/movie?api_key=4d6424bc2150ba632e62d039873d2706";

//selecting elements from the DOM by Id
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const moviesSearchable = document.querySelector('#movies-searchable');
//necesito crear una url dinamica para q me carguen las imagenes
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";


//Esto es lo q tengo q hacer en js para mostrar los datos del json en html con imagenes etc
/*<div class="movie">
            <section class="section">
                <img src="" alt="">
                <img src="" alt="">
            </section>
            <div class="content">
                <p id="content-close">X</p>
            </div>
        </div>

*/

//obtener las imagenes de la pelicula
function movieSection(movies){
    return movies.map((movie) =>{
        //primero compruebo si hay imagen , para no mostrar una imagen sin cargar en la pag
        if(movie.poster_path){
             //utilizo la url dinamica para asi poder cargar la imagen 
            return `
            <img src=${IMAGE_URL + movie.poster_path} date-movie id=${movie.id}/>            
             `;

        }
      

    })
}


//Esta funcion crea el html dinamico
function createMovieContainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie'); //div clase="movie"

    const movieTemplate = `
    <section class="section">
        ${movieSection(movies)}
       
    </section>
    <div class="content">
        
    </div>`;

{/* <p id="content-close">X</p> */}
movieElement.innerHTML = movieTemplate;
return movieElement;



}





//function button
buttonElement.onclick = function(event){
    event.preventDefault();//que no se refresque la pagina
    //guardo en una constante el valor del input value
    const value = inputElement.value;
    //necesito hacer el valor de la query de la url dinamico
    const newUrl= url+'&query='+value; //concateno la url con la query, mas el valor del inputValue

   
    fetch(newUrl) //utilizo promesa 
    .then((res)=> res.json()) //en el caso q se cumplo convierto en json
    .then((data)=>{
        const movies = data.results; //guardo los resultados de data
        const movieBlock = createMovieContainer(movies); //llamo la funcion y paso parametro
        moviesSearchable.appendChild(movieBlock); //guardamos el contenido del movie block, dentro de los div del html con id moviesSercheable
        console.log("valor:",data) //muestro el valor del json

    })
    //en el caso que falle
    .catch((error)=>{
        console.log("Error:",error);
    })
    

    
    
    
    console.log("valor:",value);
   
}