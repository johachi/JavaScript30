/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('video');

const toggleButton = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = player.querySelector('.fullscreen');

/* Our functions */
function togglePlay(){
  if(video.paused){
    video.play();
  }else{
    video.pause();
  }
}

function togglePlayIcon(){
  const icon = this.paused ? '►' : '❚ ❚';
  toggleButton.textContent = icon;
}

function skip(){
  video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name] = this.value;
}

function handleProgress(){
  const progress = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${progress}%`;
}

function scrub(e){
  //console.log(e)
  if(e.buttons !== 0){
    const presentage = e.offsetX / 640;
    video.currentTime = video.duration * presentage;
    e.preventDefault()
  }
}

function requestFullscreen(){
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.mozRequestFullScreen) { /* Firefox */
    player.mozRequestFullScreen();
  } else if (player.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) { /* IE/Edge */
    player.msRequestFullscreen();
  }
}

/* Our listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', togglePlayIcon);
video.addEventListener('pause', togglePlayIcon);
video.addEventListener('timeupdate', handleProgress);

toggleButton.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => { skipButton.addEventListener('click', skip); });
ranges.forEach(range => { range.addEventListener('change', handleRangeUpdate); });
ranges.forEach(range => { range.addEventListener('mousemove', handleRangeUpdate); });

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', scrub);

fullScreenButton.addEventListener('click', requestFullscreen);