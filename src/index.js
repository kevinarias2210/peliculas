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

function createMovies(movies, container, clases){
    container.innerHTML = '';/**Se llama al padre nodo donde contiene 
    todo lo que recorre para eliminarlo cuando se pide de nuevo y no 
    cargue otra vez */
    
    movies.map(next => {
        const movieNextImg = document.createElement('img');
        movieNextImg.classList.add(clases);
        movieNextImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + next.poster_path);
        movieNextImg.setAttribute('alt', next.title);

        movieNextImg.addEventListener('click', () => {
            location.hash = '#movie=' + next.id;
        });

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
}

async function getTrendingMoviePage(){
    const { data } = await API('trending/movie/day');

    const movies = data.results;

    createMovies(movies, section3Container, 'section3__container--img');
}

async function getMovieDetails(id){
    const { data: movie } = await API('movie/' + id); /*lo que se hace en el
    data es cambiar el nombre de data a movie*/

    section2ContainerImag.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
    section2ContainerTitulo.textContent = movie.title;
    section2ContainerSipnosis.textContent = movie.overview;
    section2ContainerPoint.textContent = movie.vote_average;

    createCategories(movie.genres, section2ContainerCategorias, 'section2__container--p');

    /* const movies = data.results;

    createMovies(movies, section3Container, 'section3__container--img'); */
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