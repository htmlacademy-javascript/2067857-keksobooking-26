import { priceField } from './form-validation.js';

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

function onSliderRangeChange() {
  sliderElement.noUiSlider.on('change', () => {
    priceField.value = sliderElement.noUiSlider.get();
  });
  priceField.addEventListener('input', () => {
    sliderElement.noUiSlider.set(priceField.value);
  });
}
onSliderRangeChange();
