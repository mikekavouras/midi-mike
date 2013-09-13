function AudioPlayer() {
  this.context = new webkitAudioContext();
  this.waveTypes = {
    "sine" : 0,
    "square" : 1,
    "sawtooth" : 2,
    "triangle" : 3
  }

  this.waveType = 0;

  this.init();
}

AudioPlayer.prototype = {
  init: function() {
  },

  playNote: function(note, octave) {
    var source = this.context.createOscillator();
    var volume = this.context.createGainNode();
    source.frequency.value = Sound.notes[octave][note].frequency;
    source.type = this.waveType;
    source.connect(volume);
    volume.connect(this.context.destination);
    source.noteOn(0);

    var t = setInterval(function() {
      volume.gain.value -= 0.03;
      if (volume.gain.value <= 0) {
        clearInterval(t);
        source.disconnect(0);
      }
    }, 10);
  }
};

$(document).ready(function() {
   var Player = new AudioPlayer();

   var click = "ontouchstart" in document ? "touchstart" : "click";

   $('.key').bind(click, function(e) {
     var $self = $(this);
     var note = $self.attr('data-note');
     var octave = parseInt($self.attr('data-octave'));
     $self.toggleClass('active');
     Player.playNote(note, octave);
   });

   $('#wave-types button').bind('click', function() {
     var type = $(this).attr('id');
     Player.waveType = Player.waveTypes[type];
   });
});
