/* ============================================
   ЕВГЕНИЙ ЕВГЕНЬЕВИЧ — интерактив визитки
   ============================================ */
(function () {
    'use strict';

    /* ---------- Печатающийся текст ---------- */
    var phrases = [
        'Маркетинг в социальных сетях',
        'Продвижение: VK · Telegram · YouTube · TikTok',
        'Контент, который продаёт',
        'Воронки и реклама под ключ'
    ];

    var el = document.getElementById('typewriter');
    var pi = 0, ci = 0, deleting = false;

    function type() {
        var full = phrases[pi];
        el.textContent = full.slice(0, ci);

        var speed = deleting ? 28 : 62;

        if (!deleting && ci === full.length) {
            speed = 2200;                  // пауза в конце фразы
            deleting = true;
        } else if (deleting && ci === 0) {
            deleting = false;
            pi = (pi + 1) % phrases.length;
            speed = 450;
        } else {
            ci += deleting ? -1 : 1;
        }
        setTimeout(type, speed);
    }
    setTimeout(type, 900);

    /* ---------- Параллакс-наклон карточки (только с мышью) ---------- */
    var card = document.getElementById('card');
    var fine = window.matchMedia('(pointer: fine)').matches;

    if (fine) {
        document.addEventListener('mousemove', function (e) {
            var x = (e.clientX / window.innerWidth - 0.5);
            var y = (e.clientY / window.innerHeight - 0.5);
            card.style.transform =
                'perspective(1100px) rotateY(' + (x * 5) + 'deg) rotateX(' + (-y * 5) + 'deg)';

            var rect = card.getBoundingClientRect();
            card.style.setProperty('--gx', ((e.clientX - rect.left) / rect.width * 100) + '%');
            card.style.setProperty('--gy', ((e.clientY - rect.top) / rect.height * 100) + '%');
        });

        document.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1100px) rotateY(0) rotateX(0)';
        });
    }

    /* ---------- Лёгкий «магнитный» наклон чипов и соцсетей ---------- */
    if (fine) {
        document.querySelectorAll('[data-tilt]').forEach(function (node) {
            node.addEventListener('mousemove', function (e) {
                var r = node.getBoundingClientRect();
                var dx = (e.clientX - r.left) / r.width - 0.5;
                var dy = (e.clientY - r.top) / r.height - 0.5;
                node.style.transform =
                    'translateY(-3px) rotateX(' + (-dy * 10) + 'deg) rotateY(' + (dx * 10) + 'deg)';
            });
            node.addEventListener('mouseleave', function () {
                node.style.transform = '';
            });
        });
    }

    /* ---------- Микро-параллакс фоновых орб за курсором ---------- */
    if (fine) {
        var orbs = document.querySelectorAll('.orb');
        document.addEventListener('mousemove', function (e) {
            var x = e.clientX / window.innerWidth - 0.5;
            var y = e.clientY / window.innerHeight - 0.5;
            orbs.forEach(function (orb, i) {
                var depth = (i + 1) * 14;
                orb.style.translate = (x * depth) + 'px ' + (y * depth) + 'px';
            });
        });
    }

    /* ---------- Появление карточки при загрузке ---------- */
    card.style.opacity = '0';
    card.style.transform = 'scale(.94) translateY(14px)';
    requestAnimationFrame(function () {
        card.style.transition = 'opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1)';
        card.style.opacity = '1';
        card.style.transform = 'scale(1) translateY(0)';
    });
})();