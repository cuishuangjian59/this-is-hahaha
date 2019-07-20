var $main=$(".main"),
    $header=$(".header"),
    $footer=$(".footer"),
    $musicAudio=$("#musicAudio"),
    musicAudio=$musicAudio[0],
    $musicBtn=$("#musicBtn");
let autoTimer;
function computedMain() {
    var winH=document.documentElement.clientHeight;
    var headerH=$header[0].offsetHeight;
    var footerH=$footer[0].offsetHeight;
    let fontSize=parseFloat(document.documentElement.style.fontSize);
    var curH=(winH-headerH-footerH)/fontSize-0.6+"rem";
    console.log(curH);
    $main.css("height",curH)
}
computedMain();
window.addEventListener("resize",computedMain);
$.ajax({
    url:"json/lyric.json",
    type:"get",
    async:false,
    success:function (data) {
        bindHtml(data.lyric)
    }
})
function bindHtml(data) {

data=data.replace(/&#(\d+);/g,function (res,a) {
    switch (parseFloat(a)) {
        case 32:
            return " ";
        case 40:
            return "(";
        case 41:
            return ")";
        case 45:
            return "-";
    }
    return res;
});
let ary=[];
    data.replace(/\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^&#]+)(?:&#10)/g,function (res,min,sec,val) {
        ary.push({
            minute:min,
            second:sec,
            value:val
        })
        // console.log(ary);
    })
    let str=``;
    for(let i=0;i<ary.length;i++){
        let cur=ary[i];
        str+=`<p data-min="${cur.minute}" data-sec="${cur.second}">${cur.value}</p>`
    }
    $(".wrapper").html(str);
    musicAudio.play('');
    autoTimer=setInterval(computedTime,1000);
    $musicBtn.addClass("select");
}
$musicBtn.tap(function () {
    if(musicAudio.paused===false){
        musicAudio.pause();
        clearInterval(autoTimer);
        $musicBtn.removeClass("select");
    }else {
        musicAudio.play();
        autoTimer=setInterval(computedTime,1000);
        $musicBtn.addClass("select");
    }
});
let curTop=0;
let step=0;
function computedTime() {
  let curTime=musicAudio.currentTime;
  let durTime=musicAudio.duration;
    // formatTime(curTime)
 // console.log(curTime);
    let time=formatTime(curTime);
    $("#current").html(time);
    let ary=time.split(":");
    let min=ary[0],
        sec=ary[1];
    $("#duration").html(formatTime(durTime));
    if(curTime>=durTime){
        curTop=0;
        $(".wrapper").css("top",curTop+"rem");
        step=0;
        clearInterval(autoTimer);
        $musicBtn.removeClass("select");
        // musicAudio.pause();
    };
    $(".alreay").css("width",curTime/durTime*100+"%");
    let ps=document.getElementsByTagName("p");
    for (let i=0;i<ps.length;i++){
        let curP=ps[i];
        let curMin=curP.getAttribute("data-min");
        let curSec=curP.getAttribute("data-sec");

        if(curMin===min&&curSec===sec){
            step++;
            $(curP).addClass("select").siblings().removeClass("select");
            if(step>4){
                curTop-=0.84;
                $(".wrapper").css("top",curTop+"rem")
            }
        }
    }
}
function formatTime(time) {
    var m=Math.floor(time/60);
    // console.log(m);
    if(m<10){
        m="0"+m
    }
    var b=time-m*60;
    var s=Math.round(b);
    if(s<10){
        s="0"+s;
    }
    // console.log(m + ":" + s);
    return m+":"+s ;
}