import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Add Google Workspace Scopes
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initGoogleAuth = (
  onSuccess: (user: User, token: string) => void,
  onFailure: () => void
) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (cachedAccessToken) {
        onSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Try to get fresh credential if possible, or trigger sign-in
        onFailure();
      }
    } else {
      cachedAccessToken = null;
      onFailure();
    }
  });
};

export const signInWithGoogleWorkspace = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google OAuth access token.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (err) {
    console.error('Google Workspace sign-in error:', err);
    throw err;
  } finally {
    isSigningIn = false;
  }
};

export const getCachedAccessToken = () => cachedAccessToken;

export const logoutGoogleWorkspace = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// --- Google Sheets Integration ---
export async function createOrAppendToSpreadsheet(accessToken: string, leadData: {
  fullName: string;
  whatsapp: string;
  email: string;
  experienceLevel: string;
  platforms: string[];
  ticketId: string;
}, spreadsheetId?: string): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  // If we don't have a spreadsheetId, let's create a new Google Sheet
  let targetId = spreadsheetId;
  if (!targetId) {
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          title: 'Kumoten Smart Pricing VIP Leads & Profit Log'
        },
        sheets: [
          {
            properties: {
              title: 'VIP Leads'
            }
          }
        ]
      })
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      throw new Error(`Failed to create Google Sheet: ${err}`);
    }

    const sheetJson = await createRes.json();
    targetId = sheetJson.spreadsheetId;

    // Add header row
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${targetId}/values/VIP!A1:F1?valueInputOption=USER_ENTERED`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: 'VIP!A1:F1',
        majorDimension: 'ROWS',
        values: [['Ticket ID', 'Full Name', 'WhatsApp', 'Email', 'Experience Level', 'Platforms']]
      })
    });
  }

  // Append lead data
  const appendRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${targetId}/values/VIP!A:F:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: 'VIP!A:F',
      majorDimension: 'ROWS',
      values: [[
        leadData.ticketId,
        leadData.fullName,
        leadData.whatsapp,
        leadData.email,
        leadData.experienceLevel,
        leadData.platforms.join(', ')
      ]]
    })
  });

  if (!appendRes.ok) {
    const err = await appendRes.text();
    throw new Error(`Failed to append row to Google Sheet: ${err}`);
  }

  return {
    spreadsheetId: targetId!,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${targetId}/edit`
  };
}

// --- Google Drive Integration ---
export async function exportCheatSheetToDrive(accessToken: string): Promise<{ fileId: string; webViewLink: string }> {
  const fileContent = `# Kumoten Smart Pricing & High-Margin Dropship Cheat-Sheet (2025/2026)

1. Shopee Malaysia Fees:
   - Commission: ~4.0% - 5.0% depending on category
   - Transaction Fee: 2.12% (inclusive of SST)
   - Free Shipping / Coin Cashback: optional 1.5% - 4.5%

2. TikTok Shop Fees:
   - Commission: ~4.2%
   - Transaction Fee: ~2.16%

3. Lazada Malaysia Fees:
   - Commission: ~4.0%
   - Transaction Fee: ~2.12%

4. Golden Rule of Safe Pricing:
   - Always ensure your Net Profit Margin is at least 15% after all marketplace deductions and supplier cost.
   - Use Kumoten Smart Pricing Portal to check floor prices before setting discount vouchers!
`;

  const metadata = {
    name: 'Kumoten_Smart_Pricing_CheatSheet.md',
    mimeType: 'text/markdown',
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([fileContent], { type: 'text/markdown' }));

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: form,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to upload cheat-sheet to Google Drive: ${err}`);
  }

  const data = await res.json();
  
  // Get webViewLink
  const getRes = await fetch(`https://www.googleapis.com/drive/v3/files/${data.id}?fields=webViewLink`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const fileDetails = await getRes.json();

  return {
    fileId: data.id,
    webViewLink: fileDetails.webViewLink || `https://drive.google.com/file/d/${data.id}/view`
  };
}

// --- Gmail Integration ---
export async function sendWelcomeEmailViaGmail(accessToken: string, recipientEmail: string, recipientName: string, ticketId: string): Promise<boolean> {
  const subject = `[VIP Confirmed] Welcome to Kumoten Smart Pricing Portal (${ticketId})`;
  const utf8Subject = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  
  const emailContent = [
    `To: ${recipientEmail}`,
    `Subject: ${utf8Subject}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    `<!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f5ebdd; padding: 20px; color: #413333;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #dfcfba;">
          <h2 style="color: #f2765e; margin-top: 0;">Tahniah, ${recipientName}! 🎉</h2>
          <p>Your VIP Early Access Pass (<strong>${ticketId}</strong>) for the <strong>Kumoten Smart Pricing Portal</strong> has been successfully confirmed and connected to your Google Workspace.</p>
          <p>You now have priority access to:</p>
          <ul>
            <li>Automated multi-platform fee calculations (Shopee, Lazada, TikTok Shop)</li>
            <li>Safe floor-price alerts to prevent price war losses</li>
            <li>3 months free VIP beta tier upon launch</li>
          </ul>
          <p style="margin-top: 30px; font-size: 12px; color: #665555;">Sent via Kumoten Smart Pricing Portal • Powered by Google Workspace & Gmail API</p>
        </div>
      </body>
    </html>`
  ].join('\r\n');

  const base64EncodedEmail = btoa(unescape(encodeURIComponent(emailContent)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: base64EncodedEmail
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to send email via Gmail API: ${err}`);
  }

  return true;
}
