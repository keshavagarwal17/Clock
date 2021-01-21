var centiSecond = 0;
var second = 0;
var minute = 0;
var stop_watch_hour=0;
var menu_item = document.getElementsByClassName('menu-item');
var stopWatchRefereshId;
var stop_stopwatch_btn = document.getElementsByClassName("Stop-btn")[0];
var resume_stopwatch_btn = document.getElementsByClassName("Resume-btn")[0];
var reset_stopwatch_btn = document.getElementsByClassName("Reset-btn")[0];
var start_stopwatch_btn = document.getElementsByClassName("stop-watch-btn")[0];
var sec_timer= document.getElementsByClassName("inp-timer")[2]; 
var min_timer= document.getElementsByClassName("inp-timer")[1]; 
var hour_timer= document.getElementsByClassName("inp-timer")[0]; 
var container = document.getElementsByClassName("container");
var start_timer_btn = document.getElementsByClassName("start-btn")[0];

function start(){
    changeData();
    setInterval(changeData, 1000);
}

function changeData(){
    var today = new Date();
    var todaySec = today.getSeconds();
    document.getElementsByClassName("sec2")[0].innerHTML=getTwoDigit(todaySec);
    var mins = today.getMinutes();
    document.getElementsByClassName("min")[0].innerHTML=getTwoDigit(mins);
    var hours = today.getHours();
    document.getElementsByClassName("hour")[0].innerHTML=hours>12?getTwoDigit(hours-12):hours==0?"12":getTwoDigit(hours);
    document.getElementsByClassName("ampm")[0].innerHTML=today.getHours()>=12?"Pm":"Am";
}

function getTwoDigit(a){
    return a<10?`0${a}`:a;
}

function startStopWatch(){
    stopWatchRefereshId = setInterval(updateStopWatch,10);
}

start_stopwatch_btn.addEventListener("click",()=>{
    start_stopwatch_btn.style.display = "none";
    document.getElementsByClassName("after-start-stopwatch-btn")[0].style.display="block";
    startStopWatch();
})

stop_stopwatch_btn.addEventListener("click",()=>{
    resume_stopwatch_btn.style.display="inline";
    stop_stopwatch_btn.style.display="none";
    clearInterval(stopWatchRefereshId);
})

resume_stopwatch_btn.addEventListener("click",()=>{
    resume_stopwatch_btn.style.display="none";
    stop_stopwatch_btn.style.display="inline";
    startStopWatch();
})

reset_stopwatch_btn.addEventListener("click",()=>{
    clearInterval(stopWatchRefereshId);
    centiSecond = 0;
    second = 0;
    minute = 0;
    stop_watch_hour=0;
    resume_stopwatch_btn.style.display="none";
    stop_stopwatch_btn.style.display="inline";
    start_stopwatch_btn.style.display = "block";
    document.getElementsByClassName("after-start-stopwatch-btn")[0].style.display="none";
    document.getElementsByClassName("stopWatchTime")[0].innerHTML="00 : 00 : 00 : 00";
})

function updateStopWatch(){
    centiSecond++;
    if(centiSecond==100){
        second++;
        centiSecond=0;
    }
    if(second==60){
        minute++;
        second=0;
    }
    if(minute==60){
        stop_watch_hour++;
        minute=0;
    }
    document.getElementsByClassName("stopWatchTime")[0].innerHTML= `${getTwoDigit(stop_watch_hour)} : ${getTwoDigit(minute)} : ${getTwoDigit(second)} : ${getTwoDigit(centiSecond)}`;
}



for(let i=0;i<menu_item.length;i++)
{
    menu_item[i].addEventListener('click',()=>{
        for(let j =0;j<menu_item.length;j++){
            menu_item[j].className = "menu-item";
            container[j].style.display="none";
        }
        menu_item[i].className = "menu-item active";
        container[i].style.display="flex";
    })
}

menu_item[0].className+=" active";
container[0].style.display="flex";
start();

let tem;
sec_timer.addEventListener("keyup",(e)=>{
    tem = sec_timer.value==""?0:parseInt(sec_timer.value);
    if(tem>=60){
        sec_timer.value= "59";
    }else{
        sec_timer.value = tem;
    }
    if(parseInt(sec_timer.value)==0 && parseInt(min_timer.value)==0 && parseInt(hour_timer.value)==0){
        start_timer_btn.disabled = true;
    }else{
        start_timer_btn.disabled = false;
    }
})

sec_timer.addEventListener("focusout",(e)=>{
    if(sec_timer.value==""){
        sec_timer.value="0"
    }
    sec_timer.value = getTwoDigit(parseInt(sec_timer.value))
})

min_timer.addEventListener("keyup",(e)=>{
    tem = min_timer.value==""?0:parseInt(min_timer.value);
    if(tem>=60){
        min_timer.value = "59";
    }else{
        min_timer.value = tem;
    }
    if(parseInt(sec_timer.value)==0 && parseInt(min_timer.value)==0 && parseInt(hour_timer.value)==0){
        start_timer_btn.disabled = true;
    }else{
        start_timer_btn.disabled = false;
    }
})
min_timer.addEventListener("focusout",(e)=>{
    if(min_timer.value==""){
        min_timer.value="0";
    }
    min_timer.value = getTwoDigit(parseInt(min_timer.value))
})

hour_timer.addEventListener("keyup",(e)=>{
    tem = hour_timer.value==""?0:parseInt(hour_timer.value);
    if(tem>=100){
        hour_timer.value = "99";
    }else{
        hour_timer.value = tem;
    }
    if(parseInt(sec_timer.value)==0 && parseInt(min_timer.value)==0 && parseInt(hour_timer.value)==0){
        start_timer_btn.disabled = true;
    }else{
        start_timer_btn.disabled = false;
    }
})
hour_timer.addEventListener("focusout",(e)=>{
    if(hour_timer.value==""){
        hour_timer.value="0";
    }
    hour_timer.value = getTwoDigit(parseInt(hour_timer.value))
})
