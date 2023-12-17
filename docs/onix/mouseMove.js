function hideCursorTime() {
  let mousePosX = 0;
  let mousePosY = 0;
  let hideCursor = false;

  window.addEventListener("mousemove", (e) => {
    if (mousePosX !== e.clientX && mousePosY !== e.clientY) {
      document.body.style.cursor = "default";
      hideCursor = false;
    }

    setTimeout(() => {
      if (mousePosX === e.clientX && mousePosY === e.clientY) {
        document.body.style.cursor = "none";
        hideCursor = true;
      }
    }, 2000);

    mousePosX = e.clientX;
    mousePosY = e.clientY;
  });
}
