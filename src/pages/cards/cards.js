import "../../fonts/Montserrat-Bold.ttf";
import "../../fonts/Montserrat-Regular.ttf";
import "../../fonts/Quicksand-Regular.ttf";
require("./cards.pug");

import "../../includes/formElements/date-picker/date-picker";
import "../../includes/cards/**/*.js";
import "../../scss/pages/_cards.scss";
import "lightpick/scss/lightpick.scss";
import Lightpick from "lightpick";

var cardDatePicker = new Lightpick({
  field: document.getElementById("card-date"),
  inline: true,
  lang: "ru",
  locale: {
    tooltip: {
      one: "день",
      few: "дня",
      many: "дней",
    },
    buttons: {
      apply: "Применить",
      reset: "Очистить",
    },
    pluralize: function (i, locale) {
      if ("one" in locale && i % 10 === 1 && !(i % 100 === 11))
        return locale.one;
      if (
        "few" in locale &&
        i % 10 === Math.floor(i % 10) &&
        i % 10 >= 2 &&
        i % 10 <= 4 &&
        !(i % 100 >= 12 && i % 100 <= 14)
      )
        return locale.few;
      if (
        "many" in locale &&
        (i % 10 === 0 ||
          (i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9) ||
          (i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14))
      )
        return locale.many;
      if ("other" in locale) return locale.other;

      return "";
    },
  },
  format: "YYYY-MM-DD",
  footer: true,
  selectForward: true,
});
