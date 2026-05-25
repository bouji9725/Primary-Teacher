import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const TEACHER_EMAIL = process.env.TEACHER_EMAIL ?? ''
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'noreply@example.com'

const packageLabels: Record<string, string> = {
  homework: 'Homework Rescue',
  foundations: 'Foundation Booster',
  special: 'Special Needs Support',
}

function formatDateTime(iso: string | Date): { date: string; time: string } {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  return { date, time }
}

type BookingEmailData = {
  parentName: string
  email: string
  childName: string
  childAge: string
  needs?: string | null
  package: string
  dateTime: Date | string
}

export async function sendBookingConfirmation(booking: BookingEmailData) {
  const { date, time } = formatDateTime(booking.dateTime)
  const packageLabel = packageLabels[booking.package] ?? booking.package

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: booking.email,
    subject: `Your session with Mrs. Isler is confirmed — ${date}`,
    html: `
      <div style="font-family:'IBM Plex Sans',sans-serif;max-width:520px;margin:0 auto;color:#2F2A3B">
        <h2 style="color:#6a9692">Session Confirmed!</h2>
        <p>Hi ${booking.parentName},</p>
        <p>Your tutoring session has been successfully booked. Here are the details:</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr><td style="padding:8px 0;color:#675B7C;width:140px">Date</td><td><strong>${date}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#675B7C">Time</td><td><strong>${time}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#675B7C">Package</td><td><strong>${packageLabel}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#675B7C">Child</td><td><strong>${booking.childName}, age ${booking.childAge}</strong></td></tr>
        </table>
        ${booking.needs ? `<p><strong>Notes:</strong> ${booking.needs}</p>` : ''}
        <p>If you need to reschedule or have any questions, simply reply to this email.</p>
        <p>Looking forward to seeing ${booking.childName} soon!</p>
        <p style="margin-top:32px;color:#675B7C">— Mrs. Isler</p>
      </div>
    `,
  })
}

export async function sendTeacherNotification(booking: BookingEmailData) {
  const { date, time } = formatDateTime(booking.dateTime)
  const packageLabel = packageLabels[booking.package] ?? booking.package

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: TEACHER_EMAIL,
    subject: `New booking: ${booking.childName} on ${date}`,
    html: `
      <div style="font-family:'IBM Plex Sans',sans-serif;max-width:520px;margin:0 auto;color:#2F2A3B">
        <h2 style="color:#6a9692">New Appointment Booked</h2>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr><td style="padding:8px 0;color:#675B7C;width:140px">Date</td><td><strong>${date}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#675B7C">Time</td><td><strong>${time}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#675B7C">Package</td><td><strong>${packageLabel}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#675B7C">Child</td><td><strong>${booking.childName}, age ${booking.childAge}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#675B7C">Parent</td><td><strong>${booking.parentName}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#675B7C">Email</td><td><a href="mailto:${booking.email}">${booking.email}</a></td></tr>
        </table>
        ${booking.needs ? `<p><strong>Notes from parent:</strong><br>${booking.needs}</p>` : '<p><em>No notes provided.</em></p>'}
      </div>
    `,
  })
}
