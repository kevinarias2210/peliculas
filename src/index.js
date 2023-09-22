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
        const movieNextImg = document.createElement('img');
        movieNextImg.classList.add(clases);
        movieNextImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300/' + next.poster_path);
        movieNextImg.setAttribute('alt', next.title);

        movieNextImg.addEventListener('error', () => {
            movieNextImg.setAttribute('src', 'https://farmaciaschilespa.cl/wp-content/uploads/2022/08/Imagen-no-disponible-1-300x300.jpg');
        })

        movieNextImg.addEventListener('click', () => {
            location.hash = '#movie=' + next.id;
        });

        /*Traemos la variable del constructor, con el metodo observe para
        seleccionar cual elemento se está observando para el viewport*/

        observer.observe(movieNextImg);
        /* if(observer){
        } */

        container.appendChild(movieNextImg);
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

    createMovies(movies, section3Container, 'section3__container--img');
}

async function getMovieSearch(query){
    const { data } = await API('search/movie', {
        params: {
            query,
        }
    });

    console.log(query);
    const movies = data.results;

    createMovies(movies, section3Container, 'section3__container--img');
}

async function getMovieNextPage(){
    const { data } = await API('movie/upcoming');

    const movies = data.results;

    createMovies(movies, section3Container, 'section3__container--img');

    /*Desde acá se empieza a implementar la paginación de la API */

    /* const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'Cargar más';
    btnLoadMore.addEventListener('click', getPaginatedMovieNext);
    section3Container.appendChild(btnLoadMore); */
}

/* let page = 1; */

//-->

/* window.addEventListener('scroll', getPaginatedMovieNext); */

async function getPaginatedMovieNext(){
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

    if(scrollIsBottom){
        page++;
        const { data } = await API('movie/upcoming', {
            params: {
                page,
            }
        });
    
        const movies = data.results;
    
        createMovies(movies, section3Container, 'section3__container--img', false);

    }


    /* const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'Cargar más';
    btnLoadMore.addEventListener('click', getPaginatedMovieNext);
    section3Container.appendChild(btnLoadMore); */
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