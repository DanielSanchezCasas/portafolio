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

$(document).ready(function() {
  // Función para agregar la clase 'active' al elemento del menú según la sección visible en el viewport
  function updateMenuActiveClass() {
    var scrollPosition = $(window).scrollTop();

    $('.main-menu li').removeClass('active');
    $('.main-menu li a').each(function() {
      var target = $(this).attr('href');
      var targetPosition = $(target).offset().top;
      var targetHeight = $(target).outerHeight();

      if (scrollPosition >= targetPosition && scrollPosition < targetPosition + targetHeight) {
        $(this).parent().addClass('active');
      }
    });
  }

  // Ejecutar la función al cargar la página y en cada evento de scroll
  $(window).on('load scroll', function() {
    updateMenuActiveClass();
  });
});