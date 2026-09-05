const video00 = document.getElementById("videoPlayer00");
const button00 = document.getElementById("startChannel00s");
const container00 = document.querySelector(".player00s");

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

let currentVideo00 = Math.floor(Math.random() * playlist00.length);

const controlsLayer00 = document.getElementById("custom-controls00");
const btnBack00 = document.getElementById("ctrl-back00");
const btnLock00 = document.getElementById("ctrl-lock00");
const btnFullscreen00 = document.getElementById("ctrl-fullscreen00");

let controlsTimeout00;
let isLocked00 = false;

function playCurrentVideo00() {
    const videoUrlActual = playlist00[currentVideo00];
    video00.src = videoUrlActual;
    
    const info = diccionarioCreditos00[videoUrlActual];
    if (info) {
        document.getElementById("cred-artista00").innerText = atob(info.a);
        document.getElementById("cred-cancion00").innerText = atob(info.c);
        document.getElementById("cred-album00").innerText = atob(info.b);
        document.getElementById("cred-anio00").innerText = atob(info.y);
    }
    
    video00.load();
    video00.play().catch(error => {
        console.log("Error de reproducción:", error);
    });
}

function showControls00() {
    if (controlsLayer00) {
        controlsLayer00.style.opacity = "1";
        controlsLayer00.style.pointerEvents = "auto";
    }
    clearTimeout(controlsTimeout00);
    if (!isLocked00) {
        controlsTimeout00 = setTimeout(hideControls00, 3000);
    }
}

function hideControls00() {
    if (!isLocked00 && controlsLayer00) {
        controlsLayer00.style.opacity = "0";
        controlsLayer00.style.pointerEvents = "none";
    }
}

if (container00) {
    container00.addEventListener("mousemove", showControls00);
    container00.addEventListener("touchstart", showControls00);
}

if (btnBack00) {
    btnBack00.onclick = async function(e) {
        e.stopPropagation();
        if (isLocked00) return;
        
        video00.pause();
        
        if (document.fullscreenElement) {
            await document.exitFullscreen().catch(err => console.log(err));
        }
        
        if (container00) {
            container00.style.display = "none";
        }
        document.getElementById("streaming-details-00s").style.display = "flex";
        document.getElementById("home").style.display = "none";
        
        const botonHomeFisico00 = document.querySelector(".home-btn-00s");
        if (botonHomeFisico00) {
            botonHomeFisico00.style.display = "inline-block";
        }
    };
}

if (btnFullscreen00) {
    btnFullscreen00.onclick = function(e) {
        e.stopPropagation();
        if (isLocked00) return;
        if (!document.fullscreenElement && container00) {
            container00.requestFullscreen().catch(err => console.log(err));
        } else {
            document.exitFullscreen();
        }
    };
}

if (btnLock00) {
    btnLock00.onclick = function(e) {
        e.stopPropagation();
        isLocked00 = !isLocked00;
        if (isLocked00) {
            btnLock00.innerText = "🔒";
            btnLock00.style.color = "white";
            btnLock00.style.borderColor = "white";
            if (btnBack00) btnBack00.style.visibility = "hidden";
            if (btnFullscreen00) btnFullscreen00.style.visibility = "hidden";
        } else {
            btnLock00.innerText = "🔓";
            btnLock00.style.color = "white";
            btnLock00.style.borderColor = "white";
            if (btnBack00) btnBack00.style.visibility = "visible";
            if (btnFullscreen00) btnFullscreen00.style.visibility = "visible";
            showControls00();
        }
    };
}

if (button00) {
    button00.addEventListener("click", async () => {
        document.getElementById("streaming-details-00s").style.display = "none";
        document.getElementById("home").style.display = "none";
        
        const botonHomeFisico00 = document.querySelector(".home-btn-00s");
        if (botonHomeFisico00) {
            botonHomeFisico00.style.display = "none";
        }
        if (container00) {
            container00.style.display = "block";
            if (!document.fullscreenElement) {
                await container00.requestFullscreen().catch(err => {
                    console.log("Error al activar pantalla completa:", err);
                });
            }
        }
        
        history.pushState({page: "home-falso"}, null, "");
        history.pushState({page: "cartelera"}, null, "");
        
        playCurrentVideo00();
        showControls00();
    });
}

if (video00) {
    video00.addEventListener("ended", () => {
        currentVideo00 = Math.floor(Math.random() * playlist00.length);
        playCurrentVideo00();
    });

    video00.addEventListener("play", () => {
        const logoBox00 = document.getElementById("channel-logo00");
        if (logoBox00) {
            logoBox00.style.display = "flex";
            setTimeout(() => { logoBox00.style.opacity = "1"; }, 10);
        }
    });

    video00.addEventListener("pause", () => {
        const logoBox00 = document.getElementById("channel-logo00");
        if (logoBox00) {
            logoBox00.style.opacity = "0";
            setTimeout(() => { 
                if (logoBox00.style.opacity === "0") { logoBox00.style.display = "none"; }
            }, 500);
        }
    });

    video00.addEventListener("timeupdate", () => {
        const currentTime = video00.currentTime;
        const duration = video00.duration;
        const creditosBox00 = document.getElementById("creditos-box00");
        
        if (!creditosBox00 || !duration) return;
        const tiempoFinalInicio = duration - 32;
        const mostrarAlInicio = (currentTime >= 12 && currentTime <= 27);
        const mostrarAlFinal = (currentTime >= tiempoFinalInicio && currentTime <= (tiempoFinalInicio + 15));
        if (mostrarAlInicio || mostrarAlFinal) {
            creditosBox00.style.display = "block";
            setTimeout(() => { creditosBox00.style.opacity = "1"; }, 10);
        } else {
            creditosBox00.style.opacity = "0";
            setTimeout(() => { 
                if (creditosBox00.style.opacity === "0") {
                    creditosBox00.style.display = "none"; 
                }
            }, 500);
        }
    });
}

