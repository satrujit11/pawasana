import googleSheetApiCredential from '$secret/google-sheet-api-credential.json';

import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function authorize() {
  try {
    const content = await googleSheetApiCredential;
    const credentials = JSON.parse(content);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    const tokens = await client.getAccessToken();

    return {
      access_token: tokens.token,
    };
  } catch (error) {
    console.error('Error authorizing with Google Sheets API:', error);
    throw error;
  }
}

