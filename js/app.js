// Mock data for demonstration. Kept in this file so the prototype works when
// opened directly from index.html without a local server.
const users = [
  { id: 1, role: "admin", username: "admin1", password: "admin123" },
  { id: 2, role: "admin", username: "admin2", password: "admin123" },
  { id: 3, role: "admin", username: "monisha", password: "123" },
  { id: 4, role: "owner", username: "jane.doe", password: "owner123" },
  { id: 5, role: "owner", username: "john.smith", password: "owner123" },
  { id: 8, role: "owner", username: "moni", password: "1234" },
];

const pets = [
  { id: 1, ownerId: 4, name: "Bella", species: "Dog", breed: "Labrador", age: 3 },
  { id: 2, ownerId: 4, name: "Charlie", species: "Dog", breed: "Beagle", age: 1 },
  { id: 3, ownerId: 5, name: "Milo", species: "Cat", breed: "Siamese", age: 2 },
  { id: 4, ownerId: 5, name: "Luna", species: "Cat", breed: "Persian", age: 4 },
  { id: 5, ownerId: 5, name: "Rocky", species: "Dog", breed: "Bulldog", age: 6 },
  { id: 6, ownerId: 8, name: "Simba", species: "Cat", breed: "Maine Coon", age: 3 },
  { id: 7, ownerId: 8, name: "Daisy", species: "Dog", breed: "Poodle", age: 2 },
  { id: 8, ownerId: 8, name: "Max", species: "Dog", breed: "Pug", age: 5 },
  { id: 9, ownerId: 8, name: "Chloe", species: "Cat", breed: "Sphynx", age: 1 },
  { id: 10, ownerId: 8, name: "Buster", species: "Dog", breed: "Golden Retriever", age: 4 },
];

const appointments = [
  { id: 1, petId: 1, ownerId: 4, date: "2024-09-15", time: "10:00", status: "Completed", reason: "Vaccination" },
  { id: 2, petId: 2, ownerId: 4, date: "2024-09-18", time: "09:00", status: "Scheduled", reason: "Grooming" },
  { id: 3, petId: 3, ownerId: 5, date: "2024-09-20", time: "14:30", status: "Completed", reason: "Check-up" },
  { id: 4, petId: 4, ownerId: 5, date: "2024-09-21", time: "11:00", status: "Scheduled", reason: "Vaccination" },
  { id: 5, petId: 5, ownerId: 5, date: "2024-09-25", time: "16:00", status: "Scheduled", reason: "Dental" },
  { id: 6, petId: 6, ownerId: 8, date: "2024-09-22", time: "10:30", status: "Completed", reason: "Check-up" },
  { id: 7, petId: 7, ownerId: 8, date: "2024-09-23", time: "08:30", status: "Scheduled", reason: "Surgery" },
  { id: 8, petId: 8, ownerId: 8, date: "2024-09-26", time: "12:00", status: "Scheduled", reason: "Vaccination" },
  { id: 9, petId: 9, ownerId: 8, date: "2024-09-27", time: "14:00", status: "Scheduled", reason: "Check-up" },
  { id: 10, petId: 10, ownerId: 8, date: "2024-09-28", time: "15:30", status: "Scheduled", reason: "Grooming" },
  { id: 11, petId: 6, ownerId: 8, date: "2024-10-05", time: "09:00", status: "Scheduled", reason: "Follow-up" },
  { id: 12, petId: 7, ownerId: 8, date: "2024-10-10", time: "10:00", status: "Scheduled", reason: "Follow-up" },
];

function getPetsByOwner(ownerId) {
  return pets.filter((p) => p.ownerId === ownerId);
}

function getAppointmentsByOwner(ownerId) {
  return appointments.filter((a) => a.ownerId === ownerId);
}

// ---------- Theme toggle ----------
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const current = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", current);
  themeToggle.textContent = current === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  themeToggle.addEventListener("click", () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
}

// ---------- Navigation Logic ----------
const contentContainer = document.getElementById("appContent");
const pageTitle = document.getElementById("pageTitle");
const navButtons = document.querySelectorAll(".nav-btn");

let currentOwnerId = null; // Track logged in owner ID

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Update active state
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const view = btn.dataset.view;
    pageTitle.textContent = btn.textContent; // Update topbar title
    renderView(view);
  });
});

// Initial render
renderView("admin-login");

