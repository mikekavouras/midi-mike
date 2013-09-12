var CHORDS = {
  'A'     : ['A', 'C#', 'E'],
  'Am'    : ['A', 'C', 'E'],
  'Bb'    : ['Bb', 'D', 'F'],
  'Bbm'   : ['Bb', 'Db', 'F'],
  'B'     : ['B', 'D#', 'F#'],
  'Bm'    : ['B', 'D', 'F#'],
  'Bdim'  : ['B', 'D', 'F'],
  'C'     : ['C', 'E', 'G'],
  'Cm'    : ['C', 'Em', 'G'],
  'C#'    : ['C#', 'E#', 'G#'],
  'C#m'   : ['C#', 'E', 'G#'],
  'C#dim' : ['C#', 'E', 'G'],
  'Db'    : ['Db', 'F', 'Ab'],
  'Dbm'   : ['Db', 'Fb', 'Ab'],
  'D'     : ['D', 'F#', 'A'],
  'Dm'    : ['D', 'F', 'A'],
  'D#'    : ['D#', 'F#', 'A#'],
  'D#m'   : ['D#', 'F', 'A#'],
  'Eb'    : ['Eb', 'G', 'Bb'],
  'Ebm'   : ['Eb', 'Gb', 'Bb'],
  'E'     : ['E', 'G#', 'B'],
  'Em'    : ['E', 'G', 'B'],
  'Edim'  : ['E', 'G', 'Bb'],
  'F'     : ['F', 'A', 'C'],
  'Fm'    : ['F', 'Ab', 'C'],
  'F#'    : ['F#', 'A#', 'C#'],
  'F#m'   : ['F#', 'A', 'C#'],
  'F#dim' : ['F#', 'A', 'C'],
  'Gb'    : ['Gb', 'Bb', 'Db'],
  'Gbm'   : ['Gb', 'Bbb', 'Db'],
  'G'     : ['G', 'B', 'D'],
  'Gm'    : ['G', 'Bb', 'D'],
  'G#'    : ['G#', 'B#', 'D#'],
  'G#dim' : ['G#', 'B', 'D']
};

var KEYS = {
  'A' : {
    'A' : CHORDS['A'],
    'B' : CHORDS['Bm'],
    'C' : CHORDS['C#m'],
    'D' : CHORDS['D'],
    'E' : CHORDS['E'],
    'F' : CHORDS['F#m'],
    'G' : CHORDS['G#dim']
  },
  'B' : {
    'B' : CHORDS['B'],
    'C' : CHORDS['C#m'],
    'D' : CHORDS['D#m'],
    'E' : CHORDS['E'],
    'F' : CHORDS['F#'],
    'G' : CHORDS['G#m'],
    'A' : CHORDS['A#dim']
  },
  'C' : {
    'C' : CHORDS['C'],
    'D' : CHORDS['Dm'],
    'E' : CHORDS['Em'],
    'F' : CHORDS['F'],
    'G' : CHORDS['G'],
    'A' : CHORDS['Am'],
    'B' : CHORDS['Bdim']
  },
  'D' : {
    'D' : CHORDS['D'],
    'E' : CHORDS['Em'],
    'F' : CHORDS['F#m'],
    'G' : CHORDS['G'],
    'A' : CHORDS['A'],
    'B' : CHORDS['Bm'],
    'C' : CHORDS['C#dim']
  },
  'E' : {
    'E' : CHORDS['E'],
    'F' : CHORDS['F#m'],
    'G' : CHORDS['G#m'],
    'A' : CHORDS['A'],
    'B' : CHORDS['B'],
    'C' : CHORDS['C#m'],
    'D' : CHORDS['D#dim']
  },
  'F' : {
    'F' : CHORDS['F'],
    'G' : CHORDS['Gm'],
    'A' : CHORDS['Am'],
    'B' : CHORDS['Bb'],
    'C' : CHORDS['C'],
    'D' : CHORDS['Dm'],
    'E' : CHORDS['Edim']
  },
  'G' : {
    'G' : CHORDS['G'],
    'A' : CHORDS['Am'],
    'B' : CHORDS['Bm'],
    'C' : CHORDS['C'],
    'D' : CHORDS['D'],
    'E' : CHORDS['Em'],
    'F' : CHORDS['F#dim']
  }
};

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

    chord = KEYS[this.key][chord];
    for (var i = 0; i < chord.length; i++) {
      var note = chord[i];
      this.sources[i].frequency.value = NOTES[note + this.octave].frequency
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
