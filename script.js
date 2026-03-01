document.addEventListener('DOMContentLoaded', () => {
    const ctInput = document.getElementById('ct-input');
    const idrInput = document.getElementById('idr-input');
    
    const CT_BASE = 3289;
    const IDR_BASE = 1000;

    function convertCtToIdr() {
        let val = ctInput.value.replace(',', '.');
        const ctValue = parseFloat(val);

        if (isNaN(ctValue) || ctValue <= 0) {
            idrInput.value = '';
            return;
        }
        
        const idrResult = (ctValue / CT_BASE) * IDR_BASE;
        
        // Pakai toFixed(5) supaya 1 CT = 0.30404 muncul!
        // Lalu hapus nol mubazir di paling belakang
        idrInput.value = parseFloat(idrResult.toFixed(5)).toString().replace('.', ',');
    }

    function convertIdrToCt() {
        let val = idrInput.value.replace(',', '.');
        const idrValue = parseFloat(val);

        if (isNaN(idrValue) || idrValue <= 0) {
            ctInput.value = '';
            return;
        }

        const ctResult = (idrValue / IDR_BASE) * CT_BASE;
        ctInput.value = parseFloat(ctResult.toFixed(5)).toString().replace('.', ',');
    }

    ctInput.addEventListener('input', convertCtToIdr);
    idrInput.addEventListener('input', convertIdrToCt);

    // Jalankan awal
    convertCtToIdr();
});
