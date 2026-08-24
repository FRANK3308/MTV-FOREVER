const video = document.getElementById("videoPlayer");
const button = document.getElementById("startChannel");
const container = document.querySelector(".player80s");

const playlist = [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cavetown_-_Green.webm",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Symptoms_(Official_Music_Video).webm",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Someofw_-_About_life_(music_video).webm"
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

