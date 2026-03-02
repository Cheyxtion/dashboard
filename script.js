document.addEventListener('DOMContentLoaded', () => {
    const ctInput = document.getElementById('ct-input');
    const idrInput = document.getElementById('idr-input');
    const CT_BASE = 3289;
    const IDR_BASE = 1000;

    // Fungsi format ke Indo 1.000,00
    function toIndoFormat(num) {
        return num.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Fungsi ambil angka murni dari string format Indo
    function toPureNumber(str) {
        return parseFloat(str.replace(/\./g, '').replace(',', '.')) || 0;
    }

    // Fungsi pasang ke input
    function updateValue(input, value) {
        input.value = toIndoFormat(value);
    }

    // Event saat mengetik di CT
    ctInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/[^0-9,.]/g, ''); // Izinkan angka, koma, titik
        let num = toPureNumber(val);
        let result = (num / CT_BASE) * IDR_BASE;
        idrInput.value = toIndoFormat(result);
    });

    // Event saat mengetik di IDR
    idrInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/[^0-9,.]/g, ''); // Izinkan angka, koma, titik
        let num = toPureNumber(val);
        let result = (num / IDR_BASE) * CT_BASE;
        ctInput.value = toIndoFormat(result);
    });

    // Format ulang saat keluar kotak (blur)
    [ctInput, idrInput].forEach(input => {
        input.addEventListener('blur', (e) => {
            let num = toPureNumber(e.target.value);
            e.target.value = toIndoFormat(num);
        });
    });

    // Inisialisasi awal (jika tidak diatur di HTML)
    // updateValue(ctInput, 3289);
    // updateValue(idrInput, 1000);
});