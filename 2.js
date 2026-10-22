// ==UserScript==
// @name         Perculus Attendance Automator
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Automatically clicks the attendance confirmation button on Perculus
// @author       QUASAR
// @match        https://kapadokya.perculus.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=perculus.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const rand = (min, max) => Math.random() * (max - min) + min;

    async function humanClick(el) {
        if (!el) return;

        // Tıklamadan önce 1 ile 3 saniye (1000ms - 3000ms) arası rastgele insansı bekleme
        await sleep(rand(1000, 3000));

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

    setInterval(() => {
        const buttons = Array.from(document.querySelectorAll('button[data-variant="primary"]'));
        const targetButton = buttons.find(el => el.textContent.trim() === 'Buradayım!');

        if (targetButton && targetButton.offsetParent !== null) {
            humanClick(targetButton);
        }
    }, 1000);
})();
