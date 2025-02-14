
let currentAudio = null;
let currentTrack = "";
let isPressed = false;
let isStopPressed = false;
let animationPlaying = false;
let stopSoundEffect = new Audio('cassettefx.mp3');
let playSoundEffect = new Audio('cassette2.mp3');

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
        currentAudio.playbackRate = 6.0;

        pressButton('fastForwardButton', 'fast');

    }
}

function stopFastForward() {
    if (!animationPlaying) {
        currentAudio.playbackRate = 1.0;

        releaseButton('fastForwardButton', 'slow');
    }
}

function changeImageOnPlay(gifType, trackName) {
    const img = document.getElementById("gif");


    playSoundEffect.play();


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
    currentAudio.playbackRate = 1;
    currentAudio.play();



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

    stopSoundEffect.play();
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

    stopSoundEffect.play();

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

        if (isStopPressed) {
            releaseButton("stopButton", "stop");
        }


        button.src = `buttons/cassettebuttonpressing.gif` + "?t=" + new Date().getTime();

        setTimeout(() => {
            button.src = `buttons/cassettebuttonpressed.png`;
            isPressed = true;
        }, 500);

    } else if (action === "stop" && !isStopPressed) {

        button.src = `buttons/cassettebuttonstoppressing.gif` + "?t=" + new Date().getTime();

        setTimeout(() => {
            button.src = `buttons/cassettebuttonstoppressed.png`;
            isStopPressed = true;
        }, 500);

        releasePlayButton();
    } else if (action === "fast") {

        button.src = `buttons/cassettebuttonpressing.gif` + "?t=" + new Date().getTime();

        setTimeout(() => {
            button.src = `buttons/cassettebuttonpressed.png`;

        }, 500);


    }

}

function releaseButton(buttonId, action) {
    let button = document.getElementById(buttonId);

    if (action === "stop" && isStopPressed) {

        button.src = `buttons/cassettebuttonrelease.gif` + "?t=" + new Date().getTime();

        setTimeout(() => {
            button.src = `buttons/cassettebuttonunpressed.png`;
            isStopPressed = false;
        }, 500);
    }

    else if (action === "slow") {

        button.src = `buttons/cassettebuttonunpressed.png`;

        setTimeout(() => {
            button.src = `buttons/cassettebuttonunpressed.png`;

        }, 500);


    }
}


function releasePlayButton() {
    let playButton = document.getElementById("playButton");


    playButton.src = `buttons/cassettebuttonrelease.gif` + "?t=" + new Date().getTime();

    setTimeout(() => {
        playButton.src = `buttons/cassettebuttonunpressed.png`;
        isPressed = false;
    }, 500);
}
function playSelectedTrack() {

    const album = albums[currentAlbumIndex];
    const track = album.tracks[currentSide][currentTrackIndex];

    if (!track || !track.mp3) {
        console.error("No track selected or missing MP3 file.");
        return;
    }



    playAudio(track.mp3);



}