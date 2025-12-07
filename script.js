// ===== إضافة زر Compare =====
document.addEventListener("DOMContentLoaded", () => {
    const compareButtons = document.querySelectorAll(".compare-btn");

    compareButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.parentElement;
            const model = card.querySelector(".models").dataset.model;
            const price = card.querySelector(".prices").dataset.price;

            // حفظ البيانات في localStorage
            let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
            // تحقق إذا كان الموديل موجود بالفعل
            if (!compareList.some(item => item.model === model)) {
                compareList.push({ model, price });
                localStorage.setItem("compareList", JSON.stringify(compareList));
                alert(model + " added to comparison!");
            } else {
                alert(model + " is already in comparison.");
            }
        });
    });
});

<section id="cars-section">
    <h2 class="gold-title">Porsche 911 Models</h2>

    <div class="card">
        <h3>911 Carrera</h3>
        <p>Power: 379 HP</p>
        <p>0–100 km/h: 4.2s</p>
        <p>Top Speed: 293 km/h</p>
    </div>

    <div class="card">
        <h3>911 Carrera S</h3>
        <p>Power: 443 HP</p>
        <p>0–100 km/h: 3.7s</p>
        <p>Top Speed: 308 km/h</p>
    </div>

    <div class="card">
        <h3>911 Turbo</h3>
        <p>Power: 572 HP</p>
        <p>0–100 km/h: 2.8s</p>
        <p>Top Speed: 320 km/h</p>
    </div>

    <div class="card">
        <h3>911 Turbo S</h3>
        <p>Power: 640 HP</p>
        <p>0–100 km/h: 2.6s</p>
        <p>Top Speed: 330 km/h</p>
    </div>

    <div class="card">
        <h3>911 GT3</h3>
        <p>Power: 502 HP</p>
        <p>0–100 km/h: 3.2s</p>
        <p>Top Speed: 318 km/h</p>
    </div>

    <div class="card">
        <h3>911 GT3 RS</h3>
        <p>Power: 525 HP</p>
        <p>0–100 km/h: 3.0s</p>
        <p>Top Speed: 296 km/h</p>
    </div>
</section>
.gold-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: #d4a017;
    margin-top: 40px;
    margin-bottom: 20px;
}
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".card");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            if (text.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
