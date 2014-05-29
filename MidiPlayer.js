function MIDIPlayer() {
  this._context = new webkitAudioContext();
  this._mode = 1; // 1 = notes, 2 = chords
  this._currentWaveType = 0;
  this._ocatave = 4;
  this._waveTypes = {
    "sine" : 0,
    "square" : 1,
    "sawtooth" : 2,
    "triangle" : 3
  }

  this.init();
}

MIDIPlayer.prototype = {
  init: function() {
  },

  playNote: function(note, octave) {
    var source = this._context.createOscillator();
    var volume = this._context.createGainNode();
    source.frequency.value = Sound._notes[octave][note].frequency;
    source.type = this._currentWaveType;
    source.connect(volume);
    volume.connect(this._context.destination);
    source.noteOn(0);

    this.fadeOutSound(source, volume);
  },

  playChord: function(note, octave) {
    var notes = Sound._chords[note];
    var sources = [];
    var volumes = [];
    for (var i = 0; i < notes.length; i++) {
      var source = this._context.createOscillator();
      var volume = this._context.createGainNode();
      sources.push(source);
      volumes.push(volume);
      source.frequency.value = Sound._notes[octave][notes[i]].frequency;
      source.type = this._currentWaveType;
      source.connect(volume);
      volume.connect(this._context.destination);
      source.noteOn(0);
      this.fadeOutSound(source, volume);
    }
  },

  fadeOutSound: function(source, volume) {
    var t = setInterval(function() {
      volume.gain.value -= 0.03;
      if (volume.gain.value <= 0) {
        clearInterval(t);
        source.disconnect(0);
        source = null;
      }
    }, 10);
  }
};
