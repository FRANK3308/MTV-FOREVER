const video = document.getElementById("videoPlayer00");
const button = document.getElementById("startChannel00s");
const container = document.querySelector(".player00s");

const playlist00 = [
    "https://archive.org",
    "https://archive.org",
    "https://archive.org"
];

const diccionarioCreditos00 = {
    "https://archive.org": { a: "TWljaGFlbCBKYWNrc29u", c: "IkJhZCI=", b: "QmFk", y: "MTk4Nw==" },
    "https://archive.org": { a: "VTI=", c: "IlByaWRlIChJbiBUaGUgTmFtZSBPZiBMb3ZlKSI=", b: "VGhlIFVubm90aWNlYWJsZSBGaXJl", y: "MTk4NA==" },
    "https://archive.org": { a: "UHJpbmNlIGFuZCB0aGUgUmV2b2x1dGlvbg==", c: "IlB1cnBsZSBSYWluIg==", b: "UHVycGxlIFJhaW4=", y: "MTk4NA==" }
};

let currentVideo00 = Math.floor(Math.random() * playlist.length);

const controlsLayer = document.getElementById("custom-controls00");
const btnBack = document.getElementById("ctrl-back00");
const btnLock = document.getElementById("ctrl-lock00");
const btnFullscreen = document.getElementById("ctrl-fullscreen00");

let controlsTimeout;
let isLocked = false;

function playCurrentVideo() {
    const videoUrlActual = playlist[currentVideo];
    video.src = videoUrlActual;
    
    const info = diccionarioCreditos[videoUrlActual];
    if (info) {
        document.getElementById("cred-artista00").innerText = atob(info.a);
        document.getElementById("cred-cancion00").innerText = atob(info.c);
        document.getElementById("cred-album00").innerText = atob(info.b);
        document.getElementById("cred-anio00").innerText = atob(info.y);
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
    document.getElementById("streaming-details-00s").style.display = "flex";
    document.getElementById("home").style.display = "none";
    
    const botonHomeFisico00 = document.querySelector(".home-btn-00s");
    if (botonHomeFisico00) {
        botonHomeFisico00.style.display = "inline-block";
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
    document.getElementById("streaming-details-00s").style.display = "none";
    document.getElementById("home").style.display = "none";
    
    const botonHomeFisico00 = document.querySelector(".home-btn-00s");
    if (botonHomeFisico00) {
        botonHomeFisico00.style.display = "none";
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
        const logoBox = document.getElementById("channel-logo00");
        if (logoBox) {
            logoBox.style.display = "flex";
            setTimeout(() => { logoBox.style.opacity = "1"; }, 10);
        }
    });
    video.addEventListener("pause", () => {
        const logoBox = document.getElementById("channel-logo00");
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
        const creditosBox = document.getElementById("creditos-box00");
        
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

