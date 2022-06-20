const controlPanel = document.querySelector('.control-container'),
      playBtn = document.querySelector('.icon-play'),
      prevBtn = document.querySelector('.icon-backward'),
      nextBtn = document.querySelector('.icon-forward'),
      audio = document.querySelector('#audio'),
      image = document.querySelector('.track-image'),
      effect = document.querySelector('.effect-container'),
      trackAuthor = document.querySelector('.track-author'),
      trackTitle = document.querySelector('.track-title'),
      currentTime = document.querySelector('.current-time'),
      trackDuration = document.querySelector('.duration'),
      emptyLine = document.querySelector('.progress-container'),
      durationLine = document.querySelector('.duration-line');

const tracks = [
  {
    fileName: 'track1',
    imageName: 'image1',
    authorName: 'Claptone',
    trackTitle: 'La Esperanza'
  },
  {
    fileName: 'track2',
    imageName: 'image2',
    authorName: 'Fred again..',
    trackTitle: 'Marea'
  },
  {
    fileName: 'track3',
    imageName: 'image3',
    authorName: 'Marsh',
    trackTitle: 'Heaven'
  },
  {
    fileName: 'track4',
    imageName: 'image4',
    authorName: 'Hot since 82',
    trackTitle: 'Rules'
  },
  {
    fileName: 'track5',
    imageName: 'image5',
    authorName: 'Claptone',
    trackTitle: 'Under The Moon'
  },
  {
    fileName: 'track6',
    imageName: 'image6',
    authorName: 'Bag raiders',
    trackTitle: 'How Long'
  },
  {
    fileName: 'track7',
    imageName: 'image7',
    authorName: 'Chromatics',
    trackTitle: 'Shadow'
  }
]; 

// Load track to page

let trackIndex = 0;

function loadTrack(track) {
  trackAuthor.textContent = track.authorName;
  trackTitle.textContent = track.trackTitle;
  audio.src = `./assets/mp3/${track.fileName}.mp3`;
  image.src = `./assets/img/${track.imageName}.jpg`;
}
loadTrack(tracks[trackIndex]);

audio.onloadedmetadata = e => updateDuration(e);

// Play, pause track

let isPlay = false;

function playTrack() {
  isPlay = true;

  playBtn.classList.replace('play', 'pause');
  effect.classList.add('active');
  effect.classList.remove('paused');

  audio.play();
}

function pauseTrack() {
  isPlay = false;

  playBtn.classList.replace('pause', 'play');
  effect.classList.add('paused');

  audio.pause();
}

playBtn.addEventListener('click', () => {
  if(!isPlay) {
    playTrack();
  } else {
    pauseTrack();
  }
});

// Play previous, next track

function prevTrack() {
  trackIndex--;
  if(trackIndex < 0) {
    trackIndex = tracks.length - 1;
  }
  loadTrack(tracks[trackIndex]);
  if(isPlay) {
    playTrack();
  } else {
    loadTrack(tracks[trackIndex]);
    durationLine.style.width = `0%`;
  }
}

function nextTrack() {
  trackIndex++;
  if(trackIndex > tracks.length - 1) {
    trackIndex = 0;
  }
  loadTrack(tracks[trackIndex]);
  if(isPlay) {
    playTrack();
  } else {
    loadTrack(tracks[trackIndex]);
    durationLine.style.width = `0%`;
  }
}

prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);


// Update duration and progress

function updateDuration(e) {

  let current = e.srcElement.currentTime;
  let duration = e.srcElement.duration;

  currentTime.textContent = convertTime(current);

  let progressPercent = (current * 100) / duration;
  durationLine.style.width = `${progressPercent}%`;
}

audio.onloadedmetadata = (e) => {
  let duration = e.srcElement.duration;
  trackDuration.textContent = convertTime(duration);
};

function convertTime(time) {
  let mins = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${mins}:${seconds}`;
}

audio.addEventListener('timeupdate', updateDuration);

// Change progress

function changeProgress(e) {
  const lineWidth = this.clientWidth;
  const clickWidth = e.offsetX;
  const clickTime = (clickWidth * audio.duration) / lineWidth;
  audio.currentTime = clickTime;
}

emptyLine.addEventListener('click', changeProgress);

// Play next track

audio.addEventListener('ended', nextTrack);

// Self-rating

console.log(
  'Вёрстка +10 \n',
  'Кнопка Play/Pause +10 \n',
  'При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек +10 \n',
  'При смене аудиотрека меняется изображение - обложка аудиотрека +10 \n',
  'Прогресс-бар отображает прогресс проигрывания текущего аудиотрека +10 \n',
  'Отображается продолжительность аудиотрека и его текущее время проигрывания +10 \n',
  'светлая тема приложения сменяется тёмной +10 \n',
  'Очень высокое качество оформления приложения +10)'
  );