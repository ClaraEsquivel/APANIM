/* google-oauth.js */

// CONFIGURE AQUI:
const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com'; // substitua
const REDIRECT_URI = 'https://yourdomain.com/oauth2callback';  // substitua
const SCOPE = 'openid profile email';
const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

// helper: gera string aleatória (code_verifier)
function base64urlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function generateRandomString(len = 64) {
  const array = new Uint8Array(len);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => ('0' + b.toString(16)).slice(-2)).join('');
}

// gera code_challenge (SHA-256 do verifier)
async function pkceChallengeFromVerifier(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64urlEncode(digest);
}

// inicia o fluxo OAuth com PKCE
async function startGoogleOAuth() {
  const codeVerifier = base64urlEncode(new TextEncoder().encode(generateRandomString(64)));
  const codeChallenge = await pkceChallengeFromVerifier(codeVerifier);

  // você precisa persistir o code_verifier para trocar o code pelo token (ex: sessionStorage)
  sessionStorage.setItem('code_verifier', codeVerifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline', // pede refresh token (se necessário)
    include_granted_scopes: 'true',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    prompt: 'consent' // força pedir consent
  });

  // abre popup (melhor experiência) — ou usar window.location.href para redirecionar
  const authUrl = `${AUTH_ENDPOINT}?${params.toString()}`;
  const width = 600, height = 700;
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;
  window.open(authUrl, 'google_oauth', `width=${width},height=${height},top=${top},left=${left}`);
}

// botão
document.getElementById('googleSign').addEventListener('click', (e) => {
  e.preventDefault();
  startGoogleOAuth().catch(err => console.error('Erro PKCE:', err));
});