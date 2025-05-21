import './styles.css';

function showPage(pageId) {
    document.querySelectorAll('.container').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}
window.showPage = showPage;

function resetForm() {
    document.getElementById('suhu').value = '';
    document.getElementById('kecepatan').value = '';
    document.getElementById('arah').value = '';
    document.getElementById('hasil').innerHTML = '';
}

function tampilkanModal(pesan) {
    const inputPage = document.getElementById('inputPage');
    if (!inputPage.classList.contains('active')) return;

    const icon = document.getElementById('iconModal');
    const zonaInfo = document.getElementById('zonaInfoText');
    zonaInfo.classList.remove("bg-hijau", "bg-kuning", "bg-merah");

    if (pesan.includes("Tidak ada Upwelling")) {
        icon.src = "https://cdn-icons-png.flaticon.com/512/753/753345.png"; 
        zonaInfo.innerText = "Zona kurang direkomendasikan untuk aktivitas penangkapan ikan."; 
        zonaInfo.classList.add("bg-merah");
    } else if (pesan.includes("Upwelling Sedang")) {
        icon.src = "https://cdn-icons-png.flaticon.com/512/1828/1828665.png"; 
        zonaInfo.innerText = "Zona cukup baik untuk melaut, perhatikan kondisi sekitar.";
        zonaInfo.classList.add("bg-kuning");
    } else if (pesan.includes("Upwelling Tinggi")) {
        icon.src = "https://cdn-icons-png.flaticon.com/512/845/845646.png"; 
        zonaInfo.innerText = "Zona sangat baik untuk melaut, potensi tinggi berkumpulnya ikan.";
        zonaInfo.classList.add("bg-hijau");
    } else  {
        icon.src = "";
        zonaInfo.innerText = ""; 
    }
    document.getElementById('hasilModalText').innerText = pesan;
    document.getElementById('popupModal').style.display = 'block';
}

