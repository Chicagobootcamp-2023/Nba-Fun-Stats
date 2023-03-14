const myApi = 'AIzaSyCd4CWH-p6H3sIHmBM3Sx-GI6OMDGdEORI';
const googleUrl = 'https://www.googleapis.com/youtube/v3';

let player;

// Function gets called when user submits a search. 
// Creates a url based on the users search and "fetches" data from the api to embedd the video and play it.

function search() {
  const query = document.getElementById('input').value;
  const url = `${googleUrl}/search?key=${myApi}&part=snippet&q=${query}&type=video&videoEmbeddable=true&maxResults=1&videoDuration=short`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const videoId = data.items[0].id.videoId;
      play(videoId);
    })
    .catch(error => console.error(error));
}

// Loads the youtube video reuquested and also reloads a new youtube video 
// within the same container if user submits a new search.

function play(videoId) {
  if (player) {
    player.loadVideoById(videoId);
  } else {
    player = new YT.Player('youtube-player', {
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
// Plays the video once it is uploaded.

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
}

// Adds an event listener to enable the user to submit their searches along with a "prevent default function" 
// that allows the user to submit additional searches without having to refresh the page.

document.querySelector('.search-button').addEventListener('click', function(event) {
  event.preventDefault();
  search();
  document.getElementById('query').value = '';
});