function renderView(view) {
  contentContainer.innerHTML = ""; // Clear current view
  
  switch (view) {
    // Admin Views
    case "admin-login": return renderAdminLogin();
    case "admin-pets": return renderPetManagement();
    case "admin-appointments": return renderAppointmentManagement();
    case "admin-users": return renderUserManagement();
    case "admin-reports": return renderReports();
    
    // Owner Views
    case "owner-register": return renderOwnerRegistration();
    case "owner-login": return renderOwnerLogin();
    case "owner-pet-reg": return renderPetRegistration();
    case "owner-view-pets": return renderOwnerPets();
    case "owner-book-appt": return renderBooking();
    case "owner-status": return renderAppointmentStatus();
    case "owner-history": return renderBookingHistory();
    case "owner-profile": return renderProfileManagement();
    
    default: contentContainer.innerHTML = `<p>View not found.</p>`;
  }
}

// ---------- Admin Renderers ----------
function renderAdminLogin() {
  contentContainer.innerHTML = `
    <section class="admin-login-view">
      <div class="login-dashboard">
        <div class="dashboard-hero">
          <p class="eyebrow">PetCare Admin</p>
          <h2>Clinic Dashboard Login</h2>
          <p>Sign in to manage pets, owners, bookings, and care reports from one place.</p>
        </div>
        <div class="dashboard-stats">
          <div class="stat-card">
            <span>${pets.length}</span>
            <p>Pets</p>
          </div>
          <div class="stat-card">
            <span>${users.filter(user => user.role === "owner").length}</span>
            <p>Owners</p>
          </div>
          <div class="stat-card">
            <span>${appointments.length}</span>
            <p>Bookings</p>
          </div>
        </div>
        <div class="card login-panel">
          <form id="adminLoginForm">
            <label>Username <input type="text" name="username" placeholder="admin1" required /></label>
            <label>Password <input type="password" name="password" placeholder="admin123" required /></label>
            <button type="submit" class="btn primary">Login</button>
          </form>
        </div>
      </div>
      <div class="card activity-panel">
        <div class="activity-heading">
          <p class="eyebrow">Live Preview</p>
          <h2>Pet owner cards</h2>
        </div>
        <div class="people-card-grid" aria-label="Pet owner highlights">
          <article class="person-card">
            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80" alt="Bella the Labrador" />
            <div>
              <span class="status-pill">Vaccinated</span>
              <h3>Jane Doe</h3>
              <p>Bella and Charlie are booked for grooming and wellness visits.</p>
              <strong>2 pets</strong>
            </div>
          </article>
          <article class="person-card">
            <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=500&q=80" alt="Milo the Siamese cat" />
            <div>
              <span class="status-pill">Follow-up</span>
              <h3>John Smith</h3>
              <p>Milo, Luna, and Rocky have active care records in the clinic.</p>
              <strong>3 pets</strong>
            </div>
          </article>
          <article class="person-card">
            <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=500&q=80" alt="Daisy the dog" />
            <div>
              <span class="status-pill">Scheduled</span>
              <h3>Moni</h3>
              <p>Daisy, Max, Chloe, Simba, and Buster have upcoming appointments.</p>
              <strong>5 pets</strong>
            </div>
          </article>
        </div>
      </div>
    </section>`;
  document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const u = data.get("username"), p = data.get("password");
    const admin = users.find(user => user.role === "admin" && user.username === u && user.password === p);
    if (admin) {
      alert(`Welcome Admin ${u}!`);
      // Unhide secure admin tabs
      document.querySelectorAll('.auth-admin').forEach(el => el.style.display = 'block');
      // Go through to Pet Management view
      const petBtn = document.querySelector('[data-view="admin-pets"]');
      if(petBtn) petBtn.click();
    } else {
      alert("Invalid credentials");
    }
  });
}