function tutupModal() {
    document.getElementById('popupModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('popupModal');
    if (event.target === modal) modal.style.display = 'none';
}

function cekUpwelling() {
    const suhu = parseFloat(document.getElementById('suhu').value);
    const kecepatan = parseFloat(document.getElementById('kecepatan').value);
    const arah = document.getElementById('arah').value;

    if (isNaN(suhu) || isNaN(kecepatan)) {
        document.getElementById('hasil').innerHTML = 'Harap masukkan nilai yang valid.';
        return;
    }

    let suhuRendah = 0, suhuSedang = 0, suhuTinggi = 0;
    let kecepatanRendah = 0, kecepatanSedang = 0, kecepatanTinggi = 0;
    let searah = 0, tidaksearah = 0;

    // Fungsi keanggotaan untuk suhu
    if (suhu <= 22.53860000) {
        suhuRendah = 1;
    } else if (suhu >= 22.53860000 && suhu <= 29.30632500) {
        suhuRendah = (29.30632500 - suhu) / (29.30632500 - 22.53860000);
    } else {
        suhuRendah = 0;
    }
    console.log(`Suhu Rendah: ${suhuRendah}`);
    if (suhu <= 22.53860000 || suhu >= 31.02681000) {
        suhuSedang = 0;
    } else if (suhu >= 22.53860000 && suhu <= 29.30632500) {
        suhuSedang = (suhu - 22.53860000) / (29.30632500 - 22.53860000);
    } else {
        suhuSedang = (31.02681000 - suhu) / (31.02681000 - 29.30632500);
    }
    console.log(`Suhu Sedang: ${suhuSedang}`);
    if (suhu <= 29.30632500) {
        suhuTinggi = 0;
    } else if (suhu >= 29.30632500 && suhu <= 31.02681000) {
        suhuTinggi = (suhu - 29.30632500) / (31.02681000 - 29.30632500);
    } else {
        suhuTinggi = 1;
    }
    console.log(`Suhu Tinggi: ${suhuTinggi}`);
    // Fungsi keanggotaan untuk kecepatan
    if (kecepatan <= 5.04583300) {
        kecepatanRendah = 1;
    } else if (kecepatan >= 5.04583300 && kecepatan <= 6.71456071) {
        kecepatanRendah = (6.71456071 - kecepatan) / (6.71456071 - 5.04583300);
    } else {
        kecepatanRendah = 0;
    }
    console.log(`Kecepatan Rendah: ${kecepatanRendah}`);
    if (kecepatan <= 5.04583300 || kecepatan >= 9.13453500) {
        kecepatanSedang = 0;
    } else if (kecepatan >= 5.04583300 && kecepatan <= 6.71456071) {
        kecepatanSedang = (kecepatan - 5.04583300) / (6.71456071 - 5.04583300);
    } else {
        kecepatanSedang = (9.13453500 - kecepatan) / (9.13453500 - 6.71456071);
    }
    console.log(`Kecepatan Sedang: ${kecepatanSedang}`);
    if (kecepatan <= 6.71456071) {
        kecepatanTinggi = 0;
    } else if (kecepatan >= 6.71456071 && kecepatan <= 9.13453500) {
        kecepatanTinggi = (kecepatan - 6.71456071) / (9.13453500 - 6.71456071);
    } else {
        kecepatanTinggi = 1;
    }
    console.log(`Kecepatan Tinggi: ${kecepatanTinggi}`);
    // Fungsi keanggotaan untuk arah
    if (arah === 'searah') {
        searah = 1;
    } else if (arah === 'tidak') {
        tidaksearah = 1;
    }
    console.log(`Arah Angin Searah: ${searah}`);
    console.log(`Arag Angin Tidak Searah: ${tidaksearah}`);

    // Logika untuk menghitung α (alpha) berdasarkan aturan 
    let a1 = Math.min(suhuRendah, kecepatanTinggi, searah);
    console.log(`a1: ${a1}`);
    let z1 = 0;
    if (a1 == 1) {
        z1 = 100;
    } else if (a1 >= 0 && a1 < 1) {
        z1 = (a1 * 30) + 70 ;
    } else if (a1 == 0) {
        z1 = 70;
    }
    console.log(`z1: ${z1}`);

    let a2 = Math.min(suhuRendah, kecepatanTinggi, tidaksearah);
    console.log(`a2: ${a2}`);
    let z2 = 0;
    if (a2 == 0) {
        z2 = 100;
    } else if (a2 >= 0 && a2 < 1) {
        z2 = Math.max (((a2 * 40) + 30), (100 - (a2 * 30)));
    }
    console.log(`z2: ${z2}`);

    let a3 = Math.min(suhuRendah, kecepatanSedang, searah);
    console.log(`a3: ${a3}`);
    let z3 = 0;
    if (a3 == 0) {
        z3 = 100;
    } else if (a3 >= 0 && a3 < 1) {
        z3 = Math.max (((a3 * 40) + 30), (100 - (a3 * 30)));
    }
    console.log(`z3: ${z3}`);

    let a4 = Math.min(suhuRendah, kecepatanSedang, tidaksearah);
    console.log(`a4: ${a4}`);
    let z4 = 0;
    if (a4 == 0) {
        z4 = 100;
    } else if (a4 >= 0 && a4 < 1) {
        z4 = Math.max (((a4 * 40) + 30), (100 - (a4 * 30)));
    }
    console.log(`z4: ${z4}`);

    let a5 = Math.min(suhuRendah, kecepatanRendah, searah);
    console.log(`a5: ${a5}`);
    let z5 = 0;
    if (a5 == 0) {
        z5 = 100;
    } else if (a5 >= 0 && a5 < 1) {
        z5 = Math.max (((a5 * 40) + 30), (100 - (a5 * 30)));
    }
    console.log(`z5: ${z5}`);

    let a6 = Math.min(suhuRendah, kecepatanRendah, tidaksearah);
    console.log(`a6: ${a6}`);
    let z6 = 0;
    if (a6 == 1) {
        z6 = 300;
    } else if (a6 >= 0 && a6 < 1) {
        z6 = 70 - (a6 * 40) ;
    } else if (a6 == 0) {
        z6 = 70;
    }
    console.log(`z6: ${z6}`);

    let a7 = Math.min(suhuSedang, kecepatanTinggi, searah);
    console.log(`a7: ${a7}`);
    let z7 = 0;
    if (a7 == 0) {
        z7 = 100;
    } else if (a7 >= 0 && a7 < 1) {
        z7 = Math.max (((a7 * 40) + 30), (100 - (a7 * 30)));
    }
    console.log(`z7: ${z7}`);

    let a8 = Math.min(suhuSedang, kecepatanTinggi, tidaksearah);
    console.log(`a8: ${a8}`);
    let z8 = 0;
    if (a8 == 0) {
        z8 = 100;
    } else if (a8 >= 0 && a8 < 1) {
        z8 = Math.max (((a8 * 40) + 30), (100 - (a8 * 30)));
    }
    console.log(`z8: ${z8}`);

    let a9 = Math.min(suhuSedang, kecepatanSedang, searah);
    console.log(`a9: ${a9}`);
    let z9 = 0;
    if (a9 == 0) {
        z9 = 100;
    } else if (a9 >= 0 && a9 < 1) {
        z9 = Math.max (((a9 * 40) + 30), (100 - (a9 * 30)));
    }
    console.log(`z9: ${z9}`);

    let a10 = Math.min(suhuSedang, kecepatanSedang, tidaksearah);
    console.log(`a10: ${a10}`);
    let z10 = 0;
    if (a10 == 1) {
        z10 = 300;
    } else if (a10 >= 0 && a10 < 1) {
        z10 = 70 - (a10 * 40) ;
    } else if (a10 == 0) {
        z10 = 70;
    }
    console.log(`z10: ${z10}`);

    let a11 = Math.min(suhuSedang, kecepatanRendah, searah);
    console.log(`a11: ${a11}`);
    let z11 = 0;
    if (a11 == 1) {
        z11 = 300;
    } else if (a11 >= 0 && a11 < 1) {
        z11 = 70 - (a11 * 40) ;
    } else if (a11 == 0) {
        z11 = 70;
    }
    console.log(`z11: ${z11}`);

    let a12 = Math.min(suhuSedang, kecepatanRendah, tidaksearah);
    console.log(`a12: ${a12}`);
    let z12 = 0;
    if (a12 == 1) {
        z12 = 300;
    } else if (a12 >= 0 && a12 < 1) {
        z12 = 70 - (a12 * 40) ;
    } else if (a12 == 0) {
        z12 = 70;
    }
    console.log(`z12: ${z12}`);

    let a13 = Math.min(suhuTinggi, kecepatanTinggi, searah);
    console.log(`a13: ${a13}`);
    let z13 = 0;
    if (a13 == 0) {
        z13 = 100;
    } else if (a13 >= 0 && a13 < 1) {
        z13 = Math.max (((a13 * 40) + 30), (100 - (a13 * 30)));
    }
    console.log(`z13: ${z13}`);

    let a14 = Math.min(suhuTinggi, kecepatanTinggi, tidaksearah);
    console.log(`a14: ${a14}`);
    let z14 = 0;
    if (a14 == 1) {
        z14 = 300;
    } else if (a14 >= 0 && a14 < 1) {
        z14 = 70 - (a14 * 40) ;
    } else if (a14 == 0) {
        z14 = 70;
    }
    console.log(`z14: ${z14}`);

    let a15 = Math.min(suhuTinggi, kecepatanSedang, searah);
    console.log(`a15: ${a15}`);
    let z15 = 0;
    if (a15 == 1) {
        z15 = 300;
    } else if (a15 >= 0 && a15 < 1) {
        z15 = 70 - (a15 * 40) ;
    } else if (a15 == 0) {
        z15 = 70;
    }
    console.log(`z15: ${z15}`);

    let a16 = Math.min(suhuTinggi, kecepatanSedang, tidaksearah);
    console.log(`a16: ${a16}`);
    let z16 = 0;
    if (a16 == 1) {
        z16 = 300;
    } else if (a16 >= 0 && a16 < 1) {
        z16 = 70 - (a16 * 40) ;
    } else if (a16 == 0) {
        z16 = 70;
    }
    console.log(`z16: ${z16}`);

    let a17 = Math.min(suhuTinggi, kecepatanRendah, searah);
    console.log(`a17: ${a17}`);
    let z17 = 0;
    if (a17 == 1) {
        z17 = 300;
    } else if (a17 >= 0 && a17 < 1) {
        z17 = 70 - (a17 * 40) ;
    } else if (a17 == 0) {
        z17 = 70;
    }
    console.log(`z17: ${z17}`);

    let a18 = Math.min(suhuTinggi, kecepatanRendah, tidaksearah);
    console.log(`a18: ${a18}`);
    let z18 = 0;
    if (a18 == 1) {
        z18 = 300;
    } else if (a18 >= 0 && a18 < 1) {
        z18 = 70 - (a18 * 40) ;
    } else if (a18 == 0) {
        z18 = 70;
    }
    console.log(`z18: ${z18}`);

    let totalAlpha = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12 + a13 + a14 + a15 + a16 + a17 + a18 ;
    console.log(`Total Alpha: ${totalAlpha}`);

    // Pastikan totalAlpha tidak nol sebelum melakukan pembagian
    let hasil = 0;
    if (totalAlpha > 0) {
    hasil = (a1 * z1 + a2 * z2 + a3 * z3 + a4 * z4 + a5 * z5 + 
             a6 * z6 + a7 * z7 + a8 * z8 + a9 * z9 + a10 * z10 + 
             a11 * z11 + a12 * z12 + a13 * z13 + a14 * z14 + a15 * z15 + a16 * z16  + a17 * z17 + a18 * z18) / totalAlpha;
    }
    console.log(`hasil Z: ${hasil}`);
    
    // Fungsi keanggotaan untuk upwelling
    let upwellingTidak = 0, upwellingSedang = 0, upwellingTinggi = 0;
    if (hasil <= 30) {
        upwellingTidak = 1;
    } else if (hasil > 30 && hasil < 70) {
        upwellingTidak = (70 - hasil) / (70 - 30);
    } else {
        upwellingTidak = 0;
    }
    console.log(`Tidak ada Upwelling: ${upwellingTidak}`);
    if (hasil <= 30 || hasil >= 100) {
        upwellingSedang = 0;
    } else if (hasil > 30 && hasil < 70) {
        upwellingSedang = (hasil - 30) / (70 - 30);
    } else {
        upwellingSedang = (100 - hasil) / (100-70);
    }
    console.log(`Upwelling Sedang: ${upwellingSedang}`);
    if (hasil < 70) {
        upwellingTinggi = 0;
    } else if (hasil >= 70 && hasil < 100) {
        upwellingTinggi = (hasil - 70) / (100 - 70);
    } else {
        upwellingTinggi = 1;
    }
    console.log(`Upwelling Tinggi: ${upwellingTinggi}`);

    let kesimpulan = '';
    if (upwellingTidak > upwellingSedang && upwellingTidak > upwellingTinggi) {
        kesimpulan = 'Tidak ada Upwelling';
    } else if (upwellingSedang > upwellingTidak && upwellingSedang > upwellingTinggi) {
        kesimpulan = 'Ada Upwelling Sedang';
    } else if (upwellingTinggi > upwellingSedang && upwellingTinggi > upwellingTidak) {
        kesimpulan = 'Ada Upwelling Tinggi';
    }

    // Menampilkan hasil prediksi dan kesimpulan
    tampilkanModal(`Prediksi: ${kesimpulan}`);
    console.log(`Hasil: ${hasil}, Kesimpulan: ${kesimpulan}`);
}

// === Pendaftaran Service Worker untuk PWA ===
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/UpwellCheck/sw.js')
      .then(reg => console.log('✅ Service Worker terdaftar:', reg.scope))
      .catch(err => console.error('❌ Gagal mendaftar Service Worker:', err));
  });
}
