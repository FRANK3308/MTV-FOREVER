let player;

const playlist80s = [
    { id: "djV11Xbc914", duration: 245 },
    { id: "dQw4w9WgXcQ", duration: 213 },
    { id: "9bZkp7q19f0", duration: 235 }
];

const tag = document.createElement('script');
tag.src = "https://youtube.com";
const firstScriptTag = document.getElementsByTagName('script');
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    const currentTransmission = getLiveVideo(playlist80s);

    player = new YT.Player("player", {
        videoId: currentTransmission.videoId,
        playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            fs: 0,
            disablekb: 1,
            iv_load_policy: 3,
            start: currentTransmission.startSeconds
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function getLiveVideo(videos) {
    const totalDuration = videos.reduce((acc, video) => acc + video.duration, 0);
    const currentTimeSec = Math.floor(Date.now() / 1000);
    const currentPlaylistTime = currentTimeSec % totalDuration;

    let elapsedTime = 0;
    for (let i = 0; i < videos.length; i++) {
        if (currentPlaylistTime >= elapsedTime && currentPlaylistTime < (elapsedTime + videos[i].duration)) {
            return {
                videoId: videos[i].id,
                startSeconds: currentPlaylistTime - elapsedTime
            };
        }
        elapsedTime += videos[i].duration;
    }
    return { videoId: videos.id, startSeconds: 0 };
}

const container = document.querySelector(".player80s");

if (container) {
    container.addEventListener("click", async () => {
        if (!document.fullscreenElement) {
            try {
                await container.requestFullscreen();
            } catch (err) {
                console.log(err);
            }
        }

        if (player) {
            player.unMute();
            player.playVideo();
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        const nextTransmission = getLiveVideo(playlist80s);
        player.loadVideoById({
            videoId: nextTransmission.videoId,
            startSeconds: nextTransmission.startSeconds
        });
    }
}

