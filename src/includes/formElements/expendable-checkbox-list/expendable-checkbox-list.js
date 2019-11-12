document.querySelectorAll('.form__expendable-legend').forEach(el => {
  el.addEventListener('click', event => {
    event.target.parentElement.classList.toggle('form__expendable-list_active');
  });
});
