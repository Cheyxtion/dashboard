// Deklarasikan focusCard di luar agar bisa dipanggil oleh atribut onclick di HTML
function focusCard(element) {
    const cards = document.querySelectorAll('.profile-card');
    
    // Hapus class focused dari SEMUA kartu
    cards.forEach(card => {
        card.classList.remove('focused');
    });
    
    // Tambah class focused hanya ke kartu yang DIKLIK
    element.classList.add('focused');
}

document.addEventListener('DOMContentLoaded', function() {
    const leaderboardContent = document.getElementById('leaderboardContent');
    const offcanvas = document.getElementById('leaderboardRight');
    
    // --- 1. LOGIKA LEADERBOARD ---
    const API_URL = 'https://bottai.onrender.com/api/leaderboard'; 

    async function renderLeaderboard() {
        if (!leaderboardContent) return;
        
        leaderboardContent.innerHTML = '<div class="text-center p-4"><div class="spinner-border text-primary" role="status"></div></div>';

        try {
            const response = await fetch(API_URL);
            const players = await response.json();

            leaderboardContent.innerHTML = '';

            players.forEach((p, index) => {
                const rank = index + 1;
                const rankDisplay = rank === 1 ? '👑' : `#${rank}`;
                
                let rankTitle = "";
                let titleColor = "#5865F2"; 

                if (rank === 1) {
                    rankTitle = "The Untouchable God";
                    titleColor = "#ffac33"; 
                } else if (rank === 2) {
                    rankTitle = "Server Elite Legacy";
                } else if (rank === 3) {
                    rankTitle = "High-Class Noble";
                } else {
                    rankTitle = "Cheyxtion Citizen";
                    titleColor = "#72767d"; 
                }

                const formattedBalance = new Intl.NumberFormat('id-ID').format(p.ct_wallet) + " CT";

                const itemHTML = `
                    <div class="leaderboard-item shadow-sm">
                        <div class="rank-badge">${rankDisplay}</div>
                        <div class="user-meta">
                            <span class="user-name">${p.username}</span>
                            <span class="user-id" style="color: ${titleColor}; font-weight: 700; font-size: 0.75rem; text-transform: uppercase;">
                                ${rankTitle}
                            </span>
                        </div>
                        <div class="user-balance">${formattedBalance}</div>
                    </div>
                `;
                
                leaderboardContent.insertAdjacentHTML('beforeend', itemHTML);
            });

            setTimeout(() => {
                const items = document.querySelectorAll('.leaderboard-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-item');
                    }, index * 100);
                });
            }, 50);

        } catch (error) {
            console.error("Error:", error);
            leaderboardContent.innerHTML = '<p class="text-center text-danger small">Gagal memuat data Sultan.</p>';
        }
    }

    if (offcanvas) {
        offcanvas.addEventListener('shown.bs.offcanvas', renderLeaderboard);
        offcanvas.addEventListener('hidden.bs.offcanvas', () => {
            leaderboardContent.innerHTML = '';
        });
    }

    // --- 2. LOGIKA INITIAL FOCUS (OWNER) ---
    // Kita kasih delay sedikit supaya browser selesai render CSS profil
    setTimeout(() => {
        const ownerCard = document.querySelector('.profile-card:nth-child(2)'); 
        if(ownerCard) focusCard(ownerCard);
    }, 100);
});