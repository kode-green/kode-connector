import Ably from 'ably';
import { Realtime } from 'ably/browser/static/ably-commonjs.js';

export function kodeConnect(region, appId, apiKey) {
  window.Ably = new Realtime(region);
  window.Ably.connection.on('connected', function() {
    console.log("Connected to kode");
  });
  const channel = window.Ably.channels.get(`${appId}-${apiKey}-auth`);
  channel.publish(`${appId}-${apiKey}-auth`, `connected_user_${navigator.userAgent}`);
}
