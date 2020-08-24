require("./index.pug");
import "./fonts/Montserrat-Bold.ttf";
import "./fonts/Montserrat-Regular.ttf";
import "./fonts/Quicksand-Regular.ttf";
import "./includes/formElements/**/*.js";
import "nouislider/distribute/nouislider.css";
import DropdownMenu from "./includes/formElements/dropdown/dropdown";
import "./images/icons/check.svg";
import "./images/icons/emoticon.svg";
import "./images/icons/location.svg";
import "./images/avatar.png";
import "./scss/main.scss";
import "lightpick/scss/lightpick.scss";

const person = new DropdownMenu({
  id: "dropdown-person",
  headingName: "Гости",
  isSingleTitle: true,
  isBtnEnabled: true,
  title: {
    // title - значения для изменения заголовка dropdown'a, если должно быть одно общее значение, т.е. общее количество гостей в данном случае.
    default: "Сколько гостей",
    one: "гость",
    few: "гостя",
    many: "гостей",
  },
  // Взрослые дети младенцы
  fields: {
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
  },
});
const dropOne = new DropdownMenu({
  id: "dropdown-one",
  headingName: "dropdown",
  isSingleTitle: false,
  isBtnEnabled: false,
  title: {
    // title - значения для изменения заголовка dropdown'a, если должно быть одно общее значение, т.е. общее количество гостей в данном случае.
    default: "Выбрать...",
  },
  // Взрослые дети младенцы
  fields: {
    bedrooms: {
      name: "спальни",
      minCount: 1,
      currentCount: 1,
      maxCount: 3,
      locale: { one: "спальня", few: "спальни", many: "спален" },
    },
    beds: {
      name: "кровати",
      minCount: 1,
      currentCount: 1,
      maxCount: 6,
      locale: { one: "кровать", few: "кровати", many: "кроватей" },
    },
    bathrooms: {
      name: "ванные комнаты",
      minCount: 1,
      currentCount: 1,
      maxCount: 3,
      locale: {
        one: "ванная комната",
        few: "ванные комнаты",
        many: "ванных комнат",
      },
    },
  },
});
const dropTwo = new DropdownMenu({
  id: "dropdown-two",
  headingName: "dropdown",
  isSingleTitle: false,
  isBtnEnabled: false,
  title: {
    // title - значения для изменения заголовка dropdown'a, если должно быть одно общее значение, т.е. общее количество гостей в данном случае.
    default: "Выбрать...",
  },
  // Взрослые дети младенцы
  fields: {
    bedrooms: {
      name: "спальни",
      minCount: 1,
      currentCount: 1,
      maxCount: 3,
      locale: { one: "спальня", few: "спальни", many: "спален" },
    },
    beds: {
      name: "кровати",
      minCount: 1,
      currentCount: 1,
      maxCount: 6,
      locale: { one: "кровать", few: "кровати", many: "кроватей" },
    },
    bathrooms: {
      name: "ванные комнаты",
      minCount: 1,
      currentCount: 1,
      maxCount: 3,
      locale: {
        one: "ванная комната",
        few: "ванные комнаты",
        many: "ванных комнат",
      },
    },
  },
});
const dropThree = new DropdownMenu({
  id: "dropdown-three",
  headingName: "dropdown",
  isSingleTitle: true,
  isBtnEnabled: true,
  title: {
    // title - значения для изменения заголовка dropdown'a, если должно быть одно общее значение, т.е. общее количество гостей в данном случае.
    default: "Сколько гостей",
    one: "гость",
    few: "гостя",
    many: "гостей",
  },
  // Взрослые дети младенцы
  fields: {
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
  },
});
const dropFour = new DropdownMenu({
  id: "dropdown-four",
  headingName: "dropdown",
  isSingleTitle: true,
  isBtnEnabled: true,
  title: {
    // title - значения для изменения заголовка dropdown'a, если должно быть одно общее значение, т.е. общее количество гостей в данном случае.
    default: "Сколько гостей",
    one: "гость",
    few: "гостя",
    many: "гостей",
  },
  // Взрослые дети младенцы
  fields: {
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
  },
});
