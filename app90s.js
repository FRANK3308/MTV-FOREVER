const video90 = document.getElementById("videoPlayer90");
const button90 = document.getElementById("startChannel90s");
const container90 = document.querySelector(".player90s");

const playlist90 = [
    
    "https://archive.org/download/90s-001/90s_001.mp4"
   
];

const diccionarioCreditos90 = {
    
    "https://archive.org/download/90s-001/90s_001.mp4": { a: "TklSVkFOQQ==", 
        c: "IlNNRUxMUyBMSUtFIFRFRU4gU1BJUklUIg==", 
        b: "TkVWRVJNSU5E", 
        y: "MTk5MQ=="}
    
};

let currentVideo90 = Math.floor(Math.random() * playlist90.length);

const controlsLayer90 = document.getElementById("custom-controls90");
const btnBack90 = document.getElementById("ctrl-back90");
const btnLock90 = document.getElementById("ctrl-lock90");
const btnFullscreen90 = document.getElementById("ctrl-fullscreen90");

let controlsTimeout90;
let isLocked90 = false;

function playCurrentVideo90() {
    const videoUrlActual = playlist90[currentVideo90];
    video90.src = videoUrlActual;
    
    const info = diccionarioCreditos90[videoUrlActual];
    if (info) {
        document.getElementById("cred-artista90").innerText = atob(info.a);
        document.getElementById("cred-cancion90").innerText = atob(info.c);
        document.getElementById("cred-album90").innerText = atob(info.b);
        document.getElementById("cred-anio90").innerText = atob(info.y);
    }
    
    video90.load();
    video90.play().catch(error => {
        console.log("Error de reproducción:", error);
    });
}

function showControls90() {
    if (controlsLayer90) {
        controlsLayer90.style.opacity = "1";
        controlsLayer90.style.pointerEvents = "auto";
    }
    clearTimeout(controlsTimeout90);
    if (!isLocked90) {
        controlsTimeout90 = setTimeout(hideControls90, 3000);
    }
}

function hideControls90() {
    if (!isLocked90 && controlsLayer90) {
        controlsLayer90.style.opacity = "0";
        controlsLayer90.style.pointerEvents = "none";
    }
}

if (container90) {
    container90.addEventListener("mousemove", showControls90);
    container90.addEventListener("touchstart", showControls90);
}

if (btnBack90) {
    btnBack90.onclick = async function(e) {
        e.stopPropagation();
        if (isLocked90) return;
        
        video90.pause();
        
        if (document.fullscreenElement) {
            await document.exitFullscreen().catch(err => console.log(err));
        }
        
        if (container90) {
            container90.style.display = "none";
        }
        document.getElementById("streaming-details-90s").style.display = "flex";
        document.getElementById("home").style.display = "none";
        
        const creditosBox90 = document.getElementById("creditos-box90");
        if (creditosBox90) {
            creditosBox90.classList.remove("active");
        }
        
        const botonHomeFisico90 = document.querySelector(".home-btn-90s");
        if (botonHomeFisico90) {
            botonHomeFisico90.style.display = "inline-block";
        }
    };
}

if (btnFullscreen90) {
    btnFullscreen90.onclick = function(e) {
        e.stopPropagation();
        if (isLocked90) return;
        if (!document.fullscreenElement && container90) {
            container90.requestFullscreen().catch(err => console.log(err));
        } else {
            document.exitFullscreen();
        }
    };
}

if (btnLock90) {
    btnLock90.onclick = function(e) {
        e.stopPropagation();
        isLocked90 = !isLocked90;
        if (isLocked90) {
            btnLock90.innerText = "🔒";
            btnLock90.style.color = "white";
            btnLock90.style.borderColor = "white";
            if (btnBack90) btnBack90.style.visibility = "hidden";
            if (btnFullscreen90) btnFullscreen90.style.visibility = "hidden";
        } else {
            btnLock90.innerText = "🔓";
            btnLock90.style.color = "white";
            btnLock90.style.borderColor = "white";
            if (btnBack90) btnBack90.style.visibility = "visible";
            if (btnFullscreen90) btnFullscreen90.style.visibility = "visible";
            showControls90();
        }
    };
}

if (button90) {
    button90.addEventListener("click", async () => {
        document.getElementById("streaming-details-90s").style.display = "none";
        document.getElementById("home").style.display = "none";
        
        const botonHomeFisico90 = document.querySelector(".home-btn-90s");
        if (botonHomeFisico90) {
            botonHomeFisico90.style.display = "none";
        }
        if (container90) {
            container90.style.display = "block";
            if (!document.fullscreenElement) {
                await container90.requestFullscreen().catch(err => {
                    console.log("Error al activar pantalla completa:", err);
                });
            }
        }
        
        history.pushState({page: "home-falso"}, null, "");
        history.pushState({page: "cartelera"}, null, "");
        
        playCurrentVideo90();
        showControls90();
    });
}

if (video90) {
    video90.addEventListener("ended", () => {
        currentVideo90 = Math.floor(Math.random() * playlist90.length);
        playCurrentVideo90();
    });

    video90.addEventListener("timeupdate", () => {
        const currentTime = video90.currentTime;
        const duration = video90.duration;
        const creditosBox90 = document.getElementById("creditos-box90");
        
        if (!creditosBox90 || !duration) return;
        
        const tiempoFinalInicio = duration - 32;
        const mostrarAlInicio = (currentTime >= 0 && currentTime <= 15);
        const mostrarAlFinal = (currentTime >= tiempoFinalInicio && currentTime <= (tiempoFinalInicio + 15));
        
        if (mostrarAlInicio || mostrarAlFinal) {
            creditosBox90.classList.add("active");
        } else {
            creditosBox90.classList.remove("active");
        }
    });

    video90.addEventListener("play", () => {
        const logoBox90 = document.getElementById("channel-logo90");
        if (logoBox90) {
            logoBox90.style.display = "flex";
            setTimeout(() => { logoBox90.style.opacity = "1"; }, 10);
        }
    });

    video90.addEventListener("pause", () => {
        const logoBox90 = document.getElementById("channel-logo90");
        if (logoBox90) {
            logoBox90.style.opacity = "0";
            setTimeout(() => { 
                if (logoBox90.style.opacity === "0") { logoBox90.style.display = "none"; }
            }, 500);
        }
    });
}

