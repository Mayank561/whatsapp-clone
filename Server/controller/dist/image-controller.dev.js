"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImage = exports.uploadImage = void 0;

var _gridfsStream = _interopRequireDefault(require("gridfs-stream"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var url = 'http://localhost:8000';
var gfs, gridfsBucket;
var conn = _mongoose["default"].connection;
conn.once('open', function () {
  gridfsBucket = new _mongoose["default"].mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
  gfs = (0, _gridfsStream["default"])(conn.db, _mongoose["default"].mongo);
  gfs.collection('fs');
});

var uploadImage = function uploadImage(request, response) {
  if (!request.file) return response.status(404).json("File not found");
  var imageUrl = "".concat(url, "/file/").concat(request.file.filename);
  response.status(200).json(imageUrl);
};

exports.uploadImage = uploadImage;

var getImage = function getImage(request, response) {
  var file, readStream;
  return regeneratorRuntime.async(function getImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(gfs.files.findOne({
            filename: request.params.filename
          }));

        case 3:
          file = _context.sent;
          // const readStream = gfs.createReadStream(file.filename);
          // readStream.pipe(response);
          readStream = gridfsBucket.openDownloadStream(file._id);
          readStream.pipe(response);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          response.status(500).json({
            msg: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getImage = getImage;