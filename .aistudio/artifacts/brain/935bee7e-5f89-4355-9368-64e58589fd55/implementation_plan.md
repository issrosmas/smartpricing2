# Implementation Plan - Custom Google Sheet URL Integration

Allow users to link their own existing Google Spreadsheet by pasting its URL into the Google Workspace settings panel.

## User Requirements Addressed
- User wants to use an existing Google Sheet URL to capture form submissions instead of auto-generating a new sheet.

## Proposed Changes

### 1. Update Google Workspace Service (`src/services/googleWorkspace.ts`)
- Support passing a custom `spreadsheetId` extracted from user input.
- Helper function to parse spreadsheet ID from a full Google Sheets URL (e.g., `https://docs.google.com/spreadsheets/d/ABC123xyz/edit`).

### 2. Update Google Workspace Panel (`src/components/GoogleWorkspacePanel.tsx`)
- Add an input field: "Custom Google Sheet URL" and a "Save Sheet Link" button.
- Store the custom Spreadsheet ID in `localStorage` (`kumoten_custom_spreadsheet_id`).
- Display connection status to the linked spreadsheet with a direct link.

### 3. Update Form Submission (`src/components/EarlyAccessForm.tsx`)
- Retrieve the custom Spreadsheet ID from `localStorage` before appending lead data.
- If a custom spreadsheet is linked, append rows directly to that sheet.

## Verification Plan
- Build and compile applet successfully.
- Test saving a custom Google Sheet URL and submitting the form to verify data appends to the specified sheet.
