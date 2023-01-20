var audio = new Audio("spelmuziek.mp3");
audio.play();
document.getElementById("music").onclick = function(){
    if(audio.paused){
        audio.play();
        document.getElementById("music").innerHTML = "Muziek pauzeren"
    }
    else{
        audio.pause();
        document.getElementById("music").innerHTML = "Muziek hervatten"
    }
}