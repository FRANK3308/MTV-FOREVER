let player;

const button = document.getElementById("startChannel");

function onYouTubeIframeAPIReady() {

    player = new YT.Player("player", {

        videoId: "djV11Xbc914",

        playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            fs: 0
        }

    });

}

button.addEventListener("click", async () => {

    const container = document.querySelector(".player80s");

    if (container && !document.fullscreenElement) {
        await container.requestFullscreen();
    }

    button.style.display = "none";

    if (player) {
        player.playVideo();
    }

});
