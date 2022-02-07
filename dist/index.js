"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = isAuthenticated;
exports.kodeAuth = kodeAuth;
exports.kodeConnect = kodeConnect;
exports.kodeFlow = kodeFlow;
exports.kodeSignup = kodeSignup;

var _ably = _interopRequireDefault(require("ably"));

var _ablyCommonjs = require("ably/browser/static/ably-commonjs.js");

var _auth0SpaJs = _interopRequireDefault(require("@auth0/auth0-spa-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function kodeSignup(_x, _x2) {
  return _kodeSignup.apply(this, arguments);
}

function _kodeSignup() {
  _kodeSignup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(domain, clientId) {
    var webAuth;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            webAuth = new auth0.WebAuth({
              domain: domain,
              clientID: clientId
            });
            webAuth.signup({
              connection: 'Username-Password-Authentication',
              email: 'steve@rensco.co.uk',
              password: '123456789',
              username: "Steve",
              given_name: "Steve",
              family_name: "Van",
              name: "Steve Van",
              nickname: "Steve",
              picture: "http://example.org/jdoe.png",
              user_metadata: {
                plan: 'silver',
                team_id: 'a111'
              }
            }, function (err) {
              if (err) return alert('Something went wrong: ' + err.message);
              return alert('success signup without login!');
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _kodeSignup.apply(this, arguments);
}

function kodeAuth(_x3, _x4, _x5, _x6, _x7, _x8) {
  return _kodeAuth.apply(this, arguments);
}

function _kodeAuth() {
  _kodeAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(region, appId, domain, clientId, callBackUrl, audience) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
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
              return auth0;
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _kodeAuth.apply(this, arguments);
}

function isAuthenticated(_x9) {
  return _isAuthenticated.apply(this, arguments);
}

function _isAuthenticated() {
  _isAuthenticated = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(auth0) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return auth0.isAuthenticated();

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _isAuthenticated.apply(this, arguments);
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