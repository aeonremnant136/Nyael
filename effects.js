// ========================================
// Nyael floating character
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
// 마우스 별가루
// ========================================

let lastSparkleTime = 0;

document.addEventListener("mousemove", (e) => {

    const now = Date.now();

    // 너무 촘촘하게 생성되지 않도록 최소 간격
    if (now - lastSparkleTime < 120) return;

    // 약 45% 확률로 생성
    if (Math.random() > 0.45) return;

    lastSparkleTime = now;

    const particle = document.createElement("span");

    particle.className = "star-particle";

    const size = Math.random() * 3 + 2;

    const colors = [
        "#EB00BD",
        "#8B00FF",
        "#ffffff"
    ];

    // 커서 주변에서 약간 랜덤하게 생성
    particle.style.left =
        e.clientX + (Math.random() * 16 - 8) + "px";

    particle.style.top =
        e.clientY + (Math.random() * 10 - 5) + "px";

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    // 떨어지는 방향
    particle.style.setProperty(
        "--fall-x",
        (Math.random() * 30 - 15) + "px"
    );

    particle.style.setProperty(
        "--fall-y",
        (Math.random() * 35 + 25) + "px"
    );

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1200);
});


// ========================================
// YouTube BGM
// Playlist: PLM01DG1JIGvw
// ========================================

let bgmPlayer = null;
let bgmReady = false;
let bgmPlaying = false;


// YouTube API가 준비되면 실행
function onYouTubeIframeAPIReady() {

    bgmPlayer = new YT.Player("bgm-player", {

        width: "1",
        height: "1",

        playerVars: {
            listType: "playlist",
            list: "PLM01DG1JIGvw",
            playsinline: 1,
            controls: 0
        },

        events: {

            onReady: function(event) {

                bgmReady = true;

                event.target.setVolume(35);

                createBgmButton();
            },

            onStateChange: function(event) {

                if (event.data === YT.PlayerState.PLAYING) {
                    bgmPlaying = true;
                    updateBgmButton();
                }

                if (event.data === YT.PlayerState.PAUSED) {
                    bgmPlaying = false;
                    updateBgmButton();
                }

                // 곡이 끝나면 다음 곡으로
                if (event.data === YT.PlayerState.ENDED) {
                    event.target.nextVideo();
                }
            }
        }
    });
}


// ========================================
// BGM 버튼
// ========================================

function createBgmButton() {

    if (document.getElementById("bgm-control")) {
        return;
    }

    const button = document.createElement("button");

    button.id = "bgm-control";
    button.type = "button";
    button.innerHTML = "♫ <span>PLAY</span>";

    button.addEventListener("click", function() {

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
