// const myApi = 'AIzaSyBsKnp4M8x1OCA7xNSRIJ-BN98k1nQ6FZo';
const googleUrl = 'https://www.googleapis.com/youtube/v3';

let player;

function search() {
  const query = document.getElementById('query').value;
  const url = `${googleUrl}/search?key=${myApi}&part=snippet&q=${query}&type=video&videoEmbeddable=true&maxResults=1&videoDuration=short`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const videoId = data.items[0].id.videoId;
      play(videoId);
    })
    .catch(error => console.error(error));
}

function play(videoId) {
  if (player) {
    player.loadVideoById(videoId);
  } else {
    player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: videoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
}

document.querySelector('.icon').addEventListener('click', function(event) {
  event.preventDefault();
  search();
  document.getElementById('query').value = '';
});