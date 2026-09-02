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

// ---------- Global State & User Management ----------
let currentUser = null; // { id, username, role }

// ---------- Toast Notification System ----------
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const iconClass = type === "success" ? "fa-circle-check" : "fa-circle-exclamation";
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "slideInRight 0.3s ease reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---------- Theme toggle ----------
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const current = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", current);
  themeToggle.innerHTML = current === "dark" ? '<i class="fa-solid fa-sun"></i> Light Mode' : '<i class="fa-solid fa-moon"></i> Dark Mode';
  
  themeToggle.addEventListener("click", () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.innerHTML = newTheme === "dark" ? '<i class="fa-solid fa-sun"></i> Light Mode' : '<i class="fa-solid fa-moon"></i> Dark Mode';
  });
}

// ---------- Navigation Logic ----------
const contentContainer = document.getElementById("appContent");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const navButtons = document.querySelectorAll(".nav-btn");
const logoutBtn = document.getElementById("logoutBtn");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const view = btn.dataset.view;
    updateHeader(view, btn.textContent.trim());
    renderView(view);
  });
});

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    currentUser = null;
    updateUserBadge();
    document.querySelectorAll('.auth-admin, .auth-owner').forEach(el => el.style.display = 'none');
    showToast("Logged out successfully", "info");
    const loginBtn = document.querySelector('[data-view="admin-login"]');
    if (loginBtn) loginBtn.click();
  });
}

function updateHeader(view, title) {
  if (pageTitle) pageTitle.textContent = title;
  
  const subtitles = {
    "admin-login": "Sign in with administrator credentials to manage campus pet ERP",
    "admin-pets": "Comprehensive register of all registered pets and owners",
    "admin-appointments": "Schedule and manage veterinary consultations and treatments",
    "admin-users": "Directory of system administrative and pet owner accounts",
    "admin-reports": "Real-time analytics and clinic appointment metrics",
    "owner-register": "Create a new pet owner account",
    "owner-login": "Access your pet health portal and appointment history",
    "owner-pet-reg": "Register a new pet to your account",
    "owner-view-pets": "Overview of your registered pets and medical profiles",
    "owner-book-appt": "Book a new clinic visit or check-up appointment",
    "owner-status": "Track status of your upcoming clinic visits",
    "owner-history": "Complete log of past medical appointments",
    "owner-profile": "Manage your user profile and security credentials"
  };
  
  if (pageSubtitle) pageSubtitle.textContent = subtitles[view] || "Campus Pet Care ERP Portal";
}

function updateUserBadge() {
  const userBadge = document.getElementById("userBadge");
  const userAvatar = document.getElementById("userAvatar");
  const userName = document.getElementById("userName");
  const userRole = document.getElementById("userRole");

  if (currentUser) {
    userBadge.style.display = "flex";
    userAvatar.textContent = currentUser.username.charAt(0).toUpperCase();
    userName.textContent = currentUser.username;
    userRole.textContent = currentUser.role === "admin" ? "Administrator" : "Pet Owner";
  } else {
    userBadge.style.display = "none";
  }
}

// Initial View Render
renderView("admin-login");

function renderView(view) {
  contentContainer.innerHTML = "";
  
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

// ---------- Helper: KPI Generator ----------
function renderKPIGrid(items) {
  return `
    <div class="kpi-grid">
      ${items.map(item => `
        <div class="kpi-card">
          <div class="kpi-icon ${item.color}">
            <i class="fa-solid ${item.icon}"></i>
          </div>
          <div class="kpi-data">
            <span class="kpi-value">${item.value}</span>
            <span class="kpi-label">${item.label}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ---------- Admin Renderers ----------
function renderAdminLogin() {
  contentContainer.innerHTML = `
    <div class="card" style="max-width: 480px; margin: 2rem auto;">
      <h2><i class="fa-solid fa-user-shield"></i> Administrator Login</h2>
      
      <div class="demo-preset-box">
        <span class="demo-title"><i class="fa-solid fa-bolt"></i> One-Click Demo Accounts</span>
        <div class="demo-chips">
          <button class="chip-btn" onclick="fillLogin('adminLoginForm', 'monisha', '123')">monisha / 123</button>
          <button class="chip-btn" onclick="fillLogin('adminLoginForm', 'admin1', 'admin123')">admin1 / admin123</button>
        </div>
      </div>

      <form id="adminLoginForm">
        <label>
          <span>Username</span>
          <input type="text" name="username" placeholder="Enter admin username" required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" placeholder="••••••••" required />
        </label>
        <button type="submit" class="btn btn-primary">
          <i class="fa-solid fa-right-to-bracket"></i> Login to Admin Portal
        </button>
      </form>
    </div>`;

  window.fillLogin = (formId, u, p) => {
    const form = document.getElementById(formId);
    if (form) {
      form.username.value = u;
      form.password.value = p;
    }
  };
  document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const u = data.get("username"), p = data.get("password");
    const admin = users.find(user => user.role === "admin" && user.username === u && user.password === p);
    
    if (admin) {
      currentUser = admin;
      updateUserBadge();
      showToast(`Welcome back, Admin ${u}!`);
      
      document.querySelectorAll('.auth-admin').forEach(el => el.style.display = 'flex');
      document.querySelectorAll('.auth-owner').forEach(el => el.style.display = 'none');
      
      const petBtn = document.querySelector('[data-view="admin-pets"]');
      if (petBtn) petBtn.click();
    } else {
      showToast("Invalid admin credentials!", "error");
    }
  });
}

