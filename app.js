const video = document.getElementById("videoPlayer");
const button = document.getElementById("startChannel");
const container = document.getElementById("mtv80s-page");

const playlist = [
    
    url:"https://archive.org/download/vid-20260826-124651/VID_20260826_124651.mp4",
    artista: "QS1IQQ==", 
    cancion: "IlRha2UgT24gTWUi",
    album: "SHVudGluZyBIaWdoIGFuZCBMb3c=",
    anio: "MTk4NQ=="
    
];

let currentVideo = 0;

const controlsLayer = document.getElementById("custom-controls");
const btnBack = document.getElementById("ctrl-back");
const btnLock = document.getElementById("ctrl-lock");
const btnFullscreen = document.getElementById("ctrl-fullscreen");

let controlsTimeout;
let isLocked = false;

function playCurrentVideo() {
    const videoActual = playlist[currentVideo];
    video.src = videoActual.url;
    
    document.getElementById("cred-artista").innerText = atob(videoActual.artista);
    document.getElementById("cred-cancion").innerText = atob(videoActual.cancion);
    document.getElementById("cred-album").innerText = atob(videoActual.album);
    document.getElementById("cred-anio").innerText = atob(videoActual.anio);
    
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

btnBack.onclick = async function(e) {
    e.stopPropagation();
    if (isLocked) return;
    
    video.pause();
    
    if (document.fullscreenElement) {
        await document.exitFullscreen().catch(err => console.log(err));
    }
    
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

if (video) {
    video.addEventListener("play", () => {
        const logoBox = document.getElementById("channel-logo");
        if (logoBox) {
            logoBox.style.display = "flex";
            setTimeout(() => { logoBox.style.opacity = "1"; }, 10);
        }
    });

    video.addEventListener("pause", () => {
        const logoBox = document.getElementById("channel-logo");
        if (logoBox) {
            logoBox.style.opacity = "0";
            setTimeout(() => { 
                if (logoBox.style.opacity === "0") { logoBox.style.display = "none"; }
            }, 500);
        }
    });

    video.addEventListener("timeupdate", () => {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const creditosBox = document.getElementById("creditos-box");
        
        if (!creditosBox || !duration) return;

        const tiempoFinalInicio = duration - 32;
        const mostrarAlInicio = (currentTime >= 12 && currentTime <= 27);
        const mostrarAlFinal = (currentTime >= tiempoFinalInicio && currentTime <= (tiempoFinalInicio + 15));

        if (mostrarAlInicio || mostrarAlFinal) {
            creditosBox.style.display = "block";
            setTimeout(() => { creditosBox.style.opacity = "1"; }, 10);
        } else {
            creditosBox.style.opacity = "0";
            setTimeout(() => { 
                if (creditosBox.style.opacity === "0") {
                    creditosBox.style.display = "none"; 
                }
            }, 500);
        }
    });
}

