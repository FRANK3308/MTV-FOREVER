const video = document.getElementById("videoPlayer90");
const button = document.getElementById("startChannel90s");
const container = document.querySelector(".player90s");

const playlist90 = [
    "https://archive.org",
    "https://archive.org",
    "https://archive.org"
];

const diccionarioCreditos90 = {
    "https://archive.org": { a: "UXVlZW4=", c: "IkFub3RoZXIgT25lIEJpdGVzIHRoZSBEdXN0Ig==", b: "VGhlIEdhbWU=", y: "MTk4MA==" },
    "https://archive.org": { a: "R3VucyBOJyBSb3Nlcw==", c: "IldlbGNvbWUgdG8gdGhlIEp1bmdsZSI=", b: "QXBwZXRpdGUgZm9yIERlc3RydWN0aW9u", y: "MTk4Nw==" },
    "https://archive.org": { a: "UXVlZW4=", c: "IkkgV2FudCB0byBCcmVhayBGcmVlIg==", b: "VGhlIFdvcmtz", y: "MTk4NA==" }
};

let currentVideo90 = Math.floor(Math.random() * playlist.length);

const controlsLayer = document.getElementById("custom-controls90");
const btnBack = document.getElementById("ctrl-back90");
const btnLock = document.getElementById("ctrl-lock90");
const btnFullscreen = document.getElementById("ctrl-fullscreen90");

let controlsTimeout;
let isLocked = false;

function playCurrentVideo() {
    const videoUrlActual = playlist[currentVideo];
    video.src = videoUrlActual;
    
    const info = diccionarioCreditos[videoUrlActual];
    if (info) {
        document.getElementById("cred-artista90").innerText = atob(info.a);
        document.getElementById("cred-cancion90").innerText = atob(info.c);
        document.getElementById("cred-album90").innerText = atob(info.b);
        document.getElementById("cred-anio90").innerText = atob(info.y);
    }
    
    video.load();
    video.play().catch(error => {
        console.log("Error de reproducción:", error);
    });
}

function showControls() {
    if (controlsLayer) {
        controlsLayer.style.opacity = "1";
        controlsLayer.style.pointerEvents = "auto";
    }
    clearTimeout(controlsTimeout);
    if (!isLocked) {
        controlsTimeout = setTimeout(hideControls, 3000);
    }
}

function hideControls() {
    if (!isLocked && controlsLayer) {
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
    document.getElementById("streaming-details-90s").style.display = "flex";
    document.getElementById("home").style.display = "none";
    
    const botonHomeFisico90 = document.querySelector(".home-btn-90s");
    if (botonHomeFisico90) {
        botonHomeFisico90.style.display = "inline-block";
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
    document.getElementById("streaming-details-90s").style.display = "none";
    document.getElementById("home").style.display = "none";
    
    const botonHomeFisico90 = document.querySelector(".home-btn-90s");
    if (botonHomeFisico90) {
        botonHomeFisico90.style.display = "none";
    }
    if (container) {
        container.style.display = "block";
        if (!document.fullscreenElement) {
            await container.requestFullscreen().catch(err => {
                console.log("Error al activar pantalla completa:", err);
            });
        }
    }
    
    history.pushState({page: "home-falso"}, null, "");
    history.pushState({page: "cartelera"}, null, "");
    
    playCurrentVideo();
    showControls();
});

video.addEventListener("ended", () => {
    currentVideo = Math.floor(Math.random() * playlist.length);
    playCurrentVideo();
});

showControls();

if (video) {
    video.addEventListener("play", () => {
        const logoBox = document.getElementById("channel-logo90");
        if (logoBox) {
            logoBox.style.display = "flex";
            setTimeout(() => { logoBox.style.opacity = "1"; }, 10);
        }
    });
    video.addEventListener("pause", () => {
        const logoBox = document.getElementById("channel-logo90");
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
        const creditosBox = document.getElementById("creditos-box90");
        
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

