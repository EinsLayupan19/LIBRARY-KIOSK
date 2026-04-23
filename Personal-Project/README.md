# NEU Library Visitor Log — Setup Guide

## 📁 File Structure
```
neu-library/
├── index.html          ← Welcome / landing page
├── login.html          ← Google OAuth login
├── register.html       ← First-time registration form
├── dashboard.html      ← User kiosk (Time In)
├── admin.html          ← Admin dashboard
├── app.js              ← Shared logic (auth guards, toast, clock)
├── supabase.js         ← Supabase client config ← EDIT THIS
├── styles.css          ← All styles
└── supabase_setup.sql  ← Run in Supabase SQL Editor
```
https://ephemeral-faun-049a4d.netlify.app/
---

## 🚀 Step-by-Step Setup

### 1. Create a Supabase Project
- Go to https://supabase.com and create a new project
- Note your **Project URL** and **anon/public API key**

### 2. Configure `supabase.js`
Replace the placeholder values:
```js
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY';
```

### 3. Run the SQL Setup
- In your Supabase dashboard → **SQL Editor**
- Paste and run the contents of `supabase_setup.sql`
- This creates the `users` and `logs` tables with RLS policies

### 4. Enable Google OAuth
In Supabase Dashboard → **Authentication → Providers → Google**:
1. Enable Google provider
2. Create a Google OAuth App at https://console.cloud.google.com
   - Authorized redirect URI: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
3. Paste your **Client ID** and **Client Secret** into Supabase

### 5. Set Redirect URLs
In Supabase → **Authentication → URL Configuration**:
- **Site URL**: `http://localhost:5500` (or your deployed URL)
- **Redirect URLs**: Add both:
  - `http://localhost:5500/login.html`
  - `https://your-deployed-domain.com/login.html`

### 6. Serve the App
Use any local server, e.g.:
```bash
# VS Code Live Server (recommended) — port 3000
# OR
npx serve .
# OR
python -m http.server 3000
```

Then open:http://127.0.0.1:3000/index.html

---

## 👤 Admin Access
The following emails automatically get admin access:
- `jcesperanza@neu.edu.ph`
- `zirkeins.layupan@neu.edu.ph`

To add more admins, update `ADMIN_EMAILS` in `app.js` and the RLS policies in `supabase_setup.sql`.

---

## 🔐 Security Notes
- Only `@neu.edu.ph` emails are allowed — enforced client-side AND the RLS prevents unauthorized DB writes
- RLS policies ensure users can only insert their own records
- Admins can read all logs via special RLS policies
- Duplicate time-in is prevented within a 10-minute cooldown window

---

## 📊 Features
| Feature | Status |
|---------|--------|
| Google OAuth only | ✅ |
| Domain restriction (@neu.edu.ph) | ✅ |
| First-time registration form | ✅ |
| Student ID format validation (XX-XXXXX-XXX) | ✅ |
| Real-time clock on dashboard | ✅ |
| Time In logging | ✅ |
| Duplicate time-in prevention (10 min cooldown) | ✅ |
| Admin dashboard with stats | ✅ |
| Search / filter logs | ✅ |
| Pagination | ✅ |
| CSV export | ✅ |
| Toast notifications | ✅ |
| Loading spinner | ✅ |
| Row Level Security (RLS) | ✅ |
| Mobile responsive | ✅ |
