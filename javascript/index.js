function Jsonp(id){
  var _this = this;
  this.oInput = document.querySelector(id+ " input");
  this.oList = document.querySelector(id+ " ul");
  this.iNow = -1;

  this.oInput.addEventListener('keyup', function(ev){
    _this.fnListContent(ev);
  });
  this.oInput.addEventListener('keydown', function(ev){
    _this.fnSelectContent(ev)
  });

  document.addEventListener('click', function(){
    _this.oList.style.display = 'none';
  })
}

Jsonp.prototype.fnGetJson = function(url,json,fn){
  var fnName='jsonp'+new Date().getTime();

  json.cb=fnName;
  window[fnName]=function(json){
    //code
    fn(json.s);
    oHead.removeChild(oS);
  }
  var arr=[];
  for(var key in json){
    arr.push(key+'='+json[key]);
  }

  var oS=document.createElement('script');
  oS.src=url+'?'+arr.join('&');
  var oHead=document.getElementsByTagName('head')[0];
  oHead.appendChild(oS);
};

Jsonp.prototype.fnListContent = function(ev){

  var _this = this;

  if(ev.keyCode == 38 || ev.keyCode== 40 ){
    return;
  }

  console.log(this);
  this.fnGetJson('http://suggestion.baidu.com/su',{wd:_this.oInput.value}, function(json){
    _this.oList.innerHTML='';
    _this.oList.style.display = 'block';
    for(var i=0; i<json.length; i++){
      var oLi = document.createElement('li');
      oLi.innerHTML=json[i];
      _this.oList.appendChild(oLi)
    }

    for(var i=0; i<_this.oList.children.length; i++){
      (function(index){
        _this.oList.children[i].onmouseover=function(){
          iNow=index;
          for(var i=0; i<_this.oList.children.length; i++){
            _this.oList.children[i].className='';
          }
          this.className='active';
        }
      })(i);
      _this.oList.children[i].onmouseout=function(){
        this.className='';
      }
      _this.oList.children[i].onclick=function(){
        var url='http://www.baidu.com/s?wd='+this.innerHTML;
        window.open(url,'_self');
      }
    }
  })

}

Jsonp.prototype.fnSelectContent = function(ev){
  var aLi = this.oList.children;
  var oldTxt = this.oInput.value;

  switch(ev.keyCode){
    case 38:
      this.iNow--;
      if(this.iNow==-2){
        this.iNow=aLi.length-1;
      }
      break;
    case 40:
      this.iNow++;
      if(this.iNow==aLi.length){
        this.iNow=-1;
      }
      break
  }
  for(var i=0; i<aLi.length; i++){
    aLi[i].className='';
  }
  if(this.iNow==-1){
    this.oInput.value=oldTxt;
  }else if(this.iNow>-1){
    aLi[this.iNow].className='active';
    this.oInput.value=aLi[this.iNow].innerHTML;
  }
  if(ev.keyCode==38 || ev.keyCode==40){
    this.oInput.onkeyup=null;
    return false;
  }
};


//apple menu
//
function getPos(obj){
  var l=0,t=0;

  while(obj)
  {
    l+=obj.offsetLeft;
    t+=obj.offsetTop;

    obj=obj.offsetParent;
  }

  return {left: l, top: t};
}

function MenuEffect(id){
  this.oMenu = document.querySelector(id);
  this.aMenuItem = document.querySelectorAll(id + " img");
  var _this = this;


  document.onmousemove = function (ev){
    console.log(ev.clientX, ev.clientY, _this.aMenuItem, document.querySelector(".container").offsetLeft );
    for(var i=0;i<_this.aMenuItem.length;i++){
      var l=getPos(_this.aMenuItem[i]).left+_this.aMenuItem[i].offsetWidth/2;
      var t=getPos(_this.aMenuItem[i]).top+_this.aMenuItem[i].offsetHeight/2;

      var a=l-ev.clientX;
      var b=t-ev.clientY;

      console.log(i, l, t, ev.clientX, ev.clientY, a, b);
      var dis=Math.sqrt(a*a+b*b);

      console.log(dis)
      var scale=1-dis/300;

      if(scale<0.5) scale=0.5;

      console.log(scale);
      _this.aMenuItem[i].width=128*scale;
    }
  };
}

window.onload=function (){

  var jsonp = new Jsonp("#jsonp");

  new MenuEffect("#apple-menu");

};
