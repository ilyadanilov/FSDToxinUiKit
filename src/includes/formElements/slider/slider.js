import noUiSlider from 'nouislider/distribute/nouislider.js';
var slider = document.querySelector('.slider');

noUiSlider.create(slider, {
  start: [20, 80],
  padding: [5, 5],
  connect: true,
  range: {
    min: 0,
    max: 100
  }
});
