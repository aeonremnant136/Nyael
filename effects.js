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
// 마우스 별가루
// ========================================

document.addEventListener("mousemove", (e) => {

    // 너무 많이 생성되지 않게 확률 적용
    if (Math.random() > 0.10) return;

    const particle = document.createElement("span");

    particle.className = "star-particle";

    const size = Math.random() * 4 + 2;
    const colors = ["#EB00BD", "#8B00FF", "#ffffff"];

    particle.style.left = e.clientX + "px";
    particle.style.top = e.clientY + "px";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 900);
});

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
