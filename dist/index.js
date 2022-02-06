"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kodeConnect = kodeConnect;

var _ably = _interopRequireDefault(require("ably"));

var _ablyCommonjs = require("ably/browser/static/ably-commonjs.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function kodeConnect(region, appId, apiKey) {
  window.Ably = new _ablyCommonjs.Realtime(region);
  window.Ably.connection.on('connected', function () {
    console.log("Connected to kode");
  });
  var channel = window.Ably.channels.get("".concat(appId, "-").concat(apiKey, "-auth"));
  channel.publish("".concat(appId, "-").concat(apiKey, "-auth"), "connected_user_".concat(navigator.userAgent));
}