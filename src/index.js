const audioContext = new AudioContext();

const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);
primaryGainControl.connect(audioContext.destination);

const notes = [
  { name: "C", frequency: 261.63 },
  { name: "C#", frequency: 277.18 },
  { name: "D", frequency: 293.66 },
  { name: "D#", frequency: 311.13 },
  { name: "E", frequency: 329.63 },
  { name: "F", frequency: 349.23 },
  { name: "F#", frequency: 369.99 },
  { name: "G", frequency: 392.0 },
  { name: "G#", frequency: 415.3 },
  { name: "A", frequency: 440.0 },
  { name: "A#", frequency: 466.16 },
  { name: "B", frequency: 493.88 },
  { name: "C", frequency: 523.25 }
];

notes.forEach(({ name, frequency }) => {
  const noteButton = document.createElement("button");
  noteButton.innerText = name;
  noteButton.addEventListener("click", () => {
    const noteOscillator = audioContext.createOscillator();
    noteOscillator.type = "square";
    noteOscillator.frequency.setValueAtTime(
      frequency,
      audioContext.currentTime
    );

    const attackTime = 0.2;
    const decayTime = 0.3;
    const sustainLevel = 0.7;
    const releaseTime = 0.2;

    const now = audioContext.currentTime;
    const noteGain = audioContext.createGain();
    noteGain.gain.setValueAtTime(0, 0);
    noteGain.gain.linearRampToValueAtTime(1, now + attackTime);
    noteGain.gain.linearRampToValueAtTime(
      sustainLevel,
      now + attackTime + decayTime
    );
    noteGain.gain.setValueAtTime(sustainLevel, now + 1 - releaseTime);
    noteGain.gain.linearRampToValueAtTime(0, now + 1);

    noteOscillator.connect(noteGain);
    noteGain.connect(primaryGainControl);
    noteOscillator.start();
    noteOscillator.stop(audioContext.currentTime + 1);
  });
  <div className="container">
  {document.body.appendChild(noteButton)};
  </div>
  });
