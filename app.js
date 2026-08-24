const video = document.getElementById("videoPlayer");
const button = document.getElementById("startChannel");
const container = document.querySelector(".player80s");

const playlist = [
    "URL_DIRECTA_VIDEO_1.mp4",
    "URL_DIRECTA_VIDEO_2.mp4",
    "URL_DIRECTA_VIDEO_3.mp4"
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

