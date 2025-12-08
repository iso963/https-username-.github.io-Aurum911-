/* ===== Reset ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background: #ffffff;
  color: #1a1a1a;
  padding: 20px;
  text-align: center;
}

/* ===== Headers ===== */
h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #d4a017;
  margin-bottom: 10px;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 25px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  opacity: 0.85;
}

/* ===== Navbar ===== */
.navbar {
  width: 100%;
  background: #ffffff;
  border-bottom: 2px solid #d4a017;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: #d4a017;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 25px;
}

.navbar ul li a {
  text-decoration: none;
  font-size: 1.1rem;
  color: #1a1a1a;
  padding: 8px 12px;
  border-radius: 8px;
  transition: 0.3s;
}

.navbar ul li a:hover {
  background: #d4a017;
  color: white;
}

/* ===== Cards ===== */
.card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.card h3 {
  color: #d4a017;
  font-size: 1.5rem;
}

.card p {
  font-size: 1rem;
  line-height: 1.5;
}

/* ===== Compare Section ===== */
#compare-section select, #compare-section button {
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

#compare-result table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

#compare-result th, #compare-result td {
  border: 1px solid #ddd;
  padding: 8px;
}

#compare-result th {
  background-color: #bfa34c;
  color: white;
}

/* ===== Search ===== */
.search-container input {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  border: 2px solid #d4a017;
  border-radius: 10px;
  margin-bottom: 20px;
}
// استبدل هذه القيم بالقيم الحقيقية لمشروعك في Supabase
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// تحميل السيارات وعرضها
async function loadCars() {
    const { data: cars, error } = await supabase
        .from('Cars')
        .select('*')
        .order('price_min', { ascending: true });

    if (error) {
        console.error("Supabase error:", error);
        return;
    }

    const list = document.getElementById('cars-list');
    list.innerHTML = '';
    cars.forEach(c => {
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `
            <h3>${c.name} — ${c.year_range}</h3>
            <p>${c.description || ''}</p>
            <p>HP: ${c.horsepower} — 0-100 km/h: ${c.zero_100}s — Top Speed: ${c.top_speed} km/h</p>
            <p>Price: $${c.price_min} – $${c.price_max}</p>
        `;
        list.appendChild(el);
    });

    setupCompare(cars);
    setupSearch(cars);
}

// تهيئة المقارنة
function setupCompare(cars) {
    const select1 = document.getElementById('compare-select1');
    const select2 = document.getElementById('compare-select2');
    select1.innerHTML = '<option value="">Select Car 1</option>';
    select2.innerHTML = '<option value="">Select Car 2</option>';

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

    document.getElementById('compare-button').onclick = () => {
        const car1 = cars.find(c => c.id == select1.value);
        const car2 = cars.find(c => c.id == select2.value);
        const resultDiv = document.getElementById('compare-result');

        if (!car1 || !car2) {
            resultDiv.innerHTML = 'اختر سيارتين للمقارنة!';
            return;
        }

        resultDiv.innerHTML = `
            <h3>Comparison: ${car1.name} vs ${car2.name}</h3>
            <table>
                <tr><th>Feature</th><th>${car1.name}</th><th>${car2.name}</th></tr>
                <tr><td>Year</td><td>${car1.year_range}</td><td>${car2.year_range}</td></tr>
                <tr><td>HP</td><td>${car1.horsepower}</td><td>${car2.horsepower}</td></tr>
                <tr><td>0-100 km/h</td><td>${car1.zero_100}</td><td>${car2.zero_100}</td></tr>
                <tr><td>Top Speed</td><td>${car1.top_speed}</td><td>${car2.top_speed}</td></tr>
                <tr><td>Price</td><td>$${car1.price_min} – $${car1.price_max}</td><td>$${car2.price_min} – $${car2.price_max}</td></tr>
            </table>
        `;
    };
}

// تهيئة البحث
function setupSearch(cars) {
    const input = document.getElementById('searchInput');
    input.oninput = () => {
        const term = input.value.toLowerCase();
        const filtered = cars.filter(c => c.name.toLowerCase().includes(term));
        const list = document.getElementById('cars-list');
        list.innerHTML = '';
        filtered.forEach(c => {
            const el = document.createElement('div');
            el.className = 'card';
            el.innerHTML = `
                <h3>${c.name} — ${c.year_range}</h3>
                <p>${c.description || ''}</p>
                <p>HP: ${c.horsepower} — 0-100 km/h: ${c.zero_100}s — Top Speed: ${c.top_speed} km/h</p>
                <p>Price: $${c.price_min} – $${c.price_max}</p>
            `;
            list.appendChild(el);
        });
    };
}

document.addEventListener('DOMContentLoaded', loadCars);
