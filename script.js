document.addEventListener('DOMContentLoaded', () => {
    const ctInput = document.getElementById('ct-input');
    const idrInput = document.getElementById('idr-input');
    const statusText = document.getElementById('status-text');

    // Nilai Tukar: 3289 CT = 1000 IDR
    const CT_BASE = 3289;
    const IDR_BASE = 1000;

    // Fungsi konversi CT ke IDR
    function convertCtToIdr() {
        const ctValue = parseFloat(ctInput.value);
        if (isNaN(ctValue) || ctValue < 0) {
            idrInput.value = '';
            updateStatus(0, 0);
            return;
        }
        
        const idrResult = (ctValue / CT_BASE) * IDR_BASE;
        
        // Update input IDR (bulatkan 2 desimal)
        idrInput.value = idrResult.toFixed(0); 
        updateStatus(ctValue, idrResult);
    }

    // Fungsi konversi IDR ke CT
    function convertIdrToCt() {
        const idrValue = parseFloat(idrInput.value);
        if (isNaN(idrValue) || idrValue < 0) {
            ctInput.value = '';
            updateStatus(0, 0);
            return;
        }

        const ctResult = (idrValue / IDR_BASE) * CT_BASE;

        // Update input CT (bulatkan ke angka utuh)
        ctInput.value = Math.round(ctResult);
        updateStatus(ctResult, idrValue);
    }

    // Fungsi untuk mengupdate teks status di bawah
    function updateStatus(ct, idr) {
        if (ct === 0 && idr === 0) {
            statusText.innerText = `Masukkan jumlah untuk menghitung`;
            return;
        }
        // Format angka agar mudah dibaca (ribuan)
        const formattedCT = Math.round(ct).toLocaleString('id-ID');
        const formattedIDR = Math.round(idr).toLocaleString('id-ID');
        statusText.innerText = `${formattedCT} CT = Rp ${formattedIDR}`;
    }

    // Event Listeners: Input 2 arah
    ctInput.addEventListener('input', convertCtToIdr);
    idrInput.addEventListener('input', convertIdrToCt);

    // Jalankan konversi awal (CT ke IDR) saat halaman dimuat
    convertCtToIdr();
});
