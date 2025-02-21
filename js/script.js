// Variabel untuk menyimpan slide yang sedang aktif
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Fungsi untuk mengubah slide aktif
function changeSlide(direction) {
    slides[currentSlide].classList.remove('active'); // Hilangkan kelas 'active' dari slide saat ini
    currentSlide = (currentSlide + direction + slides.length) % slides.length; // Hitung slide baru
    slides[currentSlide].classList.add('active'); // Tambahkan kelas 'active' ke slide baru

    // Periksa apakah slide yang aktif adalah slide terakhir
    if (currentSlide === slides.length - 1) { // Slide terakhir
        const audio1 = document.getElementById('slideAudio1');
        const audio2 = document.getElementById('slideAudio2');

        // Mainkan audio berurutan
        audio1.play()
            .then(() => {
                console.log("Audio 1 is playing.");
                audio1.onended = () => { // Setelah audio 1 selesai
                    audio2.play()
                        .then(() => console.log("Audio 2 is playing."))
                        .catch(error => console.error("Error playing audio 2: ", error));
                };
            })
            .catch(error => console.error("Error playing audio 1: ", error));

        // Tambahkan efek confetti
        shoot(); // Panggil fungsi confetti
    }
}

// Pasang event listener ke semua elemen '.circle'
document.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('click', () => {
        const number = circle.getAttribute('data-number'); // Ambil atribut 'data-number'
        if (number) {
            playSound(number); // Mainkan suara berdasarkan nomor
        } else {
            console.error('data-number is missing or undefined for this circle.');
        }
    });
});

// Fungsi untuk memainkan suara berdasarkan nomor
function playSound(number) {
    const audio = new Audio(`sounds/${number}.mp3`);
    audio.play()
        .then(() => console.log(`Sound for number ${number} is playing.`))
        .catch(error => console.error(`Error playing sound: ${error.message}`));
}

// Fungsi untuk memunculkan confetti
function shoot() {
    var defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star']
    });

    confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle']
    });
}
