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
   var Player = new MIDIPlayer();

   var down = "ontouchstart" in document ? "touchstart" : "mousedown";
   var up = "ontouchstart" in document ? "touchend" : "mouseup";

   $('.key').bind(down, function(e) {
     e.preventDefault();
     var $self = $(this);
     var note = $self.attr('data-note');
     var octave = parseInt($self.attr('data-octave'));
     var rand = Math.floor(Math.random() * colors.length);
     $self.css('backgroundColor' , colors[rand]);
     Player.playNote(note, octave);
   });

   $('.key.white').bind(up, function(e) {
     $(this).css('backgroundColor' , '#f2f2f2');
   });

   $('.key.black').bind(up, function(e) {
     $(this).css('backgroundColor' , '#444');
   });

   $('#wave-types div').bind(down, function() {
     $(this).siblings('div').removeClass('selected').end().addClass('selected');
     var type = $(this).attr('id');
     Player._currentWaveType = Player._waveTypes[type];
   });

   $('#up, #down').bind(down, function(e) {
     e.preventDefault();
     $(this).addClass('active');
     var up = $(this).attr('id') == "up";
     var $keys = $('.key');
     $keys.each(function() {
       var $self = $(this);
       var currOctave = parseInt($self.attr('data-octave'), 10);
       if (up)
         $self.attr('data-octave', ++currOctave)
       else
         $self.attr('data-octave', --currOctave)
     });
   });

   $('#down, #up').bind(up, function() {
     $(this).removeClass('active');
   });

});
