import noUiSlider from 'nouislider/distribute/nouislider.js';
var slider = document.querySelector('.slider');

noUiSlider.create(slider, {
  start: [20, 80],
  connect: true,
  range: {
    min: 0,
    max: 100
  },
  format: {
    // 'to' the formatted value. Receives a number.
    to: function (value) {
        return Number.parseInt(value);
    },
    // 'from' the formatted value.
    // Receives a string, should return a number.
    from: function (value) {
        return Number.parseInt(value);
    }
}

});
const handleValues = [
  document.querySelector('.value-lower'),
  document.querySelector('.value-upper')
];

slider.noUiSlider.on('update', function (values, handle) {
  handleValues[handle].innerHTML = `${values[handle]} ₽`;
});
