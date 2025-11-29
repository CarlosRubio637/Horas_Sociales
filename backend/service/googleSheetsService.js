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
      aplicacionData.motivacionProyecto,
      aplicacionData.estado,
      aplicacionData.fechaSumision,
      aplicacionData.carnetEstudiante
    ]];

    const resource = { values };

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Hoja 1!A:H',
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

export const actualizarEstadoEnSheet = async (idAplicacion, nuevoEstado) => {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) return;

    // Leer la columna A (donde guardamos los IDs) para encontrar la fila
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Hoja 1!A:A', // Asumimos que el ID está en la Columna A
    });

    const rows = readResponse.data.values;
    if (!rows || rows.length === 0) {
      console.log('No hay datos en el Sheet para buscar.');
      return;
    }

    // Buscar el índice de la fila que coincide con el ID
    const rowIndex = rows.findIndex(row => row[0] === idAplicacion) + 1;

    if (rowIndex === 0) { 
      console.warn(`No se encontró la aplicación ID ${idAplicacion} en Google Sheets.`);
      return; 
    }

    const range = `Hoja 1!F${rowIndex}`; 

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: range,
      valueInputOption: 'RAW',
      resource: {
        values: [[nuevoEstado]]
      }
    });

    console.log(`Estado actualizado en Google Sheets (Fila ${rowIndex}) a: ${nuevoEstado}`);

  } catch (error) {
    console.error('Error al actualizar estado en Sheets:', error.message);
  }
};