function renderPetManagement() {
  const totalPets = pets.length;
  const dogsCount = pets.filter(p => p.species.toLowerCase() === 'dog').length;
  const catsCount = pets.filter(p => p.species.toLowerCase() === 'cat').length;
  const totalOwners = new Set(pets.map(p => p.ownerId)).size;

  const kpiHTML = renderKPIGrid([
    { label: "Total Registered Pets", value: totalPets, icon: "fa-paw", color: "emerald" },
    { label: "Registered Dogs", value: dogsCount, icon: "fa-dog", color: "blue" },
    { label: "Registered Cats", value: catsCount, icon: "fa-cat", color: "amber" },
    { label: "Active Pet Owners", value: totalOwners, icon: "fa-users", color: "purple" }
  ]);

  const rows = pets.map(p => `
    <tr>
      <td><strong>#${p.id}</strong></td>
      <td>Owner #${p.ownerId}</td>
      <td><strong style="color:var(--color-primary);">${p.name}</strong></td>
      <td><span class="badge badge-scheduled">${p.species}</span></td>
      <td>${p.breed}</td>
      <td>${p.age} yrs</td>
    </tr>
  `).join("");

  contentContainer.innerHTML = `
    ${kpiHTML}
    <div class="card">
      <div class="card-header-flex">
        <h2><i class="fa-solid fa-list"></i> Registered Pets Directory</h2>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr><th>Pet ID</th><th>Owner ID</th><th>Pet Name</th><th>Species</th><th>Breed</th><th>Age</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <h2><i class="fa-solid fa-plus-circle"></i> Add New Pet Record</h2>
      <form id="addPetForm">
        <div class="form-grid">
          <label>Owner ID <input type="number" name="ownerId" placeholder="e.g. 4" required /></label>
          <label>Pet Name <input type="text" name="name" placeholder="e.g. Buddy" required /></label>
          <label>Species <input type="text" name="species" placeholder="Dog / Cat" required /></label>
          <label>Breed <input type="text" name="breed" placeholder="e.g. Golden Retriever" required /></label>
          <label>Age (years) <input type="number" name="age" placeholder="2" required /></label>
        </div>
        <button type="submit" class="btn btn-secondary">
          <i class="fa-solid fa-floppy-disk"></i> Register Pet
        </button>
      </form>
    </div>`;

  document.getElementById("addPetForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    pets.push({
      id: pets.length + 1,
      ownerId: Number(f.get("ownerId")),
      name: f.get("name"),
      species: f.get("species"),
      breed: f.get("breed"),
      age: Number(f.get("age"))
    });
    showToast("Pet registered successfully!");
    renderPetManagement();
  });
}

