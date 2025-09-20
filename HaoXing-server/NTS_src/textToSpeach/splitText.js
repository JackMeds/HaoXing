"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitText = void 0;
var splitText = function (text, CHUNK_SIZE) {
    var lines = text.split('. ');
    var chunks = [];
    var chunk = '';
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (chunk.length + line.length < CHUNK_SIZE) {
            chunk += "".concat(line, ". ");
        }
        else {
            chunks.push(chunk);
            chunk = line;
        }
    }
    chunks.push(chunk);
    return chunks;
};
exports.splitText = splitText;
