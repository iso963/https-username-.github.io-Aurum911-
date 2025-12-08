// إعداد Supabase
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co"; // استبدل بالقيمة الخاصة بك
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY"; // استبدل بالقيمة الخاصة بك

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// تحميل السيارات وعرضها
async function loadCars() {
    const { data, error } = await supabase
        .from('Cars')
        .select('*')
        .order('price_min', { ascending: true });

    if (error) {
        console.error('Supabase error:', error);
        return;
    }
    setupCompare(data);

// تهيئة قائمة المقارنة بعد تحميل السيارات
async function setupCompare(cars) {
  const select1 = document.getElementById('compare-select1');
  const select2 = document.getElementById('compare-select2');

  cars.forEach(c => {
    const option1 = document.createElement('option');
    option1.value = c.id;
    option1.textContent = c.name;
    select1.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = c.id;
    option2.textContent = c.name;
    select2.appendChild(option2);
  });

  document.getElementById('compare-button').addEventListener('click', () => {
    const car1 = cars.find(c => c.id == select1.value);
    const car2 = cars.find(c => c.id == select2.value);
    const resultDiv = document.getElementById('compare-result');

    if (!car1 || !car2) {
      resultDiv.innerHTML = 'اختر سيارتين للمقارنة!';
      return;
    }

    resultDiv.innerHTML = `
      <h3>مقارنة بين ${car1.name} و ${car2.name}</h3>
      <table>
        <tr><th>الميزة</th><th>${car1.name}</th><th>${car2.name}</th></tr>
        <tr><td>السنة</td><td>${car1.year_range}</td><td>${car2.year_range}</td></tr>
        <tr><td>HP</td><td>${car1.horsepower}</td><td>${car2.horsepower}</td></tr>
        <tr><td>0-100 km/h</td><td>${car1.zero_100}</td><td>${car2.zero_100}</td></tr>
        <tr><td>السرعة القصوى</td><td>${car1.top_speed}</td><td>${car2.top_speed}</td></tr>
        <tr><td>السعر</td><td>$${car1.price_min} – $${car1.price_max}</td><td>$${car2.price_min} – $${car2.price_max}</td></tr>
      </table>
    `;
  });
}

    const list = document.getElementById('cars-list');
    if (!list) return;
    list.innerHTML = '';

    data.forEach(c => {
        const el = document.createElement('div');
        el.className = 'mb-4 p-4 bg-white rounded-lg shadow';
        el.innerHTML = `
            <h3 class="text-lg font-bold">${c.name} — ${c.year_range}</h3>
            <p>${c.description || ''}</p>
            <p>HP: ${c.horsepower} — 0-100: ${c.zero_100}s — Top Speed: ${c.top_speed} km/h</p>
            <p>Price: $${c.price_min} – $${c.price_max}</p>
        `;
        list.appendChild(el);
    });
}

// تنفيذ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadCars);
