import aubio from '/aubiojs.js';

const frequencyDisplayElement = document.getElementById("frequency");
const decibelsDisplayElement = document.getElementById("decibels");
const needleDisplayElement = document.getElementById("needle");
const notesDisplayElement = document.getElementById("notes");

let audioSource, audioContext, scriptProcessor;
const maxFrequency = 2000;
const bufferSize = 1 << 12;
const size = bufferSize / (1 << 10);

const startButtonElement = document.getElementById("start");
startButtonElement.addEventListener("click", run);

let pitch = 0;

function run() {
  if (audioContext) return;

  audioContext = new AudioContext();
  scriptProcessor = audioContext.createScriptProcessor(bufferSize, 1, 1);
  audioSource = ??? // should be from the microphone
  audioSource.connect(scriptProcessor);
  audioSource.connect(audioContext.destination);
  scriptProcessor.connect(audioContext.destination);

  aubio().then(({ Pitch }) => {
    const pitchDetector = new Pitch(
      "default",
      scriptProcessor.bufferSize,
      scriptProcessor.bufferSize / 8,
      audioContext.sampleRate
    );
    scriptProcessor.addEventListener("audioprocess", function (event) {
      const data = event.inputBuffer.getChannelData(0);
      const frequency = pitchDetector.do(data);

      if (frequency) {
        pitch = frequency.toFixed(1) + " Hz";
        frequencyDisplayElement.innerHTML = pitch;
      }
    });
  });
}











////








