import React, { useState, useEffect } from 'react';
import { 
  signInWithGoogleWorkspace, 
  initGoogleAuth, 
  logoutGoogleWorkspace, 
  createOrAppendToSpreadsheet, 
  exportCheatSheetToDrive, 
  sendWelcomeEmailViaGmail,
  getCachedAccessToken
} from '../services/googleWorkspace.ts';
import { User } from 'firebase/auth';
import { Mail, FileSpreadsheet, HardDrive, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, LogOut, ExternalLink } from 'lucide-react';

interface GoogleWorkspacePanelProps {
  lastLeadData?: {
    fullName: string;
    whatsapp: string;
    email: string;
    experienceLevel: string;
    platforms: string[];
    ticketId: string;
  } | null;
}

export const GoogleWorkspacePanel: React.FC<GoogleWorkspacePanelProps> = ({ lastLeadData }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [sheetInfo, setSheetInfo] = useState<{ id: string; url: string } | null>(null);
  const [driveInfo, setDriveInfo] = useState<{ id: string; url: string } | null>(null);

  useEffect(() => {
    const unsubscribe = initGoogleAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const res = await signInWithGoogleWorkspace();
      setUser(res.user);
      setToken(res.accessToken);
      setStatusMessage({ type: 'success', text: `Successfully connected Google Workspace as ${res.user.email}!` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to sign in with Google.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogleWorkspace();
    setUser(null);
    setToken(null);
    setStatusMessage({ type: 'info', text: 'Disconnected from Google Workspace.' });
  };

  const handleSyncToSheets = async () => {
    if (!token) return;
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const lead = lastLeadData || {
        fullName: 'Test Kumoten Seller',
        whatsapp: '0123456789',
        email: user?.email || 'seller@kumoten.com',
        experienceLevel: 'Active Seller',
        platforms: ['Shopee', 'TikTok Shop'],
        ticketId: 'VIP-9999'
      };
      const res = await createOrAppendToSpreadsheet(token, lead, sheetInfo?.id);
      setSheetInfo({ id: res.spreadsheetId, url: res.spreadsheetUrl });
      setStatusMessage({ type: 'success', text: 'Successfully synced VIP lead to Google Sheets!' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to sync to Google Sheets.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportDrive = async () => {
    if (!token) return;
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const res = await exportCheatSheetToDrive(token);
      setDriveInfo({ id: res.fileId, url: res.webViewLink });
      setStatusMessage({ type: 'success', text: 'Successfully exported High-Margin Cheat-Sheet to Google Drive!' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to export to Google Drive.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!token || !user?.email) return;
    setIsLoading(true);
    setStatusMessage(null);
    try {
      await sendWelcomeEmailViaGmail(
        token, 
        user.email, 
        user.displayName || 'Valued Kumoten Seller', 
        lastLeadData?.ticketId || 'VIP-8888'
      );
      setStatusMessage({ type: 'success', text: `Welcome email successfully sent via Gmail to ${user.email}!` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to send email via Gmail.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 bg-[#e8f0f8] border-y border-[#315b8c]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#fdfaf6] rounded-3xl p-6 sm:p-8 border-2 border-[#315b8c]/30 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#dfcfba]">
            
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#315b8c] text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#315b8c] text-white">
                    Google Workspace Integration
                  </span>
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active API Ready
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#413333] mt-1">
                  Connect Website to Gmail, Sheets & Drive
                </h3>
                <p className="text-xs sm:text-sm text-[#665555]">
                  Automatically sync leads to Google Sheets, export profit cheat-sheets to Google Drive, and dispatch VIP welcome emails via Gmail.
                </p>
              </div>
            </div>

            {/* Auth Action */}
            <div>
              {!user ? (
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className="gsi-material-button inline-flex items-center gap-3 bg-white hover:bg-neutral-50 text-[#413333] font-bold px-6 py-3 rounded-xl border border-gray-300 shadow-md transition-all cursor-pointer"
                >
                  <div className="w-5 h-5">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  </div>
                  <span>Sign in with Google Workspace</span>
                </button>
              ) : (
                <div className="flex items-center gap-3 bg-[#e8f0f8] p-3 rounded-2xl border border-[#315b8c]/30">
                  <div className="w-10 h-10 rounded-full bg-[#315b8c] text-white flex items-center justify-center font-bold text-sm">
                    {user.displayName?.[0] || user.email?.[0] || 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#413333]">{user.displayName || 'Connected User'}</p>
                    <p className="text-[11px] text-[#315b8c] font-medium">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="ml-3 p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className={`mt-6 p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-900' 
                : statusMessage.type === 'error'
                  ? 'bg-rose-50 border border-rose-300 text-rose-900'
                  : 'bg-blue-50 border border-blue-300 text-blue-900'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${
                statusMessage.type === 'success' ? 'bg-emerald-600' : statusMessage.type === 'error' ? 'bg-rose-600' : 'bg-blue-600'
              }`} />
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Integration Action Cards */}
          {user ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Google Sheets Sync Card */}
              <div className="bg-[#f5ebdd]/70 p-5 rounded-2xl border border-[#dfcfba] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                    <h4 className="font-extrabold text-sm text-[#413333]">Google Sheets Sync</h4>
                  </div>
                  <p className="text-xs text-[#665555] mb-4">
                    Instantly create or append VIP leads and pricing calculation logs to your Google Sheets.
                  </p>
                  {sheetInfo && (
                    <a
                      href={sheetInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#315b8c] underline mb-4"
                    >
                      <span>Open Google Sheet</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSyncToSheets}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Sync Lead to Sheets</span>
                </button>
              </div>

              {/* Google Drive Export Card */}
              <div className="bg-[#f5ebdd]/70 p-5 rounded-2xl border border-[#dfcfba] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <HardDrive className="w-5 h-5 text-[#315b8c]" />
                    <h4 className="font-extrabold text-sm text-[#413333]">Google Drive Export</h4>
                  </div>
                  <p className="text-xs text-[#665555] mb-4">
                    Upload the Top-50 High-Margin Dropship Cheat-Sheet directly to your Google Drive folder.
                  </p>
                  {driveInfo && (
                    <a
                      href={driveInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#315b8c] underline mb-4"
                    >
                      <span>View File in Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleExportDrive}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#315b8c] hover:bg-[#254770] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <HardDrive className="w-4 h-4" />
                  <span>Export to Google Drive</span>
                </button>
              </div>

              {/* Gmail API Card */}
              <div className="bg-[#f5ebdd]/70 p-5 rounded-2xl border border-[#dfcfba] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-5 h-5 text-rose-600" />
                    <h4 className="font-extrabold text-sm text-[#413333]">Gmail Confirmation</h4>
                  </div>
                  <p className="text-xs text-[#665555] mb-4">
                    Send a verified VIP welcome & confirmation email directly through your connected Gmail account.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#f2765e] hover:bg-[#df644c] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send VIP Email via Gmail</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="mt-6 text-center py-8 bg-[#f5ebdd]/50 rounded-2xl border border-dashed border-[#dfcfba]">
              <p className="text-xs sm:text-sm font-semibold text-[#665555]">
                🔒 Sign in with Google Workspace above to unlock 1-click Google Sheets sync, Google Drive exports, and Gmail delivery.
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
