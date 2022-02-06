"use strict";

var _ably = _interopRequireDefault(require("ably"));

var _ablyCommonjs = require("ably/browser/static/ably-commonjs.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function kodeConnect(region, appId, apiKey) {
  window.Ably = new _ablyCommonjs.Realtime(region);
  window.Ably.connection.on('connected', function () {
    console.log("Connected to kode");
  });
  var channel = window.Ably.channels.get("".concat(appId, "-").concat(apiKey));
  channel.publish("auth", "".concat(appId, "-connected"));
};