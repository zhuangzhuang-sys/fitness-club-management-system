

var rootUrl = "http://192.168.31.230:8080/sheyinyuyueinfochat/";
var fileurl = rootUrl+"upload/";
var clientUrl = rootUrl+"Wehall!";
var uploadUrl = rootUrl+"Upload";


function ownpage(el){
    $("#showimg").css({"left":"0px","top":"0px"});
    changePage("imgshow");
    $("#showimg").attr("src",el.src);
    var imgcontaner = document.getElementById("showimg");
    var hammertime = Hammer(imgcontaner, {
        preventDefault: true
    });
    var lastScale = 1;
    var startX = 0;
    var startY = 0;
    var changeX = 0;
    var changeY = 0;
    var currentX = 0;
    var currentY = 0;
    var hasDoubleTap = false;
    hammertime.on("transform",function(ev){
        $(imgcontaner).css({"transform":"scale("+ev.gesture.scale*lastScale+","+ev.gesture.scale*lastScale+")"});
        lastScale = ev.gesture.scale;
        $("#showimg").css({"left":"0px","top":"0px"});
    });
    hammertime.on("dragstart",function(ev){
        $(imgcontaner).css({"transition": ""});
        startX = ev.gesture.center.clientX;
        startY = ev.gesture.center.clientY;
        currentX = $(imgcontaner).css("left").split("px")[0]*1;
        currentY = $(imgcontaner).css("top").split("px")[0]*1;
    });
    hammertime.on("drag",function(ev){
        changeX = ev.gesture.center.clientX-startX;
        changeY = ev.gesture.center.clientY-startY;
        $(imgcontaner).css("left",currentX+changeX);
        $(imgcontaner).css("top",currentY+changeY);
    });
    hammertime.on("doubletap",function(ev){
        $("#showimg").css({"left":"0px","top":"0px"});
        if(hasDoubleTap){
            $(imgcontaner).css({"transform":"scale(1,1)","transition": "all 200ms ease-in"});
            hasDoubleTap = false;
        }else{
            $(imgcontaner).css({"transform":"scale(6,6)","transition": "all 200ms ease-in"});
            hasDoubleTap = true;
        }

    });

}

var _mySwiper = null;
function  initswiper(){
    if(!_mySwiper){
        ajaxCallback("listNotice",{},function(data){
            var html = "";
            noticelist = data;
            for(var i=0;i<data.length;i++){
                var obj = data[i];
                html+='<div onclick="noteiceDetail('+obj.id+');" style="height: 150px; background-image: url('+fileurl+obj.img+');background-size: 100% 100%;"  class="swiper-slide"></div>';
            }

            $("#swiperctn").html(html);
            _mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: true,

                // 如果需要分页器
                pagination: '.swiper-pagination',
                autoplay: 3000

                // 如果需要前进后退按钮
                //nextButton: '.swiper-button-next',
                //prevButton: '.swiper-button-prev',

                // 如果需要滚动条
                //scrollbar: '.swiper-scrollbar'
            });

        });

    }
}

function toggleyzm(el){
    $(el).attr("src",clientUrl+"getYzm?t="+Date.now());
}


function toNaozhong(){
    myObj.openClock();
}
function toWeather(){
    changePage("tianqipage");
}
function getWeather(cityname){
    var city = cityname || $("#cityname").val();
    /*var url = "http://api.map.baidu.com/telematics/v3/weather?location="+encodeURI(city)+"&output=json&ak=W6eQXHTZjNf7QTG9k9Mpboez"
     ajaxStraightCallback(url,{},function(data){
     alert(data);
     });*/
    ajaxCallback("getWeather",{city:city},function(data){
        $("#resultdiv").show();
        var results = data.info;
        results = JSON.parse(results);
        var list = results.results[0]['weather_data'];
        $("#day1").html(list[0].date+"<br>"+"温度："+list[0].temperature+"<br>"+list[0].weather+":"+list[0].wind);
        $("#day1img").attr("src",list[0].dayPictureUrl);

        $("#day2").html(list[1].date+"<br>"+"温度："+list[1].temperature+"<br>"+list[1].weather+":"+list[1].wind);
        $("#day2img").attr("src",list[1].dayPictureUrl);

        $("#day3").html(list[2].date+"<br>"+"温度："+list[2].temperature+"<br>"+list[2].weather+":"+list[2].wind);
        $("#day3img").attr("src",list[2].dayPictureUrl);

    });
}
