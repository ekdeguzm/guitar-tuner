import { notes, pitches } from './notes.js';

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let microphoneStream = null;
let analyserNode = audioCtx.createAnalyser();
// analyserNode.minDecibels = -90;
// analyserNode.maxDecibels = -10;
let audioData = new Float32Array(analyserNode.fftSize);
let corrolatedSignal = new Float32Array(analyserNode.fftSize);
let localMaxima = new Array(100);

const frequencyDisplayElement = document.getElementById("frequency");
const decibelsDisplayElement = document.getElementById("decibels");
const needleDisplayElement = document.getElementById("needle");
const notesDisplayElement = document.getElementById("notes");

const startButtonElement = document.getElementById("start");
startButtonElement.addEventListener("click", startPitchDetection);

function getClosestNote(pitch) {
  // find closest frequency
  let closest_pitch = closest(pitches, pitch);
  
  // find the assosciated sci_name
  let index_of_note = pitches.indexOf(closest_pitch);
  
  // Return the name of the note
  return notes[index_of_note].sci_name;
}

function getAngleForPitch(pitch) {
  // Return an angle that represents how close to the note you are
  // 22.5 degrees would be halfway between the current note and the next note
  // -22.5 degress would be halfway between the current note and the previous note
  
  // find closest frequency
  let closest_pitch = closest(pitches, pitch);
  let index_of_note = pitches.indexOf(closest_pitch);
  let index_of_previous_note = index_of_note-1;
  let index_of_next_note = index_of_note+1;
  
  let range = pitches[index_of_next_note] - pitches[index_of_previous_note];
  let pitch_position = (pitch - pitches[index_of_previous_note]) / range;
  let angle = (pitch_position * 90) - 45;
  
  return angle;
}


function startPitchDetection() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      microphoneStream = audioCtx.createMediaStreamSource(stream);
      microphoneStream.connect(analyserNode);

      audioData = new Float32Array(analyserNode.fftSize);
      corrolatedSignal = new Float32Array(analyserNode.fftSize);

      var maxDecibels = 30;

      setInterval(() => {
        analyserNode.getFloatTimeDomainData(audioData);

        let pitch = Math.round(getAutocorrolatedPitch());
        
        // get the average, bincount is fftsize / 2
        var array =  new Uint8Array(analyserNode.frequencyBinCount);
        analyserNode.getByteFrequencyData(array);
        
        var decibels = Math.round(getAverageVolume(array));
        decibelsDisplayElement.setAttribute("value", decibels);
        if (decibels > maxDecibels && decibels < 90) {
          maxDecibels = decibels;
          decibelsDisplayElement.setAttribute("max", decibels);
        }
        
        if (decibels > 5) {
          frequencyDisplayElement.innerHTML = `${pitch} Hz`;

          let angle = getAngleForPitch(pitch);
          needleDisplayElement.style = `transform: rotate(${angle}deg);`;

          let note = getClosestNote(pitch);
          notesDisplayElement.innerHTML = `${note}`;
        }
      }, 100);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getAutocorrolatedPitch() {
  let maximaCount = 0;

  for (let l = 0; l < analyserNode.fftSize; l++) {
    corrolatedSignal[l] = 0;
    for (let i = 0; i < analyserNode.fftSize - l; i++) {
      corrolatedSignal[l] += audioData[i] * audioData[i + l];
    }
    if (l > 1) {
      if (
        corrolatedSignal[l - 2] - corrolatedSignal[l - 1] < 0 &&
        corrolatedSignal[l - 1] - corrolatedSignal[l] > 0
      ) {
        localMaxima[maximaCount] = l - 1;
        maximaCount++;
        if (maximaCount >= localMaxima.length) break;
      }
    }
  }

  // Second: find the average distance in samples between maxima

  let maximaMean = localMaxima[0];

  for (let i = 1; i < maximaCount; i++)
    maximaMean += localMaxima[i] - localMaxima[i - 1];

  maximaMean /= maximaCount;

  return audioCtx.sampleRate / maximaMean;
}

function getAverageVolume(array) {
  var values = 0;
  var average;

  var length = array.length;

  // get all the frequency amplitudes
  for (var i = 0; i < length; i++) {
    values += array[i];
  }

  average = values / length;
  return average;
}

function closest(arr, num) {
   return arr.reduce((acc, val) => {
      if(Math.abs(val - num) < Math.abs(acc)){
         return val - num;
      } else {
         return acc;
      }
   }, Infinity) + num;
}