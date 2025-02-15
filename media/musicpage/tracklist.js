// Album Data
const albums = [
    {
        title: "Woman",
        description: "This is the first album.",
        image: "scrap.gif",
        tracks: {
            aSide: [
                { name: "unmaiden", mp3: "music/unmaiden.mp3" },
                { name: "stroke2", mp3: "music/stroke2.wav" },


            ],
            bSide: [

            ]
        }
    },
    {
        title: "Album 2",
        description: "This is the second album.",
        image: "cover imaget-export.png",
        tracks: {
            aSide: [
                { name: "Song A4", mp3: "clown.mp3" },
                { name: "Song A5", mp3: "audio/songA5.mp3" },
                { name: "Song A6", mp3: "audio/songA6.mp3" }
            ],
            bSide: [
                { name: "Song B4", mp3: "audio/songB4.mp3" },
                { name: "Song B5", mp3: "audio/songB5.mp3" },
                { name: "Song B6", mp3: "audio/songB6.mp3" }
            ]
        }
    }
];

let currentAlbumIndex = 0;
let currentTrackIndex = 0;
let currentSide = "aSide";
const audioPlayer = new Audio();

function loadAlbum() {
    const album = albums[currentAlbumIndex];

    document.getElementById("albumTitle").textContent = album.title;
    document.getElementById("albumDescription").textContent = album.description;
    document.getElementById("albumImage").src = album.image;

    loadTracklist();
}

function loadTracklist() {
    const aSideElement = document.getElementById("aSideTracklist");
    const bSideElement = document.getElementById("bSideTracklist");
    aSideElement.innerHTML = "";
    bSideElement.innerHTML = "";

    albums[currentAlbumIndex].tracks.aSide.forEach((track, index) => {
        const li = document.createElement("li");
        li.textContent = track.name;
        li.onclick = () => selectTrack(index, "aSide");
        aSideElement.appendChild(li);
    });

    albums[currentAlbumIndex].tracks.bSide.forEach((track, index) => {
        const li = document.createElement("li");
        li.textContent = track.name;
        li.onclick = () => selectTrack(index, "bSide");
        bSideElement.appendChild(li);
    });

    updateSelectedTrack();
}

function selectTrack(index, side) {
    currentTrackIndex = index;
    currentSide = side;
    updateSelectedTrack();
}

function updateSelectedTrack() {
    const tracklistItems = document.querySelectorAll(".tracklist li");
    tracklistItems.forEach(item => item.classList.remove("selected"));

    const trackElements = document.querySelectorAll(
        currentSide === "aSide" ? "#aSideTracklist li" : "#bSideTracklist li"
    );

    if (trackElements[currentTrackIndex]) {
        trackElements[currentTrackIndex].classList.add("selected");
    }


    const track = albums[currentAlbumIndex].tracks[currentSide][currentTrackIndex];
    document.getElementById("currentTrack").textContent = `Now Playing: ${track.name}`;
    audioPlayer.src = track.mp3;

}

function previousTrack() {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        if (currentSide === "aSide") {
            currentSide = "bSide";
            currentTrackIndex = albums[currentAlbumIndex].tracks.bSide.length - 1;
        } else {
            currentSide = "aSide";
            currentTrackIndex = albums[currentAlbumIndex].tracks.aSide.length - 1;
        }
    }
    updateSelectedTrack();
}

function nextTrack() {
    if (currentTrackIndex < albums[currentAlbumIndex].tracks[currentSide].length - 1) {
        currentTrackIndex++;
    } else {
        if (currentSide === "aSide") {
            currentSide = "bSide";
            currentTrackIndex = 0;
        } else {
            currentSide = "aSide";
            currentTrackIndex = 0;
        }
    }
    updateSelectedTrack();
}

function previousAlbum() {
    if (currentAlbumIndex > 0) {
        currentAlbumIndex--;
    } else {
        currentAlbumIndex = albums.length - 1;
    }
    currentTrackIndex = 0;
    currentSide = "aSide";
    loadAlbum();
}

function nextAlbum() {
    if (currentAlbumIndex < albums.length - 1) {
        currentAlbumIndex++;
    } else {
        currentAlbumIndex = 0;
    }
    currentTrackIndex = 0;
    currentSide = "aSide";
    loadAlbum();
}


loadAlbum();
