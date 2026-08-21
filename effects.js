// ========================================
// Nyael floating character
// ========================================

const floating = document.createElement("div");

floating.className = "floating-character";

floating.innerHTML = `
    <div class="floating-message">
        <strong>💗 💜 · 50일까지 41일</strong>
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
