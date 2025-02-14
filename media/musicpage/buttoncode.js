
let currentAudio = null;
let currentTrack = "";

let isPressed = false;
let isStopPressed = false;
let animationPlaying = false;
let stopSoundEffect = new Audio('cassettefx.mp3');  // Stop sound
let playSoundEffect = new Audio('cassette2.mp3');   // Play sound

function playhandling() {
    if (!isPressed & !animationPlaying) {
        pressButton('playButton', 'play');

        isPressed = true;
        animationPlaying = true;
        changeImageOnPlay();

    }

}

function stophandling() {
    if (isPressed & !animationPlaying) {
        pressButton('stopButton', 'stop');
        stopAudio();
        animationPlaying = true;
        isPressed = false;
    }

}

function switchAlbum() {
    if (!animationPlaying) {
        stopThenPlayAudio();
        if (isPressed) {
            pressButton('stopButton', 'stop');
        }
    }
}
function startFastForward() {
    if (!animationPlaying & isPressed) {
        currentAudio.playbackRate = 6.0; // Speed up audio

        pressButton('fastForwardButton', 'fast');

    }
}

function stopFastForward() {
    if (!animationPlaying) {
        currentAudio.playbackRate = 1.0; // Reset to normal speed

        releaseButton('fastForwardButton', 'slow');
    }
}

function changeImageOnPlay(gifType, trackName) {
    const img = document.getElementById("gif");

    // Play the play button sound effect
    playSoundEffect.play();

    // Force the GIF to reload in Firefox
    img.src = "cassetteinsertt.gif" + "?t=" + new Date().getTime();
    gifPlayed = true;

    setTimeout(() => {
        img.src = "cassetteplay.gif" + "?t=" + new Date().getTime();
        animationPlaying = false;
        playSelectedTrack();
    }, 2450);
}


function playAudio(audioSrc) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(audioSrc);
    currentAudio.playbackRate = 1; // Normal speed
    currentAudio.play();


    // 🔹 When the song ends, move to the next track automatically
    currentAudio.onended = () => {
        nextTrack();
        playSelectedTrack();
    };
}



function stopAudio() {
    const img = document.getElementById("gif");

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    stopSoundEffect.play(); // Play stop/eject sound

    img.src = "cassetteeject.gif" + "?t=" + new Date().getTime();

    setTimeout(() => {
        img.src = "cassetteopen.png";

        gifPlayed = false;
        secondGifPlayed = false;
        animationPlaying = false;

    }, 2450);
}

function stopThenPlayAudio() {
    const img = document.getElementById("gif");

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    stopSoundEffect.play(); // Play stop/eject sound

    img.src = "cassetteeject.gif" + "?t=" + new Date().getTime();

    setTimeout(() => {
        img.src = "cassetteopen.png";

        isPressed = false;
        playhandling();
    }, 2450);
}



function updateMarquee() {
    document.getElementById("currentTrack").textContent = `Now: ${currentTrack}`;
}

function pressButton(buttonId, action) {
    let button = document.getElementById(buttonId);

    if (action === "play" && !isPressed) {
        // If the Stop button is pressed, release it when Play is pressed
        if (isStopPressed) {
            releaseButton("stopButton", "stop");
        }

        // Play pressing animation
        button.src = `buttons/cassettebuttonpressing.gif` + "?t=" + new Date().getTime();

        setTimeout(() => {
            button.src = `buttons/cassettebuttonpressed.png`;
            isPressed = true; // Mark as playing
        }, 500);

    } else if (action === "stop" && !isStopPressed) {
        // Stop button pressing animation
        button.src = `buttons/cassettebuttonstoppressing.gif` + "?t=" + new Date().getTime();

        setTimeout(() => {
            button.src = `buttons/cassettebuttonstoppressed.png`;
            isStopPressed = true; // Mark stop as pressed
        }, 500);

        // Release the Play button when Stop is pressed
        releasePlayButton();
    } else if (action === "fast") {
        // Stop button pressing animation
        button.src = `buttons/cassettebuttonpressing.gif` + "?t=" + new Date().getTime();

        setTimeout(() => {
            button.src = `buttons/cassettebuttonpressed.png`;

        }, 500);


    }

}

function releaseButton(buttonId, action) {
    let button = document.getElementById(buttonId);

    if (action === "stop" && isStopPressed) {
        // Release the Stop button
        button.src = `buttons/cassettebuttonrelease.gif` + "?t=" + new Date().getTime();

        setTimeout(() => {
            button.src = `buttons/cassettebuttonunpressed.png`;
            isStopPressed = false; // Reset stop state
        }, 500);
    }

    else if (action === "slow") {
        // Stop button pressing animation
        button.src = `buttons/cassettebuttonunpressed.png`;

        setTimeout(() => {
            button.src = `buttons/cassettebuttonunpressed.png`;

        }, 500);


    }
}

// Function to release the Play button when Stop is pressed
function releasePlayButton() {
    let playButton = document.getElementById("playButton");

    // Play the release animation for Play button
    playButton.src = `buttons/cassettebuttonrelease.gif` + "?t=" + new Date().getTime();

    setTimeout(() => {
        playButton.src = `buttons/cassettebuttonunpressed.png`;
        isPressed = false; // Reset play state
    }, 500);
}
function playSelectedTrack() {
    // Get the selected track details
    const album = albums[currentAlbumIndex];
    const track = album.tracks[currentSide][currentTrackIndex];

    if (!track || !track.mp3) {
        console.error("No track selected or missing MP3 file.");
        return;
    }


    // Update playAudio function to use selected track

    playAudio(track.mp3);



}