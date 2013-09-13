$(document).ready(function() {
   var Player = new MidiPlayer();

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
     Player._currentWaveType = Player._waveTypes[type];
   });
});
