function AudioPlayer() {
  this.context = new webkitAudioContext();
  this.sources = [];

  this.octave = 4;
  this.key = 'C';

  this.init();
}

AudioPlayer.prototype = {
  init: function() {
    for (var i = 0; i < 3; i++) {
      var oscillator = this.context.createOscillator();
      oscillator.type = 0;
      this.sources.push(oscillator);
    }
  },

  play: function() {
    for (var i = 0; i < 3; i++) {
      this.sources[i].connect(this.context.destination);
      this.sources[i].noteOn(0);
    }
  },

  pause: function() {
    for (var i = 0; i < this.sources.length; i++) {
      this.sources[i].disconnect(this.context.destination);
    }
  },

  playChord: function(chord) {
    this.pause();

    chord = Sound.keys[this.key][chord];
    for (var i = 0; i < chord.length; i++) {
      var note = chord[i];
      this.sources[i].frequency.value = Sound.notes[note + this.octave].frequency
    }

    this.play();
  },

  playNote: function(note) {

  },

  getNewSource: function() {
  }
};

var Player;
$(document).ready(function() {
   Player = new AudioPlayer();

  $('#notes button').bind('click', function(e) {
    var note = $(this).attr('data-note');
    Player.playNote(note);
  });

  $('#chords').find('button').bind('click', function(e) {
    var chord = $(this).attr('data-chord');
    console.log('here');
    Player.playChord(chord);
  });

});
