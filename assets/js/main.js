document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "a") {
        navLinks.classList.remove("open");
      }
    });
  }

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  function setupAppointmentForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput && !dateInput.value) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      dateInput.value = `${year}-${month}-${day}`;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.querySelector('input[name="name"]')?.value.trim();
      const mobile = form.querySelector('input[name="mobile"]')?.value.trim();
      const email = form.querySelector('input[name="email"]')?.value.trim();
      const date = form.querySelector('input[name="date"]')?.value;
      const time = form.querySelector('select[name="time"]')?.value;

      const errors = [];

      if (!name) errors.push("Full Name is required.");
      if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
        errors.push("Please enter a valid 10 digit mobile number.");
      }
      if (!email) errors.push("Email is required.");
      if (!date) errors.push("Please select a date.");
      if (!time) errors.push("Please select a time slot.");

      if (date) {
        const chosenDate = new Date(date);
        const dayOfWeek = chosenDate.getUTCDay();
        if (dayOfWeek === 0) {
          errors.push("Clinic is closed on Sundays. Please choose another date.");
        }
      }

      if (errors.length) {
        alert(errors.join("\n"));
        return;
      }

      alert(
        `Thank you ${name}!\n\nYour appointment request has been recorded for ${date} at ${time}.\nThe clinic will contact you on ${mobile} to confirm your visit.`
      );

      form.reset();
    });
  }

  setupAppointmentForm("home-appointment-form");
  setupAppointmentForm("contact-appointment-form");
});

