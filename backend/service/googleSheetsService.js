import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CREDENTIALS_PATH = path.join(__dirname, '..', 'config', 'credentials.json');

const getGoogleSheetsClient = async () => {
  try {
    
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    } );

    
    const authClient = await auth.getClient();

    return google.sheets({ version: 'v4', auth: authClient });
  } catch (error) {
    
    console.error('Error al crear cliente de Google Sheets. Asegúrese de que el archivo credentials.json esté en backend/config/', error.message);
    throw error;
  }
};


export const agregarFilaAplicacion = async (aplicacionData) => {
  try {
   
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    
    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEET_ID no está definido en el archivo .env");
    }

    const values = [[
      aplicacionData.id,
      aplicacionData.nombreEstudiante,
      aplicacionData.correoEstudiante,
      aplicacionData.tituloProyecto,
      aplicacionData.estado,
      aplicacionData.fechaSumision,
      aplicacionData.carnetEstudiante
    ]];

    const resource = { values };

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Hoja 1!A:G',
      valueInputOption: 'RAW',
      resource,
    });

    console.log('Fila agregada exitosamente');
    return response.data;
  } catch (error) {
    console.error('Error al agregar fila', error.message);
    throw error;
  }
};
