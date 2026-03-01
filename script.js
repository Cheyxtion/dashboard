document.addEventListener('DOMContentLoaded', () => {
    const ctInput = document.getElementById('ct-input');
    const idrResult = document.getElementById('idr-result');

    // Tentukan harga 1 CT berapa Rupiah di sini
    const HARGA_PER_CT = 15000; 

    function hitungKurs() {
        const jumlahCT = ctInput.value;
        const totalIDR = jumlahCT * HARGA_PER_CT;

        // Format angka ke ribuan (contoh: 15.000)
        idrResult.innerText = totalIDR.toLocaleString('id-ID');
    }

    // Jalankan fungsi saat user mengetik
    ctInput.addEventListener('input', hitungKurs);

    // Jalankan sekali saat halaman pertama dimuat
    hitungKurs();
});
