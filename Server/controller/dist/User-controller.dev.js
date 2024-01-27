"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.addUser = void 0;

var _User = _interopRequireDefault(require("../model/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addUser = function addUser(request, response) {
  var exist, newUser;
  return regeneratorRuntime.async(function addUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            sub: request.body.sub
          }));

        case 3:
          exist = _context.sent;

          if (!exist) {
            _context.next = 7;
            break;
          }

          response.status(200).json('user already exists');
          return _context.abrupt("return");

        case 7:
          newUser = new _User["default"](request.body);
          _context.next = 10;
          return regeneratorRuntime.awrap(newUser.save());

        case 10:
          response.status(200).json(newUser);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          response.status(500).json(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.addUser = addUser;

var getUser = function getUser(request, response) {
  var user;
  return regeneratorRuntime.async(function getUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_User["default"].find({}));

        case 3:
          user = _context2.sent;
          response.status(200).json(user);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          response.status(500).json(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getUser = getUser;