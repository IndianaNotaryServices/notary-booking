# 📤 Push to GitHub - Checklist

**Status:** Ready to push ✅  
**Email:** IndianaNotaryServices@gmail.com (configured)

---

## Copy These Files to Your Repo

Copy all of these to your GitHub repository root:

```
✓ book.html              → Flat design booking form
✓ admin.html             → Flat design admin dashboard
✓ server.js              → Node.js backend (rename from server-flat.js)
✓ sw.js                  → Service worker
✓ manifest.json          → PWA config
✓ package.json           → Dependencies
✓ .env.example           → Email template
✓ .gitignore             → Security (includes .env)
✓ LICENSE                → MIT license
✓ README.md              → Full documentation
✓ DEPLOY.md              → Deployment guide
```

---

## Before You Push

### 1️⃣ Create `.env` File (Local Only)

Create `.env` in your repo root:

```env
PORT=3000
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_USER=IndianaNotaryServices@gmail.com
EMAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD_HERE
NOTARY_EMAIL=IndianaNotaryServices@gmail.com
ADMIN_TOKEN=notary-admin-2026
```

**Get Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Select: Mail → Windows Computer
3. Copy the 16-character password
4. Paste into `EMAIL_PASSWORD` above

**IMPORTANT:** `.env` must NOT be committed (it's in .gitignore)

### 2️⃣ Rename Files for Production

```bash
mv book-flat.html book.html
mv admin-flat.html admin.html
mv server-flat.js server.js
```

### 3️⃣ Test Locally

```bash
npm install
npm start
```

Visit: http://localhost:3000 ✓

---

## GitHub Push Commands

```bash
# Stage all files
git add .

# Commit
git commit -m "Add flat design PWA booking system with email integration"

# Push to main
git push origin main
```

---

## Verify on GitHub

After pushing, check:
- ✅ All files visible in repo
- ✅ `.env` NOT visible (in .gitignore)
- ✅ `package.json` visible
- ✅ README.md visible
- ✅ LICENSE visible

---

## Deploy to Production

After GitHub push, deploy:

### Vercel (2 minutes)
```bash
npm i -g vercel
vercel
```

**Add environment variable:**
- Name: `EMAIL_PASSWORD`
- Value: `xxxx xxxx xxxx xxxx` (your Gmail app password)

### Heroku
```bash
heroku create your-app-name
heroku config:set EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"
git push heroku main
```

---

## Test After Deployment

1. **Visit live site** (e.g., https://notary-app.vercel.app)
2. **Test booking:** Click "Book Now" → Submit → Check email ✓
3. **Test admin:** Go to `/admin.html` → Login ✓
4. **Test mobile:** Install on phone, test offline ✓

---

## That's It!

Your complete PWA booking system is:
- ✅ On GitHub
- ✅ Running locally
- ✅ Ready to deploy
- ✅ Email configured
- ✅ Admin dashboard ready

**Next step:** Deploy to production (Vercel or Heroku)

---

## Quick Reference

| Item | Value |
|------|-------|
| **Repo URL** | https://github.com/IndianaNotaryServices/notary-booking |
| **Email** | IndianaNotaryServices@gmail.com |
| **Booking Page** | `/book.html` |
| **Admin Page** | `/admin.html` |
| **Admin Password** | `notary-admin-2026` |
| **Local Port** | `3000` |

---

## Files Overview

| File | Purpose |
|------|---------|
| `index.html` | Home page (keep existing) |
| `book.html` | Booking form (flat design) |
| `admin.html` | Admin dashboard (flat design) |
| `server.js` | Express backend |
| `sw.js` | Service worker (offline) |
| `manifest.json` | PWA config |
| `package.json` | Dependencies |
| `.env` | Email config (local only) |
| `.gitignore` | Excludes .env |
| `README.md` | Documentation |
| `DEPLOY.md` | Deployment guide |
| `LICENSE` | MIT license |

---

## Email Flow ✉️

```
User books appointment
        ↓
Form submits to server
        ↓
Server sends TWO emails:
    ├→ To CLIENT: Confirmation + details
    └→ To NOTARY: Booking notification
        ↓
Both from: IndianaNotaryServices@gmail.com
```

---

## Admin Login

**URL:** `/admin.html`  
**Username:** (not used)  
**Token:** `notary-admin-2026`  
**Can do:**
- View all bookings
- See statistics
- Search/filter
- Email clients

---

## System Is Ready!

Everything is pre-configured for:
- ✅ Your email (IndianaNotaryServices@gmail.com)
- ✅ Admin token (notary-admin-2026)
- ✅ Flat design matching your site
- ✅ Mobile PWA support
- ✅ Offline functionality
- ✅ Professional email templates

**Just add Gmail app password and push!** 🚀

---

Questions? See [DEPLOY.md](DEPLOY.md) for full documentation.
