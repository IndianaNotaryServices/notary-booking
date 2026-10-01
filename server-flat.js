const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Email setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const bookings = [];

/**
 * POST /api/bookings - Create booking
 */
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      preferredDate,
      preferredTime,
      serviceAddress,
      documentCount,
      documentType,
      additionalInfo,
      submittedAt
    } = req.body;

    if (!clientName || !clientEmail || !clientPhone || !preferredDate || !preferredTime || !serviceAddress || !documentCount || !documentType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const notaryCost = parseInt(documentCount.charAt(0)) * 10;
    const mileageEstimate = 3 * 0.76;
    const totalEstimate = notaryCost + mileageEstimate;

    const booking = {
      id: Date.now().toString(),
      clientName,
      clientEmail,
      clientPhone,
      preferredDate,
      preferredTime,
      serviceAddress,
      documentCount,
      documentType,
      additionalInfo,
      submittedAt,
      estimatedCost: totalEstimate,
      status: 'pending'
    };

    bookings.push(booking);

    const dateObj = new Date(preferredDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeObj = new Date(`2000-01-01T${preferredTime}`);
    const formattedTime = timeObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Client email
    const clientEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: "Segoe UI", Arial, sans-serif; line-height: 1.6; color: #082d47; background: #f9fbfb; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 1px solid #dbe8ea; border-radius: 8px; overflow: hidden; }
    .header { background: #062f49; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-family: Georgia, serif; font-size: 24px; }
    .header p { margin: 8px 0 0; opacity: 0.9; }
    .content { padding: 30px 20px; }
    .greeting { font-size: 16px; margin-bottom: 20px; }
    .details { background: #f9fbfb; border-left: 4px solid #d6ad68; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .detail-row { margin: 10px 0; }
    .detail-label { font-weight: 600; color: #062f49; }
    .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px 20px; margin: 20px 0; border-radius: 4px; color: #856404; font-size: 14px; }
    .footer { background: #f9fbfb; padding: 20px; text-align: center; color: #526879; font-size: 12px; border-top: 1px solid #dbe8ea; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Received</h1>
      <p>Indiana Notary Services</p>
    </div>
    <div class="content">
      <div class="greeting">Hi ${clientName},</div>
      <p>Thank you for requesting a mobile notary appointment. We've received your request and will review it shortly.</p>
      
      <div class="details">
        <div class="detail-row"><span class="detail-label">Date:</span> ${formattedDate}</div>
        <div class="detail-row"><span class="detail-label">Time:</span> ${formattedTime}</div>
        <div class="detail-row"><span class="detail-label">Address:</span> ${serviceAddress}</div>
        <div class="detail-row"><span class="detail-label">Documents:</span> ${documentCount} (${documentType})</div>
        <div class="detail-row"><span class="detail-label">Estimated Cost:</span> $${totalEstimate.toFixed(2)}</div>
      </div>

      <div class="alert">
        <strong>Next Step:</strong> We'll contact you at <strong>${clientPhone}</strong> within 24 hours to confirm availability and discuss payment options.
      </div>

      <p>Questions? Call us at <strong>(317) 728-7537</strong></p>
      <p>Best regards,<br><strong>Kalie Kearney-Dunkerson</strong><br>Indiana Notary Services</p>
    </div>
    <div class="footer">
      © 2026 Indiana Notary Services
    </div>
  </div>
</body>
</html>
    `;

    // Notary email
    const notaryEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: "Segoe UI", Arial, sans-serif; line-height: 1.6; color: #082d47; background: #f9fbfb; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 1px solid #dbe8ea; border-radius: 8px; overflow: hidden; }
    .header { background: #1195a8; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-family: Georgia, serif; font-size: 24px; }
    .content { padding: 30px 20px; }
    .section { margin-bottom: 25px; }
    .section h2 { font-family: Georgia, serif; color: #062f49; font-size: 16px; margin: 0 0 15px; }
    .info-box { background: #dff6f7; border-left: 4px solid #1195a8; padding: 15px 20px; margin: 10px 0; border-radius: 4px; }
    .detail-row { margin: 8px 0; }
    .detail-label { font-weight: 600; }
    .footer { background: #f9fbfb; padding: 20px; text-align: center; color: #526879; font-size: 12px; border-top: 1px solid #dbe8ea; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Booking Request</h1>
    </div>
    <div class="content">
      <div class="section">
        <h2>Client Information</h2>
        <div class="info-box">
          <div class="detail-row"><span class="detail-label">Name:</span> ${clientName}</div>
          <div class="detail-row"><span class="detail-label">Phone:</span> <a href="tel:${clientPhone}">${clientPhone}</a></div>
          <div class="detail-row"><span class="detail-label">Email:</span> <a href="mailto:${clientEmail}">${clientEmail}</a></div>
        </div>
      </div>

      <div class="section">
        <h2>Appointment Details</h2>
        <div class="info-box">
          <div class="detail-row"><span class="detail-label">Preferred Date:</span> ${formattedDate}</div>
          <div class="detail-row"><span class="detail-label">Preferred Time:</span> ${formattedTime}</div>
          <div class="detail-row"><span class="detail-label">Address:</span> ${serviceAddress}</div>
          <div class="detail-row"><span class="detail-label">Document Count:</span> ${documentCount}</div>
          <div class="detail-row"><span class="detail-label">Document Type:</span> ${documentType}</div>
          <div class="detail-row"><span class="detail-label">Estimated Cost:</span> $${totalEstimate.toFixed(2)}</div>
        </div>
      </div>

      ${additionalInfo ? `<div class="section"><h2>Notes</h2><p>${additionalInfo}</p></div>` : ''}
    </div>
    <div class="footer">
      Booking ID: ${booking.id} | Submitted: ${new Date(submittedAt).toLocaleString()}
    </div>
  </div>
</body>
</html>
    `;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: clientEmail,
        subject: 'Your Notary Appointment Request - Indiana Notary Services',
        html: clientEmailHtml
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.NOTARY_EMAIL || process.env.EMAIL_USER,
        subject: `New Booking: ${clientName}`,
        html: notaryEmailHtml
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Booking submitted',
      bookingId: booking.id
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process booking' });
  }
});

/**
 * GET /api/bookings/:id - Get single booking
 */
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  res.json(booking || { error: 'Not found' });
});

/**
 * GET /api/bookings - Get all bookings (admin)
 */
app.get('/api/bookings', (req, res) => {
  const adminToken = req.headers.authorization?.split(' ')[1];
  if (adminToken !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ total: bookings.length, bookings });
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    emailConfigured: !!process.env.EMAIL_USER
  });
});

// Static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║  Indiana Notary Services - PWA Server    ║
╠══════════════════════════════════════════╣
║  ✓ Running on http://localhost:${PORT}
║  ✓ Email: ${process.env.EMAIL_USER || '(not configured)'}
║  ✓ Admin: /admin-flat.html
╚══════════════════════════════════════════╝
  `);
});
