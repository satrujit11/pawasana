
import { SECRET_CREDENTIAL } from '$env/static/private';
import { google } from 'googleapis';


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'];

export async function authorize() {
  try {
    const content = SECRET_CREDENTIAL;
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

