"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessage = exports.newMessage = void 0;

var _Message = _interopRequireDefault(require("../model/Message.js"));

var _Conversation = _interopRequireDefault(require("../model/Conversation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var newMessage = function newMessage(request, response) {
  var newMessage;
  return regeneratorRuntime.async(function newMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newMessage = new _Message["default"](request.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(newMessage.save());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_Conversation["default"].findByIdAndUpdate(request.body.conversationId, {
            message: request.body.text
          }));

        case 6:
          response.status(200).json("Message has been sent successfully");
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          response.status(500).json(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.newMessage = newMessage;

var getMessage = function getMessage(request, response) {
  var messages;
  return regeneratorRuntime.async(function getMessage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Message["default"].find({
            conversationId: request.params.id
          }));

        case 3:
          messages = _context2.sent;
          response.status(200).json(messages);
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

exports.getMessage = getMessage;