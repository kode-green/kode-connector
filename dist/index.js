"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kodeAuth = kodeAuth;
exports.kodeConnect = kodeConnect;
exports.kodeFlow = kodeFlow;

var _ably = _interopRequireDefault(require("ably"));

var _ablyCommonjs = require("ably/browser/static/ably-commonjs.js");

var _auth0SpaJs = _interopRequireDefault(require("@auth0/auth0-spa-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function kodeAuth(_x, _x2, _x3, _x4, _x5, _x6) {
  return _kodeAuth.apply(this, arguments);
}

function _kodeAuth() {
  _kodeAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(region, appId, domain, clientId, callBackUrl, audience) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            window.Ably = new _ablyCommonjs.Realtime(region);
            (0, _auth0SpaJs["default"])({
              domain: domain,
              client_id: clientId,
              redirect_uri: callBackUrl,
              audience: audience
            }).then(function (auth0) {
              var channel = window.Ably.channels.get("".concat(appId, "-token"));
              channel.publish("".concat(appId, "-token"), auth0);
              console.log("Token", auth0);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _kodeAuth.apply(this, arguments);
}

function kodeConnect(region, appId, apiKey) {
  window.Ably = new _ablyCommonjs.Realtime(region);
  window.Ably.connection.on('connected', function () {
    console.log("Connected to kode");
  });
  var channel = window.Ably.channels.get("".concat(appId, "-").concat(apiKey, "-auth"));
  channel.publish("".concat(appId, "-").concat(apiKey, "-auth"), "connected_user_".concat(navigator.userAgent));
}

function kodeFlow(flowId, appId, data) {
  var channel = window.Ably.channels.get("".concat(flowId, "-").concat(apiKey, "-flow"));
  channel.publish("".concat(appId, "-").concat(apiKey, "-auth"), "connected_user_".concat(navigator.userAgent));
}