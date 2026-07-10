const header = document.querySelector(".site-header");
const selector = document.querySelector("#service-selector");
const selectorEmailLink = document.querySelector("#selector-email-link");
const selectorSummary = document.querySelector("#selector-summary");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const updateServiceEmail = () => {
  if (!selector || !selectorEmailLink || !selectorSummary) return;

  const selectedServices = [...selector.querySelectorAll('input[name="services"]:checked')].map(
    (input) => input.value,
  );
  const name = document.querySelector("#selector-name").value.trim();
  const email = document.querySelector("#selector-email").value.trim();
  const notes = document.querySelector("#selector-notes").value.trim();

  const bodyLines = [
    "Hi Nick,",
    "",
    "Please provide a quote for the Garon Park service based on the selections below.",
    "",
    `Name: ${name || "[not provided]"}`,
    `Email: ${email || "[not provided]"}`,
    "",
    "Selected service areas:",
    ...(selectedServices.length ? selectedServices.map((service) => `- ${service}`) : ["- [none selected yet]"]),
    "",
    "Notes:",
    notes || "[no additional notes]",
    "",
    "Thanks,",
  ];

  const subject = encodeURIComponent("Garon Park service quote request");
  const body = encodeURIComponent(bodyLines.join("\n"));
  selectorEmailLink.href = `mailto:nick@therevenueclub.co.uk?subject=${subject}&body=${body}`;
  selectorSummary.textContent = selectedServices.length
    ? `${selectedServices.length} service area${selectedServices.length === 1 ? "" : "s"} selected.`
    : "Select at least one service area to build your quote request.";
};

if (selector) {
  selector.addEventListener("input", updateServiceEmail);
  selector.addEventListener("change", updateServiceEmail);
  updateServiceEmail();
}
