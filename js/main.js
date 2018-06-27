$(document).on('scroll',function(a,b,c){
  $('body').css('background-position-y',Math.round(-1*window.pageYOffset/8)+'px' );
  $('#bgDiv').css('background-position-y',Math.round(-1*window.pageYOffset/4)+'px' );
  $('#bgDiv').css('background-position-x',Math.round(Math.sin(window.pageYOffset/1000)*30)+'px' );
  //$('body').animate({'background-position-y': Math.round(-1*window.pageYOffset/8)+'px'}, {queue: false, duration: 10, specialEasing: {'background-position-y': "easeInOutExpo"}});
  //$('#bgDiv').animate({'background-position-y': Math.round(-1*window.pageYOffset/4)+'px'}, {queue: false, duration: 10, specialEasing: {'background-position-y': "easeInOutExpo"}});
})