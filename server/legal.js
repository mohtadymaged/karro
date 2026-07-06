// Legal pages — served at /terms and /privacy.
// Apple requires a public privacy-policy URL for App Store submission.
// Copy is plain and factual; update EFFECTIVE_DATE when the text changes.

const EFFECTIVE_DATE = '6 July 2026';
const CONTACT_EMAIL = 'support@karro.app'; // TODO: replace with your real support address

const page = (title, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${title} — Karro</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@700;800&family=Rubik:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  body{margin:0;background:#F6FBFA;color:#0A3540;font-family:'Rubik',system-ui,sans-serif;line-height:1.7;}
  header{background:#0A3540;padding:28px 24px;}
  header a{color:#E9F6F5;text-decoration:none;font-family:'Baloo Bhaijaan 2',sans-serif;font-size:24px;font-weight:800;}
  main{max-width:720px;margin:0 auto;padding:40px 24px 80px;}
  h1{font-family:'Baloo Bhaijaan 2',sans-serif;font-size:32px;margin:0 0 4px;}
  .date{color:#4A6B72;font-size:14px;margin-bottom:32px;}
  h2{font-family:'Baloo Bhaijaan 2',sans-serif;font-size:20px;margin:36px 0 10px;}
  p,li{font-size:15px;color:#2A4B54;}
  a{color:#14A09B;}
  .card{background:#E9F6F5;border-radius:14px;padding:18px 20px;font-size:14px;}
</style>
</head>
<body>
<header><a href="/">Karro</a></header>
<main>${body}</main>
</body>
</html>`;

export const TERMS_HTML = page('Terms of Use', `
<h1>Terms of Use</h1>
<p class="date">Effective ${EFFECTIVE_DATE}</p>

<p>Karro is a community marketplace for residents of El Gouna, Egypt. By creating an account or using the app you agree to these terms. If you do not agree, please do not use Karro.</p>

<h2>1. Who can use Karro</h2>
<p>Karro is for El Gouna residents aged 18 or older. You are responsible for the accuracy of the information in your account and for keeping your sign-in credentials private.</p>

<h2>2. Listings and conduct</h2>
<ul>
<li>Only list items you own and can hand over in person in El Gouna.</li>
<li>Prohibited, illegal, counterfeit or misrepresented items are not allowed and will be removed.</li>
<li>Objectionable content, harassment and abusive behaviour are not tolerated. Content that violates these terms is removed within 24 hours of a report, and repeat offenders are permanently banned.</li>
<li>Transactions are between members. Karro does not process payments, hold funds, or guarantee any sale.</li>
</ul>

<h2>3. Reporting, blocking and moderation</h2>
<p>Every listing can be reported and every member can be blocked from within the app. Reports are confidential and reviewed by our moderation team within 24 hours. Listings reported by multiple members are hidden automatically pending review. We may remove content or suspend accounts at our discretion to keep the community safe.</p>

<h2>4. Your content</h2>
<p>You keep ownership of the photos and text you post. By posting, you give Karro permission to display that content in the app so the marketplace can function. Deleting a listing or your account removes it.</p>

<h2>5. Account deletion</h2>
<p>You can permanently delete your account and all associated data at any time from Profile → Delete Account. Deletion is immediate and irreversible.</p>

<h2>6. Liability</h2>
<p>Karro is provided "as is". We work hard to keep the marketplace safe, but we are not a party to member transactions and are not liable for disputes between members, item condition, or losses arising from a sale. Meet in safe public places within El Gouna and inspect items before paying.</p>

<h2>7. Changes</h2>
<p>We may update these terms as the service evolves. Material changes will be announced in the app, and the effective date above will change. Continued use after a change means you accept the updated terms.</p>

<h2>8. Contact</h2>
<p>Questions about these terms: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
`);

export const PRIVACY_HTML = page('Privacy Policy', `
<h1>Privacy Policy</h1>
<p class="date">Effective ${EFFECTIVE_DATE}</p>

<p>This policy explains what Karro collects, why, and what control you have. We collect the minimum needed to run a neighbourhood marketplace, and we do not sell your data or use it for advertising.</p>

<h2>What we collect</h2>
<ul>
<li><strong>Account details</strong> — name, email address, username, and an encrypted (hashed) password.</li>
<li><strong>Residence details you choose to provide</strong> — unit and floor, used so buyers know pickup is genuinely in El Gouna.</li>
<li><strong>Content you create</strong> — listings, photos, messages, offers and bids.</li>
<li><strong>Device push token</strong> — if you enable notifications, so we can alert you about messages and offers. We never read anything else from your device.</li>
</ul>
<div class="card">We do <strong>not</strong> collect your location, contacts, browsing history, or any advertising identifiers. There are no third-party analytics or ad networks in Karro.</div>

<h2>How we use it</h2>
<ul>
<li>To run the marketplace: show your listings, deliver messages and offers.</li>
<li>To keep the community safe: process reports, enforce blocks, and moderate content.</li>
<li>To notify you about activity on your listings, if you enable notifications.</li>
</ul>

<h2>Photos and camera</h2>
<p>Camera and photo-library access is used only when you attach photos to a listing or your profile. Photos are uploaded to our server and shown in the app. Deleting a listing deletes its photos.</p>

<h2>Sharing</h2>
<p>Your name, listings and public profile are visible to other Karro members — that is the point of a marketplace. We do not share your email, unit details or any personal data with third parties, except where required by law.</p>

<h2>Retention and deletion</h2>
<p>We keep your data while your account exists. Deleting your account (Profile → Delete Account) immediately and permanently removes your profile, listings, photos, messages, offers, bids and push tokens from our systems.</p>

<h2>Security</h2>
<p>Passwords are stored hashed (bcrypt), traffic is encrypted in transit (HTTPS), and access to production data is restricted.</p>

<h2>Children</h2>
<p>Karro is not directed at children and may not be used by anyone under 18.</p>

<h2>Contact</h2>
<p>Privacy questions or data requests: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
`);
