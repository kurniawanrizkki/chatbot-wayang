import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// --- BASIS PENGETAHUAN KHUSUS ---
// Konten gabungan dari Prabu Cingkaradewa.txt dan Sri - Sadana Makahyangan.txt
const KNOWLEDGE_BASE = `
# BASIS PENGETAHUAN CHATBOT: PRABU CINGKARADEWA DAN SRI-SADANA MAKAAYANGAN

## Kisah Prabu Cingkaradewa
[cite_start]Kisah ini menceritakan Prabu Sindula putra Prabu Watugunung yang dikalahkan anaknya sendiri, bernama Prabu Cingkaradewa. [cite: 1]
[cite_start]Kisah dilanjutkan dengan usaha Prabu Cingkaradewa menguasai seluruh Tanah Jawa, yaitu dengan menewaskan Prabu Brahmanaraja dan Prabu Sri Mahapunggung, serta menaklukkan Prabu Basurata. [cite: 2]
[cite_start]Kisah ini disusun berdasarkan sumber Serat Pustakaraja Purwa karya Ngabehi Ranggawarsita dengan sedikit pengembangan. [cite: 3]
[cite_start]RIWAYAT PRABU CINGKARADEWA PUTRA PRABU SINDULA [cite: 4]
[cite_start]Prabu Sindula (putra Prabu Watugunung) di Kerajaan Medang Galungan dihadap Patih Sukapa dan para punggawa, antara lain Raja Wipara, Raja Dyapara, Raja Yogyapara, dan Raja Capala. [cite: 4, 5]
[cite_start]Mereka sedang membicarakan selesainya pembangunan istana baru di bawah tanah, yang disebut Keraton Gotaka. [cite: 5]
[cite_start]Tiba-tiba datanglah utusan dari Kerajaan Medang Kamulan yang bernama Arya Dwapara (adik Raja Capala). [cite: 6]
[cite_start]Adapun raja Medang Kamulan bernama Prabu Cingkaradewa, tidak lain adalah putra Prabu Sindula sendiri, yang dulu telah diusir dari Medang Galungan. [cite: 7]
[cite_start]Ia bernama asli Raden Sadewa. [cite: 8]
[cite_start]Dari perkawinan Prabu Sindula dan Dewi Tulus (putri Begawan Sukra) telah lahir empat orang anak, yaitu Dewi Ratnadewi, Raden Sadewa, Raden Dewata, dan Raden Jawata. [cite: 8, 9]
[cite_start]Prabu Sindula telah mengusir Raden Sadewa karena putra keduanya itu suka bersetubuh dengan sesama laki-laki. [cite: 9, 16, 17]
[cite_start]Awal kisah tersebut ialah Raden Sadewa jatuh cinta kepada adik Raja Capala yang bernama Dewi Capadi. [cite: 10]
[cite_start]Karena Raden Sadewa cucu Prabu Watugunung, sedangkan Dewi Capadi putri Patih Suwelacala, Raden Sadewa jatuh cinta kepada bibinya sendiri. [cite: 11]
[cite_start]Dewi Capadi menolak karena takut melanggar aturan agama, namun Raden Sadewa berniat memerkosa bibinya itu. [cite: 12, 13]
[cite_start]Karena terus didesak, Dewi Capadi akhirnya nekat bunuh diri, membuat Raden Sadewa sangat berduka. [cite: 14]
[cite_start]Kematian Dewi Capadi membuat Raden Sadewa membenci perempuan dan lebih mencintai laki-laki (homoseksual). [cite: 15, 16]
[cite_start]Raden Sadewa pun pergi meninggalkan Medang Galungan disertai tiga adik Dewi Capadi, yaitu Arya Dwapara, Arya Gandara, dan Arya Kumbina. [cite: 18]
[cite_start]Raden Sadewa berkelana sampai ke Tanah Pagelen, membangun kembali istana Medang Kamulan dan menjadi raja di sana, bergelar Prabu Cingkaradewa. [cite: 19, 20]
[cite_start]Prabu Cingkaradewa menemukan arca emas berwujud Batara Guru yang pada tempat duduknya bertuliskan kalimat filosofis, arca itu kemudian diutus Arya Dwapara untuk dipersembahkan kepada Prabu Sindula sebagai tanda penyesalan. [cite: 21, 22, 23]
[cite_start]Prabu Sindula justru tersinggung, mengusir Arya Dwapara, dan ingin menjatuhkan hukuman mati kepada putranya yang berkelakuan menyimpang itu. [cite: 24, 25, 26]

[cite_start]PRABU CINGKARADEWA MENDATANGI KERAJAAN MEDANG GALUNGAN [cite: 27]
[cite_start]Prabu Cingkaradewa memutuskan menyerahkan nyawa kepada sang ayah di istana Medang Galungan jika dikehendaki mati, dan berangkat dengan pasukannya. [cite: 28, 29]
[cite_start]Prabu Sindula salah paham, mengira Prabu Cingkaradewa datang menyerang, dan mengerahkan pasukan dipimpin Raden Dewata dan Raden Jawata. [cite: 30, 31]
[cite_start]Melihat sesama putranya akan bertempur, Dewi Tulus dan putri sulungnya, Dewi Ratnadewi, bunuh diri terjun ke dalam api. [cite: 32, 33]
[cite_start]Raden Dewata dan Raden Jawata memutuskan pura-pura berperang dan tewas terkena senjata Prabu Cingkaradewa. [cite: 36, 37, 38]
[cite_start]Prabu Sindula yang marah mendatangi medan perang, dan meskipun dinasihati para punggawa bahwa itu sandiwara, ia tidak peduli. [cite: 40, 41]
[cite_start]Prabu Cingkaradewa menyambutnya dengan sembah bakti. [cite: 42]
[cite_start]Malu menyadari kesalahannya, Prabu Sindula kembali ke istana dan mengheningkan cipta melepaskan roh, memutus nyawa sendiri. [cite: 44]
[cite_start]Prabu Cingkaradewa, Raden Dewata, dan Raden Jawata sangat berduka mendengar kematian ayah, ibu, dan kakak sulung mereka. [cite: 45]
[cite_start]Prabu Cingkaradewa diangkat sebagai raja Medang Galungan yang baru, namun ia mengubah namanya menjadi Medang Kamulan. [cite: 46, 47]
[cite_start]Prabu Cingkaradewa mendapat pusaka Pedang Candrahasa dan perintah dari arwah leluhurnya Sri Maharaja Kanwa Pakukuhan untuk menaklukkan Tanah Jawa. [cite: 52, 53, 54]
[cite_start]Prabu Cingkaradewa menaklukkan Kerajaan Gilingwesi dan menewaskan Prabu Brahmanaraja dengan Pedang Candrahasa. [cite: 57, 60, 61]
[cite_start]Setelah menaklukkan Kerajaan Gilingwesi, Prabu Cingkaradewa menyerbu Kerajaan Wirata. [cite: 63]
[cite_start]Prabu Basurata (raja Wirata) yang kalah perang melarikan diri ke Kerajaan Purwacarita untuk meminta perlindungan kepada kakaknya, Prabu Sri Mahapunggung. [cite: 65, 67]
[cite_start]Prabu Cingkaradewa menantang Prabu Sri Mahapunggung bertanding satu lawan satu, dan Prabu Sri Mahapunggung tewas karena kehabisan tenaga karena usianya yang tua. [cite: 69, 71]
[cite_start]Prabu Basurata mengungsi ke Gunung Mahendra, namun Begawan Rukmawati menyarankan ia menyerahkan diri kepada Prabu Cingkaradewa. [cite: 73, 76]
[cite_start]Prabu Cingkaradewa menyesal telah membunuh Prabu Sri Mahapunggung setelah menemukan kitab silsilah yang menunjukkan kedua raja itu adalah paman baginya (putra Batara Wisnu dan adik tiri Prabu Watugunung). [cite: 82, 83, 84]
[cite_start]Prabu Cingkaradewa mengizinkan Prabu Basurata kembali menjadi raja di Wirata, dan menyerahkan Purwacarita kepada Prabu Sri Mahawan (Raden Wandu). [cite: 85]
[cite_start]Prabu Cingkaradewa menjadi penguasa tertinggi Tanah Jawa dan mengganti gelarnya menjadi **Sri Maharaja Purwacandra**. [cite: 88, 89]

## Kisah Sri - Sadana Makahyangan
[cite_start]Ditya Mayangkara diutus Prabu Pulaswa (Kerajaan Medang Kumuwung) untuk menculik Dewi Sri yang mendirikan Desa Sringawanti bersama Raden Sadana. [cite: 90, 91, 92]
[cite_start]Ditya Mayangkara menyamar menjadi sapi liar, mengamuk di desa, lalu dilumpuhkan panah Raden Sadana. [cite: 93, 95, 96, 97]
[cite_start]Raden Sadana membebaskan Ditya Mayangkara karena masih terhitung keponakannya (melalui silsilah Batara Arnapurna putra Batara Wisnu) dan menitipkan pesan tantangan untuk Prabu Pulaswa. [cite: 98, 99, 100, 102]
[cite_start]Prabu Pulaswa memenggal kepala Ditya Mayangkara karena gagal, lalu menyerang Desa Sringawanti. [cite: 106, 111]
[cite_start]Raden Sadana mengerahkan Aji Bayurota, menciptakan angin besar membuat Prabu Pulaswa dan raksasa terhempas jauh. [cite: 113]
[cite_start]Arya Nitiradya diutus Prabu Sri Mahapunggung (ayah Dewi Sri dan Raden Sadana) untuk mengajak mereka pulang, namun Dewi Sri dan Raden Sadana menolak karena sudah senang di Sringawanti. [cite: 114, 115, 120]
[cite_start]Prabu Sri Mahapunggung sangat marah dan mengutuk kedua anaknya menjadi binatang. [cite: 122, 124]
[cite_start]Dewi Sri seketika berubah menjadi ular sawa, sedangkan Raden Sadana berubah wujud menjadi burung sriti. [cite: 125]
[cite_start]Ular sawa (Dewi Sri) dipelihara oleh Kyai Wrigu dan Ken Sangki di Desa Wasutira, dan memberikan nasihat agar bayi mereka, Ken Raketan, tidak dibunuh oleh para dewa yang diutus Batara Guru. [cite: 127, 131, 134, 140, 142, 145, 146, 151, 152, 156, 161]
[cite_start]Para bidadari menjemput Dewi Sri, yang bersedia diangkat menjadi bidadari setelah kutukan diangkat dan Batara Guru memutuskan untuk menukar roh Batari Tiksnawati dengan **Batari Daruni** (yang berdosa zinah dengan Batara Daruna). [cite: 164, 169, 179, 180]
[cite_start]Dewi Sri dijemput menjadi bidadari dengan pedati yang ditarik **Lembu Gumarang** dan cemeti **Nagaserang** sebagai kiasan bahwa ia diangkat sebagai dewi pelindung pertanian di Tanah Jawa. [cite: 183, 186, 189]
[cite_start]Raden Sadana dijemput Batara Narada dan diangkat menjadi **dewa sandang** di kahyangan. [cite: 201, 202]
[cite_start]Ia diuwat dari kutukan burung sriti oleh Begawan Brahmanaresi, menikah dengan Dewi Laksmitawahni dan memiliki putri bernama Dewi Hartati sebelum menjadi dewa. [cite: 168, 198, 200, 201]
`;

