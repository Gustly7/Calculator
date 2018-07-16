window.ant = () => {
  return {
    x: 0,
    y: 0,
    angle: 0,
    init: function () {
      $('body').append('<div id="ant">🐜</div>');
      window.ant = this;
    },
    nextStep: function () {
      console.log('nextStep')
      var newX = Math.round(Math.random() * (window.innerWidth - 50));
      var newY = Math.round(Math.random() * (window.innerHeight - 50));
      this.angle = (Math.atan2((newY - this.y), (newX - this.x)) + Math.PI / 2) / Math.PI * 180;


      $('#ant').animate({ border: this.angle }, {
        step: function(now,fx) {
          //$(this).css('-webkit-transform','rotate('+now+'deg)');
          $('#ant').css('transform','rotate('+now+'deg)');
        },
        duration:1000
      },'linear');
      //$('#ant').css('transform','rotate('+this.angle+'deg)');

      //$('#ant').animate({transform: 'rotate(' + this.angle + 'deg)'}, 500);
      this.x = newX;
      this.y = newY;
      var thisAnt = this;
      $('#ant').animate({top: newY + "px", left: newX + 'px'}
        , {
          duration: 2000,
          specialEasing: {
            width: "easeOutBounce",
            height: "easeOutBounce"
          }
          , complete: function () {
            thisAnt.nextStep();
          }
        }
      );
    }
  }
}