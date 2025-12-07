const translations = {
  "ar": {
    "title": "Aurum911 — الموقع الفاخر لموديلات بورش 911",
    "header_home": "الرئيسية",
    "header_models": "الموديلات",
    "header_compare": "مقارنة",
    "header_contact": "اتصل بنا",
    "footer": "© 2025 Aurum911. جميع الحقوق محفوظة."
  },
  "en": {
    "title": "Aurum911 — Luxury Porsche 911 Models",
    "header_home": "Home",
    "header_models": "Models",
    "header_compare": "Compare",
    "header_contact": "Contact",
    "footer": "© 2025 Aurum911. All rights reserved."
  },
  // يمكن إضافة باقي اللغات هنا
};

const languageSelect = document.getElementById('language-select');

languageSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  const t = translations[lang];

  if (!t) return;

  document.title = t.title;
  document.getElementById('nav-home').textContent = t.header_home;
  document.getElementById('nav-models').textContent = t.header_models;
  document.getElementById('nav-compare').textContent = t.header_compare;
  document.getElementById('nav-contact').textContent = t.header_contact;
  document.getElementById('footer-text').textContent = t.footer;
});
