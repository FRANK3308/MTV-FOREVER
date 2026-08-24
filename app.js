const video = document.getElementById("videoPlayer");
const button = document.getElementById("startChannel");
const container = document.querySelector(".player80s");

const playlist = [
    "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
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

