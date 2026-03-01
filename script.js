document.addEventListener('DOMContentLoaded', () => {
    const ctInput = document.getElementById('ct-input');
    const idrInput = document.getElementById('idr-input');
    
    // Nilai Tukar Tetap: 3289 CT = 1000 IDR
    // Berarti 1 CT = 1000 / 3289 = 0,304043... IDR
    const CT_BASE = 3289;
    const IDR_BASE = 1000;

    function convertCtToIdr() {
        const ctValue = parseFloat(ctInput.value);
        if (isNaN(ctValue) || ctValue <= 0) {
            idrInput.value = '';
            return;
        }
        
        const idrResult = (ctValue / CT_BASE) * IDR_BASE;
        
        // Agar muncul desimal yang sangat kecil, kita set desimalnya sampai 4 angka
        // Contoh: 1 CT akan muncul 0.3041
        // Jika angka bulat, tetap akan tampil bersih
        idrInput.value = idrResult.toLocaleString('en-US', { 
            useGrouping: false, 
            maximumFractionDigits: 4 
        });
    }

    function convertIdrToCt() {
        const idrValue = parseFloat(idrInput.value);
        if (isNaN(idrValue) || idrValue <= 0) {
            ctInput.value = '';
            return;
        }

        const ctResult = (idrValue / IDR_BASE) * CT_BASE;

        // Sama halnya dengan CT, kita beri presisi tinggi
        ctInput.value = ctResult.toLocaleString('en-US', { 
            useGrouping: false, 
            maximumFractionDigits: 4 
        });
    }

    // Event Listeners
    ctInput.addEventListener('input', convertCtToIdr);
    idrInput.addEventListener('input', convertIdrToCt);

    // Inisialisasi awal
    convertCtToIdr();
});