// const notes = [
//     {
//       "key_number": 108,
//       "midi_note": 119,
//       "helm_name": "b′′′′′",
//       "sci_name": "B8",
//       "frequency": 7902.133
//     },
//     {
//       "key_number": 107,
//       "midi_note": 118,
//       "helm_name": "a♯′′′′′/b♭′′′′′",
//       "sci_name": "A♯8/B♭8",
//       "frequency": 7458.62
//     },
//     {
//       "key_number": 106,
//       "midi_note": 117,
//       "helm_name": "a′′′′′",
//       "sci_name": "A8",
//       "frequency": 7040
//     },
//     {
//       "key_number": 105,
//       "midi_note": 116,
//       "helm_name": "g♯′′′′′/a♭′′′′′",
//       "sci_name": "G♯8/A♭8",
//       "frequency": 6644.875
//     },
//     {
//       "key_number": 104,
//       "midi_note": 115,
//       "helm_name": "g′′′′′",
//       "sci_name": "G8",
//       "frequency": 6271.927
//     },
//     {
//       "key_number": 103,
//       "midi_note": 114,
//       "helm_name": "f♯′′′′′/g♭′′′′′",
//       "sci_name": "F♯8/G♭8",
//       "frequency": 5919.911
//     },
//     {
//       "key_number": 102,
//       "midi_note": 113,
//       "helm_name": "f′′′′′",
//       "sci_name": "F8",
//       "frequency": 5587.652
//     },
//     {
//       "key_number": 101,
//       "midi_note": 112,
//       "helm_name": "e′′′′′",
//       "sci_name": "E8",
//       "frequency": 5274.041
//     },
//     {
//       "key_number": 100,
//       "midi_note": 111,
//       "helm_name": "d♯′′′′′/e♭′′′′′",
//       "sci_name": "D♯8/E♭8",
//       "frequency": 4978.032
//     },
//     {
//       "key_number": 99,
//       "midi_note": 110,
//       "helm_name": "d′′′′′",
//       "sci_name": "D8",
//       "frequency": 4698.636
//     },
//     {
//       "key_number": 98,
//       "midi_note": 109,
//       "helm_name": "c♯′′′′′/d♭′′′′′",
//       "sci_name": "C♯8/D♭8",
//       "frequency": 4434.922
//     },
//     {
//       "key_number": 88,
//       "midi_note": 108,
//       "helm_name": "c′′′′′ 5-line octave",
//       "sci_name": "C8",
//       "frequency": 4186.009
//     },
//     {
//       "key_number": 87,
//       "midi_note": 107,
//       "helm_name": "b′′′′",
//       "sci_name": "B7",
//       "frequency": 3951.066
//     },
//     {
//       "key_number": 86,
//       "midi_note": 106,
//       "helm_name": "a♯′′′′/b♭′′′′",
//       "sci_name": "A♯7/B♭7",
//       "frequency": 3729.31
//     },
//     {
//       "key_number": 85,
//       "midi_note": 105,
//       "helm_name": "a′′′′",
//       "sci_name": "A7",
//       "frequency": 3520
//     },
//     {
//       "key_number": 84,
//       "midi_note": 104,
//       "helm_name": "g♯′′′′/a♭′′′′",
//       "sci_name": "G♯7/A♭7",
//       "frequency": 3322.438
//     },
//     {
//       "key_number": 83,
//       "midi_note": 103,
//       "helm_name": "g′′′′",
//       "sci_name": "G7",
//       "frequency": 3135.963
//     },
//     {
//       "key_number": 82,
//       "midi_note": 102,
//       "helm_name": "f♯′′′′/g♭′′′′",
//       "sci_name": "F♯7/G♭7",
//       "frequency": 2959.955
//     },
//     {
//       "key_number": 81,
//       "midi_note": 101,
//       "helm_name": "f′′′′",
//       "sci_name": "F7",
//       "frequency": 2793.826
//     },
//     {
//       "key_number": 80,
//       "midi_note": 100,
//       "helm_name": "e′′′′",
//       "sci_name": "E7",
//       "frequency": 2637.02
//     },
//     {
//       "key_number": 79,
//       "midi_note": 99,
//       "helm_name": "d♯′′′′/e♭′′′′",
//       "sci_name": "D♯7/E♭7",
//       "frequency": 2489.016
//     },
//     {
//       "key_number": 78,
//       "midi_note": 98,
//       "helm_name": "d′′′′",
//       "sci_name": "D7",
//       "frequency": 2349.318
//     },
//     {
//       "key_number": 77,
//       "midi_note": 97,
//       "helm_name": "c♯′′′′/d♭′′′′",
//       "sci_name": "C♯7/D♭7",
//       "frequency": 2217.461
//     },
//     {
//       "key_number": 76,
//       "midi_note": 96,
//       "helm_name": "c′′′′ 4-line octave",
//       "sci_name": "C7",
//       "frequency": 2093.005
//     },
//     {
//       "key_number": 75,
//       "midi_note": 95,
//       "helm_name": "b′′′",
//       "sci_name": "B6",
//       "frequency": 1975.533
//     },
//     {
//       "key_number": 74,
//       "midi_note": 94,
//       "helm_name": "a♯′′′/b♭′′′",
//       "sci_name": "A♯6/B♭6",
//       "frequency": 1864.655
//     },
//     {
//       "key_number": 73,
//       "midi_note": 93,
//       "helm_name": "a′′′",
//       "sci_name": "A6",
//       "frequency": 1760
//     },
//     {
//       "key_number": 72,
//       "midi_note": 92,
//       "helm_name": "g♯′′′/a♭′′′",
//       "sci_name": "G♯6/A♭6",
//       "frequency": 1661.219
//     },
//     {
//       "key_number": 71,
//       "midi_note": 91,
//       "helm_name": "g′′′",
//       "sci_name": "G6",
//       "frequency": 1567.982
//     },
//     {
//       "key_number": 70,
//       "midi_note": 90,
//       "helm_name": "f♯′′′/g♭′′′",
//       "sci_name": "F♯6/G♭6",
//       "frequency": 1479.978
//     },
//     {
//       "key_number": 69,
//       "midi_note": 89,
//       "helm_name": "f′′′",
//       "sci_name": "F6",
//       "frequency": 1396.913
//     },
//     {
//       "key_number": 68,
//       "midi_note": 88,
//       "helm_name": "e′′′",
//       "sci_name": "E6",
//       "frequency": 1318.51
//     },
//     {
//       "key_number": 67,
//       "midi_note": 87,
//       "helm_name": "d♯′′′/e♭′′′",
//       "sci_name": "D♯6/E♭6",
//       "frequency": 1244.508
//     },
//     {
//       "key_number": 66,
//       "midi_note": 86,
//       "helm_name": "d′′′",
//       "sci_name": "D6",
//       "frequency": 1174.659
//     },
//     {
//       "key_number": 65,
//       "midi_note": 85,
//       "helm_name": "c♯′′′/d♭′′′",
//       "sci_name": "C♯6/D♭6",
//       "frequency": 1108.731
//     },
//     {
//       "key_number": 64,
//       "midi_note": 84,
//       "helm_name": "c′′′ 3-line octave",
//       "sci_name": "C6",
//       "frequency": 1046.502
//     },
//     {
//       "key_number": 63,
//       "midi_note": 83,
//       "helm_name": "b′′",
//       "sci_name": "B5",
//       "frequency": 987.7666
//     },
//     {
//       "key_number": 62,
//       "midi_note": 82,
//       "helm_name": "a♯′′/b♭′′",
//       "sci_name": "A♯5/B♭5",
//       "frequency": 932.3275
//     },
//     {
//       "key_number": 61,
//       "midi_note": 81,
//       "helm_name": "a′′",
//       "sci_name": "A5",
//       "frequency": 880
//     },
//     {
//       "key_number": 60,
//       "midi_note": 80,
//       "helm_name": "g♯′′/a♭′′",
//       "sci_name": "G♯5/A♭5",
//       "frequency": 830.6094
//     },
//     {
//       "key_number": 59,
//       "midi_note": 79,
//       "helm_name": "g′′",
//       "sci_name": "G5",
//       "frequency": 783.9909
//     },
//     {
//       "key_number": 58,
//       "midi_note": 78,
//       "helm_name": "f♯′′/g♭′′",
//       "sci_name": "F♯5/G♭5",
//       "frequency": 739.9888
//     },
//     {
//       "key_number": 57,
//       "midi_note": 77,
//       "helm_name": "f′′",
//       "sci_name": "F5",
//       "frequency": 698.4565
//     },
//     {
//       "key_number": 56,
//       "midi_note": 76,
//       "helm_name": "e′′",
//       "sci_name": "E5",
//       "frequency": 659.2551
//     },
//     {
//       "key_number": 55,
//       "midi_note": 75,
//       "helm_name": "d♯′′/e♭′′",
//       "sci_name": "D♯5/E♭5",
//       "frequency": 622.254
//     },
//     {
//       "key_number": 54,
//       "midi_note": 74,
//       "helm_name": "d′′",
//       "sci_name": "D5",
//       "frequency": 587.3295
//     },
//     {
//       "key_number": 53,
//       "midi_note": 73,
//       "helm_name": "c♯′′/d♭′′",
//       "sci_name": "C♯5/D♭5",
//       "frequency": 554.3653
//     },
//     {
//       "key_number": 52,
//       "midi_note": 72,
//       "helm_name": "c′′ 2-line octave",
//       "sci_name": "C5",
//       "frequency": 523.2511
//     },
//     {
//       "key_number": 51,
//       "midi_note": 71,
//       "helm_name": "b′",
//       "sci_name": "B4",
//       "frequency": 493.8833
//     },
//     {
//       "key_number": 50,
//       "midi_note": 70,
//       "helm_name": "a♯′/b♭′",
//       "sci_name": "A♯4/B♭4",
//       "frequency": 466.1638
//     },
//     {
//       "key_number": 49,
//       "midi_note": 69,
//       "helm_name": "a′",
//       "sci_name": "A4 A440",
//       "frequency": 440
//     },
//     {
//       "key_number": 48,
//       "midi_note": 68,
//       "helm_name": "g♯′/a♭′",
//       "sci_name": "G♯4/A♭4",
//       "frequency": 415.3047
//     },
//     {
//       "key_number": 47,
//       "midi_note": 67,
//       "helm_name": "g′",
//       "sci_name": "G4",
//       "frequency": 391.9954
//     },
//     {
//       "key_number": 46,
//       "midi_note": 66,
//       "helm_name": "f♯′/g♭′",
//       "sci_name": "F♯4/G♭4",
//       "frequency": 369.9944
//     },
//     {
//       "key_number": 45,
//       "midi_note": 65,
//       "helm_name": "f′",
//       "sci_name": "F4",
//       "frequency": 349.2282
//     },
//     {
//       "key_number": 44,
//       "midi_note": 64,
//       "helm_name": "e′",
//       "sci_name": "E4",
//       "frequency": 329.6276
//     },
//     {
//       "key_number": 43,
//       "midi_note": 63,
//       "helm_name": "d♯′/e♭′",
//       "sci_name": "D♯4/E♭4",
//       "frequency": 311.127
//     },
//     {
//       "key_number": 42,
//       "midi_note": 62,
//       "helm_name": "d′",
//       "sci_name": "D4",
//       "frequency": 293.6648
//     },
//     {
//       "key_number": 41,
//       "midi_note": 61,
//       "helm_name": "c♯′/d♭′",
//       "sci_name": "C♯4/D♭4",
//       "frequency": 277.1826
//     },
//     {
//       "key_number": 40,
//       "midi_note": 60,
//       "helm_name": "c′ 1-line octave",
//       "sci_name": "C4",
//       "frequency": 261.6256
//     },
//     {
//       "key_number": 39,
//       "midi_note": 59,
//       "helm_name": "b",
//       "sci_name": "B3",
//       "frequency": 246.9417
//     },
//     {
//       "key_number": 38,
//       "midi_note": 58,
//       "helm_name": "a♯/b♭",
//       "sci_name": "A♯3/B♭3",
//       "frequency": 233.0819
//     },
//     {
//       "key_number": 37,
//       "midi_note": 57,
//       "helm_name": "a",
//       "sci_name": "A3",
//       "frequency": 220
//     },
//     {
//       "key_number": 36,
//       "midi_note": 56,
//       "helm_name": "g♯/a♭",
//       "sci_name": "G♯3/A♭3",
//       "frequency": 207.6523
//     },
//     {
//       "key_number": 35,
//       "midi_note": 55,
//       "helm_name": "g",
//       "sci_name": "G3",
//       "frequency": 195.9977
//     },
//     {
//       "key_number": 34,
//       "midi_note": 54,
//       "helm_name": "f♯/g♭",
//       "sci_name": "F♯3/G♭3",
//       "frequency": 184.9972
//     },
//     {
//       "key_number": 33,
//       "midi_note": 53,
//       "helm_name": "f",
//       "sci_name": "F3",
//       "frequency": 174.6141
//     },
//     {
//       "key_number": 32,
//       "midi_note": 52,
//       "helm_name": "e",
//       "sci_name": "E3",
//       "frequency": 164.8138
//     },
//     {
//       "key_number": 31,
//       "midi_note": 51,
//       "helm_name": "d♯/e♭",
//       "sci_name": "D♯3/E♭3",
//       "frequency": 155.5635
//     },
//     {
//       "key_number": 30,
//       "midi_note": 50,
//       "helm_name": "d",
//       "sci_name": "D3",
//       "frequency": 146.8324
//     },
//     {
//       "key_number": 29,
//       "midi_note": 49,
//       "helm_name": "c♯/d♭",
//       "sci_name": "C♯3/D♭3",
//       "frequency": 138.5913
//     },
//     {
//       "key_number": 28,
//       "midi_note": 48,
//       "helm_name": "c small octave",
//       "sci_name": "C3",
//       "frequency": 130.8128
//     },
//     {
//       "key_number": 27,
//       "midi_note": 47,
//       "helm_name": "B",
//       "sci_name": "B2",
//       "frequency": 123.4708
//     },
//     {
//       "key_number": 26,
//       "midi_note": 46,
//       "helm_name": "A♯/B♭",
//       "sci_name": "A♯2/B♭2",
//       "frequency": 116.5409
//     },
//     {
//       "key_number": 25,
//       "midi_note": 45,
//       "helm_name": "A",
//       "sci_name": "A2",
//       "frequency": 110
//     },
//     {
//       "key_number": 24,
//       "midi_note": 44,
//       "helm_name": "G♯/A♭",
//       "sci_name": "G♯2/A♭2",
//       "frequency": 103.8262
//     },
//     {
//       "key_number": 23,
//       "midi_note": 43,
//       "helm_name": "G",
//       "sci_name": "G2",
//       "frequency": 97.99886
//     },
//     {
//       "key_number": 22,
//       "midi_note": 42,
//       "helm_name": "F♯/G♭",
//       "sci_name": "F♯2/G♭2",
//       "frequency": 92.49861
//     },
//     {
//       "key_number": 21,
//       "midi_note": 41,
//       "helm_name": "F",
//       "sci_name": "F2",
//       "frequency": 87.30706
//     },
//     {
//       "key_number": 20,
//       "midi_note": 40,
//       "helm_name": "E",
//       "sci_name": "E2",
//       "frequency": 82.40689
//     },
//     {
//       "key_number": 19,
//       "midi_note": 39,
//       "helm_name": "D♯/E♭",
//       "sci_name": "D♯2/E♭2",
//       "frequency": 77.78175
//     },
//     {
//       "key_number": 18,
//       "midi_note": 38,
//       "helm_name": "D",
//       "sci_name": "D2",
//       "frequency": 73.41619
//     },
//     {
//       "key_number": 17,
//       "midi_note": 37,
//       "helm_name": "C♯/D♭",
//       "sci_name": "C♯2/D♭2",
//       "frequency": 69.29566
//     },
//     {
//       "key_number": 16,
//       "midi_note": 36,
//       "helm_name": "C great octave",
//       "sci_name": "C2",
//       "frequency": 65.40639
//     },
//     {
//       "key_number": 15,
//       "midi_note": 35,
//       "helm_name": "B͵",
//       "sci_name": "B1",
//       "frequency": 61.73541
//     },
//     {
//       "key_number": 14,
//       "midi_note": 34,
//       "helm_name": "A♯͵/B♭͵",
//       "sci_name": "A♯1/B♭1",
//       "frequency": 58.27047
//     },
//     {
//       "key_number": 13,
//       "midi_note": 33,
//       "helm_name": "A͵",
//       "sci_name": "A1",
//       "frequency": 55
//     },
//     {
//       "key_number": 12,
//       "midi_note": 32,
//       "helm_name": "G♯͵/A♭͵",
//       "sci_name": "G♯1/A♭1",
//       "frequency": 51.91309
//     },
//     {
//       "key_number": 11,
//       "midi_note": 31,
//       "helm_name": "G͵",
//       "sci_name": "G1",
//       "frequency": 48.99943
//     },
//     {
//       "key_number": 10,
//       "midi_note": 30,
//       "helm_name": "F♯͵/G♭͵",
//       "sci_name": "F♯1/G♭1",
//       "frequency": 46.2493
//     },
//     {
//       "key_number": 9,
//       "midi_note": 29,
//       "helm_name": "F͵",
//       "sci_name": "F1",
//       "frequency": 43.65353
//     },
//     {
//       "key_number": 8,
//       "midi_note": 28,
//       "helm_name": "E͵",
//       "sci_name": "E1",
//       "frequency": 41.20344
//     },
//     {
//       "key_number": 7,
//       "midi_note": 27,
//       "helm_name": "D♯͵/E♭͵",
//       "sci_name": "D♯1/E♭1",
//       "frequency": 38.89087
//     },
//     {
//       "key_number": 6,
//       "midi_note": 26,
//       "helm_name": "D͵",
//       "sci_name": "D1",
//       "frequency": 36.7081
//     },
//     {
//       "key_number": 5,
//       "midi_note": 25,
//       "helm_name": "C♯͵/D♭͵",
//       "sci_name": "C♯1/D♭1",
//       "frequency": 34.64783
//     },
//     {
//       "key_number": 4,
//       "midi_note": 24,
//       "helm_name": "C͵ contra-octave",
//       "sci_name": "C1",
//       "frequency": 32.7032
//     },
//     {
//       "key_number": 3,
//       "midi_note": 23,
//       "helm_name": "B͵͵",
//       "sci_name": "B0",
//       "frequency": 30.86771
//     },
//     {
//       "key_number": 2,
//       "midi_note": 22,
//       "helm_name": "A♯͵͵/B♭͵͵",
//       "sci_name": "A♯0/B♭0",
//       "frequency": 29.13524
//     },
//     {
//       "key_number": 1,
//       "midi_note": 21,
//       "helm_name": "A͵͵",
//       "sci_name": "A0",
//       "frequency": 27.5
//     },
//     {
//       "key_number": 97,
//       "midi_note": 20,
//       "helm_name": "G♯͵͵/A♭͵͵",
//       "sci_name": "G♯0/A♭0",
//       "frequency": 25.95654
//     },
//     {
//       "key_number": 96,
//       "midi_note": 19,
//       "helm_name": "G͵͵",
//       "sci_name": "G0",
//       "frequency": 24.49971
//     },
//     {
//       "key_number": 95,
//       "midi_note": 18,
//       "helm_name": "F♯͵͵/G♭͵͵",
//       "sci_name": "F♯0/G♭0",
//       "frequency": 23.12465
//     },
//     {
//       "key_number": 94,
//       "midi_note": 17,
//       "helm_name": "F͵͵",
//       "sci_name": "F0",
//       "frequency": 21.82676
//     },
//     {
//       "key_number": 93,
//       "midi_note": 16,
//       "helm_name": "E͵͵",
//       "sci_name": "E0",
//       "frequency": 20.60172
//     },
//     {
//       "key_number": 92,
//       "midi_note": 15,
//       "helm_name": "D♯͵͵/E♭͵͵",
//       "sci_name": "D♯0/E♭0",
//       "frequency": 19.44544
//     },
//     {
//       "key_number": 91,
//       "midi_note": 14,
//       "helm_name": "D͵͵",
//       "sci_name": "D0",
//       "frequency": 18.35405
//     },
//     {
//       "key_number": 90,
//       "midi_note": 13,
//       "helm_name": "C♯͵͵/D♭͵͵",
//       "sci_name": "C♯0/D♭0",
//       "frequency": 17.32391
//     },
//     {
//       "key_number": 89,
//       "midi_note": 12,
//       "helm_name": "C͵͵ sub-contra-octave",
//       "sci_name": "C0",
//       "frequency": 16.3516
//     }
//   ]

