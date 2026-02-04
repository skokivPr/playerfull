// Dynamic App Loader
const createMainContainer = () => {
    return `
    <div class="main-grid-container">
        <div id="visual-feed" class="panel">
            <div class="input-panel">
                <div class="panel-header">INPUT :: MEDIA LOADER</div>
                <div class="input-group">
                    <label for="urlInput">// LOAD FROM URL (MP4, HLS)</label>
                    <div class="input-row">
                        <input id="urlInput" type="text" placeholder="PASTE URL..." onfocus="this.select()">
                        <button id="loadBtn"><i class="fas fa-play"></i></button>
                        <label for="fileInput" class="file-input-label"> </label>
                        <label class="file-input-btn">
                            <i class="fas fa-file-video "></i> OR FILE
                            <input id="fileInput" type="file" accept="video/*,.m3u8">
                        </label>
                    </div>
                </div>
            </div>
            ${createPlayerSection()}
        </div>
        ${createSidePanels()}
    </div>
    ${createNotificationContainer()}
    ${createModals()}`;
};

const createPlayerSection = () => {
    return `
    <div class="player-wrapper">
        <div class="player" id="playerContainer">
            <div class="stage" id="dropZone">
                <video id="video" playsinline crossorigin="anonymous"></video>
                <div class="spinner" id="spinner" style="display: none;"></div>
            </div>
            ${createControls()}
        </div>
    </div>`;
};

const createControls = () => {
    return `
    <div class="ctrls" id="ctrls">
        <div class="progress">
            <input id="seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Pasek postępu" />
            <div class="time">
                <span id="cur">00:00</span>
                <span id="buffer-info">BUFFER: 0%</span>
                <span id="dur">00:00</span>
            </div>
        </div>
        <div class="grid">
            <div class="left">
                <button id="play" aria-label="Odtwarzaj/Pauza"><i class="fas fa-play"></i></button>
                <button id="stop" aria-label="Stop"><i class="fas fa-stop"></i></button>
                <button id="mute" aria-label="Wycisz/Odzyskaj dźwięk"><i class="fas fa-volume-up"></i></button>
                <div class="vol">
                    <input id="vol" type="range" min="0" max="1" step="0.01" value="0.5" aria-label="Regulacja głośności" />
                    <span id="vol-percent">50%</span>
                </div>
            </div>
            <div class="right">
                <div class="ja-select" id="rate-select">
                    <button type="button" class="ja-select-btn" id="rate" aria-label="Prędkość odtwarzania" aria-haspopup="listbox" aria-expanded="false" data-value="1">
                        <span class="ja-select-label">1×</span>
                        <span class="ja-select-arrow"><i class="fas fa-chevron-down"></i></span>
                    </button>
                    <div class="ja-select-list" id="rate-list" role="listbox">
                        <div class="ja-select-item" data-value="0.5" role="option">0.5×</div>
                        <div class="ja-select-item" data-value="0.75" role="option">0.75×</div>
                        <div class="ja-select-item ja-selected" data-value="1" role="option">1×</div>
                        <div class="ja-select-item" data-value="1.25" role="option">1.25×</div>
                        <div class="ja-select-item" data-value="1.5" role="option">1.5×</div>
                        <div class="ja-select-item" data-value="1.75" role="option">1.75×</div>
                        <div class="ja-select-item" data-value="2" role="option">2×</div>
                    </div>
                </div>
                <button id="pip" aria-label="Obraz w obrazie"><i class="fas fa-clone"></i></button>
                <button id="fs" aria-label="Pełny ekran"><i class="fas fa-expand"></i></button>
            </div>
        </div>
    </div>`;
};

