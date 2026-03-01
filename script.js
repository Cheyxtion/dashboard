document.addEventListener('DOMContentLoaded', () => {
    const ctInput = document.getElementById('ct-input');
    const idrInput = document.getElementById('idr-input');
    // Kita tidak perlu lagi memanipulasi statusText secara dinamis agar tetap statis
    
    // Nilai Tukar Tetap: 3289 CT = 1000 IDR
    const CT_BASE = 3289;
    const IDR_BASE = 1000;

    function convertCtToIdr() {
        const ctValue = parseFloat(ctInput.value);
        if (isNaN(ctValue) || ctValue <= 0) {
            idrInput.value = '';
            return;
        }
        
        // Rumus: (Jumlah CT / 3289) * 1000
        const idrResult = (ctValue / CT_BASE) * IDR_BASE;
        
        // Jika hasil di bawah 100, tampilkan 2 desimal (biar 1 CT muncul 0,30)
        // Jika di atas 100, bulatkan saja agar bersih
        idrInput.value = idrResult < 100 ? idrResult.toFixed(2) : Math.round(idrResult);
    }

    function convertIdrToCt() {
        const idrValue = parseFloat(idrInput.value);
        if (isNaN(idrValue) || idrValue <= 0) {
            ctInput.value = '';
            return;
        }

        const ctResult = (idrValue / IDR_BASE) * CT_BASE;

        // Jika CT kecil, tampilkan 1 desimal, jika besar bulatkan
        ctInput.value = ctResult < 10 ? ctResult.toFixed(1) : Math.round(ctResult);
    }

    // Event Listeners untuk input dua arah
    ctInput.addEventListener('input', convertCtToIdr);
    idrInput.addEventListener('input', convertIdrToCt);

    // Jalankan kalkulasi awal supaya pas buka web langsung ada angkanya
    convertCtToIdr();
});
