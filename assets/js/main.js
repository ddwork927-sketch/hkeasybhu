/* 簡樸通 — site interactions */
(function () {
  'use strict';

  /* WhatsApp prefilled messages
     Use data-wa="<key>" on any anchor to wire up href on load.
     Without JS the bare wa.me link still works.
     Keys:
       ""           — generic / homepage
       a / bhu_a    — Plan A · 約 HK$1,800 不包上門資料檢視
       b / bhu_b    — Plan B · 約 HK$2,800 包一次基本上門
       bhu          — 簡樸房服務頁 (general)
       emergency    — 24h 水電緊急維修
       maintenance  — 水電日常維修
  */
  var WA_PHONE = '85256876088';
  var WA_TEMPLATES = {
    '': '你好，我想查詢簡樸通服務。\n' +
        '1. 我嘅問題類型：（簡樸房 / 24h 水電急修 / 日常水電 / 唔肯定）\n' +
        '2. 物業地區：\n' +
        '3. 簡單描述情況：\n' +
        '4. 可以傳相片／影片嗎：\n' +
        '5. 方便聯絡時間：',
    a: '你好，我想查詢約 HK$1,800 簡樸房初步資料檢視（不包上門）。\n' +
       '1. 物業地區：\n' +
       '2. 大概有幾多個分間單位／房：\n' +
       '3. 是否已有租約或 AR2 文件：\n' +
       '4. 可以傳相片／影片嗎：\n' +
       '5. 我最擔心嘅事項：\n' +
       '6. 方便聯絡時間：',
    bhu_a: '你好，我想查詢約 HK$1,800 簡樸房初步資料檢視（不包上門）。\n' +
           '1. 物業地區：\n' +
           '2. 大概有幾多個分間單位／房：\n' +
           '3. 是否已有租約或 AR2 文件：\n' +
           '4. 可以傳相片／影片嗎：\n' +
           '5. 我最擔心嘅事項：\n' +
           '6. 方便聯絡時間：',
    b: '你好，我想查詢約 HK$2,800 簡樸房上門初步檢查 + 資料整理方向（包一次基本上門）。\n' +
       '1. 物業地區：\n' +
       '2. 大概面積／分間數量：\n' +
       '3. 現時是否已有間隔／租客：\n' +
       '4. 可以傳相片或平面圖嗎：\n' +
       '5. 希望預約嘅時間：\n' +
       '6. 我最擔心嘅事項：',
    bhu_b: '你好，我想查詢約 HK$2,800 簡樸房上門初步檢查 + 資料整理方向（包一次基本上門）。\n' +
           '1. 物業地區：\n' +
           '2. 大概面積／分間數量：\n' +
           '3. 現時是否已有間隔／租客：\n' +
           '4. 可以傳相片或平面圖嗎：\n' +
           '5. 希望預約嘅時間：\n' +
           '6. 我最擔心嘅事項：',
    bhu: '你好，我想查詢簡樸房約 HK$2,800 上門初步檢查。\n' +
         '1. 物業地區：\n' +
         '2. 分間數量約：\n' +
         '3. 現時有冇租約／AR2／圖則：\n' +
         '4. 可以傳相片／影片或租約／AR2 嗎：\n' +
         '5. 方便聯絡時間：',
    emergency: '你好，我想查詢 24 小時水電緊急維修。\n' +
               '1. 地區是：\n' +
               '2. 問題（爆喉／漏水／跳掣／停電／焦味／火花／其他）：\n' +
               '3. 已發生時間：\n' +
               '4. 目前情況（仍在漏水？已關水掣？全屋跳掣？局部無電？）：\n' +
               '5. 是否需要即日處理：\n' +
               '6. 我會傳相片／短片：',
    maintenance: '你好，我想查詢水電日常維修。\n' +
                 '1. 地區是：\n' +
                 '2. 問題（水龍頭／水箱／燈掣／插座／去水／其他）：\n' +
                 '3. 想維修嘅項目：\n' +
                 '4. 我會傳相片：\n' +
                 '5. 可預約時間：'
  };
  function buildWa(type) {
    var text = (type in WA_TEMPLATES) ? WA_TEMPLATES[type] : WA_TEMPLATES[''];
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
  const fullPath = location.pathname;
  const slug = fullPath.split('/').filter(Boolean).pop() || 'index';
  const isArticleSub = fullPath.startsWith('/articles/') && slug !== 'articles';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const target = link.getAttribute('data-nav');
    const norm = slug.replace('.html', '');
    if (target === norm) {
      link.classList.add('is-active');
    } else if (isArticleSub && target === 'articles') {
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
