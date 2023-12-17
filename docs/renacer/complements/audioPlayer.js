const playIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';

const pauseIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';

const loadIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>';

const musicTimeRange = document.getElementById("musicSlider");
const meter = document.getElementById("animationDuration");
const playPauseButton = document.getElementById("playPauseButton");
let audioDuration, audioPlayReference, audio, musicParts;

let initialTime = 0;
let finishedTime = 0;
let currentTime = 0;
let isPlaying = false;

function audioControlsSetup(musicDirection, audioArray) {
  audio = new Audio(musicDirection);
  audio.addEventListener("loadedmetadata", function () {
    audioDuration = audio.duration;
    musicTimeRange.max = audioDuration;
  });

  musicParts = audioArray;
}

function playMusicButton() {
  playPauseButton.innerHTML = loadIcon;
  playPauseButton.setAttribute("id", "loadSpin");
  Tone.loaded().then(() => {
    if (isPlaying) pauseMusic();
    else playMusic();

    audioPlayReference = Tone.now();
    isPlaying = !isPlaying;
  });
}

function playMusic() {
  musicParts.forEach((musicPart) => {
    musicPart.start().seek(currentTime);
  });

  initialTime = Tone.now();
  playPauseButton.innerHTML = pauseIcon;
  playPauseButton.removeAttribute("id");
}

function pauseMusic() {
  musicParts.forEach((musicPart) => {
    musicPart.stop();
  });

  finishedTime = Tone.immediate();
  currentTime += finishedTime - initialTime;
  playPauseButton.innerHTML = playIcon;
  playPauseButton.removeAttribute("id");
}

function stopMusic() {
  Tone.loaded().then(() => {
    musicParts.forEach((musicPart) => {
      musicPart.stop();
    });
    currentTime = 0;
    initialTime = 0;
    finishedTime = 0;
    isPlaying = false;
    playPauseButton.innerHTML = playIcon;
    musicTimeRange.value = 0;
  });
}

function musicBar() {
  if (isPlaying) {
    const musicTime = currentTime + Tone.now() - audioPlayReference;
    musicTimeRange.value = musicTime;

    const minutes = musicTime ? Math.floor(musicTime / 60) : 0;
    const seconds = musicTime ? Math.floor(musicTime) % 60 : 0;
    meter.innerHTML = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    if (audioDuration <= musicTime) stopMusic();
  }
}

musicTimeRange.addEventListener("input", (event) => {
  pauseMusic();
  isPlaying = false;
  currentTime = Number(event.target.value);

  const musicTime = event.target.value;
  const minutes = musicTime ? Math.floor(musicTime / 60) : 0;
  const seconds = musicTime ? Math.floor(musicTime) % 60 : 0;
  meter.innerHTML = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
});
