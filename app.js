const video = document.getElementById("videoPlayer");
const button = document.getElementById("startChannel");
const container = document.querySelector(".player80s");

const playlist = [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Aden_Said.webm",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Depeche_Mode_-_It%27s_Called_A_Heart_%28Official_Video%29.webm",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Depeche_Mode_-_Everything_Counts_%28Live_-_from_101%29_%28Official_Video%29.webm"
];
let currentVideo = 0;

function playCurrentVideo() {

    video.src = playlist[currentVideo];

    video.play();
}

button.addEventListener("click", async () => {

    if (!document.fullscreenElement) {
        await container.requestFullscreen();
    }

    button.style.display = "none";

    playCurrentVideo();

});

video.addEventListener("ended", () => {

    currentVideo++;

    if (currentVideo >= playlist.length) {
        currentVideo = 0;
    }

    playCurrentVideo();

});