function renderPetManagement() {
  const rows = pets.map(p => `<tr><td>${p.id}</td><td>${p.ownerId}</td><td>${p.name}</td><td>${p.species}</td><td>${p.breed}</td><td>${p.age}</td></tr>`).join("");
  contentContainer.innerHTML = `
    <div class="card">
      <table class="table">
        <thead><tr><th>ID</th><th>Owner ID</th><th>Name</th><th>Species</th><th>Breed</th><th>Age</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="card">
      <h2>Add New Pet</h2>
      <form id="addPetForm">
        <label>Owner ID <input type="number" name="ownerId" required /></label>
        <label>Name <input type="text" name="name" required /></label>
        <label>Species <input type="text" name="species" required /></label>
        <label>Breed <input type="text" name="breed" required /></label>
        <label>Age <input type="number" name="age" required /></label>
        <button type="submit" class="btn secondary">Add Pet</button>
      </form>
    </div>`;
  document.getElementById("addPetForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    pets.push({ id: pets.length + 1, ownerId: Number(f.get("ownerId")), name: f.get("name"), species: f.get("species"), breed: f.get("breed"), age: Number(f.get("age")) });
    alert("Pet added!");
    renderPetManagement(); // Re-render table
  });
}

function renderAppointmentManagement() {
  const rows = appointments.map(a => `<tr><td>${a.id}</td><td>${a.petId}</td><td>${a.ownerId}</td><td>${a.date}</td><td>${a.time}</td><td>${a.status}</td><td>${a.reason}</td></tr>`).join("");
  contentContainer.innerHTML = `
    <div class="card">
      <table class="table">
        <thead><tr><th>ID</th><th>Pet ID</th><th>Owner ID</th><th>Date</th><th>Time</th><th>Status</th><th>Reason</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="card">
      <h2>Schedule New Appointment</h2>
      <form id="addApptForm">
        <label>Pet ID <input type="number" name="petId" required /></label>
        <label>Owner ID <input type="number" name="ownerId" required /></label>
        <label>Date <input type="date" name="date" required /></label>
        <label>Time <input type="time" name="time" required /></label>
        <label>Status <select name="status"><option>Scheduled</option><option>Completed</option><option>Cancelled</option></select></label>
        <label>Reason <input type="text" name="reason" required /></label>
        <button type="submit" class="btn secondary">Add Appointment</button>
      </form>
    </div>`;
  document.getElementById("addApptForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    appointments.push({ id: appointments.length + 1, petId: Number(f.get("petId")), ownerId: Number(f.get("ownerId")), date: f.get("date"), time: f.get("time"), status: f.get("status"), reason: f.get("reason") });
    alert("Appointment added!");
    renderAppointmentManagement();
  });
}

