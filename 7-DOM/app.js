/*
window.alert(`this is window's alert`);

const alert = () => {
  console.log(`this is not window's alert`);
}

alert();
*/

const section = document.querySelector('section');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  /*
  if (section.className === 'red-bg vis') {
    section.className = 'invis';
  } else {
    section.className = 'red-bg vis';
  }
  */
  section.classList.toggle('vis');
})