// const pitches = []
// for (let i = 0; i < notes.length; i++) {
//   pitches.push(notes[i].frequency)
// }


// // examples
// // given B = 493.xx, A = 440hz, G = 391.xx
// // getClosestNote(463) -> A
// // getClosestNote(500) -> B
// // getClosestNote(400) -> G


// function getClosestNote(pitch) {
//   // find closest frequency
//   let closest_pitch = closest(pitches, pitch);
  
//   // find the assosciated sci_name
//   let index_of_note = pitches.indexOf(closest_pitch);
  
//   // Return the name of the note
//   return notes[index_of_note].sci_name;
// }

// function getAngleForPitch(pitch) {
//   // Return an angle that represents how close to the note you are
//   // 45 degrees would be halfway between the current note and the next note
//   // -45 degress would be halfway between the current note and the previous note
  
//   // find closest frequency
//   let closest_pitch = closest(pitches, pitch);
//   let index_of_note = pitches.indexOf(closest_pitch);
//   let index_of_previous_note = index_of_note-1;
//   let index_of_next_note = index_of_note+1;
//   console.log(index_of_previous_note);
  
//   let range = pitches[index_of_next_note] - pitches[index_of_previous_note];
//   let pitch_position = (pitch - pitches[index_of_previous_note]) / range;
//   let angle = (pitch_position * 90) - 45;
  
