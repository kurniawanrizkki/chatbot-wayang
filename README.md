# 🪶 Chatbot Wayang - Kelompok 10

1. **ILYASA EDIT PRASETYA PUTRA (230535608569)**
2. **KURNIAWAN RIZKI TRINANTA SEMBIRING (230535607266)**
3. **MOCHAMMAD HAIDAR RIDHO (230535605491)**
4. **YUSUF MAHDITA SAPUTRA (230535609203)**
--- 

Chatbot Wayang adalah chatbot interaktif berbasis web yang berperan sebagai **dalang digital** yang hanya menguasai dua kisah pewayangan klasik:
1. **Prabu Cingkaradewa**
2. **Sri-Sadana Makahyangan**

Proyek ini dibuat menggunakan **Node.js + Express** di sisi server, dan menampilkan hasil dalam **HTML** dengan dukungan **Markdown rendering** agar format teks (bold, italic, daftar, emoji) dapat tampil dengan baik di halaman web.

---

## 🚀 Fitur Utama

- Interaksi dua arah dengan chatbot bertema wayang  
- Dukungan gaya bahasa: *santai*, *formal*, *gaul*, dan *Jawa halus*  
- Format Markdown otomatis dirender menjadi HTML (tebal, miring, bullet list, dll.)  
- Tampilan web sederhana dan interaktif  
- Dapat dikembangkan lebih lanjut dengan API chatbot (misalnya OpenAI)

---

## 🧰 Persyaratan Sistem

Sebelum mulai, pastikan kamu sudah menginstal:

- [Node.js](https://nodejs.org/) versi **16+** (disarankan versi 18 atau 20)
- [npm](https://www.npmjs.com/) (biasanya sudah terpasang bersama Node.js)

---

## ⚙️ Instalasi

1. **Klon repositori ini**
   ```bash
   git clone https://github.com/username/chatbot-wayang.git
   cd chatbot-wayang
2. **Instal dependensi**
    ```bash

    npm install


3. **Pastikan package.json kamu memiliki:**
    ```bash
    {
    "type": "module",
    "dependencies": {
        "express": "^4.18.2",
        "marked": "^9.1.2"
     }
    }

---

## ▶️ Menjalankan Proyek

1. **Jalankan server:**
    ```bash
    node index.js

3. **Jika berhasil, terminal akan menampilkan:**
   ```bash
    Server running on http://localhost:3000

4. **Buka browser dan akses:**
    http://localhost:3000

---

## 💬 Demo Interaksi

1. **Ketik pertanyaan seperti:**
    Ceritakan tentang Prabu Cingkaradewa.

2. **Chatbot akan menjawab dengan gaya bahasa yang sudah kamu tentukan (misal santai, formal, gaul, atau Jawa halus).**

3. **Markdown seperti **tebal**, *miring*, dan daftar - item akan otomatis ditampilkan dengan format HTML yang indah.**

---

## ✨ Contoh Respons
    Wah, siap, Hardest! Mari kita ngobrol santai tentang Prabu Cingkaradewa ini. Ini kisah yang seru tapi juga penuh drama, lho!

    Jadi begini, Prabu Cingkaradewa ini awalnya bernama Raden Sadewa. Dia ini putranya Prabu Sindula, raja dari Kerajaan Medang Galungan. Tapi, perjalanan hidupnya ini tidak mulus seperti jalan tol, malah lebih mirip jalan berbatu! 😅

    Awalnya, Raden Sadewa ini jatuh cinta sama bibinya sendiri, namanya Dewi Capadi. Nah, ini kan namanya cinta terlarang, ya. Dewi Capadi ini menolak karena takut melanggar aturan agama. Tapi Raden Sadewa ini ngeyel banget, sampai mau memerkosa bibinya. Saking takut dan terdesaknya, Dewi Capadi ini nekat bunuh diri! 😱 Sedih sekali, kan?