const createSidePanels = () => {
    return `
    <div id="playlist-panel" class="panel">
        <div class="panel-header">PLAYLIST</div>
        <div class="panel-content">
            <div class="playlist-controls">
                <button id="add-to-playlist" class="playlist-btn" title="Add current URL to playlist">
                    <i class="fas fa-plus"></i> ADD TO PLAYLIST
                </button>
                <button id="clear-playlist" class="playlist-btn" title="Clear entire playlist">
                    <i class="fas fa-trash"></i> CLEAR ALL
                </button>
                <button id="convert-playlist" class="playlist-btn" title="Convert all YouTube URLs to privacy-enhanced version">
                    <i class="fas fa-shield-alt"></i> PRIVACY MODE
                </button>
            </div>
            <div class="playlist-items" id="playlist-items">
                <p class="playlist-empty">No items in playlist</p>
            </div>
            <div class="playlist-navigation">
                <button id="prev-track" class="nav-btn" title="Previous track">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button id="next-track" class="nav-btn" title="Next track">
                    <i class="fas fa-step-forward"></i>
                </button>
                <div class="switch">
                    <input id="autoplay-next" type="checkbox" />
                    <label class="toggle" for="autoplay-next">
                        <i></i>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div id="bottom-panels-container">
        <div id="system-log" class="panel">
            <div class="panel-header panel-header-secondary">
                SYSTEM LOG
                <button id="clear-log-btn" class="clear-log-button" title="Clear system log">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="panel-content" id="system-log-content">
                <p class="log-entry startup">> STATUS: ONLINE. Awaiting input.</p>
                <p class="log-entry info">> HLS streams require hls.js (loaded). Native support in Safari.</p>
                <p class="log-entry info">> Cross-Origin (CORS) policy may affect some remote streams.</p>
            </div>
        </div>
        <div id="aux-panel" class="panel">
            <div class="panel-header panel-header-secondary">HELP & INFO</div>
            <div class="panel-content">
                <div class="help-buttons-grid">
                    <button id="shortcuts-btn" class="help-button" title="Keyboard Shortcuts">
                        <span class="help-button-top">KEY</span>
                        <i class="fas fa-keyboard">
                            <span class="help-button-label">KEYBOARD</span>
                        </i>
                        <span class="help-button-bottom">HELP</span>
                    </button>
                    <button id="info-btn" class="help-button" title="Player Info">
                        <span class="help-button-top">APP</span>
                        <i class="fas fa-info-circle">
                            <span class="help-button-label">INFO</span>
                        </i>
                        <span class="help-button-bottom">INFO</span>
                    </button>
                    <button id="theme-toggle" class="help-button" title="Toggle Theme">
                        <span class="help-button-top">LIGHT</span>
                        <i class="fas fa-sun">
                            <span class="help-button-label">THEME</span>
                        </i>
                        <span class="help-button-bottom">THEME</span>
                    </button>
                    <button id="youtube-btn" class="help-button" title="Open YouTube">
                        <span class="help-button-top">OPEN</span>
                        <i class="fab fa-youtube">
                            <span class="help-button-label">YOUTUBE</span>
                        </i>
                        <span class="help-button-bottom">TUBE</span>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
};

const createNotificationContainer = () => {
    return `<div id="notification-container"></div>`;
};

const createModals = () => {
    return `
    <!-- Shortcuts Modal -->
    <div id="shortcuts-modal" class="modal-overlay">
        <div class="modal">
            <div class="modal-header">
                <span>KEYBOARD SHORTCUTS</span>
                <button class="modal-close" onclick="closeModal('shortcuts-modal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="shortcuts-grid">
                    <div class="shortcut-item">
                        <span class="shortcut-key">SPACE</span>
                        <span class="shortcut-desc">Play/Pause video</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">S</span>
                        <span class="shortcut-desc">Stop video</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">M</span>
                        <span class="shortcut-desc">Mute/Unmute audio</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">F</span>
                        <span class="shortcut-desc">Toggle fullscreen</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">T</span>
                        <span class="shortcut-desc">Toggle theme</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">Y</span>
                        <span class="shortcut-desc">Open YouTube</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">P</span>
                        <span class="shortcut-desc">Add to playlist</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">N</span>
                        <span class="shortcut-desc">Next track</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">B</span>
                        <span class="shortcut-desc">Previous track</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">→</span>
                        <span class="shortcut-desc">Skip forward 5 seconds</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">←</span>
                        <span class="shortcut-desc">Skip backward 5 seconds</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">CTRL+→</span>
                        <span class="shortcut-desc">Next track in playlist</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">CTRL+←</span>
                        <span class="shortcut-desc">Previous track in playlist</span>
                    </div>
                    <div class="shortcut-item">
                        <span class="shortcut-key">ENTER</span>
                        <span class="shortcut-desc">Load URL from input</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Info Modal -->
    <div id="info-modal" class="modal-overlay">
        <div class="modal">
            <div class="modal-header">
                <span>PLAYER INFORMATION</span>
                <button class="modal-close" onclick="closeModal('info-modal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="info-grid">
                    <p><strong>Supported formats:</strong></p>
                    <p>• MP4, WebM, OGV (native HTML5)</p>
                    <p>• HLS streams (.m3u8) via hls.js</p>
                    <p>• YouTube videos and playlists</p>
                    <br>
                    <p><strong>Playlist features:</strong></p>
                    <p>• Add videos/YouTube to playlist (P key)</p>
                    <p>• Auto-play next track</p>
                    <p>• Navigate with N/B keys or Ctrl+arrows</p>
                    <p>• Mix local files with YouTube content</p>
                    <p>• Persistent storage in localStorage</p>
                    <br>
                    <p><strong>YouTube integration:</strong></p>
                    <p>• Privacy-enhanced embedded player (nocookie)</p>
                    <p>• Single videos and full playlists</p>
                    <p>• Auto-detection of YouTube URLs</p>
                    <p>• Open with Y key or YouTube button</p>
                    <p>• Enhanced privacy mode (no tracking)</p>
                    <br>
                    <p><strong>Player features:</strong></p>
                    <p>• Drag & drop file support</p>
                    <p>• Picture-in-Picture mode</p>
                    <p>• Fullscreen with auto-hide controls</p>
                    <p>• Live buffer visualization</p>
                    <p>• Cross-origin stream support</p>
                    <p>• Dark/Light theme toggle (T key)</p>
                    <br>
                    <p><strong>Browser compatibility:</strong></p>
                    <p>• Chrome, Firefox, Edge, Safari</p>
                    <p>• HLS native support in Safari</p>
                    <p>• YouTube iframe support in all browsers</p>
                </div>
            </div>
        </div>
    </div>`;
};

// Player functionality
function initializePlayer() {
    // DOM Elements
    const video = document.getElementById('video');
    const playerContainer = document.getElementById('playerContainer');
    const ctrls = document.getElementById('ctrls');
    const urlInput = document.getElementById('urlInput');
    const loadBtn = document.getElementById('loadBtn');
    const fileInput = document.getElementById('fileInput');
    const playBtn = document.getElementById('play');
    const stopBtn = document.getElementById('stop');
    const muteBtn = document.getElementById('mute');
    const vol = document.getElementById('vol');
    const volPercent = document.getElementById('vol-percent');
    const rate = document.getElementById('rate');
    const pipBtn = document.getElementById('pip');
    const fsBtn = document.getElementById('fs');
    const seek = document.getElementById('seek');
    const cur = document.getElementById('cur');
    const dur = document.getElementById('dur');
    const bufferInfo = document.getElementById('buffer-info');
    const dropZone = document.getElementById('dropZone');
    const spinner = document.getElementById('spinner');
    const notificationContainer = document.getElementById('notification-container');

    let hls = null;
    let controlsTimeout = null;

    // Set default volume to 50%
    video.volume = 0.5;

    const icons = {
        play: '<i class="fas fa-play"></i>',
        pause: '<i class="fas fa-pause"></i>',
        volumeUp: '<i class="fas fa-volume-up"></i>',
        volumeMute: '<i class="fas fa-volume-mute"></i>',
        expand: '<i class="fas fa-expand"></i>',
        compress: '<i class="fas fa-compress"></i>'
    };

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notificationContainer.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    const fmt = (s) => {
        if (!isFinite(s)) return '00:00';
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const ss = Math.floor(s % 60);
        return (h ? String(h).padStart(2, '0') + ':' : '') +
            String(m).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
    };

    function detachHls() {
        if (hls) {
            hls.destroy();
            hls = null;
        }
    }

    function removeAllSubs() {
        const tracks = video.querySelectorAll('track');
        tracks.forEach(track => track.remove());
    }

    function restoreVideoPlayer() {
        const video = document.getElementById('video');
        const dropZone = document.getElementById('dropZone');

        // Usuń iframe YouTube jeśli istnieje
        const existingIframe = dropZone.querySelector('.youtube-iframe');
        if (existingIframe) {
            existingIframe.remove();
        }

        // Przywróć natywny element video
        video.style.display = 'block';
    }

    function loadVideo(source) {
        if (!source) return;

        // Check if it's a YouTube URL
        if (typeof source === 'string' && (extractYouTubeVideoId(source) || isYouTubePlaylist(source))) {
            const isPlaylist = isYouTubePlaylist(source);

            if (isPlaylist) {
                const playlistId = extractYouTubePlaylistId(source);
                const videoId = extractYouTubeVideoId(source);
                loadYouTubePlaylist(playlistId, videoId);
                showNotification('Loading YouTube playlist...', 'success');
                logPlayerEvent('youtube_loaded', `Playlist: ${playlistId}`);
            } else {
                const videoId = extractYouTubeVideoId(source);

                // Sprawdź dostępność wideo przed próbą embed
                checkYouTubeVideoAvailability(videoId).then(availability => {
                    if (availability.available && availability.title) {
                        showNotification(`Loading: ${availability.title}`, 'success');
                    }
                }).catch(() => {
                    // Ignoruj błędy sprawdzania - spróbuj załadować anyway
                });

                loadYouTubeVideo(videoId);
                showNotification('Loading YouTube video...', 'success');
                logPlayerEvent('youtube_loaded', `Video: ${videoId}`);
            }

            spinner.style.display = 'none';

            // Zapisz URL w localStorage
            localStorage.setItem('player_last_url', source);
            return;
        }

        // Przywróć normalny odtwarzacz wideo
        restoreVideoPlayer();

        detachHls();
        removeAllSubs();
        spinner.style.display = 'block';
        const src = (source instanceof File) ? URL.createObjectURL(source) : source;
        const isHls = (source instanceof File) ? /\.m3u8$/i.test(source.name) : /\.m3u8(\?|$)/i.test(src);

        const sourceName = (source instanceof File) ? source.name : source;
        logPlayerEvent('video_loaded', sourceName);

        try {
            if (isHls) {
                logPlayerEvent('hls_loaded', sourceName);
                if (window.Hls && Hls.isSupported()) {
                    hls = new Hls({ enableWorker: true });
                    hls.loadSource(src);
                    hls.attachMedia(video);
                    hls.on(Hls.Events.ERROR, (event, data) => {
                        if (data.fatal) {
                            showNotification(`HLS ERROR: ${data.details}`, 'error');
                            logPlayerEvent('video_error', `HLS: ${data.details}`);
                        }
                    });
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = src;
                } else {
                    throw new Error('HLS playback not supported.');
                }
            } else {
                video.src = src;
            }
            video.play().catch(e => { });
            if (typeof source === 'string') {
                localStorage.setItem('player_last_url', source);
            }
        } catch (error) {
            showNotification(error.message, 'error');
            logPlayerEvent('video_error', error.message);
            spinner.style.display = 'none';
        }
    }

    // Event Listeners
    loadBtn.addEventListener('click', () => loadVideo(urlInput.value.trim()));
    urlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') loadBtn.click(); });

    // Auto-convert YouTube URLs to nocookie version
    urlInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.includes('youtube.com') && !value.includes('youtube-nocookie.com')) {
            const convertedUrl = convertToNoCookieUrl(value);
            if (convertedUrl !== value) {
                e.target.value = convertedUrl;
                logPlayerEvent('url_input', 'Auto-converted to nocookie URL');
                showNotification('URL converted to privacy-enhanced version', 'info');
            }
        }
    });

    // Also handle paste events
    urlInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            const value = e.target.value;
            if (value.includes('youtube.com') && !value.includes('youtube-nocookie.com')) {
                const convertedUrl = convertToNoCookieUrl(value);
                if (convertedUrl !== value) {
                    e.target.value = convertedUrl;
                    logPlayerEvent('url_input', 'Auto-converted pasted nocookie URL');
                    showNotification('Pasted URL converted to privacy-enhanced version', 'info');
                }
            }
        }, 10); // Small delay to allow paste to complete
    });
    fileInput.addEventListener('change', (e) => loadVideo(e.target.files[0]));
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            logPlayerEvent('video_play');
        } else {
            video.pause();
            logPlayerEvent('video_pause');
        }
    });
    stopBtn.addEventListener('click', () => {
        video.pause();
        video.currentTime = 0;
        playBtn.innerHTML = icons.play;
        playerContainer.classList.remove('playing');
        logPlayerEvent('video_stop');
    });
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
    });
    video.addEventListener('volumechange', () => {
        muteBtn.innerHTML = video.muted || video.volume === 0 ? icons.volumeMute : icons.volumeUp;
        vol.value = video.muted ? 0 : video.volume;
        const volumePercent = video.muted ? 0 : Math.round(video.volume * 100);
        vol.style.setProperty('--volume', `${volumePercent}%`);
        volPercent.textContent = `${volumePercent}%`;
    });
    vol.addEventListener('input', () => {
        video.volume = Number(vol.value);
        video.muted = video.volume === 0;
        const volumePercent = Math.round(video.volume * 100);
        vol.style.setProperty('--volume', `${volumePercent}%`);
        volPercent.textContent = `${volumePercent}%`;
    });
    const rateList = document.getElementById('rate-list');
    const rateLabel = rate && rate.querySelector('.ja-select-label');
    const rateItems = rateList && rateList.querySelectorAll('.ja-select-item');

    function getRateValue() {
        return rate && rate.getAttribute('data-value') ? Number(rate.getAttribute('data-value')) : 1;
    }

    function setRateValue(value) {
        if (!rate || !rateLabel || !rateList) return;
        rate.setAttribute('data-value', String(value));
        rateLabel.textContent = value + '×';
        video.playbackRate = value;
        rateList.querySelectorAll('.ja-select-item').forEach(el => {
            el.classList.toggle('ja-selected', el.getAttribute('data-value') === String(value));
        });
    }

    function closeRateSelect() {
        if (rate) rate.classList.remove('ja-open');
        if (rateList) rateList.classList.remove('ja-visible');
        if (rate) rate.setAttribute('aria-expanded', 'false');
    }

    if (rate && rateList) {
        rate.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = rate.classList.toggle('ja-open');
            rateList.classList.toggle('ja-visible', open);
            rate.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        document.addEventListener('click', () => closeRateSelect());
        if (rateItems && rateItems.length) {
            rateItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const val = Number(item.getAttribute('data-value'));
                    setRateValue(val);
                    closeRateSelect();
                });
            });
        }
    }

    pipBtn.addEventListener('click', async () => {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
                logPlayerEvent('pip_exit');
            } else if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
                await video.requestPictureInPicture();
                logPlayerEvent('pip_enter');
            }
        } catch (err) {
            showNotification('PiP mode failed or is not supported.', 'error');
            logPlayerEvent('video_error', 'PiP mode failed');
        }
    });
    fsBtn.addEventListener('click', async () => {
        try {
            if (!document.fullscreenElement) {
                await playerContainer.requestFullscreen();
                logPlayerEvent('fullscreen_enter');
            } else {
                await document.exitFullscreen();
                logPlayerEvent('fullscreen_exit');
            }
        } catch (err) {
            showNotification('Fullscreen mode not supported.', 'error');
            logPlayerEvent('video_error', 'Fullscreen not supported');
        }
    });
    video.addEventListener('play', () => {
        playBtn.innerHTML = icons.pause;
        playerContainer.classList.add('playing');
        if (document.fullscreenElement) {
            controlsTimeout = setTimeout(hideControls, 3000);
        }
    });
    video.addEventListener('pause', () => {
        playBtn.innerHTML = icons.play;
        playerContainer.classList.remove('playing');
        showControls();
        clearTimeout(controlsTimeout);
    });
    video.addEventListener('waiting', () => {
        spinner.style.display = 'block';
    });
    video.addEventListener('playing', () => {
        spinner.style.display = 'none';
    });
    video.addEventListener('error', () => {
        spinner.style.display = 'none';
        const error = video.error;
        let message = `VIDEO ERROR (CODE ${error.code})`;
        if (error.message) message += `: ${error.message}`;
        showNotification(message, 'error');
    });

    video.addEventListener('ended', () => {
        const autoplayNext = document.getElementById('autoplay-next');
        if (autoplayNext && autoplayNext.checked && playlist.length > 0) {
            // Auto-play next track
            setTimeout(() => {
                if (!playNextTrack()) {
                    showNotification('Playlist finished', 'info');
                }
            }, 1000); // Small delay before next track
        }
    });

    function getBufferPercentage() {
        if (!video.duration || !video.buffered.length) return 0;
        let maxBufferedEnd = 0;
        for (let i = 0; i < video.buffered.length; i++) {
            const end = video.buffered.end(i);
            if (end > maxBufferedEnd) {
                maxBufferedEnd = end;
            }
        }
        return Math.round((maxBufferedEnd / video.duration) * 100);
    }

    function updateProgressUI() {
        const value = video.duration ? (video.currentTime / video.duration) : 0;
        const bufferPercent = getBufferPercentage();

        seek.value = Math.round(value * 1000);
        seek.style.setProperty('--seek', `${(value * 100).toFixed(2)}%`);
        seek.style.setProperty('--buffer', `${bufferPercent}%`);

        cur.textContent = fmt(video.currentTime);
        dur.textContent = fmt(video.duration);
        bufferInfo.textContent = `BUFFER: ${bufferPercent}%`;
    }

    video.addEventListener('timeupdate', updateProgressUI);
    video.addEventListener('durationchange', updateProgressUI);
    video.addEventListener('loadedmetadata', updateProgressUI);
    video.addEventListener('progress', updateProgressUI);
    seek.addEventListener('input', () => {
        if (!isFinite(video.duration)) return;
        video.currentTime = (Number(seek.value) / 1000) * video.duration;
    });

    // Drag and drop
    ['dragenter', 'dragover'].forEach(evName => dropZone.addEventListener(evName, e => {
        e.preventDefault(); e.stopPropagation();
        dropZone.style.outline = '2px dashed var(--highlight-color)';
    }));
    ['dragleave', 'drop'].forEach(evName => dropZone.addEventListener(evName, e => {
        e.preventDefault(); e.stopPropagation();
        dropZone.style.outline = 'none';
    }));
    dropZone.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files?.[0];
        if (file) {
            logPlayerEvent('file_drop', file.name);
            loadVideo(file);
        }
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
        switch (e.code) {
            case 'Space': e.preventDefault(); playBtn.click(); break;
            case 'KeyS': e.preventDefault(); stopBtn.click(); break;
            case 'KeyM': muteBtn.click(); break;
            case 'KeyF': e.preventDefault(); fsBtn.click(); break;
            case 'KeyT': e.preventDefault(); toggleTheme(); break;
            case 'KeyY': e.preventDefault(); openYouTube(); break;
            case 'KeyP': e.preventDefault();
                const url = document.getElementById('urlInput').value.trim();
                if (url) addToPlaylist(url);
                break;
            case 'KeyN': e.preventDefault(); playNextTrack(); break;
            case 'KeyB': e.preventDefault(); playPreviousTrack(); break;
            case 'ArrowRight':
                if (e.ctrlKey) {
                    e.preventDefault();
                    playNextTrack();
                } else {
                    video.currentTime = Math.min(video.currentTime + 5, video.duration || 0);
                }
                break;
            case 'ArrowLeft':
                if (e.ctrlKey) {
                    e.preventDefault();
                    playPreviousTrack();
                } else {
                    video.currentTime = Math.max(video.currentTime - 5, 0);
                }
                break;
        }
    });

    function hideControls() {
        if (video.paused || !document.fullscreenElement) return;
        playerContainer.classList.add('hide-fullscreen-controls');
        playerContainer.style.cursor = 'none';
    }

    function showControls() {
        playerContainer.classList.remove('hide-fullscreen-controls');
        playerContainer.style.cursor = 'default';
        clearTimeout(controlsTimeout);
        if (!video.paused && document.fullscreenElement) {
            controlsTimeout = setTimeout(hideControls, 3000);
        }
    }

    playerContainer.addEventListener('mousemove', () => {
        if (document.fullscreenElement) {
            showControls();
        }
    });

    document.addEventListener('fullscreenchange', () => {
        fsBtn.innerHTML = document.fullscreenElement ? icons.compress : icons.expand;
        if (document.fullscreenElement) {
            showControls();
        } else {
            playerContainer.classList.remove('hide-fullscreen-controls');
            playerContainer.style.cursor = 'default';
            clearTimeout(controlsTimeout);
        }
    });

    // Initialize volume slider color and percentage (50% default)
    const initialVolumePercent = Math.round(video.volume * 100);
    vol.style.setProperty('--volume', `${initialVolumePercent}%`);
    volPercent.textContent = `${initialVolumePercent}%`;

    // Load last URL if exists
    const lastUrl = localStorage.getItem('player_last_url');
    if (lastUrl) {
        urlInput.value = lastUrl;
    }

    // Make showNotification available globally for other functions
    window.showNotification = showNotification;
}

// Playlist functionality
let playlist = [];
let currentTrackIndex = -1;

function getPlaylistFromStorage() {
    try {
        const stored = localStorage.getItem('video_playlist');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function savePlaylistToStorage() {
    try {
        localStorage.setItem('video_playlist', JSON.stringify(playlist));
        localStorage.setItem('current_track_index', currentTrackIndex.toString());
    } catch (e) {
        console.error('Failed to save playlist:', e);
    }
}

function addToPlaylist(url, title = null) {
    if (!url || url.trim() === '') return false;

    // Auto-convert YouTube URLs to nocookie version
    const processedUrl = convertToNoCookieUrl(url.trim());

    const item = {
        url: processedUrl,
        title: title || extractTitleFromUrl(processedUrl) || `Track ${playlist.length + 1}`,
        id: Date.now() + Math.random(),
        isYouTube: !!(extractYouTubeVideoId(processedUrl) || isYouTubePlaylist(processedUrl)),
        isPlaylist: isYouTubePlaylist(processedUrl)
    };

    playlist.push(item);
    savePlaylistToStorage();
    updatePlaylistUI();
    window.showNotification(`Added to playlist: ${item.title}`, 'info');
    logPlayerEvent('playlist_add', item.title);
    return true;
}

function removeFromPlaylist(id) {
    const index = playlist.findIndex(item => item.id === id);
    if (index === -1) return;

    const item = playlist[index];
    playlist.splice(index, 1);

    // Adjust current index if needed
    if (currentTrackIndex > index) {
        currentTrackIndex--;
    } else if (currentTrackIndex === index) {
        currentTrackIndex = -1;
    }

    savePlaylistToStorage();
    updatePlaylistUI();
    window.showNotification(`Removed from playlist: ${item.title}`, 'info');
}

function clearPlaylist() {
    playlist = [];
    currentTrackIndex = -1;
    savePlaylistToStorage();
    updatePlaylistUI();
    window.showNotification('Playlist cleared', 'info');
    logPlayerEvent('playlist_clear');
}

function playTrack(index) {
    if (index < 0 || index >= playlist.length) return false;

    currentTrackIndex = index;
    const track = playlist[index];

    if (track.isYouTube) {
        if (track.isPlaylist) {
            const playlistId = extractYouTubePlaylistId(track.url);
            const videoId = extractYouTubeVideoId(track.url);
            if (playlistId) {
                loadYouTubePlaylist(playlistId, videoId);
            }
        } else {
            const videoId = extractYouTubeVideoId(track.url);
            if (videoId) {
                loadYouTubeVideo(videoId);
            }
        }
    } else {
        loadVideo(track.url);
    }

    // Update URL input with nocookie version
    const urlInput = document.getElementById('urlInput');
    if (urlInput) {
        const noCookieUrl = convertToNoCookieUrl(track.url);
        urlInput.value = noCookieUrl;

        // Update track URL if it was converted
        if (noCookieUrl !== track.url) {
            track.url = noCookieUrl;
            savePlaylistToStorage();
        }
    }

    savePlaylistToStorage();
    updatePlaylistUI();
    window.showNotification(`Playing: ${track.title}`, 'info');
    logPlayerEvent('playlist_play', track.title);
    return true;
}

function playNextTrack() {
    if (playlist.length === 0) return false;

    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= playlist.length) {
        nextIndex = 0; // Loop to beginning
    }

    logPlayerEvent('playlist_next');
    return playTrack(nextIndex);
}

function playPreviousTrack() {
    if (playlist.length === 0) return false;

    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
        prevIndex = playlist.length - 1; // Loop to end
    }

    logPlayerEvent('playlist_prev');
    return playTrack(prevIndex);
}

function extractTitleFromUrl(url) {
    try {
        // Extract filename from URL
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.split('/').pop();

        if (filename && filename !== '') {
            // Remove file extension and decode
            return decodeURIComponent(filename.replace(/\.[^/.]+$/, ""));
        }

        // For YouTube URLs, try to extract video ID or playlist ID
        const playlistId = extractYouTubePlaylistId(url);
        const videoId = extractYouTubeVideoId(url);
        const isNoCookie = url.includes('youtube-nocookie.com');
        const prefix = isNoCookie ? 'YouTube (Privacy)' : 'YouTube';

        if (playlistId && videoId) {
            return `${prefix} Playlist: ${playlistId} (Start: ${videoId})`;
        } else if (playlistId) {
            return `${prefix} Playlist: ${playlistId}`;
        } else if (videoId) {
            return `${prefix}: ${videoId}`;
        }

        return null;
    } catch (e) {
        return null;
    }
}

function updatePlaylistUI() {
    const container = document.getElementById('playlist-items');
    if (!container) return;

    if (playlist.length === 0) {
        container.innerHTML = '<p class="playlist-empty">No items in playlist</p>';
        return;
    }

    const html = playlist.map((item, index) => `
        <div class="playlist-item ${index === currentTrackIndex ? 'current' : ''}" data-id="${item.id}">
            <div class="playlist-item-info">
                <div class="playlist-item-title">
                    ${item.isPlaylist ? '<i class="fas fa-list" title="YouTube Playlist"></i> ' : ''}${item.title}
                </div>
                <div class="playlist-item-url">${item.url.length > 50 ? item.url.substring(0, 50) + '...' : item.url}</div>
            </div>
            <div class="playlist-item-controls">
                <button class="playlist-item-play" onclick="playTrack(${index})" title="Play this ${item.isPlaylist ? 'playlist' : 'track'}">
                    <i class="fas fa-play"></i>
                </button>
                <button class="playlist-item-remove" onclick="removeFromPlaylist(${item.id})" title="Remove from playlist">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

// System Log functionality
let systemLogEntries = [];
const MAX_LOG_ENTRIES = 50;

function addLogEntry(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('pl-PL', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const entry = {
        timestamp,
        message,
        type,
        id: Date.now() + Math.random()
    };

    systemLogEntries.unshift(entry); // Add to beginning

    // Keep only last MAX_LOG_ENTRIES
    if (systemLogEntries.length > MAX_LOG_ENTRIES) {
        systemLogEntries = systemLogEntries.slice(0, MAX_LOG_ENTRIES);
    }

    updateSystemLog();
}

function updateSystemLog() {
    const container = document.getElementById('system-log-content');
    if (!container) return;

    const html = systemLogEntries.map(entry => `
        <p class="log-entry ${entry.type}" data-timestamp="${entry.timestamp}">
            [${entry.timestamp}] > ${entry.message}
        </p>
    `).join('');

    container.innerHTML = html;

    // Auto-scroll to top (newest entries)
    container.scrollTop = 0;
}

function clearSystemLog() {
    systemLogEntries = [];
    const container = document.getElementById('system-log-content');
    if (container) {
        container.innerHTML = '<p class="log-entry startup">> System log cleared.</p>';
    }
}

function logPlayerEvent(event, details = '') {
    const eventMessages = {
        'video_loaded': `Video loaded: ${details}`,
        'video_play': 'Video playback started',
        'video_pause': 'Video playback paused',
        'video_stop': 'Video playback stopped',
        'video_error': `Video error: ${details}`,
        'youtube_loaded': `YouTube content loaded: ${details}`,
        'playlist_add': `Added to playlist: ${details}`,
        'playlist_play': `Playing from playlist: ${details}`,
        'playlist_next': 'Switched to next track',
        'playlist_prev': 'Switched to previous track',
        'playlist_clear': 'Playlist cleared',
        'theme_change': `Theme changed to: ${details}`,
        'fullscreen_enter': 'Entered fullscreen mode',
        'fullscreen_exit': 'Exited fullscreen mode',
        'pip_enter': 'Entered Picture-in-Picture mode',
        'pip_exit': 'Exited Picture-in-Picture mode',
        'hls_loaded': `HLS stream loaded: ${details}`,
        'buffer_update': `Buffer: ${details}`,
        'file_drop': `File dropped: ${details}`,
        'url_input': `URL input: ${details}`
    };

    const message = eventMessages[event] || `${event}: ${details}`;
    const type = event.includes('error') ? 'error' :
        event.includes('loaded') || event.includes('play') ? 'success' : 'info';

    addLogEntry(message, type);
}

// YouTube functionality
function extractYouTubeVideoId(url) {
    const patterns = [
        /(?:youtube(?:-nocookie)?\.com\/watch\?v=|youtu\.be\/|youtube(?:-nocookie)?\.com\/embed\/)([^&\n?#]+)/,
        /youtube(?:-nocookie)?\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    return null;
}

function extractYouTubePlaylistId(url) {
    const patterns = [
        /[?&]list=([^&\n?#]+)/,
        /youtube(?:-nocookie)?\.com\/playlist\?list=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    return null;
}

function isYouTubePlaylist(url) {
    return !!extractYouTubePlaylistId(url);
}

function convertToNoCookieUrl(url) {
    if (!url) return url;

    // Konwertuj YouTube URL na nocookie wersję
    return url.replace(/youtube\.com/g, 'youtube-nocookie.com');
}

async function checkYouTubeVideoAvailability(videoId) {
    try {
        // Próba sprawdzenia dostępności przez oembed API (nie zawsze działa)
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

        const response = await fetch(oembedUrl);
        if (response.ok) {
            const data = await response.json();
            return {
                available: true,
                title: data.title,
                author: data.author_name,
                thumbnail: data.thumbnail_url
            };
        }
        return { available: false, reason: 'oembed_failed' };
    } catch (error) {
        // Fallback - zakładamy że video jest dostępne
        return { available: true, reason: 'check_failed' };
    }
}

function openYouTube() {
    const urlInput = document.getElementById('urlInput');
    const currentUrl = urlInput.value.trim();
    const video = document.getElementById('video');
    const playerContainer = document.getElementById('playerContainer');

    if (currentUrl) {
        const playlistId = extractYouTubePlaylistId(currentUrl);
        const videoId = extractYouTubeVideoId(currentUrl);

        if (playlistId) {
            // Ładuj YouTube playlist w odtwarzaczu
            loadYouTubePlaylist(playlistId, videoId);
            window.showNotification('Loading YouTube playlist in player...', 'info');
            logPlayerEvent('youtube_loaded', `Playlist (nocookie): ${playlistId}`);
        } else if (videoId) {
            // Ładuj YouTube wideo w odtwarzaczu
            loadYouTubeVideo(videoId);
            window.showNotification('Loading YouTube video in player...', 'info');
            logPlayerEvent('youtube_loaded', `Video (nocookie): ${videoId}`);
        } else {
            // Otwórz główną stronę YouTube w iframe
            loadYouTubeEmbed();
            window.showNotification('Loading YouTube in player...', 'info');
            logPlayerEvent('youtube_loaded', 'Main page (nocookie)');
        }
    } else {
        // Otwórz główną stronę YouTube w iframe
        loadYouTubeEmbed();
        window.showNotification('Loading YouTube in player...', 'info');
    }
}

function loadYouTubeVideo(videoId, retryCount = 0) {
    const video = document.getElementById('video');
    const dropZone = document.getElementById('dropZone');

    // Ukryj natywny element video
    video.style.display = 'none';

    // Usuń poprzedni iframe jeśli istnieje
    const existingIframe = dropZone.querySelector('.youtube-iframe');
    if (existingIframe) {
        existingIframe.remove();
    }

    // Różne metody próby obejścia blokad
    const embedMethods = [
        // Metoda 1: YouTube nocookie (najprywatniejsza)
        `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&controls=1&cc_load_policy=1&origin=${encodeURIComponent(window.location.origin)}`,
        // Metoda 2: Zwykły YouTube z origin
        `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1&cc_load_policy=1&origin=${encodeURIComponent(window.location.origin)}`,
        // Metoda 3: Bez autoplay (niektóre filmy blokują autoplay)
        `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&controls=1&cc_load_policy=1&origin=${encodeURIComponent(window.location.origin)}`,
        // Metoda 4: Minimalne parametry
        `https://www.youtube-nocookie.com/embed/${videoId}?controls=1`,
        // Metoda 5: Fallback bez origin
        `https://www.youtube-nocookie.com/embed/${videoId}`
    ];

    const currentMethod = embedMethods[retryCount] || embedMethods[0];

    // Stwórz iframe dla YouTube
    const iframe = document.createElement('iframe');
    iframe.className = 'youtube-iframe';
    iframe.src = currentMethod;
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        position: absolute;
        top: 0;
        left: 0;
    `;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    // Dodaj detekcję błędów ładowania
    iframe.onload = () => {
        logPlayerEvent('youtube_embed_success', `Method ${retryCount + 1}: ${currentMethod.includes('nocookie') ? 'nocookie' : 'standard'}`);

        // Sprawdź czy iframe rzeczywiście załadował treść
        setTimeout(() => {
            try {
                // Próba sprawdzenia czy iframe ma treść (może nie działać przez CORS)
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDoc && iframeDoc.title.includes('Error')) {
                    throw new Error('YouTube embed error detected');
                }
            } catch (e) {
                // CORS blokuje dostęp - to normalne, oznacza że iframe działa
                console.log('CORS blocked - iframe likely working correctly');
            }
        }, 2000);
    };

    iframe.onerror = () => {
        logPlayerEvent('youtube_embed_error', `Method ${retryCount + 1} failed`);

        // Spróbuj następnej metody
        if (retryCount < embedMethods.length - 1) {
            window.showNotification(`Embed method ${retryCount + 1} failed, trying alternative...`, 'warning');
            setTimeout(() => {
                loadYouTubeVideo(videoId, retryCount + 1);
            }, 1000);
        } else {
            // Wszystkie metody zawiodły - pokaż opcje użytkownikowi
            showYouTubeEmbedFailure(videoId);
        }
    };

    dropZone.appendChild(iframe);
}

function showYouTubeEmbedFailure(videoId) {
    const video = document.getElementById('video');
    const dropZone = document.getElementById('dropZone');

    // Usuń istniejący iframe
    const existingIframe = dropZone.querySelector('.youtube-iframe');
    if (existingIframe) {
        existingIframe.remove();
    }

    // Pokaż interfejs z opcjami
    const errorDiv = document.createElement('div');
    errorDiv.className = 'youtube-embed-error';
    errorDiv.innerHTML = `
        <div class="embed-error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>YouTube Video Blocked</h3>
            <p>This video cannot be embedded due to restrictions.</p>
            <p><strong>Video ID:</strong> ${videoId}</p>
            
            <div class="embed-error-actions">
                <button id="open-youtube-tab" class="error-action-btn primary">
                    <i class="fab fa-youtube"></i>
                    Open in YouTube
                </button>
                <button id="try-proxy-embed" class="error-action-btn secondary">
                    <i class="fas fa-redo"></i>
                    Try Proxy Method
                </button>
                <button id="copy-video-url" class="error-action-btn secondary">
                    <i class="fas fa-copy"></i>
                    Copy URL
                </button>
            </div>
            
            <div class="embed-error-details">
                <p><small>Some videos are restricted by the uploader or YouTube's policies.</small></p>
            </div>
        </div>
    `;

    errorDiv.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        z-index: 20;
    `;

    dropZone.appendChild(errorDiv);

    // Event listeners dla przycisków
    document.getElementById('open-youtube-tab').addEventListener('click', () => {
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        window.open(youtubeUrl, '_blank');
        logPlayerEvent('youtube_fallback', 'Opened in new tab');
        window.showNotification('Opened video in YouTube tab', 'success');
    });

    document.getElementById('try-proxy-embed').addEventListener('click', () => {
        // Spróbuj alternatywnych metod embed
        tryAlternativeEmbedMethods(videoId);
    });

    document.getElementById('copy-video-url').addEventListener('click', () => {
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        navigator.clipboard.writeText(youtubeUrl).then(() => {
            window.showNotification('YouTube URL copied to clipboard', 'success');
            logPlayerEvent('youtube_url_copied', videoId);
        }).catch(() => {
            window.showNotification('Failed to copy URL', 'error');
        });
    });

    logPlayerEvent('youtube_embed_blocked', `Video ${videoId} blocked from embedding`);
    window.showNotification('YouTube video blocked - check options below', 'warning');
}

function tryAlternativeEmbedMethods(videoId) {
    const dropZone = document.getElementById('dropZone');

    // Usuń error div
    const errorDiv = dropZone.querySelector('.youtube-embed-error');
    if (errorDiv) {
        errorDiv.remove();
    }

    // Spróbuj alternatywnych serwisów proxy (niektóre mogą działać)
    const proxyMethods = [
        // Metoda 1: Invidious (open source YouTube frontend)
        `https://invidio.us/embed/${videoId}`,
        // Metoda 2: Piped (privacy-friendly YouTube frontend)  
        `https://piped.video/embed/${videoId}`,
        // Metoda 3: YouTube z różnymi parametrami
        `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`,
        // Metoda 4: Ostatnia próba - basic embed
        `https://www.youtube.com/embed/${videoId}?controls=0&showinfo=0&rel=0`
    ];

    let currentProxyIndex = 0;

    function tryNextProxy() {
        if (currentProxyIndex >= proxyMethods.length) {
            // Wszystkie proxy zawiodły
            showYouTubeEmbedFailure(videoId);
            return;
        }

        const iframe = document.createElement('iframe');
        iframe.className = 'youtube-iframe';
        iframe.src = proxyMethods[currentProxyIndex];
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            position: absolute;
            top: 0;
            left: 0;
        `;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        iframe.onload = () => {
            logPlayerEvent('youtube_proxy_success', `Proxy method ${currentProxyIndex + 1} worked`);
            window.showNotification('Alternative embed method successful!', 'success');
        };

        iframe.onerror = () => {
            iframe.remove();
            currentProxyIndex++;
            window.showNotification(`Proxy method ${currentProxyIndex} failed, trying next...`, 'warning');
            setTimeout(tryNextProxy, 1000);
        };

        dropZone.appendChild(iframe);
    }

    window.showNotification('Trying alternative embed methods...', 'info');
    tryNextProxy();
}

function loadYouTubePlaylist(playlistId, startVideoId = null) {
    const video = document.getElementById('video');
    const dropZone = document.getElementById('dropZone');

    // Ukryj natywny element video
    video.style.display = 'none';

    // Usuń poprzedni iframe jeśli istnieje
    const existingIframe = dropZone.querySelector('.youtube-iframe');
    if (existingIframe) {
        existingIframe.remove();
    }

    // Stwórz URL dla playlisty (nocookie dla prywatności)
    let embedUrl = `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0&controls=1&cc_load_policy=1`;

    // Jeśli jest określone startowe wideo, dodaj je
    if (startVideoId) {
        embedUrl = `https://www.youtube-nocookie.com/embed/${startVideoId}?list=${playlistId}&autoplay=1&rel=0&controls=1&cc_load_policy=1`;
    }

    // Stwórz iframe dla YouTube playlist (nocookie)
    const iframe = document.createElement('iframe');
    iframe.className = 'youtube-iframe';
    iframe.src = embedUrl;
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        position: absolute;
        top: 0;
        left: 0;
    `;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    dropZone.appendChild(iframe);
}

function loadYouTubeEmbed() {
    const video = document.getElementById('video');
    const dropZone = document.getElementById('dropZone');

    // Ukryj natywny element video
    video.style.display = 'none';

    // Usuń poprzedni iframe jeśli istnieje
    const existingIframe = dropZone.querySelector('.youtube-iframe');
    if (existingIframe) {
        existingIframe.remove();
    }

    // Stwórz iframe dla głównej strony YouTube
    const iframe = document.createElement('iframe');
    iframe.className = 'youtube-iframe';
    iframe.src = 'https://www.youtube.com/';
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        position: absolute;
        top: 0;
        left: 0;
    `;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    dropZone.appendChild(iframe);
}

// Theme management
function getCurrentTheme() {
    return document.documentElement.getAttribute('theme') || 'dark';
}

function setTheme(theme) {
    document.documentElement.setAttribute('theme', theme);
    localStorage.setItem('app_theme', theme);
    updateThemeButton();
}

function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    logPlayerEvent('theme_change', newTheme);
    const msg = newTheme === 'dark' ? 'Motyw: ciemny' : 'Motyw: jasny';
    if (typeof window.showNotification === 'function') {
        window.showNotification(msg, 'info');
    }
}

function updateThemeButton() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const currentTheme = getCurrentTheme();
    if (currentTheme === 'dark') {
        themeBtn.innerHTML = `
            <span class="help-button-top">LIGHT</span>
            <i class="fas fa-sun">
                <span class="help-button-label">MODE</span>
            </i>
            <span class="help-button-bottom">THEME</span>
        `;
        themeBtn.title = 'Switch to Light Theme';
    } else {
        themeBtn.innerHTML = `
            <span class="help-button-top">DARK</span>
            <i class="fas fa-moon">
                <span class="help-button-label">MODE</span>
            </i>
            <span class="help-button-bottom">THEME</span>
        `;
        themeBtn.title = 'Switch to Dark Theme';
    }
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Initialize playlist
function initializePlaylist() {
    // Load playlist from localStorage
    playlist = getPlaylistFromStorage();
    const savedIndex = localStorage.getItem('current_track_index');
    currentTrackIndex = savedIndex ? parseInt(savedIndex) : -1;

    // Convert all existing YouTube URLs to nocookie version
    convertPlaylistToNoCookie();

    // Update UI
    updatePlaylistUI();
}

function convertPlaylistToNoCookie() {
    let hasChanges = false;

    playlist.forEach(item => {
        if (item.isYouTube && item.url.includes('youtube.com') && !item.url.includes('youtube-nocookie.com')) {
            const oldUrl = item.url;
            item.url = convertToNoCookieUrl(item.url);

            // Update title if it was auto-generated
            if (item.title.startsWith('YouTube:') && !item.title.includes('(Privacy)')) {
                item.title = item.title.replace('YouTube:', 'YouTube (Privacy):');
            } else if (item.title.startsWith('YouTube Playlist:') && !item.title.includes('(Privacy)')) {
                item.title = item.title.replace('YouTube Playlist:', 'YouTube (Privacy) Playlist:');
            }

            hasChanges = true;
            logPlayerEvent('playlist_add', `Converted to nocookie: ${item.title}`);
        }
    });

    // Save changes if any were made
    if (hasChanges) {
        savePlaylistToStorage();
        addLogEntry('Existing playlist items converted to privacy-enhanced URLs', 'success');
    }
}

// Initialize modals and theme
function initializeUI() {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('app_theme') || 'dark';
    setTheme(savedTheme);

    // Help button event listeners
    document.getElementById('shortcuts-btn').addEventListener('click', () => {
        openModal('shortcuts-modal');
    });

    document.getElementById('info-btn').addEventListener('click', () => {
        openModal('info-modal');
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
        toggleTheme();
    });

    document.getElementById('youtube-btn').addEventListener('click', () => {
        openYouTube();
    });

    // Playlist event listeners
    document.getElementById('add-to-playlist').addEventListener('click', () => {
        const urlInput = document.getElementById('urlInput');
        const url = urlInput.value.trim();
        if (url) {
            addToPlaylist(url);
        } else {
            window.showNotification('Enter a URL to add to playlist', 'error');
        }
    });

    document.getElementById('clear-playlist').addEventListener('click', () => {
        if (playlist.length > 0) {
            if (confirm('Are you sure you want to clear the entire playlist?')) {
                clearPlaylist();
            }
        }
    });

    document.getElementById('convert-playlist').addEventListener('click', () => {
        const youtubeItems = playlist.filter(item =>
            item.isYouTube && item.url.includes('youtube.com') && !item.url.includes('youtube-nocookie.com')
        );

        if (youtubeItems.length > 0) {
            if (confirm(`Convert ${youtubeItems.length} YouTube URL(s) to privacy-enhanced version?`)) {
                convertPlaylistToNoCookie();
                updatePlaylistUI();
                window.showNotification(`Converted ${youtubeItems.length} URLs to privacy mode`, 'success');
            }
        } else {
            window.showNotification('All YouTube URLs are already in privacy mode', 'info');
        }
    });

    document.getElementById('prev-track').addEventListener('click', () => {
        playPreviousTrack();
    });

    document.getElementById('next-track').addEventListener('click', () => {
        playNextTrack();
    });

    const autoplayCheckbox = document.getElementById('autoplay-next');
    if (autoplayCheckbox) {
        autoplayCheckbox.addEventListener('change', () => {
            const isOn = autoplayCheckbox.checked;
            const msg = isOn ? 'Autoplay włączony' : 'Autoplay wyłączony';
            window.showNotification(msg, isOn ? 'success' : 'info');
            addLogEntry(msg, isOn ? 'success' : 'info');
        });
    }

    // System log clear button
    document.getElementById('clear-log-btn').addEventListener('click', () => {
        clearSystemLog();
        addLogEntry('System log cleared by user', 'info');
    });

    // Close modal on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.show').forEach(modal => {
                modal.classList.remove('show');
            });
        }
    });
}

// Load app function
function loadApp() {
    if (document.body) {
        document.body.innerHTML = createMainContainer();
        console.log('App loaded dynamically');

        // Initialize all functionality after DOM is created
        initializePlayer();
        initializeUI();
        initializePlaylist();

        // Initialize system log
        addLogEntry('Application initialized successfully', 'success');
        addLogEntry('Player ready for media input', 'info');

        return true;
    }
    return false;
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadApp);
} else {
    loadApp();
}
