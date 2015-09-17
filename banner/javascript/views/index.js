(function($){

  var simpleBanner = function(options){

    var _this = $(this);
    var now = 0;
    var listNum = $(this).find('ul li').length;
    var bannerItemWidth = (100/listNum).toFixed(2) + '%';

    $(this).css('height', options.bannerHeight);
    $(this).find('ul').css({'height': options.bannerHeight, 'width': listNum*100+'%' });
    $(this).find('ul li').css({'height': options.bannerHeight, 'width': bannerItemWidth});
    $(this).find('ul li').each(function(index){
      $(this).css('background-image', 'url('+options.imageUrlArray[index]+')');
    });


    function next(){
      _this.find('ul li').eq(now).fadeOut(function(){
        now++;
        if(now == listNum) now = 0;
        _this.find('ul li').eq(now).fadeIn();
        _this.find('ol li').removeClass('active');
        _this.find('ol li').eq(now).addClass('active');
      });

      console.log(now);
    }

    var timer = setInterval(next, 3000);

    $(this).find('ol li').on('click',function(){
      clearInterval(timer);
      oldNow = now;
      now = $(this).index();

      _this.find('ul li').eq(oldNow).fadeOut(function(){
        _this.find('ul li').eq(now).fadeIn();
        _this.find('ol li').removeClass('active');
        _this.find('ol li').eq(now).addClass('active');
      });
      timer = setInterval(next, 3000);
    })
  }


  $.fn.extend({
    simpleBanner: simpleBanner
  })

})(jQuery)

$(document).ready(function(){
  $('.banner').simpleBanner({
    imageUrlArray: ['images/index/sunset.jpg','images/index/wood.jpg','images/index/subway.jpg'],
    bannerHeight: '300px'
  });

});
