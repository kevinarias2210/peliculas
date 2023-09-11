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

async function getMovieNext(){
    const { data } = await API('movie/upcoming');

    const movieNext = data.results;
    
    movieNext.map(next => {
        const movieNextImg = document.createElement('img');
        movieNextImg.classList.add('section__container--movie');
        movieNextImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + next.poster_path);
        movieNextImg.setAttribute('alt', next.title);

        sectionEstrenos.appendChild(movieNextImg);
    })
}

async function getTrendingMovie(){
    const { data } = await API('trending/movie/day');

    const movie = data.results;

    /* console.log(movie); */
    
    movie.forEach(movies => {
        /* console.log(movies); */
        const movieImg = document.createElement('img');
        movieImg.classList.add('section__container--movie');
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movies.poster_path);
        movieImg.setAttribute('alt', movies.title);

        sectionTendencias.appendChild(movieImg);
    });
}

async function getCategories(){
    const { data } = await API('genre/movie/list');

    const categories = data.genres;
    
    /* console.log(categories); */

    categories.map(cate => {
        const enlaceCategories = document.createElement('a');
        enlaceCategories.classList.add('nav__container--a');
        enlaceCategories.innerText = cate.name;
        enlaceCategories.setAttribute('href', '');

        navContainer.appendChild(enlaceCategories);
    })
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