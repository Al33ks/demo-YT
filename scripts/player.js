const body = document.querySelector("body");
const video = document.querySelector("#video");
const playButton = document.querySelector("#play-button");
const playIcon = document.querySelector("#play-icon");
const configButton = document.querySelector("#config-button");
const configTempoButton = document.querySelector("#config-tempo-button");
const volumeInput = document.querySelector("#volume-input");
const watchProgress = document.querySelector("#watch-progress");
const currentTimeElement = document.querySelector("#current-time");
const durationTimeElement = document.querySelector("#duration-time");
const configPopup = document.querySelector("#popup-config");
const tempoPopup = document.querySelector("#popup-tempo");
const popupTempoOptionElements = document.querySelectorAll(
  "#popup-tempo .option"
);
const barWrapperElement = document.querySelector("#bar-wrapper");

const togglePlay = () => {
  video.paused ? video.play() : video.pause();
};

const handlePlayButtonClick = () => {
  togglePlay();
};

const handleBodyKeyDown = (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    togglePlay();
  }
};

const handleVideoClick = () => {
  togglePlay();
};

const formatTime = (input) => {
  return moment.utc(input * 1000).format("m:ss");
};

const countProgress = (currentTime, durationTime) => {
  const progress = (currentTime / durationTime) * 100;
  return `${progress}%`;
};

const handleVideoPause = () => {
  playIcon.src = "../assets/play.svg";
};

const handleVideoPlaying = () => {
  playIcon.src = "../assets/pause.svg";
};

const handleVolumeInputChange = (event) => {
  event.stopPropagation();
  const nextVolume = event.target.value;
  video.volume = nextVolume;
};

const handleVideoTimeUpdate = () => {
  currentTimeElement.innerText = formatTime(video.currentTime);
  watchProgress.style.width = countProgress(video.currentTime, video.duration);
};

const handleVideoDurationChange = () => {
  durationTimeElement.innerText = formatTime(video.duration);
};

const handleBarWrapperClick = (event) => {
  const newCurrentTime =
    (event.offsetX / barWrapperElement.offsetWidth) * video.duration;
  video.currentTime = newCurrentTime;
};

body.addEventListener("keydown", handleBodyKeyDown);

playButton.addEventListener("click", handlePlayButtonClick);

video.addEventListener("click", handleVideoClick);

video.addEventListener("playing", handleVideoPlaying);
video.addEventListener("pause", handleVideoPause);

volumeInput.addEventListener("change", handleVolumeInputChange);

video.addEventListener("timeupdate", handleVideoTimeUpdate);

video.addEventListener("durationchange", handleVideoDurationChange);

barWrapperElement.addEventListener("click", handleBarWrapperClick);
