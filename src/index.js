import Ably from 'ably';
import { Realtime } from 'ably/browser/static/ably-commonjs.js';
import createAuth0Client from '@auth0/auth0-spa-js';
import auth0 from 'auth0-js';

export async function kodeLogin(domain, clientId, email, password) {
  const webAuth = new auth0.WebAuth({
    domain:domain,
    clientID:clientId
  });

  // Trigger login using redirect with credentials to enterprise connections
  webAuth.redirect.loginWithCredentials({
    connection: 'Username-Password-Authentication',
    username: email,
    password: password,
    scope: 'openid'
  }, (err, resp) => {
    if (err) return alert('Something went wrong: ' + err.message);
    return alert('success !'+ resp.response_type)
  });
}

export async function kodeLogout(domain, clientId, returnTo) {
  const webAuth = new auth0.WebAuth({
    domain:domain,
    clientID:clientId
  });

  webAuth.logout({
    returnTo,
    client_id: clientId
  });
}

export async function kodeSignup(domain, clientId, email, password) {
  const webAuth = new auth0.WebAuth({
    domain:domain,
    clientID:clientId
  });
  webAuth.signup({
    connection: 'Username-Password-Authentication',
    email,
    password,
  }, (err) => {
    if (err) return alert('Something went wrong: ' + err.message);
    return alert('success signup without login!')
  });
}

export async function kodeAuth(region, appId, domain, clientId, callBackUrl, audience) {
  window.Ably = new Realtime(region);
  createAuth0Client({
    domain,
    client_id: clientId,
    redirect_uri: callBackUrl,
    audience: audience
  }).then(auth0 => {
    const channel = window.Ably.channels.get(`${appId}-token`);
    channel.publish(`${appId}-token`, auth0);
    console.log("Token", auth0)
    return auth0
  });
}

export function kodeConnect(region, appId, apiKey) {
  window.Ably = new Realtime(region);
  window.Ably.connection.on('connected', function() {
    console.log("Connected to kode");
  });
  const channel = window.Ably.channels.get(`${appId}-${apiKey}-auth`);
  channel.publish(`${appId}-${apiKey}-auth`, `connected_user_${navigator.userAgent}`);
}

export function kodeFlow(flowId, appId, data) {
  const channel = window.Ably.channels.get(`${flowId}-${apiKey}-flow`);
  channel.publish(`${appId}-${apiKey}-auth`, `connected_user_${navigator.userAgent}`);
}