// --- SETUP API & SERVER ---

// Kunci API
const GEMINI_API_KEY = "AIzaSyD5Kh4dZNfZJvt5zLgRjbmAaJ_Dz2qP2Tk";

// FIX 1: Menggunakan konfigurasi eksplisit untuk mengatasi masalah "Could not load default credentials".
const genAI = new GoogleGenAI({ 
    apiKey: GEMINI_API_KEY 
});

// HTML Template (Tidak diubah)
const htmlTemplate = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot Wayang - Dalang Digital</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .message-animation {
            animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen">
    <div id="profileModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
            <h2 class="text-2xl font-bold text-amber-900 mb-4">✨ Personalisasi Chatbot</h2>
            <p class="text-gray-600 mb-6">Sesuaikan pengalaman Anda dengan dalang digital</p>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nama Anda</label>
                    <input type="text" id="userName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="Contoh: Budi">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Usia</label>
                    <input type="number" id="userAge" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="Contoh: 25">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tingkat Pengetahuan Wayang</label>
                    <select id="knowledgeLevel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                        <option value="pemula">Pemula - Baru mengenal wayang</option>
                        <option value="menengah">Menengah - Cukup paham wayang</option>
                        <option value="mahir">Mahir - Sangat paham wayang</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Gaya Bahasa</label>
                    <select id="languageStyle" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                        <option value="santai">Santai - Seperti ngobrol dengan teman</option>
                        <option value="formal">Formal - Bahasa yang sopan</option>
                        <option value="tradisional">Tradisional - Bahasa Jawa halus</option>
                    </select>
                </div>
            </div>
            
            <div class="flex gap-3 mt-6">
                <button onclick="cancelProfile()" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    Batal
                </button>
                <button onclick="saveProfile()" class="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
                    Simpan
                </button>
            </div>
        </div>
    </div>

    <div class="container mx-auto max-w-4xl h-screen flex flex-col p-4">
        <div class="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-2xl p-6 shadow-lg">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="text-4xl">🎭</div>
                    <div>
                        <h1 class="text-2xl font-bold">Dalang Digital</h1>
                        <p class="text-amber-100 text-sm">Ahli Cerita Wayang (Prabu Cingkaradewa & Sri-Sadana)</p>
                    </div>
                </div>
                <button onclick="openProfile()" class="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition flex items-center gap-2">
                    <span>⚙️</span>
                    <span id="profileName">Tamu</span>
                </button>
            </div>
        </div>

        <div class="flex-1 bg-white shadow-lg overflow-hidden flex flex-col">
            <div id="chatMessages" class="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                <div class="flex gap-3 message-animation">
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white text-xl">
                            🎭
                        </div>
                    </div>
                    <div class="bg-amber-50 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                        <p class="text-gray-800">Selamat datang! Saya adalah dalang khusus yang hanya menguasai cerita **Prabu Cingkaradewa** dan **Sri-Sadana Makahyangan**. Tanyakan detail tentang tokoh, peristiwa, atau silsilah dalam dua kisah ini saja. 🌟</p>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-200 p-4 bg-gray-50">
                <div class="flex gap-3">
                    <input 
                        type="text" 
                        id="messageInput" 
                        placeholder="Tanyakan tentang Prabu Cingkaradewa atau Dewi Sri/Sadana..."
                        class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        onkeypress="handleKeyPress(event)"
                    >
                    <button 
                        onclick="sendMessage()" 
                        id="sendButton"
                        class="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition flex items-center gap-2 font-medium"
                    >
                        <span>Kirim</span>
                        <span>📤</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="bg-amber-600 text-white text-center py-3 rounded-b-2xl shadow-lg">
            <p class="text-sm">Dipersembahkan dengan ❤️ untuk pelestarian budaya wayang</p>
        </div>
    </div>

    <script>
        // Load profile from localStorage
        function loadProfile() {
            const profile = localStorage.getItem('wayangChatProfile');
            if (profile) {
                const data = JSON.parse(profile);
                document.getElementById('userName').value = data.name || '';
                document.getElementById('userAge').value = data.age || '';
                document.getElementById('knowledgeLevel').value = data.knowledgeLevel || 'pemula';
                document.getElementById('languageStyle').value = data.languageStyle || 'santai';
                document.getElementById('profileName').textContent = data.name || 'Tamu';
            }
        }

        function getProfile() {
            const profile = localStorage.getItem('wayangChatProfile');
            if (profile) {
                return JSON.parse(profile);
            }
            return {
                name: 'Tamu',
                age: '',
                knowledgeLevel: 'pemula',
                languageStyle: 'santai'
            };
        }

        function openProfile() {
            document.getElementById('profileModal').classList.remove('hidden');
        }

        function cancelProfile() {
            document.getElementById('profileModal').classList.add('hidden');
        }

        function saveProfile() {
            const profile = {
                name: document.getElementById('userName').value || 'Tamu',
                age: document.getElementById('userAge').value,
                knowledgeLevel: document.getElementById('knowledgeLevel').value,
                languageStyle: document.getElementById('languageStyle').value
            };
            localStorage.setItem('wayangChatProfile', JSON.stringify(profile));
            document.getElementById('profileName').textContent = profile.name;
            cancelProfile();
            
            // Show success message
            addMessage('bot', \`Profil berhasil disimpan! Sekarang saya akan menyesuaikan jawaban untuk \${profile.name} dengan gaya yang lebih sesuai. 😊\`);
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function addMessage(type, text) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex gap-3 message-animation';
            
            if (type === 'user') {
                messageDiv.classList.add('flex-row-reverse');
                messageDiv.innerHTML = \`
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                            👤
                        </div>
                    </div>
                    <div class="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                        <p>\${text}</p>
                    </div>
                \`;
            } else {
                messageDiv.innerHTML = \`
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white text-xl">
                            🎭
                        </div>
                    </div>
                    <div class="bg-amber-50 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                        <p class="text-gray-800 whitespace-pre-wrap">\${text}</p>
                    </div>
                \`;
            }
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function showTyping() {
            const messagesContainer = document.getElementById('chatMessages');
            const typingDiv = document.createElement('div');
            typingDiv.id = 'typingIndicator';
            typingDiv.className = 'flex gap-3 message-animation';
            typingDiv.innerHTML = \`
                <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white text-xl">
                        🎭
                    </div>
                </div>
                <div class="bg-amber-50 rounded-2xl rounded-tl-none p-4">
                    <div class="flex gap-1">
                        <div class="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                        <div class="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                </div>
            \`;
            messagesContainer.appendChild(typingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function removeTyping() {
            const typing = document.getElementById('typingIndicator');
            if (typing) {
                typing.remove();
            }
        }

        async function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            // Add user message
            addMessage('user', message);
            input.value = '';
            
            // Disable input
            const sendButton = document.getElementById('sendButton');
            sendButton.disabled = true;
            sendButton.classList.add('opacity-50', 'cursor-not-allowed');
            input.disabled = true;
            
            // Show typing indicator
            showTyping();
            
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: message,
                        userProfile: getProfile()
                    })
                });
                
                const data = await response.json();
                
                removeTyping();
                
                if (data.success) {
                    addMessage('bot', data.message);
                } else {
                    addMessage('bot', 'Maaf, terjadi kesalahan. Silakan coba lagi. 🙏');
                }
            } catch (error) {
                removeTyping();
                addMessage('bot', 'Maaf, terjadi kesalahan koneksi. Silakan coba lagi. 🙏');
                console.error('Error:', error);
            } finally {
                // Re-enable input
                sendButton.disabled = false;
                sendButton.classList.remove('opacity-50', 'cursor-not-allowed');
                input.disabled = false;
                input.focus();
            }
        }

        // Load profile on page load
        loadProfile();
    </script>
</body>
</html>
`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, userProfile } = req.body;

        // --- SISTEM PROMPT BARU DENGAN BASIS PENGETAHUAN ---
        const systemPrompt = `Kamu adalah seorang dalang ahli cerita wayang yang bijaksana dan ramah. 
Tugas kamu adalah menjawab pertanyaan TENTANG DUA KISAH BERIKUT SAJA: Prabu Cingkaradewa dan Sri-Sadana Makahyangan. 
Jawablah berdasarkan **HANYA** dari BASIS PENGETAHUAN di bawah. Jika pertanyaan di luar dua kisah ini, katakan bahwa itu di luar keahlian Anda.

# BASIS PENGETAHUAN
${KNOWLEDGE_BASE}

---
PROFIL PENGGUNA:
- Nama: ${userProfile.name || 'Tamu'}
- Usia: ${userProfile.age || 'tidak disebutkan'}
- Tingkat Pengetahuan: ${userProfile.knowledgeLevel || 'pemula'}
- Gaya Bahasa: ${userProfile.languageStyle || 'formal'}

INSTRUKSI PERSONALISASI:
${userProfile.knowledgeLevel === 'pemula' ? 
    '- Jelaskan dengan sederhana, gunakan analogi sehari-hari\n- Hindari istilah teknis yang rumit\n- Berikan konteks dasar sebelum menjelaskan detail' : 
    userProfile.knowledgeLevel === 'menengah' ?
    '- Berikan penjelasan yang cukup detail\n- Boleh menggunakan istilah wayang yang umum\n- Tambahkan fakta menarik' :
    '- Berikan analisis mendalam\n- Gunakan terminologi wayang yang tepat\n- Bahas simbolisme dan filosofi\n- Referensikan sumber dan versi cerita yang berbeda'}

${userProfile.languageStyle === 'santai' ? 
    '- Gunakan bahasa santai dan akrab seperti ngobrol dengan teman\n- Boleh gunakan kata "kamu", "aku"\n- Sesekali gunakan emoji untuk ekspresif' : 
    userProfile.languageStyle === 'formal' ?
    '- Gunakan bahasa formal dan sopan\n- Gunakan kata "Anda", "saya"\n- Hindari kata-kata kasual' :
    '- Gunakan bahasa Jawa halus yang sopan\n- Sisipkan kata-kata Jawa tradisional\n- Tunjukkan penghormatan budaya'}

${userProfile.age && parseInt(userProfile.age) < 15 ?
    '- Gunakan bahasa yang mudah dipahami anak-anak\n- Buat cerita lebih menarik dengan deskripsi yang hidup\n- Fokus pada nilai moral yang mudah dicerna' : ''}

Selalu jawab dengan ramah, informatif, dan sesuai dengan profil pengguna di atas.
**JANGAN** tampilkan konten dari "# BASIS PENGETAHUAN" dalam jawaban Anda.
`;

    // 🛠️ FIX 2: Menggunakan genAI.chats.create()
    const chat = genAI.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemPrompt // Menetapkan sistem prompt yang kini membawa basis pengetahuan
        },
        history: [
            {
                role: 'model',
                parts: [{ text: 'Baik, saya siap membantu. Silakan tanyakan detail spesifik tentang Prabu Cingkaradewa atau Sri-Sadana Makahyangan. Saya tidak tahu cerita wayang lainnya.' }]
            }
        ]
    });

    const result = await chat.sendMessage({ message });
    
    // 💥 FIX 3: Mengakses teks langsung dari objek 'result'
    const text = result.text; 

        res.json({ 
            success: true, 
            message: text 
        });

    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Maaf, terjadi kesalahan saat memproses permintaan AI. Silakan periksa kunci API Anda atau detail error di konsol server.' 
        });
    }
});

// Serve HTML
app.get('/', (req, res) => {
    res.send(htmlTemplate);
});

app.listen(PORT, () => {
    console.log(`🎭 Server Dalang Digital berjalan di http://localhost:${PORT}`);
    console.log(`✨ Buka browser dan mulai bertanya tentang wayang!`);
});
