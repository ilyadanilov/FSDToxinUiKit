import 'lightpick/css/lightpick.css';
import './scss/main.scss';
import components from './includes/**/*.js';
const Lightpick = require('lightpick');
var picker = new Lightpick({
  field: document.getElementById('datepick-1'),
  secondField: document.getElementById('datepick-2'),
  singleDate: false,
  format: 'DD.MM.YYYY',
  footer: true,
  repick: true,
  inline: true
});
