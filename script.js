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
