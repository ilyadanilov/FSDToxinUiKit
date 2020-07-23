class Model {
  constructor() {
    // Взрослые дети младенцы
    this.fields = {
      adults: {
        name: "взрослые",
        minCount: 0,
        currentCount: 0,
        locale: { one: "взрослый", few: "взрослых", many: "взрослых" },
      },
      children: {
        name: "дети",
        minCount: 0,
        currentCount: 0,
        locale: { one: "ребенок", few: "ребенка", many: "детей" },
      },
      infants: {
        name: "младенцы",
        minCount: 0,
        currentCount: 0,
        locale: { one: "младенец", few: "младенца", many: "младенцев" },
      },
    };
  }
  increaseFieldValue = (id) => {
    this.fields[id].currentCount++;
    this.onFieldsChanged(this.fields);
  };
  decreaseFieldValue = (id) => {
    if (this.fields[id].minCount < this.fields[id].currentCount) {
      this.fields[id].currentCount--;
      this.onFieldsChanged(this.fields);
    }
  };
  changeFieldValue = (id, value) => {
    this.fields[id].currentCount = value;
    this.onFieldsChanged(this.fields);
  };
  countFieldValues() {
    let counter = 0;
    for (const field in fields) {
      counter += fields[field].currentCount;
    }
    return counter;
  }

  bindFieldsChanged(callback) {
    this.onFieldsChanged = callback;
  }
}
class View {
  constructor() {
    // Id в который будут добавляться все элементы
    this.dropdownRoot = document.getElementById("dropdown-person");
    // Заголовок над дропдауном
    this.dropdownHeading = this.createElement("h3", ["h3", "dropdown__label"]);
    this.dropdownHeading.textContent = "гости";
    // кликабельное поле, открывающая список
    this.dropdownTitle = this.createElement("div", ["dropdown__placeholder"]);
    this.dropdownTitle.textContent = "Сколько гостей";
    // Дропдаун меню
    this.dropdownMenu = this.createElement("div", ["dropdown__menu"]);
    // Кнопка отчистить
    this.dropdownClearBtn = this.createElement("button", [
      "btn",
      "btn_grey",
      "dropdown__btn-clear",
      "dropdown__btn-clear_hidden",
    ]);
    this.dropdownClearBtn.textContent = "Очистить";
    this.dropdownClearBtn.setAttribute("disabled", "disabled");
    // Кнопка принять
    this.dropdownAcceptBtn = this.createElement("button", [
      "btn",
      "dropdown__btn-accept",
    ]);
    this.dropdownAcceptBtn.textContent = "Применить";
    // Контейнер для кнопок
    this.dropdownBtnContainer = this.createElement("div", [
      "dropdown__container",
    ]);
    // Добавить кнопки в контейнер для кнопок, контейнер нужен для позиционирования
    this.dropdownBtnContainer.append(
      this.dropdownClearBtn,
      this.dropdownAcceptBtn
    );
    // Добавить на страницу заголовок, кликабельное поле и меню
    this.dropdownRoot.append(
      this.dropdownHeading,
      this.dropdownTitle,
      this.dropdownMenu
    );
  }
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(...className);
    return element;
  }

  populateMenu(fields) {
    for (const field in fields) {
      const label = this.createElement("label", ["h3", "dropdown__container"]);
      // Название строки
      label.textContent = fields[field].name;

      // Контейнер для позиционирования кнопок +, -  и инпута
      const container = this.createElement("div", ["dropdown__container"]);
      // Кнопка уменьшения значения
      const decreaseValue = this.createElement("button", [
        "dropdown__value-btn",
      ]);
      // Добавить символ - в кнопку
      decreaseValue.textContent = "-";
      // Присвоить дата атрибут, который используется в методах для уменьшения значения
      decreaseValue.setAttribute("data-dropdown-btn-sign", "decrease");
      // Кнопка увеличения значения
      const increaseValue = this.createElement("button", [
        "dropdown__value-btn",
      ]);
      // Добавить символ + в кнопку
      increaseValue.textContent = "+";
      // Присвоить дата атрибут, который используется в методах для увеличения значения
      increaseValue.setAttribute("data-dropdown-btn-sign", "increase");

      // Инпут для числа
      const inputNum = this.createElement("input", ["dropdown__input"]);
      // Тип инпута - число
      inputNum.type = "number";
      // Начальное значение инпута
      inputNum.value = fields[field].minCount;
      // Присвоить дата атрибут, который используется в методах для изменения значения инпута
      inputNum.setAttribute("data-dropdown-field-id", field);
      // Добавить  в контейнер кнопки и инпут
      container.append(decreaseValue, inputNum, increaseValue);
      // Добавить в лэйбл контейнер с кнопками и инпутом
      label.append(container);
      // Добавить в дропдаун меню лэйбл с инпутом и кнопками внутри
      this.dropdownMenu.append(label);
    }
    // Добавить контейнер с кнопками в меню
    this.dropdownMenu.append(this.dropdownBtnContainer);
  }
  handleToggleMenu() {
    // Переключить стили title и dropdown menu
    this.dropdownTitle.classList.toggle("dropdown__placeholder_hidden");
    this.dropdownMenu.classList.toggle("dropdown__menu_hidden");
  }
  // Анимация раскрытия и закрытия меню.
  toggleMenu() {
    // Слушать нажатие на поле с названием
    this.dropdownTitle.addEventListener("click", () => {
      this.handleToggleMenu();
    });
  }
  // Эвент листенер, слушающий нажатие на кнопку плюс, в качестве параметра используется метод из Model'a increaseValue
  bindIncreaseFieldValue(handler) {
    // Общий эвент листнер на все меню.
    this.dropdownMenu.addEventListener("click", (event) => {
      event.preventDefault();
      // Если целью нажатия является кнопка +, то получить из инпута по соседству id и передать его handler'y
      if (
        event.target.className == "dropdown__value-btn" &&
        event.target.attributes["data-dropdown-btn-sign"].value == "increase"
      ) {
        const fieldId =
          event.target.parentNode.children[1].attributes[
            "data-dropdown-field-id"
          ].value;
        handler(fieldId);
      }
    });
  }
  // Эвент листенер, слушающий нажатие на кнопку минус, в качестве параметра используется метод из Model'a decreaseValue
  bindDecreaseFieldValue(handler) {
    // Общий эвент листнер на все меню.
    this.dropdownMenu.addEventListener("click", (event) => {
      event.preventDefault();
      // Если целью нажатия является кнопка +, то получить из инпута по соседству id и передать его handler'y
      if (
        event.target.className == "dropdown__value-btn" &&
        event.target.attributes["data-dropdown-btn-sign"].value == "decrease"
      ) {
        const fieldId =
          event.target.parentNode.children[1].attributes[
            "data-dropdown-field-id"
          ].value;
        handler(fieldId);
      }
    });
  }
  bindChangeFieldValue(handler) {
    this.dropdownMenu.addEventListener("change", (event) => {
      event.preventDefault();
      if (event.target.className == "dropdown__input") {
        const fieldId = event.target.attributes["data-dropdown-field-id"].value;
        const fieldValue = event.target.value;
        handler(fieldId, fieldValue);
      }
    });
  }

  // Изменить значение в инпутах
  onFieldsChanged = (fields) => {
    // Лист ипутов внутри меню
    const inputs = this.dropdownMenu.querySelectorAll(".dropdown__input");
    // Для каждого поля перебрать инпуты и найти с таким же id
    for (const field in fields) {
      inputs.forEach((input) => {
        if (input.getAttribute("data-dropdown-field-id") === field) {
          input.value = fields[field].currentCount;
        }
      });
    }
  };
  // Во View эвент листенер, который реаигрует на нажатие кнопки. При нажатии должен поменяться title в него должно добавиться количество гостей. ГОСТЕЙ КАРЛ! Я не глядя напихал в объекты locale с разными вариантами окончаний, которые нахуй не нужны. Так что теперь мне нужно думать как теперь этот вопрос решать. Думаю, что если в объекте есть свойство locale, то тогда берется значение из него (но в таком случае у всех объектов должен быть locale), если нет свойства locale, то должно быть в другом месте какая-то переменная или свойство родительсокого объекта, которое будет использоваться по умолчанию. Например
  // fields {locale: {one:гость, few:гостя, many:гостей}, field1,field2... }
  // И так. При нажатии кнопки принять запускается хэндлер из модел, который должен выдать некий результат подсчета количества гостей, после чего должен запуститься метод, обновляющий title
  bindCountFieldValues(handler) {
    // TODO хз
    this.dropdownAcceptBtn.addEventListener("click", () => {
      return handler();
    });
  }
  changeTitle(int) {
    this.dropdownTitle.textContent = `${int} гостей`;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.populateMenu(this.model.fields);
    this.view.toggleMenu();
    this.view.bindIncreaseFieldValue(this.model.increaseFieldValue);
    this.view.bindDecreaseFieldValue(this.model.decreaseFieldValue);
    this.view.bindChangeFieldValue(this.model.changeFieldValue);
    this.model.bindFieldsChanged(this.view.onFieldsChanged);

    // Как сделать эвент листенеры для кнопок + -, чтобы они запускали handler'ы? Пока мысль такая, что нужно добавить несколько параметров в populateMenu, но мне такой вариант кажется довольно уродливым. Надо придумать что-то другое. Опять же я не хочу добавлять эвент листнеры постфактум по классу например, потому что в таком случае будет добавлены к абсолютно всем кнопкам, а не к кнопкам конкретного dropdown'a есть над чем подумать.
    // Написать так, чтобы можно было с каждым новым инстансом Controller можно было передавать объект с нужными параметрами. А может и не надо такое, просто захардкодить 2 версии, с людьми и кроватями.
    // if(fields) {
    //   this.model.fields = fields;
    // }
  }
  acceptFieldValues() {
    // TODO тут я какой-то хуйни навертел, что если я его прямо в таком виде использую, то будет плохо. Короче надо подумать и переписать. Все-таки все эти методы должны срабатывать только при нажатии на кнопку.
    const values = this.view.bindCountFieldValues(this.model.countFieldValues);
    this.view.changeTitle(values);
    this.view.handleToggleMenu();
  }
}
const app = new Controller(new Model(), new View());

