const button = document.getElementById("startChannel");

const player = document.querySelector(".player80s");

button.addEventListener("click", async()=>{

    if(!document.fullscreenElement){

        await player.requestFullscreen();

    }

});
