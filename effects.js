// ==============================
// Nyael site effects
// ==============================

// 마우스를 따라 떨어지는 별가루
document.addEventListener("mousemove", (e) => {
    const particle = document.createElement("span");

    particle.className = "star-particle";

    const size = Math.random() * 4 + 2;
    const colors = ["#EB00BD", "#8B00FF", "#ffffff"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.left = e.clientX + "px";
    particle.style.top = e.clientY + "px";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.background = color;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 900);
});


// ==============================
// 오른쪽 아래 플로팅 이미지
// ==============================

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

    <img src="1.png" alt="Nyael">
`;

document.body.appendChild(floating);
