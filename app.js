const video = document.getElementById("videoPlayer");
const button = document.getElementById("startChannel");
const container = document.querySelector(".player80s");

const playlist = [
    "https://archive.org"
];

let currentVideo = 0;

const controlsLayer = document.getElementById("custom-controls");
const btnBack = document.getElementById("ctrl-back");
const btnLock = document.getElementById("ctrl-lock");
const btnFullscreen = document.getElementById("ctrl-fullscreen");

let controlsTimeout;
let isLocked = false;

function playCurrentVideo() {
    video.src = playlist[currentVideo];
    video.load();

    video.play().catch(error => {
        console.log("Error de reproducción:", error);
    });
}

function showControls() {
    controlsLayer.style.opacity = "1";
    controlsLayer.style.pointerEvents = "auto";
    
    clearTimeout(controlsTimeout);
    
    if (!isLocked) {
        controlsTimeout = setTimeout(hideControls, 3000);
    }
}

function hideControls() {
    if (!isLocked) {
        controlsLayer.style.opacity = "0";
        controlsLayer.style.pointerEvents = "none";
    }
}

container.addEventListener("mousemove", showControls);
container.addEventListener("touchstart", showControls);

btnBack.onclick = function(e) {
    e.stopPropagation();
    if (isLocked) return;
    
    video.pause();
    document.getElementById("home").style.display = "block";
    document.getElementById("mtv80s-page").style.display = "none";
};

btnFullscreen.onclick = function(e) {
    e.stopPropagation();
    if (isLocked) return;

    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => console.log(err));
    } else {
        document.exitFullscreen();
    }
};

btnLock.onclick = function(e) {
    e.stopPropagation();
    isLocked = !isLocked;

    if (isLocked) {
        btnLock.innerText = "🔒";
        btnLock.style.color = "white";
        btnLock.style.borderColor = "white";
        btnBack.style.visibility = "hidden";
        btnFullscreen.style.visibility = "hidden";
    } else {
        btnLock.innerText = "🔓";
        btnLock.style.color = "white";
        btnLock.style.borderColor = "white";
        btnBack.style.visibility = "visible";
        btnFullscreen.style.visibility = "visible";
        showControls();
    }
};

button.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
        await container.requestFullscreen().catch(err => {
            console.log("Error al activar pantalla completa:", err);
        });
    }

    button.style.display = "none";
    playCurrentVideo();
    showControls();
});

video.addEventListener("ended", () => {
    currentVideo++;

    if (currentVideo >= playlist.length) {
        currentVideo = 0;
    }

    playCurrentVideo();
});

showControls();
