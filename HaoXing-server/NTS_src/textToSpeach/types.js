"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Format = exports.VoiceName = exports.formats = exports.possibleFormats = void 0;
var voiceNames_1 = require("./voiceNames");
exports.possibleFormats = ['mp3low', 'mp3', 'webm'];
exports.formats = {
    mp3low: 'audio-24khz-48kbitrate-mono-mp3',
    mp3: 'audio-24khz-48kbitrate-mono-mp3',
    webm: 'webm-24khz-16bit-mono-opus',
};
var VoiceName = function (voice) {
    if (!voiceNames_1.voiceNames.includes(voice)) {
        throw new Error("Voice ".concat(voice, " not found, use --voices to see available voices"));
    }
    return voice;
};
exports.VoiceName = VoiceName;
var Format = function (format) {
    if (!exports.possibleFormats.includes(format)) {
        throw new Error("Format ".concat(format, " not found, use --formats to see available formats"));
    }
    return format;
};
exports.Format = Format;
