const inputs = [...document.querySelectorAll(".dropdown__input")];
const changeValue = document.querySelectorAll(".dropdown__value-btn");
const accept = document.querySelector(".dropdown__btn-accept");
const clear = document.querySelector(".dropdown__btn-clear")
const placeholder = document.querySelector(".dropdown__placeholder");
changeValue.forEach(el => {
  el.addEventListener("click", () => {
    if (el.nextElementSibling && el.nextElementSibling.value > 0) {
      el.nextElementSibling.value--;
    } else if (el.previousElementSibling) {
      el.previousElementSibling.value++;
    };
  })
});

accept.addEventListener("click", () => {
  let value = 0;
  for (i = 0; i < inputs.length; i++) {
    value += parseInt(inputs[i].value);
    }
  switch (value) {
    case 0:
      placeholder.innerHTML = "Сколько гостей";
      break;
    case 1:
      placeholder.innerText = "1 гость";
      break;
    case 2:
    case 3:
    case 4:
      placeholder.innerHTML = value + " гостя";
      break;
    default:
      placeholder.innerHTML = value + " гостей";
      break;
  }
  if (value > 0) {
    document.querySelector(".dropdown__checkbox").checked = false;
    clear.style.display = "block";
  }
})
clear.addEventListener("click", () => {
  clear.style.display = "none";
  for (i = 0; i < inputs.length; i++) {
    inputs[i].value = 0;
  }
  placeholder.innerHTML = "Сколько гостей";
})
/**
 * Кнопка очистить должна появляться только если добавлен хотя бы один человек
 * Сделать 1 общую функцию для кнопок. При нажатии на кнопку определяется dataset и на его основе увеличивается или уменьшается значени ближайщего инпута
 */
