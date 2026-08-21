// ========================================
// Nyael — Floating Character
// ========================================

const floating = document.createElement("div");

floating.className = "floating-character";

floating.innerHTML = `
  <div class="floating-message">
    <strong>🩷💜 · <span id="dday">D+0</span></strong>
    <br>
    <b>Noel</b> 용서해. 너 또한 그랬잖아.
    <br>
    <b>Nyaryu</b> 기꺼이.
  </div>

  <div class="floating-characters">
    <img src="1.png" alt="Noel">
    <img src="2.png" alt="Nyaryu">
  </div>
`;

document.body.appendChild(floating);


// ========================================
// D-day
// 2026.08.13 = D+0
// ========================================

const startDate = new Date("2026-08-13T00:00:00");

function updateDday() {
  const today = new Date();

  const start = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  const current = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diff = Math.floor(
    (current - start) / (1000 * 60 * 60 * 24)
  );

  const dday = document.getElementById("dday");

  if (!dday) return;

  if (diff >= 0) {
    dday.textContent = `D+${diff}`;
  } else {
    dday.textContent = `D${diff}`;
  }
}

updateDday();


// ========================================
// Mouse Star Particles
// 드문드문 떨어지는 별가루
// ========================================

let lastParticleTime = 0;

document.addEventListener("mousemove", (e) => {

  const now = Date.now();

  // 최소 생성 간격
  if (now - lastParticleTime < 260) return;

  // 생성 확률
  if (Math.random() > 0.28) return;

  lastParticleTime = now;

  const particle = document.createElement("span");

  particle.className = "star-particle";

  const size = Math.random() * 3 + 2;

  const colors = [
    "#EB00BD",
    "#8B00FF",
    "#ffffff"
  ];

  particle.style.left =
    `${e.clientX + (Math.random() * 14 - 7)}px`;

  particle.style.top =
    `${e.clientY + (Math.random() * 10 - 5)}px`;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particle.style.background =
    colors[Math.floor(Math.random() * colors.length)];

  particle.style.setProperty(
    "--fall-x",
    `${Math.random() * 28 - 14}px`
  );

  particle.style.setProperty(
    "--fall-y",
    `${Math.random() * 45 + 30}px`
  );

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1400);
});


// ========================================
// YouTube BGM
// Playlist: PLM01DG1JIGvw
// ========================================

let bgmPlayer = null;
let bgmReady = false;
let bgmPlaying = false;


// YouTube API 로드
function loadYouTubeAPI() {

  if (window.YT && window.YT.Player) {
    createYouTubePlayer();
    return;
  }

  const tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";

  document.head.appendChild(tag);

  window.onYouTubeIframeAPIReady = function () {
    createYouTubePlayer();
  };
}


// YouTube 플레이어 생성
function createYouTubePlayer() {

  if (bgmPlayer) return;

  const container = document.getElementById("bgm-player");

  if (!container) return;

  bgmPlayer = new YT.Player("bgm-player", {

    width: "1",
    height: "1",

    playerVars: {
      listType: "playlist",
      list: "PLM01DG1JIGvw",
      playsinline: 1,
      controls: 0,
      rel: 0
    },

    events: {

      onReady: function (event) {

        bgmReady = true;

        event.target.setVolume(35);

        createBgmButton();
      },

      onStateChange: function (event) {

        if (event.data === YT.PlayerState.PLAYING) {

          bgmPlaying = true;

          updateBgmButton();
        }

        if (event.data === YT.PlayerState.PAUSED) {

          bgmPlaying = false;

          updateBgmButton();
        }

        if (event.data === YT.PlayerState.ENDED) {

          event.target.nextVideo();
        }
      }
    }
  });
}


// ========================================
// BGM Button
// ========================================

function createBgmButton() {

  if (document.getElementById("bgm-control")) {
    return;
  }

  const button = document.createElement("button");

  button.id = "bgm-control";
  button.type = "button";

  button.innerHTML = "♫ <span>PLAY</span>";

  button.addEventListener("click", function () {

    if (!bgmPlayer || !bgmReady) {
      return;
    }

    if (bgmPlaying) {

      bgmPlayer.pauseVideo();

    } else {

      bgmPlayer.playVideo();

    }
  });

  document.body.appendChild(button);

  updateBgmButton();
}


// ========================================
// BGM Button State
// ========================================

function updateBgmButton() {

  const button = document.getElementById("bgm-control");

  if (!button) return;

  if (bgmPlaying) {

    button.innerHTML = "♫ <span>PAUSE</span>";

    button.classList.add("playing");

  } else {

    button.innerHTML = "♫ <span>PLAY</span>";

    button.classList.remove("playing");
  }
}


// ========================================
// Start
// ========================================

loadYouTubeAPI();
