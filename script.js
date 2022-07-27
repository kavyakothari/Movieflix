//The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.
const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
//info:https://developers.themoviedb.org/3/collections/get-collection-images
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
//info: https://developers.themoviedb.org/3/search/search-movies
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


//fetch elements from main file to apply various functions
//The Document method getElementById() returns an Element object representing the element whose id property matches the specified string.
const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");



// initially get hot movies
getMovies(APIURL);
//The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style,
//avoiding the need to explicitly configure promise chains.
async function getMovies(url) {
    const resp = await fetch(url);   
    const respData = await resp.json();

    console.log(respData);   //prints output on console

    showMovies(respData.results);  //function to display movies on console
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
      
      //fetching required movie details and assigning to var.
        const { poster_path, title, vote_average, overview } = movie;
       
        const movieEl = document.createElement("div");   //creating div element
        movieEl.classList.add("movie");   // putting the movie details in the div element
        
      
      //assigning values inside the main div element which will display movie details like image, info and overview
        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {  //api function to return movie rating
  //returns different colors as per movie rating 
    if (vote >= 8) {    
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {    //if voting is less than 4 return red
        return "red";
    }
}

form.addEventListener("submit", (e) => {    //search bar functionality
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);   //returning the search item

        search.value = "";
    }
});

//popmotion tween
const { easing, tween, styler}= window.popmotion;
const scroll = styler(document.querySelector(".asd"));
//Animate between two values over a set duration of time. 
//The behaviour and feel of the animation can be affected by providing a different easing function.
tween({ 
    from: { 
        scale: .3,
      opacity: 0
    },
    to: { 
        scale: 1,
        opacity: 1
    },
    duration: 2000
})
.start(scroll.set);

