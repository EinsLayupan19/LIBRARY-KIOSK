// ============================================================
// app.js — Shared application logic
// ============================================================

const ALLOWED_DOMAIN = '@neu.edu.ph';
const ADMIN_EMAILS = ['jcesperanza@neu.edu.ph', 'zirkeins.layupan@neu.edu.ph'];

// ── Toast Notification ──────────────────────────────────────
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ── Loading Spinner ─────────────────────────────────────────
function showLoader(show) {
  let overlay = document.getElementById('loader-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loader-overlay';
    overlay.innerHTML = `<div class="loader-ring"><div></div><div></div><div></div><div></div></div>`;
    document.body.appendChild(overlay);
  }
  overlay.style.display = show ? 'flex' : 'none';
}

// ── Session Guard ───────────────────────────────────────────
async function requireAuth() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  const email = session.user.email;
  if (!email.endsWith(ALLOWED_DOMAIN)) {
    await supabaseClient.auth.signOut();
    window.location.href = 'login.html?error=domain';
    return null;
  }
  return session;
}

async function redirectIfLoggedIn() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) return;
  const email = session.user.email;
  if (!email.endsWith(ALLOWED_DOMAIN)) {
    await supabaseClient.auth.signOut();
    return;
  }
  if (ADMIN_EMAILS.includes(email)) {
    window.location.href = 'admin.html';
  } else {
    await checkUserAndRoute(session);
  }
}

async function checkUserAndRoute(session) {
  const { data, error } = await supabaseClient
    .from('users')
    .select('id')
    .eq('id', session.user.id)
    .single();
  if (error || !data) {
    window.location.href = 'register.html';
  } else {
    window.location.href = 'dashboard.html';
  }
}

// ── Real-time Clock ─────────────────────────────────────────
function startClock(elementId) {
  function tick() {
    const el = document.getElementById(elementId);
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleString('en-PH', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
  tick();
  setInterval(tick, 1000);
}
