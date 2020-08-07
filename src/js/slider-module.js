export const sliderModule = (function() {
  function initSlider(id, slidercount, countScroll) {

    const crslRoot = document.getElementById(id),
    sliderCount = slidercount,
    sliderScroll = countScroll,
    list = crslRoot.getElementsByTagName("ul"),
    items = crslRoot.getElementsByTagName("li"),
    leftArrow = crslRoot.querySelector(".slider-arrow-left"),
    rightArrow = crslRoot.querySelector(".slider-arrow-right"),
    wrapperDots = crslRoot.querySelector(".slider-dots"),
    pageWidth = crslRoot.offsetWidth,
    itemWidth = pageWidth / sliderCount,//ширина элемента
    movePosition = sliderScroll * itemWidth, //на сколько сдвигать
    itemCount = items.length;

    let position = 0;

    for (let i = 0; i < items.length; i++) {
      items[i].style.minWidth = `${itemWidth}px`;
    }

    leftArrow.addEventListener("click", () => {
      const itemLeft = Math.abs(position) / itemWidth;
      position +=
        itemLeft >= sliderScroll ? movePosition : itemLeft * itemWidth;
      setPosition();
      checkArrow();
    });

    rightArrow.addEventListener("click", () => {
      const itemLeft =
        itemCount - (Math.abs(position) + sliderCount * itemWidth) / itemWidth;
      position -=
        itemLeft >= sliderScroll ? movePosition : itemLeft * itemWidth;
      setPosition();
      checkArrow();
    });

    const setPosition = () => {
      list[0].style.transform = `translateX(${position}px)`;
    };

    const checkArrow = () => {
      if (position !== 0) {
        leftArrow.classList.remove("slider-arrow-not-get");
      } else {
        leftArrow.classList.add("slider-arrow-not-get");
      }
      if (position <= -(itemCount - sliderCount) * itemWidth) {
        rightArrow.classList.add("slider-arrow-not-get");
      } else {
        rightArrow.classList.remove("slider-arrow-not-get");
      }
    };
    const countDots = Math.ceil(itemCount / sliderCount);

    function initDots() {
      for (let i = 0; i < countDots; i++) {
        wrapperDots.appendChild(createDot(i));
      }
    }
    wrapperDots.addEventListener("click", handleDotClick);

    function handleDotClick(event) {
      let target = event.target;

      if (target.className === "dot-slider") {
        target.classList.add("active-dot");
        scrollWithDots(target);
        activeDot(target);
      }
    }

    function scrollWithDots(element) {
      let attribute = element.getAttribute("data-index");
      position = -attribute * pageWidth;

      if (
        attribute * sliderCount > itemCount - sliderCount &&
        attribute <= itemCount
      ) {
        position = -(itemCount - sliderCount) * itemWidth;
      }
      setPosition();
    }

    function createDot(index) {
      const dot = document.createElement("span");
      dot.classList.add("dot-slider");
      dot.setAttribute("data-index", index);
      return dot;
    }

    function activeDot(element) {
      const arrDots = wrapperDots.querySelectorAll(".dot-slider");
      for (let dot of arrDots) {
        dot.classList.remove("active-dot");
      }
      element.classList.add("active-dot");
    }

    initDots(items);
  }
  return {
    initSlider
  };
})();
