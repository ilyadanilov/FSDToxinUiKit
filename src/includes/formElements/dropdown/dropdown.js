class Model {
  constructor() {
    this.title = {
      // title - значения для изменения заголовка dropdown'a, если должно быть одно общее значение, т.е. общее количество гостей в данном случае.
      default: "Сколько гостей",
      one: "гость",
      few: "гостя",
      many: "гостей",
    };
    // Взрослые дети младенцы
    this.fields = {
      adults: {
        name: "взрослые",
        minCount: 0,
        currentCount: 0,
        maxCount: 5,
        locale: { one: "взрослый", few: "взрослых", many: "взрослых" },
      },
      children: {
        name: "дети",
        minCount: 0,
        currentCount: 0,
        maxCount: 3,
        locale: { one: "ребенок", few: "ребенка", many: "детей" },
      },
      infants: {
        name: "младенцы",
        minCount: 0,
        currentCount: 0,
        maxCount: 2,
        locale: { one: "младенец", few: "младенца", many: "младенцев" },
      },
    };
  }
  increaseFieldValue = (id) => {
    if (
      this.fields[id].maxCount &&
      this.fields[id].currentCount < this.fields[id].maxCount
    ) {
      this.fields[id].currentCount++;
      this.onFieldsChanged(this.fields);
      this.titleChange(this.countFieldValues(), this.title);
    }
  };
  decreaseFieldValue = (id) => {
    if (this.fields[id].minCount < this.fields[id].currentCount) {
      this.fields[id].currentCount--;
      this.onFieldsChanged(this.fields);
      this.titleChange(this.countFieldValues(), this.title);
    }
  };
  changeFieldValue = (id, value) => {
    if (value == "") {
      this.fields[id].currentCount = 0;
      this.onFieldsChanged(this.fields);
      this.titleChange(this.countFieldValues(), this.title);
    } else if (this.fields[id].maxCount < value) {
      this.fields[id].currentCount = this.fields[id].maxCount;
      this.onFieldsChanged(this.fields);
      this.titleChange(this.countFieldValues(), this.title);
    } else if (this.fields[id].minCount > value) {
      this.fields[id].currentCount = this.fields[id].minCount;
      this.onFieldsChanged(this.fields);
      this.titleChange(this.countFieldValues(), this.title);
    } else {
      this.fields[id].currentCount = value;
      this.onFieldsChanged(this.fields);
      this.titleChange(this.countFieldValues(), this.title);
    }
  };
  // Сумма значнией полей
  countFieldValues = () => {
    let counter = 0;
    for (const field in this.fields) {
      counter += +this.fields[field].currentCount;
    }
    return counter;
  };

  bindFieldsChanged(callback) {
    this.onFieldsChanged = callback;
  }
  bindTitleChange(callback) {
    this.titleChange = callback;
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
      // Установить минимальные значения для инпута
      inputNum.setAttribute("min", fields[field].minCount);
      // Установить максимальные значения для инпута
      if (fields[field].maxCount) {
        inputNum.setAttribute("max", fields[field].maxCount);
      }
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
      // Если целью нажатия является кнопка -, то получить из инпута по соседству id и передать его handler'y
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

  onEnterPress() {
    this.dropdownMenu.addEventListener("keydown", (event) => {
      if (event.target.className == "dropdown__input" && event.keyCode == 13) {
        event.preventDefault();
        event.target.blur();
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

  titleChange = (sum, title) => {
    if (sum == 0) {
      this.dropdownTitle.textContent = title.default;
    } else if (sum == 1) {
      this.dropdownTitle.textContent = sum + " " + title.one;
    } else if (sum > 4) {
      this.dropdownTitle.textContent = sum + " " + title.many;
    } else if (sum < 5) {
      this.dropdownTitle.textContent = sum + " " + title.few;
    }
  };
  //
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
    this.model.bindTitleChange(this.view.titleChange);
    this.view.onEnterPress();
  }
}
const app = new Controller(new Model(), new View());
