/* Shared form handling for the assessment pages. HTML validation runs first. */
document.querySelectorAll("[data-api-form]").forEach(form => {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById("form-status");
    const payload = Object.fromEntries(new FormData(form).entries());
    if (payload.rating) payload.rating = Number(payload.rating);
    button.disabled = true;
    button.textContent = "Submitting…";
    status.textContent = "";
    try {
      const response = await fetch(form.dataset.apiForm, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Submission failed.");
      status.textContent = result.message + " Your form data has been saved.";
      status.className = "success";
      form.reset();
    } catch (error) {
      status.textContent = error.message + " Make sure the Cinevo server is running.";
      status.className = "error";
    } finally {
      button.disabled = false;
      button.textContent = form.dataset.apiForm === "/api/contact" ? "Send message" : "Submit feedback";
    }
  });
});