//   return angle;
// }


// function startPitchDetection() {
//   navigator.mediaDevices
//     .getUserMedia({ audio: true })
//     .then((stream) => {
//       microphoneStream = audioCtx.createMediaStreamSource(stream);
//       microphoneStream.connect(analyserNode);

//       audioData = new Float32Array(analyserNode.fftSize);
//       corrolatedSignal = new Float32Array(analyserNode.fftSize);

//       setInterval(() => {
//         analyserNode.getFloatTimeDomainData(audioData);

//         let pitch = Math.round(getAutocorrolatedPitch());
        
//         // get the average, bincount is fftsize / 2
//         var array =  new Uint8Array(analyserNode.frequencyBinCount);
//         analyserNode.getByteFrequencyData(array);
//         var db = Math.round(getAverageVolume(array));
//         decibelsDisplayElement.innerHTML = `${db}`;
        
//         if (db > 1) {
//           frequencyDisplayElement.innerHTML = `${pitch}`;

//           let angle = getAngleForPitch(pitch);
//           needleDisplayElement.style = `transform: rotate(${angle}deg);`;

//           let note = getClosestNote(pitch);
//           notesDisplayElement.innerHTML = `${note}`;
//         }
//       }, 100);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// function getAutocorrolatedPitch() {
//   let maximaCount = 0;

