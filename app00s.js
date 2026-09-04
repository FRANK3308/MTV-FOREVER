const video = document.getElementById("videoPlayer00");
const button = document.getElementById("startChannel00s");
const container = document.querySelector(".players00s");

const playlist = [
    "https://archive.org",
];

const diccionarioCreditos = {
    "https://archive.org": { 
};

let currentVideo = Math.floor(Math.random() * playlist.length);

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
    
    const programaTexto = document.querySelector(".programa-texto00");
    if (programaTexto) {
        programaTexto.innerText = "Goodbye From MTV 00s";
    }

      const logoImg = document.getElementById("logo-img00");
    if (logoImg) {
        logoImg.src = "MTV_00s_logo.png";
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

if (btnBack) {
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
    
    const page00s = document.getElementById("mtv00s-page");
    const details00s = document.getElementById("streaming-details-00s");
    if (page00s && details00s) {
        page00s.style.display = "block";
        details00s.style.display = "flex";
    }
    document.getElementById("home").style.display = "none";

    const botonHome00s = document.querySelector(".home-btn-00s");
    if (botonHome00s) {
        botonHome00s.style.display = "inline-block";
        }
};
}
if (btnFullscreen) {
btnFullscreen.onclick = function(e) {
    e.stopPropagation();
    if (isLocked) return;
    if (!document.fullscreenElement && container) {
        container.requestFullscreen().catch(err => console.log(err));
    } else {
        document.exitFullscreen();
    }
};
}

if (btnLock) {
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
}

if (button) {
button.addEventListener("click", async () => {
    const page00s = document.getElementById("mtv00s-page");
    if (page00s) {
        page00s.style.display = "none";
    }
    document.getElementById("home").style.display = "none";

     const botonHome00s = document.querySelector(".home-btn-00s");
     if (botonHome00s) {
            botonHome00s.style.display = "none";
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
    
    currentVideo = Math.floor(Math.random() * playlist.length);
    playCurrentVideo();
    showControls();
});
}
    
