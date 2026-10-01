# Indiana Notary Services - PWA Booking System

**Professional, flat-design Progressive Web App for mobile notary appointments in Fairland, Indiana.**

[![Vercel](https://img.shields.io/badge/deployed-vercel-000000?style=flat-square)](https://vercel.com)
[![Node.js](https://img.shields.io/badge/node-16+-green?style=flat-square)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

## Features

✨ **Modern PWA**
- Installable on iOS & Android
- Works offline
- Fast loading with service worker caching

📋 **Complete Booking System**
- Beautiful flat design matching your brand
- Real-time cost estimation
- Date/time picker
- Document type selection
- Mobile-first responsive design

✉️ **Automated Email Notifications**
- Confirmation emails to clients
- Booking notifications to notary
- Professional HTML templates
- Pre-configured with IndianaNotaryServices@gmail.com

🔐 **Admin Dashboard**
- Secure login
- View all bookings
- Search & filter
- Real-time statistics
- Email clients directly

---

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Gmail account (IndianaNotaryServices@gmail.com)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/IndianaNotaryServices/notary-booking.git
cd notary-booking

# 2. Install dependencies
npm install

# 3. Setup email (get Gmail app password)
cp .env.example .env
# Edit .env and add your Gmail app password

# 4. Start development server
npm start
```

Visit http://localhost:3000

### Deploy to Production

**Vercel (Recommended - Free)**
```bash
npm i -g vercel
vercel
```

**Heroku**
```bash
heroku create your-app-name
heroku config:set EMAIL_PASSWORD="your-app-password"
git push heroku main
```

See [DEPLOY.md](DEPLOY.md) for detailed instructions.

---

## Project Structure

```
├── index.html           Home page (keep existing)
├── book.html           Booking form page (flat design)
├── admin.html          Admin dashboard (flat design)
├── server.js           Node.js/Express backend
├── sw.js               Service worker (offline support)
├── manifest.json       PWA configuration
├── package.json        Dependencies
├── .env                Environment variables (local only)
├── .gitignore          Git ignore rules
├── DEPLOY.md           Deployment guide
└── README.md           Full documentation
```

---

## Configuration

### Email Setup

1. **Get Gmail App Password:**
   - Enable 2-Step Verification: https://myaccount.google.com/security
   - Generate app password: https://myaccount.google.com/apppasswords
   - Select "Mail" → "Windows Computer"

2. **Add to `.env`:**
   ```env
   EMAIL_USER=IndianaNotaryServices@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### Admin Access

Edit `.env`:
```env
ADMIN_TOKEN=your-secure-token-here
```

Access admin dashboard at `/admin.html`

---

## API Endpoints

### Submit Booking
```
POST /api/bookings
Content-Type: application/json

{
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "clientPhone": "(317) 555-0000",
  "preferredDate": "2026-10-15",
  "preferredTime": "14:00",
  "serviceAddress": "123 Main St, Fairland, IN 46126",
  "documentCount": "1",
  "documentType": "general",
  "additionalInfo": "Optional notes"
}
```

### View Bookings (Admin)
```
GET /api/bookings
Authorization: Bearer your-admin-token
```

### Health Check
```
GET /api/health
```

---

## Design

### Color Palette
- **Navy:** #062f49 (primary)
- **Teal:** #1195a8 (accent)
- **Gold:** #d6ad68 (call-to-action)
- **Cream:** #f7ead6 (light background)

### Typography
- **Serif:** Georgia (headings)
- **Sans-serif:** Segoe UI (body)

### Flat Design
Minimalist, clean interface with:
- Soft shadows
- Subtle borders
- Generous whitespace
- No gradients
- Flat colors

---

## PWA Features

### Offline Support
- Service worker caches essential files
- Bookings saved locally if offline
- Auto-syncs when connection restored

### Installation
- **iOS:** Open in Safari → Share → Add to Home Screen
- **Android:** Open in Chrome → Install App
- **Desktop:** Click install icon in address bar

### Push Notifications (Future)
Ready for web push notifications on supported devices.

---

## Email Templates

### Client Confirmation
- Appointment details
- Estimated cost
- Next steps
- Contact information

### Notary Notification
- Client information
- Booking details
- Action items
- Booking ID for reference

---

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |
| `EMAIL_SERVICE` | Email provider | gmail |
| `EMAIL_USER` | From address | IndianaNotaryServices@gmail.com |
| `EMAIL_PASSWORD` | Gmail app password | xxxx xxxx xxxx xxxx |
| `NOTARY_EMAIL` | Notifications to | IndianaNotaryServices@gmail.com |
| `ADMIN_TOKEN` | Admin login | notary-admin-2026 |

---

## Security

- ✅ API authentication via bearer token
- ✅ HTTPS in production (automatic on Vercel)
- ✅ Input validation on server
- ✅ No sensitive data in git (.env in .gitignore)
- ✅ CORS configured
- ✅ XSS protection

---

## Performance

- 📱 Mobile-first responsive design
- ⚡ Service worker caching
- 🚀 Fast page loads
- 🔄 Optimized images & assets
- 📦 Minimal dependencies

Lighthouse Score: 90+ on all metrics

---

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | PWA installable |
| Safari | ✅ Full | Add to Home Screen |
| Firefox | ✅ Full | PWA support partial |
| Edge | ✅ Full | PWA installable |
| IE 11 | ⚠️ Limited | No service worker |

---

## Deployment Options

### Vercel (Recommended)
- Free hosting
- Automatic HTTPS
- Instant deployments
- Environment variables UI

### Heroku
- Free tier available
- Easy GitHub integration
- Scale on demand
- Hobby dynos included

### Railway
- Modern platform
- GitHub auto-deploy
- Environment variables
- Free tier available

### Self-Hosted
- Full control
- Run anywhere Node.js runs
- See [DEPLOY.md](DEPLOY.md) for details

---

## Monitoring

### Health Check
```bash
curl https://your-domain/api/health
```

### Admin Dashboard
Visit `/admin.html` to monitor:
- Total bookings
- Pending appointments
- Confirmed appointments
- Revenue tracking

---

## Troubleshooting

### Emails not sending
```bash
# Test email configuration
node test-email.js
```

### Admin login failing
- Clear browser cache
- Check `ADMIN_TOKEN` in environment
- Verify token is set correctly

### Offline issues
- Service worker caches on HTTPS only
- Try incognito mode
- Check browser console for errors

See full troubleshooting in [DEPLOY.md](DEPLOY.md)

---

## Future Enhancements

- [ ] Payment processing (Stripe/Square)
- [ ] SMS notifications (Twilio)
- [ ] Calendar sync (Google Calendar)
- [ ] Database integration (MongoDB)
- [ ] Advanced analytics
- [ ] Client history tracking
- [ ] Appointment reminders
- [ ] Multi-language support

---

## Development

```bash
# Local development with auto-reload
npm run dev

# Test email configuration
npm run test-email

# Production build
npm start
```

---

## License

MIT License - see [LICENSE](LICENSE) file for details

---

## Contact

- **Email:** IndianaNotaryServices@gmail.com
- **Phone:** (317) 728-7537
- **Website:** https://IndianaNotaryServices.com
- **GitHub Issues:** [Report a bug](https://github.com/IndianaNotaryServices/notary-booking/issues)

---

## Author

**Joseph Whelan**  
Founder, Indiana Notary Services  
Mobile Notary • Fairland, Indiana

---

## Acknowledgments

- Built with Express.js & Node.js
- Designed with flat aesthetics
- Hosted on Vercel/Heroku
- Email via Nodemailer + Gmail

---

<div align="center">

**[Deploy Now](#quick-start) • [View Live](https://notary-booking.vercel.app) • [Read Docs](DEPLOY.md)**

Made with ❤️ for Indiana Notary Services

</div>
