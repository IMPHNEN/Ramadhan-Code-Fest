let names = [];

document.getElementById("nameInput").addEventListener("input", function() {
    const inputText = this.value;
    const newNames = inputText.split('\n').map(name => name.trim()).filter(name => name !== "");
    names = [...newNames];
    updateNameList();
});

function updateNameList() {
    const nameList = document.getElementById("nameList");
    nameList.innerHTML = "";
    names.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        nameList.appendChild(li);
        nameList.appendChild(document.createElement("hr")); // Tambahkan tag <hr> setelah setiap nama
    });
}

function startSpin() {
    if (names.length === 0) {
        alert("Please enter at least one name.");
        return;
    }
    
    const spinTime = 4000; // Durasi putaran dalam milidetik
    const winnerIndex = Math.floor(Math.random() * names.length);
    const winner = names[winnerIndex];
    
    const nameList = document.getElementById("nameListContainer"); // Ambil elemen daftar nama
    nameList.classList.add("hidden"); // Sembunyikan daftar nama
    
    const spinningElement = document.getElementById("spinning");
    spinningElement.style.display = "block"; // Menampilkan pesan spinning
    spinningElement.style.animation = "spin 4s linear"; // Mulai animasi spin
    
    setTimeout(() => {
        const modal = document.getElementById("myModal"); // Ambil elemen modal box
        modal.style.display = "block"; // Tampilkan modal box
        
        const modalWinnerElement = document.getElementById("modalWinner");
        modalWinnerElement.textContent = winner; // Set nama pemenang pada modal box
        modalWinnerElement.classList.add("modalWinner"); // Tambahkan kelas modalWinner
        
        // Hapus nama yang terpilih dari daftar dan input
        names.splice(winnerIndex, 1);
        updateNameList();
        updateInputNames();
        
        spinningElement.style.display = "none"; // Sembunyikan pesan spinning setelah animasi selesai
        
        // Tampilkan kembali daftar nama setelah animasi selesai
        nameList.classList.remove("hidden");
    }, spinTime);
}

function updateInputNames() {
    const inputText = names.join('\n');
    document.getElementById("nameInput").value = inputText;
}

// Menangkap elemen tombol close
const closeModal = document.getElementsByClassName("close")[0];

// Saat pengguna mengklik tombol close, tutup modal
closeModal.onclick = function() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Saat pengguna mengklik di luar modal, tutup modal
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}