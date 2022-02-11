import Ably from 'ably';
import { Realtime } from 'ably/browser/static/ably-commonjs.js';
import createAuth0Client from '@auth0/auth0-spa-js';
import auth0 from 'auth0-js';

export async function kodeLogin(config, userAuth) {
  const webAuth = new auth0.WebAuth({
    domain: config.domain,
    clientID: config.clientId
  });

  // Trigger login using redirect with credentials to enterprise connections
  webAuth.redirect.loginWithCredentials({
    connection: 'Username-Password-Authentication',
    username: userAuth.email,
    password: userAuth.password,
    scope: 'openid'
  }, (err, resp) => {
    if (err) return alert(
      'Something went wrong: ' + err.message
    );
    return alert(
      'success !'+ resp.response_type
    )
  });
}

export async function kodeLogout(config, redirect) {
  const webAuth = new auth0.WebAuth({
    domain: config.domain,
    clientID: config.clientId
  });

  webAuth.logout({
    returnTo: redirect,
    client_id: config.clientId
  });
}

export async function kodeSignup(config, user) {
  const webAuth = new auth0.WebAuth({
    domain: config.domain,
    clientID: config.clientId
  });
  webAuth.signup({
    connection: 'Username-Password-Authentication',
    email: user.email,
    password: user.password
  }, (err) => {
    if (err) return alert(
      'Something went wrong: ' + err.message
    );
    return alert(
      'success signup without login!'
    )
  });
}

export function kodeConnect(config, appId, apiKey) {
  window.Ably = new Realtime(config.region);
  window.Ably.connection.on('connected', function() {
    console.log("Connected to kode");
  });
  const channel = window.Ably.channels.get(
    `${appId}-${apiKey}-auth`
  );
  channel.publish(
    `${appId}-${apiKey}-auth`,
    `connected_user_${navigator.userAgent}`
  );
}

export async function kodeFlowTrigger(config, connectorId, data) {
  window.Ably = new Realtime(config.region);
  const channel = window.Ably.channels.get(
    `${connectorId}-flow`
  );
  // subscribe to channel for this flow
  channel.publish(
    `${connectorId}-flow`,
    data
  )
}
export async function kodeFlowData(connectorId, apiKey) {
  const channel = window.Ably.channels.get(
    `${connectorId}-flow`
  );
  // subscribe to channel for this flow
  channel.subscribe((data) => {
    if(data) {
      return data;
    }
  })
}
