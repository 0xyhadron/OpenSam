// List of all images to preload
const imageAssets = [
    "cassetteinsertt.gif",
    "cassetteplay.gif",
    "cassetteeject.gif",
    "cassetteopen.png",
    "buttons/cassettebuttonpressing.gif",
    "buttons/cassettebuttonpressed.png",
    "buttons/cassettebuttonstoppressing.gif",
    "buttons/cassettebuttonstoppressed.png",
    "buttons/cassettebuttonrelease.gif",
    "buttons/cassettebuttonunpressed.png"
];

// Function to preload images
function preloadImages() {
    imageAssets.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preloadImages() when the page finishes loading
window.onload = function () {
    preloadImages();
};
