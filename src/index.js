/* console.log('API URL = https://asjdnas.com/saljkdn?api_key=' + API_KEY); */

const API = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': '7495ffd0d1c293d01b4945d33bf95a8e'
    },
});

function likedMovieList(){
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    /*Si item tiene algo, entonces movies tendra eso y si no es un objeto
    vacio*/
    if(item){
        movies = item;
    }else{
        movies = {};
    }

    return movies;
}

//Informacion que se guarda en el localStorage

function likeMovie(movie){
    /*Identificamos si guardamos o no en el localStorage */
    const likedMovies = likedMovieList();

    /*Le preguntamos si tiene algo guardado en el objeto que tenga el id 
    movie. El "movie.id" es de la API */
    if(likedMovies[movie.id]){
        likedMovies[movie.id] = undefined;//Si ya existia la pelicula la eliminamos
    }else{
        likedMovies[movie.id] = movie;//si no agregarla
    }

    localStorage.setItem('liked_movies' ,JSON.stringify(likedMovies));
}

const navContainer = document.querySelector('#nav');

/* let options = {
    padre: document.querySelector('#sectionContainer'),
    rootMargin: "0px",
    umbral: 1.0
}; */

/*Se trae al objeto constructor IntersectionObserver, se guarda en un 
parametro las entradas que tienen sus propia propiedades, cuando se recorre
el elemento accede a una propiedad isIntersecting que está en false, para
saber si está en el viewport, entonces si está en el viewport, el elemento
obtiene el atributo data-img que guarda el src de la imagen*/

let observer = new IntersectionObserver((entries)=> {
    entries.forEach((element)=>{
        if(element.isIntersecting){
            const url = element.target.getAttribute('data-img');
            element.target.setAttribute('src', url);
        };
    })
});

function createMovies(movies, container, clases, clean = true){
    /** container.innerHTML = ''; Se llama al padre nodo donde contiene 
    todo lo que recorre para eliminarlo cuando se pide de nuevo y no 
    cargue otra vez */

    /* container.innerHTML = ''; */

    if(clean){
        container.innerHTML = '';
    };
    
    movies.map(next => {

        const contenedor = document.createElement('div');
        contenedor.classList.add('containerImgBtn');

        const movieNextImg = document.createElement('img');
        movieNextImg.classList.add(clases);
        movieNextImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300/' + next.poster_path);
        movieNextImg.setAttribute('alt', next.title);

        movieNextImg.addEventListener('click', () => {
            location.hash = '#movie=' + next.id;
        });
        
        movieNextImg.addEventListener('error', () => {
            movieNextImg.setAttribute('src', 'https://farmaciaschilespa.cl/wp-content/uploads/2022/08/Imagen-no-disponible-1-300x300.jpg');
        })

        const movieBotton = document.createElement('button');
        movieBotton.classList.add('buttonFav');
        movieBotton.setAttribute('id', 'moviLike')
        /*Si el objeto guardado en LocalStorage tiene una pelicula con id YY 
        le agrego la clase*/
        likedMovieList()[next.id] && movieBotton.classList.add('buttonFav__liked');
        movieBotton.addEventListener('click', () => {
            movieBotton.classList.toggle('buttonFav__liked');
            likeMovie(next);/*Funcion para guardalo en el localStorage
            y el parametro guarda todo el recorrido que se hizo con el .map*/
            getLikedMovies();
            
        });

        /*Traemos la variable del constructor, con el metodo observe para
        seleccionar cual elemento se está observando para el viewport*/

        observer.observe(movieNextImg);
        /* if(observer){
        } */

        container.appendChild(contenedor);
        contenedor.appendChild(movieNextImg);
        contenedor.appendChild(movieBotton);
        /* container.appendChild(movieNextImg);
        container.appendChild(movieBotton); */
    })
}

function createCategories(categorias, container, clase){
    container.innerHTML = '';

    categorias.map(cate => {
        const enlaceCategories = document.createElement('p');
        enlaceCategories.classList.add(clase);
        enlaceCategories.innerText = cate.name;
        enlaceCategories.setAttribute('href', '');

        enlaceCategories.addEventListener('click', () => {
            location.hash = `category=${cate.id}/${cate.name}`;
        });
        container.appendChild(enlaceCategories);
    })
}

