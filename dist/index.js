"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kodeConnect = kodeConnect;
exports.kodeFlowData = kodeFlowData;
exports.kodeFlowTrigger = kodeFlowTrigger;
exports.kodeLogin = kodeLogin;
exports.kodeLogout = kodeLogout;
exports.kodeSignup = kodeSignup;

var _ably = _interopRequireDefault(require("ably"));

var _ablyCommonjs = require("ably/browser/static/ably-commonjs.js");

var _auth0SpaJs = _interopRequireDefault(require("@auth0/auth0-spa-js"));

var _auth0Js = _interopRequireDefault(require("auth0-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function kodeLogin(_x, _x2) {
  return _kodeLogin.apply(this, arguments);
}

function _kodeLogin() {
  _kodeLogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(config, userAuth) {
    var webAuth;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            webAuth = new _auth0Js["default"].WebAuth({
              domain: config.domain,
              clientID: config.clientId
            }); // Trigger login using redirect with credentials to enterprise connections

            webAuth.redirect.loginWithCredentials({
              connection: 'Username-Password-Authentication',
              username: userAuth.email,
              password: userAuth.password,
              scope: 'openid'
            }, function (err, resp) {
              if (err) return alert('Something went wrong: ' + err.message);
              return alert('success !' + resp.response_type);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _kodeLogin.apply(this, arguments);
}

function kodeLogout(_x3, _x4) {
  return _kodeLogout.apply(this, arguments);
}

function _kodeLogout() {
  _kodeLogout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(config, redirect) {
    var webAuth;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            webAuth = new _auth0Js["default"].WebAuth({
              domain: config.domain,
              clientID: config.clientId
            });
            webAuth.logout({
              returnTo: redirect,
              client_id: config.clientId
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _kodeLogout.apply(this, arguments);
}

function kodeSignup(_x5, _x6) {
  return _kodeSignup.apply(this, arguments);
}

function _kodeSignup() {
  _kodeSignup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(config, user) {
    var webAuth;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            webAuth = new _auth0Js["default"].WebAuth({
              domain: config.domain,
              clientID: config.clientId
            });
            webAuth.signup({
              connection: 'Username-Password-Authentication',
              email: user.email,
              password: user.password
            }, function (err) {
              if (err) return alert('Something went wrong: ' + err.message);
              return alert('success signup without login!');
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _kodeSignup.apply(this, arguments);
}

function kodeConnect(config, appId, apiKey) {
  window.Ably = new _ablyCommonjs.Realtime(config.region);
  window.Ably.connection.on('connected', function () {
    console.log("Connected to kode");
  });
  var channel = window.Ably.channels.get("".concat(appId, "-").concat(apiKey, "-auth"));
  channel.publish("".concat(appId, "-").concat(apiKey, "-auth"), "connected_user_".concat(navigator.userAgent));
}

function kodeFlowTrigger(_x7, _x8, _x9) {
  return _kodeFlowTrigger.apply(this, arguments);
}

function _kodeFlowTrigger() {
  _kodeFlowTrigger = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(config, connectorId, data) {
    var channel;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            window.Ably = new _ablyCommonjs.Realtime(config.region);
            channel = window.Ably.channels.get("".concat(connectorId, "-flow")); // subscribe to channel for this flow

            channel.publish("".concat(connectorId, "-flow"), data);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _kodeFlowTrigger.apply(this, arguments);
}

function kodeFlowData(_x10, _x11) {
  return _kodeFlowData.apply(this, arguments);
}

function _kodeFlowData() {
  _kodeFlowData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(connectorId, apiKey) {
    var channel;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            channel = window.Ably.channels.get("".concat(connectorId, "-flow")); // subscribe to channel for this flow

            channel.subscribe(function (data) {
              if (data) {
                return data;
              }
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _kodeFlowData.apply(this, arguments);
}