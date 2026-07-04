let player;

const button = document.getElementById("startChannel");
const container = document.querySelector(".player80s");

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

    if (!document.fullscreenElement) {

        await container.requestFullscreen();

    }

    button.style.display = "none";

    player.playVideo();

});