async function getMovieNext(){
    const { data } = await API('movie/upcoming');

    const movies = data.results;

    createMovies(movies, sectionEstrenos, 'section__container--movie');
}

async function getTrendingMovie(){
    const { data } = await API('trending/movie/day');

    const movies = data.results;

    createMovies(movies, sectionTendencias, 'section__container--movie');
}

async function getCategories(){
    const { data } = await API('genre/movie/list');

    const categorias = data.genres;

    createCategories(categorias, navegator, 'nav__container--a');
}

async function getMoviesCategories(id){
    const { data } = await API('discover/movie', {
        params: {
            with_genres: id,
        }
    });

    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, section3Container, 'section3__container--img');
}

function getPaginatedMovieCategories(id){
    return async function(){
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    
        const pageIsNotMax = page < maxPage;
        
        if(scrollIsBottom && pageIsNotMax){
            page++;
            const { data } = await API('discover/movie', {
                params: {
                    with_genres: id,
                    page
                }
            });
        
            const movies = data.results;
        
            createMovies(movies, section3Container, 'section3__container--img', false);
    
        }
    }
}

async function getMovieSearch(query){
    const { data } = await API('search/movie', {
        params: {
            query,
        }
    });

    console.log(query);
    const movies = data.results;

    maxPage = data.total_pages;
    console.log(maxPage)

    createMovies(movies, section3Container, 'section3__container--img');
}

function getPaginatedMovieSearch(query){
    return async function(){
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    
        const pageIsNotMax = page < maxPage;
        
        if(scrollIsBottom && pageIsNotMax){
            page++;
            const { data } = await API('search/movie', {
                params: {
                    query,
                    page
                }
            });
        
            const movies = data.results;
        
            createMovies(movies, section3Container, 'section3__container--img', false);
    
        }
    }
}

async function getMovieNextPage(){
    const { data } = await API('movie/upcoming');

    const movies = data.results;
    maxPage = data.total_pages;//limitamos la paginación

    createMovies(movies, section3Container, 'section3__container--img');
}

async function getPaginatedMovieNext(){
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

    const pageIsNotMax = page < maxPage;
    
    if(scrollIsBottom && pageIsNotMax){
        page++;
        const { data } = await API('movie/upcoming', {
            params: {
                page,
            }
        });
    
        const movies = data.results;
    
        createMovies(movies, section3Container, 'section3__container--img', false);

    }
}

async function getTrendingMoviePage(){
    const { data } = await API('trending/movie/day');

    const movies = data.results;

    createMovies(movies, section3Container, 'section3__container--img');
}

async function getMovieDetails(id){
    const { data: movie } = await API('movie/' + id); /*lo que se hace en el
    data es cambiar el nombre de data a movie*/

    navArrowGender.textContent = movie.title;

    section2ContainerImag.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
    section2ContainerTitulo.textContent = movie.title;
    section2ContainerSipnosis.textContent = movie.overview;
    section2ContainerPoint.textContent = movie.vote_average;

    createCategories(movie.genres, section2ContainerCategorias, 'section2__container--p');

    getRelatedMovie(id);
}

async function getRelatedMovie(id){
    const { data } = await API(`movie/${id}/recommendations`);

    
    const relatedMovie = data.results;
    
    createMovies(relatedMovie, section2ContainerSimiCate, 'section2__container--simiPeli');
}

const categories = document.querySelector('.nav__container');

function listCategories(){
    const containerList = document.querySelector('.nav__container--list')
    
    if(containerList.classList.contains('active')){
        containerList.classList.remove('active');
    }else{
        containerList.classList.add('active');
    }

    console.log(containerList);
}

categories.addEventListener('click', listCategories);

function getLikedMovies(){
    const likedMovies = likedMovieList();

    const moviesArray = Object.values(likedMovies)/*Este metodo nos crea un 
    array con todos los valores de un objeto ejemplo:*/
    //{keys: 'value', keys: 'value',} a
    //'value', 'value',]

    console.log(moviesArray);

    //Llamamos a la funcion donde se crea todas las peliculas
    createMovies(moviesArray, sectionLikesContainer, 'section__container--like', clean = true);
    
}