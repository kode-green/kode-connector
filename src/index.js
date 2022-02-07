import Ably from 'ably';
import { Realtime } from 'ably/browser/static/ably-commonjs.js';
import createAuth0Client from '@auth0/auth0-spa-js';

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

export async function isAuthenticated(auth0) {
    return await auth0.isAuthenticated();
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
