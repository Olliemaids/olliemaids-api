const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const { client_email, private_key } = require('./service-acc.json');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email,
        private_key,
      },
  scopes: ['https://www.googleapis.com/auth/calendar.events'],
});

const calendar = google.calendar({ version: 'v3', auth });

app.post('/create-event', async (req, res) => {
    const request = req.body;
  
    try {
      const response = await calendar.events.insert({
        calendarId: 'contato.olliemaids@gmail.com',
        requestBody: request,
      });
  
      res.status(200).send(response.data);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      res.status(500).send('Erro ao criar evento no Google Calendar');
    }
  });

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
