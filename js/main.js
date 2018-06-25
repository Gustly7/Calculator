$(document).on('scroll',function(a,b,c){
  $('body').css('background-position-y',Math.round(-1*window.pageYOffset/8)+'px' );
  $('#bgDiv').css('background-position-y',Math.round(-1*window.pageYOffset/4)+'px' );
})