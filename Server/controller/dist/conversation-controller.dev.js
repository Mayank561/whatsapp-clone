"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConversation = exports.newConversation = void 0;

var _Conversation = _interopRequireDefault(require("../model/Conversation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var newConversation = function newConversation(request, response) {
  var senderId, receiverId, exist, newConversation, savedConversation;
  return regeneratorRuntime.async(function newConversation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          senderId = request.body.senderId;
          receiverId = request.body.receiverId;
          _context.next = 4;
          return regeneratorRuntime.awrap(_Conversation["default"].findOne({
            members: {
              $all: [receiverId, senderId]
            }
          }));

        case 4:
          exist = _context.sent;

          if (!exist) {
            _context.next = 8;
            break;
          }

          response.status(200).json('conversation already exists');
          return _context.abrupt("return");

        case 8:
          newConversation = new _Conversation["default"]({
            members: [senderId, receiverId]
          });
          _context.prev = 9;
          _context.next = 12;
          return regeneratorRuntime.awrap(newConversation.save());

        case 12:
          savedConversation = _context.sent;
          response.status(200).json(savedConversation);
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](9);
          response.status(500).json(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[9, 16]]);
};

exports.newConversation = newConversation;

var getConversation = function getConversation(request, response) {
  var conversation;
  return regeneratorRuntime.async(function getConversation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Conversation["default"].findOne({
            members: {
              $all: [request.body.senderId, request.body.receiverId]
            }
          }));

        case 3:
          conversation = _context2.sent;
          response.status(200).json(conversation);
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

exports.getConversation = getConversation;