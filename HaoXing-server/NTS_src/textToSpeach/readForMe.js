"use strict";

const { extractText } = require('./extractText.js');
const { splitText } = require('./splitText.js');
const { textToAudioFile, textToAudio } = require('./textToAudio.js');
const consola = require('consola');
const FIXED_CHUNK_SIZE = 300;

const createWriteableName = (name, format, idx) => {
    return `${name.replace(/https?:\/\/|\/|:|\\|\./g, '')}_part${idx}.${format.replace('low', '')}`.replace(/\//g, '\\');
};

async function readForMe({ file, mimeType, format, voice, out, log = false, textractOptions }) {
    let text;
    if (typeof file !== 'string' && !mimeType) {
        throw new Error('mimeType is required when passing a buffer');
    }
    
    text = (typeof file === 'string') 
        ? await extractText(file, textractOptions) 
        : await extractText(file, mimeType, textractOptions);

    if (!text) {
        throw new Error('Could not extract text from file');
    }
    
    log && consola.success('Finished extracting text!');
    
    const lines = text.length < FIXED_CHUNK_SIZE 
        ? [text] 
        : splitText(text, FIXED_CHUNK_SIZE);
    
    const buffers = await Promise.all(lines.map((line, idx) => {
        if (line.trim().length === 0) return null;
        const partFileName = out;
        return textToAudioFile({ text: line, format, voice, out: partFileName, idx });
    }));

    log && consola.success('Finished processing all slices!');
    
    return { 
        buffers: buffers.filter(Boolean), 
        fileNames: lines.map((_, idx) => createWriteableName(out || 'output', format, idx)) 
    };
}

module.exports = { readForMe };
