export const sliderModule = (function () {
  let wrapperSlider;
  let options = {};
  let position = 0;

  const sliderDefaultOptions = {
    sliderWrapperSelector: 'slider-wrapper',
    sliderListSelector: '.slider-list',
    sliderListItemSelector: '.slider-item',
    sliderArrowLeftSelector: '.slider-arrow-left',
    sliderArrowRightSelector: '.slider-arrow-right',
    dotsStyleClass: '.slider-dots',
  };

  function initSlider(id, slidercount, countScroll) {
    wrapperSlider = document.getElementById(id);
    const list = wrapperSlider.querySelector(sliderDefaultOptions.sliderListSelector);
    const items = wrapperSlider.querySelectorAll(
      sliderDefaultOptions.sliderListItemSelector
    );
    const leftArrow = wrapperSlider.querySelector(
      sliderDefaultOptions.sliderArrowLeftSelector
    );
    const rightArrow = wrapperSlider.querySelector(
      sliderDefaultOptions.sliderArrowRightSelector
    );
    const itemCount = items.length;
    const pageWidth = wrapperSlider.offsetWidth;
    const sliderScroll = countScroll;
    const sliderCount = slidercount;
    const itemWidth = pageWidth / sliderCount;
    const movePosition = sliderScroll * itemWidth;
    const wrapperDots = wrapperSlider.querySelector(sliderDefaultOptions.dotsStyleClass);
    const countDots = Math.ceil(itemCount / sliderCount);

    options = {
      ...sliderDefaultOptions,
      slidercount,
      countScroll,
      list,
      items,
      leftArrow,
      rightArrow,
      itemCount,
      pageWidth,
      sliderScroll,
      sliderCount,
      itemWidth,
      movePosition,
      wrapperDots,
      countDots
    };

    setWidth();
    checkArrow();
    slideToNext();
    slideToPrev();
    initDots();
    options.wrapperDots.addEventListener('click', handleDotClick);
  }

  function setWidth() {
    options.items.forEach(item => {
      item.style.minWidth = `${options.itemWidth}px`;
    });
  }

  function setPosition() {
    options.list.style.transform = `translateX(${position}px`;
  }

  function checkArrow() {
    if (position !== 0) {
      options.leftArrow.classList.remove('sliderEnded');
    } else {
      options.leftArrow.classList.add('sliderEnded');
    }
    if (
      position <=
      -(options.itemCount - options.sliderCount) * options.itemWidth
    ) {
      options.rightArrow.classList.add('sliderEnded');
    } else {
      options.rightArrow.classList.remove('sliderEnded');
    }
  }

  function slideToNext() {
    options.leftArrow.addEventListener('click', () => {
      const itemLeft = Math.abs(position) / options.itemWidth;
      position +=
        itemLeft >= options.sliderScroll
          ? options.movePosition
          : itemLeft * options.itemWidth;
      setPosition();
      checkArrow();
    });
  }

  function slideToPrev() {
    options.rightArrow.addEventListener('click', () => {
      const itemLeft =
        options.itemCount -
        (Math.abs(position) + options.sliderCount * options.itemWidth) /
        options.itemWidth;
      position -=
        itemLeft >= options.sliderScroll
          ? options.movePosition
          : itemLeft * options.itemWidth;
      setPosition();
      checkArrow();
    });
  }

  function initDots() {
    for (let i = 0; i < options.countDots; i++) {
      options.wrapperDots.appendChild(createDot(i));
    }
  }

  function handleDotClick(event) {
    let target = event.target;

    if (target.className === 'dot-slider') {
      target.classList.add('active-dot');
      scrollWithDots(target);
      activeDot(target);
    }
  }

  function scrollWithDots(element) {
    let attribute = element.getAttribute('data-index');
    position = -attribute * options.pageWidth;

    if (
      attribute * options.sliderCount >
      options.itemCount - options.sliderCount &&
      attribute <= options.itemCount
    ) {
      position = -(options.itemCount - options.sliderCount) * options.itemWidth;
    }
    setPosition();
  }

  function createDot(index) {
    const dot = document.createElement('span');
    dot.classList.add('dot-slider');
    dot.setAttribute('data-index', index);
    return dot;
  }

  function activeDot(element) {
    const arrDots = options.wrapperDots.querySelectorAll('.dot-slider');
    for (let dot of arrDots) {
      dot.classList.remove('active-dot');
    }
    element.classList.add('active-dot');
  }

  return {
    initSlider
  };
})();