function renderAppointmentManagement() {
  const totalAppts = appointments.length;
  const scheduledCount = appointments.filter(a => a.status === 'Scheduled').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;

  const kpiHTML = renderKPIGrid([
    { label: "Total Consultations", value: totalAppts, icon: "fa-calendar-check", color: "blue" },
    { label: "Upcoming Scheduled", value: scheduledCount, icon: "fa-clock", color: "amber" },
    { label: "Completed Visits", value: completedCount, icon: "fa-circle-check", color: "emerald" }
  ]);

  const rows = appointments.map(a => {
    const badgeClass = a.status === 'Scheduled' ? 'badge-scheduled' : (a.status === 'Completed' ? 'badge-completed' : 'badge-cancelled');
    return `
      <tr>
        <td><strong>#${a.id}</strong></td>
        <td>Pet #${a.petId}</td>
        <td>Owner #${a.ownerId}</td>
        <td><i class="fa-regular fa-calendar"></i> ${a.date}</td>
        <td><i class="fa-regular fa-clock"></i> ${a.time}</td>
        <td><span class="badge ${badgeClass}">${a.status}</span></td>
        <td>${a.reason}</td>
      </tr>
    `;
  }).join("");

  contentContainer.innerHTML = `
    ${kpiHTML}
    <div class="card">
      <div class="card-header-flex">
        <h2><i class="fa-solid fa-calendar-days"></i> Master Appointment Schedule</h2>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr><th>Appt ID</th><th>Pet ID</th><th>Owner ID</th><th>Date</th><th>Time</th><th>Status</th><th>Reason</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <h2><i class="fa-solid fa-calendar-plus"></i> Schedule New Appointment</h2>
      <form id="addApptForm">
        <div class="form-grid">
          <label>Pet ID <input type="number" name="petId" placeholder="1" required /></label>
          <label>Owner ID <input type="number" name="ownerId" placeholder="4" required /></label>
          <label>Date <input type="date" name="date" required /></label>
          <label>Time <input type="time" name="time" required /></label>
          <label>Status 
            <select name="status">
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
          <label>Reason <input type="text" name="reason" placeholder="Vaccination / General Checkup" required /></label>
        </div>
        <button type="submit" class="btn btn-secondary">
          <i class="fa-solid fa-check"></i> Book Appointment
        </button>
      </form>
    </div>`;

  document.getElementById("addApptForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    appointments.push({
      id: appointments.length + 1,
      petId: Number(f.get("petId")),
      ownerId: Number(f.get("ownerId")),
      date: f.get("date"),
      time: f.get("time"),
      status: f.get("status"),
      reason: f.get("reason")
    });
    showToast("Appointment added!");
    renderAppointmentManagement();
  });
}

function renderUserManagement() {
  const rows = users.map(u => `
    <tr>
      <td><strong>#${u.id}</strong></td>
      <td><span class="badge ${u.role === 'admin' ? 'badge-scheduled' : 'badge-completed'}">${u.role.toUpperCase()}</span></td>
      <td><strong>${u.username}</strong></td>
      <td><i class="fa-solid fa-lock"></i> ••••••••</td>
    </tr>
  `).join("");

  contentContainer.innerHTML = `
    <div class="card">
      <h2><i class="fa-solid fa-users"></i> System Accounts Directory</h2>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr><th>User ID</th><th>System Role</th><th>Username</th><th>Security Password</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function renderReports() {
  contentContainer.innerHTML = `
    <div class="card">
      <h2><i class="fa-solid fa-chart-column"></i> Clinic Appointments Analytics</h2>
      <div class="chart-container" style="max-height: 380px;">
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
        label: 'Daily Appointments Count',
        data,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: '#10b981',
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: getComputedStyle(document.body).getPropertyValue('--color-text') } }
      },
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { beginAtZero: true, ticks: { color: '#94a3b8', stepSize: 1 }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

// ---------- Owner Renderers ----------
function renderOwnerRegistration() {
  contentContainer.innerHTML = `
    <div class="card" style="max-width: 480px; margin: 2rem auto;">
      <h2><i class="fa-solid fa-user-plus"></i> Pet Owner Registration</h2>
      <form id="ownerRegForm">
        <label>
          <span>Create Username</span>
          <input type="text" name="username" placeholder="e.g. sarah.connor" required />
        </label>
        <label>
          <span>Create Password</span>
          <input type="password" name="password" placeholder="••••••••" required />
        </label>
        <button type="submit" class="btn btn-primary">
          <i class="fa-solid fa-user-check"></i> Register Account
        </button>
      </form>
    </div>`;

  document.getElementById("ownerRegForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    users.push({ id: users.length + 1, role: "owner", username: f.get("username"), password: f.get("password") });
    showToast("Registration successful! You can now login.");
    const loginBtn = document.querySelector('[data-view="owner-login"]');
    if (loginBtn) loginBtn.click();
  });
}

