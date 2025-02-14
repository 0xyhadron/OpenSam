
let gifPlayed = false;
let secondGifPlayed = false;
let currentAudio = null;
let currentTrack = "";
let isFastForwarding = false;
let isPressed = false;
let isStopPressed = false;

let stopSoundEffect = new Audio('cassettefx.mp3');  // Stop sound
let playSoundEffect = new Audio('cassette2.mp3');   // Play sound


function toggleButtons() {
    const playButton = document.getElementById("playButton");
    const stopButton = document.getElementById("stopButton");
    const fastForwardButton = document.getElementById("fastForwardButton");

    if (currentAudio && !currentAudio.paused) {
        playButton.disabled = true;
        stopButton.disabled = false;
        fastForwardButton.disabled = false;
    } else {
        playButton.disabled = false;
        stopButton.disabled = true;
        fastForwardButton.disabled = true;
    }
}

function changeImageOnPlay(gifType, trackName) {
    const img = document.getElementById("gif");

    // Play the play button sound effect
    playSoundEffect.play();

    // Update marquee text
    currentTrack = trackName;
    updateMarquee();

    if (gifType === 1 && !gifPlayed) {
        img.src = "cassetteinsertt.gif";
        gifPlayed = true;

        setTimeout(() => {
            img.src = "cassetteplay.gif";
            playSelectedTrack()
        }, 2450);
    } else if (gifType === 2 && !secondGifPlayed) {
        img.src = "secondgif.gif";
        secondGifPlayed = true;

        setTimeout(() => {
            img.src = "secondgifstatic.png";
            playAudio('clown.mp3');
        }, 2450);
    }
}

function playAudio(audioSrc) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(audioSrc);
    currentAudio.playbackRate = 1; // Normal speed
    currentAudio.play();
    isFastForwarding = false;
    toggleButtons();

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

    img.src = "cassetteeject.gif";

    setTimeout(() => {
        img.src = "cassetteopen.png";
        toggleButtons();
        gifPlayed = false;
        secondGifPlayed = false;
        isFastForwarding = false; // Reset fast forward
    }, 2450);
}

function startFastForward() {
    if (currentAudio) {
        currentAudio.playbackRate = 6.0; // Speed up audio
        isFastForwarding = true;
    }
}

function stopFastForward() {
    if (currentAudio) {
        currentAudio.playbackRate = 1.0; // Reset to normal speed
        isFastForwarding = false;
    }
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
        button.src = `buttons/cassettebuttonpressing.gif`;

        setTimeout(() => {
            button.src = `buttons/cassettebuttonpressed.png`;
            isPressed = true; // Mark as playing
        }, 500);
    } else if (action === "stop" && !isStopPressed) {
        // Stop button pressing animation
        button.src = `buttons/cassettebuttonpressing.gif`;

        setTimeout(() => {
            button.src = `buttons/cassettebuttonpressed.png`;
            isStopPressed = true; // Mark stop as pressed
        }, 500);

        // Release the Play button when Stop is pressed
        releasePlayButton();
    }
}

function releaseButton(buttonId, action) {
    let button = document.getElementById(buttonId);

    if (action === "stop" && isStopPressed) {
        // Release the Stop button
        button.src = `buttons/cassettebuttonrelease.gif`;

        setTimeout(() => {
            button.src = `buttons/cassettebuttonunpressed.png`;
            isStopPressed = false; // Reset stop state
        }, 500);
    }
}

// Function to release the Play button when Stop is pressed
function releasePlayButton() {
    let playButton = document.getElementById("playButton");

    // Play the release animation for Play button
    playButton.src = `buttons/cassettebuttonrelease.gif`;

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

    // Play the selected track with the existing cassette animation
    changeImageOnPlay(1, track.name);

    // Update playAudio function to use selected track

    playAudio(track.mp3);

}