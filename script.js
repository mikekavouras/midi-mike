colors = [
  "darksalmon",
  "cadetblue",
  "darkseagreen",
  "slategray",
  "darkgray",
  "sandybrown",
  "powderblue",
  "palevioletred",
  "goldenrod"
];

$(document).ready(function() {
   var Player = new MidiPlayer();

   var click = "ontouchstart" in document ? "touchstart" : "click";

   $('.key').bind(click, function(e) {
     e.preventDefault();
     var $self = $(this);
     var note = $self.attr('data-note');
     var octave = parseInt($self.attr('data-octave'));
     var rand = Math.floor(Math.random() * colors.length);
     $self.css('backgroundColor' , colors[rand]);
     Player.playNote(note, octave);
   });

   $('.key.white').bind('touchend', function(e) {
     $(this).css('backgroundColor' , '#f2f2f2');
   });

   $('.key.black').bind('touchend', function(e) {
     $(this).css('backgroundColor' , '#444');
   });

   $('#wave-types div').bind(click, function() {
     $(this).siblings('div').removeClass('selected').end().addClass('selected');
     var type = $(this).attr('id');
     Player._currentWaveType = Player._waveTypes[type];
   });
});