function renderOwnerLogin() {
  contentContainer.innerHTML = `
    <div class="card" style="max-width: 480px; margin: 2rem auto;">
      <h2><i class="fa-solid fa-key"></i> Pet Owner Login</h2>
      
      <div class="demo-preset-box">
        <span class="demo-title"><i class="fa-solid fa-bolt"></i> Demo Owner Accounts</span>
        <div class="demo-chips">
          <button class="chip-btn" onclick="fillLogin('ownerLoginForm', 'moni', '1234')">moni / 1234</button>
          <button class="chip-btn" onclick="fillLogin('ownerLoginForm', 'jane.doe', 'owner123')">jane.doe / owner123</button>
        </div>
      </div>

      <form id="ownerLoginForm">
        <label>
          <span>Username</span>
          <input type="text" name="username" placeholder="Enter owner username" required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" placeholder="••••••••" required />
        </label>
        <button type="submit" class="btn btn-primary">
          <i class="fa-solid fa-right-to-bracket"></i> Login to Owner Portal
        </button>
      </form>
    </div>`;

  document.getElementById("ownerLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const u = f.get("username"), p = f.get("password");
    const owner = users.find(user => user.role === "owner" && user.username === u && user.password === p);

    if (owner) {
      currentUser = owner;
      updateUserBadge();
      showToast(`Welcome back, ${u}!`);

      document.querySelectorAll('.auth-owner').forEach(el => el.style.display = 'flex');
      document.querySelectorAll('.auth-admin').forEach(el => el.style.display = 'none');

      const viewPetsBtn = document.querySelector('[data-view="owner-view-pets"]');
      if (viewPetsBtn) viewPetsBtn.click();
    } else {
      showToast("Invalid credentials!", "error");
    }
  });
}

function checkLogin() {
  if (!currentUser || currentUser.role !== "owner") {
    contentContainer.innerHTML = `
      <div class="card" style="text-align: center; max-width: 450px; margin: 3rem auto;">
        <h2><i class="fa-solid fa-lock" style="color:var(--color-accent)"></i> Login Required</h2>
        <p style="color:var(--color-text-muted); margin-bottom: 1.5rem;">Please log in with a Pet Owner account to access this page.</p>
        <button class="btn btn-primary" onclick="document.querySelector('[data-view=\\'owner-login\\']').click()">
          <i class="fa-solid fa-key"></i> Go to Owner Login
        </button>
      </div>`;
    return false;
  }
  return true;
}

function renderPetRegistration() {
  if (!checkLogin()) return;
  contentContainer.innerHTML = `
    <div class="card" style="max-width: 500px; margin: 1rem auto;">
      <h2><i class="fa-solid fa-plus-circle"></i> Register New Pet</h2>
      <form id="petRegForm">
        <label>Pet Name <input type="text" name="name" placeholder="e.g. Simba" required /></label>
        <label>Species <input type="text" name="species" placeholder="Cat / Dog" required /></label>
        <label>Breed <input type="text" name="breed" placeholder="e.g. Maine Coon" required /></label>
        <label>Age (years) <input type="number" name="age" placeholder="3" required /></label>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-paw"></i> Add Pet Profile</button>
      </form>
    </div>`;

  document.getElementById("petRegForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    pets.push({
      id: pets.length + 1,
      ownerId: currentUser.id,
      name: f.get("name"),
      species: f.get("species"),
      breed: f.get("breed"),
      age: Number(f.get("age"))
    });
    showToast("Pet registered successfully!");
    const myPetsBtn = document.querySelector('[data-view="owner-view-pets"]');
    if (myPetsBtn) myPetsBtn.click();
  });
}

function renderOwnerPets() {
  if (!checkLogin()) return;
  const myPets = getPetsByOwner(currentUser.id);
  const kpiHTML = renderKPIGrid([
    { label: "My Pets Registered", value: myPets.length, icon: "fa-paw", color: "emerald" }
  ]);

  const rows = myPets.map(p => `
    <tr>
      <td><strong>#${p.id}</strong></td>
      <td><strong style="color:var(--color-primary);">${p.name}</strong></td>
      <td><span class="badge badge-scheduled">${p.species}</span></td>
      <td>${p.breed}</td>
      <td>${p.age} yrs</td>
    </tr>
  `).join("");

  contentContainer.innerHTML = `
    ${kpiHTML}
    <div class="card">
      <h2><i class="fa-solid fa-bone"></i> My Pets Directory</h2>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr><th>Pet ID</th><th>Name</th><th>Species</th><th>Breed</th><th>Age</th></tr>
          </thead>
          <tbody>${rows.length ? rows : '<tr><td colspan="5" style="text-align:center;">No pets registered yet.</td></tr>'}</tbody>
        </table>
      </div>
    </div>`;
}

