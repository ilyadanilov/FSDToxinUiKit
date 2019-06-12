(function() {
  const sliderFields = document.querySelectorAll('.slider__field');
  const sliderBase = document.querySelector('.slider__base');
  const sliderHandle = document.querySelector('.slider__handle');
  const minMax = [0,100000];
  let initialX;
  let currentX;
  let xOffset = 0;
  let active = false;
  sliderFields.forEach((field, i)=> {
    field.placeholder = minMax[i];
  });
  sliderBase.addEventListener('touchstart', dragStart, false);
  sliderBase.addEventListener('touchend', dragEnd, false);
  sliderBase.addEventListener('touchmove', drag, false);
  sliderBase.addEventListener('mousedown', dragStart, false);
  sliderBase.addEventListener('mouseup', dragEnd, false);
  sliderBase.addEventListener('mousemove', drag, false);

  function dragStart(e) {
    // if (e.target === sliderBase) {
    //  moveHandle();
    // } else {
     if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
    } else {
      initialX = e.clientX - xOffset;
      console.log(e.type);
    }
    if (e.target === sliderHandle) {
      active = true;
    }
    //}
  }
  // function moveHandle() {переместить ближайший ползунок к месту клика, учитывая шаг, непересекая другой ползунок и изменить значение инпута}
  function dragEnd(e) {
    initialX = currentX;
    active = false;
  }

  function drag(e) {
    if (active ) {

      e.preventDefault();

      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
      } else {
        currentX = e.clientX - initialX;
      }

      xOffset = currentX;

      setTranslate(currentX, sliderHandle);
      console.log(e.type);
    }
  }
  function setTranslate(xPos, el) {
    el.style.transform = `translateX(${xPos}px)`;
  }

})();
