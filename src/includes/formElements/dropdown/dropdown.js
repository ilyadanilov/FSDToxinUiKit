export default class DropdownMenu {
  constructor(options) {
    // Опции содержат поля ввода, и другие элементы, необходимые для работы компонента
    this.options = options;
    // В модел логика хранения и изменения данных
    this.model = {
      // Title - название кликабельного поля
      title: this.options.title,
      // Fields - поля ввода, их названия и значения
      fields: this.options.fields,
      // Увеличить значение поля на 1
      increaseFieldValue(id) {
        if (
          this.fields[id].maxCount &&
          this.fields[id].currentCount < this.fields[id].maxCount
        ) {
          ++this.fields[id].currentCount;
        }
      },
      // Уменьшить значение поля на 1
      decreaseFieldValue(id) {
        if (this.fields[id].minCount < this.fields[id].currentCount) {
          this.fields[id].currentCount--;
        }
      },
      // Изменить значение поля в зависимости от введенной информации
      changeFieldValue(id, value) {
        if (value == "") {
          this.fields[id].currentCount = 0;
        } else if (this.fields[id].maxCount < value) {
          this.fields[id].currentCount = this.fields[id].maxCount;
        } else if (this.fields[id].minCount > value) {
          this.fields[id].currentCount = this.fields[id].minCount;
        } else {
          this.fields[id].currentCount = value;
        }
      },
      // Сумма значений полей (нужна для изменения названия title)
      countFieldValues() {
        let counter = 0;
        for (const field in this.fields) {
          counter += +this.fields[field].currentCount;
        }
        return counter;
      },
      // Метод создает список из имен и значений полей fields для последующей вставки в title
      listTitle() {
        let list = [];
        for (let field in this.fields) {
          field = this.fields[field];
          if (field.currentCount > field.minCount) {
            let properSuffix = "";
            if (field.currentCount == 1) {
              properSuffix = field.locale.one;
            } else if (field.currentCount > 4) {
              properSuffix = field.locale.many;
            } else if (field.currentCount < 5) {
              properSuffix = field.locale.few;
            }
            list.push(`${field.currentCount} ${properSuffix}`);
          }
        }
        return list.length
          ? list.slice(0, 2).join(", ") + "..."
          : this.title.default;
      },
      // Метод создает название с суммой значений для последующей вставки в title
      singleTitle() {
        let sum = this.countFieldValues();
        if (sum == 0) {
          return this.title.default;
        } else if (sum == 1) {
          return sum + " " + this.title.one;
        } else if (sum > 4) {
          return sum + " " + this.title.many;
        } else if (sum < 5) {
          return sum + " " + this.title.few;
        }
      },
      // Обнуление значений в fields
      resetAllValues() {
        for (const field in this.fields) {
          this.fields[field].currentCount = this.fields[field].minCount;
        }
      },
    };
    this.view = {
      // id div'a, в который внедряется всё меню
      id: this.options.id,
      // Название заголовка над кликабельным полем
      headingName: this.options.headingName,
      // Название кликабельного поля по умолчанию
      titleName: this.options.title.default,
      // Определяет будут ли вставлены кнопки очистить принять в меню
      isBtnEnabled: this.options.isBtnEnabled,
      // Метод создает heading, title и меню со всеми необходимыми css классами, аттрибутами.
      createDropdown() {
        // Элемент корень, в который внедряется всё меню
        this.dropdownRoot = document.getElementById(this.id);
        // Добавляем класс dropdown для лучшей читаемости компонента
        this.dropdownRoot.classList.add("dropdown");
        // Создаем заголовок
        this.dropdownHeading = this.createElement("h3", [
          "h3",
          "dropdown__heading",
        ]);
        this.dropdownHeading.textContent = this.headingName;
        this.dropdownTitle = this.createElement("div", [
          "dropdown__title",
          "dropdown__title_hidden",
        ]);
        this.dropdownTitle.textContent = this.titleName;
        this.dropdownMenu = this.createElement("div", [
          "dropdown__menu",
          "dropdown__menu_hidden",
        ]);
        if (this.isBtnEnabled) {
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
            "dropdown__container_btn",
          ]);

          // Добавить кнопки в контейнер для кнопок, контейнер нужен для позиционирования
          this.dropdownBtnContainer.append(
            this.dropdownClearBtn,
            this.dropdownAcceptBtn
          );
        }
        this.dropdownRoot.append(
          this.dropdownHeading,
          this.dropdownTitle,
          this.dropdownMenu
        );
      },
      createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(...className);
        return element;
      },

      assignMenuHeight(menu) {
        if (parseInt(menu.style.height)) {
          menu.style.height = 0;
        } else {
          menu.style.height = menu.scrollHeight + "px";
        }
      },
      populateMenu(fields) {
        for (const field in fields) {
          const label = this.createElement("label", [
            "h3",
            "dropdown__container",
          ]);
          // Название строки
          label.textContent = fields[field].name;

          // Контейнер для позиционирования кнопок +, -  и инпута
          const container = this.createElement("div", ["dropdown__container"]);
          // Кнопка уменьшения значения
          const decreaseValue = this.createElement("button", [
            "dropdown__value-btn",
            "dropdown__value-btn_disabled",
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
        if (this.isBtnEnabled) {
          // Добавить контейнер с кнопками в меню
          this.dropdownMenu.append(this.dropdownBtnContainer);
        }
      },
      handleToggleMenu() {
        // Переключить стили title и dropdown menu
        this.dropdownTitle.classList.toggle("dropdown__title_hidden");
        this.dropdownMenu.classList.toggle("dropdown__menu_hidden");
        this.assignMenuHeight(this.dropdownMenu);
      },
      // Анимация раскрытия и закрытия меню.
      toggleMenu() {
        // Слушать нажатие на поле с названием
        this.dropdownTitle.addEventListener("click", () => {
          this.handleToggleMenu();
        });
      },
      // Эвент листенер, слушающий нажатие на кнопку плюс, в качестве параметра используется метод из Model'a increaseValue
      bindIncreaseFieldValue(handler) {
        // Общий эвент листнер на все меню.
        this.dropdownMenu.addEventListener("click", (event) => {
          event.preventDefault();
          // Если целью нажатия является кнопка +, то получить из инпута по соседству id и передать его handler'y
          if (
            event.target.className == "dropdown__value-btn" &&
            event.target.attributes["data-dropdown-btn-sign"].value ==
              "increase"
          ) {
            const fieldId =
              event.target.parentNode.children[1].attributes[
                "data-dropdown-field-id"
              ].value;
            handler(fieldId);
          }
        });
      },
      // Эвент листенер, слушающий нажатие на кнопку минус, в качестве параметра используется метод из Model'a decreaseValue
      bindDecreaseFieldValue(handler) {
        // Общий эвент листнер на все меню.
        this.dropdownMenu.addEventListener("click", (event) => {
          event.preventDefault();
          // Если целью нажатия является кнопка -, то получить из инпута по соседству id и передать его handler'y
          if (
            event.target.classList.contains("dropdown__value-btn") &&
            event.target.attributes["data-dropdown-btn-sign"].value ==
              "decrease"
          ) {
            const fieldId =
              event.target.parentNode.children[1].attributes[
                "data-dropdown-field-id"
              ].value;
            handler(fieldId);
          }
        });
      },
      bindChangeFieldValue(handler) {
        this.dropdownMenu.addEventListener("change", (event) => {
          event.preventDefault();
          if (event.target.className == "dropdown__input") {
            const fieldId =
              event.target.attributes["data-dropdown-field-id"].value;
            const fieldValue = event.target.value;
            handler(fieldId, fieldValue);
          }
        });
      },
      onEnterPress() {
        this.dropdownMenu.addEventListener("keydown", (event) => {
          if (
            event.target.className == "dropdown__input" &&
            event.keyCode == 13
          ) {
            event.preventDefault();
            event.target.blur();
          }
        });
      },
      onFieldsChanged(fields) {
        // Лист ипутов внутри меню
        const inputs = this.dropdownMenu.querySelectorAll(".dropdown__input");
        // Для каждого поля перебрать инпуты и найти с таким же id
        for (const field in fields) {
          inputs.forEach((input) => {
            if (input.getAttribute("data-dropdown-field-id") === field) {
              input.value = `${fields[field].currentCount}`;
            }
          });
        }
      },

      singleTitleChange(title) {
        this.dropdownTitle.textContent = title;
      },
      listTitleChange(title) {
        this.dropdownTitle.textContent = title;
      },

      showClearBtn(sum) {
        if (sum > 0) {
          this.dropdownClearBtn.removeAttribute("disabled");
          this.dropdownClearBtn.classList.remove("dropdown__btn-clear_hidden");
        } else {
          this.dropdownClearBtn.setAttribute("disabled", "disabled");
          this.dropdownClearBtn.classList.add("dropdown__btn-clear_hidden");
        }
      },
      onAcceptBtnPress() {
        this.dropdownAcceptBtn.addEventListener("click", () => {
          this.handleToggleMenu();
        });
      },
      onClearBtnPress(handler) {
        this.dropdownClearBtn.addEventListener("click", () => {
          handler();
        });
      },
      activateDecreaseBtn(fieldId) {
        let input = document.querySelector(
          `input[data-dropdown-field-id = ${fieldId}]`
        );
        let btn = input.parentElement.querySelector(
          "[data-dropdown-btn-sign='decrease']"
        );
        if (input.value > input.getAttribute("min")) {
          btn.classList.remove("dropdown__value-btn_disabled");
        } else if (input.value == input.getAttribute("min")) {
          btn.classList.add("dropdown__value-btn_disabled");
        }
      },
    };
    this.controller = {
      isSingleTitle: this.options.isSingleTitle,
      isBtnEnabled: this.options.isBtnEnabled,
      incVal: (fieldId) => {
        this.model.increaseFieldValue(fieldId);
        let sumOfFieldValues = this.model.countFieldValues();
        this.view.onFieldsChanged(this.model.fields);
        this.view.activateDecreaseBtn(fieldId);
        if (this.isSingleTitle) {
          this.view.singleTitleChange(this.model.singleTitle());
        } else {
          this.view.listTitleChange(this.model.listTitle());
        }
        if (this.options.isBtnEnabled) {
          this.view.showClearBtn(sumOfFieldValues);
        }
      },
      decVal: (fieldId) => {
        this.model.decreaseFieldValue(fieldId);
        let sumOfFieldValues = this.model.countFieldValues();
        this.view.onFieldsChanged(this.model.fields);
        this.view.activateDecreaseBtn(fieldId);
        if (this.options.isSingleTitle) {
          this.view.singleTitleChange(this.model.singleTitle());
        } else {
          this.view.listTitleChange(this.model.listTitle());
        }
        if (this.options.isBtnEnabled) {
          this.view.showClearBtn(sumOfFieldValues);
        }
      },

      changeVal: (fieldId, value) => {
        this.model.changeFieldValue(fieldId, value);
        let sumOfFieldValues = this.model.countFieldValues();
        this.view.onFieldsChanged(this.model.fields);
        this.view.activateDecreaseBtn(fieldId);
        if (this.options.isSingleTitle) {
          this.view.singleTitleChange(this.model.singleTitle());
        } else {
          this.view.listTitleChange(this.model.listTitle());
        }
        if (this.options.isBtnEnabled) {
          this.view.showClearBtn(sumOfFieldValues);
        }
      },
      clearVal: () => {
        this.model.resetAllValues();
        let sumOfFieldValues = this.model.countFieldValues();
        this.view.onFieldsChanged(this.model.fields);
        for (let field in this.options.fields) {
          this.view.activateDecreaseBtn(field);
        }
        if (this.options.isSingleTitle) {
          this.view.singleTitleChange(this.model.singleTitle());
        } else {
          this.view.listTitleChange(this.model.listTitle());
        }
        if (this.options.isBtnEnabled) {
          this.view.showClearBtn(sumOfFieldValues);
        }
      },
    };
    this.view.createDropdown();
    this.view.populateMenu(this.options.fields);
    this.view.toggleMenu();
    this.view.bindIncreaseFieldValue(this.controller.incVal);
    this.view.bindDecreaseFieldValue(this.controller.decVal);
    this.view.bindChangeFieldValue(this.controller.changeVal);
    this.view.onEnterPress();
    if (this.options.isBtnEnabled) {
      this.view.onAcceptBtnPress();
      this.view.onClearBtnPress(this.controller.clearVal);
    }
  }
}