function renderBooking() {
  if (!checkLogin()) return;
  const myPets = getPetsByOwner(currentUser.id);
  
  if (!myPets.length) {
    contentContainer.innerHTML = `
      <div class="card" style="text-align:center;">
        <p>No pets found. Please register a pet first!</p>
      </div>`;
    return;
  }

  const petOptions = myPets.map(p => `<option value="${p.id}">${p.name} (${p.species})</option>`).join("");
  contentContainer.innerHTML = `
    <div class="card" style="max-width: 500px; margin: 1rem auto;">
      <h2><i class="fa-solid fa-calendar-plus"></i> Book Clinic Visit</h2>
      <form id="bookingForm">
        <label>Select Pet <select name="petId" required>${petOptions}</select></label>
        <label>Visit Date <input type="date" name="date" required /></label>
        <label>Preferred Time <input type="time" name="time" required /></label>
        <label>Reason for Visit <input type="text" name="reason" placeholder="Routine Checkup / Vaccination" required /></label>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-calendar-check"></i> Submit Booking</button>
      </form>
    </div>`;

  document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    appointments.push({
      id: appointments.length + 1,
      petId: Number(f.get("petId")),
      ownerId: currentUser.id,
      date: f.get("date"),
      time: f.get("time"),
      status: "Scheduled",
      reason: f.get("reason")
    });
    showToast("Appointment booked successfully!");
    const statusBtn = document.querySelector('[data-view="owner-status"]');
    if (statusBtn) statusBtn.click();
  });
}

function renderAppointmentStatus() {
  if (!checkLogin()) return;
  const myAppts = getAppointmentsByOwner(currentUser.id);

  const rows = myAppts.map(a => {
    const pet = pets.find(p => p.id === a.petId);
    const badgeClass = a.status === 'Scheduled' ? 'badge-scheduled' : (a.status === 'Completed' ? 'badge-completed' : 'badge-cancelled');
    return `
      <tr>
        <td><strong>#${a.id}</strong></td>
        <td>${pet ? pet.name : `Pet #${a.petId}`}</td>
        <td><i class="fa-regular fa-calendar"></i> ${a.date}</td>
        <td><i class="fa-regular fa-clock"></i> ${a.time}</td>
        <td><span class="badge ${badgeClass}">${a.status}</span></td>
        <td>${a.reason}</td>
      </tr>
    `;
  }).join("");

  contentContainer.innerHTML = `
    <div class="card">
      <h2><i class="fa-solid fa-clock-rotate-left"></i> My Appointments Status</h2>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr><th>Appt ID</th><th>Pet Name</th><th>Date</th><th>Time</th><th>Status</th><th>Reason</th></tr>
          </thead>
          <tbody>${rows.length ? rows : '<tr><td colspan="6" style="text-align:center;">No appointments found.</td></tr>'}</tbody>
        </table>
      </div>
    </div>`;
}

function renderBookingHistory() {
  renderAppointmentStatus();
}

function renderProfileManagement() {
  if (!checkLogin()) return;
  contentContainer.innerHTML = `
    <div class="card" style="max-width: 500px; margin: 1rem auto;">
      <h2><i class="fa-solid fa-id-card"></i> Profile Management</h2>
      <div style="margin-bottom: 1.5rem;">
        <p><strong>Username:</strong> ${currentUser.username}</p>
        <p><strong>Account Role:</strong> Pet Owner</p>
      </div>
      <form id="pwdForm">
        <h3>Change Security Password</h3>
        <label>New Password <input type="password" name="newPwd" placeholder="••••••••" required /></label>
        <button type="submit" class="btn btn-secondary"><i class="fa-solid fa-key"></i> Update Password</button>
      </form>
    </div>`;

  document.getElementById("pwdForm").addEventListener("submit", (e) => {
    e.preventDefault();
    currentUser.password = new FormData(e.target).get("newPwd");
    showToast("Password updated successfully!");
  });
}
