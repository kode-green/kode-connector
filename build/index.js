import Ably from 'ably';
import { Realtime } from 'ably/browser/static/ably-commonjs.js';

module.exports = function kodeConnect(region, appId, apiKey) {
  window.Ably = new Realtime(region);
  window.Ably.connection.on('connected', function() {
    console.log("Connected to kode");
  });
  const channel = window.Ably.channels.get(`${appId}-${apiKey}`);
  channel.publish("auth", `${appId}-connected`);
}
