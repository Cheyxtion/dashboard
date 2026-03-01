document.addEventListener('DOMContentLoaded', () => {
    const ctInput = document.getElementById('ct-input');
    const idrInput = document.getElementById('idr-input');
    const statusText = document.getElementById('status-text');

    // Nilai Tukar: 3289 CT = 1000 IDR
    const CT_BASE = 3289;
    const IDR_BASE = 1000;

    function convertCtToIdr() {
        const ctValue = parseFloat(ctInput.value);
        if (isNaN(ctValue) || ctValue <= 0) {
            idrInput.value = '';
            updateStatus(0, 0);
            return;
        }
        
        // Rumus: (Jumlah CT / 3289) * 1000
        const idrResult = (ctValue / CT_BASE) * IDR_BASE;
        
        // .toFixed(2) artinya nampilin 2 angka di belakang koma (misal: 0.30)
        // Kalau hasilnya di atas 100, kita buletin aja biar nggak ribet bacanya
        idrInput.value = idrResult < 100 ? idrResult.toFixed(2) : Math.round(idrResult);
        
        updateStatus(ctValue, idrResult);
    }

    function convertIdrToCt() {
        const idrValue = parseFloat(idrInput.value);
        if (isNaN(idrValue) || idrValue <= 0) {
            ctInput.value = '';
            updateStatus(0, 0);
            return;
        }

        const ctResult = (idrValue / IDR_BASE) * CT_BASE;

        // CT biasanya angka bulat, tapi kita kasih 1 desimal kalau jumlahnya kecil
        ctInput.value = ctResult < 10 ? ctResult.toFixed(1) : Math.round(ctResult);
        
        updateStatus(ctResult, idrValue);
    }

    function updateStatus(ct, idr) {
        if (!ct || !idr) {
            statusText.innerText = `Masukkan jumlah untuk menghitung`;
            return;
        }

        // Format tampilan teks di bawah kotak input
        // Menggunakan 'de-DE' supaya pemisah ribuan pakai titik (.) dan desimal pakai koma (,) khas Indonesia
        const formattedCT = ct.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        const formattedIDR = idr.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        
        statusText.innerText = `${formattedCT} CT = Rp ${formattedIDR}`;
    }

    ctInput.addEventListener('input', convertCtToIdr);
    idrInput.addEventListener('input', convertIdrToCt);

    // Jalankan kalkulasi awal
    convertCtToIdr();
});
