const video = document.getElementById("videoPlayer");
const button = document.getElementById("startChannel90s");
const container = document.querySelector(".player80s");

const playlist = [
    "https://archive.org",
    
];

const diccionarioCreditos = {
    "https://archive.org": { 
};

let currentVideo = Math.floor(Math.random() * playlist.length);

const controlsLayer = document.getElementById("custom-controls");
const btnBack = document.getElementById("ctrl-back");
const btnLock = document.getElementById("ctrl-lock");
const btnFullscreen = document.getElementById("ctrl-fullscreen");

let controlsTimeout;
let isLocked = false;

function playCurrentVideo() {
    const videoUrlActual = playlist[currentVideo];
    video.src = videoUrlActual;
    
    const info = diccionarioCreditos[videoUrlActual];
    if (info) {
        document.getElementById("cred-artista").innerText = atob(info.a);
        document.getElementById("cred-cancion").innerText = atob(info.c);
        document.getElementById("cred-album").innerText = atob(info.b);
        document.getElementById("cred-anio").innerText = atob(info.y);
    }
    
    const programaTexto = document.querySelector(".programa-texto");
    if (programaTexto) {
        programaTexto.innerText = "Goodbye From MTV 90s";
    }

      const logoImg = document.getElementById("logo-img");
    if (logoImg) {
        logoImg.src = "MTV_90s_2022.png";
    }
    
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
    
    const page90s = document.getElementById("mtv90s-page");
    const details90s = document.getElementById("streaming-details-90s");
    if (page90s && details90s) {
        page90s.style.display = "block";
        details90s.style.display = "flex";
    }
    document.getElementById("home").style.display = "none";
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
    const page90s = document.getElementById("mtv90s-page");
    if (page90s) {
        page90s.style.display = "none";
    }
    document.getElementById("home").style.display = "none";
    
    if (container) {
        container.style.display = "block";
        if (!document.fullscreenElement) {
            await container.requestFullscreen().catch(err => {
                console.log("Error al activar pantalla completa:", err);
            });
        }
    }
    
    currentVideo = Math.floor(Math.random() * playlist.length);
    playCurrentVideo();
    showControls();
});

