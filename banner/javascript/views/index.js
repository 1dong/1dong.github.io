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

function TabSwitch(id){
  var _this = this;
  var oTabWrapObj =  document.querySelector('#' + id );
  this.aTab = document.querySelectorAll('#' + id + ' .tab li');
  this.oView = document.querySelector('#' + id + ' .view');

  for(var i=0; i< this.aTab.length; i++){
    this.aTab[i].index = i;
    this.aTab[i].addEventListener('click', function(){
      _this.aTab.className = ""
      this.className = "current"
      console.log('click', i)
      // 获取点击的那个市场的最新数据
      if(this.index == 0){
        var data = [
          {name: '中国地铁', des: '中铁整合“孙公司” 疑为海外业务', id: '02456CN', nowPrice: '18.666', change: '+1.800', percent: '+1.73%'},
          {name: '中国地铁2', des: '中铁整合“孙公司” 疑为海外业务2', id: '02456CN', nowPrice: '18.666', change: '+1.800', percent: '+1.73%'},
          {name: '中国地铁3', des: '中铁整合“孙公司” 疑为海外业务3', id: '02456CN', nowPrice: '18.666', change: '+1.800', percent: '+1.73%'}
        ];
      }
      else if(this.index == 1){
        var data = [
          {name: '招商银行', des: '招行微众掐架 因代扣接口遭滥用', id: '03968HK', nowPrice: '18.666', change: '+1.800', percent: '+1.73%'},
          {name: '招商银行2', des: '招行微众掐架 因代扣接口遭滥用', id: '03968HK', nowPrice: '18.666', change: '+1.800', percent: '+1.73%'},
          {name: '招商银行3', des: '招行微众掐架 因代扣接口遭滥用', id: '03968HK', nowPrice: '18.666', change: '+1.800', percent: '+1.73%'}
        ];
      }
      else{
        var data = [
          {name: '中信证券', des: '中信证券高层被公安机关调查', id: '06030HK', nowPrice: '16.666', change: '+1.800', percent: '+1.73%'},
          {name: '中信证券2', des: '中信证券高层被公安机关调查2', id: '06030HK', nowPrice: '16.666', change: '+1.800', percent: '+1.73%'},
          {name: '中信证券3', des: '中信证券高层被公安机关调查3', id: '06030HK', nowPrice: '16.666', change: '+1.800', percent: '+1.73%'}
        ];
      }
      // 更新view中内容
      _this.updateView(data);
    })
  }
}

TabSwitch.prototype.updateView = function(array){
  var aViewList = this.oView.querySelectorAll('li');
  for(var i =0; i<array.length; i++){
    aViewList[i].querySelector('.name .span01').innerHTML =array[i].name;
    aViewList[i].querySelector('.name .span02').innerHTML =array[i].id;
    aViewList[i].querySelector('.price .span01').innerHTML =array[i].nowPrice;
    aViewList[i].querySelector('.price .span02').innerHTML =array[i].change +' '+array[i].percent;
    aViewList[i].querySelector('.tips').innerHTML =array[i].des;
  }
};

$(document).ready(function(){
  $('.banner').simpleBanner({
    imageUrlArray: ['images/index/sunset.jpg','images/index/wood.jpg','images/index/subway.jpg'],
    bannerHeight: '350px'
  });

  new TabSwitch('nHomeInfo');
});
