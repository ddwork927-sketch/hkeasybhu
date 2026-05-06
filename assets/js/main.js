/* 簡樸通 — site interactions */
(function () {
  'use strict';

  /* WhatsApp prefilled messages
     Use data-wa="a" / "b" / "" on any anchor to wire up href on load.
     Without JS the bare wa.me link still works. */
  var WA_PHONE = '85256876088';
  var WA_TEMPLATES = {
    a: '你好，我想查詢現有劏房／分間單位登記支援。\n' +
       '1. 物業地區：\n' +
       '2. 大概有幾多個分間單位／房：\n' +
       '3. 是否已有租約或租務文件：\n' +
       '4. 是否想先做 HK$800 文件初步檢查：\n' +
       '5. 方便聯絡時間：',
    b: '你好，我想查詢想做劏房／分間單位可不可行。\n' +
       '1. 物業地區：\n' +
       '2. 大概面積：\n' +
       '3. 現時是否已有間隔／租客：\n' +
       '4. 是否有相片或平面圖：\n' +
       '5. 想做的目標：\n' +
       '6. 方便聯絡時間：',
    '': ''
  };
  function buildWa(type) {
    var text = WA_TEMPLATES[type] || '';
    return text
      ? 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(text)
      : 'https://wa.me/' + WA_PHONE;
  }
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = buildWa(a.getAttribute('data-wa'));
  });


  /* mobile drawer */
  const burger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      const open = drawer.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', function () {
        drawer.classList.remove('is-open');
        burger.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* faq accordion */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      const open = item.classList.toggle('is-open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
    });
  });

  /* reveal on scroll */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  /* mark current nav link */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.getAttribute('data-nav') === path.replace('.html', '')) {
      link.classList.add('is-active');
    }
  });

  /* smooth-anchor offset for sticky header */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerOffset = window.innerWidth >= 1000 ? 96 : 76;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
