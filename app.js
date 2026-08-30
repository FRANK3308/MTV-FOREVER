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

if (container) {
    container.addEventListener("mousemove", showControls);
    container.addEventListener("touchstart", showControls);
}

btnBack.onclick = function(e) {
    e.stopPropagation();
    if (isLocked) return;
    
    video.pause();
    
    if (container) {
        container.style.display = "none";
    }
    document.getElementById("streaming-details-80s").style.display = "flex";
    document.getElementById("home").style.display = "none";
    
    const botonHomeFisico = document.querySelector(".home-btn");
    if (botonHomeFisico) {
        botonHomeFisico.style.display = "inline-block";
    }
};

btnFullscreen.onclick = function(e) {
    e.stopPropagation();
    if (isLocked) return;

    if (!document.fullscreenElement && container) {
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
    document.getElementById("streaming-details-80s").style.display = "none";
    document.getElementById("home").style.display = "none";
    
    const botonHomeFisico = document.querySelector(".home-btn");
    if (botonHomeFisico) {
        botonHomeFisico.style.display = "none";
    }

    if (container) {
        container.style.display = "block";
        if (!document.fullscreenElement) {
            await container.requestFullscreen().catch(err => {
                console.log("Error al activar pantalla completa:", err);
            });
        }
    }

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
