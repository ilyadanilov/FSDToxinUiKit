document.querySelectorAll(".expendable-fieldset__heading").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.target.parentElement.classList.toggle("expendable-fieldset_active");
  });
});
