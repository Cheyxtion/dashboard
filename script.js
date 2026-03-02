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