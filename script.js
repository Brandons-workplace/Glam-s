document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. PENGATURAN JAM OPERASIONAL
  // ==========================================
  const openingHour = 9;  // Jam buka (09:00)
  const closingHour = 18; // Jam tutup (18:00)

  // ==========================================
  // 2. CEK STATUS BUKA / TUTUP SALON
  // ==========================================
  const statusBadge = document.getElementById("statusSalon");
  if (statusBadge) {
    const currentHour = new Date().getHours();
    if (currentHour >= openingHour && currentHour < closingHour) {
      statusBadge.textContent = "• Buka Sekarang (09.00 - 18.00 WIB)";
      statusBadge.classList.add("open");
    } else {
      statusBadge.textContent = "• Tutup Sekarang (Buka 09.00 - 18.00 WIB)";
      statusBadge.classList.add("closed");
    }
  }

  // ==========================================
  // 3. KIRIM RESERVASI LANGSUNG KE WHATSAPP
  // ==========================================
  const btnWhatsapp = document.getElementById("btnWhatsapp");
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", function () {
      const dateInput = document.getElementById("bookingDate").value;

      let message = "Halo Glam's Beauty Salon, saya ingin reservasi slot treatment.";

      // Jika pengguna memilih tanggal, tambahkan ke pesan
      if (dateInput) {
        const formattedDate = new Date(dateInput).toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        message += `\n\n• *Rencana Kedatangan:* ${formattedDate}`;
      }

      message += "\n\nApakah slot masih tersedia? Terima kasih!";

      // Mengarahkan ke nomor 6285725133614 beserta teks pesan
      const waUrl = `https://wa.me/6285725133614?text=${encodeURIComponent(message)}`;

      // Buka langsung ke WhatsApp di tab/aplikasi baru
      window.open(waUrl, "_blank");
    });
  }

  // ==========================================
  // 4. KONTROL MODAL PRICELIST
  // ==========================================
  const openBtn = document.getElementById("openPricelistBtn");
  const closeBtn = document.getElementById("closePricelistBtn");
  const modal = document.getElementById("pricelistModal");

  if (openBtn && modal) {
    openBtn.addEventListener("click", function () {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // Kunci scroll halaman belakang
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});