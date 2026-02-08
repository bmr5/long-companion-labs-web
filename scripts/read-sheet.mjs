import crypto from "crypto";

const SPREADSHEET_ID = "1K0H0K5GHDzHgbevbt6j0ciSMoMV5-pg48bNyxEe8rCs";
const CLIENT_EMAIL = "puptides-waitlist@gen-lang-client-0067665623.iam.gserviceaccount.com";
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n");
const TOKEN_URL = "https://oauth2.googleapis.com/token";

function createJWT() {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  })).toString("base64url");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  return `${header}.${payload}.${sign.sign(PRIVATE_KEY, "base64url")}`;
}

const tokenRes = await fetch(TOKEN_URL, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: createJWT(),
  }),
});
const { access_token } = await tokenRes.json();

const res = await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1`,
  { headers: { Authorization: `Bearer ${access_token}` } }
);
const data = await res.json();
console.log(JSON.stringify(data.values, null, 2));
