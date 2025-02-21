let currentSlide = 0; // Slide aktif pertama
const slides = document.querySelectorAll('.slide'); // Ambil semua slide

function changeSlide(direction) {
    // Hapus kelas 'active' dari slide saat ini
    slides[currentSlide].classList.remove('active');

    // Hitung slide berikutnya
    currentSlide += direction;

    // Jika melebihi jumlah slide, kembali ke awal
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    // Jika kurang dari 0, kembali ke slide terakhir
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    // Tambahkan kelas 'active' ke slide baru
    slides[currentSlide].classList.add('active');
}
