headerLabelInput.addEventListener('keydown', (tecla) => {
    console.log(tecla);
    if(tecla.keyCode === 13){
        location.hash = 'category=';
    };
})

estrenos.addEventListener('click', () => {
    location.hash = '#estrenos';
});

tendencia.addEventListener('click', () => {
    location.hash = '#trends';
})

navArrowBack.addEventListener('click', () => {
    location.hash = '#home';
});

/*--> Después de leer el cuaderno en la parte de onhashchange */
window.addEventListener('DOMContentLoaded', navigator, false);/*Este evento se ejecuta
cada vez que cargue la aplicacion*/
window.addEventListener('hashchange', navigator, false);/*Este evento llama
la funcion cuando cambie el hash */

function navigator(){/*Esta funcion se llama cada vez que cargue la 
aplicacion y cada vez que cambie el hash.*/
    console.log(location) /*Entonces acá se lee el hash, para mostrar una 
    seccion u otra*/
    if(location.hash.startsWith('#trends')){/*Metodo startsWith: si empieza
    de cierta forma, por ejemplo si comienza por "#trends" */
        homeTrends();
    }else if(location.hash.startsWith('#estrenos')){
        homeEstrenos();
    }else if(location.hash.startsWith('#search=')){/*Seccion de busqueda
    después del igual va a salir el texto que estemos buscando */
        homeSearch();
    }else if(location.hash.startsWith('#movie=')){/*Despues del igual nos de
    el id de la pelicula, para que ese id lo podamos utilizar para la 
    consulta de nuestra API y ver los detalles de esa pelicula*/
        homeMovie();
    }else if(location.hash.startsWith('#category=')){/*Las categorias tambien
    tienen un id y un nombre, para poder hacer llamado a la API para filtrar
    a todas las peliculas con el ID*/
        homeCategory();
    }else{/*Si ninguno funciona, solo se regresa al home */
        homePage();
    }
}

function homePage(){
    console.log('home!!');

    nav.classList.remove('inactive');
    navArrow.classList.add('inactive');
    section.classList.remove('inactive');
    section2.classList.add('inactive');
    section3.classList.add('inactive');

    getTrendingMovie();
    getCategories();
    getMovieNext();
}

function homeTrends(){
    console.log('Trends!!');

    nav.classList.add('inactive');
    navArrow.classList.remove('inactive');
    section.classList.add('inactive');
    section2.classList.add('inactive');
    section3.classList.remove('inactive');
}

function homeEstrenos(){
    console.log('Estrenos!!');

    nav.classList.add('inactive');
    navArrow.classList.remove('inactive');
    section.classList.add('inactive');
    section2.classList.add('inactive');
    section3.classList.remove('inactive');
}

function homeSearch(){
    console.log('Search!!');

    nav.classList.add('inactive');
    navArrow.classList.remove('inactive');
    section.classList.add('inactive');
    section2.classList.add('inactive');
    section3.classList.remove('inactive');
}

function homeMovie(){
    console.log('Movie!!');

    nav.classList.add('inactive');
    navArrow.classList.remove('inactive');
    section.classList.add('inactive');
    section2.classList.remove('inactive');
    section3.classList.add('inactive');
}

function homeCategory(){
    console.log('categories!!');

    nav.classList.add('inactive');
    navArrow.classList.remove('inactive');
    section.classList.add('inactive');
    section2.classList.add('inactive');
    section3.classList.remove('inactive');

    //['#category, id-name']
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('/');

    navArrowGender.innerText = categoryName;

    getMoviesCategories(categoryId);
}