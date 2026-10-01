# 🚀 Deploy to GitHub & Production

**Status:** ✅ Ready to push  
**Email:** IndianaNotaryServices@gmail.com  
**Tech Stack:** Node.js + Express + PWA

---

## Step 1: Prepare Your Repository

### Create `.env` file (NOT in repo)

```bash
# Copy and paste this into .env file (don't commit this!)
PORT=3000
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_USER=IndianaNotaryServices@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
NOTARY_EMAIL=IndianaNotaryServices@gmail.com
ADMIN_TOKEN=notary-admin-2026
```

**IMPORTANT:** Get your Gmail App Password:
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" → "Windows Computer"
3. Copy the 16-character password
4. Paste into `EMAIL_PASSWORD` above

---

## Step 2: File Structure

Copy these files to your GitHub repo:

```
notary-booking/
├── index.html                 (your existing homepage)
├── book-flat.html            (flat design booking form)
├── admin-flat.html           (flat design admin dashboard)
├── server-flat.js            (Node.js backend)
├── sw.js                     (service worker)
├── manifest.json             (PWA config)
├── package.json              (dependencies)
├── .env                      (NOT committed - local only)
├── .env.example              (template for others)
├── .gitignore                (excludes .env)
├── README.md                 (documentation)
└── LICENSE                   (MIT)
```

### What to do with the files:

**Rename for production:**
```bash
mv book-flat.html book.html
mv admin-flat.html admin.html
mv server-flat.js server.js
```

---

## Step 3: Local Testing

```bash
# Install dependencies
npm install

# Start server
npm start
```

Visit:
- **App:** http://localhost:3000
- **Booking:** http://localhost:3000/book.html
- **Admin:** http://localhost:3000/admin.html (login with token)

---

## Step 4: Push to GitHub

```bash
# Make sure .env is in .gitignore
echo ".env" >> .gitignore

# Commit everything
git add .
git commit -m "Add complete flat design PWA booking system"
git push origin main
```

---

## Step 5: Deploy to Production

### Option A: Vercel (Recommended - Free, Easiest)

```bash
npm i -g vercel
vercel
```

**During setup:**
- Connect your GitHub repo
- Click "Continue" for defaults
- Wait for deployment

**Add environment variable:**
1. Go to Vercel dashboard
2. Project → Settings → Environment Variables
3. Add:
   - Key: `EMAIL_PASSWORD`
   - Value: `xxxx xxxx xxxx xxxx` (your Gmail app password)
4. Redeploy

**Your site is live at:** `https://your-project.vercel.app`

---

### Option B: Heroku (Free tier available)

```bash
npm i -g heroku
heroku login
heroku create your-app-name
heroku config:set EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"
git push heroku main
```

**Your site is live at:** `https://your-app-name.herokuapp.com`

---

### Option C: Railway (Modern Alternative)

1. Go to https://railway.app
2. Click "Deploy from GitHub"
3. Select your repo
4. Add environment variables in dashboard:
   - `EMAIL_PASSWORD`: your app password
5. Auto-deploys on every push

---

## Step 6: Verify Everything Works

After deployment, test:

1. **Visit your live site**
   - http://yoursite.com or https://yourproject.vercel.app

2. **Test booking form**
   - Click "Book Now"
   - Fill form → Submit
   - Check IndianaNotaryServices@gmail.com inbox ✓

3. **Test admin dashboard**
   - Visit `/admin.html`
   - Login with your `ADMIN_TOKEN`
   - See your test booking ✓

4. **Test PWA install**
   - **iOS:** Open in Safari → Share → Add to Home Screen
   - **Android:** Open in Chrome → Install App
   - App should install with offline support ✓

---

## File Contents Summary

### `book.html`
- Flat design booking form
- Real-time cost estimation
- Mobile responsive
- Offline support via service worker

### `admin.html`
- Secure login with token
- View all bookings
- Search and filter
- Real-time statistics

### `server.js`
- Express.js backend
- Handles form submissions
- Sends emails via Gmail
- REST API endpoints

### `sw.js`
- Service worker for offline
- Caches assets
- Background sync

### `manifest.json`
- PWA configuration
- App icons
- Install prompts

---

## Email Flow

```
User fills form
    ↓
Submits to /api/bookings
    ↓
Server processes booking
    ↓
Sends two emails:
    ├→ CLIENT: Confirmation email
    └→ NOTARY: Booking notification
    ↓
Admin can review at /admin.html
```

Both emails sent FROM: **IndianaNotaryServices@gmail.com**

---

## Environment Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `PORT` | 3000 | Local only |
| `NODE_ENV` | production | Set by host |
| `EMAIL_SERVICE` | gmail | Don't change |
| `EMAIL_USER` | IndianaNotaryServices@gmail.com | Your email |
| `EMAIL_PASSWORD` | xxxx xxxx xxxx xxxx | Gmail app password |
| `NOTARY_EMAIL` | IndianaNotaryServices@gmail.com | Receives notifications |
| `ADMIN_TOKEN` | notary-admin-2026 | Change to custom |

---

## API Endpoints

### Submit Booking
**POST** `/api/bookings`
```json
{
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "clientPhone": "(317) 555-0000",
  "preferredDate": "2026-10-15",
  "preferredTime": "14:00",
  "serviceAddress": "123 Main St",
  "documentCount": "1",
  "documentType": "general",
  "additionalInfo": ""
}
```

### Check Booking Status
**GET** `/api/bookings/{id}`

### View All Bookings (Admin)
**GET** `/api/bookings`  
Header: `Authorization: Bearer your-admin-token`

### Health Check
**GET** `/api/health`

---

## Troubleshooting

### Emails not sending?
- Check `EMAIL_PASSWORD` is set correctly
- Verify Gmail app password (16 chars with spaces)
- Ensure 2-Factor Auth is enabled on Gmail

### Can't login to admin?
- Verify `ADMIN_TOKEN` in environment
- Clear browser cache and try again
- Check browser console for errors

### Site not loading after deploy?
- Check deployment logs in Vercel/Heroku
- Verify all environment variables are set
- Restart deployment

### Offline not working?
- Service worker must be HTTPS (automatic on Vercel)
- Clear browser cache
- Try in incognito mode

---

## Next Steps

### 1. Monitor Bookings
Visit admin dashboard daily to review new bookings.

### 2. Respond to Clients
Call or email clients within 24 hours to confirm availability.

### 3. Custom Domain (Optional)
Point your domain to your Vercel/Heroku deployment:
- Vercel: https://vercel.com/docs/concepts/deployments/custom-domains
- Heroku: https://devcenter.heroku.com/articles/custom-domains

### 4. Enhancements
- Add payment processing (Stripe/Square)
- SMS notifications (Twilio)
- Calendar integration
- Database for persistent storage

---

## Support

- **Issues?** GitHub Issues or support@IndianaNotaryServices.com
- **Email:** IndianaNotaryServices@gmail.com
- **Phone:** (317) 728-7537

---

## Quick Reference

```bash
# Local development
npm install          # Install dependencies
npm start            # Start server (port 3000)
npm run test-email   # Test email configuration

# Deployment
vercel               # Deploy to Vercel
git push heroku main # Deploy to Heroku

# Admin access
/admin.html          # Admin dashboard
# Login with: notary-admin-2026 (or your custom token)
```

---

**Your booking system is production-ready. Deploy with confidence! 🚀**

Last updated: October 2026
