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
    document.getElementsByClassName("ampm")[0].innerHTML=today.getHours()>12?"Pm":"Am";
}

function getTwoDigit(a){
    return a<10?`0${a}`:a;
}

start();