const button = document.getElementById("startChannel");

button.addEventListener("click", async () => {

    if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
    }

});
