const video = document.getElementById("videoPlayer");
const button = document.getElementById("startChannel");
const container = document.querySelector(".player80s");

const playlist = [
    
    "https://archive.org/download/vid-20260826-124651/VID_20260826_124651.mp4",
    "https://archive.org/download/80s-002/80s_002.mp4",
    "https://archive.org/download/80s-003/80s_003.mp4",
    "https://archive.org/download/80s-004/80s_004.mp4",
    "https://archive.org/download/80s-005/80s_005.mp4",
    "https://archive.org/download/80s-006/80s_006.mp4",
    "https://archive.org/download/80s-007/80s_007.mp4",
    "https://archive.org/download/80s-008/80s_008.mp4",
    "https://archive.org/download/80s-009/80s_009.mp4",
    "https://archive.org/download/80s-010/80s_010.mp4",
    "https://archive.org/download/80s-011/80s_011.mp4",
    "https://archive.org/download/80s-012/80s_012.mp4",
    "https://archive.org/download/80s-013/80s_013.mp4",
    "https://archive.org/download/80s-014/80s_014.mp4",
    "https://archive.org/download/80s-015/80s_015.mp4",
    "https://archive.org/download/80s-016/80s_016.mp4",
    "https://archive.org/download/80s-017/80s_017.mp4",
    "https://archive.org/download/80s-018/80s_018.mp4",
    "https://archive.org/download/80s-019/80s_019.mp4",
    "https://archive.org/download/80s-020/80s_020.mp4",
    "https://archive.org/download/80s-021/80s_021.mp4",
    "https://archive.org/download/80s-022/80s_022.mp4",
    "https://archive.org/download/80s-023/80s_023.mp4"
    
];