//   for (let l = 0; l < analyserNode.fftSize; l++) {
//     corrolatedSignal[l] = 0;
//     for (let i = 0; i < analyserNode.fftSize - l; i++) {
//       corrolatedSignal[l] += audioData[i] * audioData[i + l];
//     }
//     if (l > 1) {
//       if (
//         corrolatedSignal[l - 2] - corrolatedSignal[l - 1] < 0 &&
//         corrolatedSignal[l - 1] - corrolatedSignal[l] > 0
//       ) {
//         localMaxima[maximaCount] = l - 1;
//         maximaCount++;
//         if (maximaCount >= localMaxima.length) break;
//       }
//     }
//   }

//   // Second: find the average distance in samples between maxima

//   let maximaMean = localMaxima[0];

//   for (let i = 1; i < maximaCount; i++)
//     maximaMean += localMaxima[i] - localMaxima[i - 1];

//   maximaMean /= maximaCount;

//   return audioCtx.sampleRate / maximaMean;
// }

// function getAverageVolume(array) {
//   var values = 0;
//   var average;

//   var length = array.length;

//   // get all the frequency amplitudes
//   for (var i = 0; i < length; i++) {
//     values += array[i];
//   }

//   average = values / length;
//   return average;
// }

// function closest(arr, num) {
//    return arr.reduce((acc, val) => {
//       if(Math.abs(val - num) < Math.abs(acc)){
//          return val - num;
//       } else {
//          return acc;
//       }
//    }, Infinity) + num;
// }

// import aubio from '/aubiojs.js';

// function pitch2() {
//   aubio().then(({ Pitch }) => {
//     const pitchDetector = new Pitch(
//       "default",
//       scriptProcessor.bufferSize,
//       scriptProcessor.bufferSize / 8,
//       audioContext.sampleRate
//     );
//     scriptProcessor.addEventListener("audioprocess", function (event) {
//       if (audio.paused) return;

//       const data = event.inputBuffer.getChannelData(0);
//       const frequency = pitchDetector.do(data);

//       if (frequency) {
//         return frequency.toFixed(1);
//       }
//     });
//   });

// }