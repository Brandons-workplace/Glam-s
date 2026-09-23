document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. PENGATURAN JAM OPERASIONAL
  // ==========================================
  const openingHour = 10;  // Jam buka (10:00)
  const closingHour = 19; // Jam tutup (19:00)

  // ==========================================
  // 2. CEK STATUS BUKA / TUTUP SALON
  // ==========================================
  const statusBadge = document.getElementById("statusSalon");
  if (statusBadge) {
    const currentHour = new Date().getHours();
    if (currentHour >= openingHour && currentHour < closingHour) {
      statusBadge.textContent = "• Buka Sekarang (10.00 - 19.00 WIB)";
      statusBadge.classList.add("open");
    } else {
      statusBadge.textContent = "• Tutup Sekarang (Buka 10.00 - 19.00 WIB)";
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

      const waUrl = `https://wa.me/6285725133614?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
    });
  }

  // ==========================================
  // 4. KONTROL MODAL PRICELIST & PROMO
  // ==========================================
  
  // Fungsi Helper Modal
  function setupModal(openBtnId, closeBtnId, modalId) {
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);
    const modal = document.getElementById(modalId);

    if (openBtn && modal) {
      openBtn.addEventListener("click", function () {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Kunci scroll halaman utama
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
  }

  // Setup Modal Pricelist
  setupModal("openPricelistBtn", "closePricelistBtn", "pricelistModal");

  // Setup Modal Promo
  setupModal("openPromoBtn", "closePromoBtn", "promoModal");
});