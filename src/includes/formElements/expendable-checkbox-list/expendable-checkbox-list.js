const expcheck = document.querySelector('.expcheck');
document.querySelector('.form__expendable-legend').addEventListener('click', () => {
  if (expcheck.style.display === 'block') {
    expcheck.style.display = 'none';
  } else {
    expcheck.style.display = 'block';
  }
  // console.log(event.target.parentElement.children);
});
