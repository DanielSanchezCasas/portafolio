const icons = document.querySelectorAll(".slide i");
const halfViewportWidth = window.innerWidth / 2;
const distanceThreshold = window.innerWidth * 0.25;

const iconsDentroUmbral = [];

function verificarEnCentro() {
  icons.forEach((icon) => {
    const positionX = icon.getBoundingClientRect().left;
    const isWithinThreshold = Math.abs(positionX - halfViewportWidth) <= distanceThreshold;

    const wasWithinThreshold = iconsDentroUmbral.includes(icon);

    if (isWithinThreshold) {
      if (!wasWithinThreshold) {
        icon.classList.add("icon-hovered");
        iconsDentroUmbral.push(icon);
      }
    } else {
      if (wasWithinThreshold) {
        icon.classList.remove("icon-hovered");
        const index = iconsDentroUmbral.indexOf(icon);
        iconsDentroUmbral.splice(index, 1);
      }
    }
  });
}
setInterval(verificarEnCentro, 100);