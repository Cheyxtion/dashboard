document.addEventListener('DOMContentLoaded', function() {
    const leaderboardContent = document.getElementById('leaderboardContent');
    const offcanvas = document.getElementById('leaderboardRight');
    
    const players = [
        { name: "Cheyxtion Dev", balance: "1.250.000 CT", id: "982137" },
        { name: "Sultan Digital", balance: "980.000 CT", id: "102938" },
        { name: "Rich Guy", balance: "750.000 CT", id: "882731" },
        { name: "Player Pro", balance: "500.000 CT", id: "772102" },
        { name: "Active User", balance: "250.000 CT", id: "661293" }
    ];

    function renderLeaderboard() {
        if (!leaderboardContent) return;
        
        // Reset content
        leaderboardContent.innerHTML = '';

        players.forEach((p, index) => {
            const rank = index + 1;
            // Tentukan icon mahkota buat juara 1
            const crown = rank === 1 ? '👑' : `#${rank}`;
            
            const itemHTML = `
                <div class="leaderboard-item shadow-sm d-flex align-items-center">
                    <div class="rank-number">${crown}</div>
                    <div class="user-info">
                        <h6>${p.name}</h6>
                        <span>ID: ${p.id}</span>
                    </div>
                    <div class="balance-info">${p.balance}</div>
                </div>
            `;
            
            leaderboardContent.insertAdjacentHTML('beforeend', itemHTML);
        });

        // Trigger animasi staggered (satu-saatu)
        const items = document.querySelectorAll('.leaderboard-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-item');
            }, index * 100); // Muncul tiap 0.1 detik bergantian
        });
    }

    // Jalankan animasi setiap kali Offcanvas (menu kanan) dibuka
    if (offcanvas) {
        offcanvas.addEventListener('shown.bs.offcanvas', renderLeaderboard);
        
        // Bersihkan saat ditutup agar bisa dipicu ulang animasinya
        offcanvas.addEventListener('hidden.bs.offcanvas', () => {
            leaderboardContent.innerHTML = '';
        });
    }
});

// Fitur Klik Profile Card (The Creators)
function focusCard(element) {
    document.querySelectorAll('.profile-card').forEach(card => {
        card.classList.remove('focused');
    });
    element.classList.add('focused');
}