const video = document.getElementById("videoPlayer");
const button = document.getElementById("startChannel");
const container = document.querySelector(".player80s");

    const playlist = [
        
        "https://archive.org/download/80s-can-001/80s_can001.mp4"
        
];

let currentVideo = 0;

function playCurrentVideo() {
    video.src = playlist[currentVideo];
    video.load();

    video.play().catch(error => {
        console.log("Error de reproducción:", error);
    });
}

button.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
        await container.requestFullscreen().catch(err => {
            console.log("Error al activar pantalla completa:", err);
        });
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