function renderUserManagement() {
  const rows = users.map(u => `<tr><td>${u.id}</td><td>${u.role}</td><td>${u.username}</td></tr>`).join("");
  contentContainer.innerHTML = `
    <div class="card">
      <table class="table">
        <thead><tr><th>ID</th><th>Role</th><th>Username</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function renderReports() {
  contentContainer.innerHTML = `
    <div class="card">
      <h2>Appointments Overview</h2>
      <div class="chart-container">
        <canvas id="reportsChart"></canvas>
      </div>
    </div>`;
  
  const counts = {};
  appointments.forEach(a => {
    counts[a.date] = (counts[a.date] || 0) + 1;
  });
  const labels = Object.keys(counts).sort();
  const data = labels.map(d => counts[d]);
  
  const ctx = document.getElementById('reportsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Appointments per Day',
        data,
        backgroundColor: 'rgba(47, 216, 178, 0.7)',
        borderColor: '#2fd8b2',
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: getComputedStyle(document.body).getPropertyValue('--color-text') } } },
      scales: {
        x: { ticks: { color: '#bbb' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        y: { beginAtZero: true, ticks: { color: '#bbb', stepSize: 1 }, grid: { color: 'rgba(255,255,255,0.1)' } }
      }
    }
  });
}

// ---------- Owner Renderers ----------
function renderOwnerRegistration() {
  contentContainer.innerHTML = `
    <div class="card">
      <form id="ownerRegForm">
        <label>Username <input type="text" name="username" required /></label>
        <label>Password <input type="password" name="password" required /></label>
        <button type="submit" class="btn primary">Register</button>
      </form>
    </div>`;
  document.getElementById("ownerRegForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    users.push({ id: users.length + 1, role: "owner", username: f.get("username"), password: f.get("password") });
    alert("Registration successful. Please login.");
  });
}

function renderOwnerLogin() {
  contentContainer.innerHTML = `
    <div class="card">
      <form id="ownerLoginForm">
        <label>Username <input type="text" name="username" required /></label>
        <label>Password <input type="password" name="password" required /></label>
        <button type="submit" class="btn primary">Login</button>
      </form>
    </div>`;
  document.getElementById("ownerLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const u = f.get("username"), p = f.get("password");
    const owner = users.find(user => user.role === "owner" && user.username === u && user.password === p);
    if (owner) {
      currentOwnerId = owner.id;
      alert(`Welcome ${u}! You are now logged in.`);
      // Unhide secure owner tabs
      document.querySelectorAll('.auth-owner').forEach(el => el.style.display = 'block');
      // Go through to View Pets view
      const viewPetsBtn = document.querySelector('[data-view="owner-view-pets"]');
      if(viewPetsBtn) viewPetsBtn.click();
    } else {
      alert("Invalid credentials");
    }
  });
}

function checkLogin() {
  if (!currentOwnerId) {
    contentContainer.innerHTML = `<div class="card"><p>Please login first.</p></div>`;
    return false;
  }
  return true;
}

function renderPetRegistration() {
  if (!checkLogin()) return;
  contentContainer.innerHTML = `
    <div class="card">
      <form id="petRegForm">
        <label>Name <input type="text" name="name" required /></label>
        <label>Species <input type="text" name="species" required /></label>
        <label>Breed <input type="text" name="breed" required /></label>
        <label>Age <input type="number" name="age" required /></label>
        <button type="submit" class="btn secondary">Add Pet</button>
      </form>
    </div>`;
  document.getElementById("petRegForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    pets.push({ id: pets.length + 1, ownerId: currentOwnerId, name: f.get("name"), species: f.get("species"), breed: f.get("breed"), age: Number(f.get("age")) });
    alert("Pet registered!");
  });
}

function renderOwnerPets() {
  if (!checkLogin()) return;
  const myPets = getPetsByOwner(currentOwnerId);
  const rows = myPets.map(p => `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.species}</td><td>${p.breed}</td><td>${p.age}</td></tr>`).join("");
  contentContainer.innerHTML = `
    <div class="card">
      <table class="table">
        <thead><tr><th>ID</th><th>Name</th><th>Species</th><th>Breed</th><th>Age</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function renderBooking() {
  if (!checkLogin()) return;
  const myPets = getPetsByOwner(currentOwnerId);
  const petOptions = myPets.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
  contentContainer.innerHTML = `
    <div class="card">
      <form id="bookingForm">
        <label>Pet <select name="petId" required>${petOptions}</select></label>
        <label>Date <input type="date" name="date" required /></label>
        <label>Time <input type="time" name="time" required /></label>
        <label>Reason <input type="text" name="reason" required /></label>
        <button type="submit" class="btn primary">Book Appointment</button>
      </form>
    </div>`;
  document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    appointments.push({ id: appointments.length + 1, petId: Number(f.get("petId")), ownerId: currentOwnerId, date: f.get("date"), time: f.get("time"), status: "Scheduled", reason: f.get("reason") });
    alert("Appointment booked!");
  });
}

function renderAppointmentStatus() {
  if (!checkLogin()) return;
  const myAppts = getAppointmentsByOwner(currentOwnerId);
  const rows = myAppts.map(a => `<tr><td>${a.id}</td><td>${a.petId}</td><td>${a.date}</td><td>${a.time}</td><td><span style="color:var(--color-primary);">${a.status}</span></td></tr>`).join("");
  contentContainer.innerHTML = `
    <div class="card">
      <table class="table">
        <thead><tr><th>ID</th><th>Pet ID</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function renderBookingHistory() {
  renderAppointmentStatus(); // Shared logic for prototype simplicity
}

function renderProfileManagement() {
  if (!checkLogin()) return;
  const owner = users.find(u => u.id === currentOwnerId);
  contentContainer.innerHTML = `
    <div class="card">
      <p><strong>Username:</strong> ${owner.username}</p>
      <p><strong>Role:</strong> ${owner.role}</p>
      <hr style="border:1px solid rgba(255,255,255,0.05); margin: 1rem 0;">
      <h3>Change Password</h3>
      <form id="pwdForm">
        <label>New Password <input type="password" name="newPwd" required /></label>
        <button type="submit" class="btn secondary">Update Password</button>
      </form>
    </div>`;
  document.getElementById("pwdForm").addEventListener("submit", (e) => {
    e.preventDefault();
    owner.password = new FormData(e.target).get("newPwd");
    alert("Password updated.");
  });
}
