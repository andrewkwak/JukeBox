const $play = $("#play");
const $pause = $("#pause");
const $stop = $("#stop");
const $next = $("#next");
const $previous = $("#previous");
const $textbox = $("#info");
const $shuffle = $("#shuffle");
let songNumber = 0;
let num;

var songs = [{
        title: "Miracle",
        artist: "Donnie Trumpet",
        album: "Surf",
        audioSrc : "audio/01.mp3"
    },
    {
        title: "Slip Slide",
        artist: "Donnie Trumpet",
        album: "Surf",
        audioSrc: "audio/02.mp3"
    },
    {
        title: "Warm Enough",
        artist: "Donnie Trumpet",
        album: "Surf",
        audioSrc: "audio/03.mp3"
    },
    {
      title: "Nothing Came To Me",
      artist: "Donnie Trumpet",
      album: "Surf",
      audioSrc: "audio/04.mp3"
    },
    {
      title: "Wanna Be Cool",
      artist: "Donnie Trumpet",
      album: "Surf",
      audioSrc: "audio/05.mp3"
    }
];

function JukeBox(songs) {
  this.songs = songs;

  this.playSong = function(number){
    console.log($("#song").attr("src"));
    if($("#song").attr("src") !== songs[number].audioSrc){
      $play.css('background-color', 'red');
      $("#song").attr("src", songs[number].audioSrc);
      $("#song")[0].play();
    }
    else{
      $play.css('background-color', 'red');
      $("#song")[0].play();
    }

  }

  this.addSong = function(song){
    songs.push(song);
  }

  this.fillInfo = function(number){
    document.getElementById("songTitle").textContent = "Title: " + songs[number].title;
    document.getElementById("artistName").textContent = "Artist: " + songs[number].artist;
    document.getElementById("albumName").textContent = "Album: " + songs[number].album;
  }

  this.stopSong = function() {
    $("#song")[0].pause();
    $("#song")[0].currentTime = 0;
    $play.css('background-color', 'white');
  }

  this.pauseSong = function() {
    $play.css('background-color', 'white');
    $("#song")[0].pause();
  }

  this.nextSong = function() {
    songNumber++;
    songNumber = songNumber % songs.length;
  }

  this.prevSong = function() {
    songNumber = (((songNumber - 1) % songs.length) + songs.length) % songs.length;
  }

  this.shuffleSong = function() {
    num = Math.floor(Math.random() * (songs.length));
    return num;
  }

}

var myJukeBox = new JukeBox(songs);

$play.on("click", ()=>{
  myJukeBox.playSong(songNumber);
  myJukeBox.fillInfo(songNumber);
})


$pause.on("click", ()=>{
  myJukeBox.pauseSong();
})

$stop.on("click", ()=>{
  myJukeBox.stopSong();
})

$next.on("click", ()=>{
  myJukeBox.nextSong();
  myJukeBox.playSong(songNumber);
  myJukeBox.fillInfo(songNumber);
})

$previous.on("click", ()=>{
  myJukeBox.prevSong();
  myJukeBox.playSong(songNumber);
  myJukeBox.fillInfo(songNumber);
})

$shuffle.on("click", ()=>{
  myJukeBox.playSong(myJukeBox.shuffleSong());
  myJukeBox.fillInfo(myJukeBox.shuffleSong());
  console.log(num);
})

document.querySelector("form").addEventListener("submit", function(e){
  e.preventDefault();
  let track = document.querySelector("input").value;
  $.ajax({
    url: "https://api.spotify.com/v1/search",
    data: {
      q: track,
      type: "track"
    },
    success: function(response){
      let artistName = response.tracks.items[0].artists[0].name;
      let albumName = response.tracks.items[0].album.name;
      let trackName = response.tracks.items[0].name;
      let audio = response.tracks.items[0].preview_url;
      console.log(response);
      let newSong = {
        title: trackName,
        artist: artistName,
        album: albumName,
        audioSrc: audio
      };

      myJukeBox.addSong(newSong);
      myJukeBox.playSong(songs.length-1);
      myJukeBox.fillInfo(songs.length-1);

    }
  })
})
