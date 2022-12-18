const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];

const openAddMovieModalButton = document.querySelector('header button');
// const openAddMovieModalButton = document.querySelector('header').lastElementChild;

const cancelAddMovieModalButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieModalButton = cancelAddMovieModalButton.nextElementSibling;

const backdrop = document.getElementById('backdrop');

const userInputs = addMovieModal.querySelectorAll('input');
// const userInputs = addMovieModal.getElementsByTagName('input');

const entryTextSection = document.getElementById('entry-text');

const listRoot = document.getElementById('movie-list');

const deleteMovieModal = document.getElementById('delete-modal');
const cancelDeleteMovieModalButton = deleteMovieModal.querySelector('.btn--passive');

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
}

const clearMovieInputs = () => {
  userInputs[0].value = '';
  userInputs[1].value = '';
  userInputs[2].value = '';
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
}

const closeDeleteMovieModal = () => {
  deleteMovieModal.classList.remove('visible');
  toggleBackdrop();
}

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);

  closeDeleteMovieModal();

  updateUI();
}

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();

  let okDeleteMovieModalButton = deleteMovieModal.querySelector('.btn--danger');

  okDeleteMovieModalButton.replaceWith(okDeleteMovieModalButton.cloneNode(true));

  okDeleteMovieModalButton = deleteMovieModal.querySelector('.btn--danger');

  cancelDeleteMovieModalButton.removeEventListener('click', closeDeleteMovieModal);
  okDeleteMovieModalButton.removeEventListener('click', deleteMovie.bind(null, movieId));
  cancelDeleteMovieModalButton.addEventListener('click', closeDeleteMovieModal);
  okDeleteMovieModalButton.addEventListener('click', deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}" />
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating} / 5 stars</p>
    </div>
  `;

  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
  listRoot.appendChild(newMovieElement);
  updateUI();
}

const closeAddMovieModal = () => {
  addMovieModal.classList.remove('visible');
}
// click event handler
const showAddMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};
const backdropClickHandler = () => {
  closeAddMovieModal();
  closeDeleteMovieModal();
  clearMovieInputs();
}
const cancelAddMovieHandler = () => {
  closeAddMovieModal();
  toggleBackdrop();
}

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (titleValue.trim() === '' ||
  imageUrlValue.trim() === '' ||
  ratingValue.trim() === '' ||
  ratingValue < 1 || ratingValue > 5) {
    alert('Please enter valid value (rating between 1 and 5)');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    imageUrl: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);

  clearMovieInputs();
  closeAddMovieModal();
  toggleBackdrop();
  updateUI();
  renderNewMovieElement(newMovie.id, titleValue, imageUrlValue, ratingValue)
}

openAddMovieModalButton.addEventListener('click', showAddMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieModalButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieModalButton.addEventListener('click', addMovieHandler);