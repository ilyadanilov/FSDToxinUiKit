import DropdownMenu from "../../formElements/dropdown/dropdown";

const roomBooking = new DropdownMenu({
  id: "room-booking",
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
