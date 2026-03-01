document.addEventListener('DOMContentLoaded', () => {
    const ctInput = document.getElementById('ct-input');
    const idrInput = document.getElementById('idr-input');
    
    const CT_BASE = 3289;
    const IDR_BASE = 1000;

    // Fungsi untuk memformat angka ke gaya Indonesia (1.000,00)
    function formatIndo(angka) {
        return angka.toLocaleString('id-ID', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }

    // Fungsi untuk membersihkan input agar bisa dihitung (hapus titik, ubah koma ke titik)
    function cleanInput(val) {
        return parseFloat(val.replace(/\./g, '').replace(',', '.'));
    }

    function convertCtToIdr() {
        const ctValue = cleanInput(ctInput.value);

        if (isNaN(ctValue) || ctValue <= 0) {
            idrInput.value = '';
            return;
        }
        
        const idrResult = (ctValue / CT_BASE) * IDR_BASE;
        idrInput.value = formatIndo(idrResult);
    }

    function convertIdrToCt() {
        const idrValue = cleanInput(idrInput.value);

        if (isNaN(idrValue) || idrValue <= 0) {
            ctInput.value = '';
            return;
        }

        const ctResult = (idrValue / IDR_BASE) * CT_BASE;
        ctInput.value = formatIndo(ctResult);
    }

    // Event blur: Format otomatis pas user selesai ngetik (pindah fokus)
    ctInput.addEventListener('blur', () => {
        const val = cleanInput(ctInput.value);
        if(!isNaN(val)) ctInput.value = formatIndo(val);
    });

    idrInput.addEventListener('blur', () => {
        const val = cleanInput(idrInput.value);
        if(!isNaN(val)) idrInput.value = formatIndo(val);
    });

    // Event input: Update hasil secara real-time
    ctInput.addEventListener('input', convertCtToIdr);
    idrInput.addEventListener('input', convertIdrToCt);

    // Inisialisasi awal (Contoh: 1.000,00 CT)
    ctInput.value = formatIndo(1);
    convertCtToIdr();
});
