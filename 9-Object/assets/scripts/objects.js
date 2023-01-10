const addMovieButton = document.getElementById('add-movie-btn');
const searchMovieButton = document.getElementById('search-btn');

const movies = new Proxy([], {
  set: (target, key, value) => {
    console.log('new movie', key, value);

    target[key] = value;

    return true;
  },
});

const checkEmptyString = (...args) => {
  let returnFlag = false;

  args.forEach((arg) => arg.trim() === '' ? returnFlag = true : returnFlag = false)

  return returnFlag;
}

const renderMovies = (filter) => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
  } else {
    movieList.classList.add('visible');
  }

  movieList.innerHTML = '';

  const filteredMovie = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));

  filteredMovie.forEach((movie) => {
    const movieLiElement = document.createElement('li');
    const { info } = movie;
    let text = info.title;
    for (const key in info) {
      if (key !== '_title') {
        text += ` - ${key} ${info[key]}`;
      }
    }
    movieLiElement.textContent = text;
    movieList.append(movieLiElement);
  })
}

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (checkEmptyString(title, extraName, extraValue)) {
    alert('please enter valid values');

    return;
  }

  const newMovie = {
    info: {
      // title,
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT';
          return ;
        }
        this._title = val;
      },
      get title() {
        return this._title.toUpperCase();
      },
      [extraName]: extraValue,
    },
    id: Math.random(),
  }
  newMovie.info.title = title;
  console.log(newMovie.info.title);

  movies.push(newMovie);
  renderMovies();
}

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;

  renderMovies(filterTerm);
}

addMovieButton.addEventListener('click', addMovieHandler);
searchMovieButton.addEventListener('click', searchMovieHandler);

const members = {
  teamName: 'blue nights',
  people: ['alice', 'bob', 'charlie', 'mike'],
  getMembers() {
    this.people.forEach((person) => {
      console.log(this);
      console.log(person + ' - ' + this.teamName);
    })
  }
}

console.log(x);

var x = 1;