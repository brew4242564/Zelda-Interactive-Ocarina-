// Declaraciones
let blockListener = false;
let acum = "";
const songName = document.querySelector(".song-name");
const notesDisplay = document.querySelector(".score");
const MAX_NOTES = 8;
const acumNotesImg = []; // necessary for notes control
const songKeys = document.querySelector(".song-book");
const sheetSongs = document.querySelector(".song-book");
const currentNote = {};
// lists
const imgNotes = {
  w: "./img/w.png",
  a: "./img/a.png",
  s: "./img/s.png",
  d: "./img/d.png",
  j: "./img/j.png",
};

const songBook = new Map([
  ["sdasda", { title: "Saria's song", file: "saria.mp3" }],
  ["awdawd", { title: "Zelda's Lullaby", file: "zelda.mp3" }],
  ["wadwad", { title: "Epona's Theme", file: "epona.mp3" }],
  ["dswdsw", { title: "Sun's Song", file: "sun.mp3" }],
  ["djsdjs", { title: "Song of Time", file: "sot.mp3" }],
  ["jswjsw", { title: "Song of Storms", file: "sos.mp3" }],
  ["jwadad", { title: "Minuet of Forest", file: "minuet.mp3" }],
  ["sjsjdsds", { title: "Bolero of Fire", file: "bolero.mp3" }],
  ["jsddd", { title: "Serenade of Water", file: "serenade.mp3" }],
  ["addjads", { title: "Nocturne of Shadow", file: "nocturne.mp3" }],
  ["wdwdaw", { title: "Prelude of Light", file: "prelude.mp3" }],
  ["jsjdsj", { title: "Requiem of Spirit", file: "requiem.mp3" }],
]);

const noteSounds = {
  w: "./notes/w.wav",
  a: "./notes/a.wav",
  s: "./notes/s.wav",
  d: "./notes/d.wav",
  j: "./notes/j.wav",
};

// functions

document.addEventListener("keydown", (event) => {
  if (blockListener) {
    event.preventDefault();
    return;
  }
  const key = event.key.toLowerCase();

  if (currentNote[key]) return;
  switch (key) {
    case "w":
      drawNotes(key);
      playNotes(key);
      acum = acum + key;
      break;
    case "s":
      drawNotes(key);
      playNotes(key);
      acum = acum + key;
      break;
    case "d":
      drawNotes(key);
      playNotes(key);
      acum = acum + key;
      break;
    case "a":
      drawNotes(key);
      playNotes(key);
      acum = acum + key;
      break;
    case "j":
      drawNotes(key);
      playNotes(key);
      acum = acum + key;
      break;
  }

  if (acum.length >= MAX_NOTES) {
    acum = acum.slice(-MAX_NOTES);
    for (let index = 5; index < MAX_NOTES; index++) {
      let aux = acum.slice(-index);
      console.log(index);
      console.log(aux);

      if (songBook.has(aux)) {
        acum = aux;
        break;
      }
    }
  }

  if (songBook.has(acum)) {
    event.preventDefault();
    showSong(acum);
    acum = "";
  }
});

function drawNotes(note) {
  console.log("nota tocada: " + note);

  const img = document.createElement("img");
  img.classList.add("note");
  img.src = imgNotes[note];

  switch (note) {
    case "w":
      img.style.bottom = "30px";
      break;
    case "s":
      img.style.top = "30px";
      break;
    case "a":
      img.style.bottom = "10px";
      break;
    case "d":
      img.style.top = "5px";
      break;
    // boton a va centrado
  }
  notesDisplay.appendChild(img);
  acumNotesImg.push(img);

  if (acumNotesImg.length >= MAX_NOTES + 1) {
    const firstNote = acumNotesImg.shift();
    firstNote.remove();
  }
}

function playNotes(key) {
  const audio = new Audio(noteSounds[key]);
  audio.volume = 1;
  audio.play();
  currentNote[key] = audio;
}

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();

  const audio = currentNote[key];
  if (!audio) return;

  fadeOut(audio, 450);
  delete currentNote[key];
});


function fadeOut(audio, time){
  const steps = 10;
  const stepTime = time / steps;
  const volumeStep = audio.volume / steps;

  const fade = setInterval(()=>{
    audio.volume = Math.max(0, audio.volume - volumeStep);

    if(audio.volume <= 0) {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(fade);
    }
  }, stepTime);
}
function showSong(notes) {
  const songData = songBook.get(notes);
  songName.innerText = songData.title;
  songName.style.color = "green";
  songName.style.fontSize = "35px";
  playSong(songData.file);
}

function playSong(filename) {
  stopNotes();

  const url = "./songs/" + filename;
  const song = new Audio(url);
  song.volume = 1;
  song.play();
  blockListener = true;

  song.addEventListener("ended", () => {
    blockListener = false;
    clearNotes();
    songName.innerText = "";
  });
}

function stopNotes(){
  for(const key in currentNote){
    fadeOut(currentNote, 100);
  }
  Object.keys(currentNote).forEach(k => delete currentNote[k]);
}

function clearNotes() {
  for (const note of acumNotesImg) {
    note.remove();
  }
  acumNotesImg.length = 0;
}

// last one..

function loadSheet() {
  const book = Array.from(songBook.keys());
  console.log(book);

  for (let i = 0; i < book.length; i++) {
    // song names
    const songData = songBook.get(book[i]);
    title = songData.title;
    const names = document.createElement("p");
    names.classList.add("songs");
    names.textContent = title;
    sheetSongs.appendChild(names);
    console.log(book[i]);
    // song notes

    aux = book[i].split("");

    for (const note of aux) {
      const notes = document.createElement("img");
      notes.src = imgNotes[note];
      sheetSongs.appendChild(notes);
    }
  }
}

loadSheet();

