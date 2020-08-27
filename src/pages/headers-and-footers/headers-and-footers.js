import "../../fonts/Montserrat-Bold.ttf";
import "../../fonts/Montserrat-Regular.ttf";
import "../../fonts/Quicksand-Regular.ttf";
require("./headers-and-footers.pug");
import "../../scss/pages/_headers-and-footers.scss";
import DropdownMenu from "../../includes/formElements/dropdown/dropdown";

const roomSearch = new DropdownMenu({
  id: "room-search",
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

// import "../../includes/formElements/date-picker/date-picker";
// import "../../includes/cards/**/*.js";
// import "../../scss/pages/_cards.scss";
