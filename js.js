document.addEventListener('DOMContentLoaded', function () {

  /* ---------- LIGHTBOX (Gallery) ---------- */
  const lightboxThumbs = document.querySelectorAll('.lightbox-thumb');
  const modal = document.getElementById('lightboxModal');
  const modalImage = document.getElementById('lightboxImage');
  const modalClose = modal ? modal.querySelector('.modal-close') : null;

  if (lightboxThumbs && modal && modalImage && modalClose) {
    lightboxThumbs.forEach(img => {
      img.addEventListener('click', () => {
        modalImage.src = img.src;
        modalImage.alt = img.alt || 'Image';
        modal.classList.remove('hidden');
      });
    });
    modalClose.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  /* ---------- NEWS / Company Registration Info ---------- */
  const registrationItems = [
    { name: "Company Name Reservation (CIPC)", description: "Reserve your company name with the Companies and Intellectual Property Commission (CIPC).", price: 50 },
    { name: "Private Company (Pty) Ltd Registration", description: "Register a private company online through CIPC.", price: 125 },
    { name: "Income Tax Registration (SARS)", description: "Register your company for income tax automatically with SARS.", price: 0 },
    { name: "Business License (if applicable)", description: "Obtain necessary municipal or national licenses for your business.", price: 500 },
    { name: "Domain Registration (.co.za)", description: "Register your business domain for a year.", price: 85 },
    { name: "B-BBEE Affidavit", description: "Obtain a B-BBEE certificate for your business.", price: 0 }
  ];

  const itemsListDiv = document.getElementById("itemsList");
  const infoBox = document.getElementById("itemInfo");
  const itemTitle = document.getElementById("itemTitle");
  const itemDesc = document.getElementById("itemDesc");
  const itemPrice = document.getElementById("itemPrice");

  if (itemsListDiv && infoBox && itemTitle && itemDesc && itemPrice) {
    registrationItems.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "item-button";
      btn.textContent = item.name;

      btn.addEventListener("click", () => {
        itemTitle.textContent = item.name;
        itemDesc.textContent = item.description;
        itemPrice.textContent = item.price.toLocaleString('en-ZA'); // Rands formatting
        infoBox.classList.add("active");
        infoBox.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      itemsListDiv.appendChild(btn);
    });
  }

  /* ---------- REGISTRATION FORM ---------- */
  const registerForm = document.querySelector("#register form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(registerForm);
      const fullname = formData.get("fullname").trim();
      const email = formData.get("email").trim();
      const password = formData.get("password").trim();
      const company = formData.get("company_name").trim();
      const problem = formData.get("problem_description").trim();
      const files = formData.getAll("problem_files[]");

      if (!fullname || !email || !password || !company || !problem) {
        alert("⚠️ Please fill in all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("⚠️ Please enter a valid email address.");
        return;
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9}$/;
      if (!passwordRegex.test(password)) {
        alert("⚠️ Password must be 9 characters long, include 1 uppercase, 1 number, and 1 special character.");
        return;
      }

      const phone = formData.get("cellphone").trim();
      const phoneRegex = /^\+27\d{9}$/;
      if (!phoneRegex.test(phone)) {
        alert("⚠️ Cellphone number must start with +27 and have 9 digits after.");
        return;
      }

      const companyReg = formData.get("company_reg").trim();
      if (companyReg && !/^\d+$/.test(companyReg)) {
        alert("⚠️ Company registration number must be numbers only.");
        return;
      }

      for (let file of files) {
        const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"];
        if (!allowed.includes(file.type)) {
          alert(`⚠️ File type not allowed: ${file.name}`);
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert(`⚠️ File too large: ${file.name} (max 5MB)`);
          return;
        }
      }

      try {
        const response = await fetch("register_process.php", {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          alert("✅ Registration submitted successfully! We’ll contact you soon.");
          registerForm.reset();
        } else {
          const result = await response.text();
          alert("❌ Submission failed: " + result);
        }
      } catch (error) {
        console.error(error);
        alert("⚠️ Something went wrong while submitting the form.");
      }
    });
  }

});
// Your services (you can add more easily)
const services = [
  {
    id: 1,
    title: "Company Registration (PTY LTD)",
    desc: "Complete CIPC company registration with documents.",
    price: 450,
    agent: "Agent Lebo"
  },
  {
    id: 2,
    title: "Name Reservation",
    desc: "Reserve your company name with CIPC.",
    price: 75,
    agent: "Agent Thabo"
  },
  {
    id: 3,
    title: "BEE Certificate",
    desc: "Basic BEE certificate for startups.",
    price: 250,
    agent: "Agent Naledi"
  },
  {
    id: 4,
    title: "Tax Clearance (SARS)",
    desc: "Tax clearance pin for tenders and compliance.",
    price: 350,
    agent: "Agent Kgomotso"
  }
];

const serviceSelect = document.getElementById("serviceSelect");
const itemTitle = document.getElementById("itemTitle");
const itemDesc = document.getElementById("itemDesc");
const itemPrice = document.getElementById("itemPrice");
const itemAgent = document.getElementById("itemAgent");

// Load dropdown services
services.forEach(service => {
  const option = document.createElement("option");
  option.value = service.id;
  option.textContent = service.title;
  serviceSelect.appendChild(option);
});

// When user selects a service
serviceSelect.addEventListener("change", () => {
  const selected = services.find(s => s.id == serviceSelect.value);

  if (!selected) {
    itemTitle.textContent = "";
    itemDesc.textContent = "";
    itemPrice.textContent = "";
    itemAgent.textContent = "";
    return;
  }

  itemTitle.textContent = selected.title;
  itemDesc.textContent = selected.desc;
  itemPrice.textContent = selected.price;
  itemAgent.textContent = selected.agent;
});
const whatsappLink = document.getElementById("whatsappLink");
const emailLink = document.getElementById("emailLink");
const contactOptions = document.getElementById("contactOptions");

const ticketForm = document.getElementById("ticketForm");
const openTicket = document.getElementById("openTicket");
const closeTicket = document.getElementById("closeTicket");
const ticketSubmitForm = document.getElementById("ticketSubmitForm");

// When user selects a service
serviceSelect.addEventListener("change", () => {
  const selected = services.find(s => s.id == serviceSelect.value);

  if (!selected) {
    itemTitle.textContent = "";
    itemDesc.textContent = "";
    itemPrice.textContent = "";
    itemAgent.textContent = "";
    contactOptions.style.display = "none";
    return;
  }

  itemTitle.textContent = selected.title;
  itemDesc.textContent = selected.desc;
  itemPrice.textContent = selected.price;
  itemAgent.textContent = selected.agent;

  contactOptions.style.display = "block";

  // WhatsApp link
  whatsappLink.href =
    `https://wa.me/27632848222?text=Hello, I need help with: ${encodeURIComponent(selected.title)}`;

  // Email link
  emailLink.href =
    `mailto:mahlatsenorman2@gmail.com?subject=Help with ${encodeURIComponent(selected.title)}&body=Hello, I need assistance with: ${selected.title}.`;
});

// Ticket form
openTicket.addEventListener("click", () => {
  ticketForm.style.display = "block";
});

closeTicket.addEventListener("click", () => {
  ticketForm.style.display = "none";
});

// Submit ticket
ticketSubmitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("✅ Ticket submitted successfully! Our team will respond shortly.");

  ticketSubmitForm.reset();
  ticketForm.style.display = "none";
});
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('login');
const registerSection = document.getElementById('register');
const welcomeSection = document.getElementById('welcome');

// Registration Validation
registrationForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const cellphone = document.getElementById('cellphone').value.trim();
  const regNum = document.getElementById('company_reg').value.trim();
  const password = document.getElementById('password').value.trim();
  const email = document.getElementById('email').value.trim();

  const phonePattern = /^\+27\d{10}$/;
  if (!phonePattern.test(cellphone)) {
    alert('❌ Cellphone must start with +27 followed by 10 digits.');
    return;
  }

  if (regNum && !/^\d+$/.test(regNum)) {
    alert('❌ Company registration number must contain numbers only.');
    return;
  }

  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9}$/;
  if (!passwordPattern.test(password)) {
    alert('❌ Password must have at least 1 uppercase, 1 number, 1 special character, and be 9 characters long.');
    r

