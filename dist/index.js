"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = isAuthenticated;
exports.kodeAuth = kodeAuth;
exports.kodeConnect = kodeConnect;
exports.kodeFlow = kodeFlow;
exports.kodeLogin = kodeLogin;
exports.kodeSignup = kodeSignup;

var _ably = _interopRequireDefault(require("ably"));

var _ablyCommonjs = require("ably/browser/static/ably-commonjs.js");

var _auth0SpaJs = _interopRequireDefault(require("@auth0/auth0-spa-js"));

var _auth0Js = _interopRequireDefault(require("auth0-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function kodeLogin(_x, _x2, _x3, _x4) {
  return _kodeLogin.apply(this, arguments);
}

function _kodeLogin() {
  _kodeLogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(domain, clientId, email, password) {
    var webAuth;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            webAuth = new _auth0Js["default"].WebAuth({
              domain: domain,
              clientID: clientId
            }); // Trigger login using redirect with credentials to enterprise connections

            webAuth.redirect.loginWithCredentials({
              connection: 'Username-Password-Authentication',
              username: email,
              password: password,
              scope: 'openid'
            }, function (err, resp) {
              if (err) return alert('Something went wrong: ' + err.message);
              return alert('success !' + resp.response_type);
            }); // // Trigger login using popup mode with credentials to enterprise connections
            // webAuth.popup.loginWithCredentials({
            //   connection: 'Username-Password-Authentication',
            //   username: 'testuser',
            //   password: 'testpass',
            //   scope: 'openid'
            // });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _kodeLogin.apply(this, arguments);
}

function kodeSignup(_x5, _x6, _x7, _x8) {
  return _kodeSignup.apply(this, arguments);
}

function _kodeSignup() {
  _kodeSignup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(domain, clientId, email, password) {
    var webAuth;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            webAuth = new _auth0Js["default"].WebAuth({
              domain: domain,
              clientID: clientId
            });
            webAuth.signup({
              connection: 'Username-Password-Authentication',
              email: email,
              password: password
            }, function (err) {
              if (err) return alert('Something went wrong: ' + err.message);
              return alert('success signup without login!');
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _kodeSignup.apply(this, arguments);
}

function kodeAuth(_x9, _x10, _x11, _x12, _x13, _x14) {
  return _kodeAuth.apply(this, arguments);
}

function _kodeAuth() {
  _kodeAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(region, appId, domain, clientId, callBackUrl, audience) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _kodeAuth.apply(this, arguments);
}

function isAuthenticated(_x15) {
  return _isAuthenticated.apply(this, arguments);
}

function _isAuthenticated() {
  _isAuthenticated = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(auth0) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return auth0.isAuthenticated();

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
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