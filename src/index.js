/* console.log('API URL = https://asjdnas.com/saljkdn?api_key=' + API_KEY); */

const movieContainer = document.querySelector('#tendencia');

async function getTrendingMovie(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=7495ffd0d1c293d01b4945d33bf95a8e');
    const data = await res.json();
    const movie = data.results;

    console.log(movie);
    
    movie.forEach(movies => {
        /* console.log(movies); */
        const movieImg = document.createElement('img');
        movieImg.classList.add('section__container--movie');
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movies.poster_path);
        movieImg.setAttribute('alt', movies.tite);

        movieContainer.appendChild(movieImg);
    });
}

getTrendingMovie();

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

