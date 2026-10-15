// Yardımcı Fonksiyonlar
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const rand = (min, max) => Math.random() * (max - min) + min;

async function hummanClick(el) {
    if (!el) return;

    el.scrollIntoView({ block: "center", behavior: "smooth" });
    await sleep(rand(150, 400));

    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width * rand(0.3, 0.7);
    const y = rect.top + rect.height * rand(0.3, 0.7);
    const opts = { bubbles: true, cancelable: true, clientX: x, clientY: y };

    el.dispatchEvent(new MouseEvent("mousemove", opts));
    await sleep(rand(30, 90));

    el.dispatchEvent(new MouseEvent("mouseover", opts));
    el.dispatchEvent(new MouseEvent("mousedown", opts));
    await sleep(rand(20, 70));

    el.dispatchEvent(new MouseEvent("mouseup", opts));
    el.dispatchEvent(new MouseEvent("click", opts));

    console.log("Buradayım butonuna tıklandı!");
}

// Sürekli ekranda bu butonu arayan ve gelince tıklayan döngü
const checkAndClickInterval = setInterval(() => {
    // Ekranda o an var olan butonlar arasından metni "Buradayım!" olanı bul
    const buttons = Array.from(document.querySelectorAll('button[data-variant="primary"]'));
    const targetButton = buttons.find(el => el.textContent.trim() === 'Buradayım!');

    // Eğer buton ekranda belirdiyse (ve daha önce tıklayıp kaybetmediysek)
    if (targetButton) {
        // Görünür olduğundan emin olmak için offsetParent kontrolü de yapabiliriz (gizli değilse)
        if (targetButton.offsetParent !== null) {
            hummanClick(targetButton);
        }
    }
}, 1000);