const diccionarioCreditos = {
    
    "https://archive.org/download/vid-20260826-124651/VID_20260826_124651.mp4": { a: "QS1oYQ==", c: "IlRha2UgT24gTWUi", b: "SHVudGluZyBIaWdoIGFuZCBMb3c=", y: "MTk4NQ==" },
    "https://archive.org/download/80s-002/80s_002.mp4": { a: "TWljaGFlbCBKYWNrc29u", c: "IkJpbGxpZSBKZWFuIg==", b: "VGhyaWxsZXI=", y: "MTk4Mw==" },
    "https://archive.org/download/80s-003/80s_003.mp4": { a: "R3VucyBOJyBSb3Nlcw==", c: "IlN3ZWV0IENoaWxkIE8nIE1pbmUi", b: "QXBwZXRpdGUgZm9yIERlc3RydWN0aW9u", y: "MTk4Nw==" },
    "https://archive.org/download/80s-004/80s_004.mp4": { a: "UXVlZW4=", c: "IkFub3RoZXIgT25lIEJpdGVzIHRoZS1EdXN0Ig==", b: "VGhlIEdhbWU=", y: "MTk4MA==" },
    "https://archive.org/download/80s-005/80s_005.mp4": { a: "TWljaGFlbCBKYWNrc29u", c: "IkJhZCI=", b: "QmFk", y: "MTk4Nw==" },
    "https://archive.org/download/80s-006/80s_006.mp4": { a: "R3VucyBOJyBSb3Nlcw==", c: "IldlbGNvbWUgdG8gdGhlIEp1bmdsZSI=", b: "QXBwZXRpdGUgZm9yIERlc3RydWN0aW9u", y: "MTk4Nw==" },
    "https://archive.org/download/80s-007/80s_007.mp4": { a: "UXVlZW4=", c: "IkkgV2FudCB0byBCcmVhayBGcmVlIg==", b: "VGhlIFdvcmtz", y: "MTk4NA==" },
    "https://archive.org/download/80s-008/80s_008.mp4": { a: "VTI=", c: "IlByaWRlIChJbiBUaGUgTmFtZSBPZiBMb3ZlKSI=", b: "VGhlIFVubm90aWNlYWJsZSBGaXJl", y: "MTk4NA==" },
    "https://archive.org/download/80s-009/80s_009.mp4": { a: "VTI=", c: "IldpdGggT3IgV2l0aG91dCBZb3Ui", b: "VGhlIEpvc2h1YSBUcmVl", y: "MTk4Nw==" },
    "https://archive.org/download/80s-010/80s_010.mp4": { a: "UHJpbmNlIGFuZCB0aGUgUmV2b2x1dGlvbg==", c: "IlB1cnBsZSBSYWluIg==", b: "UHVycGxlIFJhaW4=", y: "MTk4NA==" },
    "https://archive.org/download/80s-011/80s_011.mp4": { a: "UHJpbmNlIGFuZCB0aGUgUmV2b2x1dGlvbg==", c: "IlJhc3BiZXJyeSBCZXJldCI=", b: "QXJvdW5kIHRoZSBXb3JsZCBpbiBhIERheQ==", y: "MTk4NQ==" },
    "https://archive.org/download/80s-012/80s_012.mp4": { a: "Q3VsdHVyZSBDbHVi", c: "Ikthcm1hIENoYW1lbGVvbiI=", b: "Q29sb3VyIGJ5IE51bWJlcnM=", y: "MTk4Mw==" },
    "https://archive.org/download/80s-013/80s_013.mp4": { a: "Q3VsdHVyZSBDbHVi", c: "IkRvIFlvdSBSZWFsbHkgV2FudCBUbyIdcnQgTWUi", b: "S2lzc2luZyB0byBCZSBDbGV2ZXI=", y: "MTk4Mg==" },
    "https://archive.org/download/80s-014/80s_014.mp4": { a: "Qm9uIEpvdmk=", c: "IkxpdmluJyBPbiBBIFByYXllciI=", b: "U2xpcHBlcnkgV2hlbiBXZXQ=", y: "MTk4Ng==" },
    "https://archive.org/download/80s-015/80s_015.mp4": { a: "Qm9uIEpvdmk=", c: "IldhbnRlZCBEZWFkIE9yIEFsaXZlIg==", b: "U2xpcHBlcnkgV2hlbiBXZXQ=", y: "MTk4Ng==" },
    "https://archive.org/download/80s-016/80s_016.mp4": { a: "TWFkb25uYQ==", c: "IkludG8gdGhlIEdyb292ZSI=", b: "TGlrZSBhIFZpcmdpbg==", y: "MTk4NQ==" },
    "https://archive.org/download/80s-017/80s_017.mp4": { a: "TWFkb25uYQ==", c: "IkxhIElzbGEgQm9uaXRhIg==", b: "VHJ1ZSBCbHVl", y: "MTk4Ng==" },
    "https://archive.org/download/80s-018/80s_018.mp4": { a: "Q3luZGkgTGF1cGVy", c: "IlRpbWUgQWZ0ZXIgVGltZSI=", b: "U2hlJ3MgU28gVW51c3VhbA==", y: "MTk4Mw==" },
    "https://archive.org/download/80s-019/80s_019.mp4": { a: "Q3luZGkgTGF1cGVy", c: "IkdpcmxzIEp1c3QgV2FudCB0byBIYXZlIEZ1biI=", b: "U2hlJ3MgU28gVW51c3VhbA==", y: "MTk4Mw==" },
    "https://archive.org/download/80s-020/80s_020.mp4": { a: "VGhlIFBvbGljZQ==", c: "IkV2ZXJ5IEJyZWF0aCBZb3UgVGFrZSI=", b: "U3luY2hyb25pY2l0eQ==", y: "MTk4Mw==" },
    "https://archive.org/download/80s-021/80s_021.mp4": { a: "VGhlIFBvbGljZQ==", c: "IkRvbid0IFN0YW5kIFNvIENsb3NlIFRvIE1lIg==", b: "WmVueWF0dGEgTW9uZGF0dGE=", y: "MTk4MA==" },
    "https://archive.org/download/80s-022/80s_022.mp4": { a: "RGF2aWQgQm93aWU=", c: "IkxldCdzIERhbmNlIg==", b: "TGV0J3MgRGFuY2U=", y: "MTk4Mw==" },
    "https://archive.org/download/80s-023/80s_023.mp4": { a: "QUMvREM=", c: "IkJhY2sgaW4gQmxhY2si", b: "QmFjayBpbiBCbGFjaw==", y: "MTk4MA==" }
    
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
    // Elige el siguiente video al azar de forma directa e inteligente
    currentVideo = Math.floor(Math.random() * playlist.length);
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
