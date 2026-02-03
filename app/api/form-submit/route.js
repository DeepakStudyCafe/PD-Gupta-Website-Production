import nodemailer from "nodemailer";

// Security best practices:
// - Never expose credentials in code. Use environment variables.
// - Validate all inputs strictly.
// - Rate limit or add CAPTCHA for advanced spam protection.
// - Do not leak error details to client.
// - Use HTTPS in production.

export async function POST(req) {
  try {
    const body = await req.json();
    const { formType, name, email, phone, mobile, message, subject, resume } = body;

    // Accept either phone or mobile for all forms
    const phoneValue = phone || mobile || "";
    // For career form, message is not required
    if (!formType || !email || !phoneValue || (formType !== "career" && !message)) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return Response.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!/^\d{10,}$/.test(phoneValue.replace(/\D/g, ""))) {
      return Response.json({ error: "Invalid phone number." }, { status: 400 });
    }
    // Prevent spam: check message length (except for career form)
    if (formType !== "career" && message && message.length < 5) {
      return Response.json({ error: "Message too short." }, { status: 400 });
    }

    // Subject mapping
    const subjects = {
      contact: "Contact Form Submission",
      query: "Query Form Submission",
      career: "Career Form Submission",
    };
    const emailSubject = subjects[formType] || "Website Form Submission";

    // Improved email template: styled table with header
    let emailBody = `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px;">
        <div style="max-width: 520px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; overflow: hidden;">
          <div style="background: #1e40af; color: #fff; padding: 20px 32px;">
            <h2 style="margin: 0; font-size: 1.5rem; letter-spacing: 1px;">${emailSubject}</h2>
          </div>
          <div style="padding: 24px 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                ${Object.keys(body)
                  .filter(key => body[key] !== undefined && body[key] !== "")
                  .map(key => `
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #1e293b; width: 140px; vertical-align: top;">${key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</td>
                      <td style="padding: 8px 0; color: #334155;">${body[key]}</td>
                    </tr>
                  `)
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div style="text-align:center; color:#64748b; font-size:12px; margin-top:24px;">PD Gupta &amp; Co. Website Form Submission</div>
      </div>
    `;

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `Website Form <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: emailSubject,
      html: emailBody,
    });

    return Response.json({ success: true });
  } catch (err) {
    // Log error internally, do not leak details
    console.error("Form submit error:", err);
    return Response.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}
