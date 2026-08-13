import { Resend } from 'resend';

// Resend client initialization with fallback to provided key
const resendApiKey = process.env.RESEND_API_KEY ;
const resend = new Resend(resendApiKey);

/**
 * Send email using Resend API
 */
export async function sendLeadNotificationEmail(leadData) {
  const { name, phone, area, serviceNeeded, message, propertyType, daysOld } = leadData;

  const subject = daysOld 
    ? `🚨 [3-DAY OVERDUE ALERT] Lead: ${name} (${area}) - ${serviceNeeded}`
    : `🎨 [NEW LEAD RECEIVED] ${name} (${area}) - ${serviceNeeded}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px; background-color: #ffffff;">
      <div style="background-color: #002048; color: #ffffff; padding: 16px; text-align: center; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 20px;">Surat Painting Solution</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #f85000; font-weight: bold;">
          ${daysOld ? 'AUTOMATIC 3-DAY OVERDUE LEAD ALERT' : 'NEW QUOTE REQUEST RECEIVED'}
        </p>
      </div>

      <div style="padding: 20px; color: #1e293b; line-height: 1.6;">
        <p style="font-size: 15px; font-weight: bold;">Hello Surat Painting Team,</p>
        <p style="font-size: 14px;">${daysOld ? `A lead from <b>${daysOld} days ago</b> is still pending and requires immediate follow-up:` : 'A new quote request was just submitted on the website:'}</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 35%;">Client Name:</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; color: #002048;">${name || 'Surat Client'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Phone Number:</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; color: #f85000;">
              <a href="tel:${phone}" style="color: #f85000; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Area / Locality:</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">${area || 'Surat'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Service Needed:</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; color: #0058b8;">${serviceNeeded}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Property Type:</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">${propertyType || 'Home / Flat'}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Client Note:</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-style: italic; color: #475569;">"${message}"</td>
          </tr>
          ` : ''}
        </table>

        <div style="margin-top: 25px; text-align: center;">
          <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(name)},%20this%20is%20Surat%20Painting%20Solution%20regarding%20your%20painting%20inquiry." 
             style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px;">
            💬 Open WhatsApp Chat
          </a>
        </div>
      </div>

      <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 8px 8px; margin-top: 20px;">
        Surat Painting Solution Lead Dispatch Engine • Official Contact: +91 94081 97990
      </div>
    </div>
  `;

  try {
    // Primary account email registered with Resend
    const recipient = process.env.LEAD_ALERT_EMAIL || 'suratpenters01@gmail.com';
    
    // Note: When using onboarding@resend.dev, Resend restricts recipients to the account owner email
    const { data, error } = await resend.emails.send({
      from: 'Surat Painting Solution <onboarding@resend.dev>',
      to: [recipient],
      subject,
      html
    });

    if (error) {
      console.error('[Resend API Error]:', error);
      return { success: false, error: error.message || error };
    }

    console.log('[Resend Email Sent Successfully]:', data);
    return { success: true, response: data };
  } catch (error) {
    console.error('[Resend Email Unexpected Error]:', error);
    return { success: false, error: error.message || error };
  }
}
