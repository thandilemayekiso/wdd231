document.addEventListener("DOMContentLoaded", () => {
  // Set the timestamp
  document.getElementById("timestamp").value = new Date().toISOString();

  // Open modals
  document.querySelectorAll(".membership-cards a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const modal = document.getElementById(targetId);
      if (modal) modal.showModal();
    });
  });

  // Set year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
});
