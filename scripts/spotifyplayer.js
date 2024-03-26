var serviceHost = "https://spotifywidgetthing.onekickrick.workers.dev";
var spotifyUser = "Rick";

var songData, progressSeconds, totalSeconds, progressInterval;

function updatePlayer() {
    fetch(`${serviceHost}/get-now-playing`)
        .then((response) => response.json())
        .then((data) => {
            if (data.hasOwnProperty("ERROR")) {
                document.getElementById(
                    "player-song"
                ).innerHTML = `${spotifyUser} isn't playing anything.`;
                document.getElementById("player-artist").innerHTML = "  ";
                return;
            }
            songData = data;
            // Extract track ID and store it
            var trackId = data.item.id;
            document.getElementById("player-ID").innerHTML = trackId;
            document.getElementById("player-song").innerHTML = data.item.name + "  -  " + data.item.artists[0].name;

            document.getElementById("player-artist").innerHTML =
                data.item.artists[0].name;
            document.getElementById("player-status").innerHTML = data.is_playing
                ? `${spotifyUser} is now playing...`
                : `${spotifyUser} has paused.`;
            document
                .getElementById("player-album-art")
                .setAttribute("src", data.item.album.images[1].url);
            document
                .getElementById("player-progress")
                .setAttribute(
                    "style",
                    document.getElementById("player-progress").getAttribute("style") +
                    `width: ${(data.progress_ms * 100) / data.item.duration_ms}%`
                );
            function createSpotifyEmbedPlayer(trackId) {
                // Replace the existing iframe with the new Spotify Embed Player
                var iframe = document.createElement("iframe");
                iframe.src = `https://open.spotify.com/embed/track/${trackId}`;
                iframe.width = "300";
                iframe.height = "380";
                iframe.frameBorder = "0";
                iframe.allowtransparency = "true";
                iframe.allow = "encrypted-media";

                // Replace the existing player container with the new iframe
                var playerContainer = document.getElementById("player");
                playerContainer.innerHTML = ""; // Clear existing content
                playerContainer.appendChild(iframe);
            }

            document.getElementById(
                "player-background"
            ).style.backgroundImage = `url(${data.item.album.images[1].url})`;

            // Set the links to spotify stuff
            document
                .getElementById("player-song-link")
                .setAttribute("href", data.item.external_urls.spotify);
            document
                .getElementById("player-artist-link")
                .setAttribute("href", data.item.artists[0].external_urls.spotify);
            document
                .getElementById("player-album-link")
                .setAttribute("href", data.item.album.external_urls.spotify);
            document
                .getElementById("player-mp3-link")
                .setAttribute("href", data.item.preview_url);

            // Hide mp3 link if the song does not provide that
            if (data.item.preview_url == null) {
                document
                    .getElementById("player-mp3-link")
                    .setAttribute("style", "display: none;");
            }

            // Timer to show updates on progress bar and time
            // https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
            progressSeconds = Math.ceil(songData.progress_ms / 1000);
            totalSeconds = Math.ceil(songData.item.duration_ms / 1000);
            // Process progress only if a song is in 'playing' state
            if (songData.is_playing) {
                progressInterval = setInterval(setProgress, 1000);
            } else {
                setProgress();
            }

            // Hide all the extra things in mobile (<410px)
            if (document.getElementById("player").clientWidth < 410) {
                // Hide links
                document.getElementById("player-song-link").style.display = "none";
                document.getElementById("player-artist-link").style.display = "none";
                document.getElementById("player-album-link").style.display = "none";
                document.getElementById("player-mp3-link").style.display = "none";

                // Hide duration
                document.getElementById("player-time").style.display = "none";
            }
        });
}

function setProgress() {
    if (progressSeconds > totalSeconds) {
        clearInterval(progressInterval);
        updatePlayer();
        return;
    }
    ++progressSeconds;
    var totalLabel =
        pad(parseInt(totalSeconds / 60)) + ":" + pad(totalSeconds % 60);
    var progressLabel =
        pad(parseInt(progressSeconds / 60)) + ":" + pad(progressSeconds % 60);
    document.getElementById("player-time").innerHTML =
        progressLabel + " / " + totalLabel;
    document.getElementById("player-progress").style.width = `${(progressSeconds * 100) / totalSeconds
        }%`;
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

// Load player for the first time
updatePlayer();