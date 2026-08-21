// ========================================
// Nyael Effects
// ========================================


// ========================================
// D-Day
// 기준일: 2026년 8월 13일 = D+0
// ========================================

function getDdayText() {
  const startDate = new Date(2026, 7, 13);

  const today = new Date();

  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff =
    Math.floor(
      (today - startDate) / (1000 * 60 * 60 * 24)
    );

  if (diff < 0) {
    return `D-${Math.abs(diff)}`;
  }

  return `D+${diff}`;
}


function getRemainingText() {
  const startDate = new Date(2026, 7, 13);
  const targetDate = new Date(startDate);

  targetDate.setDate(
    targetDate.getDate() + 50
  );

  const today = new Date();

  startDate.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff =
    Math.ceil(
      (targetDate - today) /
      (1000 * 60 * 60 * 24)
    );

  if (diff > 0) {
    return `50일까지 ${diff}일`;
  }

  if (diff === 0) {
    return "D+50";
  }

  return "D+50";
}


// ========================================
// Floating Character
// ========================================

function createFloatingCharacter() {

  // 기존 플로팅이 있다면 제거
  const old = document.querySelector(".nyael-floating");

  if (old) {
    old.remove();
  }

  const floating =
    document.createElement("div");

  floating.className = "nyael-floating";

  floating.innerHTML = `
    <div class="nyael-floating-bubble">

      <span class="nyael-dday">
        💗 💜 · ${getRemainingText()}
      </span>

      <div>
        <span class="nyael-noel">Noel</span>
        용서해. 너 또한 그랬잖아.
      </div>

      <div>
        <span class="nyael-nyaryu">Nyaryu</span>
        기꺼이.
      </div>

    </div>

    <div class="nyael-floating-characters">

      <img src="1.png" alt="Noel">

      <img src="2.png" alt="Nyaryu">

    </div>

    <button
      class="nyael-floating-close"
      type="button"
      aria-label="플로팅 닫기"
    >
      ×
    </button>
  `;

  document.body.appendChild(floating);


  // 닫기
  const closeButton =
    floating.querySelector(
      ".nyael-floating-close"
    );

  closeButton.addEventListener(
    "click",
    () => {
      floating.remove();
    }
  );
}


// ========================================
// 마우스 별가루
//
// 마우스를 따라다니지 않고
// 일정 확률로 한두 개씩 생성되어
// 살짝 아래로 떨어짐
// ========================================

let lastParticleTime = 0;

document.addEventListener(
  "mousemove",
  (event) => {

    const now = Date.now();

    // 최소 생성 간격
    if (now - lastParticleTime < 110) {
      return;
    }

    // 생성 확률
    if (Math.random() > 0.18) {
      return;
    }

    lastParticleTime = now;

    const particle =
      document.createElement("span");

    particle.className =
      "star-particle";

    const size =
      Math.random() * 3 + 2;

    const colors = [
      "#EB00BD",
      "#8B00FF",
      "#FFFFFF"
    ];

    const color =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];

    particle.style.left =
      `${event.clientX}px`;

    particle.style.top =
      `${event.clientY}px`;

    particle.style.width =
      `${size}px`;

    particle.style.height =
      `${size}px`;

    particle.style.background =
      color;

    particle.style.color =
      color;

    particle.style.setProperty(
      "--drift",
      Math.round(
        Math.random() * 50 - 25
      )
    );

    document.body.appendChild(
      particle
    );

    setTimeout(
      () => particle.remove(),
      1900
    );
  }
);


// ========================================
// YouTube Playlist
// ========================================

const YOUTUBE_PLAYLIST =
  "PLM01DG1JIGvw";

let youtubePlayer = null;


// YouTube API 로드
function loadYouTubeAPI() {

  if (
    document.getElementById(
      "youtube-iframe-api"
    )
  ) {
    return;
  }

  const script =
    document.createElement("script");

  script.id =
    "youtube-iframe-api";

  script.src =
    "https://www.youtube.com/iframe_api";

  document.head.appendChild(script);
}


// API 준비 후 호출
window.onYouTubeIframeAPIReady =
  function () {

    const container =
      document.createElement("div");

    container.id =
      "nyael-youtube";

    document.body.appendChild(
      container
    );

    youtubePlayer =
      new YT.Player(
        "nyael-youtube",
        {
          width: "1",
          height: "1",

          playerVars: {
            listType: "playlist",
            list: YOUTUBE_PLAYLIST,

            autoplay: 1,
            loop: 1,

            controls: 0,
            rel: 0,

            playsinline: 1
          },

          events: {

            onReady: function (event) {

              // 브라우저 자동재생 정책상
              // 처음에는 음소거로 시도
              event.target.mute();

              event.target.playVideo();

            },

            onStateChange:
              function (event) {

                // 재생목록 마지막에서 다시 처음으로
                if (
                  event.data ===
                  YT.PlayerState.ENDED
                ) {
                  event.target.playVideo();
                }

              }
          }
        }
      );
    };


// ========================================
// 첫 사용자 입력 후 소리 켜기
// ========================================

function enableSound() {

  if (!youtubePlayer) {
    return;
  }

  try {

    youtubePlayer.unMute();

    youtubePlayer.setVolume(35);

    youtubePlayer.playVideo();

  } catch (error) {

    console.log(
      "YouTube audio could not start.",
      error
    );

  }

  document.removeEventListener(
    "click",
    enableSound
  );

  document.removeEventListener(
    "touchstart",
    enableSound
  );

  document.removeEventListener(
    "keydown",
    enableSound
  );
}


document.addEventListener(
  "click",
  enableSound
);

document.addEventListener(
  "touchstart",
  enableSound
);

document.addEventListener(
  "keydown",
  enableSound
);


// ========================================
// 시작
// ========================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    createFloatingCharacter();

    loadYouTubeAPI();

  }
);
