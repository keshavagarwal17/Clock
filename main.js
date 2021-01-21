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

menu_item[2].className+=" active";
container[2].style.display="flex";
start();

function selectText(containerid) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}

sec_timer.addEventListener("click",()=>{
    selectText("second-timer");
})

min_timer.addEventListener("click",()=>{
    selectText("minute-timer");
})

hour_timer.addEventListener("click",()=>{
    selectText("hour-timer");
})

let previous_val_of_second=0;
let previous_val_of_minute=0;
let previous_val_of_hour=0;

sec_timer.addEventListener("keyup",(e)=>{
    selectText("second-timer");
    if((e.keyCode>=48 && e.keyCode<58)|| (e.keyCode>=96 && e.keyCode<106)){
        previous_val_of_second = previous_val_of_second*10+parseInt(e.key);
        if(previous_val_of_second<60){
            sec_timer.innerHTML = previous_val_of_second;
        }else{
            sec_timer.innerHTML = e.key;
            previous_val_of_second = e.key;
        }
        if(parseInt(sec_timer.textContent)==0 && parseInt(min_timer.textContent)==0 && parseInt(hour_timer.textContent)==0){
            start_timer_btn.disabled = true;
        }else{
            start_timer_btn.disabled = false;
        }
    }
})
sec_timer.addEventListener("focusout",(e)=>{
    sec_timer.innerHTML = getTwoDigit(parseInt(sec_timer.textContent))
    previous_val_of_second = 0;
})

min_timer.addEventListener("keyup",(e)=>{
    selectText("minute-timer");
    if((e.keyCode>=48 && e.keyCode<58)|| (e.keyCode>=96 && e.keyCode<106)){
        previous_val_of_minute = previous_val_of_minute*10+parseInt(e.key);
        if(previous_val_of_minute<60){
            min_timer.innerHTML = previous_val_of_minute;
        }else{
            min_timer.innerHTML = e.key;
            previous_val_of_minute = e.key;
        }
        if(parseInt(sec_timer.textContent)==0 && parseInt(min_timer.textContent)==0 && parseInt(hour_timer.textContent)==0){
            start_timer_btn.disabled = true;
        }else{
            start_timer_btn.disabled = false;
        }
    }
})
min_timer.addEventListener("focusout",(e)=>{
    min_timer.innerHTML = getTwoDigit(parseInt(min_timer.textContent))
    previous_val_of_minute = 0;
})

hour_timer.addEventListener("keyup",(e)=>{
    selectText("hour-timer");
    if((e.keyCode>=48 && e.keyCode<58)|| (e.keyCode>=96 && e.keyCode<106)){
        previous_val_of_hour = previous_val_of_hour*10+parseInt(e.key);
        if(previous_val_of_hour<100){
            hour_timer.innerHTML = previous_val_of_hour;
        }else{
            hour_timer.innerHTML = e.key;
            previous_val_of_hour = e.key;
        }
        if(parseInt(sec_timer.textContent)==0 && parseInt(min_timer.textContent)==0 && parseInt(hour_timer.textContent)==0){
            start_timer_btn.disabled = true;
        }else{
            start_timer_btn.disabled = false;
        }
    }
})
hour_timer.addEventListener("focusout",(e)=>{
    hour_timer.innerHTML = getTwoDigit(parseInt(hour_timer.textContent))
    previous_val_of_hour = 0;
})
