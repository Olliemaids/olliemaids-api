import express from "express";
import { google } from "googleapis";
import cors from "cors";

const keys = {
  type: "service_account",
  project_id: "olliemaids",
  private_key_id: "1095f918d1fe9d403a3c19af5f1d2a21cc4df915",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZLkfqlFICiOfz\njyit7X3iq+ifP5ycYLHEtUTMd9wu8TcJ7+Zs+M5zlMxVKBq+2nTCfnOq5kf8W/5s\n5+L7oZRAn6AyE98YHUBDwVJMxFuWS94QSEmSsG3wCWJurPSItV9EqQIjI5B3LfEL\nTYXTeVfeu70QNjPd++zVlbRy+9jnhbltJity46ZBynLTNkuT1oTLvgs3nXI6xfld\nS9C2qSSlewO6X7IGtMz59rdJ1PC+zm6H+r0wSDnWgyXwK3yIcWROAoccNu2Wqref\nf+4EHchSSqnaOykmUjsj34HKAE5FS8hugVnl3hUlqeCIBMME78Yi4qycDtovc9NM\nMkIDwc5rAgMBAAECggEABYkzJyqqFhZdj6NWXIbPPGBrHUo+vjYOZqYIcP1J81Zb\nX1wQr1KEn4+6nL9AzDH380l/o6cD5f5rIQN2ZBKwWW+LahPmxafU+T3k3Apipvlh\n8qOyKP+AUaL9MDPG+KPZaBFVlvCDmZMK+ZYZJo3lm5KcYBgdYsHmiseIyHkKmz9f\nJfV1DakNzAHJWHKPB0LSoNwlNNBVWE1pFaHU7BOqoTSE0HWMzkewI8TKApqkBK5E\n9oTEgWMNeEtyhHnqvUUAWlSRdbSuvdYk4nKYSSgPa0L+dc3n6CubW2H8JYR+LtGx\n1j1dgt2eZU6uIVNMVz8BN+yj/9/S4AACsbyV7u/HhQKBgQDJOqZnVQzceCxsE84T\npoFPxUgui5TiYBhdMo+vfiTo5zXdO33ggeji12Jnqd9xn/QPZayvco5cNZZ0em3o\nvynF6rNdutB04ZixPhRsHEx3cvxRFhx0XAGDZxysvfWxT0LVpW6m52tDlqAH1XgD\nl0dbUH7FONJmEWWBnjI5PgwLjQKBgQDC37HBE9RcZg/NVEA6wbyMckzITWaGYc+r\nS1TnBtd9opWQUEIKLH3U5qdbokQ5NWloLpoI9/pMz5KELjH2O1Z3mn7Lv75L52V/\nNcF2zLRy8DsVZY9O6WNp3O77XO2f5lJgHuzJxmRqPLkq5U23UTGwfY777Bdad1jE\n0V4ofjBH1wKBgQC1sEvw/rznD2ZkixlFatBU2zbKN+NM5iD5fR55ALeIxsI+p2mH\nXSSONJS4Lov+RsMRZ+ccXp2lKglXz/cO8BNijQA4f+WZstuwJPJBjueH7n1dJU65\nzRzcrSwZ2EZPOtaImp8m+cpCs2x4xkhfTabzDuH3Zs+psslo2BJW1uv/PQKBgCaw\n60X+fedqjDCkTaxc0ua/uub6FyUPPoAwEMdd4GMdaLyicro6YzFmKkxTR2Bkbm00\n83hcY+HkRJ7h3SGaXmyYzBwAEfRYGRrMvYCs3BcGA3UYGP/97rMSHpDhvnxE6o4T\nFchqD33YWJtfs7J1+HumMkFqeqiHkaRiPWOkykk5AoGBALxH2+bOEJkPrFpZG7/k\ncDffwY3CETyLJ2jrrKvstwNRMK0ZfuvO93RXC0YC88EFIWe3wTv+LP7z4febukod\nhONQ7SZlPpnNb1kTesLwyxXt/ftqqQavyOneNm9oVQmliUM2WKOswg3vbJymK3XE\nkjLWsXdTgS6xJuWOISS8Rx9c\n-----END PRIVATE KEY-----\n",
  client_email: "schedulling-app@olliemaids.iam.gserviceaccount.com",
  client_id: "103592986346884742711",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/schedulling-app%40olliemaids.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: keys.client_email,
    private_key : keys.private_key,
  },
  scopes: ["https://www.googleapis.com/auth/calendar.events"],
});

const calendar = google.calendar({ version: "v3", auth });

app.get("/", async (req, res) => {
  return res.json("Ollie Maids");
});

app.post("/create-event", async (req, res) => {
  const request = req.body;

  try {
    const response = await calendar.events.insert({
      calendarId: "contato.olliemaids@gmail.com",
      requestBody: request,
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    res.status(500).send("Erro ao criar evento no Google Calendar");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