// const inputs = [...document.querySelectorAll('.dropdown__input')];
// const changeValue = document.querySelectorAll('.dropdown__value-btn');
// const accept = document.querySelector('.dropdown__btn-accept');
// const clear = document.querySelector('.dropdown__btn-clear');
// const placeholder = document.querySelector('.dropdown__placeholder');
// changeValue.forEach(el => {
//   el.addEventListener('click', () => {
//     if (el.nextElementSibling && el.nextElementSibling.value > 0) {
//       el.nextElementSibling.value--;
//     } else if (el.previousElementSibling) {
//       el.previousElementSibling.value++;
//     }
//   });
// });

// accept.addEventListener('click', () => {
//   let value = 0;
//   for (i = 0; i < inputs.length; i++) {
//     value += parseInt(inputs[i].value);
//   }
//   switch (value) {
//     case 0:
//       placeholder.innerHTML = 'Сколько гостей';
//       break;
//     case 1:
//       placeholder.innerText = '1 гость';
//       break;
//     case 2:
//     case 3:
//     case 4:
//       placeholder.innerHTML = value + ' гостя';
//       break;
//     default:
//       placeholder.innerHTML = value + ' гостей';
//       break;
//   }
//   if (value > 0) {
//     document.querySelector('.dropdown__checkbox').checked = false;
//     clear.style.display = 'block';
//   }
// });
// clear.addEventListener('click', () => {
//   clear.style.display = 'none';
//   for (i = 0; i < inputs.length; i++) {
//     inputs[i].value = 0;
//   }
//   placeholder.innerHTML = 'Сколько гостей';
// });
// /**
