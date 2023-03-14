// user types in team and selects from dropdown menu
// team stats and a song linked to the team will appear
// add eventListener to the form
// capture the users search term
// add search term to the request url
// add api key
// set up our fetch call
// handle the response
// loop over data 
// render data to the page
// user clicks reset button
// song and team stats dissappear

// Autocomplete widget
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const teamBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
var imageContainer = document.querySelector('#giphy-images')
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
  let userData = e.target.value; // user entered data
  let emptyArray = [];
  if(userData){
    emptyArray = teams.filter((data)=>{
      // filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data)=>{
      // passing return data inside li tag
      return data = `<li>${data}</li>`;
    });
    searchWrapper.classList.add("active"); // show autocomplete box
    showTeams(emptyArray);
    let allList = teamBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      // adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active"); // hide autocomplete box
  }
}

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  searchWrapper.classList.remove("active");
}

function showTeams(list) {
  let listData;
  if(!list.length){
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join('');
  }
  teamBox.innerHTML = listData;
}

function displayGiphys(event) {
  event.preventDefault();
  
  var searchTerm = inputBox.value;
  console.log(searchTerm);
  var apiKey = 'X1UC9EboOvWecSBjWd0oHOvipre8bgHX';
  var giphyUrl = 'https://api.giphy.com/v1/gifs/search';
  var offset = Math.floor(Math.random() * 200); // generate a random offset between 0 and 200
  var requestUrl = giphyUrl + '?api_key=' + apiKey + '&limit=5&rating=g&q=' + searchTerm + '&offset=' + offset;
  
  fetch(requestUrl)
  .then(function(response) {
    console.log('The status of this page is', response.status + '.');
    return response.json();
    
  }).then(function(giphs) {
    console.log('You searched for:', giphs.data);
    imageContainer.innerHTML = ''

    for (var i = 0; i < giphs.data.length; i++) {
      var title = giphs.data[i].title;
      var imageTag = document.createElement('img');
      var imageTitle = document.createElement('p');
      imageTag.setAttribute('src', giphs.data[i].images.original_still.url);
      imageTag.setAttribute('data-animate', giphs.data[i].images.original.url);
      imageTag.setAttribute('data-still', giphs.data[i].images.original_still.url);
      imageTag.setAttribute('data-state', "still")
      imageTitle.textContent = title;
      imageContainer.append(imageTag);
    }
  });
};

// Listen for any clicks within the img-container div
imageContainer.addEventListener("click", function(event) {
  var element = event.target;
  console.log('target', event.target);
  // Check if the clicked element was an image
  if (element.matches("img")) {
    // Get the current value of the image's data-state attribute
    var state = element.getAttribute("data-state");

    if (state === "still") {
      // Change the data-state attribute's value
      // There are two different ways this attribute can be set
      element.dataset.state = "animate";
      element.setAttribute("data-state", "animate");

      // Update the image's source to the string being stored in the data-animate attribute
      element.setAttribute("src", element.dataset.animate);
    } else {
      // Change the attributes back to their non-animated values
      element.dataset.state = "still";
      element.setAttribute("src", element.dataset.still);
    }
  }
});

//Youtube Api
//fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=surfing&key=AIzaSyD51ROkLO7Tj0gCUhdXzYzD-EmqGUCV1iI')
// Replace YOUR_API_KEY with your actual YouTube API key
const ytApiKey = 'AIzaSyD51ROkLO7Tj0gCUhdXzYzD-EmqGUCV1iI';
const ytUrl = 'https://www.googleapis.com/youtube/v3';

let player;

function search() {
  const query = document.getElementById('query').value;
  const url = `${ytUrl}/search?key=${ytApiKey}&part=snippet&q=${query}&type=video`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const videoId = data.items[0].id.videoId;
      play(videoId);
    })
    .catch(error => console.error(error))
}

//Get the video to play
function play(videoId) {
  if (player) {
    player.loadVideoById(videoId);
  } else {
    player = new ytApiKey.Player('player', {
      height: '360',
      width: '640',
      videoId: videoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
  }
}
function onPlayerReady(event) {
  event.target.playVideo();
}
function onPlayerStateChange(event) {}

icon.addEventListener('click', displayGiphys);
