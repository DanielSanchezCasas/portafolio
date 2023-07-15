function checkHeight(mobileMenu, targetHeight, applyStyle, removeStyle) {
  var currentHeight = mobileMenu.getBoundingClientRect().height;
  var overlayContent = document.querySelector(".overlay-content");

  if (applyStyle(currentHeight, targetHeight) && overlayContent.style.borderBottom === "") {
    overlayContent.style.borderBottom = "solid 7px #fffe7e"; // Reemplaza #fffe7e con el color deseado
  }

  if (removeStyle(currentHeight, targetHeight) && overlayContent.style.borderBottom !== "") {
    overlayContent.style.borderBottom = ""; // Elimina el estilo de borde
  }

  if (currentHeight !== targetHeight) {
    requestAnimationFrame(function () {
      checkHeight(mobileMenu, targetHeight, applyStyle, removeStyle);
    });
  }
}

function openNav() {
  var mobileMenu = document.getElementById("mobile-menu");
  var targetHeight = 5 * parseFloat(getComputedStyle(document.documentElement).fontSize);

  mobileMenu.style.height = "100%";

  function applyStyle(currentHeight, targetHeight) {
    return currentHeight >= targetHeight;
  }

  function removeStyle(currentHeight, targetHeight) {
    return currentHeight <= targetHeight;
  }

  checkHeight(mobileMenu, targetHeight, applyStyle, removeStyle);
  toggleScrolling(false);
}

function closeNav() {
  var mobileMenu = document.getElementById("mobile-menu");
  var targetHeight = 5 * parseFloat(getComputedStyle(document.documentElement).fontSize);

  function applyStyle(currentHeight, targetHeight) {
    return currentHeight >= targetHeight;
  }

  function removeStyle(currentHeight, targetHeight) {
    return currentHeight <= targetHeight;
  }

  checkHeight(mobileMenu, targetHeight, applyStyle, removeStyle);

  mobileMenu.style.height = "0%";
  toggleScrolling(true);
}


function toggleScrolling(enableScroll) {
  const body = document.body;
  if (enableScroll) {
    body.style.overflow = "auto";
  } else {
    body.style.overflow = "hidden";
  }
}