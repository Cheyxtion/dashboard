document.addEventListener('DOMContentLoaded', () => {
    const ctInput = document.getElementById('ct-input');
    const idrInput = document.getElementById('idr-input');
    const CT_BASE = 3289;
    const IDR_BASE = 1000;

    // Fungsi format ke Indo 1.000,00
    function toIndoFormat(num) {
        return num.toLocaleString('id-ID', { 
            minimumFractionDigits: 0, // Dibuat 0 biar gak ganggu pas ngetik awal
            maximumFractionDigits: 2 
        });
    }

    // Ambil angka murni tanpa gangguan format
    function toPureNumber(str) {
        // Hapus semua karakter kecuali angka dan koma (untuk desimal)
        let cleanStr = str.replace(/\./g, '').replace(',', '.');
        return parseFloat(cleanStr) || 0;
    }

    // Logika Konversi CT ke IDR
    ctInput.addEventListener('input', () => {
        let rawVal = ctInput.value;
        let num = toPureNumber(rawVal);
        
        let result = (num / CT_BASE) * IDR_BASE;
        
        // Update IDR otomatis saat CT diketik
        idrInput.value = toIndoFormat(result);
    });

    // Logika Konversi IDR ke CT
    idrInput.addEventListener('input', () => {
        let rawVal = idrInput.value;
        let num = toPureNumber(rawVal);
        
        let result = (num / IDR_BASE) * CT_BASE;
        
        // Update CT otomatis saat IDR diketik
        ctInput.value = toIndoFormat(result);
    });

    // Trik: Format rapi hanya saat kursor keluar (Blur)
    [ctInput, idrInput].forEach(input => {
        input.addEventListener('blur', (e) => {
            let num = toPureNumber(e.target.value);
            if (num > 0) {
                e.target.value = num.toLocaleString('id-ID', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                });
            }
        });
        
        // Saat diklik lagi, bersihkan format buat edit gampang
        input.addEventListener('focus', (e) => {
            let num = toPureNumber(e.target.value);
            if (num > 0) {
                e.target.value = num.toString().replace('.', ',');
            }
        });
    });
});

// --- FITUR SALIN HASIL ---
document.getElementById('copy-btn').addEventListener('click', () => {
    const idrValue = document.getElementById('idr-input').value;
    navigator.clipboard.writeText(idrValue);
    
    // Efek feedback setelah klik
    const btn = document.getElementById('copy-btn');
    btn.innerHTML = '<i class="fas fa-check"></i> TERSALIN!';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-copy me-1"></i> SALIN';
    }, 2000);
});

// --- FITUR LIVE CLOCK ---
function updateClock() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('live-clock').innerText = `*Kurs pasar per: ${now.toLocaleDateString('id-ID', options)} WIB`;
}
setInterval(updateClock, 1000);
updateClock();

// --- LOGIKA FETCH LEADERBOARD (MONGODB) ---
const leaderboardMenu = document.getElementById('leaderboardMenu');
leaderboardMenu.addEventListener('show.bs.offcanvas', async () => {
    const listContainer = document.getElementById('leaderboard-list');
    
    try {
        // Panggil API yang kita buat tadi
        const response = await fetch('https://nama-service-kamu.onrender.com/api/leaderboard');
        const data = await response.json();

        listContainer.innerHTML = data.map((user, index) => `
            <div class="list-group-item bg-transparent text-white border-secondary d-flex align-items-center p-3">
                <div class="rank-number me-3 ${index < 3 ? 'text-warning fw-bold' : 'text-muted'}" style="width: 25px;">
                    #${index + 1}
                </div>
                <div class="flex-grow-1 text-truncate">
                    <div class="fw-bold small">${user.username}</div>
                    <div class="text-white-50" style="font-size: 11px;">
                        ${(user.ct_wallet + user.ct_bank).toLocaleString('id-ID')} CT
                    </div>
                </div>
                ${index === 0 ? '<i class="fas fa-crown text-warning"></i>' : ''}
            </div>
        `).join('');

    } catch (err) {
        listContainer.innerHTML = '<div class="p-4 text-danger small">Gagal menyambung ke database.</div>';
    }
});